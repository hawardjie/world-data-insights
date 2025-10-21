import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { fredCache } from '@/lib/cache';

const FRED_BASE_URL = 'https://api.stlouisfed.org/fred';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchText = searchParams.get('search_text');

  if (!searchText) {
    return NextResponse.json(
      { error: 'search_text is required' },
      { status: 400 }
    );
  }

  const apiKey = process.env.NEXT_PUBLIC_FRED_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'FRED API key is not configured' },
      { status: 500 }
    );
  }

  // Build cache key from all parameters
  const cacheParams: Record<string, string> = {
    limit: searchParams.get('limit') || '100',
    offset: searchParams.get('offset') || '0',
  };

  const optionalParams = ['order_by', 'sort_order', 'filter_variable', 'filter_value'];
  optionalParams.forEach((param) => {
    const value = searchParams.get(param);
    if (value) {
      cacheParams[param] = value;
    }
  });

  const cacheKey = fredCache.getSeriesSearchKey(searchText, cacheParams);

  // Check cache first
  const cachedData = fredCache.get(cacheKey);
  if (cachedData) {
    return NextResponse.json(cachedData);
  }

  try {
    const params = new URLSearchParams({
      search_text: searchText,
      api_key: apiKey,
      file_type: 'json',
      limit: cacheParams.limit,
      offset: cacheParams.offset,
    });

    // Add optional parameters
    optionalParams.forEach((param) => {
      const value = searchParams.get(param);
      if (value) {
        params.append(param, value);
      }
    });

    const url = `${FRED_BASE_URL}/series/search?${params.toString()}`;
    console.log('Requesting FRED API:', url);

    const response = await axios.get(url, {
      timeout: 30000,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (typeof response.data === 'string' && response.data.includes('<HTML>')) {
      throw new Error('FRED API returned an error page. Please try again later.');
    }

    // Cache successful response
    fredCache.set(cacheKey, response.data);

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error searching FRED series:', error.response?.data || error.message);

    const errorMessage = error.response?.data?.error_message
      || error.response?.data?.message
      || error.message
      || 'Failed to search FRED series';

    return NextResponse.json(
      {
        error: errorMessage,
        details: error.response?.data,
        searchText: searchText
      },
      { status: error.response?.status || 500 }
    );
  }
}
