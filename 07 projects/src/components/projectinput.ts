import { AutoBind } from "../decorators/Autobind";
import { projectState } from "../state/project-state";
import { validate } from "../validation/validation";
import { Components } from "./base";

export class ProjectInput extends Components<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;

  constructor() {
    super("#project-input", "#app", true, "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.getConfigure();
  }

  private getherUserInput(): [string, string, number] | void {
    const title = this.titleInputElement.value;
    const description = this.descriptionInputElement.value;
    const people = this.peopleInputElement.value;

    if (
      !validate({
        value: title,
        required: true,
        minLength: 2,
        maxLength: 10,
      }) ||
      !validate({
        value: description,
        required: true,
        minLength: 5,
        maxLength: 100,
      }) ||
      !validate({ value: people, required: true })
    ) {
      alert("invalid input");
      return;
    }
    return [title, description, +people];
  }
  clear() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @AutoBind
  private addSubmitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.getherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clear();
    }
  }
  getConfigure(): void {
    this.element.addEventListener("submit", this.addSubmitHandler);
  }
}
