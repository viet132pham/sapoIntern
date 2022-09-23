package com.example.be.entity;

import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "course")
@Getter
@Setter
public class Course extends BaseEntity{
    @NotNull
    private String name;
    @NotNull
    private Long amount;
    @NotNull
    private int numberSession;
    @NotNull
    private int numberGrade;

    private String image;
}

