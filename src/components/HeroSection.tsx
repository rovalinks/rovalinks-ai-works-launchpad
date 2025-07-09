import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import heroBackground from '@/assets/hero-bg.jpg';

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
      const response = await fetch(
        'https://api.github.com/repos/rovalinks-ai-works-launchpad/subscribers/dispatches',
        {
          method: 'POST',
          headers: {
            Accept: 'application/vnd.github.everest-preview+json',
            Authorization:
              'Bearer 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',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event_type: 'new_subscriber',
            client_payload: { email },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('GitHub dispatch failed');
      }

      toast({
        title: "🎉 You're on the list!",
        description: "We'll keep you posted on our latest AI innovations.",
        className: 'bg-primary text-primary-foreground',
      });
      setEmail('');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: 'Unable to subscribe. Please try again later.',
      });
    }

    setIsLoading(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-background">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-in mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-2">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Rovalinks AI Works
            </span>
          </h1>
        </div>

        <div className="animate-slide-up max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              AI That Moves the World Forward
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed">
            We create AI-powered products that fuel innovation, speed, and impact.
          </p>

          <div className="animate-scale-in max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Your email for early access & updates"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-14 text-lg border-2 border-primary/20 focus:border-primary bg-white/90 backdrop-blur-sm"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-14 px-8 text-lg font-semibold bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105"
                >
                  {isLoading ? 'Joining...' : 'Notify Me'}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <span>💡</span>
                Be first in line to see what's coming.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-secondary/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/30 rounded-full blur-lg animate-pulse" />
    </section>
  );
};
