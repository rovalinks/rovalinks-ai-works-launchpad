// HeroSection.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export const HeroSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast({
        variant: "destructive",
        title: "Oops! Enter a valid email.",
        description: "Please check your email format and try again.",
      });
      return;
    }

    setIsLoading(true);

    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      toast({
        title: "🎉 You're on the list!",
        description: "We'll keep you posted on our latest AI innovations.",
        className: "bg-primary text-primary-foreground",
      });
      setEmail('');
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "Try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-background">
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-8">
          <span className="bg-gradient-hero bg-clip-text text-transparent">
            Rovalinks AI Works
          </span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Your email for early access & updates"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 text-lg"
            />
            <Button type="submit" disabled={isLoading} className="h-14 px-8 text-lg">
              {isLoading ? 'Joining...' : 'Notify Me'}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">💡 Be first in line to see what's coming.</p>
        </form>
      </div>
    </section>
  );
};
