package com.dev.backend.services.impl;


import com.dev.backend.models.NamHoc;
import com.dev.backend.models.Status;
import com.dev.backend.repositories.NamHocRepository;
import com.dev.backend.services.INamHocService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class NamHocServiceImpl implements INamHocService {
    @Autowired
    private final NamHocRepository repo;

    @Override
    public List<NamHoc> getAll() {
        return repo.findAll();
    }

    @SneakyThrows
    @Override
    public NamHoc getById(Integer id) {
        return repo.findById(id).orElseThrow(() -> new Exception("Not Found"));
    }

    @Override
    public NamHoc post(NamHoc data) {
        return repo.save(data);
    }

    @SneakyThrows
    @Override
    public NamHoc putById(NamHoc data) {
        return repo.findById(data.getId()).map(n -> {
            n.setNamHoc(data.getNamHoc());
            n.setStatus(data.getStatus());
            return repo.save(n);
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
