import configureMockStore  from 'redux-mock-store';
import thunk from 'redux-thunk'
import mockAxios from 'axios'
import { viewalltracksConstants, alertConstants } from './../_constants';
// Actions to be tested
import { viewAllTracksActions } from './../_actions';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore();

// Helper functions
function findAction(store, type) {
  return store.getActions().find(action => action.type === type);
}

export function getAction(store, type) {
  const action = findAction(store, type);
  if (action) return Promise.resolve(action);

  return new Promise(resolve => {
    store.subscribe(() => {
      const action = findAction(store, type);
      if (action) resolve(action);
    });
  });
}
//

describe('viewAllTracksActions', () => {
    beforeEach(() => { // Runs before each test in the suite
      store.clearActions();
    });
      describe("getTracks", () => {
        const pageNum = 1
        const pageSize = 10

        it("creates GET_ALL_TRACKS_SUCCESS when fetching All Tracks has been done'", () => {
          const trackinstances = [{count:10, next:'http://chinook-poc-api-master.herokuapp.com/tracks/?page=2&page_size=10', prev: null, results: []}]
          mockAxios.get.mockImplementationOnce(() =>
              Promise.resolve(trackinstances)
          )
          const expectedActions = [
            { type: viewalltracksConstants.GET_ALL_TRACKS, pageNum: 1, pageSize: 10 },
            { type: viewalltracksConstants.GET_ALL_TRACKS_SUCCESS, trackinstances},
            { type: alertConstants.CLEAR }
          ]
          // await store.dispatch(viewsingleriskActions.getRisk(riskid, itemsPerRow))
          return store.dispatch(viewAllTracksActions.getTracks(pageNum, pageSize)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
          });
        });


        it("creates GET_ALL_TRACKS_FAILURE when fetching All Tracks has failed", () => {
          const riskinstance = {error:'No data found for Tracks'}
          mockAxios.get.mockImplementationOnce(() =>
              Promise.resolve(null)
          )
          const expectedActions = [
            { type: viewalltracksConstants.GET_ALL_TRACKS, pageNum: 1, pageSize: 10  },
            { type: viewalltracksConstants.GET_ALL_TRACKS_FAILURE, error:'No data found for Tracks'},
            { type: alertConstants.ERROR, message: 'No data found for Tracks' }
          ]
          // await store.dispatch(viewsingleriskActions.getRisk(riskid, itemsPerRow))
          return store.dispatch(viewAllTracksActions.getTracks(pageNum, pageSize)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
          });
        });
    });

    describe("resetAllTracks", () => {
      it("creates RESET_ALL_TRACKS_SUCCESS when reset all Tracks has been done", () => {        
        const expectedActions = [
          { type: viewalltracksConstants.RESET_ALL_TRACKS },
          { type: viewalltracksConstants.RESET_ALL_TRACKS_SUCCESS },
          { type: 'ALERT_CLEAR' }
        ]
        store.dispatch(viewAllTracksActions.resetAllTracks())
        const actions = store.getActions();
        // console.log(actions)
        expect(store.getActions()).toEqual(expectedActions)
      });
    })
  });
