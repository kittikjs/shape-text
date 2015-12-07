import Shape from 'kittik-shape-basic';

/**
 * Implements Text shape which is rendering the text at specified point.
 *
 * @since 1.0.0
 * @version 1.0.0
 */
export default class Text extends Shape {
  render(cursor) {
    let text = this.getText();
    let {x, y} = this.getPosition();
    let background = this.getBackground();
    let foreground = this.getForeground();

    if (background) cursor.background(background);
    if (foreground) cursor.foreground(foreground);

    cursor.setPosition(x, y).write(text);

    return this;
  }
}
