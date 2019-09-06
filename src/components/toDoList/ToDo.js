import React from "react";
import { Checkbox, Button } from "antd";

export default props => (
  <div>
    <Checkbox
      style={{
        textDecoration: props.todo.complete && "line-through"
      }}
      onClick={props.toggleComplete}
    >
      {props.todo.task}
    </Checkbox>
    <Button
      type="danger"
      icon="delete"
      size="small"
      onClick={props.onDelete}
      style={{ position: "absolute", right: 0 }}
    />
  </div>
);
