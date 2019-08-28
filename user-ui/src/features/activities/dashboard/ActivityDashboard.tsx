import React, { Fragment } from 'react';
import { Grid, GridColumn, List } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
//make an interface so the component knows it is getting a prop of type IActivity
interface IProps{
    activities:IActivity[]
}
const ActivityDashboard: React.FC<IProps> =({activities})=>{

    return(
    <Grid>
        <Grid.Column width={10}>
        <List>
          {activities.map(activityWegotBack => (
            <List.Item key={activityWegotBack.id}>
              {activityWegotBack.title}
            </List.Item>
          ))}
        </List>
        </Grid.Column>
    </Grid>
    );
}

export default ActivityDashboard;