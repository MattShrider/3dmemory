/** 
 * @file js/controller.js This is the "controller" of the model.  This file will
 *    start and stop the simulation, as well as create/remove pages and procs,
 *    and generally control the simulation.  It will also serve as a bridge between
 *    view and model.
 * @author Matthew Shrider <mattshrider@gmail.com>
 */

/** 
 * Namespace for controlling the simulation and interacting with the view.
 * @namespace controller
 */
var controller = {
   /**
    * @method loadFile
    * Reads the contents of a track tape into the simulation.
    * @param {String} path The path of the file (from an event).
    * @memberof controller
    */
   loadFile: function(id, text, data){
      this.procs[this.procs.length] = new this.Proc(id, text, data);
   },
};
