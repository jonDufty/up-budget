import { API_BASE_URL } from './api'

interface mutationOptions {
  method?: string;
}

export async function postMutation<T extends Record<string, any> | any[]>(endpoint: string, payload: T, options?: mutationOptions) {
  const apiUrl = API_BASE_URL + endpoint;
  console.log(`Sending to ${apiUrl}`)
  const res = await fetch(apiUrl, {
    method: options?.method || 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`error updating data ${res.statusText}`)
  }
};

export interface UpdateLocalOptions {
  delete?: boolean;
}

export function updateLocalData< T extends Record<string, any>>(existing: T[] | undefined, newData: T, key: string, options?: UpdateLocalOptions) {
  if (!existing) {
    return existing
  }
  const existingCopy = [...existing];
  const index = existing.findIndex((v) => v[key] === newData[key]);
  if (index > -1) {
    options?.delete ? existingCopy.splice(index, 1) : existingCopy[index] = newData;
  }
  return existingCopy;
}
