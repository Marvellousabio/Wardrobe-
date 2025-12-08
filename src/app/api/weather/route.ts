import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat') || '40.7128';
    const lon = searchParams.get('lon') || '-74.0060';

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey || apiKey === 'your_openweather_api_key_here') {
      return NextResponse.json(
        {
          temp: 75,
          condition: 'Sunny',
          description: 'clear sky',
          icon: '01d'
        },
        { status: 200 }
      );
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`);
    }

    const data = await response.json();

    const weatherData = {
      temp: Math.round(data.main.temp),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      {
        temp: 75,
        condition: 'Sunny',
        description: 'clear sky',
        icon: '01d'
      },
      { status: 200 }
    );
  }
}