import axios, { AxiosError } from "axios";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { GOOGLE_PLACES_API_KEY, BASE_URL } from "@env";

const queryClient = new QueryClient();

const API_KEY = GOOGLE_PLACES_API_KEY;
const API_URL = BASE_URL;

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY,
    "X-Goog-FieldMask": [
      "places.displayName",
      "places.formattedAddress",
      "places.shortFormattedAddress",
      "places.location",
      "places.evChargeOptions",
      "places.photos",
    ],
  },
};

function useMutationRequest(key) {
  // Create Events
  const {
    mutate: getNearbyData,
    data: nearbyData,
    isPending: isFetchingNearbyData,
  } = useMutation({
    mutationFn: async (payload) => {
      const res = await axios.post(API_URL, payload, config);
      return res.data.places;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [`${key}`],
      });
      return res
    },
    onError: (error) => {
      console.error('API Error:', error.response ? error.response.data : error.message);
    },
  });

  return {
    getNearbyData,
    nearbyData,
    isFetchingNearbyData,
  };
}

export default useMutationRequest;
