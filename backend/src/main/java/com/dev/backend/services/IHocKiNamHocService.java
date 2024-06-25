package com.dev.backend.services;


import com.dev.backend.models.HocKiNamHoc;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IHocKiNamHocService {
    List<HocKiNamHoc> getAll();

    HocKiNamHoc getById(Integer id);

    HocKiNamHoc post(HocKiNamHoc data);

    HocKiNamHoc putById(HocKiNamHoc data);

    Void putStatus(Integer id);
    
    Void deleteById(Integer id);
}