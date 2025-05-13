// src/components/MapWithAutocomplete.js
import axios from "axios";

export const getCityStateFromZipCountry = async (zipCode: string, country: string, apiKey: string) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(zipCode + "," + country)}&key=${apiKey}`
    );

    if (response.data.status !== "OK") {
      throw new Error(`Geocoding API Error: ${response.data.status}`);
    }
    const results = response.data.results[0];

    const addressComponents = results.address_components;

    const city = addressComponents.find((component) => component.types.includes("locality"))?.long_name;
    const state1 = addressComponents.find((component) => component.types.includes("administrative_area_level_1"))?.long_name;
    const state2 = addressComponents.find((component) => component.types.includes("administrative_area_level_2"))?.long_name;

    const filterState = state1 && state2 ? `${state2}, ${state1}` : state1 || state2;

    const address = results.formatted_address;

    return { city, state: filterState, address };
  } catch (error) {
    console.error("Error fetching City and State:", error);
    return { city: "", state: "" };
  }
};
