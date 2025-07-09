export const CoreFocusSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Born for AI. Built for You.
            </span>
          </h2>

          {/* Main Paragraph */}
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto">
            Rovalinks AI Works is driven by one goal: to build AI-first solutions that transform industries, simplify lives, and accelerate the future.
          </p>

          {/* AI Focus Badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-primary text-white px-8 py-4 rounded-full font-semibold text-lg shadow-glow animate-pulse">
            <span className="text-2xl">🔍</span>
            <span>Major focus: AI-driven product development</span>
          </div>
        </div>
      </div>
    </section>
  );
};