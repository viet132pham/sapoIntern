package com.example.be.controller;

import com.example.be.dto.PaymentVoucherDTO;
import com.example.be.dto.ReceiptVoucherDTO;
import com.example.be.dto.ReceiptVoucherDTO;
import com.example.be.entity.mapped.PaymentVoucher;
import com.example.be.entity.mapped.ReceiptVoucher;
import com.example.be.entity.mapped.ReceiptVoucher;
import com.example.be.request.ReceiptVoucherRequest;
import com.example.be.service.BaseService;
import com.example.be.service.ReceiptVoucherService;
import com.example.be.service.ReceiptVoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@CrossOrigin()
@RequestMapping("/api/voucher/receipt")
public class ReceiptVoucherController{
    @Autowired
    private ReceiptVoucherService receiptVoucherService;
    @GetMapping("/get")
    public List<ReceiptVoucherDTO> findAllReceiptVoucherDTO() {
        return receiptVoucherService.findAllReceiptVoucherDTO();
    }

    //post request
    @PostMapping("/post")
    public ReceiptVoucher postRequest(@RequestBody @Valid ReceiptVoucherRequest receiptVoucherRequest, BindingResult bindingResult) {
        return receiptVoucherService.createRequest(receiptVoucherRequest, bindingResult);
    }
    @PutMapping("/put")
    public ReceiptVoucher putRequest(@RequestBody @Valid ReceiptVoucherRequest receiptVoucherRequest, BindingResult bindingResult) {
        return receiptVoucherService.updateRequest(receiptVoucherRequest, bindingResult);
    }

    @GetMapping("/voucherId/{id}")
    public ReceiptVoucherDTO list2(@PathVariable(value = "id") long id) {
        return receiptVoucherService.findReceiptVoucherDTOByVoucherId(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable(value = "id") long id) {
        receiptVoucherService.delete(id);
    }

}