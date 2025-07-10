import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import heroBackground from '@/assets/hero-bg.jpg';

export const HeroSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast({
        variant: 'destructive',
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('https://github-dispatch-proxy.rovalinksit.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok || !data?.status) {
        throw new Error('Unexpected server response');
      }

      if (data.status === 'new') {
        toast({
          title: "🎉 You're on the list!",
          description: "We've added your email. Stay tuned for updates!",
          className: 'bg-primary text-primary-foreground',
        });
      } else if (data.status === 'exists') {
        toast({
          title: '👋 Already Subscribed!',
          description: 'You’ve already signed up. Stay tuned for Rovalinks AI updates!',
          className: 'bg-yellow-100 text-yellow-800',
        });
      } else {
        throw new Error('Unknown status');
      }

      setEmail('');
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Subscription Failed',
        description: err.message || 'Something went wrong. Try again later.',
      });
    } finally {
      setIsLoading(false);
    }
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
    </section>
  );
};
