import { strictEqual } from 'assert'
import { describe, it } from 'mocha'
import { defaultFormats } from '../index.js'

describe('defaultFormats', () => {
  it('should be an object', () => {
    strictEqual(typeof defaultFormats, 'object')
  })

  it('should implement the formats interface', () => {
    strictEqual(typeof defaultFormats.parsers, 'object')
    strictEqual(typeof defaultFormats.serializers, 'object')
  })
})
