package com.example.be.entity.mapped;

import com.example.be.entity.BaseEntity;
import com.example.be.entity.Department;
import com.example.be.entity.User;
import com.example.be.entity.Voucher;
import com.example.be.entity.compositekey.PaymentVoucherComposite;
import com.example.be.entity.compositekey.ReceiptVoucherComposite;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
@Getter
@Setter
@Entity
public class ReceiptVoucher {
    @EmbeddedId
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private ReceiptVoucherComposite id ;

    @ManyToOne
    @MapsId("adminId")
    @JoinColumn(name = "admin_id")
    private User admin;

    @ManyToOne
    @MapsId("voucherId")
    @JoinColumn(name = "voucher_id")
    private Voucher voucher;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id")
    private Department department;
}
