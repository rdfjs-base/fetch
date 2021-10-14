import { strictEqual } from 'assert'
import rdf from '@rdfjs/dataset'
import SinkMap from '@rdfjs/sink-map'
import { describe, it } from 'mocha'
import nock from 'nock'
import rdfFetch from '../index.js'

describe('@rdfjs/fetch', () => {
  it('should be a function', () => {
    strictEqual(typeof rdfFetch, 'function')
  })

  it('should return a Promise', () => {
    const result = rdfFetch('http://example.org/')

    strictEqual(typeof result, 'object')
    strictEqual(typeof result.then, 'function')
  })

  it('should use formats common as default formats', async () => {
    let accept = null

    nock('http://example.org')
      .get('/formats-common')
      .reply(200, function () {
        accept = this.req.headers.accept

        return [200, '{}']
      })

    await rdfFetch('http://example.org/formats-common')

    const mediaTypes = [
      'application/ld+json',
      'application/trig',
      'application/n-quads',
      'application/n-triples',
      'text/n3',
      'text/turtle'
    ]

    mediaTypes.forEach(mediaType => {
      strictEqual(accept.includes(mediaType), true)
    })
  })

  it('should support custom formats', async () => {
    let accept = null

    nock('http://example.org')
      .get('/formats-options')
      .reply(200, function () {
        accept = this.req.headers.accept

        return [200, '{}']
      })

    const customFormats = {
      parsers: new SinkMap([
        ['application/ld+json', { parse: () => {} }],
        ['text/turtle', { parse: () => {} }]
      ])
    }

    await rdfFetch('http://example.org/formats-options', {
      formats: customFormats
    })

    strictEqual(accept, 'application/ld+json, text/turtle')
  })

  it('should use @rdfjs/dataset as default factory', async () => {
    nock('http://example.org')
      .get('/factory-default')
      .reply(200, '', { 'content-type': 'application/n-triples' })

    const res = await rdfFetch('http://example.org/factory-default')
    const dataset = await res.dataset()

    strictEqual(dataset instanceof rdf.dataset().constructor, true)
  })

  it('should support custom factory', async () => {
    class CustomDataset {}
    const customFactory = {
      dataset: () => {
        return new CustomDataset()
      }
    }

    nock('http://example.org')
      .get('/factory-custom')
      .reply(200, '', { 'content-type': 'application/n-triples' })

    const res = await rdfFetch('http://example.org/factory-custom', {
      factory: customFactory
    })
    const dataset = await res.dataset()

    strictEqual(dataset instanceof CustomDataset, true)
  })
})
