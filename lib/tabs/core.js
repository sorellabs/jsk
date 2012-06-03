/// core.js --- Core behaviours for JSK tabs
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

/// Module jsk.tabs.core ///////////////////////////////////////////////

//// == Dependencies ===================================================
var ekho         = require('ekho')
var with_silence = ekho.with_silence
var Eventful     = ekho.Eventful
var Togglable    = require('../utils/togglable').Togglable


//// == Helpers ========================================================

///// Function not_equal_p
// Checks if an object isn't stricly equal to another
//
// not-equal? :: a -> b -> Bool
function not_equal_p(x){ return function(y) {
  return x !== y }}

///// Function invoke
// Invokes the given method on the subject.
//
// invoke! :: String -> a -> b
function invoke(method){ return function(subject) {
  return subject[method].apply(subject, arguments) }}


//// == Public API =====================================================

///// Object Tab <| Togglable
var Tab = Togglable.derive({
  init:
  function _init(parent, tab, content) {
    Togglable.init.call(this, parent, [tab, content])

    this.tab     = tab
    this.content = content

    if (parent)  parent.add(this)
    this.trigger('created')
    return this }
})


///// Object Group <| Eventful
var Group = Eventful.derive({
  init:
  function _init(parent, tabs) {
    Eventful.init.call(this, parent)

    this.tabs = tabs || []
    this.setup_events()

    return this }

, add:
  function _add() {
    this.tabs.push.apply(this.tabs, arguments)
    return this }

, activate:
  function _activate(tab) {
    this.tabs.filter (not_equal_p(tab))
             .forEach(invoke('hide'))
    this.trigger('activated', tab)
    return this }

, setup_events:
  function _setup_events() {
    var activate = this.activate.bind(this)

    this.on('shown', function() {
                       activate(this) })

    return this }
})


//// == Exports ========================================================
module.exports = { Tab   : Tab
                 , Group : Group }