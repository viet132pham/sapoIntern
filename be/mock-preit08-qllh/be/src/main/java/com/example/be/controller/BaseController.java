package com.example.be.controller;

import com.example.be.entity.BaseEntity;
import com.example.be.service.BaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
public abstract class BaseController<T extends BaseEntity>{

    private final BaseService<T> baseService;

    @GetMapping
    public Page<T> getPagination(@RequestParam(value = "pageNumber",required = true) int pageNumber,
                                 @RequestParam(value = "pageSize",required = true) int pageSize,
                                 @RequestParam(value = "sortBy",required = false) String sortBy,
                                 @RequestParam(value = "sortDir",required = false) String sortDir){
        if (sortDir!= null){
            Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
            return baseService.findAll(PageRequest.of(pageNumber-1,pageSize,sort));
        }
        return baseService.findAll(PageRequest.of(pageNumber-1,pageSize));
    }


    @GetMapping("/")
    public List<T> list() {
        return baseService.findAll();
    }

    @GetMapping("/{id}")
    public T findById(@PathVariable("id") int id)  {
        return  baseService.findById(id);
    }

    @PostMapping("/")
    public T create(@RequestBody @Valid T request, BindingResult bindingResult) {
        return baseService.create(request, bindingResult);
    }

    //ko phai base
    @PutMapping("/{id}")
    public T update(@PathVariable(value = "id") long id, @RequestBody @Valid T entity,BindingResult bindingResult) {
        return baseService.update(id, entity,bindingResult);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable(value = "id") long id) {
        baseService.delete(id);
    }

}

