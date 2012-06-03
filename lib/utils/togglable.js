/// togglable.js --- Basis for togglable elements
//
// Copyright (c) 2012 Quildreen Motta
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/// Module jsk.utils.togglable /////////////////////////////////////////


//// == Dependencies ===================================================
var Eventful     = require('ekho').Eventful
var presentation = require('moros/src/presentation')



//// == Core services ==================================================

///// Object Togglable <| Eventful
//
// Manages sets of togglable elements.
//
// Togglable :: { "targets" -> [HTMLElement] }
var Togglable = Eventful.derive({

  ////// Function init
  // Initialises a ``Togglable`` instance.
  //
  // init! :: @this:Object*, Eventful, [HTMLElement] -> this
  init:
  function _init(parent, targets) {
    Eventful.init.call(this, parent)
    this.targets = targets || []
    this.trigger('created')
    return this }


  ////// Function show
  // Displays all togglable targets.
  //
  // show! :: @this:Object* -> this
, show:
  function _show() {
    presentation.classes_add(this.targets, 'active')
    this.trigger('shown')
    return this }


  ////// Function hide
  // Hides all togglable targets.
  //
  // hide! :: @this:Object* -> this
, hide:
  function _hide() {
    presentation.classes_remove(this.targets, 'active')
    this.trigger('hidden')
    return this }
})



//// == Exports ========================================================
module.exports = { Togglable: Togglable }