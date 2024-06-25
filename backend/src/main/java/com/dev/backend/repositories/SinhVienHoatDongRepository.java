package com.dev.backend.repositories;

import com.dev.backend.models.SinhVienHoatDong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;

@EnableJpaRepositories
public interface SinhVienHoatDongRepository extends JpaRepository<SinhVienHoatDong, Integer> {
    @Query("SELECT svhd FROM SinhVienHoatDong svhd JOIN FETCH svhd.sinhVien sv JOIN FETCH sv.lop l JOIN FETCH l.khoa k WHERE k.id = :khoaId")
    List<SinhVienHoatDong> findByKhoaId(Integer khoaId);

    @Query("SELECT svhd FROM SinhVienHoatDong svhd JOIN FETCH svhd.sinhVien sv JOIN FETCH sv.lop l WHERE l.id = :lopId")
    List<SinhVienHoatDong> findByLopId(Integer lopId);

    @Query("SELECT svhd FROM SinhVienHoatDong svhd JOIN FETCH svhd.sinhVien sv JOIN FETCH sv.lop l JOIN FETCH l.khoa k")
    List<SinhVienHoatDong> findAllWithDetails();

    @Query("SELECT svhd FROM SinhVienHoatDong svhd WHERE svhd.sinhVien.id = :sinhVienId")
    List<SinhVienHoatDong> findBySinhVienId(Integer sinhVienId);
}
