package com.gsafc.site.web;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Created by dengb on 2016/12/25.
 */
@Controller
@RequestMapping("/valid")
public class ValidatorController {

    @RequestMapping(value = "/identity", method = {GET, POST})
    @ResponseBody
    public HashMap<String, Object> validateIdentity(@Param("number") String number, HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        HashMap<String, Object> result = new HashMap<>();
        System.err.println(number);
        if (number != null) {
            result.put("valid", "true");
        } else {
            result.put("valid", "false");
        }
        return result;
    }
}
