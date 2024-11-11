import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-radial from-divine/10 via-transparent to-transparent" />
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative">
        <div className="space-y-8">
          <div className="flex items-center gap-2 bg-divine/10 w-fit px-4 py-2 rounded-full border border-divine/20">
            <Star className="w-4 h-4 text-divine" />
            <span className="text-divine text-sm font-medium">AI-Powered Recruitment</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-divine via-mint to-divine-light bg-clip-text text-transparent">
              Hire top
              <br />
              tech talent
              <br />
              wisely
            </span>
          </h1>
          <p className="text-lg text-white/80 max-w-md">
            Find and hire the best tech professionals for your team with our AI-powered recruitment platform.
          </p>
          <div className="flex items-center gap-4">
            <Button className="bg-divine hover:bg-divine/90 text-forest font-medium px-8 py-6 text-lg">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="border-divine/20 text-divine hover:bg-divine/10">
              Watch Demo
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-divine to-mint rounded-2xl blur opacity-30" />
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
            alt="Tech professional"
            className="relative rounded-2xl shadow-2xl"
          />
          <div className="absolute -bottom-10 -left-10 bg-forest-light/80 p-6 rounded-xl shadow-xl backdrop-blur-sm border border-divine/10">
            <p className="text-divine text-4xl font-bold">124k+</p>
            <p className="text-white/80">Active candidates</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;