import path from "path";
import ts, { getParsedCommandLineOfConfigFile } from "typescript";
import { visitStatement } from "./visitStatement";
import { CheckOptions, VisitOptions } from "./checkOptions";

export function check(configFile: string) {
  const projectDir = path.dirname(configFile);

  const parsedCommandLine = ts.getParsedCommandLineOfConfigFile(
    configFile,
    {},
    {
      getCurrentDirectory: ts.sys.getCurrentDirectory,
      useCaseSensitiveFileNames: ts.sys.useCaseSensitiveFileNames,
      readDirectory: ts.sys.readDirectory,
      fileExists: ts.sys.fileExists,
      readFile: ts.sys.readFile,
      onUnRecoverableConfigFileDiagnostic: diagnostic => {
        throw new Error(
          ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")
        );
      }
    }
  );
  if (!parsedCommandLine) {
    throw new Error("!?");
  }
  const program = ts.createProgram({
    rootNames: parsedCommandLine.fileNames,
    options: parsedCommandLine.options
  });

  checkProgram(program, {
    projectDir
  });
}

function checkProgram(program: ts.Program, options: CheckOptions) {
  const checker = program.getTypeChecker();
  const files = program.getSourceFiles();
  for (const file of files) {
    // TODO: チェックをちゃんと書く
    if (file.fileName.includes("node_modules")) continue;

    const o: VisitOptions = {
      projectDir: options.projectDir,
      checker,
      sourceFile: file
    };

    for (const statement of file.statements) {
      visitStatement(statement, o);
    }
  }
}
