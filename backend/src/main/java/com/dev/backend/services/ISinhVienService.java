package com.dev.backend.services;


import com.dev.backend.models.SinhVien;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ISinhVienService {
    List<SinhVien> getAll();

    SinhVien getById(Integer id);

    SinhVien post(SinhVien data);

    SinhVien putById(SinhVien data);

    Void putStatus(Integer id);
    
    Void deleteById(Integer id);
}