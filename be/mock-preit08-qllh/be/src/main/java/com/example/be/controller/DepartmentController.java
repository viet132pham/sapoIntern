package com.example.be.controller;

import com.example.be.entity.Department;
import com.example.be.service.BaseService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/department")
public class DepartmentController extends BaseController<Department> {
    public DepartmentController(BaseService<Department> baseService) {
        super(baseService);
    }
}
