package com.example.be.controller;

import com.example.be.dto.StudentGradeDTO;
import com.example.be.dto.StudentGradeDTOArray;
import com.example.be.dto.UserDTO;
import com.example.be.entity.Class;
import com.example.be.entity.User;
import com.example.be.entity.mapped.StudentGrade;
import com.example.be.request.StudentGradeRequest;
import com.example.be.service.StudentGradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/student_grade")
public class StudentGradeController {
    @Autowired
    private StudentGradeService studentGradeService;
    //get
    @GetMapping("/studentId/{sid}/classId/{cid}")
    public List<StudentGradeDTO> getStudentGrades(@PathVariable(value = "sid") long sid, @PathVariable(value = "cid") long cid ) {
        return studentGradeService.findStudentGradeDTOByStudentIdAndClassId(sid, cid);
    }

    //get
    @GetMapping("/get/{cid}")
    public List<StudentGradeDTOArray> getPoint(@PathVariable(value = "cid") long cid) throws Exception {
        return studentGradeService.findPoint(cid);
    }
    @GetMapping("/get/{cid}/studentId/{sid}")
    public List<StudentGradeDTOArray> getPointStudent(@PathVariable(value = "cid") long cid, @PathVariable(value = "sid") long sid) throws Exception {
        return studentGradeService.findPointStudent(cid, sid);
    }
    //put
    @PutMapping("/classId/{cid}/studentId/{sid}")
    public void updateStudentGrade(@PathVariable(value = "cid") long cid, @PathVariable(value = "sid") long sid, @RequestBody @Valid StudentGradeRequest studentGradeRequest, BindingResult bindingResult) throws Exception {
        studentGradeService.updateStudentGrade(cid, sid, studentGradeRequest);
    }


}
