package com.gsafc.site.web.apply.pre;

import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;

/**
 * Created by dengb on 2016/12/24.
 */
@Controller
@RequestMapping("/apply/pre")
public class InputController {

    @GetMapping({"/", "index"})
    public String index() {
        return "apply/pre_apply_inputs";
    }

    @PostMapping({"/submit"})
    public String submit(@Validated InputForm form, Errors errors) {
        System.out.println(form);

        return "sample";
    }

    private static class InputForm {
        private String dlr;
        private String name;
        private String phoneNumber;
        private String idCardType;
        private String idCardNumber;
        private String gender;
        private Date birthday;

        public String getDlr() {
            return dlr;
        }

        public void setDlr(String dlr) {
            this.dlr = dlr;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getPhoneNumber() {
            return phoneNumber;
        }

        public void setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
        }

        public String getIdCardType() {
            return idCardType;
        }

        public void setIdCardType(String idCardType) {
            this.idCardType = idCardType;
        }

        public String getIdCardNumber() {
            return idCardNumber;
        }

        public void setIdCardNumber(String idCardNumber) {
            this.idCardNumber = idCardNumber;
        }

        public String getGender() {
            return gender;
        }

        public void setGender(String gender) {
            this.gender = gender;
        }

        public Date getBirthday() {
            return birthday;
        }

        public void setBirthday(Date birthday) {
            this.birthday = birthday;
        }

        @Override
        public String toString() {
            return "InputForm{" +
                    "dlr='" + dlr + '\'' +
                    ", name='" + name + '\'' +
                    ", phoneNumber='" + phoneNumber + '\'' +
                    ", idCardType='" + idCardType + '\'' +
                    ", idCardNumber='" + idCardNumber + '\'' +
                    ", gender='" + gender + '\'' +
                    ", birthday='" + birthday + '\'' +
                    '}';
        }
    }
}
