import Graph = module('../../../src/algorithms/graph/disjoint-set');
import Test = module('../../base/test');

function test(data: Test.IInputData, output: Test.IOutputLog) {
  var nodes = data.getNextNumber(), unionRequests = data.getNextNumber(), queryRequests = data.getNextNumber();

  var disjointSet = new Graph.DisjointSet(nodes);
  for (var i = 0; i < unionRequests; ++i) {
    var a = data.getNextNumber(), b = data.getNextNumber();
    disjointSet.join(a, b);
  }

  for (var i = 0; i < queryRequests; ++i) {
    var a = data.getNextNumber(), b = data.getNextNumber();
    output.writeLine(disjointSet.areJoined(a, b) ? 'YES' : 'NO');
  }
}

export function runTests(environment: Test.Environment) {
  Test.defaultProcedure('test\\algorithms\\graph\\disjoint-set.test-data', environment, test);
}