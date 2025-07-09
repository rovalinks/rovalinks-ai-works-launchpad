import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export const HeroSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast({
        variant: 'destructive',
        title: 'Oops! Enter a valid email.',
        description: 'Please check your email format and try again.',
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: '🎉 You\'re on the list!',
          description: 'We\'ll keep you posted on our latest AI innovations.',
          className: 'bg-primary text-primary-foreground',
        });
        setEmail('');
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-background">
      {/* Background & Overlay omitted for brevity */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-hero bg-clip-text text-transparent">
          Rovalinks AI Works
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
          We create AI-powered products that fuel innovation, speed, and impact.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Your email for early access & updates"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 text-lg border-2 border-primary/20"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="h-14 px-8 text-lg font-semibold bg-gradient-primary"
            >
              {isLoading ? 'Joining...' : 'Notify Me'}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            💡 Be first in line to see what's coming.
          </p>
        </form>
      </div>
    </section>
  );
};
