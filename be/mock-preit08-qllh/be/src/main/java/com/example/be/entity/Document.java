package com.example.be.entity;

import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "document")
@Getter
@Setter
public class Document extends BaseEntity{
    @NotNull
    private String url;
    @NotNull
    private String type;
    private String name;
    private String instruction;

    private Date deadline;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @JoinColumn(name = "class_id")
    private Class classes;
}
