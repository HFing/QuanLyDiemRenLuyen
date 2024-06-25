package com.dev.backend.services.impl;


import com.dev.backend.models.Lop;
import com.dev.backend.models.Status;
import com.dev.backend.repositories.LopRepository;
import com.dev.backend.services.ILopService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class LopServiceImpl implements ILopService {
    @Autowired
    private final LopRepository repo;

    @Override
    public List<Lop> getAll() {
        return repo.findAll();
    }

    @SneakyThrows
    @Override
    public Lop getById(Integer id) {
        return repo.findById(id).orElseThrow(() -> new Exception("Not Found"));
    }

    @Override
    public Lop post(Lop data) {
        return repo.save(data);
    }

    @SneakyThrows
    @Override
    public Lop putById(Lop data) {
        return repo.findById(data.getId()).map(l -> {
            l.setTen(data.getTen());
            l.setKhoa(data.getKhoa());
            l.setStatus(data.getStatus());
            return repo.save(l);
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
