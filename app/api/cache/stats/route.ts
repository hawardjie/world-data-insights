import { NextResponse } from 'next/server';
import { fredCache } from '@/lib/cache';

export async function GET() {
  const stats = fredCache.getStats();

  return NextResponse.json({
    message: 'Cache statistics',
    stats,
  });
}
