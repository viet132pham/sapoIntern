package com.example.be.controller;

import com.example.be.entity.Voucher;
import com.example.be.service.BaseService;
import com.example.be.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/voucher")
public class VoucherController extends BaseController<Voucher> {
    public VoucherController(BaseService<Voucher> baseService) {
        super(baseService);
    }

    @Autowired
    VoucherService voucherService;

    @GetMapping("/{start}/to/{end}")
    public List<Voucher> findVoucherInPeriod(@PathVariable(value = "start") String start, @PathVariable(value = "end") String end ){
        return voucherService.findVoucherInPeriod(start, end);
    }
}