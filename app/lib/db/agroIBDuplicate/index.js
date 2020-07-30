const { Pool , types} = require('pg')
const dbConfig = require('./config')
var moment = require('moment');

const parseDate = val => val === null ? null : moment(val).format('YYYY-MM-DD hh:mm:ss')

types.setTypeParser(1082, parseDate)
types.setTypeParser(1114, parseDate)
types.setTypeParser(1184, parseDate)

const pool = new Pool(dbConfig)

module.exports = {
  pool
}
