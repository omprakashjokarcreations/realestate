import { z } from 'zod';
export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(100),
  email: z.string().trim().email('Please enter a valid email.').max(255),
  phone: z.string().trim().max(40).regex(/^[+\d\s().-]*$/, 'Please enter a valid phone number.'),
  projectType: z.string().trim().min(1, 'Please select a requirement.'),
  description: z.string().trim().min(10, 'Please share a little more about your project.').max(3000),
  website: z.string().max(0),
});