import { RootStore } from './rootStore';
import { observable, action, reaction } from 'mobx';

export default class CommonStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem('jwt', token);
        } else {
          window.localStorage.removeItem('jwt');
        }
      }
    );
  }

  @observable token: string | null = window.localStorage.getItem('jwt');
  @observable appLoaded = false;

  //this will store the token we get back from the api server so we can send it up
  //with transactions to get access to stuff
  @action setToken = (token: string | null) => {
    window.localStorage.setItem('jwt', token!);
    this.token = token;
  };

  @action setAppLoaded = () => {
    this.appLoaded = true;
  };
}
