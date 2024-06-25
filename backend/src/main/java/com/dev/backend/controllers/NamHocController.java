package com.dev.backend.controllers;


import com.dev.backend.models.NamHoc;
import com.dev.backend.models.ResponseObject;
import com.dev.backend.services.INamHocService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nam-hoc")
@RequiredArgsConstructor
@CrossOrigin()
public class NamHocController {
    private final INamHocService service;


    @GetMapping()
    public ResponseObject<List<NamHoc>> getAll(HttpServletRequest request) {
        try {
            return new ResponseObject<>("ok", "getAll", service.getAll());
        } catch (Exception exception) {
            return new ResponseObject<>("failed", "getAll", null);
        }
    }

    @GetMapping("/{id}")
    public ResponseObject<NamHoc> getById(@PathVariable Integer id, HttpServletRequest request) {
        try {
            return new ResponseObject<>("ok", "getById", service.getById(id));
        } catch (Exception exception) {
            return new ResponseObject<>("failed", "getById", null);
        }
    }

    @PostMapping()
    public ResponseObject<NamHoc> post(@RequestBody NamHoc data, HttpServletRequest request) {
        try {
            return new ResponseObject<>("ok", "post", service.post(data));
        } catch (Exception exception) {
            exception.printStackTrace();
            return new ResponseObject<>("failed", "post", null);
        }
    }

    @PutMapping()
    public ResponseObject<NamHoc> putById(@RequestBody NamHoc data, HttpServletRequest request) {
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
