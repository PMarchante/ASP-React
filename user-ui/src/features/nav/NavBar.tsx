import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { IActivity } from "../../app/models/activity";
interface IProps{
  createActivity:() =>void;
}

const NavBar: React.FC<IProps> = ({createActivity}) => {
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: 10 }} />
          React
        </Menu.Item>
        <Menu.Item name='Activities' />
        <Menu.Item>
          <Button onClick={()=> createActivity()}
          positive content='Create activity' />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
