import React, { Component } from "react"

import './CirclePercentage.css';

export default class CirclePercentage extends Component {
  static defaultProps = {

  }

  state = {

  }

  constructor(props) {
    super(props)

  }

  render() {
    const { percentage, color, size, style } = this.props;
    return(
      <div key={percentage} style={style} className="single-chart"> {/*giving it a key trigger the animation at each update*/}
        <svg height={size} width={size} viewBox="0 0 36 36" className="circular-chart">
          <path className="circle-bg"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path style={{stroke: color}} className="circle"
            stroke-dasharray={percentage + ", 100"}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" className="percentage">{percentage}%</text>
        </svg>
      </div>
    )
  }

}

const styles = {

}
