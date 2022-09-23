package com.example.be.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DocumentRequest {
    private String url;
    private String type;
    private String name;
    private String instruction;
    private Date deadline;
    private long classId;
}
