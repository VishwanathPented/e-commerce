package com.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * ECommerceApplication
 *
 * This is the entry point for the Spring Boot Backend.
 * It bootstraps the application, firing up the embedded Tomcat server
 * and initializing the Spring Context.
 *
 * Connected Modules:
 * - Scans all components in "com.ecommerce" package (Controllers, Services, Repositories).
 */
@SpringBootApplication
public class ECommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ECommerceApplication.class, args);
		System.out.println("🚀 E-commerce Backend Started Successfully!");
	}

}
