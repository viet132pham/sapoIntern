package com.example.be.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "permission")
@Getter
@Setter
public class Permission extends BaseEntity {
    @NotNull
    private String permissionName;
    @NotNull
    private String permissionCode;

}

