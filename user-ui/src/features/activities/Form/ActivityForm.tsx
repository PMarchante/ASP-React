import React from "react";
import { Segment, Form } from "semantic-ui-react";

const ActivityForm = () => {
  return (
    <Segment>
      <Form>
        <Form.Input placeholder='Title' />
        <Form.Input placeholder='Category' />
        <Form.Input type='date' placeholder='Date' />
        <Form.Input placeholder='City' />
        <Form.Input placeholder='Venue' />
        <Form.TextArea rows={5} placeholder='Description' />
      </Form>
    </Segment>
  );
};
export default ActivityForm;
