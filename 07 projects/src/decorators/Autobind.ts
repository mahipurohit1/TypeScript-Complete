export function AutoBind(
  _: any,
  _2: string | symbol,
  descriptor: PropertyDescriptor
) {
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
