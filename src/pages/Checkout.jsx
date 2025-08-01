import { useCart } from '../context/useCart';

function Checkout() {
  const { cartItems, updateQuantity, totalPrice } = useCart();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>€{item.price.toFixed(2)}</td>
                <td>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span style={{ margin: '0 1rem' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </td>
                <td>€{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {cartItems.length > 0 && (
        <h2 style={{ marginTop: '2rem' }}>Total: €{totalPrice.toFixed(2)}</h2>
      )}
    </div>
  );
}

export default Checkout;
