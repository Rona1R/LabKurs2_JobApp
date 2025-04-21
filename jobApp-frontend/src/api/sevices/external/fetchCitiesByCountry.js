export const fetchCitiesForCountry = async (countryCode) => {
    const response = await fetch(
      `https://api.countrystatecity.in/v1/countries/${countryCode}/cities`,
      {
        headers: {
          "X-CSCAPI-KEY":
            "UWhGbnVFMlFmR3ZVeWZSQW1KcUNwVEY5aWVQMGEyeGJDSGNsYUNuVw==",
        },
      }
    ); 
    const data = await response.json();
    const uniqueCities = data.reduce(
      (acc, city) => {
        if (!acc.seen.has(city.name)) {
          acc.seen.add(city.name);
          acc.result.push(city.name);
          // acc.result.push({ /*id: city.id, */name: city.name });
        }
        return acc;
      },
      { seen: new Set(), result: [] }
    ).result;
    return uniqueCities;
}