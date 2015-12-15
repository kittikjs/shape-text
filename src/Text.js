import Shape from 'kittik-shape-basic';

/**
 * Implements Text shape which is rendering the text at specified point.
 *
 * @since 1.0.0
 */
export default class Text extends Shape {
  constructor(options) {
    super(options);

    this.setBold(options.bold);
    this.setDim(options.dim);
    this.setUnderlined(options.underlined);
    this.setBlink(options.blink);
    this.setReverse(options.reverse);
    this.setHidden(options.hidden);
  }

  isBold() {
    return !!this.get('bold');
  }

  setBold(bold = false) {
    return this.set('bold', bold);
  }

  isDim() {
    return !!this.get('dim');
  }

  setDim(dim = false) {
    return this.set('dim', dim);
  }

  isUnderlined() {
    return !!this.get('underlined');
  }

  setUnderlined(underlined = false) {
    return this.set('underlined', underlined);
  }

  isBlink() {
    return !!this.get('blink');
  }

  setBlink(blink = false) {
    return this.set('blink', blink);
  }

  isReverse() {
    return !!this.get('reverse');
  }

  setReverse(reverse = false) {
    return this.set('reverse', reverse);
  }

  isHidden() {
    return !!this.get('hidden');
  }

  setHidden(hidden = false) {
    return this.set('hidden', hidden);
  }

  render(cursor) {
    let text = this.getText();
    let x = this.getX();
    let y = this.getY();
    let foreground = this.getForeground();
    let background = this.getBackground();
    let isBold = this.isBold();
    let isDim = this.isDim();
    let isUnderlined = this.isUnderlined();
    let isBlink = this.isBlink();
    let isReverse = this.isReverse();
    let isHidden = this.isHidden();

    if (foreground !== undefined) cursor.foreground(foreground);
    if (background !== undefined) cursor.background(background);

    cursor
      .bold(isBold)
      .dim(isDim)
      .underlined(isUnderlined)
      .blink(isBlink)
      .reverse(isReverse)
      .hidden(isHidden)
      .moveTo(x, y)
      .write(text);

    return this;
  }

  toObject() {
    let obj = super.toObject();

    Object.assign(obj, {
      options: {
        bold: this.isBold(),
        dim: this.isDim(),
        underlined: this.isUnderlined(),
        blink: this.isBlink(),
        reverse: this.isReverse(),
        hidden: this.isHidden()
      }
    });

    return obj;
  }
}
