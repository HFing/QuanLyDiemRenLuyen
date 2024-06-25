package com.dev.backend.controllers;


import com.dev.backend.DTO.CommentDto;
import com.dev.backend.models.Comment;
import com.dev.backend.models.ResponseObject;
import com.dev.backend.services.ICommentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
@CrossOrigin()
public class CommentController {
    private final ICommentService service;


    @GetMapping("/get-by-post/{id}")
    public ResponseObject<List<Comment>> getByPostId(@PathVariable Integer id, HttpServletRequest request) {
        try {
            return new ResponseObject<>("ok", "getByPostId", service.getByPostId(id));
        } catch (Exception exception) {
            return new ResponseObject<>("failed", "getByPostId", null);
        }
    }

    @PostMapping()
    public ResponseObject<Comment> post(@RequestBody CommentDto data, HttpServletRequest request) {
        try {
            return new ResponseObject<>("ok", "post", service.post(data));
        } catch (Exception exception) {
            return new ResponseObject<>("failed", "post", null);
        }
    }

    @PutMapping()
    public ResponseObject<Comment> putById(@RequestBody Comment data, HttpServletRequest request) {
        try {
            return new ResponseObject<>("ok", "putById", service.putById(data));
        } catch (Exception exception) {
            return new ResponseObject<>("failed", "putById", null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseObject<Void> deleteById(@PathVariable Integer id, HttpServletRequest request) {
        try {
            return new ResponseObject<>("ok", "deleteById", service.deleteById(id));
        } catch (Exception exception) {
            return new ResponseObject<>("failed", "deleteById", null);
        }
    }
}
