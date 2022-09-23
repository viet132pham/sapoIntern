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
public class UserRequest {
    private String username;

    private String password;

    private Date dob;

    private String fullName;

    private String phone;

    private String email;

    private String address;

    private String status;

    private ArrayList<String> roleCode;
}
