package com.ecommerce.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

/**
 * User Entity
 *
 * Represents a registered user in the system.
 * - Stores login credentials (email, password hash).
 * - Stores profile info (full name).
 * - Stores authorization role (CUSTOMER, ADMIN).
 *
 * Why JPA?
 * - We mapped this directly to the 'users' table to allow ORM operations
 *   without writing raw SQL for every CRUD.
 */
@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password; // Hashed password

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String role; // e.g., "ROLE_CUSTOMER", "ROLE_ADMIN"

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
