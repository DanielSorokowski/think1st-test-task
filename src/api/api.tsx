export const getHolidays = async () => {
  try {
    const response = await fetch('https://api.api-ninjas.com/v1/holidays?country=PL&year=2023', {
      headers: {
        'X-Api-Key': '8DX8eEe67njS1lbThFsdSw==rQQNpQ8PYbPZBjrx'
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Error fetching holidays:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching holidays:', error);
  }
};