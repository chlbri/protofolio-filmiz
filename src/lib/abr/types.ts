import type Movie from "../ebr/Movie";

export type TContext = {
  selected: Movie | undefined;
};

export type TEvent =
  | { type: "select"; value: Movie | undefined }
  | { type: "resetSelection" };
