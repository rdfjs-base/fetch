# @rdfjs/fetch

[![Build Status](https://travis-ci.org/rdfjs-base/fetch.svg?branch=master)](https://travis-ci.org/rdfjs-base/fetch)

[![npm version](https://img.shields.io/npm/v/@rdfjs/fetch.svg)](https://www.npmjs.com/package/@rdfjs/fetch)

Wrapper for fetch to simplify sending and retrieving RDF data.

Since version 3.0, this packages is [ESM](https://nodejs.org/api/esm.html) only.
Check version 2.x if you are looking for a CommonJS package.

## Usage

The package exports a `fetch` function which wraps the request and response object for on-the-fly RDF quad processing.
The function accepts the same parameters as [fetch](https://fetch.spec.whatwg.org/) and some additional options.
It also provides extra methods.

### Options

The `options` object accepts the following additional parameters:

- `formats`: A [formats-common](https://github.com/rdfjs-base/formats-common)-compatible object which contains a set of parsers and serializers.
  By default [formats-common](https://github.com/rdfjs-base/formats-common) is used.
- `factory`: The factory which will be used to create a Dataset when `dataset()` is called.
  By default [@rdfjs/dataset](https://github.com/rdfjs-base/dataset) is used.
- `fetch`: An alternative fetch implementation.
  By default [nodeify-fetch](https://github.com/bergos/nodeify-fetch) is used.

The following `options` influence the logic of RDF quad processing: 

- `headers.accept`: The accept header field will be automatically set base on the list of available parsers from the `formats` object.
  If it's already set it will not be overwritten.
  This can be useful when only a subset of the available parsers should be used. 
- `headers.content-type`: When the request has a body, this header field will be automatically set to use matching media type for the corresponding serializer.
  By setting this field manually a specific serializer can be enforced.
- `body`: If the request should send quads, the quads must be given either as a stream or as an iterable like a [DatasetCore](https://rdf.js.org/dataset-spec/#datasetcore-interface) object.
  Iterables will be converted to streams before they are handed over to the serializer.

### Response

The following methods are attached to the standard fetch response object:

- async `quadStream()`: This method returns the quads of the response as stream.
  The parser is selected based on the content type header field.
- async `dataset()`: This method uses the `quadStream()` method to parse the content and will pipe it into a dataset, which is also the return value.

### Example

This example fetches the RDF Schema vocab and loops over all quad using the dataset API.
For all `rdfs:label` quads the object value is written to the console.

```javascript
import fetch from '@rdfjs/fetch'

const label = 'http://www.w3.org/2000/01/rdf-schema#label'

fetch('http://www.w3.org/2000/01/rdf-schema')
  .then(res => res.dataset())
  .then(dataset => {
    for (const quad of dataset) {
      if (quad.predicate.value === label) {
        console.log(`${quad.subject.value}: ${quad.object.value}`)
      }
    }
  })
  .catch(err => console.error(err))
```
