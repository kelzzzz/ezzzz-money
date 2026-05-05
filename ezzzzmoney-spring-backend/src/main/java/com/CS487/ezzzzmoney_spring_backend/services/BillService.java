package com.CS487.ezzzzmoney_spring_backend.services;

import com.CS487.ezzzzmoney_spring_backend.models.Bill;
import com.CS487.ezzzzmoney_spring_backend.models.User;
import com.CS487.ezzzzmoney_spring_backend.repositories.BillRepository;
import com.CS487.ezzzzmoney_spring_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Bill> getBillsByUserId(Long userId) {
        return billRepository.findByUserId(userId);
    }

    public Bill createBill(Long userId, Bill bill) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            bill.setUser(user.get());
            if (bill.getPaid() == null) bill.setPaid(false);
            if (bill.getRecurring() == null) bill.setRecurring(false);
            return billRepository.save(bill);
        }
        return null;
    }

    public Bill updateBill(Long billId, Bill billDetails) {
        Optional<Bill> bill = billRepository.findById(billId);
        if (bill.isPresent()) {
            Bill existing = bill.get();
            if (billDetails.getName() != null) existing.setName(billDetails.getName());
            if (billDetails.getAmount() != null) existing.setAmount(billDetails.getAmount());
            if (billDetails.getDueDate() != null) existing.setDueDate(billDetails.getDueDate());
            if (billDetails.getCategory() != null) existing.setCategory(billDetails.getCategory());
            if (billDetails.getPaid() != null) existing.setPaid(billDetails.getPaid());
            if (billDetails.getRecurring() != null) existing.setRecurring(billDetails.getRecurring());
            if (billDetails.getFrequency() != null) existing.setFrequency(billDetails.getFrequency());
            return billRepository.save(existing);
        }
        return null;
    }

    public boolean deleteBill(Long billId) {
        if (billRepository.existsById(billId)) {
            billRepository.deleteById(billId);
            return true;
        }
        return false;
    }
}
