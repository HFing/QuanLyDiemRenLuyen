package com.dev.backend.services.impl;


import com.dev.backend.DTO.CommentDto;
import com.dev.backend.models.Comment;
import com.dev.backend.repositories.BaiVietRepository;
import com.dev.backend.repositories.CommentRepository;
import com.dev.backend.repositories.UserRepository;
import com.dev.backend.services.ICommentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentServiceImpl implements ICommentService {
    @Autowired
    private final CommentRepository repo;
    @Autowired
    private final BaiVietRepository bvRepo;
    @Autowired
    private final UserRepository uRepo;

    @SneakyThrows
    @Override
    public List<Comment> getByPostId(Integer id) {
        return repo.findByPostId(id);
    }

    @SneakyThrows
    @Override
    public Comment post(CommentDto data) {
        Comment comment = new Comment();
        comment.setNoiDung(data.getNoiDung());
        comment.setNguoiDung(uRepo.findById(data.getNguoiDung().getId()).orElseThrow(() -> new Exception("Not Found")));
        comment.setBaiViet(bvRepo.findById(data.getBaiViet().getId()).orElseThrow(() -> new Exception("Not Found")));
        return repo.save(comment);
    }

    @SneakyThrows
    @Override
    public Comment putById(Comment data) {
        return repo.findById(data.getId()).map(cmt -> {
            cmt.setNoiDung(data.getNoiDung());
            return repo.save(cmt);
        }).orElseThrow(() -> new RuntimeException("Not Found"));
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
