package com.dev.backend.services.impl;


import com.dev.backend.models.BaiViet;
import com.dev.backend.models.Status;
import com.dev.backend.repositories.BaiVietRepository;
import com.dev.backend.repositories.CommentRepository;
import com.dev.backend.repositories.LikeRepository;
import com.dev.backend.services.IBaiVietService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class BaiVietServiceImpl implements IBaiVietService {
    @Autowired
    private final BaiVietRepository repo;
    @Autowired
    private final LikeRepository likeRepo;
    @Autowired
    private final CommentRepository commentRepo;

    @Override
    public List<BaiViet> getAll() {
        return repo.findAll();
//                .stream().map(bv -> {
//            bv.setCommentSet(commentRepo.findByPostId(bv.getId()));
//            bv.setLikeSet(likeRepo.findByPostId(bv.getId()));
//            return bv;
//        }).collect(Collectors.toList());
    }

    @SneakyThrows
    @Override
    public BaiViet getById(Integer id) {
        BaiViet baiViet = repo.findById(id).orElseThrow(() -> new Exception("Not Found"));
//        baiViet.setCommentSet(new HashSet<>(commentRepo.findByPostId(baiViet.getId())));
//        baiViet.setLikeSet(new HashSet<>(likeRepo.findByPostId(baiViet.getId())));
        return baiViet;
    }

    @Override
    public BaiViet post(BaiViet data) {
        return repo.save(data);
    }

    @SneakyThrows
    @Override
    public BaiViet putById(BaiViet data) {
        return repo.findById(data.getId()).map(k -> {
            k.setHoatDong(data.getHoatDong());
            k.setTen(data.getTen());
            k.setNoiDung(data.getNoiDung());
            return repo.save(k);
        }).orElseThrow(() -> new RuntimeException("Not Found"));
    }

    @SneakyThrows
    @Override
    public Void putStatus(Integer id) {
        repo.findById(id).map(data -> {
            data.setStatus(data.getStatus() == Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE);
            return repo.save(data);
        }).orElseThrow(() -> new RuntimeException("Not Found"));
        return null;
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
