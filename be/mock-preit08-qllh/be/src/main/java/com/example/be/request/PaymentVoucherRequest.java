package com.example.be.request;

import com.example.be.entity.compositekey.PaymentVoucherComposite;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentVoucherRequest {
    private PaymentVoucherComposite id ;
    private long voucherId;
    private String studentName;
    private String studentPhone;
    private String studentEmail;
    private long employeeId;
    private long courseId ;

    private Long amount;
    private String status;
    private String type;
    private String description;
}
