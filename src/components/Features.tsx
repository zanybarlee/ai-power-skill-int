import { Check, Star, Award, ShieldCheck } from "lucide-react";

const Features = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-mint-light bg-clip-text text-transparent">
            How it works?
          </h2>
          <p className="text-white/80">Our AI-powered platform simplifies tech recruitment</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Star,
              title: "Post Your Requirements",
              description: "Specify your needs and let our AI match you with the perfect candidates",
            },
            {
              icon: Award,
              title: "Review Matches",
              description: "Get a curated list of pre-screened candidates that match your criteria",
            },
            {
              icon: ShieldCheck,
              title: "Hire the Best",
              description: "Interview and hire top tech talent efficiently",
            },
          ].map((feature, index) => (
            <div 
              key={index} 
              className="group bg-forest-light p-8 rounded-xl border border-white/10 transition-all duration-300 hover:scale-105 hover:bg-forest-light/80"
            >
              <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {React.createElement(feature.icon, { className: "w-6 h-6 text-forest" })}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;