package com.example.be.entity;

import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "class")
@Setter
@Getter
public class Class extends BaseEntity{
    @NotNull
    private String code;
    @NotNull
    private String name;
    @NotNull
    private String room;
    @NotNull
    private String status;
    @NotNull
    private Date startDate;
    @NotNull
    private Date endDate;
    @NotNull
    private long progress;

    @ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @JoinTable(name = "class_timeslot", joinColumns = {@JoinColumn(name = "class_id")},
            inverseJoinColumns = {@JoinColumn(name = "timeslot_id")})
    private Set<Timeslot> timeslots = new HashSet<>();

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @JoinTable(name = "class_course", joinColumns = {@JoinColumn(name = "class_id")},
            inverseJoinColumns = {@JoinColumn(name = "course_id")})
    private Course course;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @JoinTable(name = "class_department", joinColumns = {@JoinColumn(name = "class_id")},
            inverseJoinColumns = {@JoinColumn(name = "department_id")})
    private Department department;
}
