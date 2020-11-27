import axios from 'axios';

import * as actionTypes from './actionTypes';
import * as actions from '../actions/index';
import * as api from '../actions/api';


const getAllPlaces = (places) => {
    return {
        type: actionTypes.GET_ALL_PLACES,
        places: places
    }
}

export const fetchAllPlaces = (token) => {
    return (dispatch) => {
        // dispatch(loadingErrorActions.startRequest());
        const auth = {
            headers: {
                Authorization: token
            }
        };
        axios.get(api.URL_GET_ALL_PLACES, auth).then(response => {
            dispatch(getAllPlaces(response.data.data));
            // dispatch(loadingErrorActions.endRequest());
        }).catch(err => {
            // dispatch(actions.logout());
        });
    }
}

const getUserPlaces = (places) => {
    return {
        type: actionTypes.GET_USER_PLACES,
        places: places
    }
}

export const fetchUserPlaces = (token) => {
    return (dispatch) => {
        const auth = {
            headers: {
                Authorization: token
            }
        };
        axios.get(api.URL_USER_PLACES, auth).then(response => {
            dispatch(getUserPlaces(response.data.data));
        }).catch(err => {
            console.log(err);
        });
    }
}

const addPlace = (place, id) => {
    return {
        type: actionTypes.CREATE_PLACE,
        place: place,
        id: id,
    }
}

export const createPlace = (place, token) => {
    return (dispatch) => {
        const auth = {
            headers: {
                Authorization: token
            }
        };
        axios.post(api.URL_PLACES_ADD, place, auth).then(res => {
            dispatch(addPlace(place, res.data.resourceId));
        }).catch(err => {
            console.log(err);
        });
    }
}

const onDeletePlace = (id) => {
    return {
        type: actionTypes.DELETE_PLACE,
        id: id,
    }
}

export const deletePlace = (id, token) => {
    return (dispatch) => {
        const auth = {
            headers: {
                Authorization: token
            }
        };
        axios.delete('http://0.0.0.0:8081/back/places/' + id, auth).then(res => {
            dispatch(onDeletePlace(id));
        }).catch(err => {
            console.log(err);
        });
    }
}

const updatePlace = (place) => {
    return {
        type: actionTypes.EDIT_PLACE,
        place: place,
    }
}

export const editPlace = (place, token) => {
    return (dispatch) => {
        const auth = {
            headers: {
                Authorization: token
            }
        };
        axios.put('http://0.0.0.0:8081/back/places/' + place.ID, place, auth).then(res => {
            dispatch(updatePlace(place));
        }).catch(err => {
            console.log(err);
        })
    }
}