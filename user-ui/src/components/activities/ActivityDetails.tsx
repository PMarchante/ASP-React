import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../app/stores/activityStore";
import { RouteComponentProps } from "react-router";
import LoadingComponent from "../misc/LoadingComponent";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivitySideBar from "./ActivitySideBar";

interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);

  const { activity, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]); //will run once when the component mounts because of the dependency array

  if (loadingInitial || !activity)
    return <LoadingComponent content='Loading...' />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivitySideBar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
