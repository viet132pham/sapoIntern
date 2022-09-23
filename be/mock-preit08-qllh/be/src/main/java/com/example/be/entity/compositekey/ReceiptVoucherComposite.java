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
public class ReceiptVoucherComposite implements Serializable {
    @Column(name = "admin_id")
    Long adminId;

    @Column(name = "voucher_id")
    Long voucherId;
}
