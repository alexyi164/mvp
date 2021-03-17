
import React, { Component } from 'react';
import TotalCases from './TotalCases';

export default class TotalCasesWrapper extends Component {
	componentDidMount() {
		this.setState({
			chart: new TotalCases(this.refs.chart)
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