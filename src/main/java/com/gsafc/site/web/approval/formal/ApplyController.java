package com.gsafc.site.web.approval.formal;

import com.gsafc.site.model.customer.Person;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by dengb on 2017/1/31.
 */
@Controller
@RequestMapping("/apply")
public class ApplyController {

    @GetMapping({"/", "/index"})
    public String index(Model model) {
        Person borrower = new Person();
        borrower.setRelationType("00003");
        borrower.setCustomerName("邓斌");
        borrower.setCardType("01");
        borrower.setCardNumber("430821199111230033");
        borrower.setExpirationDate(LocalDate.parse("1991-11-23", DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        borrower.setMobileNumber("15768888254");

        model.addAttribute("borrower", borrower);
        return "sample";
    }

    @RequestMapping(value = "/findPersons", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public List<Person> findPersons(@RequestParam("appId") String appId) {
        List<Person> persons = new ArrayList<>();

        Person borrower = new Person();
        borrower.setRelationType("00003");
        borrower.setCustomerName("邓斌");
        borrower.setCardType("01");
        borrower.setCardNumber("430821199111230033");
        borrower.setExpirationDate(LocalDate.parse("1991-11-23", DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        borrower.setMobileNumber("15768888254");

        Person coBorrower = new Person();
        coBorrower.setRelationType("00004");
        coBorrower.setCustomerName("邓斌");
        coBorrower.setCardType("01");
        coBorrower.setCardNumber("430821199111230033");
        coBorrower.setExpirationDate(LocalDate.parse("1991-11-23", DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        coBorrower.setMobileNumber("15768888254");

        Person guarantee = new Person();
        guarantee.setRelationType("00005");
        guarantee.setCustomerName("邓斌");
        guarantee.setCardType("00001");
        guarantee.setCardNumber("430821199111230033");
        guarantee.setExpirationDate(LocalDate.parse("1991-11-23", DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        guarantee.setMobileNumber("15768888254");

        persons.add(borrower);
        persons.add(coBorrower);
        persons.add(guarantee);
        return persons;
    }
}
