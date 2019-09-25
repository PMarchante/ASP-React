import React, { useContext } from 'react';
import { Segment, Item, Button, Header, Image } from 'semantic-ui-react';
import { IActivity } from '../../app/models/activity';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { RootStoreContext } from '../../app/stores/rootStore';

const activityImageStyle = {
  filter: 'brightness(30%)'
};

const activityImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const ActivityDetailHeader: React.FC<{ activity: IActivity }> = ({
  activity
}) => {
  const rootStore = useContext(RootStoreContext);
  const { attendActivity, cancelAttendance, loading } = rootStore.activityStore;
  const host = activity.attendees.filter(x => x.isHost)[0];
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          style={activityImageStyle}
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
        />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={activity.title}
                  style={{ color: 'white' }}
                />
                <p>{format(activity.date, 'eeee do MMMM')}</p>
                <p>
                  Hosted by <strong>{host.username}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        {activity.isHost ? (
          <Button
            as={Link}
            to={`/manage/${activity.id}`}
            color='orange'
            floated='right'
            content='Manage Event'
          />
        ) : activity.isGoing ? (
          <Button
            color='red'
            content='Cancel attendance'
            onClick={cancelAttendance}
            loading={loading}
          />
        ) : (
          <Button
            color='teal'
            content='Join Activity'
            onClick={attendActivity}
            loading={loading}
          />
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityDetailHeader);
