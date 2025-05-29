export async function getExchangeRate(amount: number, targetCurrency: string = 'INR'): Promise<number> {
  try {
    // Using a more reliable exchange rate API
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rate');
    }

    const data = await response.json();
    const rate = data.rates[targetCurrency];
    
    if (!rate) {
      throw new Error(`Exchange rate not available for ${targetCurrency}`);
    }

    return amount * rate;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    // Fallback rates for common currencies
    const fallbackRates: { [key: string]: number } = {
      'INR': 83,
      'EUR': 0.92,
      'GBP': 0.79,
      'JPY': 151.62,
      'AUD': 1.52,
      'CAD': 1.35,
      'SGD': 1.35,
      'AED': 3.67,
      'ZAR': 18.89,
      'BRL': 5.05
    };
    
    return amount * (fallbackRates[targetCurrency] || 1);
  }
}

// Function to get currency symbol
export function getCurrencySymbol(currency: string): string {
  const symbols: { [key: string]: string } = {
    'USD': '$',
    'INR': '₹',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'AUD': 'A$',
    'CAD': 'C$',
    'SGD': 'S$',
    'AED': 'د.إ',
    'ZAR': 'R',
    'BRL': 'R$'
  };
  
  return symbols[currency] || currency;
}

// Function to get currency code from country code
export function getCurrencyFromCountry(countryCode: string): string {
  const countryToCurrency: { [key: string]: string } = {
    'US': 'USD',
    'IN': 'INR',
    'GB': 'GBP',
    'JP': 'JPY',
    'AU': 'AUD',
    'CA': 'CAD',
    'SG': 'SGD',
    'AE': 'AED',
    'ZA': 'ZAR',
    'BR': 'BRL',
    'DE': 'EUR',
    'FR': 'EUR',
    'IT': 'EUR',
    'ES': 'EUR',
    'NL': 'EUR'
  };
  
  return countryToCurrency[countryCode] || 'USD';
} 