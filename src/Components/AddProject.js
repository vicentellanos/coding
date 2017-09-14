import React, { Component } from 'react';
import uuid from 'uuid';
import { Form, Input, Label } from 'reactstrap';

class AddProject extends Component {
  constructor(){
    super();
    this.state = {
      newProject:{},
      title:'',
      category:''
    }

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  // constructor(props) {
  //   super(props);
  //
  //   this.toggle = this.toggle.bind(this);
  //   this.state = {
  //     newProject:{}
  //   };
  // }
  //
  // toggle() {
  //   this.setState({
  //     dropdownOpen: !this.state.dropdownOpen
  //   });
  // }

  static defaultProps = {
    categories : ['Web Design','Web Development','Mobile Development']
  }

  handleCategoryChange(e) {
     let stateTitle = this.state.title;
     let newProject = this.state.newProject;

     this.setState({ newProject : newProject,
                     title: stateTitle,
                    category: e.target.value });
  }

  handleTitleChange(e) {
    let stateCategory = this.state.category;
    let newProject = this.state.newProject;

    this.setState({ newProject : newProject,
                    title: e.target.value ,
                   category: stateCategory });

  }

  handleSubmit(e) {
    console.log(this.state.title);
    console.log(this.state.category);
    if (this.state.title === '') {
      alert('The title is required');
    } else {
      this.setState({
        newProject:{
          id : uuid.v4(),
          title: this.state.title,
          category: this.state.category
        },
        title: '',
        category: ''
      }, function() {
        this.props.addProject(this.state.newProject);
      });
    }
    e.preventDefault();
  }
  render() {

    let categoryOptions = this.props.categories.map(category => {
        return <option key={category} value={category}>{category}</option>
    });
    return (
      <div>
        <h3>Add Project</h3>
        <Form inline onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <Label>Title</Label>
            <Input name="title" type="text" value={this.state.title} onChange={this.handleTitleChange} />
          </div>
          <div>
            <Label>Category</Label>
            <Input name="category" type="select" value={this.state.category} onChange={this.handleCategoryChange}>
              {categoryOptions}
            </Input>
          </div>
          <div>
            <Label>&nbsp;</Label>
            <Input type="submit" value="submit" />
          </div>
        </Form>
          <br/>
      </div>
    );
  }
}

export default AddProject;
