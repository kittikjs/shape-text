"use strict";

const Text = require('../lib/Text').default;
const cursor = require('kittik-cursor').Cursor.create().resetTTY();

Text.create({text: 'Hello, there!', x: 20, y: 1, underlined: true}).render(cursor);
Text.create({text: 'It is a simple text shape', x: 20, y: 3, bold: true}).render(cursor);
Text.create({text: 'If you see this, it works', x: 20, y: 5, reverse: true}).render(cursor);

cursor.flush();
