import { EventObject, Interpreter, State, Typestate } from "xstate";
import Movie from "../Movie";
import requests from "../requests";

export type TContext = {
  selected: Movie | undefined;
  genre: keyof typeof requests;
  movies: Movie[];
  language: string;
};

export type TEvent =
  | {
      type: 'fetch';
      value: keyof typeof requests;
    }
  | { type: 'select'; value: Movie | undefined }
  | { type: 'changeLanguage'; value: string }
  | { type: 'resetLanguage' | 'hardReset' | 'resetSelection' };

export type ContextType<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  },
> =
  | [
      State<TContext, TEvent, any, TTypestate>,
      Interpreter<TContext, any, TEvent, TTypestate>['send'],
      Omit<
        Interpreter<TContext, any, TEvent, TTypestate>,
        'send' | 'sender' | 'state'
      >,
    ]
  | undefined;
