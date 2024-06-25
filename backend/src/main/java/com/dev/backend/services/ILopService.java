package com.dev.backend.services;


import com.dev.backend.models.Lop;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ILopService {
    List<Lop> getAll();

    Lop getById(Integer id);

    Lop post(Lop data);

    Lop putById(Lop data);

    Void putStatus(Integer id);
    
    Void deleteById(Integer id);
}