import Shape from 'kittik-shape-basic';

/**
 * Implements Text shape which is rendering the text at specified point.
 *
 * @since 1.0.0
 */
export default class Text extends Shape {
  render(cursor) {
    let text = this.getText();
    let x = this.getX();
    let y = this.getY();
    let background = this.getBackground();
    let foreground = this.getForeground();

    if (background !== undefined) cursor.background(background);
    if (foreground !== undefined) cursor.foreground(foreground);

    cursor.moveTo(x, y).write(text);

    return this;
  }
}
