package com.example.be.service.Impl;

import com.example.be.entity.Class;

import com.example.be.entity.Course;
import com.example.be.entity.Department;
import com.example.be.entity.Timeslot;
import com.example.be.repository.*;
import com.example.be.request.ClassRequest;

import com.example.be.service.ClassService;
import com.example.be.util.Utils;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.List;

import java.util.Collections;
import java.util.List;

@Service
@Log4j2
public class ClassServiceImpl extends BaseServiceImpl<Class> implements ClassService {
    public ClassServiceImpl(BaseRepository<Class, Long> baseRepo, Utils utils) {
        super(baseRepo, utils);
    }

    @Autowired
    private ClassRepository classRepository;
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private TimeslotRepository timeslotRepository;
    @Autowired
    private ModelMapper mapper;

    //post request
    public Class createRequest(ClassRequest classRequest, BindingResult bindingResult){
        Class classes = new Class();
        mapper.map(classRequest, classes);
        classes.setDepartment(departmentRepository.findDepartmentById(classRequest.getDepartmentId()));
        classes.setCourse(courseRepository.findCourseById(classRequest.getCourseId()));
        for(int i = 0; i < classRequest.getTimeslotId().length ; i++){
            classes.getTimeslots().add(timeslotRepository.findTimeslotById(classRequest.getTimeslotId()[i]));
        }
        return classRepository.save(classes);
    }
    //put request
    @Autowired
    private Utils utils;
    public Class updateRequest(long id, ClassRequest classRequest, BindingResult bindingResult){
        Class c = classRepository.findClassById(id);
        Course course = courseRepository.findById(classRequest.getCourseId()).orElseThrow(() -> new IllegalArgumentException(("id not found course: ")));
        Department department = departmentRepository.findById(classRequest.getDepartmentId()).orElseThrow(() -> new IllegalArgumentException(("id not found department: ")));
        BindingResult result = utils.getListResult(bindingResult,classRequest);
        if (result.hasErrors()) {
            throw utils.invalidInputException(result);
        } else {
            System.out.println(c.getCode());
            System.out.println(classRequest.getCode());
            if(classRequest.getStatus()!=null){
                c.setStatus(classRequest.getStatus());}
            if(classRequest.getStartDate()!=null){
                c.setStartDate(classRequest.getStartDate());}
            if(classRequest.getEndDate()!=null){
                c.setEndDate(classRequest.getEndDate());}
            if(classRequest.getRoom()!=null){
                c.setRoom(classRequest.getRoom());}
            if(classRequest.getCode()!=null){
                System.out.println("check");
                c.setCode(classRequest.getCode());}
            if(classRequest.getName()!=null){
                c.setName(classRequest.getName());}
            if(Long.valueOf(classRequest.getProgress()) != null);{
                c.setProgress(classRequest.getProgress());}

            c.setDepartment(department);

            c.setCourse(course);

            for(int i = 0; i < classRequest.getTimeslotId().length ; i++){
                c.getTimeslots().add(timeslotRepository.findTimeslotById(classRequest.getTimeslotId()[i]));
            }
            return classRepository.save(c);
        }
    }
    public List<Class> findClassByDepartmentId(long id){
        Department department = new Department();
        department = departmentRepository.findDepartmentById(id);
        return classRepository.findClassByDepartment(department);
    }
    //
    public List<Class> findClassByCourseId(long id){
        Course course = new Course();
        course = courseRepository.findCourseById(id);
        return classRepository.findClassByCourse(course);
    }

}
