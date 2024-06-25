package com.dev.backend.services.impl;


import com.dev.backend.models.SinhVien;
import com.dev.backend.models.SinhVienHoatDong;
import com.dev.backend.models.Status;
import com.dev.backend.repositories.SinhVienHoatDongRepository;
import com.dev.backend.services.ISinhVienHoatDongService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class SinhVienHoatDongServiceImpl implements ISinhVienHoatDongService {
    @Autowired
    private final SinhVienHoatDongRepository repo;

    @Override
    public List<SinhVienHoatDong> getAll() {
        return repo.findAll();
    }

    @SneakyThrows
    @Override
    public SinhVienHoatDong getById(Integer id) {
        return repo.findById(id).orElseThrow(() -> new Exception("Not Found"));
    }

    @Override
    public SinhVienHoatDong post(SinhVienHoatDong data) {
        return repo.save(data);
    }

    @SneakyThrows
    @Override
    public SinhVienHoatDong putById(SinhVienHoatDong data) {
        return repo.findById(data.getId()).map(k -> {
            k.setHoatDong(data.getHoatDong());
            k.setSinhVien(data.getSinhVien());
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

    @Override
    public List<Map<String, Object>> getDiemRenLuyenByKhoa(Integer khoaId) {
        List<SinhVienHoatDong> activities = repo.findByKhoaId(khoaId);
        return activities.stream()
                .filter(SinhVienHoatDong::getTrangThai)
                .collect(Collectors.groupingBy(
                        svhd -> svhd.getSinhVien(),
                        Collectors.summingInt(svhd -> svhd.getHoatDong().getDiem())
                ))
                .entrySet()
                .stream()
                .map(entry -> Map.of(
                        "sinhVien", Map.of(
                                "id", entry.getKey().getId(),
                                "email", entry.getKey().getNguoiDung().getEmail(),
                                "firstName", entry.getKey().getNguoiDung().getFirstName(),
                                "lastName", entry.getKey().getNguoiDung().getLastName(),
                                "lop", Map.of(
                                        "id", entry.getKey().getLop().getId(),
                                        "ten", entry.getKey().getLop().getTen()
                                ),
                                "khoa", Map.of(
                                        "id", entry.getKey().getLop().getKhoa().getId(),
                                        "ten", entry.getKey().getLop().getKhoa().getTen()
                                )
                        ),
                        "diem", entry.getValue()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<Map<String, Object>> getDiemRenLuyenByLop(Integer lopId) {
        List<SinhVienHoatDong> activities = repo.findByLopId(lopId);
        return activities.stream()
                .filter(SinhVienHoatDong::getTrangThai)
                .collect(Collectors.groupingBy(
                        svhd -> svhd.getSinhVien(),
                        Collectors.summingInt(svhd -> svhd.getHoatDong().getDiem())
                ))
                .entrySet()
                .stream()
                .map(entry -> Map.of(
                        "sinhVien", Map.of(
                                "id", entry.getKey().getId(),
                                "email", entry.getKey().getNguoiDung().getEmail(),
                                "firstName", entry.getKey().getNguoiDung().getFirstName(),
                                "lastName", entry.getKey().getNguoiDung().getLastName(),
                                "lop", Map.of(
                                        "id", entry.getKey().getLop().getId(),
                                        "ten", entry.getKey().getLop().getTen()
                                ),
                                "khoa", Map.of(
                                        "id", entry.getKey().getLop().getKhoa().getId(),
                                        "ten", entry.getKey().getLop().getKhoa().getTen()
                                )
                        ),
                        "diem", entry.getValue()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<Map<String, Object>> getDiemRenLuyenToanTruong() {
        List<SinhVienHoatDong> activities = repo.findAllWithDetails();
        return activities.stream()
                .filter(SinhVienHoatDong::getTrangThai)
                .collect(Collectors.groupingBy(
                        svhd -> svhd.getSinhVien(),
                        Collectors.summingInt(svhd -> svhd.getHoatDong().getDiem())
                ))
                .entrySet()
                .stream()
                .map(entry -> Map.of(
                        "sinhVien", Map.of(
                                "id", entry.getKey().getId(),
                                "email", entry.getKey().getNguoiDung().getEmail(),
                                "firstName", entry.getKey().getNguoiDung().getFirstName(),
                                "lastName", entry.getKey().getNguoiDung().getLastName(),
                                "lop", Map.of(
                                        "id", entry.getKey().getLop().getId(),
                                        "ten", entry.getKey().getLop().getTen()
                                ),
                                "khoa", Map.of(
                                        "id", entry.getKey().getLop().getKhoa().getId(),
                                        "ten", entry.getKey().getLop().getKhoa().getTen()
                                )
                        ),
                        "diem", entry.getValue()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<Map<String, Object>> getDiemRenLuyenBySinhVien(Integer sinhVienId) {
        List<SinhVienHoatDong> activities = repo.findBySinhVienId(sinhVienId);
        if (activities.isEmpty()) {
            return new ArrayList<>();
        }

        SinhVien sinhVien = activities.get(0).getSinhVien();
        List<Map<String, Object>> hoatDongList = activities.stream()
                .map(svhd -> Map.of(
                        "hoatDong", Map.of(
                                "id", svhd.getHoatDong().getId(),
                                "ten", svhd.getHoatDong().getTen(),
                                "moTa", svhd.getHoatDong().getMoTa()
                        ),
                        "diem", svhd.getHoatDong().getDiem()
                ))
                .toList();

        int tongDiem = activities.stream()
                .filter(SinhVienHoatDong::getTrangThai)
                .mapToInt(svhd -> svhd.getHoatDong().getDiem())
                .sum();
        List<Map<String, Object>> result = new ArrayList<>();
        result.add(Map.of(
                "sinhVien", Map.of(
                        "id", sinhVien.getId(),
                        "email", sinhVien.getNguoiDung().getEmail(),
                        "firstName", sinhVien.getNguoiDung().getFirstName(),
                        "lastName", sinhVien.getNguoiDung().getLastName(),
                        "lop", Map.of(
                                "id", sinhVien.getLop().getId(),
                                "ten", sinhVien.getLop().getTen()
                        ),
                        "khoa", Map.of(
                                "id", sinhVien.getLop().getKhoa().getId(),
                                "ten", sinhVien.getLop().getKhoa().getTen()
                        )
                ),
                "hoatDongLst", hoatDongList,
                "diem", tongDiem
        ));
        return result;
    }
}
