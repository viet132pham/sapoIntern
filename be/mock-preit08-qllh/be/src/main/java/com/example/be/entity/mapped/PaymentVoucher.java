package com.example.be.entity.mapped;

import com.example.be.entity.*;

import com.example.be.entity.Class;
import com.example.be.entity.compositekey.PaymentVoucherComposite;
import com.example.be.entity.compositekey.StudentClassComposite;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Entity
public class PaymentVoucher {

    @EmbeddedId
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private PaymentVoucherComposite id ;

    @ManyToOne
    @MapsId("employeeId")
    @JoinColumn(name = "employee_id")
    private User employee;

    @ManyToOne
    @MapsId("voucherId")
    @JoinColumn(name = "voucher_id")
    private Voucher voucher;

    @NotNull
    private String studentName;

    @NotNull
    private String studentPhone;

    @NotNull
    private String studentEmail;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @Cascade(value= {org.hibernate.annotations.CascadeType.SAVE_UPDATE, org.hibernate.annotations.CascadeType.DELETE})
    @JoinColumn(name = "course_id")
    private Course course;
}


