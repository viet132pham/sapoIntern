package com.example.be.service.Impl;

import com.example.be.entity.Course;
import com.example.be.repository.BaseRepository;
import com.example.be.repository.CourseRepository;
import com.example.be.service.CourseService;
import com.example.be.util.Utils;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class CourseServiceImpl extends BaseServiceImpl<Course> implements CourseService {
    @Autowired
    private CourseRepository courseRepository;
    public CourseServiceImpl(BaseRepository<Course, Long> baseRepo, Utils utils) {
        super(baseRepo, utils);
    }

    public Course findCourseById(long id){
        return courseRepository.findCourseById(id);
    };
}
