import React from 'react';

class PieChart extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      data: this.props.data
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

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');

    if(typeof this.state.data !== 'undefined'){
      let arrayOfData = Object.keys(this.state.data).map((id) => {
        return [id, this.state.data[id]];
      })
      data.addRows(arrayOfData);
    }

    // Set chart options
    var options = {
      'width': 500,
      'height':500,
      'legend': {position: 'none'},
      'colors': ['#e0440e', '#e6693e', '#ec8f6e']
     };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));

    const selectHandler = () => {
      var selectedItem = chart.getSelection()[0];
      if (selectedItem) {
        var course = data.getValue(selectedItem.row, 0);
        this.props.selectOneCourse(course);
      }
    }

    google.visualization.events.addListener(chart, 'select', selectHandler.bind(this));
    chart.draw(data, options);
  }


  render(){
    let colors = ['#e0440e', '#e6693e', '#ec8f6e'];

    if(typeof this.state.data !== 'undefined'){

      return(
        <div>
          <div id='chart_div'></div>

          <div className='chart-legend'>
          {Object.keys(this.state.data).map((el, idx) => {
            return(
              <span>
                <div
                  key={el}
                  style={{backgroundColor: colors[idx]}}></div>
                <span>{el}</span>
              </span>
            )
          })}

          </div>
        </div>
      )
    } else {
      return (
        <div>
        </div>
      )
    }
  }
}

export default PieChart;
