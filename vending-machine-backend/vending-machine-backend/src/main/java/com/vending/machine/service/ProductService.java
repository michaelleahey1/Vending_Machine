package com.vending.machine.service;

import com.vending.machine.model.Product;
import com.vending.machine.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;

    // CREATE
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // READ - Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // READ - Get product by ID
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // READ - Get products by category
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    // READ - Get available products (in stock)
    public List<Product> getAvailableProducts() {
        return productRepository.findByStockQuantityGreaterThan(0);
    }

    // UPDATE
    public Product updateProduct(Long id, Product productDetails) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));
        
        product.setProductName(productDetails.getProductName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setStockQuantity(productDetails.getStockQuantity());
        product.setCategory(productDetails.getCategory());
        product.setImageUrl(productDetails.getImageUrl());
        if (productDetails.getSku() != null) {
            product.setSku(productDetails.getSku());
        }
        
        return productRepository.save(product);
    }

    // DELETE
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    // Business logic - Purchase product
    public boolean purchaseProduct(Long id, Integer quantity) {
        Optional<Product> productOpt = productRepository.findById(id);
        if (productOpt.isPresent()) {
            Product product = productOpt.get();
            if (product.getStockQuantity() >= quantity) {
                product.setStockQuantity(product.getStockQuantity() - quantity);
                productRepository.save(product);
                return true;
            }
        }
        return false;
    }
}