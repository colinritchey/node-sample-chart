import React from 'react';

class Teachers extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      course: this.props.course,
      year: this.props.year,
      data: {}
    }

  }

  getCourseId(course){
    const coursesToIds = {
      'English 1A: Freshman Composition': '1a',
      'English 1B: Argument & Analysis': '1b',
      'English 1C: Applied Composition': '1c'
    }

    return coursesToIds[course];
  }

  componentWillReceiveProps(nextprops){

    let courseId = this.getCourseId(nextprops.course);

    fetch(`http://localhost:3000/api/course/${courseId}/year/${nextprops.year}/`)
      .then((r) => r.json())
      .then((data) => this.setState({
        data: data,
        course: nextprops.course,
        year: nextprops.year
      }))

  }

  render(){
    let teachers = Object.keys(this.state.data).map((id) => {
      let teacher = {
        'name': id,
        'students': this.state.data[id]
      }

      return teacher;
    });

    if(this.state.course === '' || this.state.year === ''){
      return (
        <div></div>
      )
    } else {
      return (
        <div className='teachers-chart'>
          <h3>{this.state.course}</h3>

          <table>
            <tbody>
              <tr>
                <th>Year</th>
                <th>Course</th>
                <th>Instructor</th>
                <th>Students</th>
              </tr>
              {teachers.map((teacher) => {
                return (
                  <tr key={teacher.name} className='data-row'>
                    <td>{this.state.year}</td>
                    <td>{this.state.course}</td>
                    <td>{teacher.name}</td>
                    <td>{teacher.students}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
    }
  }
}

export default Teachers;
