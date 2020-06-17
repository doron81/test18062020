import ActionTypes from '../actions'
const initialState = {
    count: 0,
    name: "",
    pictureUrl: "",
    list: "ssssssssssss"
}
export default function counterReducer (
    state = initialState,
    action
    )
{
switch(action.type) {
    case ActionTypes.INCREASE_COUNT:
    return {count: true, name: action.name , pictureUrl: action.pictureUrl}
    case ActionTypes.DECREASE_COUNT:
    return {count: false}
    case ActionTypes.POPULAR_MOVIES:
    return {list: "3333333333333"}
    default:
    return state
 }
}