import { BE_BASE_URL } from "@/utils/constants";
import axios from "axios";

export const fetchResponse = (url: string, msg: string, callback: any) => {
  const mainUrl = BE_BASE_URL + url;
  axios
    .post(mainUrl, { prompt: msg })
    .then((response) => {
      console.log(response.data.message);
      callback(response.data.message);
    })
    .catch((err) => {
      console.log(err);
    });
};
