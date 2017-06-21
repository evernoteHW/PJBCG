// //减少样板代码
// function makeActionCreator(type, ...argNames) {
//   return function(...args) {
//     let action = { type }
//     argNames.forEach((arg, index) => {
//       action[argNames[index]] = args[index]
//     })
//     return action
//   }
// }
import DataRepository from '../common/netWork'
import RecommendModel from '../models/RecommendModel'

// const UPDATE_HOME_DATA = 'UPDATE_HOME_DATA'
export const requestPosts = () =>{
	return	{
		type: 'FETCH_POSTS_REQUEST1'
	}
}
export const receivePosts = (json) =>{
	return {
		type:      'FETCH_POSTS_SUCCESS1',
		bannerMap: json.result.bannerMap,
        investProductMap:   convertJSONToModel(json.result.investProductMap),
		isFetching: false,
	}
}
export const errorPosts = (error) =>{
	return {
		type:       'FETCH_POSTS_FAILURE1',
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
	// dispatch(requestPosts())
	// return fetch(url,parms)
	// 		.then(response => response.json())
	// 		.then(json => dispatch(receivePosts(json)))
	// 		.catch(error => dispatch(errorPosts(error)))
	return DataRepository.fetchNormalNetRepository(
				'rest/frontPage/v1.2/getFinance',
				{
        			clientId: '4',
        			imei:     '1111',
      			})
			.then(json => dispatch(receivePosts(json)))
			.catch(error => console.log(error))
}

//或者可以这样写
//
// export const updateHomeData = ()=> dispatch =>{
// 	dispatch(RequestPosts())
// 	return fetch(``,{})
// 			.then(response => response.json())
// 			.then(json => dispatch(receivePosts(json)))
// 			.catch(error => dispatch(errorPosts(error)))
// }