export function create(length: number, defaultValue: number) {
  var array = new number[];
  array.length = length;
  for (var i = 0; i < length; ++i) array[i] = defaultValue;
  return array;
}