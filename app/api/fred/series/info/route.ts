import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { fredCache } from '@/lib/cache';

const FRED_BASE_URL = 'https://api.stlouisfed.org/fred';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const seriesId = searchParams.get('series_id');

  if (!seriesId) {
    return NextResponse.json(
      { error: 'series_id is required' },
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

  const cacheKey = fredCache.getSeriesInfoKey(seriesId);

  // Check cache first
  const cachedData = fredCache.get(cacheKey);
  if (cachedData) {
    return NextResponse.json(cachedData);
  }

  try {
    const params = new URLSearchParams({
      series_id: seriesId,
      api_key: apiKey,
      file_type: 'json',
    });

    const url = `${FRED_BASE_URL}/series?${params.toString()}`;
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
    console.error('Error fetching FRED series info:', error.response?.data || error.message);

    const errorMessage = error.response?.data?.error_message
      || error.response?.data?.message
      || error.message
      || 'Failed to fetch series info from FRED';

    return NextResponse.json(
      {
        error: errorMessage,
        details: error.response?.data,
        seriesId: seriesId
      },
      { status: error.response?.status || 500 }
    );
  }
}
