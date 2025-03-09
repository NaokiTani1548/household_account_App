package com.example.householdbudget.controller;

import com.example.householdbudget.model.Expense;
import com.example.householdbudget.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @GetMapping("/{userId}")
    public List<Expense> getAllExpenses(@PathVariable("userId") Long userId) {
        return expenseRepository.findByUserId(userId);
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseRepository.save(expense);
    }

    @DeleteMapping("/{userId}/{id}")
    public ResponseEntity<Object> deleteExpense(@PathVariable("userId") Long userId, @PathVariable("id") Long id) {
    	return expenseRepository.findByIdAndUserId(id, userId).map(expense -> {
    		expenseRepository.delete(expense);
    		return ResponseEntity.noContent().build();
    	}).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{userId}/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable("userId") Long userId, @PathVariable("id") Long id, @RequestBody Expense updatedExpense) {
        return expenseRepository.findByIdAndUserId(id, userId).map(expense -> {
            expense.setCategory(updatedExpense.getCategory());
            expense.setAmount(updatedExpense.getAmount());
            expense.setDate(updatedExpense.getDate());
            Expense savedExpense = expenseRepository.save(expense);
            return ResponseEntity.ok(savedExpense);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }


}
