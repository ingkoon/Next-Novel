package com.a509.service_novel.redis;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DialogHistoryRepository extends CrudRepository<DialogHistory,Long> {
}
