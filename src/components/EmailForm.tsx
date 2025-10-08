import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail, CheckCircle2 } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'live.com',
  'msn.com',
  'me.com',
  'mail.com',
  'protonmail.com',
  'yandex.com',
  'zoho.com',
];

// Replace this with your actual email address where you want to receive notifications
const NOTIFY_EMAIL = 'ireneyzpan@gmail.com';

export function EmailForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    // Check if it's a personal email
    const domain = email.split('@')[1]?.toLowerCase();
    if (domain && PERSONAL_EMAIL_DOMAINS.includes(domain)) {
      setError('Please enter a company email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0a93cb36/submit-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ 
            email,
            notifyEmail: NOTIFY_EMAIL 
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error('Error submitting email:', data);
        setError('Failed to submit. Please try again.');
        setIsSubmitting(false);
        return;
      }

      console.log('Email submitted successfully:', data);
      setSubmitted(true);
      setEmail('');
    } catch (err) {
      console.error('Error submitting email:', err);
      setError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 md:p-8">
        <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-green-400" />
        <p className="text-center text-white text-sm sm:text-base px-2">
          Thank you for your interest! We'll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      <div className="flex flex-col md:flex-row gap-3 items-start justify-center">
        <div className="w-full md:w-80 space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="your.email@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(''); // Clear error when user types
              }}
              className="pl-9 h-10 sm:h-11 bg-white w-full text-sm sm:text-base"
            />
          </div>
        </div>
        <Button type="submit" className="h-10 sm:h-11 px-4 sm:px-6 whitespace-nowrap w-full md:w-auto text-sm sm:text-base" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Request Information'}
        </Button>
      </div>
      {error && (
        <p className="text-xs sm:text-sm text-red-400 text-center px-2">{error}</p>
      )}
    </form>
  );
}
