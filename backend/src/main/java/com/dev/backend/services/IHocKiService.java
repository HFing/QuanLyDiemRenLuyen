package com.dev.backend.services;


import com.dev.backend.models.HocKi;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IHocKiService {
    List<HocKi> getAll();

    HocKi getById(Integer id);

    HocKi post(HocKi data);

    HocKi putById(HocKi data);

    Void putStatus(Integer id);
    
    Void deleteById(Integer id);
}