import defaultFactory from '@rdfjs/dataset'
import rdfFetchLite, { Headers } from '@rdfjs/fetch-lite'
import defaultFormats from '@rdfjs/formats-common'

function rdfFetch (url, { factory = defaultFactory, formats = defaultFormats, ...options } = {}) {
  return rdfFetchLite(url, { factory, formats, ...options })
}

export {
  rdfFetch as default,
  defaultFormats,
  Headers
}
