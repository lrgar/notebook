export function equalsToOneOf(str: string, values: string[]) {
  for (var i = 0; i < values.length; ++i)
    if (str == values[i])
      return true;
  return false;
}