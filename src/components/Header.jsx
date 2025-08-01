import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import './Header.css';

function Header() {
  const { totalItems, totalPrice } = useCart();

  return (
    <header className="site-header">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li className="cart-summary">
            <Link to="/checkout">
              🛒 {totalItems} item{totalItems !== 1 ? 's' : ''} – €{totalPrice.toFixed(2)}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;