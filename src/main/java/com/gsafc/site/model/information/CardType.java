package com.gsafc.site.model.information;

import com.gsafc.site.model.Parser;
import com.gsafc.site.model.Validator;
import com.gsafc.site.service.information.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created by dengb on 2016/12/22.
 */
@Component
public enum CardType implements Validator<String>, Parser<String, Map<String, Object>> {

    IDENTITY {
        @Override
        public boolean validate(String data) {
            return data.length() == 18;
        }

        @Override
        public Map<String, Object> parse(String data) {
            Map<String, Object> result = new LinkedHashMap<>();
            int year = Integer.parseInt(data.substring(6, 10));
            int month = Integer.parseInt(data.substring(10, 12));
            int date = Integer.parseInt(data.substring(12, 14));
            GenderType gender = GenderType.parse(Integer.parseInt(data.substring(16, 17)) % 2 == 1 ? "M" : "F");

            result.put("year", year);
            result.put("month", month);
            result.put("date", date);
            result.put("gender", gender);

            return result;
        }
    },
    PASSPORT {
        @Override
        public boolean validate(String data) {
            return false;
        }

        @Override
        public Map<String, Object> parse(String data) {
            return null;
        }
    },
    SERVICEMAN {
        @Override
        public boolean validate(String data) {
            return false;
        }

        @Override
        public Map<String, Object> parse(String data) {
            return null;
        }
    },
    TEACHER {
        @Override
        public boolean validate(String data) {
            return false;
        }

        @Override
        public Map<String, Object> parse(String data) {
            return null;
        }
    };

    @Autowired
    protected CountryService countryService;
}
