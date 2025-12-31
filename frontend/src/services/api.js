const API_URL = 'http://localhost:8080/api';

// Admin Authentication
export const adminLogin = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/admin/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
      return { success: false, message: errorData.message || `Server error: ${response.status}` };
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Admin login error:', error);
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return { success: false, message: 'Cannot connect to server. Please make sure the backend is running on port 8080.' };
    }
    return { success: false, message: 'Login failed. Please check your connection and try again.' };
  }
};

// User Authentication
export const userLogin = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/user/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
      return { success: false, message: errorData.message || `Server error: ${response.status}` };
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('User login error:', error);
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return { success: false, message: 'Cannot connect to server. Please make sure the backend is running on port 8080.' };
    }
    return { success: false, message: 'Login failed. Please check your connection and try again.' };
  }
};

// User Registration
export const userRegister = async (username, password, email, phoneNumber) => {
  try {
    const response = await fetch(`${API_URL}/user/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email, phoneNumber }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Registration failed' }));
      return { success: false, message: errorData.message || `Server error: ${response.status}` };
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('User registration error:', error);
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return { success: false, message: 'Cannot connect to server. Please make sure the backend is running on port 8080.' };
    }
    return { success: false, message: 'Registration failed. Please check your connection and try again.' };
  }
};

// Get all products
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get products error:', error);
    throw error;
  }
};

// Create product (Admin only)
export const createProduct = async (product) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Create product error:', error);
    throw error;
  }
};

// Update product (Admin only)
export const updateProduct = async (id, product) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Update product error:', error);
    throw error;
  }
};

// Delete product (Admin only)
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (error) {
    console.error('Delete product error:', error);
    throw error;
  }
};

// Purchase product (single)
export const purchaseProduct = async (id, quantity) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}/purchase?quantity=${quantity}`, {
      method: 'POST',
    });
    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Purchase error:', error);
    throw error;
  }
};

// Checkout (multiple products)
export const checkout = async (userId, cartItems) => {
  try {
    const items = cartItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity
    }));
    
    const response = await fetch(`${API_URL}/purchase/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        items: items
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
};