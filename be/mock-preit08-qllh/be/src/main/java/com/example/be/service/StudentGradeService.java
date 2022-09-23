package com.example.be.service;

import com.example.be.dto.StudentGradeDTO;
import com.example.be.dto.StudentGradeDTOArray;
import com.example.be.entity.mapped.StudentGrade;
import com.example.be.request.StudentGradeRequest;

import java.util.List;

public interface StudentGradeService {
    List<StudentGradeDTO> findStudentGradeDTOByStudentIdAndClassId(long sid, long cid);

    List<StudentGradeDTOArray> findPoint(long cid);

    List<StudentGradeDTOArray> findPointStudent(long cid, long sid);

    void updateStudentGrade(long cid, long sid, StudentGradeRequest studentGradeRequest);
}
