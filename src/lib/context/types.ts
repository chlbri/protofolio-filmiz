import { EventObject, Interpreter, State, Typestate } from "xstate";
import Movie from "../Movie";
import requests from "../requests";

export type Requests = keyof typeof requests;

export type TContext = {
  selected: Movie | undefined;
 
};

export function isRequest(value: any): value is Requests {
  const keys = Object.keys(requests);
  return !!value && typeof value === "string" && keys.includes(value);
}

export type TEvent =
  | {
      type: "fetch";
      value: Requests;
    }
  | { type: "select"; value: Movie | undefined }
  | { type: "changeLanguage"; value: string }
  | { type: "resetLanguage" | "hardReset" | "resetSelection" };

export type ContextType<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
> =
  | [
      State<TContext, TEvent, any, TTypestate>,
      Interpreter<TContext, any, TEvent, TTypestate>["send"],
      Omit<
        Interpreter<TContext, any, TEvent, TTypestate>,
        "send" | "sender" | "state"
      >
    ]
  | undefined;
