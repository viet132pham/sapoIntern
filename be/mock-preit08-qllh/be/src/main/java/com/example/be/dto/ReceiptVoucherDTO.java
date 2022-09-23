package com.example.be.dto;

import com.example.be.entity.Department;
import com.example.be.entity.Voucher;
import com.example.be.entity.compositekey.ReceiptVoucherComposite;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Service
public class ReceiptVoucherDTO {
    private ReceiptVoucherComposite id ;
    private Voucher voucher;
    private Department department;
    private UserDTO admin;
}

