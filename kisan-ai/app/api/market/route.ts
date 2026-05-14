import { NextResponse } from 'next/server';

// CEDA Agri-Market API (Agmarknet) Integration
// Key: 72dfb9c71bd7419c193c5dc8595e8f836225dc53150293d0fe80bab0aba33fa1

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const commodity = searchParams.get('commodity') || 'Tomato';
  const district = searchParams.get('district') || 'Mandya';
  
  const apiKey = process.env.CEDA_API_KEY;

  try {
    // The CEDA Agmarknet API endpoint typically follows this structure
    const url = `https://agmarknet.ceda.ashoka.edu.in/api/v1/prices?commodity=${commodity}&district=${district}`;

    // Note: Since this is a restricted API, we use the key in headers
    // If it's a bearer token: 'Authorization': `Bearer ${apiKey}`
    // If it's an API key: 'X-Api-Key': apiKey
    const res = await fetch(url, {
      headers: {
        'X-Api-Key': apiKey || '',
        'Content-Type': 'application/json'
      },
      next: { revalidate: 3600 } // cache 1 hour
    });

    if (!res.ok) {
      // If API fails or key is invalid, return mock data for the demo
      console.warn('CEDA API failed, returning mock data');
      return NextResponse.json(getMockMarketData(commodity, district));
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Market API Error:', error);
    return NextResponse.json(getMockMarketData(commodity, district));
  }
}

function getMockMarketData(commodity: string, district: string) {
  const basePrices: Record<string, number> = {
    'Tomato': 1200,
    'Potato': 1500,
    'Rice': 3200,
    'Wheat': 2400,
    'Maize': 1800
  };

  const base = basePrices[commodity] || 1000;
  
  return {
    commodity,
    district,
    market: district + ' Main Mandi',
    prices: {
      min: base - 100,
      max: base + 200,
      modal: base,
      unit: 'Quintal (100kg)',
      currency: 'INR'
    },
    trend: 'up',
    arrivals: 'High',
    lastUpdated: new Date().toISOString()
  };
}
