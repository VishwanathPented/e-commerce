package com.ecommerce.service;

import com.ecommerce.model.Cart;
import com.ecommerce.model.CartItem;
import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public Cart getCart(User user) {
        return cartRepository.findByUser(user)
                .orElseGet(() -> createNewCart(user));
    }

    private Cart createNewCart(User user) {
        Cart cart = Cart.builder()
                .user(user)
                .totalPrice(BigDecimal.ZERO)
                .build();
        return cartRepository.save(cart);
    }

    @Transactional
    public Cart addToCart(User user, Long productId, int quantity) {
        System.out.println("DEBUG: Service addToCart. User ID: " + user.getId());
        Cart cart = getCart(user);
        System.out.println("DEBUG: Cart retrieved. ID: " + cart.getId() + ", Items size: " + (cart.getItems() == null ? "null" : cart.getItems().size()));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        System.out.println("DEBUG: Product found: " + product.getName());

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
        } else {
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(quantity)
                    .build();
            cart.getItems().add(newItem);
        }

        recalculateTotal(cart);
        return cartRepository.save(cart);
    }

    @Transactional
    public Cart removeFromCart(User user, Long productId) {
        Cart cart = getCart(user);
        cart.getItems().removeIf(item -> item.getProduct().getId().equals(productId));
        recalculateTotal(cart);
        return cartRepository.save(cart);
    }

    private void recalculateTotal(Cart cart) {
        BigDecimal total = cart.getItems().stream()
                .map(item -> item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        cart.setTotalPrice(total);
    }

    @Transactional
    public void clearCart(User user) {
        Cart cart = getCart(user);
        cart.getItems().clear();
        cart.setTotalPrice(BigDecimal.ZERO);
        cartRepository.save(cart);
    }
}
