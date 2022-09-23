package com.example.be.controller;

import com.example.be.dto.StudentGradeDTOArray;
import com.example.be.entity.Course;
import com.example.be.service.BaseService;
import com.example.be.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/course")
public class CourseController extends BaseController<Course>{
    public CourseController(BaseService<Course> baseService) {
        super(baseService);
    }

    @Autowired
    private CourseService courseService;

    //get
    @GetMapping("/find/{id}")
    public Course getCourseById(@PathVariable(value = "id") long id) throws Exception {
        return courseService.findCourseById(id);
    }
}
