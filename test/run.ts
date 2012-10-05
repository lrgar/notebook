import DisjointSetTest = module('./algorithms/graph/disjoint-set');
import Test = module('./base/test');

var environment = new Test.Environment();
DisjointSetTest.runTests(environment);