package com.example.householdbudget.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.householdbudget.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	 Optional<User> findByUsername(String username);
	 Optional<User> findById(Long userId);
}