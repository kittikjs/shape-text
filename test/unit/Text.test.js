import { assert } from 'chai';
import sinon from 'sinon';
import Text from '../../src/Text';
import { Cursor } from 'kittik-cursor';

describe('Shape::Text', () => {
  it('Should properly create Text instance', () => {
    let text = new Text();
    assert.instanceOf(text, Text);
  });

  it('Should properly get actual width of the shape', () => {
    let text = new Text({text: 'test'});
    assert.equal(text.getWidth(), 4);
  });

  it('Should properly get actual height of the shape', () => {
    let text = new Text({text: 'test'});
    assert.equal(text.getHeight(), 1);
  });

  it('Should properly get/set bold mode', () => {
    let text = new Text();
    assert.notOk(text.isBold());
    assert.instanceOf(text.setBold(true), Text);
    assert.ok(text.isBold());
  });

  it('Should properly get/set dim mode', () => {
    let text = new Text();
    assert.notOk(text.isDim());
    assert.instanceOf(text.setDim(true), Text);
    assert.ok(text.isDim());
  });

  it('Should properly get/set underlined mode', () => {
    let text = new Text();
    assert.notOk(text.isUnderlined());
    assert.instanceOf(text.setUnderlined(true), Text);
    assert.ok(text.isUnderlined());
  });

  it('Should properly get/set blink mode', () => {
    let text = new Text();
    assert.notOk(text.isBlink());
    assert.instanceOf(text.setBlink(true), Text);
    assert.ok(text.setBlink());
  });

  it('Should properly get/set reverse mode', () => {
    let text = new Text();
    assert.notOk(text.isReverse());
    assert.instanceOf(text.setReverse(true), Text);
    assert.ok(text.isReverse());
  });

  it('Should properly get/set hidden mode', () => {
    let text = new Text();
    assert.notOk(text.isHidden());
    assert.instanceOf(text.setHidden(true), Text);
    assert.ok(text.isHidden());
  });

  it('Should properly render with default options', () => {
    let cursor = Cursor.create();
    let text = new Text();
    let mock = sinon.mock(cursor);

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
    let cursor = Cursor.create();
    let mock = sinon.mock(cursor);
    let text = Text.create({
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
    let cursor = Cursor.create();
    let mock = sinon.mock(cursor);
    let text = Text.create({
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
    let text = Text.create({text: 'test', bold: true});
    let obj = text.toObject();

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
        hidden: false
      }
    });
  });

  it('Should properly create text from Object representation', () => {
    let obj = {
      type: 'Text',
      options: {
        text: 'test',
        x: 'left',
        y: 'top',
        background: undefined,
        foreground: undefined,
        bold: true,
        underlined: true
      }
    };

    let text = Text.fromObject(obj);
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
  });
});
