package com.example.be.dto;

import com.example.be.entity.Role;
import com.example.be.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Service
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String phone;
    private ArrayList<String> roles;
    private String fullName;
    private String status;
    private String address;
    private Date dob;
}
