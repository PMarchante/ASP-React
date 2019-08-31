import React, { useContext } from "react";

import { Item, Button, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../app/stores/activityStore";
import { Link } from "react-router-dom";

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    activitiesByDate,
    deleteActivity,
    submitting,
    target
  } = activityStore;

  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map(activity => (
          <Item key={activity.id}>
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
                  as={Link}
                  to={`/activities/${activity.id}`}
                  floated='right'
                  content='view'
                  color='pink'
                />
                <Button
                  name={activity.id}
                  loading={target === activity.id && submitting}
                  onClick={e => deleteActivity(e, activity.id)}
                  content='delete'
                  color='yellow'
                  floated='right'
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

export default observer(ActivityList);
