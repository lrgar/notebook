///<reference path="..\..\lib\node.d.ts"/>

import Strings = module("../../src/utils/strings");
import fs = module("fs");

var xml2js = require("xml2js");
var eyes = require("eyes");

export class IOException {
  private _message: string;

  constructor (message: string) {
    this._message = message;
  }

  public getMessage() {
    return this._message;
  }
}

export interface IInputData {
  getNextNumber(): any;
  getNextString(): any;
}

export interface IOutputLog {
  writeLine(value: string): void;
}

export class SimpleInputData implements IInputData {
  private offset: number = 0;

  constructor (private stream: string) {
  }

  public getNextNumber(): any {
    if (!this.skipBlanks())
      return false;

    var n = 0;
    while (this.offset < this.stream.length && this.isDigit(this.stream.charAt(this.offset))) {
      n = n * 10 + parseInt(this.stream.charAt(this.offset++));
    }

    return n;
  }

  public getNextString(): any {
    if (!this.skipBlanks())
      return false;

    var str = "";
    while (this.offset < this.stream.length && !this.isBlank(this.stream.charAt(this.offset))) {
      str += this.stream.charAt(this.offset++);
    }

    return str;
  }

  private isDigit(c: string) {
    return Strings.equalsToOneOf(c, ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
  }

  private isBlank(c: string) {
    return Strings.equalsToOneOf(c, ["\0", "\n", "\r", "\t", " "]);
  }

  private skipBlanks() {
    while (this.offset < this.stream.length && this.isBlank(this.stream.charAt(this.offset)))
      ++this.offset;
    return this.offset < this.stream.length;
  }
}

export class SimpleOutputLog implements IOutputLog {
  private log: string = "";

  public writeLine(value: string) {
    this.log += value + "\n";
  }

  public getLog() {
    return this.log;
  }
}

export class Environment {

}

function checkResults(output: IInputData, answer: IInputData) {
  var correct = true;
  while (true) {
    var a = output.getNextString();
    var b = answer.getNextString();

    if (a != false && b != false) {
      if (a != b) {
        correct = false;
        break;
      }
    } else if (a == false && b == false) {
      break;
    } else {
      correct = false;
      break;
    }
  }

  return correct;
}

export function defaultProcedure(testDataPath: string, environment: Environment, testCallback: (IInputData, IOutputLog) => void) {
  var xml = fs.readFileSync(testDataPath).toString();
  
  var parser = new xml2js.Parser();
  parser.parseString(xml, function(err, result) {
    var testData = result["test-data"];
    console.log("Test suite: " + testData["name"]);

    var testCases = testData["test-case"];
    for (var testCaseIndex = 0; testCaseIndex < testCases.length; ++testCaseIndex) {
      var testCase = testCases[testCaseIndex];

      var input = new SimpleInputData(testCase["input"][0]);
      var output = new SimpleOutputLog();

      testCallback(input, output);

      var valid = checkResults(
        new SimpleInputData(testCase["answer"][0]),
        new SimpleInputData(output.getLog()));

      if (valid) {
        eyes.inspector({ styles: { all: 'green' } })('GOOD', 'Test case #' + (testCaseIndex + 1));
      } else {
        eyes.inspector({ styles: { all: 'red' } })('BAD', 'Test case #' + (testCaseIndex + 1));
      }
    }
  });
}
