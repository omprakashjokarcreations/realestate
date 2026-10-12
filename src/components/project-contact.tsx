import { useState, type FormEvent } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contactSchema } from '@/lib/contact-schema';
import { submitEnquiry } from '@/lib/contact.functions';

export function ProjectContact() {
  const submit = useServerFn(submitEnquiry);
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = contactSchema.safeParse(data);
    setFeedback(''); setSuccess(false);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach(issue => { next[String(issue.path[0])] = issue.message; });
      setErrors(next); return;
    }
    setErrors({}); setPending(true);
    try {
      const result = await submit({ data: parsed.data });
      setFeedback(result.message); setSuccess(result.ok);
      if (result.ok) form.reset();
    } catch { setFeedback('Your enquiry could not be sent. Please try again.'); }
    finally { setPending(false); }
  }
  const fieldError = (field: string) => errors[field] ? <span id={`${field}-error`} className="field-error">{errors[field]}</span> : null;
  return <form onSubmit={onSubmit} noValidate className="contact-form">
    <div className="form-grid">
      <label>Your name<input name="name" autoComplete="name" maxLength={100} placeholder="Full name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{fieldError('name')}</label>
      <label>Email address<input name="email" type="email" autoComplete="email" maxLength={255} placeholder="you@example.com" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />{fieldError('email')}</label>
      <label>Phone <span className="text-muted-foreground">(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Your phone number" aria-invalid={Boolean(errors.phone)} />{fieldError('phone')}</label>
      <label>Project type<select name="projectType" defaultValue="Custom home"><option>Custom home</option><option>Renovation</option><option>Interior design</option><option>Not sure yet</option></select></label>
    </div>
    <label>Tell us about your vision<textarea name="description" maxLength={3000} rows={3} placeholder="The home you imagine. The way you want to live." required aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? 'description-error' : undefined} />{fieldError('description')}</label>
    <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="form-bottom"><span className="text-muted-foreground">Every home begins with a conversation.</span><Button className="editorial-button" type="submit" disabled={pending}>{pending ? 'Sending' : 'Send Your Enquiry'}{pending ? <Loader2 className="animate-spin" /> : <ArrowUpRight />}</Button></div>
    {feedback && <p role="status" className={success ? 'submission-success' : 'field-error'}>{feedback}</p>}
  </form>;
}