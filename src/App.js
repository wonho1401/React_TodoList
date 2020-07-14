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
    item: "", //item which is adding
    editItem: false,
  };

  // constructor(props) {
  //   super(props);

  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleEdit = this.handleEdit.bind(this);
  //   this.handleDelete = this.handleDelete.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.clearList = this.clearList.bind(this);

  //   this.state = {
  //     items: [],
  //     id: "",
  //     item: "",
  //     editItem: false,
  //   };
  // }
  handleChange = (e) => {
    this.setState({
      item: e.target.value,
    });
    // localStorage.setItem("List", JSON.stringify(this.state));
  };

  // When submit form
  //the latest updated item disappear‼️
  handleSubmit = (e) => {
    e.preventDefault(); //Submit 후 Refresh 방지

    const newItem = {
      id: this.state.id,
      title: this.state.item,
    };

    const updatedItems = [...this.state.items, newItem];

    console.log(updatedItems);

    this.setState({
      items: updatedItems,
      item: "",
      id: uuid(),
      editItem: false,
    });

    localStorage.setItem("List", JSON.stringify(this.state));
  };

  // Clear all list including localStorage (OK)
  clearList = () => {
    this.setState({
      items: [],
    });

    localStorage.clear();
  };

  // localStorage😥
  handleDelete = (id) => {
    const filteredItems = this.state.items.filter((item) => item.id !== id);
    this.setState({
      items: filteredItems,
    });

    localStorage.setItem("List", JSON.stringify(this.state));
  };

  // localStorage😥
  handleEdit = (id) => {
    const filteredItems = this.state.items.filter((item) => item.id !== id);

    const selectedItem = this.state.items.find((item) => item.id === id);

    this.setState({
      items: filteredItems,
      item: selectedItem.title,
      editItem: true,
      id: id,
    });

    localStorage.setItem("List", JSON.stringify(this.state));
  };

  componentDidMount() {
    this.ListData = JSON.parse(localStorage.getItem("List"));

    console.log(this.ListData);

    // console.log(this.ListData.item);
    if (localStorage.getItem("List")) {
      this.setState({
        items: [...this.ListData.items],
        id: this.ListData.id,
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
