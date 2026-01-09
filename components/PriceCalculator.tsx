import React, { useState, useEffect, useMemo } from 'react';
import { TableShape, TableThickness } from '../types';
import Button from './ui/Button';
import { ShoppingCart, Check, Loader2, Ruler, ClipboardList, User, Plus, Trash2, Package } from 'lucide-react';

interface OrderItem {
  id: string;
  shape: TableShape;
  thickness: TableThickness;
  dimensions: string;
  price: number;
}

const PriceCalculator: React.FC = () => {
  // Current item being configured
  const [shape, setShape] = useState<TableShape>(TableShape.RECTANGLE);
  const [thickness, setThickness] = useState<TableThickness>(TableThickness.T20);
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [diameter, setDiameter] = useState<string>('');

  // Basket of items
  const [basket, setBasket] = useState<OrderItem[]>([]);
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Instant Price Calculation for the CURRENT item
  const currentPrice = useMemo(() => {
    let area = 0;
    const baseFee = 15;
    const pricePerSqCm = 0.005;
    
    // Thickness multiplier
    const thicknessMultiplier = thickness === TableThickness.T15 ? 1 : thickness === TableThickness.T20 ? 1.3 : 1.7;

    if (shape === TableShape.RECTANGLE || shape === TableShape.OVAL) {
      const l = parseFloat(length);
      const w = parseFloat(width);
      if (!isNaN(l) && !isNaN(w)) area = l * w;
    } else if (shape === TableShape.SQUARE) {
      const l = parseFloat(length);
      if (!isNaN(l)) area = l * l;
    } else if (shape === TableShape.ROUND) {
      const d = parseFloat(diameter);
      if (!isNaN(d)) {
        const r = d / 2;
        area = Math.PI * r * r;
      }
    }

    if (area > 0) {
      return Math.round((baseFee + (area * pricePerSqCm)) * thicknessMultiplier * 100) / 100;
    }
    return 0;
  }, [shape, thickness, length, width, diameter]);

  const addToBasket = () => {
    if (currentPrice <= 0) return;

    const dimensions = shape === TableShape.ROUND 
      ? `Diamètre: ${diameter}cm` 
      : shape === TableShape.SQUARE 
        ? `Côté: ${length}cm` 
        : `L: ${length}cm x l: ${width}cm`;

    const newItem: OrderItem = {
      id: Math.random().toString(36).substr(2, 9),
      shape,
      thickness,
      dimensions,
      price: currentPrice
    };

    setBasket([...basket, newItem]);
    // Reset dimensions for next item but keep shape/thickness as preference
    setLength('');
    setWidth('');
    setDiameter('');
  };

  const removeFromBasket = (id: string) => {
    setBasket(basket.filter(item => item.id !== id));
  };

  const totalPrice = basket.reduce((sum, item) => sum + item.price, 0);

  const handleOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (basket.length === 0) {
      setError("Veuillez ajouter au moins une nappe à votre commande.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    // Format the items for Formspree
    const itemsDescription = basket.map((item, index) => 
      `Nappe ${index + 1}: ${item.shape}, ${item.thickness}, ${item.dimensions}, Prix: ${item.price}€`
    ).join('\n');
    
    formData.append('liste_des_produits', itemsDescription);
    formData.append('total_commande', `${totalPrice.toFixed(2)}€`);

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
        setBasket([]);
      } else {
        setError("Une erreur est survenue lors de l'envoi de votre commande.");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="calculator" className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 transition-all duration-300">
      <div className="bg-secondary p-6 text-white text-center">
        <ShoppingCart className="w-10 h-10 mx-auto mb-3 text-primary" />
        <h3 className="text-2xl font-bold">Panier sur-mesure</h3>
        <p className="text-slate-300 text-sm mt-1">Configurez une ou plusieurs nappes</p>
      </div>
      
      <div className="p-6">
        {submitSuccess ? (
          <div className="text-center py-12 animate-fade-in-up">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Commande Reçue !</h4>
            <p className="text-slate-600 mb-6">Merci pour votre confiance. Nous vous contacterons sous 24h pour confirmer les détails et la livraison.</p>
            <Button onClick={() => setSubmitSuccess(false)}>Passer une autre commande</Button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 1. Item Configuration */}
            <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-2">
                <Plus className="w-4 h-4" /> Configurer une nappe
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {Object.values(TableShape).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setShape(s)}
                    className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                      shape === s ? 'border-primary bg-primary text-white' : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {Object.values(TableThickness).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setThickness(t)}
                    className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                      thickness === t ? 'border-primary bg-primary text-white' : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {(shape === TableShape.RECTANGLE || shape === TableShape.OVAL) && (
                  <>
                    <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm" placeholder="Long. (cm)" />
                    <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm" placeholder="Larg. (cm)" />
                  </>
                )}
                {shape === TableShape.SQUARE && (
                  <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="col-span-2 w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm" placeholder="Côté (cm)" />
                )}
                {shape === TableShape.ROUND && (
                  <input type="number" value={diameter} onChange={(e) => setDiameter(e.target.value)} className="col-span-2 w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm" placeholder="Diamètre (cm)" />
                )}
              </div>

              {/* Instant Price Box */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div className="text-slate-600 text-sm font-medium">
                  Prix : <span className="text-lg font-bold text-slate-900">{currentPrice > 0 ? `${currentPrice.toFixed(2)}€` : '-- €'}</span>
                </div>
                <Button 
                  size="sm" 
                  disabled={currentPrice <= 0} 
                  onClick={addToBasket}
                  className="bg-primary hover:bg-primaryDark text-white h-9"
                >
                  <Plus className="w-4 h-4 mr-1" /> Ajouter
                </Button>
              </div>
            </div>

            {/* 2. Basket Display */}
            {basket.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-wider">
                  <Package className="w-4 h-4" /> Votre Commande ({basket.length})
                </div>
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                  {basket.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg text-sm group">
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800">{item.shape} - {item.thickness}</div>
                        <div className="text-slate-500 text-xs">{item.dimensions}</div>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <span className="font-bold text-primary">{item.price.toFixed(2)}€</span>
                        <button onClick={() => removeFromBasket(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-slate-200 flex justify-between items-center px-1">
                  <span className="text-slate-500 font-medium">Total Commande:</span>
                  <span className="text-2xl font-black text-primary">{totalPrice.toFixed(2)}€</span>
                </div>
              </div>
            )}

            {/* 3. Final Checkout Form */}
            {basket.length > 0 && (
              <form onSubmit={handleOrderSubmit} className="space-y-4 pt-4 border-t-2 border-dashed border-slate-100">
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                  <User className="w-4 h-4" /> Vos Coordonnées
                </div>
                
                <div className="space-y-3">
                  <input name="nom_complet" type="text" required className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" placeholder="Nom complet" />
                  <input name="telephone" type="tel" required className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" placeholder="Téléphone" />
                  <input name="ville" type="text" required className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" placeholder="Ville" />
                </div>

                {error && <p className="text-red-500 text-xs bg-red-50 p-2 rounded">{error}</p>}

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 h-14" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Envoi en cours...</>
                  ) : (
                    <><ShoppingCart className="w-5 h-5 mr-2" /> Valider ma commande</>
                  )}
                </Button>
                
                <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest">
                  Paiement à la livraison après vérification
                </p>
              </form>
            )}

            {basket.length === 0 && (
              <div className="text-center py-6 text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
                <Package className="w-8 h-8 mx-auto mb-2 opacity-20" />
                <p className="text-xs uppercase tracking-widest">Votre panier est vide</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceCalculator;