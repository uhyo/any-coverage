import something from "unknown-module";
import { foo, bar } from "./mod";

const any1 = something + 10;
const nonAny1 = foo + 10;

const any3 = bar(any2 => {
  return any2;
});

const {
  any4,
  _: [...any5]
} = any3;
