import { areaList } from '../../public/index.ts'

const province_list = areaList.province_list
const city_list = areaList.city_list
const county_list = areaList.county_list

export function getAllProvinces() {
  return Object.entries(province_list).map(([code, name]) => ({ code, name }))
}

export function getProvinceCode(name) {
  for (const [code, provinceName] of Object.entries(province_list)) {
    if (provinceName === name) return code
  }
  return null
}

export function getCitiesByProvince(provinceCode) {
  const prefix = provinceCode.slice(0, 2)
  const cities = []
  for (const [code, name] of Object.entries(city_list)) {
    if (code.startsWith(prefix)) {
      cities.push({ code, name })
    }
  }
  return cities
}

export function getCityCode(provinceCode, cityName) {
  const prefix = provinceCode.slice(0, 2)
  for (const [code, city] of Object.entries(city_list)) {
    if (code.startsWith(prefix) && city === cityName) return code
  }
  return null
}

export function getCountiesByCity(cityCode) {
  const prefix = cityCode.slice(0, 4)
  const counties = []
  for (const [code, name] of Object.entries(county_list)) {
    if (code.startsWith(prefix)) {
      counties.push({ code, name })
    }
  }
  return counties
}

export function getCountyCode(cityCode, countyName) {
  const prefix = cityCode.slice(0, 4)
  for (const [code, county] of Object.entries(county_list)) {
    if (code.startsWith(prefix) && county === countyName) return code
  }
  return null
}