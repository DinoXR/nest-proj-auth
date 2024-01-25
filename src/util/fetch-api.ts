import axios, { AxiosRequestConfig } from 'axios';

export async function fetchData(
  url: string,
  method: string,
  body?: any,
): Promise<any> {
  const options: AxiosRequestConfig = {
    method: method,
    url,
    data: body,
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
