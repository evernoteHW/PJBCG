
import * as ActionTypes from './actionTypes'

import DataRepository from '../common/netWork'
import RecommendModel from '../models/RecommendModel'

export const requestPosts = () =>{
	return	{
		type: ActionTypes.FINANCE_POST_REQUEST
	}
}
export const receivePosts = (json) =>{
	return {
		type:      ActionTypes.FINANCE_POST_REQUEST_SUCCESS,
		bannerMap: json.result.bannerMap,
        investProductMap:   convertJSONToModel(json.result.investProductMap),
		isFetching: false,
	}
}
export const errorPosts = (error) =>{
	return {
		type:       ActionTypes.FINANCE_POST_REQUEST_FAILURE,
		error:      error,
		isFetching: false,
	}
}
const convertJSONToModel = result =>{

    var recommendMapTemp = []
    for (var i = 0; i < result.length; i++) {
      var item = result[i]
      var model = new RecommendModel(item)
      recommendMapTemp.push(model)
    }
    return recommendMapTemp
 }

export const updateFinanceData = (url,parms)=> dispatch =>{
	return DataRepository.fetchNormalNetRepository(
				'rest/frontPage/v1.2/getFinance',
				{
        			clientId: '4',
        			imei:     '1111',
      			})
			.then(json => dispatch(receivePosts(json)))
			.catch(error => console.log(error))
}
