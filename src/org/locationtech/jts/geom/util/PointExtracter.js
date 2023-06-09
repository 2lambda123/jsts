import Point from '../Point.js'
import Collections from '../../../../../java/util/Collections.js'
import GeometryCollection from '../GeometryCollection.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
import GeometryFilter from '../GeometryFilter.js'
export default class PointExtracter {
  constructor() {
    PointExtracter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._pts = null
    const pts = arguments[0]
    this._pts = pts
  }
  static getPoints() {
    if (arguments.length === 1) {
      const geom = arguments[0]
      if (geom instanceof Point) 
        return Collections.singletonList(geom)
      
      return PointExtracter.getPoints(geom, new ArrayList())
    } else if (arguments.length === 2) {
      const geom = arguments[0], list = arguments[1]
      if (geom instanceof Point) 
        list.add(geom)
      else if (geom instanceof GeometryCollection) 
        geom.apply(new PointExtracter(list))
      
      return list
    }
  }
  filter(geom) {
    if (geom instanceof Point) this._pts.add(geom)
  }
  get interfaces_() {
    return [GeometryFilter]
  }
}
