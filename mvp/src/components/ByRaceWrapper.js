import React, { Component } from 'react';
import ByRace from './ByRace';

export default class ByRaceWrapper extends Component {
	componentDidMount() {
		this.setState({
			chart: new ByRace(this.refs.chart)
		})
	}

	shouldComponentUpdate() {
		return false
	}

	componentWillReceiveProps(nextProps) {
		this.state.chart.update(nextProps.view)
	}

	render() {
		return <div className="chart-area" ref="chart"></div>
	}
}