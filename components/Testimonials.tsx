import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../types.ts';

const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    rating: 5,
    comment: "Absolutely perfect! I have a strangely shaped antique table and was worried about the fit. They nailed it. It looks like glass!",
    avatar: "https://picsum.photos/100/100?random=20"
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    comment: "Great quality. Heavy enough that it doesn't slide around. Saved my wood table from my toddlers' art projects.",
    avatar: "https://picsum.photos/100/100?random=21"
  },
  {
    id: 3,
    name: "Emma Wilson",
    rating: 4,
    comment: "Shipping was fast. The cover had a slight plastic smell at first but it went away after a day. Protection is top notch.",
    avatar: "https://picsum.photos/100/100?random=22"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">What Our Customers Say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} 
                  />
                ))}
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">"{review.comment}"</p>
              <div className="flex items-center gap-4">
                <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-slate-900">{review.name}</p>
                  <p className="text-xs text-slate-500">Verified Buyer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;