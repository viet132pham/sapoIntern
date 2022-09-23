package com.example.be.service;

import com.example.be.entity.Voucher;

import java.util.List;


public interface VoucherService extends BaseService<Voucher> {
//    Voucher update(long id, Voucher v);
    List<Voucher> findVoucherInPeriod(String start, String end);
}
