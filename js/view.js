var view = {
   addProc: function(p){
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
      $('#procs').append($proc);

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
         $text.append($('<li>' + i + ' '+ type +'  <span class="pageframe">Frame: ' + p.pageTable[i].frame + '</span></li>'));

         /* Add info to memory */
         $mem = $('#memory #f' + p.pageTable[i].frame);
         $mem.css("background", "#"+color);
         $frametext = $('<div class="memtext">PID: ' + p.id + '  Type: ' + type + '  Page: ' + i + '</div>');

         $mem.append($frametext);
      }
   },

   removeProc: function(p){
      var $proc = $('#procs #pid' + p.id).remove();
      var $frame;
      for (var i=0; i < p.pageTable.length; i++){
         $('#memory #f' + p.pageTable[i].frame).css("background", "#abcdef");
         $frame = $('#memory #f' + p.pageTable[i].frame + ' .memtext').remove();
      }
   },

   movePage: function(p){

   },

   freeFrame: function(f){
      var $free = $('#free');
      var $frame = $('<li id="free' + f + '">' + f + '</li>');
      $free.prepend($frame);
   },

   unFreeFrame: function(f, page, proc){
   },
};

$(document).ready(function(){

});
