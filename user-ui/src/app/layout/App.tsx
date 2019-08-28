import React, { Fragment } from "react";
import { Header, Icon, List, Container } from "semantic-ui-react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";

const App = () => {
  //this uses hooks to change the way we set state and manipulate it
  const [activities, setActivities] = useState<IActivity[]>([]);

  //this uses hooks to take the place of componentDidMount, componentDidUpdate, and componentDidUnmount
  useEffect(() => {
    //we are telling axios that the response we are getting is of type IActivity
    Axios.get<IActivity[]>("http://localhost:5000/api/activities").then(
      Response => {
        setActivities(Response.data);
      }
    );
  }, []); //this empty array is VERY IMPORTANT! it makes it so we dont keep running the request a ton of times

  //using fragment is a better way to return multiple components instead of returning them in a div
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: 70 }}>
        <List>
          {activities.map(activityWegotBack => (
            <List.Item key={activityWegotBack.id}>
              {activityWegotBack.title}
            </List.Item>
          ))}
        </List>
      </Container>
    </Fragment>
  );
};

export default App;
