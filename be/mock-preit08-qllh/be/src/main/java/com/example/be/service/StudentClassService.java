package com.example.be.service;

import com.example.be.dto.StudentClassDTO;
import com.example.be.dto.UserDTO;
import com.example.be.entity.mapped.StudentClass;
import com.example.be.entity.mapped.StudentClass;
import com.example.be.request.StudentClassRequest;
import org.springframework.validation.BindingResult;

import java.util.List;


public interface StudentClassService {

    List<StudentClassDTO> findAllStudentClassDTO() ;
    List<StudentClassDTO> findStudentClassDTOByStudentId(Long id);

    List<StudentClassDTO> findStudentClassDTOByClassId(Long id);
    StudentClassDTO findStudentClassDTOByStudentIdAndClassId(Long sid, Long cid);
    
    StudentClass createRequest(StudentClassRequest submissionRequest, BindingResult bindingResult);

    //put diem
    StudentClass updateStudentClassRequest(long sid, long cid, StudentClassRequest studentClassRequest, BindingResult bindingResult);

    StudentClass adminUpdateStudentClassRequest(long sid, long cid, StudentClassRequest studentClassRequest, BindingResult bindingResult);
}
