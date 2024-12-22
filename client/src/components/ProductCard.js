import React from "react";


function ProductCard({ image, name, onClick }) {
 
  return (
    <div className="product-card" onClick={onClick}>
      <img src={image} alt={name} className="product-image" />
      <p className="product-name">{name}</p>

</div>
  );
}

export default ProductCard;
