package com.example.be.repository;

import com.example.be.entity.Class;
import com.example.be.entity.Course;
import com.example.be.entity.Department;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassRepository extends BaseRepository<Class, Long> {
    Class findClassById(long id);

    List<Class> findClassByDepartment (Department department) ;

    List<Class> findClassByCourse (Course course) ;
}
