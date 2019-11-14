import ts = require("typescript");
import { VisitOptions } from "./checkOptions";

export function visitStatement(statement: ts.Statement, options: VisitOptions) {
  // console.log(statement.getFullText(options.sourceFile));
  if (ts.isVariableStatement(statement)) {
    for (const d of statement.declarationList.declarations) {
      const { name } = d;
      visitBindingName(name, options);
    }
  } else if (ts.isImportDeclaration(statement)) {
    const { importClause } = statement;
    const { name, namedBindings } = importClause ?? {};

    if (name) {
      visitBindingName(name, options);
    }
    if (namedBindings) {
      if (ts.isNamespaceImport(namedBindings)) {
        visitBindingName(namedBindings.name, options);
      } else {
        for (const e of namedBindings.elements) {
          visitBindingName(e.name, options);
        }
      }
    }
  }
}

function visitBindingName(name: ts.BindingName, options: VisitOptions) {
  if (ts.isIdentifier(name)) {
    const { checker } = options;
    const ty = checker.getTypeAtLocation(name);
    if (ty.flags & ts.TypeFlags.Any) {
      console.log(name.text, "is any");
    } else {
      console.log(name.text, "is not any");
    }
  } else {
    for (const e of name.elements) {
      if (ts.isBindingElement(e)) {
        visitBindingName(e.name, options);
      }
    }
  }
}
