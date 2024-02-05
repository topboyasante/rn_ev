import { GOOGLE_PLACES_API_KEY,BASE_URL } from "@env";
import axios from "axios";

const API_KEY = GOOGLE_PLACES_API_KEY
const API_URL = BASE_URL

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY,
    "X-Goog-FieldMask": [
      "places.displayName",
      "places.formattedAddress",
      "places.location",
      "places.evChargeOptions",
      "places.photos",
    ],
  },
};

export const fetchNearbyPlaces = (data)=>{
    axios.post(API_URL,data,config).then(res=>console.log(res.data)).catch(error => {
      console.error('API Error:', error.response ? error.response.data : error.message);
    });
}


 