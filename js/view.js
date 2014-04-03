/** 
 * @file js/view.js This file contains the functions for adding and removing from
 * the front-facing website.
 * @author Matthew Shrider <mattshrider@gmail.com>
 */

/** 
* View namespace for wrapping up GUI helpers/functions.
* @namespace view
*/
var view = {
   /**
    * @method addProc
    * Adds a process to the GUI
    * @param {Proc} p The process object containg all of the data to add to the GUI
    * @memberof view
    */
   addProc: function(p){
      /* Find a random color and convert it to a HEX code */
      var color = Math.floor((Math.random() * 0.5 + 0.5)*16777215).toString(16);
      var $proc = $('<li id="pid' + p.id + '"class="block" style="background: #' + color + '">' +
                    '<span class="center">Proc ID: ' + p.id + '</span>' +
                    '<span class="header">Pages:</span>' +
                    '<div class="pagecontainer">' +
                    '<ul class="text">' +
                    '</ul>' +
                    '<ul class="data">' +
                    '</ul>' +
                    '</div>' +
                    '</li>');
      $('#procs').append($proc.hide().fadeIn(300));

      var $text;
      var $mem;
      var $frametext;
      var type;
      var $free;

      /* Add text to the page's frame */
      for (var i=0; i < p.pageTable.length; i++){
         $free = $('#free li').first().remove();
         type = p.pageTable[i].type;
         if (type === 'text'){
            $text = $proc.find('.text');
         } else {
            $text = $proc.find('.data');
         }
         $text.append($('<li>' + i + ' '+ type +'  <span class="pageframe">Frame: ' + p.pageTable[i].frame + '</span></li>').hide().fadeIn(500));

         /* Add info to memory */
         $mem = $('#memory #f' + p.pageTable[i].frame);
         $mem.css("background", "#"+color);
         var textcolor;
         if (type === 'text'){
            textcolor="#FEEBE1";
         } else {
            textcolor="#E1FEFC";
         }
         $frametext = $('<div style="background: '+textcolor+'" class="memtext">PID: ' + p.id + '  Page: ' + i + '  Type: ' + type + '</div>');

         $mem.append($frametext.hide().fadeIn(300));
      }
   },

   /**
    * @method removeProc
    * Removes a process from the GUI
    * @param {Proc} p The process object containg all of the data to remove from the GUI
    * @memberof view
    */
   removeProc: function(p){
      $('#procs #pid' + p.id).fadeOut(200, function(){this.remove();});
      var $frame;
      for (var i=0; i < p.pageTable.length; i++){
         $('#memory #f' + p.pageTable[i].frame).css("background", "#abcdef");
         $frame = $('#memory #f' + p.pageTable[i].frame + ' .memtext').remove();
      }
   },

   /**
    * @method freeFrame
    * Adds new free frames to the Free Frame list
    * @param {Number} f Which frame was just freed
    * @memberof view
    */
   freeFrame: function(f){
      var $free = $('#free');
      var $frame = $('<li id="free' + f + '">' + f + '</li>');
      $free.prepend($frame);
   },

};

/* Will be ran when the site has loaded, useful for animations */
$(document).ready(function(){

});
