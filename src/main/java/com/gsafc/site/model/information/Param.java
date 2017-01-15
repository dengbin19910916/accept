package com.gsafc.site.model.information;

import org.springframework.stereotype.Component;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by dengb on 2016/12/23.
 */
@Component
@XmlRootElement
public class Param {

    private String name;
    private String code;
    private String description;
    private int serial;

    public Param() {
        super();
    }

    public Param(String name, String code, String description, int serial) {
        this.name = name;
        this.code = code;
        this.description = description;
        this.serial = serial;
    }

    @XmlElement
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @XmlElement
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @XmlElement
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @XmlElement
    public int getSerial() {
        return serial;
    }

    public void setSerial(int serial) {
        this.serial = serial;
    }

    @Override
    public String toString() {
        return "Param{" +
                "name='" + name + '\'' +
                ", code='" + code + '\'' +
                ", description='" + description + '\'' +
                ", serial=" + serial +
                '}';
    }
}
