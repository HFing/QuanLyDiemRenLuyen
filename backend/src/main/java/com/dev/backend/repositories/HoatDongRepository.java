package com.dev.backend.repositories;

import com.dev.backend.models.HoatDong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface HoatDongRepository extends JpaRepository<HoatDong, Integer> {
}
