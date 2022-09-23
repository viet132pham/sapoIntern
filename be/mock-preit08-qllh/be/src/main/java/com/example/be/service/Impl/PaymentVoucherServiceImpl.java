package com.example.be.service.Impl;

import com.example.be.dto.PaymentVoucherDTO;
import com.example.be.dto.TeacherClassDTO;
import com.example.be.dto.UserDTO;
import com.example.be.entity.*;
import com.example.be.entity.Class;
import com.example.be.entity.compositekey.PaymentVoucherComposite;
import com.example.be.entity.mapped.PaymentVoucher;
import com.example.be.entity.mapped.PaymentVoucher;
import com.example.be.entity.mapped.PaymentVoucher;
import com.example.be.entity.mapped.TeacherClass;
import com.example.be.repository.*;
import com.example.be.request.PaymentVoucherRequest;
import com.example.be.service.PaymentVoucherService;
import com.example.be.service.VoucherService;
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
public class PaymentVoucherServiceImpl implements PaymentVoucherService {

    @Autowired
    PaymentVoucherRepository paymentVoucherRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private VoucherRepository voucherRepository;
//    public PaymentVoucher update( long id, PaymentVoucher v)  {
//        PaymentVoucher paymentVoucher = paymentVoucherRepository.findById((long) id).get();
//        if(paymentVoucher.getId()!=null){
//            paymentVoucher.setClasses(v.getClasses());
//            paymentVoucher.setEmployee(v.getEmployee());
//            paymentVoucher.setStudentEmail(v.getStudentEmail());
//            paymentVoucher.setStudentPhone(v.getStudentPhone());
//            paymentVoucher.setVoucher(v.getVoucher());
//            return paymentVoucherRepository.save(paymentVoucher);
//
//        }else {
////            throw new RecordNotFoundException("Not found");
//
//        }
//        return null;
//
//    }


    @Autowired
    private ModelMapper mapper;

    public List<PaymentVoucherDTO> findAllPaymentVoucherDTO() {
        List<PaymentVoucher> paymentVoucheres = paymentVoucherRepository.findAll();
        List<PaymentVoucherDTO> paymentVoucherDTOS = new ArrayList<>();
        for (int i = 0; i < paymentVoucheres.size(); i++){
            PaymentVoucherDTO paymentVoucherDTO = new PaymentVoucherDTO();
            PaymentVoucher paymentVoucher = paymentVoucheres.get(i);
            mapper.map(paymentVoucher, paymentVoucherDTO);
            paymentVoucherDTO.setVoucher(paymentVoucher.getVoucher());
            paymentVoucherDTO.setCourse(paymentVoucher.getCourse());
            User user = paymentVoucher.getEmployee();
            UserDTO userDTO = new UserDTO();

            mapper.map(user, userDTO);
            userDTO.getRoles().removeAll(userDTO.getRoles());
            user.getRoles().forEach(role -> {userDTO.getRoles().add(role.getRoleCode());});
            paymentVoucherDTO.setEmployee(userDTO);
            paymentVoucherDTOS.add(paymentVoucherDTO);
        }
        return paymentVoucherDTOS;
    }

//    @Override
//    public List<PaymentVoucher> findByVoucherId(long id) {
//        Voucher voucher = new Voucher();
//            voucher = voucherRepository.findVoucherById(id);
//
//        return paymentVoucherRepository.findByVoucherId(voucher);
//    }


    //post request
    public PaymentVoucher createRequest(PaymentVoucherRequest paymentVoucherRequest, BindingResult bindingResult){
        PaymentVoucher paymentVoucher = new PaymentVoucher();
        User e = new User();
        e = userRepository.findUserById(paymentVoucherRequest.getEmployeeId());
        Voucher v = new Voucher();
        mapper.map(paymentVoucherRequest, v);
        voucherRepository.save(v);
        Course c = new Course();
        c = courseRepository.findCourseById(paymentVoucherRequest.getCourseId());

        PaymentVoucherComposite id = new PaymentVoucherComposite();
        paymentVoucher.setVoucher(v);
        paymentVoucher.setEmployee(e);
        paymentVoucher.setCourse(c);
        id.setVoucherId(paymentVoucherRequest.getVoucherId());
        id.setEmployeeId(paymentVoucherRequest.getEmployeeId());
        paymentVoucherRequest.setId(id);
        mapper.map(paymentVoucherRequest, paymentVoucher);
        return paymentVoucherRepository.save(paymentVoucher);
    }

    public PaymentVoucher updateRequest(PaymentVoucherRequest paymentVoucherRequest, BindingResult bindingResult){
        PaymentVoucher paymentVoucher = new PaymentVoucher();
        User e = userRepository.findUserById(paymentVoucherRequest.getEmployeeId());
        Voucher v = voucherRepository.findVoucherById(paymentVoucherRequest.getVoucherId());
        v.setAmount(paymentVoucherRequest.getAmount());
        v.setStatus(paymentVoucherRequest.getStatus());
        v.setType(paymentVoucherRequest.getType());
        v.setDescription(paymentVoucherRequest.getDescription());
        Course c = courseRepository.findCourseById(paymentVoucherRequest.getCourseId());


        PaymentVoucherComposite id = new PaymentVoucherComposite();
        paymentVoucher.setVoucher(v);
        paymentVoucher.setEmployee(e);
        paymentVoucher.setCourse(c);
        id.setVoucherId(paymentVoucherRequest.getVoucherId());
        id.setEmployeeId(paymentVoucherRequest.getEmployeeId());
        paymentVoucherRequest.setId(id);
        mapper.map(paymentVoucherRequest, paymentVoucher);
        return paymentVoucherRepository.save(paymentVoucher);
    }
    @Override
    public PaymentVoucherDTO findPaymentVoucherDTOByVoucherId(long id) {
        // Lấy User entity ra từ DB
        PaymentVoucher paymentVoucher = paymentVoucherRepository.findPaymentVoucherDTOByVoucherId(id);
        System.out.println(paymentVoucher);


        PaymentVoucherDTO paymentVoucherDTO = new PaymentVoucherDTO();
        mapper.map(paymentVoucher, paymentVoucherDTO);
        Voucher voucher = paymentVoucher.getVoucher();
        User user = paymentVoucher.getEmployee();
        UserDTO userDTO = new UserDTO();
        mapper.map(user, userDTO);
        userDTO.getRoles().removeAll(userDTO.getRoles());
        user.getRoles().forEach(role -> {userDTO.getRoles().add(role.getRoleCode());});

        paymentVoucherDTO.setEmployee(userDTO);



        return paymentVoucherDTO;
    }

    @Override
    public void delete(long id) {
        Voucher voucher = voucherRepository.findVoucherById(id);
        voucher.setStatus("CANCELED");
        voucherRepository.save(voucher);
    }



    @Override
    public List<PaymentVoucherDTO> findPaymentVoucherDTOByEmployeeId(long id){
        List<PaymentVoucher> paymentVoucheres = paymentVoucherRepository.findPaymentVoucherDTOByEmployeeId(id);
        List<PaymentVoucherDTO> paymentVoucherDTOS = new ArrayList<>();;

        for (int i = 0; i < paymentVoucheres.size(); i++){
            PaymentVoucherDTO paymentVoucherDTO = new PaymentVoucherDTO();
            PaymentVoucher paymentVoucher = paymentVoucheres.get(i);
            mapper.map(paymentVoucher, paymentVoucherDTO);
            paymentVoucherDTO.setVoucher(paymentVoucher.getVoucher());
            paymentVoucherDTO.setCourse(paymentVoucher.getCourse());
            User user = paymentVoucher.getEmployee();
            UserDTO userDTO = new UserDTO();
            mapper.map(user, userDTO);
            userDTO.getRoles().removeAll(userDTO.getRoles());
            user.getRoles().forEach(role -> {userDTO.getRoles().add(role.getRoleCode());});

            paymentVoucherDTO.setEmployee(userDTO);
            paymentVoucherDTOS.add(paymentVoucherDTO);
        }
        return paymentVoucherDTOS;
    }

    @Override
    public List<PaymentVoucherDTO> findPaymentVoucherInPeriodByEmployeeId(long id, String start, String end){
        List<PaymentVoucher> paymentVoucheres = paymentVoucherRepository.findPaymentVoucherInPeriodByEmployeeId( id, start, end);
        List<PaymentVoucherDTO> paymentVoucherDTOS = new ArrayList<>();;

        for (int i = 0; i < paymentVoucheres.size(); i++){
            PaymentVoucherDTO paymentVoucherDTO = new PaymentVoucherDTO();
            PaymentVoucher paymentVoucher = paymentVoucheres.get(i);
            mapper.map(paymentVoucher, paymentVoucherDTO);
            paymentVoucherDTO.setVoucher(paymentVoucher.getVoucher());
            paymentVoucherDTO.setCourse(paymentVoucher.getCourse());
            User user = paymentVoucher.getEmployee();
            UserDTO userDTO = new UserDTO();
            mapper.map(user, userDTO);
            userDTO.getRoles().removeAll(userDTO.getRoles());
            user.getRoles().forEach(role -> {userDTO.getRoles().add(role.getRoleCode());});

            paymentVoucherDTO.setEmployee(userDTO);
            paymentVoucherDTOS.add(paymentVoucherDTO);
        }
        return paymentVoucherDTOS;
    }

}