import StringUtils = module('../../utils/strings');
import ArrayUtils = module('../../utils/arrays');

export class SuffixArray {
  private str: string;
  private index: number[];

  constructor (str: string) {
    this.build(str);
  }

  private build(str: string) {
    var length = str.length, capacity = 1;
    var index = new number[];

    while (capacity < length) capacity *= 2;

    for (var i = 0; i < length; ++i) index[i] = i;
    index.sort((a: number, b: number) => StringUtils.compare(str[a], str[b]));

    var ranks = ArrayUtils.create(capacity, 0);

    ranks[index[0]] = 0;
    for (var i = 1, currentRank = 1; i < length; ++i)
      ranks[index[i]] = str[index[i - 1]] == str[index[i]] ? ranks[index[i - 1]] : currentRank++;
    
    for (var w = 1; w < length; w *= 2) {
      index.sort((a: number, b: number) =>
          ranks[a] != ranks[b] ? ranks[a] - ranks[b] : ranks[a + w] - ranks[b + w]);

      var newRanks = ArrayUtils.create(capacity, 0);
      newRanks[index[0]] = 0;
      for (var i = 1, currentRank = 1; i < length; ++i)
        newRanks[index[i]] = ranks[index[i - 1]] == ranks[index[i]] && ranks[index[i - 1] + w] == ranks[index[i] + w]
            ? newRanks[index[i - 1]] : currentRank++;
      
      ranks = newRanks;
    }
    
    this.str = str;
    this.index = index;
  }

  private static previewImpl(str: string, index: number[]) {
    var length = str.length, result = "";
    for (var i = 0; i < length; ++i) result += str.substring(index[i]) + '\n';
    return result;
  }
}