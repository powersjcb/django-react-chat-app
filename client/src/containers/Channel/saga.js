import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'
import APIService from '../../api'


function* fetchChannels() {
  try {
    const query = ``
    const response = yield call(
      APIService.graphqlRequest,
      query,
    )
    const data = yield call([response, 'json'])
    if (response.status !== 200 || data.data.errors) {
      yield put({type: "FETCH_FAILED", errors: data.data.errors})
    } else {
      yield put({
        type: "FETCHED_CHANNELS",
        channels: data.data.channels
      })
    }
  } catch (error) {
    yield put({type: "FETCH_FAILED", errors: error.message})
  }
}

export default function* saga () {
  yield takeLatest("FETCH_CHANNELS", fetchChannels)
}