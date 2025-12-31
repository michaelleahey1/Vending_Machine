package com.vending.machine.dto;

import java.util.List;

public class PurchaseRequest {
    private Integer userId;
    private List<CartItem> items;

    public PurchaseRequest() {}

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public List<CartItem> getItems() { return items; }
    public void setItems(List<CartItem> items) { this.items = items; }

    public static class CartItem {
        private Integer productId;
        private Integer quantity;

        public CartItem() {}

        public CartItem(Integer productId, Integer quantity) {
            this.productId = productId;
            this.quantity = quantity;
        }

        public Integer getProductId() { return productId; }
        public void setProductId(Integer productId) { this.productId = productId; }

        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }
}

