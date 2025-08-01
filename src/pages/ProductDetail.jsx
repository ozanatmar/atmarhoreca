import { useParams } from 'react-router-dom';
import products from '../data/products.json';
import { useCart } from '../context/useCart';

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      {product.image && (
        <img src={product.image} alt={product.name} width="300" />
      )}
      <p><strong>Price:</strong> €{product.price}</p>
      <p><strong>Stock:</strong> {product.stock} units</p>
      <p>{product.description}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductDetail;