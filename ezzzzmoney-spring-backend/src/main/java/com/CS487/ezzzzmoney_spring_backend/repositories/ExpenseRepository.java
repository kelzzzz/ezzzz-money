package com.CS487.ezzzzmoney_spring_backend.repositories;

import com.CS487.ezzzzmoney_spring_backend.models.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUserId(Long userId);
}
