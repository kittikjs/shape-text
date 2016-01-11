import { assert } from 'chai';
import sinon from 'sinon';
import Text from '../../src/Text';
import { Cursor, COLORS } from 'kittik-cursor';

describe('Shape::Text', () => {
  it('Should properly create Text instance', () => {
    let text = new Text();
    assert.instanceOf(text, Text);
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
      x: 20,
      y: 1,
      background: COLORS.YELLOW,
      foreground: COLORS.BLACK,
      bold: true,
      underlined: true
    });

    mock.expects('foreground').once().withArgs(0).returns(cursor);
    mock.expects('background').once().withArgs(11).returns(cursor);
    mock.expects('bold').once().withArgs(true).returns(cursor);
    mock.expects('dim').once().withArgs(false).returns(cursor);
    mock.expects('underlined').once().withArgs(true).returns(cursor);
    mock.expects('blink').once().withArgs(false).returns(cursor);
    mock.expects('reverse').once().withArgs(false).returns(cursor);
    mock.expects('hidden').once().withArgs(false).returns(cursor);
    mock.expects('moveTo').once(20, 1).returns(cursor);
    mock.expects('write').once().withArgs('test');

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
        bold: true,
        dim: false,
        underlined: false,
        blink: false,
        reverse: false,
        hidden: false,
        background: undefined,
        foreground: undefined
      }
    });
  });

  it('Should properly create text from Object representation', () => {
    let obj = {
      type: 'Text',
      options: {
        text: 'test',
        x: 1,
        y: 1,
        bold: true,
        underlined: true,
        background: undefined,
        foreground: undefined
      }
    };

    let text = Text.fromObject(obj);
    assert.instanceOf(text, Text);
    assert.equal(text.getText(), 'test');
    assert.equal(text.getWidth(), 4);
    assert.equal(text.getHeight(), 1);
    assert.equal(text.getX(), 1);
    assert.equal(text.getY(), 1);
    assert.ok(text.isBold());
    assert.ok(text.isUnderlined());
    assert.notOk(text.isDim());
    assert.isUndefined(text.getBackground());
    assert.isUndefined(text.getForeground());
  });
});
