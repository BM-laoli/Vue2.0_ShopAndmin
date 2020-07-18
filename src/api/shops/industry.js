import http from '../../plugins/http'

export const getAllIndustry = data => {
    return http.get('/shopmanage/shoplist/queryallindustry', { params: data })
}
export const getIndustryByName = data => {
    return http.get('/shopmanage/shoplist/queryindustrybyname', { params: data })
}
export const addIndustryInfo = data => {
    return http.post('/shopmanage/shoplist/createIndustry', data)
}
export const editIndustryInfo = (id, data) => {
    return http.put(`/shopmanage/shoplist/editIndustry?id=${id}`, data)
}