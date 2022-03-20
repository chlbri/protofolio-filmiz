// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    select: 'SELECT';
    changeLanguage: 'done.invoke.(machine).language.changingLanguage:invocation[0]';
    changeGenre: 'done.invoke.(machine).genre.changingGenre:invocation[0]';
    inc: 'xstate.init';
  };
  internalEvents: {
    'done.invoke.(machine).language.changingLanguage:invocation[0]': {
      type: 'done.invoke.(machine).language.changingLanguage:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.(machine).genre.changingGenre:invocation[0]': {
      type: 'done.invoke.(machine).genre.changingGenre:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    changeLanguage: 'done.invoke.(machine).language.changingLanguage:invocation[0]';
    changeGenre: 'done.invoke.(machine).genre.changingGenre:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    services: 'changeLanguage' | 'changeGenre';
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    changeLanguage: 'CHANGE_LANGUAGE';
    changeGenre: 'CHANGE_GENRE';
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | 'selection'
    | 'selection.notselected'
    | 'selection.selected'
    | 'language'
    | 'language.normal'
    | 'language.changingLanguage'
    | 'genre'
    | 'genre.normal'
    | 'genre.changingGenre'
    | {
        selection?: 'notselected' | 'selected';
        language?: 'normal' | 'changingLanguage';
        genre?: 'normal' | 'changingGenre';
      };
  tags: never;
}
