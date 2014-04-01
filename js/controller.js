/* global model:false */
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
   /** How many files have been loaded into the program */
   filesRead: 0,
   /** A queue of events which represent the entire simulation */
   simulationQueue: [],
   /* TODO - create "sim" objects which can be used to create/remove from the simulation in order */
   /**
    * @method loadFile
    * Reads the contents of a track tape into the simulation.
    * @param {Event} evt The event object of a fileinput object.
    * @event
    * @memberof controller
    */
   loadFile: function(evt){
      if (!window.FileReader || !window.File || !window.FileList){
         alert("You don't have access to the FileReader object.  " +
               "Thus you will not be able to open text files.  " +
               "Please upgrade your browser for HTML5!");
      } else {
         var files = evt.target.files;
         if (files){
            for (var i=0, f; (f=files[i]); i++){
               var r = new FileReader();
               r.onload = (function(f) {
                  return function(e){
                     var content = e.target.result;
                     controller.parseFile(content);
                  };
               })(f);

               r.readAsText(f);
            }
         }

      }
   },

   /**
    * @method parseFile
    * Takes the content of a track tape and converts it into objects in the model.
    *    This function uses a regex to test for patterns in the input.
    * @param {String} str The contents of a loaded file.
    * @memberof controller
    */
   parseFile: function(str){
      var lines = str.split("\n");
      var createRegEx = /^(\d+) (\d+) (\d+)/i;
      var haltRegEx = /^(\d+) Halt/i;
      var matched;
      for (var i=0; i<lines.length; ++i){
         /* Test our input against a create call */
         if ((matched = lines[i].match(createRegEx)) !== null){
            //matched[1] == pid, [2] == text, [3] == data
            console.log(matched);
            /* push a sim object to the queue for adding a proc */
            controller.simulationQueue.push({
               id: matched[1],
               type: "add",
               text: matched[2],
               data: matched[3]
            });
         }
         /* Test our input against a HALT call */
         if ((matched = lines[i].match(haltRegEx)) !== null){
            //matched[1] captures the pid
            console.log(matched);
            /* push a sim object to the queue for removing a proc */
            controller.simulationQueue.push({
               id: matched[1],
               type: "halt",
               text: 0,
               data: 0
            });
         }
         //TODO - interact with the view.
         console.log(controller.simulationQueue);
      }
   },


};

/* Add the file handler to the input element */
$(function() {
   $('#files').on('change', controller.loadFile);
});
