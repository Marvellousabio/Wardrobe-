export interface WeatherData {
  temp: number;
  condition: string;
  description: string;
  icon: string;
}

export const getCurrentWeather = async (lat: number = 40.7128, lon: number = -74.0060): Promise<WeatherData> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Weather API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Weather API error:', error);
    // Return fallback data
    return {
      temp: 75,
      condition: 'Sunny',
      description: 'clear sky',
      icon: '01d'
    };
  }
};