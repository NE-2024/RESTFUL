import useSWR from "swr";
import axios, { AuthApi } from "./axios.config";

export const useAllBooks = (page: number, limit: number) => {
  const { data, mutate, error } = useSWR(
    "/books/allbooks",
    async (url) => {
      try {
        const response = await AuthApi.get(url);
        console.log(response.data.data);
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );
  return {
    bookData: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
