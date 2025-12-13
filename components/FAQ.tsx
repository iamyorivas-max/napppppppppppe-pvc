import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQItem } from '../types.ts';

const faqs: FAQItem[] = [
  {
    question: "How do I measure my table correctly?",
    answer: "For rectangular or square tables, measure the length and width of the flat surface. Do not include beveled edges if you want the cover to sit flat. For round tables, measure the exact diameter through the center."
  },
  {
    question: "Is the PVC heat resistant?",
    answer: "Yes, our 2mm PVC covers are heat resistant up to 176°F (80°C). However, for very hot pans directly from the stove, we still recommend using a trivet to prevent deformation."
  },
  {
    question: "Will it stick to my table?",
    answer: "On very smooth glass or high-gloss lacquered finishes, air bubbles (watermarks) might appear. For these surfaces, we recommend our 'Frosted' or 'Matte' finish options to prevent this sticking effect."
  },
  {
    question: "How do I clean the cover?",
    answer: "Simply wipe it down with a damp cloth and mild soap. Do not use harsh chemicals or abrasive sponges as they might cloud the transparency over time."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-slate-200 rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-slate-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-slate-900">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-4 pt-0 text-slate-600 bg-white">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;