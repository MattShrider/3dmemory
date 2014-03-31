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
                     console.log(e);
                     console.log(content);
                     //TODO - do something with the content here
                     $('#output').append("<p>Read filename: " + f.name + "</p>");
                     $('#output').append("<div id='" + f.name +"'><p>" + content + "</p></div>");
                  };
               })(f);

               r.readAsText(f);
            }
         }

      }
   },


};

/* Add the file handler to the input element */
$(function() {
   $('#files').on('change', controller.loadFile);
});
