package com.example.be.controller;
import com.example.be.dto.StudentClassDTO;

import com.example.be.entity.mapped.StudentClass;
import com.example.be.request.StudentClassRequest;

import com.example.be.service.StudentClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/student_class")
public class StudentClassController {
    @Autowired
    private StudentClassService studentClassService;
    @GetMapping("/get")
    public List<StudentClassDTO> findAllStudentClassDTO() {
        return studentClassService.findAllStudentClassDTO();
    }
    @GetMapping("/studentId/{id}")
    public List<StudentClassDTO> list1(@PathVariable(value = "id") Long id) {
        return studentClassService.findStudentClassDTOByStudentId(id);
    }
    @GetMapping("/classId/{id}")
    public List<StudentClassDTO> list2(@PathVariable(value = "id") Long id) {
        return studentClassService.findStudentClassDTOByClassId(id);
    }
    @GetMapping("/studentId/{sid}/classId/{cid}")
    public StudentClassDTO getStudentClass(@PathVariable(value = "sid") Long sid, @PathVariable(value = "cid") Long cid ) {
        return studentClassService.findStudentClassDTOByStudentIdAndClassId(sid, cid);
    }

    //post request
    @PostMapping("/post")
    public StudentClass postRequest(@RequestBody @Valid StudentClassRequest submissionRequest, BindingResult bindingResult) {
        return studentClassService.createRequest(submissionRequest, bindingResult);
    }

    // put diem request
    @PutMapping("/studentId/{sid}/classId/{cid}")
    public StudentClass updateStudentClassRequest(@PathVariable(value = "sid") long sid, @PathVariable(value = "cid") long cid, @RequestBody @Valid StudentClassRequest studentClassRequest, BindingResult bindingResult) {
        return studentClassService.updateStudentClassRequest(sid, cid, studentClassRequest, bindingResult);
    }

    @PutMapping("admin/studentId/{sid}/classId/{cid}")
    public StudentClass adminUpdateStudentClassRequest(@PathVariable(value = "sid") long sid, @PathVariable(value = "cid") long cid, @RequestBody @Valid StudentClassRequest studentClassRequest, BindingResult bindingResult) {
        return studentClassService.adminUpdateStudentClassRequest(sid, cid, studentClassRequest, bindingResult);
    }
}