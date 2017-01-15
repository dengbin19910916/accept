package com.gsafc.site.model.country;

import org.springframework.stereotype.Component;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

/**
 * Created by dengb on 2017/1/8.
 */
@Component
@XmlRootElement(name = "cities")
public class CityList {
    private List<City> value;

    public CityList() {
        super();
    }

    public CityList(List<City> value) {
        this.value = value;
    }

    @XmlElement(name = "city")
    public List<City> getValue() {
        return value;
    }

    public void setValue(List<City> value) {
        this.value = value;
    }
}
