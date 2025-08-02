import { useCart } from '../context/useCart';
import { useState } from 'react';

function Checkout() {
  const { cartItems, updateQuantity, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '', phone: '', email: '', address: '', postcode: '', town: '', country: ''
  });
  const [billingSameAsDelivery, setBillingSameAsDelivery] = useState(true);
  const [billingInfo, setBillingInfo] = useState({
    name: '', address: '', postcode: '', town: '', country: ''
  });
  const [entityType, setEntityType] = useState('individual');
  const [vatNumber, setVatNumber] = useState('');

  const isEUCountry = (country) => {
    const euCountries = ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden"];
    return euCountries.includes(country);
  };

  const discount = paymentMethod === 'bank' ? 0.05 : 0;
  const basePrice = totalPrice * (1 - discount);
  const vatRate =
    (entityType === 'individual' && isEUCountry(deliveryInfo.country)) ||
    (entityType === 'entity' && deliveryInfo.country === 'Bulgaria') ? 0.20 : 0;
  const vatAmount = basePrice * vatRate;
  const finalPrice = basePrice + vatAmount;

  const [submitting, setSubmitting] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Checkout</h1>

      {/* Step 1: Cart */}
      <section>
        <h2 onClick={() => setStep(1)}>1. Cart</h2>
        {step === 1 && (
          <>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Product</th>
                    <th>Pack</th>
                    <th>Unit Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id + '-' + item.packSize}>
                      <td>{item.name}</td>
                      <td>{item.packSize}</td>
                      <td>€{item.unitPrice.toFixed(2)}</td>
                      <td>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                        <span style={{ margin: '0 1rem' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </td>
                      <td>€{(item.unitPrice * item.packSize * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <button onClick={() => setStep(2)} style={{ marginTop: '1rem' }}>Continue to Payment</button>
          </>
        )}
      </section>

      {/* Step 2: Payment */}
      <section>
        <h2 onClick={() => setStep(2)}>2. Payment</h2>
        {step === 2 && (
          <>
            <label>
              <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
              Pay by card
            </label>
            <br />
            <label>
              <input type="radio" name="payment" value="bank" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} />
              Pay by bank transfer (5% discount)
            </label>
            <p><strong>Discounted total:</strong> €{basePrice.toFixed(2)}</p>
            <button onClick={() => setStep(3)} style={{ marginTop: '1rem' }}>Continue to Billing & Delivery</button>
          </>
        )}
      </section>

      {/* Step 3: Billing & Delivery */}
      <section>
        <h2 onClick={() => setStep(3)}>3. Billing & Delivery</h2>
        {step === 3 && (
          <>
            <h3>Delivery Info</h3>
            <input placeholder="Name" value={deliveryInfo.name} onChange={e => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })} /><br />
            <input placeholder="Phone" value={deliveryInfo.phone} onChange={e => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })} /><br />
            <input placeholder="Email" value={deliveryInfo.email} onChange={e => setDeliveryInfo({ ...deliveryInfo, email: e.target.value })} /><br />
            <input placeholder="Address" value={deliveryInfo.address} onChange={e => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })} /><br />
            <input placeholder="Postcode" value={deliveryInfo.postcode} onChange={e => setDeliveryInfo({ ...deliveryInfo, postcode: e.target.value })} /><br />
            <input placeholder="Town" value={deliveryInfo.town} onChange={e => setDeliveryInfo({ ...deliveryInfo, town: e.target.value })} /><br />
            <input placeholder="Country" value={deliveryInfo.country} onChange={e => setDeliveryInfo({ ...deliveryInfo, country: e.target.value })} /><br /><br />

            <label>
              <input type="checkbox" checked={billingSameAsDelivery} onChange={() => setBillingSameAsDelivery(!billingSameAsDelivery)} /> Billing address same as delivery
            </label>
            {!billingSameAsDelivery && (
              <>
                <h3>Billing Info</h3>
                <input placeholder="Billing Name" value={billingInfo.name} onChange={e => setBillingInfo({ ...billingInfo, name: e.target.value })} /><br />
                <input placeholder="Billing Address" value={billingInfo.address} onChange={e => setBillingInfo({ ...billingInfo, address: e.target.value })} /><br />
                <input placeholder="Postcode" value={billingInfo.postcode} onChange={e => setBillingInfo({ ...billingInfo, postcode: e.target.value })} /><br />
                <input placeholder="Town" value={billingInfo.town} onChange={e => setBillingInfo({ ...billingInfo, town: e.target.value })} /><br />
                <input placeholder="Country" value={billingInfo.country} onChange={e => setBillingInfo({ ...billingInfo, country: e.target.value })} /><br />
              </>
            )}

            <h3>Customer Type</h3>
            <label>
              <input type="radio" name="entity" value="individual" checked={entityType === 'individual'} onChange={() => setEntityType('individual')} /> Individual
            </label><br />
            <label>
              <input type="radio" name="entity" value="entity" checked={entityType === 'entity'} onChange={() => setEntityType('entity')} /> Legal Entity
            </label><br />
            {entityType === 'entity' && (
              <input placeholder="VAT / Tax Number" value={vatNumber} onChange={e => setVatNumber(e.target.value)} />
            )}

            <button onClick={() => setStep(4)} style={{ marginTop: '1rem' }}>Continue to Review</button>
          </>
        )}
      </section>

      {/* Step 4: Review & Confirm */}
      <section>
        <h2 onClick={() => setStep(4)}>4. Review & Confirm</h2>
        {step === 4 && (
          <>
            <h3>Order Summary</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Pack</th>
                  <th>Unit Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id + '-' + item.packSize}>
                    <td>{item.name}</td>
                    <td>{item.packSize}</td>
                    <td>€{item.unitPrice.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>€{(item.unitPrice * item.packSize * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Customer Info</h3>
            <p><strong>Name:</strong> {deliveryInfo.name}</p>
            <p><strong>Email:</strong> {deliveryInfo.email}</p>
            <p><strong>Phone:</strong> {deliveryInfo.phone}</p>

            <h3>Delivery Address</h3>
            <p>{deliveryInfo.address}, {deliveryInfo.postcode}, {deliveryInfo.town}, {deliveryInfo.country}</p>

            {!billingSameAsDelivery && (
              <>
                <h3>Billing Address</h3>
                <p>{billingInfo.name}<br />{billingInfo.address}, {billingInfo.postcode}, {billingInfo.town}, {billingInfo.country}</p>
              </>
            )}

            <h3>Payment Method</h3>
            <p>{paymentMethod === 'card' ? 'Card' : 'Bank transfer (5% discount)'}</p>

            <h3>Entity Type</h3>
            <p>{entityType === 'entity' ? `Legal Entity (VAT: ${vatNumber})` : 'Individual'}</p>

            <h3>Price Breakdown</h3>
            <p>Subtotal: €{totalPrice.toFixed(2)}</p>
            {discount > 0 && <p>Discount (5%): -€{(totalPrice * discount).toFixed(2)}</p>}
            <p>Price excl. VAT: €{basePrice.toFixed(2)}</p>
            {vatAmount > 0 && <p>VAT (20%): €{vatAmount.toFixed(2)}</p>}
            <p><strong>Total to Pay: €{finalPrice.toFixed(2)}</strong></p>

            <button
              style={{ marginTop: '1rem' }}
              disabled={submitting}
              onClick={() => {
                // loading state to prevent double-clicks
                if (submitting) return;
                setSubmitting(true);

                // post order data to webhook
                fetch('https://hook.eu2.make.com/15hzdv6b7hjjx33us7bca8nlmoxru8go', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    cartItems,
                    deliveryInfo,
                    billingInfo: billingSameAsDelivery ? deliveryInfo : billingInfo,
                    paymentMethod,
                    entityType,
                    vatNumber,
                    prices: {
                      subtotal: totalPrice,
                      discount,
                      basePrice,
                      vatAmount,
                      finalPrice
                    }
                  })
                })
                  .then(() => {
                    alert('Webhook sent!');
                    clearCart();
                    setStep(1);
                  })
                  .catch(() => {
                    alert('Failed to send order. Try again.');
                  })
                  .finally(() => {
                    // end loading state
                    setSubmitting(false);
                  });
              }}
            >
              {submitting ? 'Sending...' : 'Confirm & Place Order'}
            </button>
          </>
        )}
      </section>
    </div>
  );
}

export default Checkout;
