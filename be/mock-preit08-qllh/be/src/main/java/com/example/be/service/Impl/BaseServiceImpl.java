package com.example.be.service.Impl;

import java.util.List;

import com.example.be.entity.BaseEntity;

import com.example.be.repository.BaseRepository;
import com.example.be.service.BaseService;

import com.example.be.util.Utils;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;

@Log4j2
@RequiredArgsConstructor
public abstract class BaseServiceImpl<T extends BaseEntity> implements BaseService<T> {

    private final BaseRepository<T, Long> baseRepo;
    private final Utils utils;

    @Override
    public Page<T> findAll(Pageable pageable) {
        return baseRepo.findAll(pageable);
    }

    @Override
    public List<T> findAll() {
        return baseRepo.findAll();
    }

    @Override
    public T create(T request, BindingResult bindingResult) {
        return baseRepo.save(request);
    }

    @Override
    public T findById(long id) {
        return baseRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("id not found: " + id));
    }

    @Override
    public T update(long id,T request, BindingResult bindingResult) {
        T t = baseRepo.findById(id).orElseThrow(() -> new IllegalArgumentException(("id not found: " + id)));
        if (t == null) {
            return null;
        } else {
            request.setCreatedAt(t.getCreatedAt());
            request.setId(t.getId());
            return baseRepo.save(request);
        }
    }


    @Override
    public void delete(long id) {
        baseRepo.findById(id).orElseThrow(() -> new IllegalArgumentException(("id not found: " + id)));
        baseRepo.deleteById(id);
    }
}

