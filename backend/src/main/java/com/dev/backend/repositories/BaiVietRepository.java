package com.dev.backend.repositories;

import com.dev.backend.models.BaiViet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface BaiVietRepository extends JpaRepository<BaiViet, Integer> {
}
