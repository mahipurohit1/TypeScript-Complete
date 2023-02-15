import { AutoBind } from "../decorators/Autobind";
import { Draggable } from "../drag-drop/drag-drop";
import { Project } from "../state/project-state";
import { Components } from "./base";

export class ProjectItem
  extends Components<HTMLUListElement, HTMLUListElement>
  implements Draggable
{
  private project: Project;

  get person() {
    if (this.project.people === 1) {
      return "1 person assigned";
    } else {
      return `${this.project.people} persons assigned`;
    }
  }

  constructor(hostId: string, project: Project) {
    super("#single-project", hostId, true, project.id);
    this.project = project;
    this.renderContent();
    this.configure();
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.person;
    this.element.querySelector("p")!.textContent = this.project.description;
  }
  @AutoBind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }
  @AutoBind
  dragEndHandler(_event: DragEvent): void {
    console.log("dragEnd");
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }
}
