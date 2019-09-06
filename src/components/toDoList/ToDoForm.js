import React, { Component } from "react";
import { Input, Button, Row, Col } from "antd";

class TodoForm extends Component {
  state = {
    task: ""
  };

  onHandleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  generateId = () => {
    return Math.floor(Math.random() * 50000) + 3;
  };

  onHandleSubmit = event => {
    event.preventDefault();
    // submit
    this.props.onSubmit({
      task: this.state.task,
      complete: false,
      id: this.generateId().toString()
    });
    this.setState({
      task: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.onHandleSubmit}>
        <Row type="flex" justify="center" style={{paddingTop: 50, paddingBottom: 10}}>
          <Col span={8}>
            <Input
              name="task"
              value={this.state.task}
              onChange={this.onHandleChange}
              placeholder="¿Qué vas a hacer?"
            />
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={this.onHandleSubmit}>
              Nueva Tarea
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

export default TodoForm;
