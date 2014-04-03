/** 
 * @file js/model.js This is the "model" of the model, view, controller system.
 * @author Matthew Shrider <mattshrider@gmail.com>
 */

/** 
* Model namespace for encapsulating the model data of the simulation.
* @namespace model
*/
var model = {
   /** constant for a ready process */
   READY: 0,
   /** constant for a sleeping process */
   SLEEP: 1,
   /** constant for a dead process */
   DEAD: 2,
   /** How large the pages are in bytes (Default: 512)*/
   pagesize: 512,
   /** The list of processes in the model */
   procs: [],
   /** A queue of all free frames **/
   freeFrames: [],
   /** An object representing physical memory */
   memory: {
      /** The size of physical memory */
      size: 4*1024,
      /** Amount of frames in memory */
      amount: 4*1024 / 512,
      /** A container for the frames in memory */
      frames: []
   },
   /**
    * @method addProc
    * Adds a process to the Process list
    * @param {Number} id The id of the process.
    * @param {Number} text The amount of bytes in the text segment.
    * @param {Number} data The amount of bytes in the data segment.
    * @returns p The Proc pointer which was just made.
    * @memberof model
    */
   addProc: function(id, text, data){
      var p = new model.Proc(id, text, data);
      if (model.freeFrames.length >= (p.textpages + p.datapages)){
         model.procs.push(p);
         console.log("Add>> pushed to model.procs ID: " + p.id);
         /* Proc callback for view (breaks strict MVC) */

         for (var i=0; i < p.pageTable.length; i++){
            var page = p.pageTable[i];
            var frame = model.freeFrames.shift();
            /* Tell view that frames were moved */
            //view.unFreeFrame(frame, page, p);
            /* Add the frame to the page */
            page.frame = frame;
            /* Add the page to memory */
            model.memory.frames[frame] = page;
            console.log("Add>frame>> pushed page to frame: " + frame);
         }

         view.addProc(p);
      } else {
         alert("Couldn't create a new proc as there weren't enough free frames");
         p=null;
      }
      return p;
   },

   /**
    * @method removeProc
    * Removes a process from the process list
    * @param {Number} id Which process id should be removed from the list.
    * @returns Proc The proc which was just "killed"
    * @memberof model
    */
   removeProc: function(id){
      for (var i=0; i < model.procs.length; ++i){
         if(model.procs[i].equals(id)){
            var p = model.procs.splice(i,1)[0];

            for(var j=p.pageTable.length-1; j >= 0; j--){
               var page = p.pageTable[j];
               var frame = page.frame;

               /* Add the frame back to the free frames */
               model.freeFrames.unshift(frame);
               /* Tell view to free frames */
               view.freeFrame(frame);
               view.removeProc(p);

               /* Remove the page from memory */
               model.memory.frames[frame] = null;
               console.log("Rem>>frame>> removed page from frame: " + frame);
            }

            return p;
         }
      }
   },
   
};

/** Initialize the free frames */
for (var i=0; i < model.memory.amount; ++i){
   model.freeFrames[i] = i;
   model.memory.frames[i] = null;
}

/** 
 * Represents a process in the simulation.
 * @constructor
 * @param {Number} id The process id.
 * @param {Number} text The size of the process text in bytes.
 * @param {Number} data The size of the process data in bytes.
 */
model.Proc = function(id, text, data){
   /** The id of the process. */
   this.id = id;
   /** How many bytes of text are in the process. */
   this.textsize = text;
   /** How many bytes of data are in the process. */
   this.datasize = data;
   /** The total amount of bytes for the process. */
   this.pagesize = model.pagesize;
   /** The amount of data pages in the process. */
   this.datapages = Math.ceil(this.datasize/this.pagesize);
   /** The amount of text pages in the process. */
   this.textpages = Math.ceil(this.textsize/this.pagesize);
   /** Array which represents the page table of the proc. */
   this.pageTable = [];
   /** A status flag for if the process is ready or waiting */
   this.status = model.READY;

   /* Creates the text pages for the process */
   var counter = this.textsize;
   for(var i=0; counter > 0; i++){
      if (counter > this.pagesize){
         this.pageTable.push(new model.Page('text', this.pagesize));
      } else {
         this.pageTable.push(new model.Page('text', counter));
      }
      counter -= this.pagesize;
      console.log("Add>>Page>>  Added new text page #:" + i);
   }

   /* Creates the data pages for the process */
   for(var i=this.pageTable.length, counter = this.datasize; counter > 0; i++){
      if (counter > this.pagesize){
         this.pageTable.push(new model.Page('data', this.pagesize));
      } else {
         this.pageTable.push(new model.Page('data', counter));
      }
      counter -= this.pagesize;
      console.log("Add>>Page>>  Added new data page #:" + i);
   }
};

/**
 * @method equals
 * A process is equal to another one if the id matches.
 * @param {Number} id The id to compare to this process id.
 * @returns {Boolean} this id == that id.
 * @instance
 * @memberof model.Proc
 */
model.Proc.prototype.equals = function(id){
   return this.id === id;
};


/**
 * Represents a page in logical memory.
 * @constructor
 * @param {String} type Either 'text' or 'data' page.
 * @param {Number} size The size of the page, upto {@link model.pagesize}.
 */
model.Page = function(type, size){
   this.type = type;
   this.size = size;
   /** {Number} Which frame this page is located in */
   this.frame = null;
};

/**
 * Represents a frame in physical memory.
 * @constructor
 * @param {Proc} proc The process which is filling the frame.
 * @param {Page} page Which page in logical memory the frame represents.
 */
model.Frame = function(proc, page){
   this.proc = proc;
   this.page = page;
};
