import expect from 'expect.js'

import WKTReader from '../../../src/org/locationtech/jts/io/WKTReader.js'
import RelateOp from '../../../src/org/locationtech/jts/operation/relate/RelateOp.js'

describe('Test (#295)', function() {
  const reader = new WKTReader()
  const ls1 = reader.read('LINESTRING(0 0, 1 1)')
  const ls2 = reader.read('LINESTRING(0 1, 1 0)')

  it('RelateOp.relate should produce 0F1FF0102', function() {
    const result = RelateOp.relate(ls1, ls2).toString()
    expect(result).to.eql('0F1FF0102')
  })
})
