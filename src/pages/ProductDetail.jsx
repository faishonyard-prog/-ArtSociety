import React, { useEffect } from 'react';
import { ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

function ProductDetail({ product, setCurrentView, addToCart }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Product Not Found</h2>
        <button onClick={() => setCurrentView('shop')} className="text-rose-600 font-bold hover:underline">
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in bg-white min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button 
          onClick={() => setCurrentView('shop')}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-900 font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Shop Gallery
        </button>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="bg-stone-50 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square relative flex items-center justify-center border border-stone-100">
              <img 
                src={product.img} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              {product.discountPrice && (
                <div className="absolute top-6 left-6 bg-rose-600 text-white text-sm font-bold xl:text-base px-4 py-1.5 rounded-full shadow-lg">SALE</div>
              )}
            </div>
            {/* Can add thumbnail images here in the future if products have multiple images */}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <span className="text-sm text-rose-600 font-bold uppercase tracking-widest mb-3 block">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              {product.discountPrice ? (
                <>
                  <span className="text-3xl font-serif font-bold text-rose-600">₹{product.discountPrice}</span>
                  <span className="text-xl text-stone-400 line-through">₹{product.price}</span>
                </>
              ) : (
                <span className="text-3xl font-serif font-bold text-stone-900">₹{product.price}</span>
              )}
            </div>

            <p className="text-stone-600 text-lg leading-relaxed mb-10 font-light">
              This handcrafted piece is unique and made with meticulous attention to detail. 
              Elevate your space with this premium quality art, designed to inspire and bring a touch of elegance to any room. 
              Perfect for gifting or adding to your personal collection.
            </p>

            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform active:scale-[0.98] mb-12"
            >
              Add to Cart
            </button>

            {/* Perks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-stone-100 pt-8 mt-auto">
              <div className="flex items-start gap-4">
                <ShieldCheck className="text-rose-600 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-stone-900">Secure Payment</h4>
                  <p className="text-sm text-stone-500 mt-1">100% secure checkout</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Truck className="text-rose-600 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-stone-900">Free Shipping</h4>
                  <p className="text-sm text-stone-500 mt-1">On orders over ₹5,000</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <RotateCcw className="text-rose-600 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-stone-900">Easy Returns</h4>
                  <p className="text-sm text-stone-500 mt-1">7 day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
