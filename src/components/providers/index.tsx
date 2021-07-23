import { FC } from "react";
import { Interpreter, ServiceConfig } from "xstate";
import Context, { ContextInterpreter } from "../../lib/context";

type Props = {
  children: JSX.IntrinsicElements["div"]["children"];
  value: ContextInterpreter;
};

const Provider: FC<Props> = ({ children, value }) => (
  <Context.Provider {...{ value }}>{children}</Context.Provider>
);

export default Provider;
