export default function objectKeys<T extends Record<PropertyKey, unknown>>(
  obj: T,
): (keyof T)[] {
  return Object.keys(obj);
}
