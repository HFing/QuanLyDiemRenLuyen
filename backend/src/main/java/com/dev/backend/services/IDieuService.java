package com.dev.backend.services;


import com.dev.backend.models.Dieu;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IDieuService {
    List<Dieu> getAll();

    Dieu getById(Integer id);

    Dieu post(Dieu data);

    Dieu putById(Dieu data);

    Void putStatus(Integer id);
    
    Void deleteById(Integer id);
}