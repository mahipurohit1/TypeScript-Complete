export abstract class Components<T extends HTMLElement, U extends HTMLElement> {
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
