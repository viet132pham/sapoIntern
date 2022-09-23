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
public class GuestRequest {
    private String fullName;

    private Date dob;

    private String phone;

    private String email;

    private String address;

    private long employeeId;
}
