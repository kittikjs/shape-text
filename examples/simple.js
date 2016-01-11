"use strict";

const Text = require('../lib/Text').default;
const cursor = require('kittik-cursor').Cursor.create().resetTTY();

Text.create({text: 'Hello, there!', x: 'center', y: 5, underlined: true}).render(cursor);
Text.create({text: 'It is a simple text shape', x: 'center', y: 7, bold: true}).render(cursor);
Text.create({text: 'If you see this, it works', x: 'center', y: 9, reverse: true}).render(cursor);
Text.create({text: 'Also\nyou\ncan\nwrite\nmulti-lines', x: 'center', y: 15, dim: true}).render(cursor);

cursor.flush();
