package com.example.be.service;

import com.example.be.dto.PaymentVoucherDTO;
import com.example.be.dto.PaymentVoucherDTO;
import com.example.be.dto.ReceiptVoucherDTO;
import com.example.be.dto.SubmissionDTO;
import com.example.be.entity.mapped.PaymentVoucher;
import com.example.be.entity.mapped.PaymentVoucher;
import com.example.be.entity.mapped.ReceiptVoucher;
import com.example.be.request.PaymentVoucherRequest;
import com.example.be.request.ReceiptVoucherRequest;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface PaymentVoucherService{
    List<PaymentVoucherDTO> findAllPaymentVoucherDTO() ;

    PaymentVoucherDTO findPaymentVoucherDTOByVoucherId(long id) ;
    void delete(long id);

    PaymentVoucher createRequest(PaymentVoucherRequest paymentVoucherRequest, BindingResult bindingResult);

    PaymentVoucher updateRequest(PaymentVoucherRequest paymentVoucherRequest, BindingResult bindingResult);

    List<PaymentVoucherDTO> findPaymentVoucherDTOByEmployeeId(long id);

    List<PaymentVoucherDTO> findPaymentVoucherInPeriodByEmployeeId(long id, String start, String end);
}
