import React, { useState } from 'react';
import { TableShape, TableThickness } from '../types';
import Button from './ui/Button';
import { ShoppingCart, Check, Loader2, Ruler, ClipboardList, User } from 'lucide-react';

const PriceCalculator: React.FC = () => {
  const [shape, setShape] = useState<TableShape>(TableShape.RECTANGLE);
  const [thickness, setThickness] = useState<TableThickness>(TableThickness.T20);
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [diameter, setDiameter] = useState<string>('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    // Add calculated dimensions to the form data
    const dimensions = shape === TableShape.ROUND 
      ? `Diamètre: ${diameter}cm` 
      : shape === TableShape.SQUARE 
        ? `Côté: ${length}cm` 
        : `L: ${length}cm x l: ${width}cm`;
    
    formData.append('dimensions_detaillees', dimensions);

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
        // Reset fields
        setLength('');
        setWidth('');
        setDiameter('');
      } else {
        const data = await response.json();
        if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
          setError(data["errors"].map((error: any) => error["message"]).join(", "));
        } else {
          setError("Une erreur est survenue lors de l'envoi de votre commande.");
        }
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
        <h3 className="text-2xl font-bold">Commander Votre Protection</h3>
        <p className="text-slate-300 text-sm mt-1">Sur-mesure, livré rapidement chez vous.</p>
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
          <form onSubmit={handleOrderSubmit} className="space-y-6">
            {/* Section 1: Produit */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                <ClipboardList className="w-4 h-4" /> 1. Configuration
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Forme de la table</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(TableShape).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setShape(s)}
                      className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                        shape === s 
                          ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary ring-opacity-20' 
                          : 'border-slate-200 text-slate-600 hover:border-primary/50'
                      }`}
                    >
                      <input type="radio" name="forme" value={s} checked={shape === s} className="hidden" readOnly />
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Épaisseur du PVC</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.values(TableThickness).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setThickness(t)}
                      className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                        thickness === t 
                          ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary ring-opacity-20' 
                          : 'border-slate-200 text-slate-600 hover:border-primary/50'
                      }`}
                    >
                      <input type="radio" name="epaisseur" value={t} checked={thickness === t} className="hidden" readOnly />
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 2: Dimensions */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                <Ruler className="w-4 h-4" /> 2. Dimensions (cm)
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {(shape === TableShape.RECTANGLE || shape === TableShape.OVAL) && (
                  <>
                    <div>
                      <input
                        type="number"
                        name="longueur"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                        placeholder="Long. (cm)"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        name="largeur"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                        placeholder="Larg. (cm)"
                        required
                      />
                    </div>
                  </>
                )}

                {shape === TableShape.SQUARE && (
                   <div className="col-span-2">
                   <input
                     type="number"
                     name="cote"
                     value={length}
                     onChange={(e) => setLength(e.target.value)}
                     className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                     placeholder="Côté (cm)"
                     required
                   />
                 </div>
                )}

                {shape === TableShape.ROUND && (
                   <div className="col-span-2">
                   <input
                     type="number"
                     name="diametre"
                     value={diameter}
                     onChange={(e) => setDiameter(e.target.value)}
                     className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                     placeholder="Diamètre (cm)"
                     required
                   />
                 </div>
                )}
              </div>
            </div>

            {/* Section 3: Client */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                <User className="w-4 h-4" /> 3. Vos Coordonnées
              </div>
              
              <div className="space-y-3">
                <input 
                  name="nom_complet" 
                  type="text" 
                  required 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" 
                  placeholder="Nom complet" 
                />
                <input 
                  name="telephone" 
                  type="tel" 
                  required 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" 
                  placeholder="Téléphone (ex: 06 12 34 56 78)" 
                />
                <input 
                  name="ville" 
                  type="text" 
                  required 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" 
                  placeholder="Ville" 
                />
              </div>
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
      </div>
    </div>
  );
};

export default PriceCalculator;