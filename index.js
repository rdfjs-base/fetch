const defaultFactory = require('@rdfjs/dataset')
const defaultFormats = require('@rdfjs/formats-common')
const rdfFetchLite = require('@rdfjs/fetch-lite')

function rdfFetch (url, { factory = defaultFactory, formats = defaultFormats, ...options } = {}) {
  return rdfFetchLite(url, { factory, formats, ...options })
}

rdfFetch.Headers = rdfFetchLite.Headers

module.exports = rdfFetch
