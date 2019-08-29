import React from "react";
import { IActivity } from "../../../app/models/activity";
import { Item, Button, Label, Segment } from "semantic-ui-react";
interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
}

const ActivityList: React.FC<IProps> = ({ activities, selectActivity }) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map(activity => (
          <Item>
            <Item.Content>
              <Item.Header>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectActivity(activity.id)}
                  floated='right'
                  content='view'
                  color='pink'
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
        
      </Item.Group>
    </Segment>
  );
};

export default ActivityList;
