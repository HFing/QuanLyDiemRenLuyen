package com.dev.backend.services.impl;


import com.dev.backend.models.ChuyenVienCtsv;
import com.dev.backend.models.Role;
import com.dev.backend.models.Status;
import com.dev.backend.models.User;
import com.dev.backend.repositories.ChuyenVienCtsvRepository;
import com.dev.backend.repositories.UserRepository;
import com.dev.backend.services.IChuyenVienCtsvService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ChuyenVienCtsvServiceImpl implements IChuyenVienCtsvService {
    @Autowired
    private final ChuyenVienCtsvRepository repo;
    @Autowired
    private final UserRepository userRepo;

    @Override
    public List<ChuyenVienCtsv> getAll() {
        return repo.findAll();
    }

    @SneakyThrows
    @Override
    public ChuyenVienCtsv getById(Integer id) {
        return repo.findById(id).orElseThrow(() -> new Exception("Not Found"));
    }

    @SneakyThrows
    @Override
    public ChuyenVienCtsv post(ChuyenVienCtsv data) {
//        Optional<User> user = userRepo.findById(data.getNguoiDung().getId());
//        if (user.isPresent())
//            data.setNguoiDung(user.get());
//        else
//            throw new Exception("Not Found");
        return repo.save(data);
    }

    @SneakyThrows
    @Override
    public ChuyenVienCtsv putById(ChuyenVienCtsv data) {
        if (repo.existsById(data.getId()))
            return repo.save(data);
        throw new Exception("Not Found");
    }

    @SneakyThrows
    @Override
    public Void putStatus(Integer id) {
        repo.findById(id).map(data -> {
            data.setStatus(data.getStatus() == Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE);
            return repo.save(data);
        }).orElseThrow(() -> new RuntimeException("Not Found"));
        return null;
    }

    @SneakyThrows
    @Override
    public Void deleteById(Integer id) {
        if (repo.existsById(id))
            repo.deleteById(id);
        else
            throw new Exception("Not Found");
        return null;
    }

    @Override
    public Void initChuyenVienCTSV() {
        if (userRepo.findByEmail("ctsv@gmail.com").isEmpty()) {
            User user = new User();
            user.setFirstName("Nguyen");
            user.setLastName("CTSV");
            user.setEmail("ctsv@gmail.com");
            user.setPhoneNumber("0123456789");
            user.setAddress("ABC");
            user.setRole(Role.CTSV);
            ChuyenVienCtsv ctsv = new ChuyenVienCtsv();
            ctsv.setNguoiDung(user);
            repo.save(ctsv);
        }
        return null;
    }
}
