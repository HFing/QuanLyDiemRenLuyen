package com.dev.backend.services;


import com.dev.backend.models.ChuyenVienCtsv;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IChuyenVienCtsvService {
    List<ChuyenVienCtsv> getAll();

    ChuyenVienCtsv getById(Integer id);

    ChuyenVienCtsv post(ChuyenVienCtsv data);

    ChuyenVienCtsv putById(ChuyenVienCtsv data);

    Void putStatus(Integer id);

    Void deleteById(Integer id);

    Void initChuyenVienCTSV();
}