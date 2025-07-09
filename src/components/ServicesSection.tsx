import { Shield, Cloud, Users, Network, Settings, Code, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    icon: Shield,
    title: "Cybersecurity Solutions",
    description: "Safeguard your business with AI-enhanced threat detection, compliance, and data protection.",
    color: "text-primary"
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Scalable and secure cloud environments that boost agility and reduce cost.",
    color: "text-secondary"
  },
  {
    icon: Users,
    title: "IT Consulting",
    description: "Technology guidance for digital transformation, automation, and growth.",
    color: "text-accent"
  },
  {
    icon: Network,
    title: "Network Solutions",
    description: "Reliable, high-speed networking infrastructure with monitoring and optimization.",
    color: "text-primary"
  },
  {
    icon: Settings,
    title: "Managed Services",
    description: "Always-on system monitoring, updates, and performance tuning.",
    color: "text-secondary"
  },
  {
    icon: Code,
    title: "Digital Solutions",
    description: "Custom software, web platforms, and full-stack development services.",
    color: "text-accent"
  },
  {
    icon: Plus,
    title: "...And More",
    description: "Including DevOps, ML Ops, system integration, and next-gen tech support.",
    color: "text-primary"
  }
];

export const ServicesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-muted/30 to-muted/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              What We Offer
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technology services designed to accelerate your digital transformation
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.title}
                className="group hover:shadow-card hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary/20 bg-white/80 backdrop-blur-sm animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 p-4 rounded-full bg-gradient-to-br from-${service.color.split('-')[1]}/10 to-${service.color.split('-')[1]}/20 group-hover:shadow-glow transition-all duration-300`}>
                    <Icon className={`w-full h-full ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-center leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};