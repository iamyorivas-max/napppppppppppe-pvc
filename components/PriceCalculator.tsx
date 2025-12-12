import React, { useState } from 'react';
import { TableShape } from '../types';
import Button from './ui/Button';
import { Calculator, ArrowRight, Check } from 'lucide-react';

const PriceCalculator: React.FC = () => {
  const [shape, setShape] = useState<TableShape>(TableShape.RECTANGLE);
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [diameter, setDiameter] = useState<string>('');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    let area = 0;
    // Dummy pricing logic: $0.005 per square cm (assuming input is cm) + $15 base fee
    const baseFee = 15;
    const pricePerSqCm = 0.005;

    if (shape === TableShape.RECTANGLE || shape === TableShape.OVAL) {
      const l = parseFloat(length);
      const w = parseFloat(width);
      if (!isNaN(l) && !isNaN(w)) {
        area = l * w;
      }
    } else if (shape === TableShape.SQUARE) {
      const l = parseFloat(length);
      if (!isNaN(l)) {
        area = l * l;
      }
    } else if (shape === TableShape.ROUND) {
      const d = parseFloat(diameter);
      if (!isNaN(d)) {
        const r = d / 2;
        area = Math.PI * r * r;
      }
    }

    if (area > 0) {
      const price = baseFee + (area * pricePerSqCm);
      setCalculatedPrice(Math.round(price * 100) / 100);
    }
  };

  return (
    <div id="calculator" className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-secondary p-6 text-white text-center">
        <Calculator className="w-10 h-10 mx-auto mb-3 text-primary" />
        <h3 className="text-2xl font-bold">Instant Price Calculator</h3>
        <p className="text-slate-300 text-sm mt-1">Get a quote in seconds. No email required.</p>
      </div>
      
      <div className="p-8">
        <form onSubmit={handleCalculate} className="space-y-6">
          
          {/* Shape Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Select Your Table Shape</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.values(TableShape).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setShape(s);
                    setCalculatedPrice(null);
                  }}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                    shape === s 
                      ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary ring-opacity-50' 
                      : 'border-slate-200 text-slate-600 hover:border-primary/50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Dimensions Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(shape === TableShape.RECTANGLE || shape === TableShape.OVAL) && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Length (cm)</label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="e.g. 200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Width (cm)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="e.g. 90"
                    required
                  />
                </div>
              </>
            )}

            {shape === TableShape.SQUARE && (
               <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Side Length (cm)</label>
               <input
                 type="number"
                 value={length}
                 onChange={(e) => setLength(e.target.value)}
                 className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                 placeholder="e.g. 100"
                 required
               />
             </div>
            )}

            {shape === TableShape.ROUND && (
               <div className="md:col-span-2">
               <label className="block text-sm font-medium text-slate-700 mb-1">Diameter (cm)</label>
               <input
                 type="number"
                 value={diameter}
                 onChange={(e) => setDiameter(e.target.value)}
                 className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                 placeholder="e.g. 120"
                 required
               />
             </div>
            )}
          </div>

          {/* Action Button */}
          <Button type="submit" className="w-full justify-between group">
            <span>Calculate Price</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>

        {/* Result Area */}
        {calculatedPrice !== null && (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-800 font-medium">Estimated Price</p>
                <p className="text-3xl font-bold text-green-700">${calculatedPrice.toFixed(2)}</p>
              </div>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Order This Size
              </Button>
            </div>
            <div className="mt-2 flex items-center text-xs text-green-700">
               <Check className="w-3 h-3 mr-1" /> Includes free customization
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceCalculator;