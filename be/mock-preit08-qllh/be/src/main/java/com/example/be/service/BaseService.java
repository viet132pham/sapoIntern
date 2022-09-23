package com.example.be.service;

import java.util.List;

import com.example.be.entity.BaseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.validation.BindingResult;

public interface BaseService<T extends BaseEntity>  {

    Page<T> findAll(Pageable pageable);

    List<T> findAll();

    T create(T t, BindingResult bindingResult);

    T findById(long id);

    T update(long id,T t, BindingResult bindingResult);

    void delete(long id);

}
