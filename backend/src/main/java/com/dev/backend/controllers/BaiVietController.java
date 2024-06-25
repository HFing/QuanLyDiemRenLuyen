package com.dev.backend.controllers;


import com.dev.backend.models.BaiViet;
import com.dev.backend.models.ResponseObject;
import com.dev.backend.services.IBaiVietService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bai-viet")
@RequiredArgsConstructor
@CrossOrigin()
public class BaiVietController {
    private final IBaiVietService service;

    @GetMapping()
    public ResponseObject<List<BaiViet>> getAll(HttpServletRequest request) {
        try {
            return new ResponseObject<>("ok", "getAll", service.getAll());
        } catch (Exception exception) {
            return new ResponseObject<>("failed", "getAll", null);
        }
    }

    @GetMapping("/{id}")
    public ResponseObject<BaiViet> getById(@PathVariable Integer id, HttpServletRequest request) {
        try {
            return new ResponseObject<>("ok", "getById", service.getById(id));
        } catch (Exception exception) {
            exception.printStackTrace();
            return new ResponseObject<>("failed", "getById", null);
        }
    }

    @PostMapping()
    public ResponseObject<BaiViet> post(@RequestBody BaiViet data, HttpServletRequest request) {
        try {
            return new ResponseObject<>("ok", "post", service.post(data));
        } catch (Exception exception) {
            exception.printStackTrace();
            return new ResponseObject<>("failed", "post", null);
        }
    }

    @PutMapping()
    public ResponseObject<BaiViet> putById(@RequestBody BaiViet data, HttpServletRequest request) {
        try {
            return new ResponseObject<>("ok", "putById", service.putById(data));
        } catch (Exception exception) {
            return new ResponseObject<>("failed", "putById", null);
        }
    }

    @PutMapping("/{id}")
    public ResponseObject<Void> putStatus(@PathVariable Integer id, HttpServletRequest request) {
        try {
            return new ResponseObject<>("ok", "putStatus", service.putStatus(id));
        } catch (Exception exception) {
            return new ResponseObject<>("failed", "putStatus", null);
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
