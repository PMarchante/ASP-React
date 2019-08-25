import React from "react";
import { Header, Icon, List } from "semantic-ui-react";
import "./App.css";
import { Component } from "react";
import Axios from "axios";
class App extends Component {
  state = {
    values: []
  };
  componentDidMount() {
    Axios.get("http://localhost:5000/api/values").then(Response => {
      this.setState({
        values: Response.data
      });
    });
  }
  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Uptime Guarantee</Header.Content>
        </Header>
        <List>
          {this.state.values.map((value: any) => (
            <List.Item key={value.id}>{value.name}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
