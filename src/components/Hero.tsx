import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Hire top
            <br />
            tech talent
            <br />
            wisely
          </h1>
          <p className="text-lg text-white/80 max-w-md">
            Find and hire the best tech professionals for your team with our AI-powered recruitment platform.
          </p>
          <div className="flex items-center gap-4">
            <Button className="bg-mint hover:bg-mint-light text-forest font-medium px-8 py-6 text-lg">
              Explore! <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
            alt="Tech professional"
            className="rounded-2xl shadow-2xl"
          />
          <div className="absolute -bottom-10 -left-10 bg-forest-light p-6 rounded-xl shadow-xl">
            <p className="text-mint text-4xl font-bold">124k+</p>
            <p className="text-white/80">Active candidates</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;