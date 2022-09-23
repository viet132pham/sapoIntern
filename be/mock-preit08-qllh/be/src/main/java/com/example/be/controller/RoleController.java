package com.example.be.controller;

import com.example.be.entity.Role;
import com.example.be.service.BaseService;

import com.example.be.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/user/role")
public class RoleController extends BaseController<Role> {

    public RoleController(BaseService<Role> baseService) {
        super(baseService);
    }

    @Autowired
    private RoleService roleService;

    @GetMapping("/get")
    public Role findList(@RequestParam String code){
        return roleService.findRoleByCode(code);
    }
}
