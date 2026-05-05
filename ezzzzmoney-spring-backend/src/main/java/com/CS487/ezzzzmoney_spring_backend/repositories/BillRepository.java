package com.CS487.ezzzzmoney_spring_backend.repositories;

import com.CS487.ezzzzmoney_spring_backend.models.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findByUserId(Long userId);
}
