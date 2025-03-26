package com.example.householdbudget.service;

import java.security.Key;
import java.util.Date;
import java.util.Optional;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.householdbudget.model.User;
import com.example.householdbudget.repository.UserRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService{
	private static final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	
	@Autowired
	private UserRepository userRepository;
	
	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	public User registerUser(String username, String password, String email) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);
        return userRepository.save(user);
    }
	
	public Optional<User> authenticateUser(Long userId, String password) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
        	System.out.println("successsssssssssss");
            return user;
        }else {
        	System.out.println("failer");
        }
        return Optional.empty();
    }
	
	public String generateToken(String userId) {
		return Jwts.builder()
				.setSubject(userId)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + 1000*60*60*9))
				.signWith(key, SignatureAlgorithm.HS256)
				.compact();
	}
	
	public String validateToken(String token) {
		return Jwts.parser()
				.setSigningKey(key)
				.parseClaimsJwt(token)
				.getBody()
				.getSubject();
	}
	

}