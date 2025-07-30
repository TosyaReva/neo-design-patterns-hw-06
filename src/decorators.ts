// Декоратор для додавання timestamp
export function withTimestamp<This, Args extends [string, ...any[]], Return>(
  originalMethod: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Return
  >
): (this: This, ...args: Args) => Return {
  function functionWithTimestamp(this: This, ...args: Args) {
    const prefix = "[" +  new Date().toISOString().split(".")[0].replace("T", " ") + "] "
    args[0] = prefix + args[0]
    return originalMethod.apply(this, args)
  }

  return functionWithTimestamp
}

// Декоратор для перетворення в верхній регістр
export function uppercase<This, Args extends [string, ...any[]], Return>(
  originalMethod: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Return
  >
): (this: This, ...args: Args) => Return {
  function functionWithTimestamp(this: This, ...args: Args) {
    args[0] = args[0].toUpperCase();
    return originalMethod.apply(this, args)
  }

  return functionWithTimestamp
}
