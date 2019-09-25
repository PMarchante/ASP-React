import React from 'react';
import { List, Image, Popup } from 'semantic-ui-react';
import { IAttendee } from '../../app/models/activity';

const ActivityListItemAttendees: React.FC<{ attendees: IAttendee[] }> = ({
  attendees
}) => {
  return (
    <List horizontal>
      {attendees.map((attendant) => (
        <List.Item key={attendant.displayName}>
          <Popup
            content={attendant.displayName}
            trigger={
              <Image
                size='mini'
                circular
                src={attendant.image || '/assets/user.png'}
              />
            }
          />
        </List.Item>
      ))}
    </List>
  );
};

export default ActivityListItemAttendees;
