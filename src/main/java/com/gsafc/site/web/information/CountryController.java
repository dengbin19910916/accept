package com.gsafc.site.web.information;

import com.gsafc.site.model.country.City;
import com.gsafc.site.model.country.County;
import com.gsafc.site.model.country.Province;
import com.gsafc.site.model.country.ProvinceList;
import com.gsafc.site.service.information.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

/**
 * Created by dengb on 2016/12/20.
 */
@RestController
@RequestMapping("/country")
public class CountryController {

    private final CountryService countryService;

    @Autowired
    public CountryController(CountryService countryService) {
        Assert.notNull(countryService);
        this.countryService = countryService;
    }

    @GetMapping(value = "/provinces", params = "contentType=json",
            produces = {"text/json;charset=utf-8", "application/json;charset=utf-8"})
    public List<Province> provincesJson() {
        return countryService.findAllProvinces();
    }

    @GetMapping(value = "/provinces", params = "contentType=xml",
            produces = {"text/xml;charset=utf-8", "application/xml;charset=utf-8"})
    public ProvinceList provincesXml() {
        return new ProvinceList(countryService.findAllProvinces());
    }

    @GetMapping("/provinces/{code}")
    public List<Province> province(@PathVariable("code") String code) {
        return Collections.singletonList(countryService.findProvinceByCode(code));
    }

    @GetMapping("/cities")
    public List<City> cities() {
        return countryService.findAllCities();
    }

    @GetMapping("/cities/{code}")
    public List<City> city(@PathVariable("code") String code) {
        return Collections.singletonList(countryService.findCityByCode(code));
    }

    @GetMapping("/provinces/cities/{code}")
    public List<City> getCitiesByProvinceCode(@PathVariable("code") String code) {
        return countryService.findCitiesByProvinceCode(code);
    }

    @GetMapping("/counties")
    public List<County> counties() {
        return countryService.findAllCounties();
    }

    @GetMapping("/counties/{code}")
    public List<County> county(@PathVariable("code") String code) {
        return Collections.singletonList(countryService.findCountyByCode(code));
    }

    @GetMapping("/cities/counties/{code}")
    public List<County> getCountiesByCityCode(@PathVariable("code") String code) {
        return countryService.findCountiesByCityCode(code);
    }
}
