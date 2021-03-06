import * as types from '../constants/ActionTypes'
import Rawg from '../services/api'


const API = new Rawg()

export const setLoading = () => ({ type: types.SET_LOADING })
export const unsetLoading = () => ({ type: types.SET_LOADING })
export const deleteGame = id => ({ type: types.DELETE_GAME, id })
export const clearSearchItems = () => ({type: types.CLEAR_SEARCH_ITEMS })
export const addSearchItems = game => {
    return dispatch => {
        API.searchByName(game.name)
            .then(res => dispatch({
                type: types.ADD_SEARCH_ITEMS,
                payload: res.data.results,
            }))
    }
}
export const addGame = gameId => {
    return dispatch => {
        API.getGameData(gameId)
            .then(res => dispatch({
                type: types.ADD_GAME,
                payload: res.data,
            }))
            .catch(() => dispatch({
                type: types.SET_ERROR,
            }))
    }
}
