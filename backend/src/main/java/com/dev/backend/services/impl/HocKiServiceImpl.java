package com.dev.backend.services.impl;


import com.dev.backend.models.HocKi;
import com.dev.backend.models.Status;
import com.dev.backend.repositories.HocKiRepository;
import com.dev.backend.services.IHocKiService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class HocKiServiceImpl implements IHocKiService {
    @Autowired
    private final HocKiRepository repo;

    @Override
    public List<HocKi> getAll() {
        return repo.findAll();
    }

    @SneakyThrows
    @Override
    public HocKi getById(Integer id) {
        return repo.findById(id).orElseThrow(() -> new Exception("Not Found"));
    }

    @Override
    public HocKi post(HocKi data) {
        return repo.save(data);
    }

    @SneakyThrows
    @Override
    public HocKi putById(HocKi data) {
        return repo.findById(data.getId()).map(hk -> {
            hk.setHocKi(data.getHocKi());
            hk.setStatus(data.getStatus());
            return repo.save(hk);
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
