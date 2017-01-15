package com.gsafc.site.model;

/**
 * Created by dengb on 2016/12/22.
 */
public interface Parser<T, R> {

    /**
     * 解析数据并返回解析后的结果。
     *
     * @param data 需要解析的数据。
     * @return 解析后的结果。
     */
    R parse(T data);
}
