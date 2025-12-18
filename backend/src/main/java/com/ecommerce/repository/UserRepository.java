package com.ecommerce.repository;

import com.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * UserRepository
 *
 * Handles database interactions for the User entity.
 * Spring Data JPA generates the implementation at runtime.
 *
 * Methods:
 * - findByEmail: Used during login to fetch user details by email.
 * - existsByEmail: Used during registration to prevent duplicate emails.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
