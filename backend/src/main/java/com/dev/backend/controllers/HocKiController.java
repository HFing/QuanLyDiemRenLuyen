package com.dev.backend.controllers;


import com.dev.backend.models.HocKi;
import com.dev.backend.models.ResponseObject;
import com.dev.backend.services.IHocKiService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hoc-ki")
@RequiredArgsConstructor
@CrossOrigin()
public class HocKiController {
    private final IHocKiService service;


    @GetMapping()
    public ResponseObject<List<HocKi>> getAll(HttpServletRequest request) {
        try {
            return new ResponseObject<>("ok", "getAll", service.getAll());
        } catch (Exception exception) {
            return new ResponseObject<>("failed", "getAll", null);
        }
    }

    @GetMapping("/{id}")
    public ResponseObject<HocKi> getById(@PathVariable Integer id, HttpServletRequest request) {
        try {
            return new ResponseObject<>("ok", "getById", service.getById(id));
        } catch (Exception exception) {
            return new ResponseObject<>("failed", "getById", null);
        }
    }

    @PostMapping()
    public ResponseObject<HocKi> post(@RequestBody HocKi data, HttpServletRequest request) {
        try {
            return new ResponseObject<>("ok", "post", service.post(data));
        } catch (Exception exception) {
            return new ResponseObject<>("failed", "post", null);
        }
    }

    @PutMapping()
    public ResponseObject<HocKi> putById(@RequestBody HocKi data, HttpServletRequest request) {
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
