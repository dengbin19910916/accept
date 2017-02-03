package com.gsafc.site.web;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gsafc.site.model.country.Province;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by dengb on 2016/12/19.
 */
@Controller
public class SampleController {

    @GetMapping("/")
    public String index(Model model) {
        return "redirect:/apply/";
    }

    @PostMapping("/submit")
    @ResponseBody
    public Form submit(Form form, HttpServletRequest request) {
        request.startAsync();
        System.err.println(form);
        return form;
    }

    private static class Form {
        private String firstName;
        private String lastName;
        private String phoneNumber;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "GMT+8")
        private Date hireDate;

        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public String getPhoneNumber() {
            return phoneNumber;
        }

        public void setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
        }

        public Date getHireDate() {
            return hireDate;
        }

        public void setHireDate(Date hireDate) {
            this.hireDate = hireDate;
        }

        @Override
        public String toString() {
            return "Form{" +
                    "firstName='" + firstName + '\'' +
                    ", lastName='" + lastName + '\'' +
                    ", phoneNumber='" + phoneNumber + '\'' +
                    ", hireDate=" + new SimpleDateFormat("yyyy-MM-dd").format(hireDate) +
                    '}';
        }
    }

    @GetMapping(value = "/message", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public List<String> message() {
        return new ArrayList<String>(){
            {
                add("测试信息1");
                add("测试信息2");
                add("测试信息3");
                add("测试信息4");
                add("测试信息5");
            }
        };
    }

    @GetMapping(value = "/province", params = "callback", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Province province(String callback) {
        System.out.println(callback);
        return new Province(1, "110000", "北京市");
    }
}
