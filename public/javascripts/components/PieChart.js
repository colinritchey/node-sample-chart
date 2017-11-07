import React from 'react';

class PieChart extends React.Component{

  componentDidMount(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
    // this.drawChart();
  }

  drawChart(){
    // google.charts.load('current', {'packages':['corechart']});
    // Create the data table.

    // debugger;

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Mushrooms', 3],
      ['Onions', 1],
      ['Olives', 1],
      ['Zucchini', 1],
      ['Pepperoni', 2]
    ]);

    // Set chart options
    var options = {'title':'How Much Pizza I Ate Last Night',
                   'width':1000,
                   'height':500,
                   'legend': {position: 'bottom'}
                 };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));

    // function selectHandler() {
    //   var selectedItem = chart.getSelection()[0];
    //   console.log(selectedItem);
    //   if (selectedItem) {
    //     var topping = data.getValue(selectedItem.row, 0);
    //     console.log('The user selected ' + topping);
    //   }
    // }
    //
    // google.visualization.events.addListener(chart, 'select', selectHandler);
    chart.draw(data, options);
  }


  render(){
    return(
      <div id='chart_div'>
        chart
      </div>
    )
  }
}

export default PieChart;
