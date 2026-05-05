package com.CS487.ezzzzmoney_spring_backend.services;

import com.CS487.ezzzzmoney_spring_backend.models.User;
import com.CS487.ezzzzmoney_spring_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User authenticate(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    public User createUser(String email, String password) {
        User user = new User(email, password);
        return userRepository.save(user);
    }
}
