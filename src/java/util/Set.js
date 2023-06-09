import Collection from './Collection.js'

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Set.html
 *
 * @extends {Collection}
 * @constructor
 * @private
 */
export default class Set extends Collection {
  /**
   * Returns true if this set contains the specified element. More formally,
   * returns true if and only if this set contains an element e such that (o==null ?
   * e==null : o.equals(e)).
   * @param {Object} e
   * @return {boolean}
   */
  contains() { }
}
