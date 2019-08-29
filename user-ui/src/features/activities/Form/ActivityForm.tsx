import React from "react";
import { Segment, Form, Button } from "semantic-ui-react";

interface IProps{
  setEditMode:(editMode:boolean)=>void;
}
const ActivityForm:React.FC<IProps> = ({setEditMode}) => {
  return (
    <Segment>
      <Form>
        <Form.Input placeholder='Title' />
        <Form.Input placeholder='Category' />
        <Form.Input type='date' placeholder='Date' />
        <Form.Input placeholder='City' />
        <Form.Input placeholder='Venue' />
        <Form.TextArea rows={5} placeholder='Description' />
        <Button.Group widths={2}>
          <Button color='green' type ='submit' content='Submit'/>
          <Button onClick={()=>{setEditMode(false)}} color ='red' content ='Cancel'/>
        </Button.Group>
      </Form>
    </Segment>
  );
};
export default ActivityForm;
