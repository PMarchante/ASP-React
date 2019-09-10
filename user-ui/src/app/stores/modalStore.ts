import { RootStore } from './rootStore';
import { observable, action } from 'mobx';

export default class ModalStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  //the shallow means it will be an observable on the first level because objects are inherently observed deeply
  @observable.shallow modal = {
    open: false,
    body: null
  };

  @action openModel = (content: any) => {
    this.modal.open = true;
    this.modal.body = content;
  };

  @action closeModel = () => {
    this.modal.open = false;
    this.modal.body = null;
  };
}
