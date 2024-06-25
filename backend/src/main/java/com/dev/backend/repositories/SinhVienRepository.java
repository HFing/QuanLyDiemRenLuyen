package com.dev.backend.repositories;

import com.dev.backend.models.SinhVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface SinhVienRepository extends JpaRepository<SinhVien, Integer> {
    @Query(value = """
                SELECT * FROM sinh_vien WHERE nguoi_dung_id = :id LIMIT 1
            """, nativeQuery = true)
    SinhVien findByUserId(Integer id);
}
