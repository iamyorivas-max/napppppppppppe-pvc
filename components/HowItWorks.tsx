import React from 'react';
import { Ruler, ShoppingCart, Truck, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: Ruler,
    title: "1. Mesures",
    description: "Prenez les mesures exactes de votre table (longueur, largeur ou diamètre)."
  },
  {
    icon: ShoppingCart,
    title: "2. Commande",
    description: "Remplissez le formulaire avec vos dimensions et vos coordonnées en un clic."
  },
  {
    icon: CheckCircle2,
    title: "3. Confirmation",
    description: "Notre équipe vous contacte pour valider les détails avant la découpe."
  },
  {
    icon: Truck,
    title: "4. Livraison",
    description: "Recevez votre protection sur-mesure chez vous. Payez à la livraison."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Comment ça marche ?</h2>
          <p className="mt-4 text-lg text-slate-600">Commander votre protection de table sur-mesure n'a jamais été aussi simple.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 transition-transform group-hover:scale-110 duration-300 shadow-sm">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{step.description}</p>
              
              {/* Connector Line (Desktop Only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[1px] bg-slate-100 -z-10"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;