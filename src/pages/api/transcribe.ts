import { BE_BASE_URL } from "@/utils/constants";
import axios from "axios";

export const transcribe = async (url: string, formData: any) => {
  const mainUrl = BE_BASE_URL + url;
  const config = {
    headers: {
      'Content-type': "multipart/form-data"
    },
    formData
  }
  let response = axios
    .post(mainUrl, formData, config)
    .then(async (res) => {
      return res.data.text;
    })
    .catch((err) => {
      return err.response.data.success;
    });
  return response;
};