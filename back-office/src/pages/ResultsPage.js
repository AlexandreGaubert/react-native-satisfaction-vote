import React, {Component} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import AnimationList from '../components/AnimationList';
import MyModal from '../components/MyModal';
import CirclePercentage from '../components/CirclePercentage/CirclePercentage';
import MyText from '../components/MyText';
import '../hoverStyles.css'

export default class ResultsPage extends Component {
  constructor(props) {
    super(props);
    var today = new Date();

    this.state = {
      curYear: today.getFullYear(),
      curMonth: today.getMonth(),
      animations: []
    }

    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
  }

  nextMonth() {
    if (this.state.curMonth === 11) {
      this.setState(prevstate => {
        this.getAnimationByMonth(0, prevstate.curYear + 1);
        return {curMonth: 0, curYear: prevstate.curYear + 1}
      });
    }
    else this.setState(prevstate => {
      this.getAnimationByMonth(prevstate.curMonth + 1, prevstate.curYear);
      return {curMonth: prevstate.curMonth + 1}
    });
  }

  prevMonth() {
    if (this.state.curMonth === 0) {
      this.setState(prevstate => {
        this.getAnimationByMonth(11, prevstate.curYear - 1);
        return {curMonth: 11, curYear: prevstate.curYear - 1}
      });
    }
    else this.setState(prevstate => {
      this.getAnimationByMonth(prevstate.curMonth - 1, prevstate.curYear);
      return {curMonth: prevstate.curMonth - 1}
    });
  }

  getAnimationByMonth(month, year) {
    axios.post('http://localhost:80/api/v1/getAnimationByMonth',
      {
        month: month,
        year: year,
        type: this.props.type
      })
      .then(res => {
        this.setState({animations: res.data});
      })
      .catch(err => {
        console.log(err);
      })
  }

  getMoyenneOfMonth() {
    var voteDown = 0, voteSoso = 0, voteUp = 0, votes = 0;
    var animations = this.state.animations;

    for (var i = 0; i < animations.length; i++) {
      voteDown += animations[i].voteDown;
      voteUp += animations[i].voteUp;
      voteSoso += animations[i].voteSoso;
      votes += animations[i].votes;
    }

    return {
      voteDown: votes === 0 ? 0 : Math.round((voteDown / votes) * 100),
      voteSoso: votes === 0 ? 0 : Math.round((voteSoso / votes) * 100),
      voteUp: votes === 0 ? 0 : Math.round((voteUp / votes) * 100)
    }

  }

  componentDidMount() {
    this.getAnimationByMonth(this.state.curMonth, this.state.curYear);
  }

  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      this.getAnimationByMonth(this.state.curMonth, this.state.curYear);
    }
  }

  render() {
    var { animations, curYear, curMonth } = this.state;
    var moyenne = this.getMoyenneOfMonth();
    const { type } = this.props;

    return (
      <div style={styles.container}>
        <div style={{display: 'flex'}}>
          <Link
            to={'/results/' + (type === 'repas' ? 'animations' : 'repas') }
            className="switchTypeButton"
            style={styles.switchTypeButton}
          >
            <MyText size={1.5}>{type === 'repas' ? "ANIMATIONS" : "REPAS"}</MyText>
            <i style={{margin: '0 0 0 10px', fontSize: '1.5vw'}} className="fas fa-arrow-right"/>
          </Link>

          <Navigator
            prevMonth={this.prevMonth}
            nextMonth={this.nextMonth}
            curMonth={curMonth}
            curYear={curYear}
          />
        </div>

        <div style={styles.percentages}>
          <CirclePercentage style={styles.circlePercentage} size="9vw" percentage={moyenne.voteUp} color="green"/>
          <CirclePercentage style={styles.circlePercentage} size="9vw" percentage={moyenne.voteSoso} color="yellow"/>
          <CirclePercentage style={styles.circlePercentage} size="9vw" percentage={moyenne.voteDown} color="red"/>
        </div>

        <AnimationList animations={this.state.animations}/>

      </div>
    );
  }
}

const Navigator = props => {
  const { curYear, curMonth, prevMonth, nextMonth } = props;
  return (
    <div style={styles.navigator}>
      <i
        onClick={prevMonth}
        style={{...styles.navButtons, fontSize: '4vw'}}
        className="fas fa-chevron-left"
      />
      <MyText size={3.5} style={styles.date}>{months[curMonth]} {curYear}</MyText>
      <i
        onClick={nextMonth}
        style={{...styles.navButtons, fontSize: '4vw'}}
        className="fas fa-chevron-right"
      />
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100%',
  },
  percentages: {
    display: "flex",
    width: "60%",
    margin: '30px auto',
    justifyContent: 'space-evenly'
  },
  circlePercentage: {},
  navigator: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    margin: '20px auto',
    width: '50%'
  },
  date: {
    margin: "0 20px",
    fontWeight: 'bold',
    textAlign: 'center',
    width: '90%'
  },
  navButtons: {
    fontSize: '30px',
    cursor: 'pointer'
  },
  switchTypeButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: '20px',
    top: '20px',
    padding: '10px',
    boxShadow: "5px 5px 10px 0px rgba(140,114,114,0.7)",
    cursor: 'pointer',
    color: 'black',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
}

const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
