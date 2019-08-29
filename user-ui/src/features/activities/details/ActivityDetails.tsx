import React from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  activity: IActivity;
  setEditMode: (editMode: boolean) => void;
}

const ActivityDetails: React.FC<IProps> = ({ activity, setEditMode }) => {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content>
        <Button.Group widths={2}>
          <Button
            onClick={() => setEditMode(true)}
            color='green'
            content='Edit'
          />
          <Button color='red' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
