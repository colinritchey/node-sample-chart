import React from 'react';
import Legend from './Legend';

class PieChart extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      data: this.props.data,
      displayLegend: false
    }

  }

  componentDidMount(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  componentWillReceiveProps(nextprops){
    this.setState({data: nextprops.data});
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  drawChart(){

    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');

    if(typeof this.state.data !== 'undefined'){
      let arrayOfData = Object.keys(this.state.data).map((id) => {
        return [id, this.state.data[id]];
      })
      data.addRows(arrayOfData);
    }

    let options = {
      'width': 500,
      'height':500,
      'legend': {position: 'none'},
      'colors': ['#e0440e', '#e6693e', '#ec8f6e']
     };

    let chart = new google.visualization.PieChart(document.getElementById('chart_div'));

    const selectHandler = () => {
      let selectedItem = chart.getSelection()[0];
      if (selectedItem) {
        let course = data.getValue(selectedItem.row, 0);
        this.props.selectOneCourse(course);
      }
    }

    google.visualization.events.addListener(chart, 'select', selectHandler.bind(this));
    chart.draw(data, options);

    this.setState({ displayLegend: true });
  }

  render(){

    if(typeof this.state.data !== 'undefined'){
      return(
        <div>
          <div id='chart_div'></div>
          <Legend
            data={this.state.data}
            displayLegend={this.state.displayLegend}
          />
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default PieChart;
