import React from 'react';
import { Ruler, MousePointerClick, Truck, CreditCard } from 'lucide-react';

const steps = [
  {
    icon: MousePointerClick,
    title: "1. Choose Your Shape",
    description: "Select from Rectangle, Round, Oval, or Square. We can cut to any custom shape you need."
  },
  {
    icon: Ruler,
    title: "2. Enter Dimensions",
    description: "Measure your table top precisely. Enter the length, width, or diameter in our calculator."
  },
  {
    icon: CreditCard,
    title: "3. Instant Price & Order",
    description: "See the exact price immediately. Add to cart and checkout securely online."
  },
  {
    icon: Truck,
    title: "4. Fast Delivery",
    description: "We precision-cut your cover and ship it rolled in a protective box within 48 hours."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">How to Order Your Custom Cover</h2>
          <p className="mt-4 text-lg text-slate-600">Getting a perfectly fitted table protector is easier than you think. Just follow these simple steps.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 transition-transform group-hover:scale-110 duration-300">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.description}</p>
              
              {/* Connector Line (Desktop Only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary/30 to-transparent -z-10"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;