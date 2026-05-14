import { NextResponse } from 'next/server';

// OpenWeatherMap API Integration
// API Key provided by user: 613c50741ee0a40c12cc9ea2e79b2d91

interface WeatherForecastItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  pop: number; // Probability of precipitation
  rain?: {
    '3h'?: number;
  };
  wind: {
    speed: number;
  };
  dt_txt: string;
}

function assessDiseaseRisk(humidity: number, temp: number, rain: number): {
  level: 'High' | 'Medium' | 'Low';
  reason: string;
} {
  // High humidity + warm temps = fungal paradise
  if (humidity > 80 && temp > 25 && rain > 1) {
    return { level: 'High', reason: 'High humidity and warm temperatures create optimal conditions for Early and Late Blight.' };
  }
  if (humidity > 70 && temp > 20) {
    return { level: 'Medium', reason: 'Moderate humidity and temperature may promote fungal growth. Keep monitoring.' };
  }
  return { level: 'Low', reason: 'Conditions are stable. Low disease risk for most crops.' };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat') || '12.52';  // Mandya default
  const lon = searchParams.get('lon') || '76.90';
  const locationName = searchParams.get('location') || 'Mandya, Karnataka';
  
  const apiKey = process.env.OPENWEATHER_API_KEY || '613c50741ee0a40c12cc9ea2e79b2d91';

  try {
    // Fetch 5-day / 3-hour forecast
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const res = await fetch(url, { next: { revalidate: 1800 } }); // cache 30 min
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`OpenWeather API failed: ${errorData.message}`);
    }

    const data = await res.json();
    const list: WeatherForecastItem[] = data.list;

    // Current conditions (from the first forecast item as a proxy for 'now')
    const current = list[0];
    const todayRain = list.slice(0, 8).reduce((acc, item) => acc + (item.rain?.['3h'] || 0), 0);
    
    const today = {
      temp: Math.round(current.main.temp),
      tempMin: Math.round(current.main.temp_min),
      humidity: current.main.humidity,
      rainfall: Math.round(todayRain * 10) / 10,
      windSpeed: Math.round(current.wind.speed * 3.6), // convert m/s to km/h
      description: current.weather[0].description,
    };

    const risk = assessDiseaseRisk(today.humidity, today.temp, today.rainfall);

    // Group forecast by day (starting from tomorrow)
    const dailyForecast: any[] = [];
    const seenDates = new Set();
    const todayDate = new Date().toISOString().split('T')[0];

    for (const item of list) {
      const date = item.dt_txt.split(' ')[0];
      if (date === todayDate || seenDates.has(date)) continue;
      
      seenDates.add(date);
      const dayRisk = assessDiseaseRisk(item.main.humidity, item.main.temp, item.rain?.['3h'] || 0);
      
      dailyForecast.push({
        date: date,
        dayName: new Date(date).toLocaleDateString('en-IN', { weekday: 'short' }),
        tempMax: Math.round(item.main.temp_max),
        tempMin: Math.round(item.main.temp_min),
        humidity: item.main.humidity,
        rainfall: Math.round((item.rain?.['3h'] || 0) * 10) / 10,
        riskLevel: dayRisk.level,
        description: item.weather[0].description,
      });

      if (dailyForecast.length >= 3) break;
    }

    return NextResponse.json({
      location: data.city.name + ', ' + data.city.country,
      today,
      risk,
      forecast: dailyForecast,
      lastUpdated: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('Weather API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
