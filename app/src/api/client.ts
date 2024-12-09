import { BASE_API_URL, LOGIN_ENDPOINT, REFRESH_ENDPOINT } from "./constants";
import axios, { AxiosInstance, AxiosError } from "axios";

export class APIClient {
  axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      url: BASE_API_URL,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async loginRequest(data: { email: string; password: string }) {
    return this.axiosInstance
      .post(BASE_API_URL + LOGIN_ENDPOINT, data)
      .then((res) => {
        if (res.status === 401) {
          return {
            status: res.status,
            data: {
              content: "Could not login with the provided credentials.",
            },
          };
        } else return res.data;
      })
      .catch((err: AxiosError) => {
        console.log("API ERROR", err);
        if (err.status === 401)
          throw Error("Could not authenticate with the provided credentials.");
      });
  }

  async tokenRefreshRequest(data: { refresh: string }) {
    return this.axiosInstance
      .post(BASE_API_URL + REFRESH_ENDPOINT, data)
      .then((res) => res.data);
  }
}
