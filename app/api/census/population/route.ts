import { NextRequest, NextResponse } from 'next/server';
import { getCensusApi } from '@/lib/censusApi';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const year = parseInt(searchParams.get('year') || '2021');
  const geography = searchParams.get('geography') || 'us:*';

  try {
    const censusApi = getCensusApi();
    const data = await censusApi.getPopulationEstimates(year, geography);

    return NextResponse.json({
      data,
      year,
      geography,
    });
  } catch (error: any) {
    console.error('Error fetching Census population data:', error.message);

    // Return empty data instead of error (graceful degradation)
    return NextResponse.json({
      data: [],
      year,
      geography,
      message: 'Census data not available',
    });
  }
}
