package com.dev.backend.repositories;

import com.dev.backend.models.Khoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface KhoaRepository extends JpaRepository<Khoa, Integer> {
}
