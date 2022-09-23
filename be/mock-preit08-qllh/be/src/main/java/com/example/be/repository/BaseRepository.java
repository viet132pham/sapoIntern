package com.example.be.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;
@NoRepositoryBean
public interface BaseRepository<T, Id extends Serializable> extends JpaRepository<T, Id> {

}
