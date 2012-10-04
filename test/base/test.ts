module Test {

  export class InputData {
    public getNumber() {
      return 0;
    }
  }

  export class OutputLog {
    public writeLine(data: string) {
    }
  }

  export class Environment {
  }

  export function defaultProcedure(testDataPath: string, environment: Environment, testCallback: (InputData, OutputLog) => void ) {
  }
}