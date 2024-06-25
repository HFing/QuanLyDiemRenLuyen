package com.dev.backend.services.impl;


import com.dev.backend.models.HoatDong;
import com.dev.backend.models.Status;
import com.dev.backend.repositories.HoatDongRepository;
import com.dev.backend.services.IHoatDongService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class HoatDongServiceImpl implements IHoatDongService {
    @Autowired
    private final HoatDongRepository repo;

    @Override
    public List<HoatDong> getAll() {
        return repo.findAll();
    }

    @SneakyThrows
    @Override
    public HoatDong getById(Integer id) {
        return repo.findById(id).orElseThrow(() -> new Exception("Not Found"));
    }

    @Override
    public HoatDong post(HoatDong data) {
        return repo.save(data);
    }

    @SneakyThrows
    @Override
    public HoatDong putById(HoatDong data) {
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
}
