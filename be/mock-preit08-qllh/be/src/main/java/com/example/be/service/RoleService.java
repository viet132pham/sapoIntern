package com.example.be.service;

import com.example.be.entity.Role;
import org.springframework.validation.BindingResult;

public interface RoleService extends BaseService<Role> {

    Role findRoleByCode(String code);

}
