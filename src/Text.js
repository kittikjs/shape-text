import Shape from 'kittik-shape-basic';

/**
 * Implements Text shape which is rendering the text at specified point.
 * Supports different styles kinda bold, dim, underlined, etc...
 *
 * @since 1.0.0
 */
export default class Text extends Shape {
  constructor(options = {}) {
    super(options);

    this.setBold(options.bold);
    this.setDim(options.dim);
    this.setUnderlined(options.underlined);
    this.setBlink(options.blink);
    this.setReverse(options.reverse);
    this.setHidden(options.hidden);
  }

  /**
   * Returns actual width of the shape.
   *
   * @returns {Number}
   */
  getWidth() {
    const text = this.getText().split('\n').map(item => item.length);
    return Math.max(...text);
  }

  /**
   * Returns actual height of the shape.
   *
   * @returns {Number}
   */
  getHeight() {
    return this.getText().split('\n').length;
  }

  /**
   * Check if text should be rendered as bold.
   *
   * @returns {Boolean}
   */
  isBold() {
    return !!this.get('bold');
  }

  /**
   * Toggle bold mode.
   *
   * @param {Boolean} [bold=false] If true, print bold text
   * @returns {Shape}
   */
  setBold(bold = false) {
    return this.set('bold', bold);
  }

  /**
   * Check if text should be rendered as dim.
   *
   * @returns {Boolean}
   */
  isDim() {
    return !!this.get('dim');
  }

  /**
   * Toggle dim mode.
   *
   * @param {Boolean} [dim=false] If true, print dim text
   * @returns {Shape}
   */
  setDim(dim = false) {
    return this.set('dim', dim);
  }

  /**
   * Check if text should be rendered as underlined.
   *
   * @returns {Boolean}
   */
  isUnderlined() {
    return !!this.get('underlined');
  }

  /**
   * Toggle underlined mode.
   *
   * @param {Boolean} [underlined=false] If true, print underlined text
   * @returns {Shape}
   */
  setUnderlined(underlined = false) {
    return this.set('underlined', underlined);
  }

  /**
   * Check if text should be rendered as blink.
   *
   * @returns {Boolean}
   */
  isBlink() {
    return !!this.get('blink');
  }

  /**
   * Toggle blink mode.
   *
   * @param {Boolean} [blink=false] If true, print blink text
   * @returns {Shape}
   */
  setBlink(blink = false) {
    return this.set('blink', blink);
  }

  /**
   * Check if text should be rendered with reversed colors.
   *
   * @returns {Boolean}
   */
  isReverse() {
    return !!this.get('reverse');
  }

  /**
   * Toggle reverse mode.
   *
   * @param {Boolean} [reverse=false] If true, print text with reversed colors
   * @returns {Shape}
   */
  setReverse(reverse = false) {
    return this.set('reverse', reverse);
  }

  /**
   * Check if text should be rendered as hidden text.
   *
   * @returns {Boolean}
   */
  isHidden() {
    return !!this.get('hidden');
  }

  /**
   * Toggle hidden mode.
   *
   * @param {Boolean} [hidden=false] If true, print hidden text
   * @returns {Shape}
   */
  setHidden(hidden = false) {
    return this.set('hidden', hidden);
  }

  /**
   * Render the shape based on options.
   *
   * @override
   * @param {Cursor} cursor
   * @returns {Text}
   */
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

  /**
   * Overrides default toObject() method because we have new fields here.
   *
   * @override
   * @returns {{name, options}|*}
   */
  toObject() {
    let obj = super.toObject();

    Object.assign(obj.options, {
      bold: this.isBold(),
      dim: this.isDim(),
      underlined: this.isUnderlined(),
      blink: this.isBlink(),
      reverse: this.isReverse(),
      hidden: this.isHidden()
    });

    return obj;
  }
}
