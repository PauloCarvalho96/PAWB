import axios from 'axios';

import * as loadingErrorActions from '../actions/index';
import * as actionTypes from './actionTypes';

const getAllPlaces = (places) => {
    return {
        type: actionTypes.GET_ALL_PLACES,
        places: places
    }
}

export const fetchAllPlaces = (token) => {
    return (dispatch) => {
        dispatch(loadingErrorActions.startRequest());
        const auth = {
            headers: {
                Authorization: token
            }
        };
        axios.get('http://127.0.0.1:8081/front/users/places', auth).then(response => {
            dispatch(getAllPlaces(response.data.data));
            dispatch(loadingErrorActions.endRequest());
        }).catch(err => {
            dispatch(loadingErrorActions.errorRequest(err.toString()));
        });
    }
}
