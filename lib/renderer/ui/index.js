﻿'use strict';

/**
 * @module UI
 */
let UI = {};
module.exports = UI;

UI.DomUtils = require('./utils/dom-utils');
UI.PolymerUtils = require('./utils/polymer-utils');
UI.ResUtils = require('./utils/res-utils');
UI.DockUtils = require('./utils/dock-utils');
UI.DragDrop = require('./utils/drag-drop-utils');

UI.Resizable = require('./behaviors/resizable');
UI.focusable = require('./behaviors/focusable'); // TODO: Focusable ??
UI.Droppable = require('./behaviors/droppable');
UI.Dockable = require('./behaviors/dockable');

UI.DockResizer = require('./dock/resizer');
UI.Dock = require('./dock/dock');
UI.MainDock = require('./dock/main-dock');
UI.Tab = require('./panel/tab');
UI.Tabs = require('./panel/tabs');
UI.Panel = require('./panel/panel');

UI.WebView = require('./webview/webview');

// registry
[
  UI.DockResizer,
  UI.Dock,
  UI.MainDock,
  UI.Tab,
  UI.Tabs,
  UI.Panel,
  UI.WebView
].forEach(ctor => {
  document.registerElement(ctor.tagName, ctor);
});

// load and cache css
UI.ResUtils.loadStylesheets([
  // dock ui
  'editor-framework://lib/renderer/ui/css/resizer.css',
  'editor-framework://lib/renderer/ui/css/tab.css',
  'editor-framework://lib/renderer/ui/css/tabs.css',
  'editor-framework://lib/renderer/ui/css/dock.css',
  'editor-framework://lib/renderer/ui/css/panel.css',
]);

document.onreadystatechange = () => {
  if ( document.readyState === 'interactive' ) {
    const Path = require('fire-path');

    // NOTE: we don't use url such as editor-framework://lib/renderer/ui/css/common.css
    // that will cause a crash if we frequently open and close window
    const dir = Editor.url('editor-framework://lib/renderer/ui/css/');
    const cssList = [
      // common header
      Path.join(dir,'common.css'),
      Path.join(dir,'layout.css'),
      Path.join(dir,'font-face.css'),
    ];
    cssList.forEach(url => {
      let link = document.createElement('link');
      link.setAttribute( 'type', 'text/css' );
      link.setAttribute( 'rel', 'stylesheet' );
      link.setAttribute( 'href', url );

      document.head.insertBefore(link, document.head.firstChild);
    });
  }
};