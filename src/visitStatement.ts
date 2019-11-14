import ts = require("typescript");
import { VisitOptions } from "./checkOptions";

export function visitStatement(statement: ts.Statement, options: VisitOptions) {
  console.log(statement.getFullText(options.sourceFile));
  if (ts.isVariableStatement(statement)) {
    for (const d of statement.declarationList.declarations) {
      const { name } = d;
      visitBindingName(name, options);
    }
  }
}

function visitBindingName(name: ts.BindingName, options: VisitOptions) {
  if (ts.isIdentifier(name)) {
    console.log(name.text);
  } else {
    for (const e of name.elements) {
      if (ts.isBindingElement(e)) {
        visitBindingName(e.name, options);
      }
    }
  }
}
