package com.example.be.entity.compositekey;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentVoucherComposite implements Serializable {

    @Column(name = "employee_id")
    Long employeeId;

    @Column(name = "voucher_id")
    Long voucherId;

    // standard constructors, getters, and setters
    // hashcode and equals implementation
}
