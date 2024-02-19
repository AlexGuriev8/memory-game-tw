import { useState, useEffect } from "react";
import { API_KEY, API_URL } from "@/lib/constants";
import { CardInfo } from "@/lib/types";

export const useDogs = () => {
  const [data, setData] = useState<CardInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            "x-api-key": API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const json: CardInfo[] = await response.json();

        const updatedData = json.map((dog) => {
          const img = new Image();
          img.src = dog.url;

          return { ...dog };
        });

        setData(updatedData);
      } catch (err) {
        setError("An unknown error occurred ");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};
