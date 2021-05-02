import { viewalltracksConstants } from '../_constants';

function millToMinSec(ms){
  var min = Math.floor((ms/1000/60) << 0)
  var sec = Math.floor((ms/1000/60) % 60)
  var duration = min + 'm:' + sec + 's'
  return duration
}

function appendCurrencySymbol(curvalue) {
  if (arguments.length === 0) {
    return null
  }
  var floatVal = parseFloat(curvalue)
  return '$ ' + floatVal.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
}

function sliceString(strToSlice, numChars) {
    var slicedString = ''
    if(strToSlice)
        slicedString = strToSlice.slice(0,numChars)
    return slicedString
}
function createTrackTableRow(trackinstance) {
  var tracksTableRow = {}
  // console.log('Inside createTrackTableRow' + trackinstance)
  tracksTableRow['id'] = trackinstance.id
  tracksTableRow['name'] = trackinstance.name
  tracksTableRow['album'] = trackinstance.album_title
  tracksTableRow['composer'] = sliceString(trackinstance.composer,15)
  tracksTableRow['unit_price'] = appendCurrencySymbol(trackinstance.unit_price)
  tracksTableRow['duration'] = millToMinSec(trackinstance.milliseconds)
  tracksTableRow['mb'] = Math.floor((trackinstance.bytes/1000000) << 0)
  tracksTableRow['genre_name'] = sliceString(trackinstance.genre_name,10)
  tracksTableRow['media_name'] = sliceString(trackinstance.media_name,15)

  return tracksTableRow
}

export function viewalltracks(state = {}, action) {
  switch (action.type) {
    case viewalltracksConstants.GET_ALL_TRACKS:
      return {
        loading: true
    };
    case viewalltracksConstants.GET_ALL_TRACKS_SUCCESS:
      console.log('In viewalltracksConstants.GET_ALL_TRACKS_SUCCESS')
      // console.log('In viewalltracksConstants.GET_ALL_TRACKS_SUCCESS action is' + action.trackinstances)
      let trackinstances = action.trackinstances.results
      let tracksInstancesTable = []
      if(trackinstances)
        tracksInstancesTable = trackinstances.map(createTrackTableRow)
      let tracksInstanceTableColumns = [
                                      { label: "ID", width: 70, prop: "id" },
                                      { label: "Track", width: 200, prop: "name" },
                                      { label: "Album", width: 200, prop: "album" },
                                      { label: "Composer", width: 170, prop: "composer" },
                                      { label: "Price", width: 100, prop: "unit_price" },
                                      { label: "Duration", width: 100, prop: "duration" },
                                      { label: "Size(MB)", prop: "mb" },
                                      { label: "Genre", width: 120, prop: "genre_name" },
                                      { label: "Media", width: 150, prop: "media_name" }
                                    ]
      return {
        tracksInstancesTable: tracksInstancesTable,
        tracksInstanceTableColumns: tracksInstanceTableColumns,
        next: action.trackinstances.next,
        previous:  action.trackinstances.previous,
        count: action.trackinstances.count,
        loading: false
      };
    case viewalltracksConstants.GET_ALL_TRACKS_FAILURE:
      return {
        error: action.error,
        loading: false
    };
    case viewalltracksConstants.RESET_ALL_TRACKS:
      return {
          loading: true
      };
    case viewalltracksConstants.RESET_ALL_TRACKS_SUCCESS:
      console.log('In viewalltracksConstants.RESET_ALL_TRACKS')
      tracksInstancesTable = []
      tracksInstanceTableColumns = []
      return {
        tracksInstancesTable: tracksInstancesTable,
        columnNames: tracksInstanceTableColumns,
        loading: false
      };
    case viewalltracksConstants.RESET_ALL_TRACKS_FAILURE:
      return {
          error: action.error,
          loading: false
      };
    default:
      return state
  }
}
