package com.dev.backend.services.impl;


import com.dev.backend.models.Status;
import com.dev.backend.models.TroLySinhVien;
import com.dev.backend.repositories.TroLySinhVienRepository;
import com.dev.backend.repositories.UserRepository;
import com.dev.backend.services.ITroLySinhVienService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TroLySinhVienServiceImpl implements ITroLySinhVienService {
    @Autowired
    private final TroLySinhVienRepository repo;
    @Autowired
    private final UserRepository userRepo;

    @Override
    public List<TroLySinhVien> getAll() {
        return repo.findAll();
    }

    @SneakyThrows
    @Override
    public TroLySinhVien getById(Integer id) {
        return repo.findById(id).orElseThrow(() -> new Exception("Not Found"));
    }

    @SneakyThrows
    @Override
    public TroLySinhVien post(TroLySinhVien data) {
//        Optional<User> user = userRepo.findById(data.getNguoiDung().getId());
//        if (user.isPresent())
//            data.setNguoiDung(user.get());
//        else
//            throw new Exception("Not Found");
        return repo.save(data);
    }

    @SneakyThrows
    @Override
    public TroLySinhVien putById(TroLySinhVien data) {
        return repo.findById(data.getId()).map(k -> {
            k.setKhoa(data.getKhoa());
            k.setNguoiDung(data.getNguoiDung());
            k.setStatus(data.getStatus());
            return repo.save(k);
        }).orElseThrow(() -> new RuntimeException("Not Found"));
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
}
