package com.gsafc.site.web.information;

import com.gsafc.site.model.information.Param;
import com.gsafc.site.model.information.ParamList;
import com.gsafc.site.model.information.ParamType;
import com.gsafc.site.service.information.ParamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by dengb on 2016/12/23.
 */
@RestController
@ResponseStatus(HttpStatus.OK)
@RequestMapping("/param")
public class ParamController {

    private final ParamService paramService;

    @Autowired
    public ParamController(ParamService paramService) {
        Assert.notNull(paramService);
        this.paramService = paramService;
    }

    @GetMapping(value = {"{name}"}, params = "contentType=json",
            produces = {"text/json;charset=utf-8", "application/json;charset=utf-8"})
    public List<Param> paramsJson(@PathVariable("name") String name) {
        ParamType paramType = ParamType.parse(name);
        return paramType == null ? null : paramService.findByName(paramType.toString());
    }

    @GetMapping(value = "/{name}", params = "contentType=xml",
            produces = {"text/xml;charset=utf-8", "application/xml;charset=utf-8"})
    public ParamList paramsXml(@PathVariable("name") String name) {
        ParamType paramType = ParamType.parse(name);
        return paramType == null ? null : new ParamList(paramService.findByName(paramType.toString()));
    }

    @GetMapping(value = {"{name}/{code}"}, params = "contentType=json",
            produces = {"text/json;charset=utf-8", "application/json;charset=utf-8"})
    public Param paramJson(@PathVariable("name") String name, @PathVariable("code") String code) {
        System.err.println("json ->" + name + " -- " + code);
        return paramService.findByNameAndCode(name, code);
    }

    @GetMapping(value = "/{name}/{code}", params = "contentType=xml",
            produces = {"text/xml;charset=utf-8", "application/xml;charset=utf-8"})
    public Param paramXml(@PathVariable("name") String name, @PathVariable("code") String code) {
        System.err.println("xml ->" + name + " -- " + code);
        return paramService.findByNameAndCode(name, code);
    }
}
