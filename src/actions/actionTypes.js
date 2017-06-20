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

// const UPDATE_HOME_DATA = 'UPDATE_HOME_DATA'
export const requestPosts = () =>{
	type: 'RequestPosts',
}
export const receivePosts = (json) =>{
	type: 'ReceiverPosts',
}
export const errorPosts = (json) =>{
	type: 'Error',
}
// export const updateHomeData = makeActionCreator(ADD_TODO, 'todo')
export const updateHomeData = ()=> dispatch =>{
	dispatch(RequestPosts())
	return fetch(``,{})
			.then(response => response.json())
			.then(json => dispatch(receivePosts(json)))
			.catch(error =>dispatch(errorPosts(error)))
}