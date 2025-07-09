// Only replacing handleSubmit inside HeroSection.tsx

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
    const response = await fetch(
      "https://api.github.com/repos/rovalinks-ai-works-launchpad/subscribers/dispatches",
      {
        method: "POST",
        headers: {
          "Accept": "application/vnd.github.everest-preview+json",
          "Authorization": `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`,
        },
        body: JSON.stringify({
          event_type: "new_subscriber",
          client_payload: { email },
        }),
      }
    );

    if (response.ok) {
      toast({
        title: "🎉 You're on the list!",
        description: "We'll keep you posted on our latest AI innovations.",
        className: "bg-primary text-primary-foreground",
      });
    } else {
      throw new Error("GitHub dispatch failed.");
    }
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error submitting email",
      description: "Something went wrong. Please try again later.",
    });
  }

  setIsLoading(false);
  setEmail("");
};
