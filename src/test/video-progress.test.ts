import { describe, it, expect } from 'vitest';
import { progressToTime, constructionVideo } from '../lib/video-config';
import { contactSchema } from '../lib/contact-schema';
describe('construction scroll rules', () => {
  it('maps progress to the supplied ten-second sequence', () => {
    expect(progressToTime(0, 10)).toBe(0);
    expect(progressToTime(0.5, 10)).toBe(4.975);
    expect(progressToTime(1, 10)).toBe(9.95);
  });
  it('reverses without restarting', () => { expect(progressToTime(0.25, 10)).toBeLessThan(progressToTime(0.75, 10)); });
  it('pins for three desktop viewports and less on mobile', () => { expect(constructionVideo.desktopScreens).toBe(3); expect(constructionVideo.mobileScreens).toBe(1.8); });
});
describe('enquiry validation', () => {
  const valid = { name: 'Test', email: 'test@example.com', phone: '', projectType: 'Custom home', description: 'A thoughtful custom home.', website: '' };
  it('allows optional phone', () => { expect(contactSchema.safeParse(valid).success).toBe(true); });
  it('rejects invalid email and missing description', () => { expect(contactSchema.safeParse({ ...valid, email: 'bad', description: '' }).success).toBe(false); });
});