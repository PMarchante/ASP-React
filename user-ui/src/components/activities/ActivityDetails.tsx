import React, { useContext, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";

import { observer } from "mobx-react-lite";
import ActivityStore from "../../app/stores/activityStore";
import { RouteComponentProps } from "react-router";
import LoadingComponent from "../misc/LoadingComponent";
import { Link } from "react-router-dom";

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
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity!.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content>
        <Button.Group widths={2}>
          <Button
            as={Link}
            to={`/manage/${activity.id}`}
            color='green'
            content='Edit'
          />
          <Button
            onClick={() => history.push("/activities")} //dont use go back, better to redirect to home page or the page before
            color='red'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
