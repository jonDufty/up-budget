import { API_BASE_URL } from './api'

export async function postMutation<T extends Record<string, any> | any[]>(endpoint: string, payload: T) {
  const apiUrl = API_BASE_URL + endpoint;
  console.log(`Sending to ${apiUrl}`)
  const res = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`error updating data ${res.statusText}`)
  }
};

interface updateLocalOptions {
  delete: boolean
}

export function updateLocalData< T extends Record<string, any>>(existing: T[], newData: T, key: string, options: updateLocalOptions) {
  const existingCopy = [...existing];
  const index = existing.findIndex((v) => v[key] === newData[key]);
  if (index > -1) {
    options.delete ? existingCopy.splice(index, 1) : existingCopy[index] = newData;
  }
  return existingCopy;
}
