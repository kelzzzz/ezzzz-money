package com.CS487.ezzzzmoney_spring_backend.repositories;

import com.CS487.ezzzzmoney_spring_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
