package com.dev.backend.repositories;

import com.dev.backend.models.TroLySinhVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface TroLySinhVienRepository extends JpaRepository<TroLySinhVien, Integer> {
    @Query(value = """
                SELECT * FROM tro_ly_sinh_vien WHERE nguoi_dung_id = :id LIMIT 1
            """, nativeQuery = true)
    TroLySinhVien findByUserId(Integer id);
}
