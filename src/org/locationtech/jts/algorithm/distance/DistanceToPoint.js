import LineString from '../../geom/LineString.js'
import Geometry from '../../geom/Geometry.js'
import Coordinate from '../../geom/Coordinate.js'
import Polygon from '../../geom/Polygon.js'
import LineSegment from '../../geom/LineSegment.js'
import PointPairDistance from './PointPairDistance.js'
import GeometryCollection from '../../geom/GeometryCollection.js'
export default class DistanceToPoint {
  static computeDistance() {
    if (arguments[2] instanceof PointPairDistance && (arguments[0] instanceof LineString && arguments[1] instanceof Coordinate)) {
      const line = arguments[0], pt = arguments[1], ptDist = arguments[2]
      const tempSegment = new LineSegment()
      const coords = line.getCoordinates()
      for (let i = 0; i < coords.length - 1; i++) {
        tempSegment.setCoordinates(coords[i], coords[i + 1])
        const closestPt = tempSegment.closestPoint(pt)
        ptDist.setMinimum(closestPt, pt)
      }
    } else if (arguments[2] instanceof PointPairDistance && (arguments[0] instanceof Polygon && arguments[1] instanceof Coordinate)) {
      const poly = arguments[0], pt = arguments[1], ptDist = arguments[2]
      DistanceToPoint.computeDistance(poly.getExteriorRing(), pt, ptDist)
      for (let i = 0; i < poly.getNumInteriorRing(); i++) 
        DistanceToPoint.computeDistance(poly.getInteriorRingN(i), pt, ptDist)
      
    } else if (arguments[2] instanceof PointPairDistance && (arguments[0] instanceof Geometry && arguments[1] instanceof Coordinate)) {
      const geom = arguments[0], pt = arguments[1], ptDist = arguments[2]
      if (geom instanceof LineString) {
        DistanceToPoint.computeDistance(geom, pt, ptDist)
      } else if (geom instanceof Polygon) {
        DistanceToPoint.computeDistance(geom, pt, ptDist)
      } else if (geom instanceof GeometryCollection) {
        const gc = geom
        for (let i = 0; i < gc.getNumGeometries(); i++) {
          const g = gc.getGeometryN(i)
          DistanceToPoint.computeDistance(g, pt, ptDist)
        }
      } else {
        ptDist.setMinimum(geom.getCoordinate(), pt)
      }
    } else if (arguments[2] instanceof PointPairDistance && (arguments[0] instanceof LineSegment && arguments[1] instanceof Coordinate)) {
      const segment = arguments[0], pt = arguments[1], ptDist = arguments[2]
      const closestPt = segment.closestPoint(pt)
      ptDist.setMinimum(closestPt, pt)
    }
  }
}
