import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './auth.reducer';

const getloginstate = createFeatureSelector<State>('loginstate');


export const getlogin = createSelector(
    getloginstate,
    state => state.loggin
);

export const geterror = createSelector(
    getloginstate,
    state => state.error
);