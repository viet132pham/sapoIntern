package com.example.be.service.Impl;

import com.example.be.dto.PaymentVoucherDTO;
import com.example.be.dto.ReceiptVoucherDTO;
import com.example.be.dto.UserDTO;
import com.example.be.entity.Class;
import com.example.be.entity.Department;
import com.example.be.entity.User;
import com.example.be.entity.Voucher;
import com.example.be.entity.compositekey.ReceiptVoucherComposite;
import com.example.be.entity.mapped.PaymentVoucher;
import com.example.be.entity.mapped.ReceiptVoucher;
import com.example.be.entity.mapped.ReceiptVoucher;
import com.example.be.entity.mapped.ReceiptVoucher;
import com.example.be.repository.*;
import com.example.be.request.ReceiptVoucherRequest;
import com.example.be.service.ReceiptVoucherService;
import com.example.be.util.Utils;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.List;


@Service
@Log4j2
public class ReceiptVoucherServiceImpl implements ReceiptVoucherService {
    @Autowired
    private ReceiptVoucherRepository receiptVoucherRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    private VoucherRepository voucherRepository;
//    @Override
//    public ReceiptVoucher update( long id, ReceiptVoucher v)  {
//        ReceiptVoucher receiptVoucher = receiptVoucherRepository.findById((long) id).get();
//        if(receiptVoucher.getId()!=null){
//            receiptVoucher.setAdmin(v.getAdmin());
//            receiptVoucher.setDepartment(v.getDepartment());
//            receiptVoucher.setVoucher(v.getVoucher());
//            return receiptVoucherRepository.save(receiptVoucher);
//
//        }else {
////            throw new RecordNotFoundException("Not found");
//
//        }
//        return null;
//    }

    @Autowired
    private ModelMapper mapper;

    public List<ReceiptVoucherDTO> findAllReceiptVoucherDTO() {
        List<ReceiptVoucher> receiptVoucheres = receiptVoucherRepository.findAll();
        List<ReceiptVoucherDTO> receiptVoucherDTOS = new ArrayList<>();
        for (int i = 0; i < receiptVoucheres.size(); i++){
            ReceiptVoucherDTO receiptVoucherDTO = new ReceiptVoucherDTO();
            ReceiptVoucher receiptVoucher = receiptVoucheres.get(i);
            mapper.map(receiptVoucher, receiptVoucherDTO);

            User user = receiptVoucher.getAdmin();
            UserDTO userDTO = new UserDTO();

            mapper.map(user, userDTO);
            userDTO.getRoles().removeAll(userDTO.getRoles());
            user.getRoles().forEach(role -> {userDTO.getRoles().add(role.getRoleCode());});

            receiptVoucherDTO.setAdmin(userDTO);
            receiptVoucherDTOS.add(receiptVoucherDTO);
        }

        return receiptVoucherDTOS;
    }

    //post request
    public ReceiptVoucher createRequest(ReceiptVoucherRequest receiptVoucherRequest, BindingResult bindingResult){
        ReceiptVoucher receiptVoucher = new ReceiptVoucher();
        User a = new User();
        a = userRepository.findUserById(receiptVoucherRequest.getAdminId());
        Voucher v = new Voucher();
        mapper.map(receiptVoucherRequest, v);
        voucherRepository.save(v);

        Department d = new Department();
        d = departmentRepository.findDepartmentById(receiptVoucherRequest.getDepartmentId());

        ReceiptVoucherComposite id = new ReceiptVoucherComposite();
        receiptVoucher.setVoucher(v);
        receiptVoucher.setAdmin(a);
        receiptVoucher.setDepartment(d);
        id.setVoucherId(receiptVoucherRequest.getVoucherId());
        id.setAdminId(receiptVoucherRequest.getAdminId());
        receiptVoucherRequest.setId(id);
        mapper.map(receiptVoucherRequest, receiptVoucher);
        return receiptVoucherRepository.save(receiptVoucher);
    }

    @Override
    public ReceiptVoucherDTO findReceiptVoucherDTOByVoucherId(long id) {
        // Lấy User entity ra từ DB
        ReceiptVoucher receiptVoucher = receiptVoucherRepository.findReceiptVoucherDTOByVoucherId(id);
        ReceiptVoucherDTO receiptVoucherDTO = new ReceiptVoucherDTO();
        mapper.map(receiptVoucher, receiptVoucherDTO);
        Voucher voucher = receiptVoucher.getVoucher();
        User user = receiptVoucher.getAdmin();
        UserDTO userDTO = new UserDTO();
        mapper.map(user, userDTO);
        userDTO.getRoles().removeAll(userDTO.getRoles());
        user.getRoles().forEach(role -> {userDTO.getRoles().add(role.getRoleCode());});

        receiptVoucherDTO.setAdmin(userDTO);



        return receiptVoucherDTO;
    }

    @Override
    public ReceiptVoucher updateRequest(ReceiptVoucherRequest receiptVoucherRequest, BindingResult bindingResult) {
        ReceiptVoucher receiptVoucher = new ReceiptVoucher();
        User a = new User();
        a = userRepository.findUserById(receiptVoucherRequest.getAdminId());
        Voucher v = voucherRepository.findVoucherById(receiptVoucherRequest.getVoucherId());
        v.setAmount(receiptVoucherRequest.getAmount());
        v.setStatus(receiptVoucherRequest.getStatus());
        v.setType(receiptVoucherRequest.getType());
        v.setDescription(receiptVoucherRequest.getDescription());
        voucherRepository.save(v);

        Department d = new Department();
        d = departmentRepository.findDepartmentById(receiptVoucherRequest.getDepartmentId());

        ReceiptVoucherComposite id = new ReceiptVoucherComposite();
        receiptVoucher.setVoucher(v);
        receiptVoucher.setAdmin(a);
        receiptVoucher.setDepartment(d);
        id.setVoucherId(receiptVoucherRequest.getVoucherId());
        id.setAdminId(receiptVoucherRequest.getAdminId());
        receiptVoucherRequest.setId(id);
        mapper.map(receiptVoucherRequest, receiptVoucher);
        return receiptVoucherRepository.save(receiptVoucher);

    }
    @Override
    public void delete(long id) {
        Voucher voucher = voucherRepository.findVoucherById(id);
        voucher.setStatus("CANCELED");
        voucherRepository.save(voucher);
    }

}