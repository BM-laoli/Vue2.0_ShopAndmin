import {Nesthttp} from '../../plugins/http'

export const getAllIndustry = data => {
    return Nesthttp.get('/shopmanage/shoplist/queryallindustry', { params: data })
}
export const getIndustryByName = data => {
    return Nesthttp.get('/shopmanage/shoplist/queryindustrybyname', { params: data })
}
export const addIndustryInfo = data => {
    return Nesthttp.post('/shopmanage/shoplist/createIndustry', data)
}
export const editIndustryInfo = (id, data) => {
    return Nesthttp.put(`/shopmanage/shoplist/editIndustry?id=${id}`, data)
}
