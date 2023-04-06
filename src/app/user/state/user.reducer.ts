import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../user';
import * as UserActions from './user.actions';

export interface UserState {
  maskUserName: boolean;
  user: User | undefined;
}

const initialState: UserState = {
  maskUserName: false,
  user: undefined,
};

// #1. using createReducer Fn
export const usersReducer = createReducer(
  initialState,
  on(UserActions.maskUserName, (state): UserState => {
    return {
      ...state,
      maskUserName: !state.maskUserName,
    };
  })
);

// #2. using createFeature Fn
export const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,
    on(UserActions.maskUserName, (state): UserState => {
      return {
        ...state,
        maskUserName: !state.maskUserName,
      };
    })
  ),
});

// a default set of selectors are generated based on the state properties:
// usersFeature.selectUsersState;
// usersFeature.selectMaskUserName;
// usersFeature.selectUser;
