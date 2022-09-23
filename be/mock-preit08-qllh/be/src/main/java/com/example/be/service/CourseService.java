package com.example.be.service;

import com.example.be.entity.Course;

public interface CourseService extends BaseService<Course>{
    Course findCourseById(long id);
}
