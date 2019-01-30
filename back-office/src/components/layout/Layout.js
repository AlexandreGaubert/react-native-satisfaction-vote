import React from 'react'
import Header from "./Header";

export default (props) => (
    <div style={styles.container}>
      <div style={styles.content}>
        {props.children}
      </div>
    </div>
)

const styles = {
  container: {

  },
  content: {
    width: "80%",
    margin: "auto",
    border: "1px solid"
  }
}
