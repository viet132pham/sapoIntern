package com.example.be.repository;

import com.example.be.entity.mapped.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long>{
    @Modifying
    @Query(value = "select * from submission", nativeQuery = true)
    void addNewSubmission();

    @Modifying
    @Query(value = "select * from submission where document_id=:id", nativeQuery = true)
    List<Submission> findSubmissionDTOByDocumentId(Long id);
}
