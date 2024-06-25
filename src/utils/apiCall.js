import axios from "axios";

export const apiCall = async (url, config = {}) => {
  try {
    const headers = {
      "access-token": localStorage.getItem("access-token"),
      client: localStorage.getItem("client"),
      expiry: localStorage.getItem("expiry"),
      uid: localStorage.getItem("uid"),
      "Content-Type": "application/json",
    };

    const response = await axios({
      method: config.method || "get",
      url,
      headers,
      data: config.data,
    });

    if (response.status !== 200) {
      const errorMessage = response.data
        ? response.data.message
        : "Unknown error";
      throw new Error(
        `Failed to fetch data. Status: ${response.status}. ${errorMessage}`
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
};
