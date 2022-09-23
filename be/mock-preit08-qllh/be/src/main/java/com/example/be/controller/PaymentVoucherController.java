package com.example.be.controller;

import com.example.be.dto.PaymentVoucherDTO;

import com.example.be.dto.TeacherClassDTO;
import com.example.be.entity.mapped.PaymentVoucher;
import com.example.be.entity.mapped.ReceiptVoucher;
import com.example.be.request.PaymentVoucherRequest;
import com.example.be.request.ReceiptVoucherRequest;
import com.example.be.service.PaymentVoucherService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@CrossOrigin()
@RequestMapping("/api/voucher/payment")
public class PaymentVoucherController {
    @Autowired
    private PaymentVoucherService paymentVoucherService;
    @GetMapping("/get")

    public List<PaymentVoucherDTO> findAllPaymentVoucherDTO() {
        return paymentVoucherService.findAllPaymentVoucherDTO();
    }

    //post request
    @PostMapping("/post")
    public PaymentVoucher postRequest(@RequestBody @Valid PaymentVoucherRequest paymentVoucherRequest, BindingResult bindingResult) {
        return paymentVoucherService.createRequest(paymentVoucherRequest, bindingResult);
    }
    @GetMapping("/voucherId/{id}")
    public PaymentVoucherDTO list2(@PathVariable(value = "id") long id) {
        return paymentVoucherService.findPaymentVoucherDTOByVoucherId(id);
    }

    @PutMapping("/put")
    public PaymentVoucher putRequest(@RequestBody @Valid PaymentVoucherRequest paymentVoucherRequest, BindingResult bindingResult) {
        return paymentVoucherService.updateRequest(paymentVoucherRequest, bindingResult);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable(value = "id") long id) {
        paymentVoucherService.delete(id);
    }
    @GetMapping("/employeeId/{id}")
    public List<PaymentVoucherDTO> findPaymentVoucherDTOByEmployeeId(@PathVariable(value = "id") long id){
        return paymentVoucherService.findPaymentVoucherDTOByEmployeeId(id);
    }
    @GetMapping("/employeeId/{id}/{start}/to/{end}")
    public List<PaymentVoucherDTO> findPaymentVoucherInPeriodByEmployeeId(@PathVariable(value = "id") long id, @PathVariable(value = "start") String start, @PathVariable(value = "end") String end){
        return paymentVoucherService.findPaymentVoucherInPeriodByEmployeeId( id,  start,  end);
    }
}