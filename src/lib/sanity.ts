import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: 'wmpguy8j',        
  dataset: 'production',
  apiVersion: '2025-04-03',     
  useCdn: true,                
});
