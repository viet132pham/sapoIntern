package com.example.be.controller;
import com.example.be.dto.TeacherClassDTO;
import com.example.be.dto.TeacherClassDTO;
import com.example.be.entity.User;
import com.example.be.entity.mapped.TeacherClass;
import com.example.be.request.TeacherClassRequest;
import com.example.be.request.UserRequest;
import com.example.be.service.BaseService;
import com.example.be.service.TeacherClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@CrossOrigin()
@RequestMapping("/api/teacherClass")
public class TeacherClassController {
    @Autowired
    private TeacherClassService teacherClassService;
    @GetMapping("/get")
    public List<TeacherClassDTO> findAllTeacherClassDTO() {
        return teacherClassService.findAllTeacherClassDTO();
    }

    @GetMapping("/teacherId/{id}")
    public List<TeacherClassDTO> list1(@PathVariable(value = "id") Long id) {
        return teacherClassService.findTeacherClassDTOByTeacherId(id);
    }

    @GetMapping("/classId/{id}")
    public TeacherClassDTO list2(@PathVariable(value = "id") Long id) {
        return teacherClassService.findTeacherClassDTOByClassId(id);
    }

    //post request
    @PostMapping("/post")
    public TeacherClass postRequest(@RequestBody @Valid TeacherClassRequest teacherClassRequest, BindingResult bindingResult) {
        return teacherClassService.createRequest(teacherClassRequest, bindingResult);
    }
}