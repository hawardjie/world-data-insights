import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { fredCache } from '@/lib/cache';
import { generateDataForDataset } from '@/lib/unDataService';
import Papa from 'papaparse';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const csvUrl = searchParams.get('url');
  const datasetId = searchParams.get('datasetId');

  if (!csvUrl) {
    return NextResponse.json(
      { error: 'url parameter is required' },
      { status: 400 }
    );
  }

  if (!datasetId) {
    return NextResponse.json(
      { error: 'datasetId parameter is required' },
      { status: 400 }
    );
  }

  // Validate URL is from data.un.org
  if (!csvUrl.startsWith('https://data.un.org/')) {
    return NextResponse.json(
      { error: 'Only data.un.org URLs are allowed' },
      { status: 403 }
    );
  }

  // Build cache key
  const cacheKey = fredCache.generateKey('un-csv', { url: csvUrl });

  // Check cache first (24-hour TTL for CSV data)
  const cachedData = fredCache.get(cacheKey);
  if (cachedData) {
    console.log(`✅ Cache hit: UN CSV data (age: ${Math.round((Date.now() - (cachedData as any).cachedAt) / 1000 / 60)} minutes)`);
    return new NextResponse(cachedData as string, {
      headers: {
        'Content-Type': 'text/csv',
        'Cache-Control': 'public, max-age=86400', // 24 hours
      },
    });
  }

  try {
    console.log(`📥 Fetching UN Data CSV from: ${csvUrl}`);

    const response = await axios.get(csvUrl, {
      timeout: 60000, // 60 seconds timeout for large CSV files
      headers: {
        'Accept': 'text/csv, application/csv, text/plain',
        'User-Agent': 'Mozilla/5.0 (compatible; WorldDataInsights/1.0)',
      },
      responseType: 'text',
    });

    const csvData = response.data;

    // Cache successful response
    fredCache.set(cacheKey, csvData);
    console.log(`💾 Cached: UN CSV data (TTL: 24h)`);

    return new NextResponse(csvData, {
      headers: {
        'Content-Type': 'text/csv',
        'Cache-Control': 'public, max-age=86400', // 24 hours
      },
    });
  } catch (error: any) {
    console.log('ℹ️ UN Data API not available, using synthetic data');
    console.log(`📊 Using datasetId: ${datasetId}`);

    // Generate synthetic data using the provided datasetId
    const syntheticData = generateDataForDataset(datasetId, 2010, 2023);
    console.log(`✨ Generated ${syntheticData.length} synthetic data points`);

    // Convert to CSV
    const csv = Papa.unparse(syntheticData);
    console.log(`📄 CSV Preview (first 200 chars): ${csv.substring(0, 200)}...`);
    console.log(`📏 CSV length: ${csv.length} characters`);

    // Cache the synthetic CSV
    fredCache.set(cacheKey, csv);
    console.log(`💾 Cached: Synthetic UN CSV data (TTL: 24h)`);

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Cache-Control': 'public, max-age=86400', // 24 hours
        'X-Data-Source': 'synthetic', // Mark as synthetic data
      },
    });
  }
}
