package com.vending.machine.service;

import com.vending.machine.model.Product;
import com.vending.machine.model.Transaction;
import com.vending.machine.model.User;
import com.vending.machine.dto.PurchaseRequest;
import com.vending.machine.repository.ProductRepository;
import com.vending.machine.repository.TransactionRepository;
import com.vending.machine.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PurchaseService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private TransactionRepository transactionRepository;

    @Transactional
    public PurchaseResult processCheckout(PurchaseRequest request) {
        Optional<User> userOpt = userRepository.findById(request.getUserId());
        if (userOpt.isEmpty()) {
            return new PurchaseResult(false, "User not found", null);
        }

        User user = userOpt.get();
        BigDecimal totalAmount = BigDecimal.ZERO;
        List<Transaction> transactions = new ArrayList<>();
        List<String> errors = new ArrayList<>();

        // Validate all items first
        for (PurchaseRequest.CartItem item : request.getItems()) {
            Optional<Product> productOpt = productRepository.findById(item.getProductId().longValue());
            if (productOpt.isEmpty()) {
                errors.add("Product with ID " + item.getProductId() + " not found");
                continue;
            }

            Product product = productOpt.get();
            if (product.getStockQuantity() < item.getQuantity()) {
                errors.add(product.getProductName() + ": Insufficient stock (available: " + product.getStockQuantity() + ")");
                continue;
            }

            BigDecimal itemTotal = product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            totalAmount = totalAmount.add(itemTotal);
        }

        // If validation errors, return early
        if (!errors.isEmpty()) {
            return new PurchaseResult(false, String.join("; ", errors), null);
        }

        // Check user balance
        if (user.getBalance().compareTo(totalAmount) < 0) {
            return new PurchaseResult(false, "Insufficient balance. Required: $" + totalAmount + ", Available: $" + user.getBalance(), null);
        }

        // Process all purchases
        for (PurchaseRequest.CartItem item : request.getItems()) {
            Product product = productRepository.findById(item.getProductId().longValue()).get();
            BigDecimal itemTotal = product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));

            // Update stock
            product.setStockQuantity(product.getStockQuantity() - item.getQuantity());
            productRepository.save(product);

            // Create transaction
            Transaction transaction = new Transaction();
            transaction.setUserId(user.getUserId());
            transaction.setProductId(product.getProductId().intValue());
            transaction.setProductName(product.getProductName());
            transaction.setQuantity(item.getQuantity());
            transaction.setUnitPrice(product.getPrice());
            transaction.setTotalAmount(itemTotal);
            transaction.setTransactionStatus(Transaction.TransactionStatus.COMPLETED);
            transactions.add(transaction);
        }

        // Update user balance
        user.setBalance(user.getBalance().subtract(totalAmount));
        userRepository.save(user);

        // Save all transactions
        transactionRepository.saveAll(transactions);

        return new PurchaseResult(true, "Purchase successful", transactions);
    }

    public static class PurchaseResult {
        private boolean success;
        private String message;
        private List<Transaction> transactions;

        public PurchaseResult(boolean success, String message, List<Transaction> transactions) {
            this.success = success;
            this.message = message;
            this.transactions = transactions;
        }

        public boolean isSuccess() { return success; }
        public void setSuccess(boolean success) { this.success = success; }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }

        public List<Transaction> getTransactions() { return transactions; }
        public void setTransactions(List<Transaction> transactions) { this.transactions = transactions; }
    }
}

