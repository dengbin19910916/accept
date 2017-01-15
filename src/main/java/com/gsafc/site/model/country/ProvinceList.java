package com.gsafc.site.model.country;

import org.springframework.stereotype.Component;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

/**
 * Created by dengb on 2017/1/8.
 */
@Component
@XmlRootElement(name = "counties")
public class ProvinceList {
    private List<Province> value;

    public ProvinceList() {
        super();
    }

    public ProvinceList(List<Province> value) {
        this.value = value;
    }

    @XmlElement(name = "county")
    public List<Province> getValue() {
        return value;
    }

    public void setValue(List<Province> value) {
        this.value = value;
    }
}
