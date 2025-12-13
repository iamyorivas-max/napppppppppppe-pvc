import React from 'react';
import Button from './ui/Button';
import PriceCalculator from './PriceCalculator';
import { ShieldCheck, Star } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wide">
              <Star className="w-3 h-3 mr-1 fill-current" /> #1 Rated Table Protection
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Custom PVC Table Covers <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primaryDark">
                Made to Fit Perfectly
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              Protect your furniture without hiding its beauty. Our crystal-clear, heavy-duty PVC covers are custom cut to your exact dimensions. Waterproof, durable, and easy to clean.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth'})}>
                Calculate Your Price
              </Button>
              <Button variant="outline" size="lg">
                View Gallery
              </Button>
            </div>

            <div className="pt-4 flex items-center gap-6 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" /> 2mm Thickness
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" /> Heat Resistant
              </div>
            </div>
          </div>

          {/* Calculator Card */}
          <div className="relative lg:ml-auto w-full max-w-md">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl -z-10"></div>
            <PriceCalculator />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;