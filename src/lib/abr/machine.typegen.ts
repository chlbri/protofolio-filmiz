// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    scroll: 'SCROLL_NAVBAR';
    assignScrollNavbar: 'SCROLL_NAVBAR';
    select: 'SELECT';
    changeLanguage: 'done.invoke.(machine).language.changingLanguage:invocation[0]';
    changeMovies:
      | 'done.invoke.(machine).language.fetching:invocation[0]'
      | 'done.invoke.(machine).genre.fetching:invocation[0]';
    changeGenre: 'done.invoke.(machine).genre.changingGenre:invocation[0]';
    inc: 'xstate.init';
  };
  internalEvents: {
    'done.invoke.(machine).language.changingLanguage:invocation[0]': {
      type: 'done.invoke.(machine).language.changingLanguage:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.(machine).language.fetching:invocation[0]': {
      type: 'done.invoke.(machine).language.fetching:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.(machine).genre.fetching:invocation[0]': {
      type: 'done.invoke.(machine).genre.fetching:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.(machine).genre.changingGenre:invocation[0]': {
      type: 'done.invoke.(machine).genre.changingGenre:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    '': { type: '' };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    changeLanguage: 'done.invoke.(machine).language.changingLanguage:invocation[0]';
    changeMovies:
      | 'done.invoke.(machine).language.fetching:invocation[0]'
      | 'done.invoke.(machine).genre.fetching:invocation[0]';
    changeGenre: 'done.invoke.(machine).genre.changingGenre:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    services: 'changeLanguage' | 'changeMovies' | 'changeGenre';
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    changeLanguage: 'CHANGE_LANGUAGE';
    changeMovies: '';
    changeGenre: 'CHANGE_GENRE';
  };
  eventsCausingGuards: {
    checkEnvironmentsVariables: '';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'selection'
    | 'selection.notselected'
    | 'selection.selected'
    | 'language'
    | 'language.normal'
    | 'language.changingLanguage'
    | 'language.nextFetch'
    | 'language.fetching'
    | 'language.caching'
    | 'genre'
    | 'genre.normal'
    | 'genre.changingGenre'
    | 'genre.nextFetch'
    | 'genre.fetching'
    | 'genre.caching'
    | {
        selection?: 'notselected' | 'selected';
        language?:
          | 'normal'
          | 'changingLanguage'
          | 'nextFetch'
          | 'fetching'
          | 'caching';
        genre?:
          | 'normal'
          | 'changingGenre'
          | 'nextFetch'
          | 'fetching'
          | 'caching';
      };
  tags: never;
}
