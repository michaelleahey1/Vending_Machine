import React, { useState } from 'react';
import { createProduct, updateProduct, deleteProduct } from '../services/api';

function AdminView({ products, setProducts, setView, handleLogout }) {
  const [editProduct, setEditProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state for add/edit
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    stockQuantity: '',
    category: 'Beverages',
    sku: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add product to database
  const handleAddProduct = async () => {
    try {
      const newProduct = {
        productName: formData.productName,
        description: formData.description,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity),
        category: formData.category,
        sku: formData.sku
      };
      
      const created = await createProduct(newProduct);
      setProducts([...products, created]);
      resetForm();
      setShowAddForm(false);
      alert('Product added to database successfully!');
    } catch (error) {
      alert('Failed to add product. Please try again.');
      console.error('Add product error:', error);
    }
  };

  const handleEditProduct = (product) => {
    setEditProduct(product.productId);
    setFormData({
      productName: product.productName || '',
      description: product.description || '',
      price: product.price || '',
      stockQuantity: product.stockQuantity || '',
      category: product.category || 'Beverages',
      sku: product.sku || ''
    });
  };

  // Update product in database
  const handleUpdateProduct = async () => {
    try {
      const updated = {
        productName: formData.productName,
        description: formData.description,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity),
        category: formData.category,
        sku: formData.sku
      };
      
      const result = await updateProduct(editProduct, updated);
      setProducts(products.map(p => p.productId === editProduct ? result : p));
      resetForm();
      setEditProduct(null);
      alert('Product updated in database successfully!');
    } catch (error) {
      alert('Failed to update product. Please try again.');
      console.error('Update product error:', error);
    }
  };

  // Delete product from database
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product from the database?')) {
      try {
        const success = await deleteProduct(productId);
        if (success) {
          setProducts(products.filter(p => p.productId !== productId));
          alert('Product deleted from database successfully!');
        }
      } catch (error) {
        alert('Failed to delete product. Please try again.');
        console.error('Delete product error:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      productName: '',
      description: '',
      price: '',
      stockQuantity: '',
      category: 'Beverages',
      sku: ''
    });
  };

  const cancelEdit = () => {
    setEditProduct(null);
    setShowAddForm(false);
    resetForm();
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Admin Dashboard</h1>
        <div className="header-right">
          <button onClick={() => setView('customer')} className="switch-btn">
            Customer View
          </button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="admin-main">
        <div className="admin-header">
          <h2>Product Management</h2>
          <button 
            onClick={() => setShowAddForm(true)} 
            className="add-product-btn"
          >
            + Add New Product
          </button>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editProduct) && (
          <div className="product-form">
            <h3>{editProduct ? 'Edit Product' : 'Add New Product'}</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="Beverages">Beverages</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Candy">Candy</option>
                  <option value="Healthy">Healthy</option>
                  <option value="Hot Drinks">Hot Drinks</option>
                </select>
              </div>

              <div className="form-group">
                <label>Price ($) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Stock Quantity *</label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  placeholder="BEV-001"
                />
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  rows="3"
                />
              </div>
            </div>

            <div className="form-actions">
              <button 
                onClick={editProduct ? handleUpdateProduct : handleAddProduct}
                className="save-btn"
              >
                {editProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button onClick={cancelEdit} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="products-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>SKU</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.productId}>
                  <td>{product.productId}</td>
                  <td><strong>{product.productName}</strong></td>
                  <td><span className="category-badge">{product.category}</span></td>
                  <td>${product.price ? Number(product.price).toFixed(2) : '0.00'}</td>
                  <td>
                    <span className={product.stockQuantity < 10 ? 'stock-low' : 'stock-ok'}>
                      {product.stockQuantity}
                    </span>
                  </td>
                  <td>{product.sku || 'N/A'}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        onClick={() => handleEditProduct(product)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.productId)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminView;