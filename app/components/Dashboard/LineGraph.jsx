/**
 * app/components/Dashboard/LineGraph.jsx
 *
 * Dashboard Block item
 */

import React from 'react';
import ReactDOM from 'react-dom'
import pubsub from 'pubsub-js'

import LinearProgress from 'material-ui/LinearProgress';
const LineChart = require("react-chartjs").Line;

const chartData = {
  labels: [],
  datasets: [
  {
    label: "CPU",
    fillColor: "rgba(255,64,129,0.1)",
    strokeColor: "#ff4081",
    pointColor: "rgba(220,220,220,1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(220,220,220,1)",
    data: []
  },
  {
    label: "Mem",
    fillColor: "rgba(0,191,255,0.1)",
    strokeColor: "#00BFFF",
    pointColor: "rgba(151,187,205,1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(151,187,205,1)",
    data: []
  }
  ]
};

export default class LineGraph extends React.Component {

  constructor() {
    super()
    this.state = {
      el: null,
      width: -1,
      progress: -10,
      listener: null
    }

    this.updateDimensions = this.updateDimensions.bind(this)
    this.reset = this.reset.bind(this)
    this.state.listener = pubsub.subscribe('lineGraph::reset', this.reset);
  }

  reset() {
    chartData.datasets[0].data = []
    chartData.datasets[1].data = []

    for (var i = 0; i < 10; ++i) {
      chartData.labels.push('12:51')
      chartData.datasets[0].data.push(0)
      chartData.datasets[1].data.push(0)
    }
  }

  componentWillMount() {
    /* prevent when changing language */
    if (chartData.labels.length > 0) {
      return
    }
    this.reset()
  }

  componentWillReceiveProps(nextProps) {
    const {cpu, mem} = nextProps

    if (chartData.datasets[0].data.length >= 10) {
      chartData.datasets[0].data.splice(0, 1)
    }
    chartData.datasets[0].data.push(cpu)

    if (chartData.datasets[1].data.length >= 10) {
      chartData.datasets[1].data.splice(0, 1)
    }
    chartData.datasets[1].data.push(mem)
    this.setState({progress: this.state.progress + 10})
  }

  updateDimensions () {
    if (!this.state.el) return
    this.setState({width: this.state.el.offsetWidth});
  }


  componentDidMount () {
    window.addEventListener("resize", this.updateDimensions)
    this.setState({
      el: ReactDOM.findDOMNode(this)
    }, () => {
      this.updateDimensions()
    })
  }

  componentWillUnmount () {
    window.removeEventListener("resize", this.updateDimensions)
    pubsub.unsubscribe(this.state.listener);
  }

  render() {
    return (
     <div>
      {this.state.width !== -1 ?
        <LineChart data={chartData}
                   width={this.state.width - 30}
                   height="200"
                   style={{width: this.state.width - 30}}/> : ''}
        <LinearProgress mode="determinate" color='#ff4081' value={(this.state.progress % 100) + 10} />
     </div>
    )
  }
}
