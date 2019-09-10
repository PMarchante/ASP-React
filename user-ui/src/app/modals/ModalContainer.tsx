import React, { useContext } from 'react';
import { Modal } from 'semantic-ui-react';
import { RootStoreContext } from '../stores/rootStore';
import { observer } from 'mobx-react-lite';

const ModalContainer = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    modal: { open, body },
    closeModel
  } = rootStore.modalStore;

  return (
    <Modal open={open} onClose={closeModel} size='mini'>
      <Modal.Content>{body}</Modal.Content>
    </Modal>
  );
};

export default observer(ModalContainer);
