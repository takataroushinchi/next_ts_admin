import { createClient } from 'microcms-js-sdk'; //ES6

// Initialize Client SDK.
export const client = createClient({
  serviceDomain: process.env.API_DOMAIN,
  apiKey: process.env.API_KEY,
});