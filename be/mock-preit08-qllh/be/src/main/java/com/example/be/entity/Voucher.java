package com.example.be.entity;

import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "voucher")
@Getter
@Setter
public class Voucher extends BaseEntity{
    @NotNull
    private long amount;
    @NotNull
    private String status;
    @NotNull
    private String type;
    @NotNull
    private String description;


//    @ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
//    @JoinTable(name = "payment_voucher", joinColumns = {@JoinColumn(name = "voucher_id")},
//            inverseJoinColumns = {@JoinColumn(name = "employee_id"),
//                    @JoinColumn(name="student_phone"),
//                    @JoinColumn(name="student_email"),
//                    @JoinColumn(name="class_id")})
//    private Set<User> employees = new HashSet<>();

//    @ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
//    @JoinTable(name = "receipt_voucher", joinColumns = {@JoinColumn(name = "voucher_id")},
//            inverseJoinColumns = {@JoinColumn(name = "admin_id"),
//                    @JoinColumn(name="department_id")})
//    private Set<User> admins = new HashSet<>();

}
