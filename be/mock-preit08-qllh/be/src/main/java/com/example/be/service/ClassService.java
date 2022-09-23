package com.example.be.service;

import com.example.be.entity.Class;

import com.example.be.request.ClassRequest;

import org.springframework.validation.BindingResult;

import java.util.List;

public interface ClassService extends BaseService<Class> {
    Class createRequest(ClassRequest classRequest, BindingResult bindingResult);

    Class updateRequest(long id,ClassRequest classRequest, BindingResult bindingResult);

    //
    List<Class> findClassByDepartmentId(long id);
    //
    List<Class> findClassByCourseId(long id);
}
