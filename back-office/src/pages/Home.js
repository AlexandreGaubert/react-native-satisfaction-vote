import React from 'react';
import { Link } from 'react-router-dom'

import "./Home.css"
import MyText from "../components/MyText"

export default class Home extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <Link to="/results/animations" className="button" style={{...styles.button, backgroundColor: '#E07BE0'}}>
          <MyText size={4} style={styles.buttonText}>ANIMATIONS</MyText>
        </Link>
        <Link to="/results/repas" className="button" style={{...styles.button, backgroundColor: '#538083'}}>
          <MyText size={4} style={styles.buttonText}>REPAS</MyText>
        </Link>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#F6F2FF'
  },
  button: {
    width: '30%',
    height: '30%',
    backgroundColor: 'blue',
    display: 'flex',
    boxShadow: "20px 20px 40px 0px rgba(140,114,114,0.7)",
    textDecoration: 'none'
  },
  buttonText: {
    margin: 'auto',
    color: 'black'
  }
}
