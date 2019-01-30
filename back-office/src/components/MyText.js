import React, { Component } from "react"

export default class MyText extends Component {
  static defaultProps = {}
  state = { }

  constructor(props) {
    super(props)

  }

  normalize() {
    var { size } = this.props;
    const { innerWidth, innerHeight } = window;
    const originalWidth = 1366;
    const originalHeight = 657;

    if (originalWidth > innerWidth) return ;

    if (typeof(size) === "undefined") size = 14;

    const scale = innerWidth / originalWidth;
    this.setState({size: scale * size})
  }

  render() {
    const { children, bold, style } = this.props;
    const { size } = this.props;

    return(
      <p style={{fontSize: size + "vw", fontWeight: (bold ? "bold" : 'normal'), ...style}}>{children}</p>
    )
  }
}
