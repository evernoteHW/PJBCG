import DataRepository from '../common/netWork'
import RecommendModel from '../models/RecommendModel'

import * as ActionTypes from '../actions/actionTypes'

export const requestPosts = () =>{
	return	{
		type: ActionTypes.HOME_POST_REQUEST
	}
}
export const receivePosts = (json) =>{
	return {
		type:      ActionTypes.HOME_POST_REQUEST_SUCCESS,
		bannerMap: json.result.bannerMap,
        mediaReportMap: json.result.mediaReportMap,
        recommendMap:   convertJSONToModel(json.result.recommendMap),
		isFetching: false,
	}
}
export const errorPosts = (error) =>{
	return {
		type:       ActionTypes.HOME_POST_REQUEST_FAILURE,
		error:      error,
		isFetching: false,
	}
}

export const pushLogin = () =>{
	return{
		type: ActionTypes.PUSH_LOGIN,
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

export const updateHomeData = (url,parms)=> dispatch =>{

	return DataRepository.fetchNormalNetRepository(
				'rest/frontPage/v1.7/getBannerIndex',
				{
        			clientId: '4',
      			})
			.then(json => dispatch(receivePosts(json)))
			.catch(error => console.log(error))
}
