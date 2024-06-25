package com.dev.backend.services;


import com.dev.backend.models.NamHoc;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface INamHocService {
    List<NamHoc> getAll();

    NamHoc getById(Integer id);

    NamHoc post(NamHoc data);

    NamHoc putById(NamHoc data);

    Void putStatus(Integer id);
    
    Void deleteById(Integer id);
}