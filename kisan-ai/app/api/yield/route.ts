import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { crop, district, soilType, season, rainfall, area } = body;

  // Mock processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock calculation logic based on inputs
  const baseYieldPerAcre = crop === 'Tomato' ? 25 : crop === 'Wheat' ? 18 : 20;
  
  // Modifiers
  const rainfallMod = rainfall > 800 ? 1.1 : 0.9;
  const soilMod = soilType === 'Red Soil' ? 1.05 : 1;
  const finalQuintalsPerAcre = Number((baseYieldPerAcre * rainfallMod * soilMod).toFixed(1));

  const totalYield = Number((finalQuintalsPerAcre * area).toFixed(2));
  
  return NextResponse.json({
    success: true,
    estimatedYieldPerAcre: finalQuintalsPerAcre,
    totalYield: totalYield,
    grade: finalQuintalsPerAcre > baseYieldPerAcre ? 'A+' : 'B',
    comparisonToAverage: '+12%', // Mocked string
    insights: `Based on your ${area} acre farm in ${district}, the expected yield is excellent due to optimal ${rainfall}mm rainfall and ${soilType}.`
  });
}
