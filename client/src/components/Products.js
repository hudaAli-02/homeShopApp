import React from 'react';
import '../App.css';
import ma from "../Images/ma.png";
import ss from "../Images/ss.png";
import Lb from "../Images/Lb.png";
import ll from "../Images/ll.png";
import pd from "../Images/pd.png";
import ob from "../Images/ob.png";
import ls from "../Images/ls.png";
import bf from "../Images/bf.png";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

function ProductGrid() {
  const [cartTotal, setCartTotal] = useState(0); 
  const addToCart = (price) => {
    setCartTotal(cartTotal + price);
  };
  const goToCart = () => {
    navigate("/cart", { state: { cartTotal } });
  };

  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();
  const products = [
    { id:1,image: ma, name: "Maderas Dining Chair -> $120 OMR",price:120, description: "A sturdy and elegant dining chair made of wood. Introducing the Maderas Dining Chair - a contemporary twist on the classic with its unique three-leg format. Tubular framework and elegant curves combine, creating a softened and intriguing barrel-back design. Now available in Dover Crescent color and durable performance fabric for kid-friendly furniture and maximum style.             Dimensions: Overall: 23.75 w x 23 d x 33 Seat Depth: 17.75,Seat Height: 19.25,Arm Height from Floor: 24.75U, Arm Height from Seat: 5.5"},
    { id:2,image: ss, name: "Serenity Sling Lounge Chair -> $200 OMR ",price:200 ,description: " A relaxing lounge chair with a modern design. The Serenity Sling Lounge Chair combines modern aesthetics with comfort, making it ideal for poolside, patio, or garden settings. Its sleek design emphasizes simplicity while ensuring ergonomic support. The chair's sling construction offers a breathable, contoured surface that conforms to the body, enhancing relaxation.              Dimensions:   Height: 30–35 inches (varies by design),Width: 25–30 inches,Depth: 32–38 inches,Weight: 10–15 lbs" },
    { id:3,image: Lb, name: "Liam Blackened Floor Lamp -> $30 OMR",price:30 ,description: "A sleek blackened floor lamp for ambient lighting. Height: Approximately 60–65 inches, ideal for task or ambient lighting , Base Diameter: 10–12 inches for space efficiency and Cord Length: 6–8 feet with an on/off switch for convenience > It is a modern, minimalist lighting solution designed for contemporary interiors. Its clean lines and understated elegance make it an excellent addition to living rooms, bedrooms, offices, or reading nooks." },
    { id:4,image: ll, name: "Luna Lounge Chair -> $230 OMR",price:230 ,description: "A cozy lounge chair with a stylish look. Height: 30–34 inches , Width: 28–32 inches and Depth: 30–36 inches ... Materials: High-quality upholstery (leather, fabric, or velvet).Metal or wooden legs, sometimes with a polished or matte finish.Sturdy frame, often made of hardwood or metal." },
    {id:5, image: pd, name: "Penth Dining Table -> $44 OMR",price:44, description: "A large dining table suitable for family gatherings.Tabletop: Typically made of high-quality materials like solid wood, marble, glass, or engineered wood with veneers.Base/Legs: Crafted from metal, wood, or a combination, with designs ranging from sleek and simple to bold and architectural. " },
    { id:6,image: ob, name: "Oslo Marble Bowls, Set of 2 -> $24 OMR",price:24, description: "Marble bowls perfect for decor and dining. Each bowl in the set can vary in size, typically one being smaller (ideal for snacks or small servings) and one larger (perfect for salads or fruit). Versatile Use: These bowls are perfect for both functional uses (serving food or holding small items) and as statement pieces on dining or coffee tables." },
    { id:7,image: ls, name: "Lola Sofa -> $340 OMR",price:340 ,description: "A modern and comfortable sofa for living spaces. The Lola Sofa is a popular choice for those seeking a balance between style and comfort. Its design typically blends modern aesthetics with cozy, inviting functionality." },
    { id:8,image: bf, name: "Brea Floor Lamp -> $50 OMR",price:50, description: "A tall and elegant floor lamp for your home. The Brea Floor Lamp works well in a variety of settings, including living rooms, offices, reading corners, and bedrooms. It’s also an excellent option for areas where you need both light and a stylish design accent." },
  ];
  
 

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            name={product.name}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>



      {selectedProduct && (
        <div className="product-details">
          <h2>{selectedProduct.name}</h2>
          <img src={selectedProduct.image} alt={selectedProduct.name} className="details-image" />
          <p>{selectedProduct.price} OMR</p>

          <p>{selectedProduct.description}</p>
          <h1>Do you want to add in the list ?!!</h1>

          <button onClick={() => addToCart(selectedProduct.price)} className="c-button">+1</button>



      <br></br>
      <button onClick={goToCart} className="c-button">Go to Cart</button>

          <button onClick={() => setSelectedProduct(null)} className="c-button">Close</button>
         <br></br>

        </div>
      )}
    </div>

    
  );
}

export default ProductGrid;
