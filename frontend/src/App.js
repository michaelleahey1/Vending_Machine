import React, { useState, useEffect } from 'react';
import './App.css';
import AdminView from './components/AdminView';
import { adminLogin, userLogin, userRegister, getProducts, checkout as checkoutAPI } from './services/api';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [userBalance, setUserBalance] = useState(50.00);
  const [view, setView] = useState('login'); // login, customer, admin
  const [userType, setUserType] = useState('user'); // user, admin
  const [currentUser, setCurrentUser] = useState(null);
  
  // Auth form
  const [authMode, setAuthMode] = useState('login'); // login, register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Load products from database
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading products:', error);
      // Fallback to mock data if API fails
      const mockProducts = [
        { productId: 1, productName: 'Coca Cola', price: 1.50, stockQuantity: 25, category: 'Beverages' },
        { productId: 2, productName: 'Pepsi', price: 1.50, stockQuantity: 20, category: 'Beverages' },
        { productId: 3, productName: 'Water', price: 1.00, stockQuantity: 40, category: 'Beverages' },
        { productId: 4, productName: 'Lays Chips', price: 2.00, stockQuantity: 30, category: 'Snacks' },
        { productId: 5, productName: 'Snickers', price: 1.50, stockQuantity: 35, category: 'Candy' },
      ];
      setProducts(mockProducts);
    }
  };

  // Handle login or registration
  const handleAuth = async () => {
    if (!username || !password) {
      alert('Please enter username and password');
      return;
    }

    // Registration requires email
    if (authMode === 'register' && userType === 'user') {
      if (!email) {
        alert('Please enter email for registration');
        return;
      }
    }

    try {
      let response;
      
      if (authMode === 'register' && userType === 'user') {
        response = await userRegister(username, password, email, phoneNumber);
      } else if (userType === 'admin') {
        response = await adminLogin(username, password);
      } else {
        response = await userLogin(username, password);
      }

      if (response.success) {
        const balance = response.balance !== undefined ? response.balance : 0;
        setCurrentUser({
          userId: response.userId,
          username: response.username,
          email: response.email,
          balance: balance
        });
        setUserBalance(balance);
        setView(userType === 'admin' ? 'admin' : 'customer');
        alert(`Welcome ${response.username}!`);
        // Clear form
        setUsername('');
        setPassword('');
        setEmail('');
        setPhoneNumber('');
      } else {
        alert(response.message || (authMode === 'register' ? 'Registration failed' : 'Invalid username or password'));
      }
    } catch (error) {
      alert(authMode === 'register' ? 'Registration failed. Please try again.' : 'Login failed. Please check your credentials and try again.');
      console.error('Auth error:', error);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('login');
    setUsername('');
    setPassword('');
    setEmail('');
    setPhoneNumber('');
    setCart([]);
    setUserBalance(50.00); // Reset to default
  };

  const addToCart = (product) => {
    // Check if product is in stock
    if (product.stockQuantity === 0) {
      alert('This product is out of stock');
      return;
    }

    const existing = cart.find(item => item.productId === product.productId);
    const currentQuantity = existing ? existing.quantity : 0;
    
    // Check if adding one more would exceed stock
    if (currentQuantity >= product.stockQuantity) {
      alert('Cannot add more items. Stock limit reached.');
      return;
    }

    if (existing) {
      setCart(cart.map(item => 
        item.productId === product.productId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + ((item.price ? Number(item.price) : 0) * item.quantity), 0).toFixed(2);
  };

  const handleCheckout = async () => {
    if (!currentUser || cart.length === 0) {
      alert('Cart is empty');
      return;
    }

    const total = parseFloat(getTotalPrice());
    if (total > userBalance) {
      alert('Insufficient balance!');
      return;
    }

    try {
      const result = await checkoutAPI(currentUser.userId, cart);
      
      if (result.success) {
        // Update balance from response if available, otherwise calculate
        const newBalance = userBalance - total;
        setUserBalance(newBalance);
        setCart([]);
        
        // Reload products to get updated stock
        await loadProducts();
        
        alert('Purchase successful!');
      } else {
        alert(result.message || 'Checkout failed. Please try again.');
      }
    } catch (error) {
      alert('Checkout failed. Please try again.');
      console.error('Checkout error:', error);
    }
  };

  // Login View
  if (view === 'login') {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1 className="title">Virtual Vending Machine</h1>
          <p className="subtitle">Welcome! Please sign in</p>

          <div className="toggle-buttons">
            <button 
              onClick={() => setUserType('user')}
              className={`toggle-btn ${userType === 'user' ? 'toggle-btn-active' : ''}`}
            >
              Customer
            </button>
            <button 
              onClick={() => setUserType('admin')}
              className={`toggle-btn ${userType === 'admin' ? 'toggle-btn-active' : ''}`}
            >
              Admin
            </button>
          </div>

          <div className="toggle-buttons">
            <button 
              onClick={() => setAuthMode('login')}
              className={`toggle-btn ${authMode === 'login' ? 'toggle-btn-active' : ''}`}
            >
              Login
            </button>
            <button 
              onClick={() => setAuthMode('register')}
              className={`toggle-btn ${authMode === 'register' ? 'toggle-btn-active' : ''}`}
            >
              Register
            </button>
          </div>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
          {authMode === 'register' && userType === 'user' && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          {authMode === 'register' && userType === 'user' && (
            <input
              type="text"
              placeholder="Phone Number (optional)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="input"
            />
          )}
          
          <button onClick={handleAuth} className="login-button">
            {authMode === 'login' ? 'Login' : 'Register'}
          </button>

          <p className="hint">
            Admin: username: admin / password: admin123<br/>
            User: username: demo_user / password: user123
          </p>
        </div>
      </div>
    );
  }

  // Customer View
  if (view === 'customer') {
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
                  <p className="price">${product.price ? Number(product.price).toFixed(2) : '0.00'}</p>
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
                        <p>${item.price ? Number(item.price).toFixed(2) : '0.00'} x {item.quantity}</p>
                      </div>
                      <div className="cart-item-right">
                        <strong>${item.price ? (Number(item.price) * item.quantity).toFixed(2) : '0.00'}</strong>
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
                  <button onClick={handleCheckout} className="checkout-btn">
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

  // Admin View
  return (
    <AdminView
      products={products}
      setProducts={setProducts}
      setView={setView}
      handleLogout={handleLogout}
    />
  );
}

export default App;
