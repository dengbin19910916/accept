package com.gsafc.site.service.information;

import com.gsafc.site.mapper.CityMapper;
import com.gsafc.site.mapper.CountyMapper;
import com.gsafc.site.mapper.ProvinceMapper;
import com.gsafc.site.model.country.City;
import com.gsafc.site.model.country.County;
import com.gsafc.site.model.country.Province;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

/**
 * Created by dengb on 2016/12/20.
 */
@Service
public class CountryService {

    private final ProvinceMapper provinceMapper;
    private final CityMapper cityMapper;
    private final CountyMapper countyMapper;

    @Autowired
    public CountryService(ProvinceMapper provinceMapper, CityMapper cityMapper, CountyMapper countyMapper) {
        Assert.notNull(provinceMapper);
        Assert.notNull(cityMapper);
        Assert.notNull(countyMapper);
        this.provinceMapper = provinceMapper;
        this.cityMapper = cityMapper;
        this.countyMapper = countyMapper;
    }

    public List<Province> findAllProvinces() {
        return provinceMapper.findAllProvinces();
    }

    public Province findProvinceByCode(String code) {
        return provinceMapper.findByCode(code);
    }

    public List<City> findAllCities() {
        return cityMapper.findAllCities();
    }

    public City findCityByCode(String code) {
        return cityMapper.findByCode(code);
    }

    public List<City> findCitiesByProvinceCode(String provinceCode) {
        return cityMapper.findByProvinceCode(provinceCode);
    }

    public List<County> findAllCounties() {
        return countyMapper.findAllCounties();
    }

    public County findCountyByCode(String code) {
        return countyMapper.findByCode(code);
    }

    public List<County> findCountiesByCityCode(String provinceCode) {
        return countyMapper.findByCityCode(provinceCode);
    }

    public boolean isCountyCode(String code) {
        return findCountyByCode(code) != null;
    }
}
