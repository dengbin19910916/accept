package com.gsafc.site.model.information;

import java.util.Arrays;
import java.util.Optional;

/**
 * Created by dengb on 2016/12/25.
 */
public enum ParamType {

    CARD_TYPE("cardType"),
    GENDER_TYPE("genderType");

    ParamType(String name) {
        this.name = name;
    }

    private String name;

    @Override
    public String toString() {
        return name;
    }

    public static ParamType parse(String name) {
        Optional<ParamType> result = Arrays.stream(ParamType.values())
                .filter(paramType -> paramType.name.equals(name))
                .findFirst();
        return result.isPresent() ? result.get() : null;
    }
}
