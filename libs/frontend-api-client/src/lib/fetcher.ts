import { Fetcher } from 'swr';

import { API_BASE_URL } from './api';

type PayloadType = Record<string, any> | any[];

export async function fetcher<T extends PayloadType>(url: string) {
  const apiUrl = API_BASE_URL + url;
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error(`Error fetching data ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as T;
  return data;
}
