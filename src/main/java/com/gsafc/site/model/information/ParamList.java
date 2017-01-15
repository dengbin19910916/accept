package com.gsafc.site.model.information;

import org.springframework.stereotype.Component;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

/**
 * Created by dengb on 2017/1/7.
 */
@Component
@XmlRootElement(name = "params")
public class ParamList {

    private List<Param> value;

    public ParamList() {
        super();
    }

    public ParamList(List<Param> value) {
        this.value = value;
    }

    @XmlElement(name = "param")
    public List<Param> getValue() {
        return value;
    }

    public void setValue(List<Param> value) {
        this.value = value;
    }
}
