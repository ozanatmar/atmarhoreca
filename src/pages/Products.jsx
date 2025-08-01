import { useEffect, useState } from 'react';
import productsData from '../data/products.json';
import './Products.css';
import { Link } from 'react-router-dom';

function Products() {
  const [groupedProducts, setGroupedProducts] = useState({});

  useEffect(() => {
    const grouped = {};
    productsData.forEach((product) => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });
    setGroupedProducts(grouped);
  }, []);

  return (
    <div className="products-page">
      <h1>Our Products</h1>
      {Object.entries(groupedProducts).map(([category, items]) => (
        <section key={category}>
          <h2>{category}</h2>
          <ul>
            {items.map((product) => (
              <li key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <strong>{product.name}</strong>
                </Link>
                <br />
                {product.description}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default Products;
