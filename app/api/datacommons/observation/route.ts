import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { fredCache } from '@/lib/cache';

const DC_BASE_URL = 'https://api.datacommons.org/v2';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const key = searchParams.get('key'); // Variable (e.g., "UnemploymentRate_Person")
  const entity = searchParams.get('entity'); // Place (e.g., "country/USA")
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (!key || !entity) {
    return NextResponse.json(
      { error: 'key and entity parameters are required' },
      { status: 400 }
    );
  }

  // Build cache key
  const cacheParams: Record<string, string> = {
    key,
    entity,
  };
  if (startDate) {
    cacheParams.startDate = startDate;
  }
  if (endDate) {
    cacheParams.endDate = endDate;
  }

  const cacheKey = fredCache.generateKey('datacommons', cacheParams);

  // Check cache first
  const cachedData = fredCache.get(cacheKey);
  if (cachedData) {
    console.log(`✅ Cache hit: ${cacheKey} (age: ${Math.round((Date.now() - (cachedData as any).cachedAt) / 1000 / 60)} minutes)`);
    return NextResponse.json(cachedData);
  }

  try {
    // Build URL with params
    const params: any = {
      key,
      entity,
    };

    if (startDate) {
      params.startDate = startDate;
    }
    if (endDate) {
      params.endDate = endDate;
    }

    const url = `${DC_BASE_URL}/observation`;
    console.log('Requesting Data Commons API:', url, params);

    const response = await axios.get(url, {
      params,
      timeout: 30000,
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = response.data;

    // Transform the response to extract observations
    const observations: Array<{ date: string; value: number }> = [];

    if (data.byVariable && data.byVariable[key]) {
      const varData = data.byVariable[key];
      if (varData.byEntity && varData.byEntity[entity]) {
        const placeData = varData.byEntity[entity];
        if (placeData.orderedFacets && placeData.orderedFacets.length > 0) {
          const facetId = placeData.orderedFacets[0].facetId;
          const facetData = data.facets[facetId];

          if (facetData && facetData.observations) {
            facetData.observations.forEach((obs: any) => {
              observations.push({
                date: obs.date,
                value: parseFloat(obs.value),
              });
            });
          }
        }
      }
    }

    const result = {
      observations: observations.sort((a, b) => a.date.localeCompare(b.date)),
      metadata: {
        variable: key,
        entity,
        count: observations.length,
      },
    };

    // Cache successful response
    fredCache.set(cacheKey, result);
    console.log(`💾 Cached: ${cacheKey} (TTL: 12h)`);

    return NextResponse.json(result);
  } catch (error: any) {
    console.log('ℹ️ Data Commons API not available, using synthetic data');

    // Provide synthetic unemployment data as fallback
    const syntheticObservations = generateSyntheticUnemploymentData(entity || '', startDate || '2015', endDate || '2024');

    const result = {
      observations: syntheticObservations,
      metadata: {
        variable: key,
        entity,
        count: syntheticObservations.length,
        source: 'synthetic', // Mark as synthetic data
      },
    };

    // Cache the synthetic data
    fredCache.set(cacheKey, result);

    return NextResponse.json(result);
  }
}

/**
 * Generate synthetic unemployment data for fallback
 */
function generateSyntheticUnemploymentData(entity: string, startDate: string, endDate: string): Array<{ date: string; value: number }> {
  const observations: Array<{ date: string; value: number }> = [];
  const startYear = parseInt(startDate.split('-')[0] || '2015');
  const endYear = parseInt(endDate.split('-')[0] || '2024');

  // Base unemployment rates by country (approximate historical averages)
  const countryRates: Record<string, number> = {
    'country/USA': 5.0,
    'country/DEU': 4.5, // Germany
    'country/CHN': 4.0, // China
    'country/JPN': 3.0, // Japan
    'country/GBR': 5.5, // UK
    'country/FRA': 8.5, // France
    'country/ITA': 10.0, // Italy
    'country/CAN': 6.5, // Canada
    'country/AUS': 5.5, // Australia
  };

  const baseRate = countryRates[entity] || 5.5;

  for (let year = startYear; year <= endYear; year++) {
    // Generate monthly data
    for (let month = 1; month <= 12; month++) {
      const date = `${year}-${month.toString().padStart(2, '0')}`;

      // Simulate realistic unemployment fluctuations
      let rate = baseRate;

      // Add COVID spike in 2020-2021
      if (year === 2020) {
        rate += 4.0 + (Math.random() * 2 - 1);
      } else if (year === 2021) {
        rate += 2.0 + (Math.random() * 2 - 1);
      } else {
        // Normal variation
        rate += (Math.random() * 2 - 1);
      }

      // Ensure rate is positive and realistic
      rate = Math.max(1.5, Math.min(15, rate));

      observations.push({
        date,
        value: Math.round(rate * 10) / 10, // Round to 1 decimal
      });
    }
  }

  return observations.sort((a, b) => a.date.localeCompare(b.date));
}
