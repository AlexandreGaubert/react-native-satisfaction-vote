import React, {Component} from 'react'

import "./css/AnimationList.css"
import MyText from "./MyText"

export default class AnimationList extends Component {
  static defaultProps = {
    animations: []
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { animations } = this.props;

    animations.sort(function(a,b){
      return new Date(a.date) - new Date(b.date);
    });

    return (
      <div style={styles.container}>
        <span style={{...styles.animation, backgroundColor: "#666"}}>
          <MyText size={1.5} style={{...styles.cellule, ...styles.celluleLabel}}>
            Nom
          </MyText>
          <MyText size={1.5} style={{...styles.cellule, ...styles.celluleLabel}}>
            J'aime
          </MyText>
          <MyText size={1.5} style={{...styles.cellule, ...styles.celluleLabel}}>
            Moyen
          </MyText>
          <MyText size={1.5} style={{...styles.cellule, ...styles.celluleLabel}}>
            Pas du tout
          </MyText>
          <MyText size={1.5} style={{...styles.cellule, ...styles.celluleLabel}}>
            Date
          </MyText>
        </span>
        {
          animations.length > 0
          ?
          animations.map((e, key) => {
            if (key % 2 == 0) return <Animation color="#efefef" animation={e}/>
            else return <Animation color="#fff" animation={e}/>
          })
          :
          <h1 style={{textAlign: "center"}}>Rien à afficher</h1>
        }
      </div>
    );
  }
}

const Animation = props => {

  const { animation } = props;
  const weekDays = ["Lundi", "Mardi", 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  var dateObj = new Date(animation.date);
  var dateStr = weekDays[dateObj.getDay()] + ' ' + dateObj.getDate();

  return (
    <div className="animation" style={{...styles.animation, backgroundColor: props.color}}>
      <span style={styles.cellule}>
        <MyText size={1.5}>
          {animation.titre}
        </MyText>
      </span>
      <span style={styles.cellule}>
        <MyText size={1.5}>
          {animation.votes === 0 ? 0 : Math.round((animation.voteUp / animation.votes) * 100)}%
        </MyText>
      </span>
      <span style={styles.cellule}>
        <MyText size={1.5}>
          {animation.votes === 0 ? 0 : Math.round((animation.voteSoso / animation.votes) * 100)}%
        </MyText>
      </span>
      <span style={styles.cellule}>
        <MyText size={1.5}>
          {animation.votes === 0 ? 0 : Math.round((animation.voteDown / animation.votes) * 100)}%
        </MyText>
      </span>
      <span style={styles.cellule}>
        <MyText size={1.5}>
          {dateStr}
        </MyText>
      </span>
    </div>
  )
}


const styles = {
  container: {
    padding: "20px"
  },
  animation: {
    display: "table",
    tableLayout: 'fixed',
    width: "100%"
  },
  celluleLabel: {
    fontWeight: 'bold',
    color: "#fff",
    borderColor: "black"
  },
  cellule: {
    padding: "5px",
    textAlign: 'center',
    display: 'table-cell'
  },

}
