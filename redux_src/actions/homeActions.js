import DataRepository from '../common/netWork'
import RecommendModel from '../models/RecommendModel'

export const requestPosts = () =>{
	return	{
		type: 'FETCH_POSTS_REQUEST'
	}
}
export const receivePosts = (json) =>{
	return {
		type:      'FETCH_POSTS_SUCCESS',
		bannerMap: json.result.bannerMap,
        mediaReportMap: json.result.mediaReportMap,
        recommendMap:   convertJSONToModel(json.result.recommendMap),
		isFetching: false,
	}
}
export const errorPosts = (error) =>{
	return {
		type:       'FETCH_POSTS_FAILURE',
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

export const updateHomeData = (url,parms)=> dispatch =>{

	return DataRepository.fetchNormalNetRepository(
				'rest/frontPage/v1.7/getBannerIndex',
				{
        			clientId: '4',
      			})
			.then(json => dispatch(receivePosts(json)))
			.catch(error => console.log(error))
}
