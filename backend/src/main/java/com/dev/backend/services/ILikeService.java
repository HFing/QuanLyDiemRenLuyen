package com.dev.backend.services;


import com.dev.backend.DTO.LikeDto;
import com.dev.backend.models.Like;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ILikeService {

    List<Like> getByPostId(Integer id);

    Like post(LikeDto data);

    Void deleteById(Integer id);
}