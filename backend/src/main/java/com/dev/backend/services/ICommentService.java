package com.dev.backend.services;


import com.dev.backend.DTO.CommentDto;
import com.dev.backend.models.Comment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ICommentService {

    List<Comment> getByPostId(Integer id);

    Comment post(CommentDto data);

    Comment putById(Comment data);

    Void deleteById(Integer id);
}