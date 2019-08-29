import React, { useState, FormEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}
const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialFormState,
  createActivity,
  editActivity
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
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
          <Button color='green' type='submit' content='Submit' />
          <Button
            onClick={() => {
              setEditMode(false);
            }}
            color='red'
            content='Cancel'
          />
        </Button.Group>
      </Form>
    </Segment>
  );
};
export default ActivityForm;
