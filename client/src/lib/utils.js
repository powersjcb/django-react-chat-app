import moment from 'moment'

export const utcTimestamp = () => {
  // matches python datetime.isoformat
  return moment.utc().format('YYYY-MM-DDTHH:MM:SS.mmmmmmZ')
}

