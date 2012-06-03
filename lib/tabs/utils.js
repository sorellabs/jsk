/// utils.js --- Utilities for generating Tab/Group artifacts
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

/// Module jsk.tabs.utils

module.exports = function(engine) {

  //// == Dependencies =================================================
  var core  = require('./core')
  var moros = require('moros')(engine)


  //// == Aliases ======================================================
  var slice = [].slice


  //// == Helpers ======================================================
  function link_target_id(tab) {
    var id = (tab.getAttribute('href') || '').match(/#(.*)/)
    return id && id[1] }


  //// == Core implementation ==========================================
  function target(tab) {
    var id = link_target_id(tab) || tab.getAttribute('data-target')
    return moros.query('#' + id)[0] }


  function find_tabs(element) {
    return moros.query( '.tab-list a[href*="#"], .tab-list [data-target]'
                      , element ) }


  function make_tabs(group, xs) {
    return moros.map(xs, function(x) {
                           return core.Tab.make(group, x, target(x)) })}


  function make_groups(parent, xs) {
    return moros.map(xs, function(x) {
                           moros.classes_add(x, 'jskp-tabgroup')
                           var group = core.Group.make(parent)
                           var tabs  = make_tabs(group, find_tabs(x))
                           return group })}


  //// == Exports () ===================================================
  return { find_tabs   : find_tabs
         , make_tabs   : make_tabs
         , make_groups : make_groups
         , target      : target }
}