import { party } from "./party";
import { makeAutoObservable } from "mobx";

export class Store {
  data: any;
  constructor() {
    makeAutoObservable(this);
  }
  init({ org, token }: { org: string; token: string }) {
    const conn = party.init({ org, token });
    conn?.addEventListener("close", (e) => {
      console.log(e);
    });
    // conn?.addEventListener("open", (e: any) => {
    //   console.log(e);
    //   this.data = e.data;
    // });
    conn?.addEventListener("error", (e) => {
      console.log(e);
    });
    conn?.addEventListener("message", (e) => {
      const data = JSON.parse(e.data);
      if (data.usecase === "init") {
        this.data = data.payload;
      }
    });
  }
}

export const store = new Store();
