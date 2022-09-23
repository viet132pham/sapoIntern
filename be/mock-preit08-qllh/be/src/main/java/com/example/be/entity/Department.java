package com.example.be.entity;

import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "department")
@Getter
@Setter
public class Department extends BaseEntity{
    @NotNull
    private String name;
    @NotNull
    private String phone;
    @NotNull
    private String address;
}
