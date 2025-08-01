import { useState } from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products.json';
import { useCart } from '../context/useCart';

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();

  const [selectedPackSize, setSelectedPackSize] = useState(
    product?.packOf[0]?.size || null
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found.</div>;
  }

  const selectedPack = product.packOf.find(p => p.size === selectedPackSize);
  const unitPrice = selectedPack.unitPrice;
  const totalPackPrice = unitPrice * selectedPackSize;
  const totalPrice = totalPackPrice * quantity;

  const handleAddToCart = () => {
    addToCart({
      id: product.id + '--' + selectedPackSize, // to support different pack sizes
      productId: product.id,
      name: product.name,
      packSize: selectedPackSize,
      quantity,
      unitPrice,
      image: product.images?.[0] || '',
      totalPackPrice
    });
  };

  return (
    <div className="product-detail">
      <div className="breadcrumbs">
        Home / {product.category} / {product.subcategory} / {product.name}
      </div>

      <h1>{product.name}</h1>
      <p><strong>SKU:</strong> {product.id}</p>

      {product.images?.[0] && (
        <img src={product.images[0]} alt={product.name} width="300" />
      )}

      <div>
        <strong>Select pack size:</strong><br />
        {product.packOf.map((pack) => (
          <label key={pack.size} style={{ display: 'block', marginTop: '5px' }}>
            <input
              type="radio"
              name="pack"
              value={pack.size}
              checked={selectedPackSize === pack.size}
              onChange={() => setSelectedPackSize(pack.size)}
            />
            {pack.size} pcs – €{(pack.unitPrice * pack.size).toFixed(2)} total
            (€{pack.unitPrice.toFixed(2)} per unit)
          </label>
        ))}
      </div>

      <div style={{ marginTop: '10px' }}>
        <label>
          Quantity (of selected pack):
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            style={{ width: '50px', marginLeft: '10px' }}
          />
        </label>
      </div>

      <p><strong>Total Price:</strong> €{totalPrice.toFixed(2)}</p>

      <button onClick={handleAddToCart}>Add to Cart</button>

      <div className="description" dangerouslySetInnerHTML={{ __html: product.description }}></div>
    </div>
  );
}

export default ProductDetail;
