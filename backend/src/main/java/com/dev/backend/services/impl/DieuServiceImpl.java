package com.dev.backend.services.impl;


import com.dev.backend.models.Dieu;
import com.dev.backend.models.Status;
import com.dev.backend.repositories.DieuRepository;
import com.dev.backend.services.IDieuService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class DieuServiceImpl implements IDieuService {
    @Autowired
    private final DieuRepository repo;

    @Override
    public List<Dieu> getAll() {
        return repo.findAll();
    }

    @SneakyThrows
    @Override
    public Dieu getById(Integer id) {
        return repo.findById(id).orElseThrow(() -> new Exception("Not Found"));
    }

    @Override
    public Dieu post(Dieu data) {
        return repo.save(data);
    }

    @SneakyThrows
    @Override
    public Dieu putById(Dieu data) {
        return repo.findById(data.getId()).map(d -> {
            d.setDieu(data.getDieu());
            d.setDiemToiDa(data.getDiemToiDa());
            d.setStatus(data.getStatus());
            return repo.save(d);
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
