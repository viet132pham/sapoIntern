package com.example.be.service;

import com.example.be.dto.StudentClassDTO;
import com.example.be.dto.TeacherClassDTO;
import com.example.be.entity.mapped.TeacherClass;
import com.example.be.request.TeacherClassRequest;
import org.springframework.validation.BindingResult;

import java.util.List;


public interface TeacherClassService{
    TeacherClass createRequest(TeacherClassRequest teacherClassRequest, BindingResult bindingResult);

    List<TeacherClassDTO> findAllTeacherClassDTO() ;
    List<TeacherClassDTO> findTeacherClassDTOByTeacherId(Long id);
    TeacherClassDTO findTeacherClassDTOByClassId(Long id);
}
