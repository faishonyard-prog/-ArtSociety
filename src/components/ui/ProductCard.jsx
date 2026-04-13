import React from 'react';

function ProductCard({ product, onClick }) {
  return (
    <div onClick={onClick} className="group cursor-pointer">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-4 bg-stone-100">
        <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {product.discountPrice && (
          <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full">SALE</div>
        )}
      </div>
      <span className="text-xs text-stone-500 tracking-wider uppercase">{product.category}</span>
      <h3 className="text-xl font-serif font-bold text-stone-900 mt-1 truncate">{product.name}</h3>
      <div className="mt-2 flex items-center gap-2">
        {product.discountPrice ? (
          <>
            <span className="text-rose-600 font-bold">₹{product.discountPrice}</span>
            <span className="text-stone-400 line-through text-sm">₹{product.price}</span>
          </>
        ) : (
          <span className="text-stone-600">₹{product.price}</span>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
