package com.dev.backend.repositories;

import com.dev.backend.models.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;

@EnableJpaRepositories
public interface LikeRepository extends JpaRepository<Like, Integer> {
    @Query(value = """
                SELECT * FROM `LIKE` WHERE bai_viet_id = :id
            """, nativeQuery = true)
    List<Like> findByPostId(Integer id);
}
