package com.dev.backend.services.impl;


import com.dev.backend.models.HocKiNamHoc;
import com.dev.backend.models.Status;
import com.dev.backend.repositories.HocKiNamHocRepository;
import com.dev.backend.services.IHocKiNamHocService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class HocKiNamHocServiceImpl implements IHocKiNamHocService {
    @Autowired
    private final HocKiNamHocRepository repo;

    @Override
    public List<HocKiNamHoc> getAll() {
        return repo.findAll();
    }

    @SneakyThrows
    @Override
    public HocKiNamHoc getById(Integer id) {
        return repo.findById(id).orElseThrow(() -> new Exception("Not Found"));
    }

    @Override
    public HocKiNamHoc post(HocKiNamHoc data) {
        return repo.save(data);
    }

    @SneakyThrows
    @Override
    public HocKiNamHoc putById(HocKiNamHoc data) {
        return repo.findById(data.getId()).map(k -> {
            k.setNamHoc(data.getNamHoc());
            k.setHocKi(data.getHocKi());
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
