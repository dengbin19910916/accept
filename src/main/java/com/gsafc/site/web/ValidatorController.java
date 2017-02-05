package com.gsafc.site.web;

import com.gsafc.site.model.information.CardType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
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

    @RequestMapping(value = "/{type}/{number}", method = {GET, POST})
    @ResponseBody
    public HashMap<String, Object> validateIdentity(@PathVariable("type") String type, @PathVariable("number") String number,
                                                    HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        HashMap<String, Object> result = new HashMap<>();

        boolean valid = CardType.valueOf(type.toUpperCase()).validate(number);
        result.put("valid", valid);

        return result;
    }
}
