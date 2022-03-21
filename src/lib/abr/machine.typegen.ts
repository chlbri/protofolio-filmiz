// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    scroll: 'SCROLL_NAVBAR';
    assignScrollNavbar: 'SCROLL_NAVBAR';
    loadScroll: 'LOAD';
    loadGenre: 'LOAD';
    loadLanguage: 'LOAD';
    changeMovies:
      | 'done.invoke.(machine).starting:invocation[0]'
      | 'done.invoke.(machine).started.language.fetching:invocation[0]'
      | 'done.invoke.(machine).started.genre.fetching:invocation[0]';
    changeLocalMovies:
      | 'done.invoke.(machine).starting:invocation[0]'
      | 'done.invoke.(machine).started.language.fetching:invocation[0]'
      | 'done.invoke.(machine).started.genre.fetching:invocation[0]';
    select: 'SELECT';
    changeLanguage: 'done.invoke.(machine).started.language.changingLanguage:invocation[0]';
    changeGenre: 'done.invoke.(machine).started.genre.changingGenre:invocation[0]';
    loadMovies: 'LOAD';
    inc: 'xstate.init';
  };
  internalEvents: {
    'done.invoke.(machine).starting:invocation[0]': {
      type: 'done.invoke.(machine).starting:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.(machine).started.language.fetching:invocation[0]': {
      type: 'done.invoke.(machine).started.language.fetching:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.(machine).started.genre.fetching:invocation[0]': {
      type: 'done.invoke.(machine).started.genre.fetching:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.(machine).started.language.changingLanguage:invocation[0]': {
      type: 'done.invoke.(machine).started.language.changingLanguage:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.(machine).started.genre.changingGenre:invocation[0]': {
      type: 'done.invoke.(machine).started.genre.changingGenre:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    '': { type: '' };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    changeMovies:
      | 'done.invoke.(machine).starting:invocation[0]'
      | 'done.invoke.(machine).started.language.fetching:invocation[0]'
      | 'done.invoke.(machine).started.genre.fetching:invocation[0]';
    changeLanguage: 'done.invoke.(machine).started.language.changingLanguage:invocation[0]';
    changeGenre: 'done.invoke.(machine).started.genre.changingGenre:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    services: 'changeMovies' | 'changeLanguage' | 'changeGenre';
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    changeMovies: '';
    changeLanguage: 'CHANGE_LANGUAGE';
    changeGenre: 'CHANGE_GENRE';
  };
  eventsCausingGuards: {
    moviesArrayIsEmpty: '';
    checkEnvironmentsVariables: '';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'idle'
    | 'preparing'
    | 'starting'
    | 'error'
    | 'started'
    | 'started.selection'
    | 'started.selection.notselected'
    | 'started.selection.selected'
    | 'started.language'
    | 'started.language.normal'
    | 'started.language.changingLanguage'
    | 'started.language.nextFetch'
    | 'started.language.fetching'
    | 'started.language.caching'
    | 'started.genre'
    | 'started.genre.normal'
    | 'started.genre.changingGenre'
    | 'started.genre.nextFetch'
    | 'started.genre.fetching'
    | 'started.genre.caching'
    | 'fetch'
    | {
        started?:
          | 'selection'
          | 'language'
          | 'genre'
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
      };
  tags: never;
}
