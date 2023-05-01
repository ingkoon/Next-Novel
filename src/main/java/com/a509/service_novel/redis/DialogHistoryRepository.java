package com.a509.service_novel.redis;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.a509.service_novel.dto.testdto;

@Repository
public interface DialogHistoryRepository extends CrudRepository<DialogHistory,Integer> {
}
