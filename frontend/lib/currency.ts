export async function getExchangeRate(amount: number): Promise<number> {
  try {
    const response = await fetch('https://latest.currency-api.pages.dev/v1/currencies/eur.json');
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rate');
    }

    const data = await response.json();
    const eurToInr = data.eur.inr;
    const eurToUsd = 1 / data.eur.usd; // Convert EUR/USD rate to USD/EUR
    
    // Convert USD to INR: USD -> EUR -> INR
    const usdToInr = eurToInr * eurToUsd;
    return amount * usdToInr;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    // Fallback to a default rate if API fails
    return amount * 83;
  }
} 