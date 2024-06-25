package com.dev.backend.repositories;

import com.dev.backend.models.NamHoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface NamHocRepository extends JpaRepository<NamHoc, Integer> {
}
