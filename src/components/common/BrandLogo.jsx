import React from 'react';

const BrandLogo = ({ className = "h-14 w-14" }) => (
  <img 
    src="/images/logo-custom.png" 
    alt="Art Society Brand Logo" 
    className={`rounded-full object-cover border-2 border-rose-100 shadow-sm bg-white ${className}`}
  />
);

export default BrandLogo;
