import React, { Fragment } from 'react';
import { Segment, List, Item, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IAttendee } from '../../app/models/activity';
interface IProps {
  attendees: IAttendee[];
}

const ActivitySideBar: React.FC<IProps> = ({ attendees }) => {
  return (
    <Fragment>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'>
        {attendees.length}{' '}
        {attendees.length === 1
          ? 'person is attending'
          : 'people are attending'}
      </Segment>
      <Segment attached>
        {attendees.map((attendant) => (
          <List relaxed divided key={attendant.username}>
            <Item style={{ position: 'relative' }}>
              {attendant.isHost && (
                <Label
                  style={{ position: 'absolute' }}
                  color='orange'
                  ribbon='right'>
                  Host
                </Label>
              )}
              <Image size='tiny' src={attendant.image || '/assets/user.png'} />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <Link to={`/profile/${attendant.username}`}>
                    {attendant.displayName}
                  </Link>
                </Item.Header>
              </Item.Content>
            </Item>
          </List>
        ))}
      </Segment>
    </Fragment>
  );
};

export default ActivitySideBar;
