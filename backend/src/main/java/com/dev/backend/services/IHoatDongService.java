package com.dev.backend.services;


import com.dev.backend.models.HoatDong;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IHoatDongService {
    List<HoatDong> getAll();

    HoatDong getById(Integer id);

    HoatDong post(HoatDong data);

    HoatDong putById(HoatDong data);

    Void putStatus(Integer id);
    
    Void deleteById(Integer id);
}