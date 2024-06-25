package com.dev.backend.repositories;

import com.dev.backend.models.Lop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface LopRepository extends JpaRepository<Lop, Integer> {
}
