import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  //this uses hooks to change the way we set state and manipulate it
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
  };

  //this handler will set the stage for creating an activity
  const handleCreateForm = ()=>{
    setSelectedActivity(null);
    setEditMode(true);
  }

  //this uses hooks to take the place of componentDidMount, componentDidUpdate, and componentDidUnmount
  useEffect(() => {
    //we are telling axios that the response we are getting is of type IActivity
    Axios.get<IActivity[]>("http://localhost:5000/api/activities").then(
      Response => {
        setActivities(Response.data);
      }
    );
  }, []) //this empty array is VERY IMPORTANT! it makes it so we dont keep running the request a ton of times

  //using fragment is a better way to return multiple components instead of returning them in a div
  return (
    <Fragment>
      <NavBar createActivity={handleCreateForm}/>
      <Container style={{ marginTop: 70 }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity} //the exclamation mark tells typescript that this prop can be an Iactivity or null
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          
        />
      </Container>
    </Fragment>
  );
};

export default App;
