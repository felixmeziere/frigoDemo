import { ActionType, createStandardAction } from 'typesafe-actions';
import { AppState } from './reducer';

export const init = createStandardAction('APP/INIT')<{}>();

export const setAppField = createStandardAction('APP/SOME_ACTION')<{
  field: keyof AppState;
  value: string | number | boolean;
}>();

export type AppAction = ActionType<typeof setAppField | typeof init>;
