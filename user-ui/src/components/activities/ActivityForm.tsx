import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IActivity } from "../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initialFormState,
    loadActivity,
    clearActivity
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: ""
  });

  //this function will allow us to still get the activity details in the form when we refresh the page
  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(
        () => initialFormState && setActivity(initialFormState)
      );
    }
    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    clearActivity,
    match.params.id,
    initialFormState,
    activity.id.length
  ]);

  const handleSubmitChanges = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment>
          <Form onSubmit={handleSubmitChanges}>
            <Form.Input
              onChange={handleInputChange}
              name='title'
              placeholder='Title'
              value={activity.title}
            />
            <Form.Input
              onChange={handleInputChange}
              placeholder='Category'
              name='category'
              value={activity.category}
            />
            <Form.Input
              onChange={handleInputChange}
              type='datetime-local'
              placeholder='Date'
              name='date'
              value={activity.date}
            />
            <Form.Input
              onChange={handleInputChange}
              placeholder='City'
              name='city'
              value={activity.city}
            />
            <Form.Input
              onChange={handleInputChange}
              placeholder='Venue'
              name='venue'
              value={activity.venue}
            />
            <Form.TextArea
              onChange={handleInputChange}
              rows={5}
              placeholder='Description'
              name='description'
              value={activity.description}
            />
            <Button.Group widths={2}>
              <Button
                loading={submitting}
                color='green'
                type='submit'
                content='Submit'
              />
              <Button
                onClick={() => history.push("/activities")}
                color='red'
                content='Cancel'
              />
            </Button.Group>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityForm);
