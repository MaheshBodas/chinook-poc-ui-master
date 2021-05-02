import { viewalltracksConstants } from '../_constants';
import { viewallTracksService } from '../_services';
import { alertActions } from './';
export const viewAllTracksActions = {
    getTracks,
    resetAllTracks
};

function getTracks(pageNum, pageSize) {
    return dispatch => {
        console.log('getTracks')
        dispatch(request(pageNum, pageSize));

        return viewallTracksService.getTracks(pageNum, pageSize)
            .then(
                trackinstances => {
                    console.log(trackinstances);
                    dispatch(success(trackinstances));
                    dispatch(alertActions.clear());
                },
                error => {
                    console.log(error.toString())
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )

    };

    function request() { return { type: viewalltracksConstants.GET_ALL_TRACKS, pageNum, pageSize} }
    function success(trackinstances) { return { type: viewalltracksConstants.GET_ALL_TRACKS_SUCCESS, trackinstances } }
    function failure(error) { return { type: viewalltracksConstants.GET_ALL_TRACKS_FAILURE, error } }
}

function resetAllTracks() {
    return dispatch => {
        console.log('resetAllTracks dispatched')
        dispatch(request());
        dispatch(success());
        dispatch(alertActions.clear());
    }
    function request() { return { type: viewalltracksConstants.RESET_ALL_TRACKS } }
    function success() { return { type: viewalltracksConstants.RESET_ALL_TRACKS_SUCCESS } }
}
