package com.example.be.service.Impl;

import com.example.be.entity.Permission;
import com.example.be.repository.BaseRepository;
import com.example.be.service.PermissionService;
import com.example.be.util.Utils;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class PermissionServiceImpl extends BaseServiceImpl<Permission> implements PermissionService {
    public PermissionServiceImpl(BaseRepository<Permission, Long> baseRepo, Utils utils){
        super(baseRepo, utils);
    }

}
