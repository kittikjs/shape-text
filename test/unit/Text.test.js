import { assert } from 'chai';
import sinon from 'sinon';
import Text from '../../src/Text';
import { Cursor, COLORS } from 'kittik-cursor';

describe('Shape::Text', () => {
  it('Should properly render with default options', () => {
    let cursor = Cursor.create();
    let text = new Text();
    let mock = sinon.mock(cursor);

    mock.expects('background').never();
    mock.expects('foreground').never();
    mock.expects('moveTo').once(10, 10).returns(cursor);
    mock.expects('write').once().withArgs('');

    text.render(cursor);

    mock.verify();
  });

  it('Should properly render with custom options', () => {
    let cursor = Cursor.create();
    let text = Text.create({background: COLORS.YELLOW, foreground: COLORS.BLACK}).setX(20).setY(20).setText('test');
    let mock = sinon.mock(cursor);

    mock.expects('background').once().withArgs(11);
    mock.expects('foreground').once().withArgs(0);
    mock.expects('moveTo').once().withArgs(20, 20).returns(cursor);
    mock.expects('write').once().withArgs('test');

    text.render(cursor);

    mock.verify();
  });

  it('Should properly serialize shape to Object representation', () => {
    let text = new Text().setText('test');
    let obj = text.toObject();

    assert.deepEqual(obj, {
      name: 'Text',
      options: {
        text: 'test',
        width: 15,
        height: 5,
        x: 10,
        y: 10,
        alignX: 'none',
        alignY: 'none',
        background: undefined,
        foreground: undefined,
        animation: undefined
      }
    });
  });

  it('Should properly create text from Object representation', () => {
    let obj = {
      name: 'Text',
      options: {
        text: 'test',
        width: 30,
        height: 50,
        x: 0,
        y: 0,
        background: undefined,
        foreground: undefined,
        animation: {
          name: 'print',
          interval: 100
        }
      }
    };

    let text = Text.fromObject(obj);
    assert.instanceOf(text, Text);
    assert.equal(text.getText(), 'test');
    assert.equal(text.getWidth(), 30);
    assert.equal(text.getHeight(), 50);
    assert.equal(text.getX(), 0);
    assert.equal(text.getY(), 0);
    assert.isUndefined(text.getBackground());
    assert.isUndefined(text.getForeground());
    assert.deepEqual(text.getAnimation(), {name: 'print', interval: 100});
    assert.equal(text.get('animation.name'), 'print');
    assert.equal(text.get('animation.interval'), 100);
    assert.ok(text.isAnimated());
  });
});
