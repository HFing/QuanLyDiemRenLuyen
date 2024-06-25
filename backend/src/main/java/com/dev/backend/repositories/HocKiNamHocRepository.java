package com.dev.backend.repositories;

import com.dev.backend.models.HocKiNamHoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface HocKiNamHocRepository extends JpaRepository<HocKiNamHoc, Integer> {
}
