import React, { Fragment, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { IActivity } from "./app/models/activity";
import NavBar from "./components/nav/NavBar";
import ActivityDashboard from "./components/activities/ActivityDashboard";
import agent from "./app/api/agent";
import LoadingComponent from "./components/misc/LoadingComponent";

const App = () => {
  //this uses hooks to change the way we set state and manipulate it
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  //this handler will set the stage for creating an activity
  const handleCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  //the agent function is axios this will create the activity server side and client side
  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity)
      .then(() => {
        setActivities([
          ...activities.filter(a => a.id !== activity.id),
          activity
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDelete = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id)
      .then(() => {
        setActivities([...activities.filter(a => a.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  //this uses hooks to take the place of componentDidMount, componentDidUpdate, and componentDidUnmount
  useEffect(() => {
    //we are telling axios that the response we are getting is of type IActivity
    agent.Activities.list()
      .then(Response => {
        let formattedDateActivity: IActivity[] = [];
        Response.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          formattedDateActivity.push(activity);
        });
        setActivities(formattedDateActivity);
      })
      .then(() => setLoading(false));
  }, []); //this empty array is VERY IMPORTANT! it makes it so we dont keep running the request a ton of times

  if (loading) return <LoadingComponent content='Loading activities..' />;

  //using fragment is a better way to return multiple components instead of returning them in a div
  return (
    <Fragment>
      <NavBar createActivity={handleCreateForm} />
      <Container style={{ marginTop: 70 }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity} //the exclamation mark tells typescript that this prop can be an Iactivity or null
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDelete}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default App;
