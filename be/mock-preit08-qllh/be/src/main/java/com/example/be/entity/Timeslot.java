package com.example.be.entity;

import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "timeslot")
@Getter
@Setter
public class Timeslot extends BaseEntity{
    @NotNull
    private String date;
    @NotNull
    private String time;

}
