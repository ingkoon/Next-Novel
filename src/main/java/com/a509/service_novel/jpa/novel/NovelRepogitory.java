package com.example.novel.jpa.novel;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NovelRepogitory extends JpaRepository<Novel, Integer> {
}
