import React, { Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import { useEffect } from "react";
import NavBar from "./components/nav/NavBar";
import ActivityDashboard from "./components/activities/ActivityDashboard";
import LoadingComponent from "./components/misc/LoadingComponent";
import ActivityStore from "./app/stores/activityStore";
import { observer } from "mobx-react-lite";
const App = () => {
  const activityStore = useContext(ActivityStore);

  //this uses hooks to take the place of componentDidMount, componentDidUpdate, and componentDidUnmount
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]); //this array is a dependency array we have to put all out dependecies used in here

  if (activityStore.loadingInitial)
    return <LoadingComponent content='Loading activities..' />;

  //using fragment is a better way to return multiple components instead of returning them in a div
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: 70 }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
