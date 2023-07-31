import PocketBase from 'pocketbase';

const baseUrl = 'http://localhost:4000';

export const pb = new PocketBase(baseUrl);
export const api = `${baseUrl}/api`;
export const storage = `${api}/files`;

