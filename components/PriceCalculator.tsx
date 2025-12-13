import React, { useState } from 'react';
import { TableShape } from '../types';
import Button from './ui/Button';
import { Calculator, ArrowRight, Check, ShoppingCart, Loader2 } from 'lucide-react';

const PriceCalculator: React.FC = () => {
  const [shape, setShape] = useState<TableShape>(TableShape.RECTANGLE);
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [diameter, setDiameter] = useState<string>('');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  // Form handling state
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOrderForm(false);
    setSubmitSuccess(false);

    let area = 0;
    // Pricing logic: $0.005 per square cm + $15 base fee
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

  const handleOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://formspree.io/f/movgydnl", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setShowOrderForm(false);
        // Reset fields
        setLength('');
        setWidth('');
        setDiameter('');
      } else {
        const data = await response.json();
        if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
          setError(data["errors"].map((error: any) => error["message"]).join(", "));
        } else {
          setError("Oops! There was a problem submitting your order.");
        }
      }
    } catch (err) {
      setError("Oops! There was a problem connecting to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDimensionsString = () => {
    if (shape === TableShape.ROUND) return `Diameter: ${diameter}cm`;
    if (shape === TableShape.SQUARE) return `Side: ${length}cm`;
    return `Length: ${length}cm, Width: ${width}cm`;
  };

  return (
    <div id="calculator" className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-secondary p-6 text-white text-center">
        <Calculator className="w-10 h-10 mx-auto mb-3 text-primary" />
        <h3 className="text-2xl font-bold">Instant Price Calculator</h3>
        <p className="text-slate-300 text-sm mt-1">Get a quote & order in seconds.</p>
      </div>
      
      <div className="p-8">
        {submitSuccess ? (
          <div className="text-center py-8 animate-fade-in-up">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Order Received!</h4>
            <p className="text-slate-600 mb-6">Thank you for your order. We will contact you shortly to confirm details and payment.</p>
            <Button onClick={() => {
              setSubmitSuccess(false);
              setCalculatedPrice(null);
            }}>Calculate Another</Button>
          </div>
        ) : (
          <>
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
                        setShowOrderForm(false);
                      }}
                      className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                        shape === s 
                          ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary ring-opacity-50' 
                          : 'border-slate-200 text-slate-600 hover:border-primary/50'
                      }`}
                      disabled={showOrderForm}
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
                        disabled={showOrderForm}
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
                        disabled={showOrderForm}
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
                     disabled={showOrderForm}
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
                     disabled={showOrderForm}
                   />
                 </div>
                )}
              </div>

              {!showOrderForm && (
                <Button type="submit" className="w-full justify-between group">
                  <span>Calculate Price</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
            </form>

            {/* Result Area */}
            {calculatedPrice !== null && (
              <div className="mt-8 animate-fade-in-up">
                
                {/* Price Display */}
                <div className={`p-4 bg-green-50 border border-green-200 rounded-lg transition-opacity duration-300 ${showOrderForm ? 'opacity-80' : 'opacity-100'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-800 font-medium">Estimated Price</p>
                      <p className="text-3xl font-bold text-green-700">${calculatedPrice.toFixed(2)}</p>
                    </div>
                    {!showOrderForm && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => setShowOrderForm(true)}>
                        Order This Size
                      </Button>
                    )}
                  </div>
                  {!showOrderForm && (
                     <div className="mt-2 flex items-center text-xs text-green-700">
                      <Check className="w-3 h-3 mr-1" /> Includes free customization
                    </div>
                  )}
                </div>

                {/* Order Form */}
                {showOrderForm && (
                  <form onSubmit={handleOrderSubmit} className="mt-6 space-y-4 pt-6 border-t border-slate-100 animate-fade-in-up">
                    <h4 className="font-semibold text-slate-900 mb-2">Enter Shipping Details</h4>
                    
                    {/* Hidden fields for Formspree */}
                    <input type="hidden" name="product_shape" value={shape} />
                    <input type="hidden" name="product_dimensions" value={getDimensionsString()} />
                    <input type="hidden" name="estimated_price" value={`$${calculatedPrice.toFixed(2)}`} />

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                      <input name="name" type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder="John Doe" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                      