import React from 'react';

const Gallery: React.FC = () => {
  const images = [
    "https://picsum.photos/600/600?random=10",
    "https://picsum.photos/600/400?random=11",
    "https://picsum.photos/600/800?random=12",
    "https://picsum.photos/600/600?random=13",
    "https://picsum.photos/600/400?random=14",
    "https://picsum.photos/600/600?random=15",
  ];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">See It On Real Tables</h2>
          <p className="mt-4 text-lg text-slate-600">Join thousands of happy customers protecting their furniture.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <div key={i} className={`relative overflow-hidden rounded-xl group ${i === 2 ? 'row-span-2' : ''}`}>
              <img 
                src={src} 
                alt={`Gallery image ${i + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;