import React, { Fragment } from 'react';
import { IActivity } from '../../../app/models/activity';
import { List } from 'semantic-ui-react';
interface IProp{
    activities:IActivity[]
}

const ActivityList: React.FC<IProp>=({activities})=>{

    return(
    <Fragment>
        <List>
                {activities.map(activityWegotBack => (
            <List.Item key={activityWegotBack.id}>
                {activityWegotBack.title}
            </List.Item>
            ))}
        </List>
      </Fragment>)
}

export default ActivityList;