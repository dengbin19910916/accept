package com.gsafc.site.model.country;

import org.springframework.stereotype.Component;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

/**
 * Created by dengb on 2017/1/8.
 */
@Component
@XmlRootElement(name = "provinces")
public class CountyList {
    private List<County> value;

    public CountyList() {
        super();
    }

    public CountyList(List<County> value) {
        this.value = value;
    }

    @XmlElement(name = "province")
    public List<County> getValue() {
        return value;
    }

    public void setValue(List<County> value) {
        this.value = value;
    }
}
