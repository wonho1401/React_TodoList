import React, { Component } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";
import uuid from "uuid/dist/v4";

class App extends React.Component {
  ListData;
  state = {
    items: [], //item which is already added
    id: uuid(),
    item: "", //item which is adding lately
    editItem: false,
  };

  handleChange = (e) => {
    this.setState({
      item: e.target.value,
    });
  };

  // When submit form
  handleSubmit = (e) => {
    e.preventDefault(); //Submit 후 Refresh 방지

    const newItem = {
      id: this.state.id,
      title: this.state.item,
    };

    //Prevent blank input
    if (newItem.title === "") {
      alert("할 일을 작성해주세요!");
      return false;
    }

    const updatedItems = [...this.state.items, newItem];

    this.setState({
      items: updatedItems,
      item: "",
      id: uuid(),
      editItem: false,
    });

    localStorage.setItem("List", JSON.stringify(updatedItems));
  };

  // Clear all list including localStorage (OK)
  clearList = () => {
    this.setState({
      items: [],
    });

    localStorage.clear();
  };

  handleDelete = (id) => {
    const filteredItems = this.state.items.filter((item) => item.id !== id);
    this.setState({
      items: filteredItems,
    });

    localStorage.setItem("List", JSON.stringify(filteredItems));
  };

  handleEdit = (id) => {
    const filteredItems = this.state.items.filter((item) => item.id !== id);

    const selectedItem = this.state.items.find((item) => item.id === id);

    this.setState({
      items: filteredItems,
      item: selectedItem.title,
      editItem: true,
      id: id,
    });

    localStorage.setItem("List", JSON.stringify(filteredItems));
  };

  componentDidMount() {
    if (localStorage.getItem("List")) {
      this.setState({
        items: JSON.parse(localStorage.getItem("List")),
        id: this.state.id,
      });
    } else {
      this.setState({
        items: [],
        id: "",
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <h3 className="text-capitalize text-center">input</h3>
            <TodoInput
              item={this.state.item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              editItem={this.state.editItem}
            />
            <TodoList
              items={this.state.items}
              clearList={this.clearList}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
