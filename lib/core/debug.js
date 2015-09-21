/*
  _   _ _____ _   _  ____ _____   _
 | | | | ____| \ | |/ ___| ____| (_) ___
 | |_| |  _| |  \| | |   |  _|   | |/ _ \
 |  _  | |___| |\  | |___| |___ _| | (_) |
 |_| |_|_____|_| \_|\____|_____(_)_|\___/

*/
/**
 * @module hence-debug
 */
/**
 * @external Polymer
 */

let HenceDebug = ()=> {
  return {
    /**
     * A simple way to debug the component by pooling it's current property values and displaying them as a JSON
     * stringify'd
     *
     * @param {Boolean} stringify Whether or not to return a string or the object
     * @returns {String|Object} JSON string output of the component
     */
      debugThis(stringify = false) {
      let self = this;
      let data = {};

      this._propList.forEach((propertyName)=> {
        data[propertyName] = self.get(propertyName);
      });

      return stringify ? JSON.stringify(data) : data;
    }
  };
};

export default HenceDebug;
