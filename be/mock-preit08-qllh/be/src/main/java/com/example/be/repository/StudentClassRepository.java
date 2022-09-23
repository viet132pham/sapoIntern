package com.example.be.repository;

import com.example.be.dto.StudentClassDTO;
import com.example.be.entity.Role;
import com.example.be.entity.User;
import com.example.be.entity.mapped.StudentClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface StudentClassRepository extends JpaRepository<StudentClass, Long> {
//    select * from student_class where student_id = 7;
    @Modifying
    @Query(value = "select * from student_class where student_id=:id", nativeQuery = true)
    List<StudentClass> findStudentClassDTOByStudentId(long id);

    @Modifying
    @Query(value = "select * from student_class where student_id=:sid and class_id=:cid", nativeQuery = true)
    List<StudentClass> findStudentClassDTOByStudentIdAndClassId(long sid, long cid);

    @Modifying
    @Query(value = "select * from student_class where class_id=:id", nativeQuery = true)
    List<StudentClass> findStudentClassDTOByClassId(long id);


    @Query(value = "select * from student_class where class_id=:cid and student_id=:sid", nativeQuery = true)
    StudentClass findStudentClassByClassIdAndStudentId(long sid, long cid);

    @Modifying
    @Transactional
    @Query(value = "delete from student_class where class_id=:cid and student_id=:sid", nativeQuery = true)
    void deleteStudentClassByClassIdAndStudentId(long sid, long cid);

}
