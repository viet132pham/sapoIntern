package com.example.be.controller;

import com.example.be.entity.Permission;
import com.example.be.service.BaseService;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/user/permission")
public class PermissionController extends BaseController<Permission> {

    public PermissionController(BaseService<Permission> baseService) {
        super(baseService);
    }


}
