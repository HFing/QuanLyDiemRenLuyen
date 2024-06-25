package com.dev.backend.services.impl;


import com.dev.backend.models.SinhVien;
import com.dev.backend.models.Status;
import com.dev.backend.repositories.SinhVienRepository;
import com.dev.backend.repositories.UserRepository;
import com.dev.backend.services.ISinhVienService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SinhVienServiceImpl implements ISinhVienService {
    @Autowired
    private final SinhVienRepository repo;
    @Autowired
    private final UserRepository userRepo;

    @Override
    public List<SinhVien> getAll() {
        return repo.findAll();
    }

    @SneakyThrows
    @Override
    public SinhVien getById(Integer id) {
        return repo.findById(id).orElseThrow(() -> new Exception("Not Found"));
    }

    @SneakyThrows
    @Override
    public SinhVien post(SinhVien data) {
//        Optional<User> user = userRepo.findById(data.getNguoiDung().getId());
//        if (user.isPresent())
//            data.setNguoiDung(user.get());
//        else
//            throw new Exception("Not Found");
        return repo.save(data);
    }

    @SneakyThrows
    @Override
    public SinhVien putById(SinhVien data) {
        return repo.findById(data.getId()).map(k -> {
            k.setNamHoc(data.getNamHoc());
            k.setLop(data.getLop());
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
