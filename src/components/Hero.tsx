import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-up">
          <div className="flex items-center gap-2 bg-mint/10 w-fit px-4 py-2 rounded-full">
            <Star className="w-4 h-4 text-mint" />
            <span className="text-mint text-sm font-medium">AI-Powered Recruitment</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-mint-light bg-clip-text text-transparent">
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
            <Button className="bg-mint hover:bg-mint-light text-forest font-medium px-8 py-6 text-lg transition-all duration-300 hover:scale-105">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 transition-all duration-300">
              Watch Demo
            </Button>
          </div>
        </div>
        <div className="relative animate-fade-in">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-mint to-mint-light rounded-2xl blur opacity-30"></div>
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
            alt="Tech professional"
            className="relative rounded-2xl shadow-2xl animate-float"
          />
          <div className="absolute -bottom-10 -left-10 bg-forest-light p-6 rounded-xl shadow-xl backdrop-blur-sm border border-white/10">
            <p className="text-mint text-4xl font-bold">124k+</p>
            <p className="text-white/80">Active candidates</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;