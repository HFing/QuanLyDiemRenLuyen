package com.dev.backend.repositories;

import com.dev.backend.models.HocKi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface HocKiRepository extends JpaRepository<HocKi, Integer> {
}
