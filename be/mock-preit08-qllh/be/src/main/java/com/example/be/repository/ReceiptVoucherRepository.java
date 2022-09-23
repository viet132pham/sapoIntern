package com.example.be.repository;

import com.example.be.entity.mapped.PaymentVoucher;
import com.example.be.entity.mapped.ReceiptVoucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReceiptVoucherRepository extends JpaRepository<ReceiptVoucher, Long>{
    public ReceiptVoucher findReceiptVoucherDTOByVoucherId(long id);

}
