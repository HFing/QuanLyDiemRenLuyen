package com.dev.backend.services;


import com.dev.backend.models.SinhVienHoatDong;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface ISinhVienHoatDongService {
    List<SinhVienHoatDong> getAll();

    SinhVienHoatDong getById(Integer id);

    SinhVienHoatDong post(SinhVienHoatDong data);

    SinhVienHoatDong putById(SinhVienHoatDong data);

    Void putStatus(Integer id);

    Void deleteById(Integer id);

    List<Map<String, Object>> getDiemRenLuyenByKhoa(Integer khoaId);

    List<Map<String, Object>> getDiemRenLuyenByLop(Integer lopId);

    List<Map<String, Object>> getDiemRenLuyenToanTruong();

    List<Map<String, Object>> getDiemRenLuyenBySinhVien(Integer sinhVienId);
}