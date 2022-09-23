package com.example.be.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClassRequest {
    private String code;
    private String name;
    private String room;
    private String status;
    private Date startDate;
    private Date endDate;
    private long progress;
    private long[] timeslotId;
    private long courseId;
    private long departmentId;
}
