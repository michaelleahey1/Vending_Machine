import React from 'react';

function CustomerView({ 
  products, 
  cart, 
  userBalance, 
  addToCart, 
  removeFromCart, 
  getTotalPrice, 
  checkout, 
  handleLogout 
}) {
  return (
    <div className="app">
      <header className="header">
        <h1>Virtual Vending Machine</h1>
        <div className="header-right">
          <div className="balance">Balance: ${userBalance.toFixed(2)}</div>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="main">
        <div className="products-section">
          <h2>Available Products</h2>
          <div className="products-grid">
            {products.map(product => (
              <div key={product.productId} className="product-card">
                <div className="product-icon">🥤</div>
                <h3>{product.productName}</h3>
                <p className="category">{product.category}</p>
                <p className="price">${product.price.toFixed(2)}</p>
                <p className="stock">Stock: {product.stockQuantity}</p>
                <button 
                  onClick={() => addToCart(product)}
                  disabled={product.stockQuantity === 0}
                  className={product.stockQuantity > 0 ? 'add-button' : 'disabled-button'}
                >
                  {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-section">
          <div className="cart">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.productId} className="cart-item">
                    <div>
                      <strong>{item.productName}</strong>
                      <p>${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <div className="cart-item-right">
                      <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                      <button 
                        onClick={() => removeFromCart(item.productId)}
                        className="remove-btn"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
                <div className="cart-total">
                  <strong>Total: ${getTotalPrice()}</strong>
                </div>
                <button onClick={checkout} className="checkout-btn">
                  Checkout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerView;