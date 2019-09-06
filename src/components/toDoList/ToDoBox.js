import React, { Component } from "react";
import TodoForm from "./ToDoForm";
import LayoutApp from "../misc/LayoutApp";
import Todo from "./ToDo";
import { Button, Row, Col, List } from "antd";

class ToDoBox extends Component {
  state = {
    data: [
      { task: "Guardar neceser", complete: false, id: 1 },
      { task: "Coger pasaporte", complete: false, id: 2 },
      { task: "Check in del vuelo", complete: false, id: 3 }
    ],
    shownTask: "all"
  };

  addTodo = task => {
    this.setState({ data: [...this.state.data, task] });
  };

  toggleComplete = id => {
    this.setState({
      data: this.state.data.map(d => {
        if (d.id === id) {
          return {
            // id: d.id,
            // task: d.task,
            ...d,
            complete: !d.complete
          };
        } else {
          return d;
        }
      })
    });
  };

  updateShownTask = s => {
    this.setState({
      shownTask: s
    });
  };

  handleDelete = id => {
    this.setState({ data: this.state.data.filter(t => t.id !== id) });
  };

  handleDeleteAllComplete = () => {
    this.setState({ data: this.state.data.filter(t => !t.complete) });
  };

  render() {
    let todos = [];

    if (this.state.shownTask === "all") {
      todos = this.state.data;
    } else if (this.state.shownTask === "active") {
      todos = this.state.data.filter(t => !t.complete);
    } else if (this.state.shownTask === "completed") {
      todos = this.state.data.filter(t => t.complete);
    }

    return (
      <LayoutApp>
        <h3 style={{ textAlign: "center", paddingTop: 10 }}>Mis planes</h3>
        <List>
          {todos.map(t => (
            <List.Item>
            <Todo
              key={t.id}
              toggleComplete={() => this.toggleComplete(t.id)}
              onDelete={() => this.handleDelete(t.id)}
              todo={t}
            />
            </List.Item>
          ))}
          <TodoForm onSubmit={this.addTodo} />
        </List>
        <div style={{textAlign:"center", paddingBottom: 10}}>
          Tareas pendientes: {this.state.data.filter(x => !x.complete).length}
        </div>
        <div>
          <Row type="flex" justify="center" style={{ paddingTop: 5 }}>
            <Col style={{ padding: 5 }}>
              <Button
                type="primary"
                onClick={() => this.updateShownTask("all")}
              >
                Todas
              </Button>
            </Col>
            <Col style={{ padding: 5 }}>
              <Button
                type="primary"
                onClick={() => this.updateShownTask("active")}
              >
                Pendientes
              </Button>
            </Col>
            <Col style={{ padding: 5 }}>
              <Button
                type="primary"
                onClick={() => this.updateShownTask("completed")}
              >
                Completas
              </Button>
            </Col>
          </Row>
        </div>
        <div>
          {/* {this.state.data.filter(t => t.complete).length ? ( */}
          {this.state.data.some(t => t.complete) ? (
            <Row type="flex" justify="center">
              <Col style={{ padding: 5 }}>
                <Button type="primary" onClick={this.handleDeleteAllComplete}>
                  Borrar todas las tareas completas
                </Button>
              </Col>
            </Row>
          ) : null}
        </div>
      </LayoutApp>
    );
  }
}

export default ToDoBox;
