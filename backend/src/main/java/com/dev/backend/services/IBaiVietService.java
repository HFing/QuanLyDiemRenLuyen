package com.dev.backend.services;


import com.dev.backend.models.BaiViet;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IBaiVietService {
    List<BaiViet> getAll();

    BaiViet getById(Integer id);

    BaiViet post(BaiViet data);

    BaiViet putById(BaiViet data);

    Void putStatus(Integer id);

    Void deleteById(Integer id);
}