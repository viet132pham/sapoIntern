package com.example.be.repository;

import com.example.be.dto.StudentGradeDTOArray;
import com.example.be.dto.UserDTO;
import com.example.be.entity.Class;
import com.example.be.entity.User;
import com.example.be.entity.mapped.StudentGrade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public interface StudentGradeRepository extends JpaRepository<StudentGrade, Long>{
    @Modifying
    @Query(value = "select * from student_grade where student_id=:sid and class_id=:cid", nativeQuery = true)
    List<StudentGrade> findStudentGradeDTOByStudentIdAndClassId(long sid, long cid);

//    @Modifying
    @Query(value = "select * from student_grade where student_id=:sid and class_id=:cid and grade_id=:gid", nativeQuery = true)
    StudentGrade findStudentGradeDTOByStudentIdAndClassIdAndGradeId(long sid, long cid, long gid);

//    StudentGrade findStudentGradeDTOByStudentIdAndClassIdAndGradeId(long sid, long cid, long gid);
    @Modifying
    @Query(value = "select * from student_grade where class_id=:id", nativeQuery = true)
    List<StudentGrade> findStudentGradeDTOByClassId(long id);

//    @Modifying
//    @Query(value = "select sc.student_id, sc.class_id, group_concat(sg.grade_point) as point, group_concat(sg.grade_id) as grade_id " +
//            "from student_class sc left join student_grade sg on sc.student_id = sg.student_id and sc.class_id = sg.class_id group by sc.student_id", nativeQuery = true)
//    List<StudentGradeDTOArray> findPoint();



}
