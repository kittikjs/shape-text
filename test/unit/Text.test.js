import { assert } from 'chai';
import sinon from 'sinon';
import Text from '../../src/Text';
import Cursor from 'kittik-cursor';

describe('Shape::Text', () => {
  it('Should properly create Text instance', () => {
    const text = new Text();
    assert.instanceOf(text, Text);
  });

  it('Should properly get actual width of the shape', () => {
    const text = new Text({text: 'test'});
    assert.equal(text.getWidth(), 4);
  });

  it('Should properly get actual height of the shape', () => {
    const text = new Text({text: 'test'});
    assert.equal(text.getHeight(), 1);
  });

  it('Should properly get/set bold mode', () => {
    const text = new Text();
    assert.notOk(text.isBold());
    assert.instanceOf(text.setBold(true), Text);
    assert.ok(text.isBold());
  });

  it('Should properly get/set dim mode', () => {
    const text = new Text();
    assert.notOk(text.isDim());
    assert.instanceOf(text.setDim(true), Text);
    assert.ok(text.isDim());
  });

  it('Should properly get/set underlined mode', () => {
    const text = new Text();
    assert.notOk(text.isUnderlined());
    assert.instanceOf(text.setUnderlined(true), Text);
    assert.ok(text.isUnderlined());
  });

  it('Should properly get/set blink mode', () => {
    const text = new Text();
    assert.notOk(text.isBlink());
    assert.instanceOf(text.setBlink(true), Text);
    assert.ok(text.setBlink());
  });

  it('Should properly get/set reverse mode', () => {
    const text = new Text();
    assert.notOk(text.isReverse());
    assert.instanceOf(text.setReverse(true), Text);
    assert.ok(text.isReverse());
  });

  it('Should properly get/set hidden mode', () => {
    const text = new Text();
    assert.notOk(text.isHidden());
    assert.instanceOf(text.setHidden(true), Text);
    assert.ok(text.isHidden());
  });

  it('Should properly throw exception if align is not supported', () => {
    const text = new Text();
    assert.throws(() => text.setAlign('wrong'), Error, 'Unknown align option: wrong');
  });

  it('Should properly get/set align', () => {
    const text = new Text();
    assert.equal(text.getAlign(), 'center');
    assert.instanceOf(text.setAlign('right'), Text);
    assert.equal(text.getAlign(), 'right');
  });

  it('Should properly render with default options', () => {
    const cursor = Cursor.create();
    const text = new Text();
    const mock = sinon.mock(cursor);

    mock.expects('foreground').never();
    mock.expects('background').never();
    mock.expects('bold').once().withArgs(false).returns(cursor);
    mock.expects('dim').once().withArgs(false).returns(cursor);
    mock.expects('underlined').once().withArgs(false).returns(cursor);
    mock.expects('blink').once().withArgs(false).returns(cursor);
    mock.expects('reverse').once().withArgs(false).returns(cursor);
    mock.expects('hidden').once().withArgs(false).returns(cursor);
    mock.expects('moveTo').once(10, 10).returns(cursor);
    mock.expects('write').once().withArgs('');

    text.render(cursor);

    mock.verify();
  });

  it('Should properly render with text align to left', () => {
    const cursor = Cursor.create();
    const text = new Text({align: 'left'});
    const mock = sinon.mock(cursor);

    mock.expects('foreground').never();
    mock.expects('background').never();
    mock.expects('bold').once().withArgs(false).returns(cursor);
    mock.expects('dim').once().withArgs(false).returns(cursor);
    mock.expects('underlined').once().withArgs(false).returns(cursor);
    mock.expects('blink').once().withArgs(false).returns(cursor);
    mock.expects('reverse').once().withArgs(false).returns(cursor);
    mock.expects('hidden').once().withArgs(false).returns(cursor);
    mock.expects('moveTo').once(10, 10).returns(cursor);
    mock.expects('write').once().withArgs('');

    text.render(cursor);

    mock.verify();
  });

  it('Should properly render with text align to center', () => {
    const cursor = Cursor.create();
    const text = new Text({align: 'center'});
    const mock = sinon.mock(cursor);

    mock.expects('foreground').never();
    mock.expects('background').never();
    mock.expects('bold').once().withArgs(false).returns(cursor);
    mock.expects('dim').once().withArgs(false).returns(cursor);
    mock.expects('underlined').once().withArgs(false).returns(cursor);
    mock.expects('blink').once().withArgs(false).returns(cursor);
    mock.expects('reverse').once().withArgs(false).returns(cursor);
    mock.expects('hidden').once().withArgs(false).returns(cursor);
    mock.expects('moveTo').once(10, 10).returns(cursor);
    mock.expects('write').once().withArgs('');

    text.render(cursor);

    mock.verify();
  });

  it('Should properly render with text align to right', () => {
    const cursor = Cursor.create();
    const text = new Text({align: 'right'});
    const mock = sinon.mock(cursor);

    mock.expects('foreground').never();
    mock.expects('background').never();
    mock.expects('bold').once().withArgs(false).returns(cursor);
    mock.expects('dim').once().withArgs(false).returns(cursor);
    mock.expects('underlined').once().withArgs(false).returns(cursor);
    mock.expects('blink').once().withArgs(false).returns(cursor);
    mock.expects('reverse').once().withArgs(false).returns(cursor);
    mock.expects('hidden').once().withArgs(false).returns(cursor);
    mock.expects('moveTo').once(10, 10).returns(cursor);
    mock.expects('write').once().withArgs('');

    text.render(cursor);

    mock.verify();
  });

  it('Should properly render with custom options', () => {
    const cursor = Cursor.create();
    const mock = sinon.mock(cursor);
    const text = Text.create({
      text: 'test',
      x: 'left',
      y: 1,
      background: 'yellow',
      foreground: 'black',
      bold: true,
      underlined: true
    });

    mock.expects('foreground').once().withArgs('black').returns(cursor);
    mock.expects('background').once().withArgs('yellow').returns(cursor);
    mock.expects('bold').once().withArgs(true).returns(cursor);
    mock.expects('dim').once().withArgs(false).returns(cursor);
    mock.expects('underlined').once().withArgs(true).returns(cursor);
    mock.expects('blink').once().withArgs(false).returns(cursor);
    mock.expects('reverse').once().withArgs(false).returns(cursor);
    mock.expects('hidden').once().withArgs(false).returns(cursor);
    mock.expects('moveTo').once(1, 1).returns(cursor);
    mock.expects('write').once().withArgs('test');

    text.render(cursor);

    mock.verify();
  });

  it('Should properly render multi-lined text', () => {
    const cursor = Cursor.create();
    const mock = sinon.mock(cursor);
    const text = Text.create({
      text: 'test\nanother',
      x: 'left',
      y: 1,
      background: 'yellow',
      foreground: 'black',
      bold: true,
      underlined: true
    });

    mock.expects('foreground').once().withArgs('black').returns(cursor);
    mock.expects('background').once().withArgs('yellow').returns(cursor);
    mock.expects('bold').once().withArgs(true).returns(cursor);
    mock.expects('dim').once().withArgs(false).returns(cursor);
    mock.expects('underlined').once().withArgs(true).returns(cursor);
    mock.expects('blink').once().withArgs(false).returns(cursor);
    mock.expects('reverse').once().withArgs(false).returns(cursor);
    mock.expects('hidden').once().withArgs(false).returns(cursor);
    mock.expects('moveTo').twice().returns(cursor);
    mock.expects('write').twice().returns(cursor);

    text.render(cursor);

    mock.verify();
  });

  it('Should properly serialize shape to Object representation', () => {
    const text = Text.create({text: 'test', bold: true});
    const obj = text.toObject();

    assert.deepEqual(obj, {
      type: 'Text',
      options: {
        text: 'test',
        width: 15,
        height: 5,
        x: 10,
        y: 10,
        background: undefined,
        foreground: undefined,
        bold: true,
        dim: false,
        underlined: false,
        blink: false,
        reverse: false,
        hidden: false,
        align: 'center'
      }
    });
  });

  it('Should properly create text from Object representation', () => {
    const obj = {
      type: 'Text',
      options: {
        text: 'test',
        x: 'left',
        y: 'top',
        background: undefined,
        foreground: undefined,
        bold: true,
        underlined: true,
        align: 'right'
      }
    };

    const text = Text.fromObject(obj);
    assert.instanceOf(text, Text);
    assert.equal(text.getText(), 'test');
    assert.equal(text.getWidth(), 4);
    assert.equal(text.getHeight(), 1);
    assert.equal(text.getX(), 1);
    assert.equal(text.getY(), 1);
    assert.isUndefined(text.getBackground());
    assert.isUndefined(text.getForeground());
    assert.ok(text.isBold());
    assert.notOk(text.isDim());
    assert.ok(text.isUnderlined());
    assert.notOk(text.isBlink());
    assert.notOk(text.isReverse());
    assert.notOk(text.isHidden());
    assert.equal(text.getAlign(), 'right');
  });
});
