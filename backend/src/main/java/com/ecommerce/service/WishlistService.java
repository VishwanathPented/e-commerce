package com.ecommerce.service;

import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.model.Wishlist;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;

    public Wishlist getWishlist(User user) {
        return wishlistRepository.findByUser(user)
                .orElseGet(() -> createNewWishlist(user));
    }

    private Wishlist createNewWishlist(User user) {
        Wishlist wishlist = Wishlist.builder()
                .user(user)
                .build();
        return wishlistRepository.save(wishlist);
    }

    @Transactional
    public Wishlist addToWishlist(User user, Long productId) {
        Wishlist wishlist = getWishlist(user);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        wishlist.getProducts().add(product);
        return wishlistRepository.save(wishlist);
    }

    @Transactional
    public Wishlist removeFromWishlist(User user, Long productId) {
        Wishlist wishlist = getWishlist(user);
        wishlist.getProducts().removeIf(p -> p.getId().equals(productId));
        return wishlistRepository.save(wishlist);
    }
}
