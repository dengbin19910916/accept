package com.gsafc.site.model;

/**
 * Created by dengb on 2016/12/22.
 */
public interface Validator<T> {

    /**
     * 验证数据是否合法。
     *
     * @param data 需要验证的数据。
     * @return 数据的验证结果，true - 验证成功，false - 验证失败。
     */
    boolean validate(T data);
}
