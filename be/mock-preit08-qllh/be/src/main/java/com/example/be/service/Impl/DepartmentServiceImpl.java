package com.example.be.service.Impl;

import com.example.be.entity.Department;
import com.example.be.repository.BaseRepository;
import com.example.be.service.DepartmentService;
import com.example.be.util.Utils;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class DepartmentServiceImpl extends BaseServiceImpl<Department> implements DepartmentService {
    public DepartmentServiceImpl(BaseRepository<Department, Long> baseRepo, Utils utils) {
        super(baseRepo, utils);
    }
}
