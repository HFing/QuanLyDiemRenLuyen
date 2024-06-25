package com.dev.backend.repositories;

import com.dev.backend.models.ChuyenVienCtsv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface ChuyenVienCtsvRepository extends JpaRepository<ChuyenVienCtsv, Integer> {
    @Query(value = """
                SELECT * FROM chuyen_vien_ctsv WHERE nguoi_dung_id = :id LIMIT 1
            """, nativeQuery = true)
    ChuyenVienCtsv findByUserId(Integer id);

}
