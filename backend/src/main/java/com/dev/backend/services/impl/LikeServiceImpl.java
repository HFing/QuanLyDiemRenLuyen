package com.dev.backend.services.impl;


import com.dev.backend.DTO.LikeDto;
import com.dev.backend.models.Like;
import com.dev.backend.repositories.BaiVietRepository;
import com.dev.backend.repositories.LikeRepository;
import com.dev.backend.repositories.UserRepository;
import com.dev.backend.services.ILikeService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeServiceImpl implements ILikeService {
    @Autowired
    private final LikeRepository repo;
    @Autowired
    private final BaiVietRepository bvRepo;
    @Autowired
    private final UserRepository uRepo;

    @SneakyThrows
    @Override
    public List<Like> getByPostId(Integer id) {
        return repo.findByPostId(id);
    }

    @SneakyThrows
    @Override
    public Like post(LikeDto data) {
        Like like = new Like();
        like.setNguoiDung(uRepo.findById(data.getNguoiDung().getId()).orElseThrow(() -> new Exception("Not Found")));
        like.setBaiViet(bvRepo.findById(data.getBaiViet().getId()).orElseThrow(() -> new Exception("Not Found")));
        return repo.save(like);
    }

    @SneakyThrows
    @Override
    public Void deleteById(Integer id) {
        if (repo.existsById(id))
            repo.deleteById(id);
        else
            throw new Exception("Not Found");
        return null;
    }
}
