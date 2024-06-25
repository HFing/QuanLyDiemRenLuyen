package com.dev.backend.repositories;

import com.dev.backend.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;

@EnableJpaRepositories
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    @Query(value = """
                SELECT * FROM COMMENT WHERE bai_viet_id = :id
            """, nativeQuery = true)
    List<Comment> findByPostId(Integer id);
}
