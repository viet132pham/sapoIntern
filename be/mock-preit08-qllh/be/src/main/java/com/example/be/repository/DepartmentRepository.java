package com.example.be.repository;

import com.example.be.entity.Department;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends BaseRepository<Department, Long> {
    Department findDepartmentById (long id);


}
