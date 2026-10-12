import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { contactSchema } from './contact-schema';

export const submitEnquiry = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env['SUPABASE_URL'];
    const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
    if (!url || !key) return { ok: false, message: 'Enquiries are temporarily unavailable. Please try again later.' };
    const client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith('sb_')) headers.delete('Authorization');
        headers.set('apikey', key);
        return fetch(input, { ...init, headers });
      } },
    });
    const { error } = await client.from('project_enquiries').insert({ name: data.name, email: data.email, phone: data.phone || null, project_type: data.projectType, description: data.description });
    return error ? { ok: false, message: 'Your enquiry could not be saved. Please try again.' } : { ok: true, message: 'Your project enquiry has been received. Thank you for sharing your vision.' };
  });