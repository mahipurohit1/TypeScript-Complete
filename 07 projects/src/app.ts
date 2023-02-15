interface validate {
  value: string | number;
  minLength?: number;
  maxLength?: number;
  max?: number;
  min?: number;
  required?: boolean;
}

interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}
interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dragDropHandler(event: DragEvent): void;
  dragleaveHandler(event: DragEvent): void;
}

enum ProjectStatus {
  Active,
  Finished,
}

type Listener = (items: Project[]) => void;

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

class ProjectState {
  private projects: Project[] = [];
  private listeners: Listener[] = [];
  private static instance: ProjectState;

  private constructor() {}

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }
  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }
  addlistener(listenerFunction: Listener) {
    this.listeners.push(listenerFunction);
  }

  private updateListeners() {
    for (const listenerFunction of this.listeners) {
      listenerFunction(this.projects.slice());
    }
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }
}

const projectState = ProjectState.getInstance();

function AutoBind(_: any, _2: string | symbol, descriptor: PropertyDescriptor) {
  const originalMethod: Function = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      return originalMethod.bind(this);
    },
  };
  return adjDescriptor;
}
function validate(validateAble: validate): boolean {
  let IsValid = true;
  if (validateAble.required) {
    IsValid = IsValid && validateAble.value.toString().trim().length !== 0;
  }
  if (validateAble.minLength != null) {
    if (typeof validateAble.value === "string") {
      IsValid =
        IsValid && validateAble.value.trim().length >= validateAble.minLength;
    }
  }
  if (validateAble.maxLength != null) {
    if (typeof validateAble.value === "string") {
      IsValid =
        IsValid && validateAble.value.trim().length <= validateAble.maxLength;
    }
  }
  if (validateAble.min != null) {
    if (typeof validateAble.value === "number") {
      IsValid = IsValid && validateAble.value >= validateAble.min;
    }
  }
  if (validateAble.max != null) {
    if (typeof validateAble.value === "number") {
      validateAble.value <= validateAble.max
        ? (IsValid = true)
        : (IsValid = false);
    }
  }
  return IsValid;
}

abstract class Components<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;
  constructor(
    templateId: string,
    hostId: string,
    initial: boolean,
    newElementId: string
  ) {
    this.templateElement = document.querySelector(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.querySelector(hostId)! as T;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    this.element.id = newElementId;
    this.attach(initial);
  }
  attach(initialValue: boolean) {
    this.hostElement.insertAdjacentElement(
      initialValue ? "afterbegin" : "beforeend",
      this.element
    );
  }
}
class ProjectItem
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

class ProjectList
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

class ProjectInput extends Components<HTMLDivElement, HTMLFormElement> {
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

const prjInput = new ProjectInput();
const activeProject = new ProjectList("active");
const finishedProject = new ProjectList("finished");
