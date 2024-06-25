package com.dev.backend.services.impl;


import com.dev.backend.models.Khoa;
import com.dev.backend.models.Status;
import com.dev.backend.repositories.KhoaRepository;
import com.dev.backend.services.IKhoaService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class KhoaServiceImpl implements IKhoaService {
    @Autowired
    private final KhoaRepository repo;

    @Override
    public List<Khoa> getAll() {
        return repo.findAll();
    }

    @SneakyThrows
    @Override
    public Khoa getById(Integer id) {
        return repo.findById(id).orElseThrow(() -> new Exception("Not Found"));
    }

    @Override
    public Khoa post(Khoa data) {
        return repo.save(data);
    }

    @SneakyThrows
    @Override
    public Khoa putById(Khoa data) {
        return repo.findById(data.getId()).map(k -> {
            k.setTen(data.getTen());
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
