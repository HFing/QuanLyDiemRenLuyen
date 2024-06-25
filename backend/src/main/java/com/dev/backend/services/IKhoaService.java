package com.dev.backend.services;


import com.dev.backend.models.Khoa;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IKhoaService {
    List<Khoa> getAll();

    Khoa getById(Integer id);

    Khoa post(Khoa data);

    Khoa putById(Khoa data);

    Void putStatus(Integer id);
    
    Void deleteById(Integer id);
}