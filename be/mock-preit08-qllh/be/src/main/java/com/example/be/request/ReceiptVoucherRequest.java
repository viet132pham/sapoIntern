package com.example.be.request;

import com.example.be.entity.compositekey.ReceiptVoucherComposite;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReceiptVoucherRequest {
    private ReceiptVoucherComposite id ;
    private long voucherId;
    private long departmentId;
    private long adminId;

    private long amount;
    private String status;
    private String type;
    private String description;


}
