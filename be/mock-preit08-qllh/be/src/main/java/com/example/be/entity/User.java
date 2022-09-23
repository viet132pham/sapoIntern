package com.example.be.entity;

import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User extends BaseEntity {
    @NotNull
    private String username;
    @NotNull
    private String password;

    private Date dob;

    private String fullName;

    private String phone;

    private String email;

    private String address;

    private String status;

    @ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @JoinTable(name = "user_role", joinColumns = {@JoinColumn(name = "user_id")}, inverseJoinColumns = {@JoinColumn(name = "role_id")})
    private Set<Role> roles = new HashSet<>();

    //    @ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
//    @JoinTable(name = "teacher_class", joinColumns = {@JoinColumn(name = "teacher_id")},
//            inverseJoinColumns = {@JoinColumn(name = "class_id"),
//                    @JoinColumn(name="status")})
//    private Set<Class> teacherClasses = new HashSet<>();
//
//    @ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
//    @JoinTable(name = "student_class", joinColumns = {@JoinColumn(name = "student_id")},
//            inverseJoinColumns = {@JoinColumn(name = "class_id"),
//                    @JoinColumn(name="status"),
//                    @JoinColumn(name="progress_grade"),
//                    @JoinColumn(name="test1_grade"),
//                    @JoinColumn(name="test2_grade"),
//                    @JoinColumn(name="test3_grade")})
//    private Set<Class> submissiones = new HashSet<>();
//
//    @ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
//    @JoinTable(name = "submission", joinColumns = {@JoinColumn(name = "student_id")},
//            inverseJoinColumns = {@JoinColumn(name = "document_id"),
//                    @JoinColumn(name="url")})
//    private Set<Document> submissions = new HashSet<>();
}
