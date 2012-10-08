import Test = module('./base/test');

var environment = new Test.Environment();

import DisjointSetTest = module('./algorithms/graph/disjoint-set');
DisjointSetTest.runTests(environment);

import SuffixArrayTest = module('./algorithms/strings/suffix-array');
SuffixArrayTest.runTests(environment);