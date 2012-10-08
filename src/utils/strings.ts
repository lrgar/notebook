export function equalsToOneOf(str: string, values: string[]) {
  for (var i = 0; i < values.length; ++i)
    if (str == values[i])
      return true;
  return false;
}

export function compare(a: string, b: string) {
  return a.localeCompare(b);
}