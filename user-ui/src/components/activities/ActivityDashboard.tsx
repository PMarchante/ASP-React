import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./ActivityForm";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../app/stores/activityStore";
//make an interface so the component knows it is getting a prop of type IActivity

const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { editMode, selectedActivity } = activityStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>

      <Grid.Column width={6}>
        {
          //the && means that component will only be rendered if not null
        }
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && (
          <ActivityForm
            //gave this key so the component will rerender if we change the selected activity
            key={(selectedActivity && selectedActivity.id) || 0}
            activity={selectedActivity!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
