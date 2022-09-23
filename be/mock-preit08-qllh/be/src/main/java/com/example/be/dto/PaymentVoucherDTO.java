package com.example.be.dto;

import com.example.be.entity.Class;
import com.example.be.entity.Course;
import com.example.be.entity.Voucher;
import com.example.be.entity.compositekey.PaymentVoucherComposite;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Service
public class PaymentVoucherDTO {
    private PaymentVoucherComposite id ;
    private Voucher voucher;
    private String studentName;
    private String studentPhone;
    private String studentEmail;
    private UserDTO employee;
    private Course course;
}
