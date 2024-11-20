import { Exception } from "sass";
import { BASE_URL, LOGIN_ENDPOINT } from "./constants";
import axios, { AxiosInstance, AxiosError } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  url: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export class APIClient {
  axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      url: BASE_URL,
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async loginRequest(data: { email: string; password: string }) {
    return this.axiosInstance
      .post(BASE_URL + LOGIN_ENDPOINT, data)
      .then((res) => {
        console.log(res.status);
        if (res.status === 401) {
          console.log("status is 401");
          return {
            status: res.status,
            data: {
              content: "Could not login with the provided credentials.",
            },
          };
        } else return res.data;
      })
      .catch((err: AxiosError) => {
        console.log("ERROR", err);
        if (err.status === 401)
          throw Error("Could not authenticate with the provided credentials.");
      });
  }
}
