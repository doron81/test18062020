import ActionTypes from '../actions'
export const increaseCount = (data) => ({
type: ActionTypes.INCREASE_COUNT,
name: data.name,
pictureUrl: data.picture.data.url
})
export const decreaseCount = () => ({
type: ActionTypes.DECREASE_COUNT
})
