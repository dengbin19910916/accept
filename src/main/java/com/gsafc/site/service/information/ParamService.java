package com.gsafc.site.service.information;

import com.gsafc.site.mapper.ParamMapper;
import com.gsafc.site.model.information.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

/**
 * Created by dengb on 2016/12/23.
 */
@Service
public class ParamService {

    private final ParamMapper paramMapper;

    @Autowired
    public ParamService(ParamMapper paramMapper) {
        Assert.notNull(paramMapper);
        this.paramMapper = paramMapper;
    }

    public Param findByNameAndCode(String name, String code) {
        return paramMapper.findByNameAndCode(name, code);
    }

    public List<Param> findByName(String name) {
        return paramMapper.findByName(name);
    }
}
