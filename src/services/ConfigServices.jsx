import PocketBase from 'pocketbase';

const baseUrl = 'https://bookapp.fly.dev';

export const pb = new PocketBase(baseUrl);
export const api = `${baseUrl}/api`;
export const storage = `${api}/files`;

