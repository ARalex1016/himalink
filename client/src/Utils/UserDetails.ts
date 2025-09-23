// types/UserDetails.ts
export interface UserDetails {
  ip: string;
  country: string;
  country_code: string;
  region: string;
  city: string;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  currency: string;
}

const IPWHOIS_API_URL = "https://free.ipwhois.io/json/";

export const getUserDetails = async (): Promise<UserDetails> => {
  try {
    const response = await fetch(IPWHOIS_API_URL);
    console.log("DatA :", response);

    if (!response.ok) {
      throw new Error(`Failed to fetch IP details: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

    // Validate required fields & provide defaults
    const userDetails: UserDetails = {
      ip: data.ip || "0.0.0.0",
      country: data.country || "Unknown",
      country_code: data.country_code || "XX",
      region: data.region || "Unknown",
      city: data.city || "Unknown",
      postal: data.postal || "00000",
      latitude: parseFloat(data.latitude) || 0,
      longitude: parseFloat(data.longitude) || 0,
      timezone: data.timezone?.id || "UTC",
      currency: data.currency?.code || "USD",
    };

    return userDetails;
  } catch (error: any) {
    console.error("Error fetching user details:", error?.message || error);
    // Fallback object if API fails
    return {
      ip: "0.0.0.0",
      country: "Unknown",
      country_code: "XX",
      region: "Unknown",
      city: "Unknown",
      postal: "00000",
      latitude: 0,
      longitude: 0,
      timezone: "UTC",
      currency: "USD",
    };
  }
};
