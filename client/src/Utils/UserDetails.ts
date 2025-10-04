export const getUserDetailsWithIPAPI = async () => {
  try {
    const response = await fetch("https://ipapi.co/json/");

    if (!response.ok) {
      throw new Error(`Failed to fetch IP details: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    throw new Error("Failed to get user details via IP.");
  }
};
