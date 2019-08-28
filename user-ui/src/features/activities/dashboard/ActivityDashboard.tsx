import React, { Fragment } from 'react';
import { Grid, GridColumn, List } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
//make an interface so the component knows it is getting a prop of type IActivity
interface IProps{
    activities:IActivity[]
}
const ActivityDashboard: React.FC<IProps> =({activities})=>{

    return(
    <Grid>
        <Grid.Column width={10}>
          <ActivityList activities={activities}/>
        </Grid.Column>
    </Grid>
    );
}

export default ActivityDashboard;