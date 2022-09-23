package com.example.be.repository;

import com.example.be.entity.Course;
import com.example.be.entity.Department;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends BaseRepository<Course, Long>{
    Course findCourseById (long id);
    Course findCourseByName(String name);
}

