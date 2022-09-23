package com.example.be.repository;

import com.example.be.entity.mapped.TeacherClass;
import com.example.be.entity.mapped.TeacherClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherClassRepository extends JpaRepository<TeacherClass, Long>{
    @Modifying
    @Query(value = "select * from teacher_class where teacher_id=:id", nativeQuery = true)
    List<TeacherClass> findTeacherClassDTOByTeacherId(long id);


    @Query(value = "select * from teacher_class where class_id=:id", nativeQuery = true)
    TeacherClass findTeacherClassDTOByClassId(long id);
}
