import { AutoBind } from "../decorators/Autobind";
import { DragTarget } from "../drag-drop/drag-drop";
import { Project, projectState, ProjectStatus } from "../state/project-state";
import { Components } from "./base";
import { ProjectItem } from "./projectitem";

export class ProjectList
  extends Components<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignProjects: any[];
  private type: string = "active" || "finished ";
  constructor(t: string) {
    super("#project-list", "#app", false, `${t}-projects`);
    this.type = t;
    this.assignProjects = [];

    projectState.addlistener((projects: Project[]) => {
      const relevantProject = projects.filter((project) => {
        if (this.type === "active") {
          return project.status === ProjectStatus.Active;
        } else {
          return project.status === ProjectStatus.Finished;
        }
      });
      this.assignProjects = relevantProject;
      this.renderProjects();
      this.element.addEventListener("dragleave", this.dragleaveHandler);
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("drop", this.dragDropHandler);
    });

    this.renderContent();
  }
  @AutoBind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEle = this.element.querySelector("ul")!;
      listEle.classList.add("droppable");
    }
  }
  @AutoBind
  dragDropHandler(event: DragEvent): void {
    const prjid = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      prjid,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }
  @AutoBind
  dragleaveHandler(_event: DragEvent): void {
    const listEle = this.element.querySelector("ul")!;
    listEle.classList.remove("droppable");
  }

  private renderProjects() {
    const list = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    list.innerHTML = "";
    for (const project of this.assignProjects) {
      new ProjectItem(`#${this.element.querySelector("ul")!.id}`, project);
    }
  }
  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      `${this.type} - projects`.toUpperCase();
  }
}
