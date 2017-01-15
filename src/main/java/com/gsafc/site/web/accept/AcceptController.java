package com.gsafc.site.web.accept;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.math.BigDecimal;

/**
 * Created by dengb on 2017/1/2.
 */
@Controller
@RequestMapping("accept")
public class AcceptController {

    public String uploadImg() {
        BigDecimal decimal = new BigDecimal("123");
//        decimal.subtract()

        return null;
    }
}
