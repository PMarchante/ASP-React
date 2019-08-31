import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityStore from "../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../misc/LoadingComponent";

const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  //this uses hooks to take the place of componentDidMount, componentDidUpdate, and componentDidUnmount
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]); //this array is a dependency array we have to put all out dependecies used in here

  if (activityStore.loadingInitial)
    return <LoadingComponent content='Loading activities..' />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>

      <h2>Activity filters</h2>
    </Grid>
  );
};

export default observer(ActivityDashboard);
