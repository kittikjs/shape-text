"use strict";

const Text = require('../lib/Text').default;
const cursor = require('kittik-cursor').Cursor.create().resetTTY();

Text.create({text: 'Hello, there!', x: 20, y: 1, underlined: true}).render(cursor);
cursor.flush();
