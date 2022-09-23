package com.example.be.repository;

import com.example.be.entity.Role;

import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends BaseRepository<Role, Long>{

    Role findRoleByRoleCode(String code);
}
