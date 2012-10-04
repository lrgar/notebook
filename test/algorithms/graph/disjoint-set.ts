///<reference path='..\..\..\src\algorithms\graph\disjoint-set.ts'/>
///<reference path='..\..\base\test.ts'/>

declare var Graph;
declare var Test;

function test(data: Test.InputData, output: Test.OutputLog) {
  var nodes = data.getNumber(), unionRequests = data.getNumber(), queryRequests = data.getNumber();
  
  var disjointSet = new Graph.DisjointSet(nodes);
  for (var i = 0; i < unionRequests; ++i) {
    var a = data.getNumber(), b = data.getNumber();
    disjointSet.join(a, b);
  }

  for (var i = 0; i < queryRequests; ++i) {
    var a = data.getNumber(), b = data.getNumber();
    output.writeLine(disjointSet.areJoined(a, b) ? "YES" : "NO");
  }
}

function runTests(environment: Test.Environment) {
  Test.defaultProcedure("disjoint-set.test-data", environment, test);
}

