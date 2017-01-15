package com.gsafc.site.model.information;

/**
 * Created by dengb on 2016/12/22.
 */
public enum GenderType {
    /**
     * 男
     */
    MALE("M"),
    /**
     * 女
     */
    FEMALE("F");

    GenderType(String value) {
        this.value = value;
    }

    private String value;

    @Override
    public String toString() {
        return value;
    }

    public static GenderType parse(String value) {
        switch (value) {
            case "M": return MALE;
            case "F": return FEMALE;
            default: return null;
        }
    }
}
