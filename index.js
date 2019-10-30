const defaultFactory = require('@rdfjs/dataset')
const defaultFormats = require('@rdfjs/formats-common')
const rdfFetchLite = require('@rdfjs/fetch-lite')

function rdfFetch (url, { factory = defaultFactory, formats = defaultFormats, ...options } = {}) {
  return rdfFetchLite(url, { factory, formats, ...options })
}

module.exports = rdfFetch
