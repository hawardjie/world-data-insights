import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { fredCache } from '@/lib/cache';

const WB_BASE_URL = 'https://api.worldbank.org/v2';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const country = searchParams.get('country') || 'all';
  const indicator = searchParams.get('indicator');
  const date = searchParams.get('date'); // e.g., "2010:2023" or "2023"
  const perPage = searchParams.get('per_page') || '1000';

  if (!indicator) {
    return NextResponse.json(
      { error: 'indicator parameter is required' },
      { status: 400 }
    );
  }

  // Build cache key
  const cacheParams: Record<string, string> = {
    country,
    indicator,
    per_page: perPage,
  };
  if (date) {
    cacheParams.date = date;
  }

  const cacheKey = fredCache.generateKey('worldbank', cacheParams);

  // Check cache first
  const cachedData = fredCache.get(cacheKey);
  if (cachedData) {
    return NextResponse.json(cachedData);
  }

  try {
    // Build URL
    let url = `${WB_BASE_URL}/country/${country}/indicator/${indicator}?format=json&per_page=${perPage}`;

    if (date) {
      url += `&date=${date}`;
    }

    console.log('Requesting World Bank API:', url);

    const response = await axios.get(url, {
      timeout: 30000,
      headers: {
        'Accept': 'application/json',
      },
    });

    // World Bank API returns array with [metadata, data]
    if (!Array.isArray(response.data)) {
      console.error('World Bank API returned non-array response:', typeof response.data);
      console.error('Response data preview:', JSON.stringify(response.data).substring(0, 500));
      // Return empty result instead of throwing error
      return NextResponse.json({
        pagination: {},
        data: [],
      });
    }

    if (response.data.length < 2) {
      console.error('World Bank API returned array with insufficient data:', response.data);
      // Return empty result instead of throwing error
      return NextResponse.json({
        pagination: response.data[0] || {},
        data: [],
      });
    }

    const [pagination, data] = response.data;

    // Check if data is an array
    if (!Array.isArray(data)) {
      console.error('World Bank API data is not an array:', typeof data);
      return NextResponse.json({
        pagination,
        data: [],
      });
    }

    const result = {
      pagination,
      data: data.filter((item: any) => item && item.value !== null), // Filter out null values
    };

    // Cache successful response
    fredCache.set(cacheKey, result);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error fetching World Bank data:', error.response?.data || error.message);

    const errorMessage = error.response?.data?.message
      || error.message
      || 'Failed to fetch data from World Bank API';

    return NextResponse.json(
      {
        error: errorMessage,
        details: error.response?.data,
        indicator,
        country,
      },
      { status: error.response?.status || 500 }
    );
  }
}
