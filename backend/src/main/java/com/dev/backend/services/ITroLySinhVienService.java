package com.dev.backend.services;


import com.dev.backend.models.TroLySinhVien;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ITroLySinhVienService {
    List<TroLySinhVien> getAll();

    TroLySinhVien getById(Integer id);

    TroLySinhVien post(TroLySinhVien data);

    TroLySinhVien putById(TroLySinhVien data);

    Void putStatus(Integer id);
    
    Void deleteById(Integer id);
}