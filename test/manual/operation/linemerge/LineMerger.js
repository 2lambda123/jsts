import expect from 'expect.js'

import WKTReader from '../../../../src/org/locationtech/jts/io/WKTReader.js'
import WKTWriter from '../../../../src/org/locationtech/jts/io/WKTWriter.js'
import LineMerger from '../../../../src/org/locationtech/jts/operation/linemerge/LineMerger.js'

describe('LineMerger', function() {
  it('#373', function() {
    const reader = new WKTReader()
    const ls1 = reader.read('LINESTRING(0 0, 1 1)')
    const ls2 = reader.read('LINESTRING(1 1, 2 2)')
    const lineMerger = new LineMerger()
    lineMerger.add(ls1)
    lineMerger.add(ls2)
    lineMerger.merge()
    const mergedLineStrings = lineMerger.getMergedLineStrings()
    const mergedLineString = mergedLineStrings.get(0)
    const writer = new WKTWriter()
    const result = writer.write(mergedLineString)
    expect(result).to.equal('LINESTRING (0 0, 1 1, 2 2)')
  })
})
