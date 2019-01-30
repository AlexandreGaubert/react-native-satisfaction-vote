import React from 'react'

export default class MyModal extends React.Component {

  static defaultProps = {
    isOpen: false,
    onRequestClose: null
  }

  render() {
    const { isOpen } = this.props;
    if (!isOpen) return null;
    else if (isOpen)
    return (
      <div style={styles.container}>
        <span style={styles.content}>
          {this.props.children}
        </span>
      </div>
    )
  }
}

const styles = {
  container: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    height: "100%",
    width: '100%',
    backgroundColor: 'rgba(239,240,241,0.5)',
    display: 'flex',
  },
  content: {
    margin: 'auto',
    backgroundColor: '#fff',
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
  }
}
