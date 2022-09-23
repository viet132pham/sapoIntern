package com.example.be.service.Impl;
import com.example.be.entity.Voucher;
import com.example.be.repository.BaseRepository;
import com.example.be.repository.VoucherRepository;
import com.example.be.service.VoucherService;
import com.example.be.util.Utils;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
public class VoucherServiceImpl extends BaseServiceImpl<Voucher> implements VoucherService {

    @Autowired
     VoucherRepository voucherRepository;
    public VoucherServiceImpl(BaseRepository< Voucher, Long> baseRepo, Utils utils){
        super(baseRepo, utils);
    }

//    @Override
    public Voucher update(long id, Voucher v)  {
        Voucher voucher = voucherRepository.findById((long) id).get();
        if(voucher.getId()!=null){
            voucher.setAmount(v.getAmount());
            voucher.setDescription(v.getDescription());
            voucher.setType(v.getType());
            voucher.setStatus(v.getStatus());
            return voucherRepository.save(voucher);

        }else {
//            throw new RecordNotFoundException("Not found");

        }
        return null;

    }

    @Override
    public List<Voucher> findVoucherInPeriod(String firstDay, String lastDay) {
        return voucherRepository.findVoucherInPeriod(firstDay, lastDay);
    }
}