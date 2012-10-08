import Strings = module('../../../src/algorithms/strings/suffix-array');
import Test = module('../../base/test');

function test(data: Test.IInputData, output: Test.IOutputLog) {
  var nodes = data.getNextString();

  var suffixArray = new Strings.SuffixArray(nodes);
}

export function runTests(environment: Test.Environment) {
  Test.defaultProcedure('test\\algorithms\\strings\\suffix-array.test-data', environment, test);
}