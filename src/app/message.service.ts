import { Injectable } from "@angular/core";
import { SrvRecord } from "dns";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  constructor() {}
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
