package com.dev.backend.controllers;

import com.dev.backend.models.ResponseObject;
import com.dev.backend.services.ISinhVienHoatDongService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/diem-ren-luyen")
@RequiredArgsConstructor
@CrossOrigin()

public class DiemRenLuyenController {
    private final ISinhVienHoatDongService service;

    @GetMapping("/khoa/{khoaId}")
    public ResponseObject<List<Map<String, Object>>> getDiemRenLuyenByKhoa(@PathVariable Integer khoaId) {
        try {
            return new ResponseObject<>("ok", "getDiemRenLuyenByKhoa", service.getDiemRenLuyenByKhoa(khoaId));
        } catch (Exception exception) {
            return new ResponseObject<>("failed", "getDiemRenLuyenByKhoa", null);
        }
    }

    @GetMapping("/lop/{lopId}")
    public ResponseObject<List<Map<String, Object>>> getDiemRenLuyenByLop(@PathVariable Integer lopId) {
        try {
            return new ResponseObject<>("ok", "getDiemRenLuyenByLop", service.getDiemRenLuyenByLop(lopId));
        } catch (Exception exception) {
            return new ResponseObject<>("failed", "getDiemRenLuyenByLop", null);
        }
    }

    @GetMapping("/toan-truong")
    public ResponseObject<List<Map<String, Object>>> getDiemRenLuyenToanTruong() {
        try {
            return new ResponseObject<>("ok", "getDiemRenLuyenToanTruong", service.getDiemRenLuyenToanTruong());
        } catch (Exception exception) {
            return new ResponseObject<>("failed", "getDiemRenLuyenToanTruong", null);
        }
    }

    @GetMapping("/sinh-vien/{sinhVienId}")
    public ResponseObject<List<Map<String, Object>>> getDiemRenLuyenBySinhVien(@PathVariable Integer sinhVienId) {
        try {
            return new ResponseObject<>("ok", "getDiemRenLuyenBySinhVien", service.getDiemRenLuyenBySinhVien(sinhVienId));
        } catch (Exception exception) {
            return new ResponseObject<>("failed", "getDiemRenLuyenBySinhVien", null);
        }
    }
}
