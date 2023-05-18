import { BE_BASE_URL } from "@/utils/constants";
import axios from "axios";

export const fetchResponse = async (url: string, msg: string) => {
  const mainUrl = BE_BASE_URL + url;
  let response = axios
    .post(mainUrl, { prompt: msg })
    .then(async (res) => {
      return res.data.message;
    })
    .catch((err) => {
      return err.response.data.success;
    });
  return response;
};
