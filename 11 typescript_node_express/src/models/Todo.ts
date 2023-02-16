import { v4 as uuidV4 } from "uuid";

export default class Todo {
  id: string;
  text: string;

  constructor(text: string) {
    this.id = uuidV4();
    this.text = text;
  }
}
