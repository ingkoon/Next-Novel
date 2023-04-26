package com.a509.service_novel.jpa.novel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NovelRepogitory extends JpaRepository<Novel, Integer> {
}
