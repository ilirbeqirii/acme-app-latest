import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, usersFeature } from './user.reducer';

// #1. classic, pre-v15, and still existing way of creating selectors explicitly
const selectUsersState = createFeatureSelector<UserState>('users');

export const selectMaskUserName = createSelector(
  selectUsersState,
  (state) => state.maskUserName
);

export const selectUser = createSelector(
  selectUsersState,
  (state) => state.user
);

// #2. or we can use the already default provided selectors from createFeature Fn
// usersFeature.selectUser;
// usersFeature.selectMaskUserName;
// usersFeature.selectUsersState;
