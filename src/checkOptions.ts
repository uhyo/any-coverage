import ts from "typescript";

export type CheckOptions = {
  projectDir: string;
};

export type VisitOptions = {
  projectDir: string;
  checker: ts.TypeChecker;
  sourceFile: ts.SourceFile;
};
