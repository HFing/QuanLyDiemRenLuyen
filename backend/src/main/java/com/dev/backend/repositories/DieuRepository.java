package com.dev.backend.repositories;

import com.dev.backend.models.Dieu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface DieuRepository extends JpaRepository<Dieu, Integer> {
}
