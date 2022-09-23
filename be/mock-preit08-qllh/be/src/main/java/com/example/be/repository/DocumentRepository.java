package com.example.be.repository;

import com.example.be.entity.Document;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface DocumentRepository extends BaseRepository<Document, Long>{
    @Modifying
    @Query(value = "SELECT  * FROM document d left join student_class sc on d.class_id = sc.class_id where sc.student_id=:id", nativeQuery = true)
    List<Document> findDocumentByStudentId(long id);

    Document findDocumentById(long id);

    @Modifying
    @Query(value = "SELECT  * FROM document d left join teacher_class tc on d.class_id = tc.class_id where tc.teacher_id=:id", nativeQuery = true)
    List<Document> findDocumentByTeacherId(long id);
}
