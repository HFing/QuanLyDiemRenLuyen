package com.dev.backend.controllers;


import com.dev.backend.DTO.LikeDto;
import com.dev.backend.models.Like;
import com.dev.backend.models.ResponseObject;
import com.dev.backend.services.ILikeService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/like")
@RequiredArgsConstructor
@CrossOrigin()
public class LikeController {
    private final ILikeService service;

    @GetMapping("/get-by-post/{id}")
    public ResponseObject<List<Like>> getByPostId(@PathVariable Integer id, HttpServletRequest request) {
        try {
            return new ResponseObject<>("ok", "getByPostId", service.getByPostId(id));
        } catch (Exception exception) {
            return new ResponseObject<>("failed", "getByPostId", null);
        }
    }

    @PostMapping()
    public ResponseObject<Like> post(@RequestBody LikeDto data, HttpServletRequest request) {
        try {
            System.out.println(data);
            return new ResponseObject<>("ok", "post", service.post(data));
        } catch (Exception exception) {
            exception.printStackTrace();
            return new ResponseObject<>("failed", "post", null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseObject<Void> deleteById(@PathVariable Integer id, HttpServletRequest request) {
        try {
            return new ResponseObject<>("ok", "deleteById", service.deleteById(id));
        } catch (Exception exception) {
            exception.printStackTrace();
            return new ResponseObject<>("failed", "deleteById", null);
        }
    }
}
