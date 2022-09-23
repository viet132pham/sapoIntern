package com.example.be.repository;

import com.example.be.entity.Voucher;
import com.example.be.entity.mapped.PaymentVoucher;
import com.example.be.entity.mapped.ReceiptVoucher;
import com.example.be.entity.mapped.TeacherClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentVoucherRepository extends JpaRepository<PaymentVoucher, Long>{
    List<PaymentVoucher> findByVoucherId(Voucher voucher);

//    @Modifying
//    @Query(value = "select * from payment_voucher where voucher_id=:id", nativeQuery = true)
//    public PaymentVoucher findPaymentVoucherDTOByVoucherId(long id);



    public PaymentVoucher findPaymentVoucherDTOByVoucherId(long id);

    void deletePaymentVoucherDTOByVoucherId(long id);

    List<PaymentVoucher> findPaymentVoucherDTOByEmployeeId(long id);

    @Query(value = "select * from payment_voucher where employee_id =:id and voucher_id in (select id from voucher where created_at between :start and :end)", nativeQuery = true)
    List<PaymentVoucher> findPaymentVoucherInPeriodByEmployeeId(long id, String start, String end);


}
