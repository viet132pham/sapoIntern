package com.example.be.service.Impl;

import com.example.be.entity.Role;
import com.example.be.repository.BaseRepository;
import com.example.be.repository.RoleRepository;
import com.example.be.service.RoleService;
import com.example.be.util.Utils;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Log4j2
public class RoleServiceImpl extends BaseServiceImpl<Role> implements RoleService {
    public RoleServiceImpl(BaseRepository<Role, Long> baseRepo, Utils utils){
        super(baseRepo, utils);
    }

    @Autowired
    private RoleRepository roleRepository;

    public Role findRoleByCode(String code){
        Role role = roleRepository.findRoleByRoleCode(code);
        return role;
    }
}

