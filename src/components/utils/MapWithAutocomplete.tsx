// src/components/MapWithAutocomplete.js
import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Autocomplete from "react-google-autocomplete";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "400px",
};

export interface AutocompleteInputProps
  extends ReactGoogleAutocompleteInputProps {
  variant: VariantProps<typeof formInputVariant>;
  value: string;
  onChange: (e: any) => void;
}

const defaultCenter = {
  lat: 37.7749, // San Francisco
  lng: -122.4194, // San Francisco
};

// Define libraries as a constant outside the component to avoid re-creating it
const libraries = ["places"];

export const getCityStateFromZipCountry = async (
  zipCode: string,
  country: string,
  apiKey: string
) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        zipCode + "," + country
      )}&key=${apiKey}`
    );

    if (response.data.status !== "OK") {
      throw new Error(`Geocoding API Error: ${response.data.status}`);
    }
    const results = response.data.results[0];

    const addressComponents = results.address_components;

    const city = addressComponents.find((component) =>
      component.types.includes("locality")
    )?.long_name;

    const state = addressComponents.find((component) =>
      component.types.includes("administrative_area_level_1")
    )?.long_name;

    // console.log("City:", city);
    // console.log("State:", state);
    return { city, state };
  } catch (error) {
    console.error("Error fetching City and State:", error);
    return { city: "", state: "" };
  }
};

// const MapWithAutocomplete = ({ paddingX, paddingY, ...props }) => {
//   const [center, setCenter] = useState(defaultCenter);

//   return (
//     <Autocomplete
//       apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}
//       //   onPlaceSelected={handlePlaceSelect}
//       libraries={["places"]}
//       {...props}
//       style={{
//         width: "100%",
//         border: "1px solid",
//         padding: `${paddingX} ${paddingY}`,
//       }}
//       options={{
//         types: [], // Limit search results to cities
//         // componentRestrictions: { country: "us" }, // Restrict search results to United States only
//       }}
//     />
//   );
// };

// export default MapWithAutocomplete;
