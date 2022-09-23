package com.example.be.service;

import com.example.be.dto.PaymentVoucherDTO;
import com.example.be.dto.ReceiptVoucherDTO;
import com.example.be.dto.ReceiptVoucherDTO;
import com.example.be.entity.mapped.ReceiptVoucher;
import com.example.be.entity.mapped.ReceiptVoucher;
import com.example.be.request.ReceiptVoucherRequest;
import org.springframework.validation.BindingResult;

import java.util.List;


public interface ReceiptVoucherService{
    List<ReceiptVoucherDTO> findAllReceiptVoucherDTO() ;

    ReceiptVoucher createRequest(ReceiptVoucherRequest receiptVoucherRequest, BindingResult bindingResult);

    ReceiptVoucherDTO findReceiptVoucherDTOByVoucherId(long id) ;

    ReceiptVoucher updateRequest(ReceiptVoucherRequest receiptVoucherRequest, BindingResult bindingResult);


    void delete(long id);

}
