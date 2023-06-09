
import expect from 'expect.js'

import WKTReader from '../../../src/org/locationtech/jts/io/WKTReader.js'
import PrecisionModel from '../../../src/org/locationtech/jts/geom/PrecisionModel.js'
import GeometryFactory from '../../../src/org/locationtech/jts/geom/GeometryFactory.js'
import SimpleMinimumClearance from '../../../src/org/locationtech/jts/precision/SimpleMinimumClearance.js'

describe('SimpleMinimumClearance', function() {
  var pmFloat = new PrecisionModel()
  var gfFloat = new GeometryFactory(pmFloat, 0)
  var reader = new WKTReader(gfFloat)

  it('distance Polygon basic', function() {
    var g = reader.read('POLYGON (( 0 0, 0 1, 1 1, 1 0, 0 0 ))')
    var distance = SimpleMinimumClearance.getDistance(g)
    expect(distance).to.equal(1)
  })

  it('distance Collection basic', function() {
    var g = reader.read('GEOMETRYCOLLECTION( POINT(4 6), LINESTRING(4 6, 7 10) )')
    var distance = SimpleMinimumClearance.getDistance(g)
    expect(distance).to.equal(5)
  })
})
