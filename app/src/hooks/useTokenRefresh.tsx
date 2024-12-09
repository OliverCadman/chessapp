import { useEffect } from "react";
import { APIClient } from "../api/client";
import { useLobbyStore } from "../store/lobby";

const useTokenRefresh = (client: APIClient, data: { refresh: string }) => {
  console.log("Calling useTokenRefresh...");
  console.log(client, data);
  if (!data) return;

  const REFRESH_SCHEDULE = 180000;
  useEffect(() => {
    const interval = setInterval(() => {
      client.tokenRefreshRequest(data).then((data: any) => {
        console.log("Refreshing token...", data);
        // useLobbyStore.setState(() => {

        // })
      });

      return () => clearInterval(interval);
    }, REFRESH_SCHEDULE);
  }, []);
};

export default useTokenRefresh;
