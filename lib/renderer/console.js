'use strict';

/**
 * @module Editor
 */
let Console = {};
module.exports = Console;

// requires
const Util = require('util');
const Ipc = require('./ipc');

// ==========================
// exports
// ==========================

/**
 * Log the normal message and show on the console.
 * The method will send ipc message `editor:renderer-console-log` to core.
 * @method log
 * @param {...*} [arg] - whatever arguments the message needs
 */
Console.log = function (text, ...args) {
  if ( args.length ) {
    text = Util.format.apply(Util, arguments);
  } else {
    text = '' + text;
  }
  console.log(text);
  Ipc.sendToMain('editor:renderer-console-log', text);
};

Console.success = function (text, ...args) {
  if ( args.length ) {
    text = Util.format.apply(Util, arguments);
  } else {
    text = '' + text;
  }
  console.log('%c' + text, 'color: green');
  Ipc.sendToMain('editor:renderer-console-success', text);
};

Console.failed = function (text, ...args) {
  if ( args.length ) {
    text = Util.format.apply(Util, arguments);
  } else {
    text = '' + text;
  }
  console.log('%c' + text, 'color: red');
  Ipc.sendToMain('editor:renderer-console-failed', text);
};

Console.info = function (text, ...args) {
  if ( args.length ) {
    text = Util.format.apply(Util, arguments);
  } else {
    text = '' + text;
  }
  console.info(text);
  Ipc.sendToMain('editor:renderer-console-info', text);
};

Console.warn = function (text, ...args) {
  if ( args.length ) {
    text = Util.format.apply(Util, arguments);
  } else {
    text = '' + text;
  }
  console.warn(text);
  Ipc.sendToMain('editor:renderer-console-warn', text);
};

Console.error = function (text, ...args) {
  if ( args.length ) {
    text = Util.format.apply(Util, arguments);
  } else {
    text = '' + text;
  }
  console.error(text);

  let e = new Error('dummy');
  let lines = e.stack.split('\n');
  text = text + '\n' + lines.splice(2).join('\n');

  Ipc.sendToMain('editor:renderer-console-error',text);
};