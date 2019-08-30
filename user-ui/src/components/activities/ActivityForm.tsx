import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

interface IProps {
  activity: IActivity;
}
const ActivityForm: React.FC<IProps> = ({ activity: initialFormState }) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    cancelFormOpen
  } = activityStore;

  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleSubmitChanges = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
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
          <Button onClick={cancelFormOpen} color='red' content='Cancel' />
        </Button.Group>
      </Form>
    </Segment>
  );
};
export default observer(ActivityForm);
