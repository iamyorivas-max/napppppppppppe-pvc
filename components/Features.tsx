import React from 'react';
import { Droplets, Shield, Sparkles, Maximize, Scissors, Sun } from 'lucide-react';
import { Feature } from '../types.ts';

const features: Feature[] = [
  {
    title: "100% Waterproof",
    description: "Spills, drinks, and sauces wipe right off without staining your table.",
    icon: Droplets
  },
  {
    title: "Anti-Scratch Surface",
    description: "Protect your expensive wood, glass, or marble from daily wear and tear.",
    icon: Shield
  },
  {
    title: "Glass-Like Clarity",
    description: "Our crystal clear PVC lets your table's natural beauty shine through.",
    icon: Sparkles
  },
  {
    title: "Custom Fit",
    description: "Cut to precision with CNC machines for a perfect edge every time.",
    icon: Maximize
  },
  {
    title: "Easy to Trim",
    description: "Can be easily trimmed at home with a sharp cutter if needed.",
    icon: Scissors
  },
  {
    title: "Heat Resistant",
    description: "Withstands warm plates and bowls up to 176°F (80°C).",
    icon: Sun
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6">
              Why Choose Our PVC Covers?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Cheap tablecloths slide around and hide your furniture. Our heavy-duty 2mm PVC protectors stay in place and provide an invisible shield against life's messes.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center text-primary">
                      <feature.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{feature.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-96 lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
             <img 
               src="https://picsum.photos/800/800?random=1" 
               alt="PVC Table Cover Close Up" 
               className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105 duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
               <div className="text-white">
                 <p className="font-bold text-xl">Crystal Clear Protection</p>
                 <p className="text-white/80 text-sm">Invisible shield for your dining table</p>
               </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;