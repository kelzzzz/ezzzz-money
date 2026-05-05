package com.CS487.ezzzzmoney_spring_backend.services;

import com.CS487.ezzzzmoney_spring_backend.models.Expense;
import com.CS487.ezzzzmoney_spring_backend.models.User;
import com.CS487.ezzzzmoney_spring_backend.repositories.ExpenseRepository;
import com.CS487.ezzzzmoney_spring_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Expense> getExpensesByUserId(Long userId) {
        return expenseRepository.findByUserId(userId);
    }

    public Expense createExpense(Long userId, Expense expense) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            expense.setUser(user.get());
            return expenseRepository.save(expense);
        }
        return null;
    }

    public Expense updateExpense(Long expenseId, Expense expenseDetails) {
        Optional<Expense> expense = expenseRepository.findById(expenseId);
        if (expense.isPresent()) {
            Expense existingExpense = expense.get();
            if (expenseDetails.getDescription() != null) {
                existingExpense.setDescription(expenseDetails.getDescription());
            }
            if (expenseDetails.getAmount() != null) {
                existingExpense.setAmount(expenseDetails.getAmount());
            }
            if (expenseDetails.getCategory() != null) {
                existingExpense.setCategory(expenseDetails.getCategory());
            }
            if (expenseDetails.getDate() != null) {
                existingExpense.setDate(expenseDetails.getDate());
            }
            if (expenseDetails.getType() != null) {
                existingExpense.setType(expenseDetails.getType());
            }
            return expenseRepository.save(existingExpense);
        }
        return null;
    }

    public boolean deleteExpense(Long expenseId) {
        if (expenseRepository.existsById(expenseId)) {
            expenseRepository.deleteById(expenseId);
            return true;
        }
        return false;
    }
}
