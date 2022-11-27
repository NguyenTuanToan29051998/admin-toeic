import {createSlice, Dispatch} from '@reduxjs/toolkit';
import {AppThunk} from '../store';
import {authService} from '../../services';
import {UserDTO} from '../../models/admin/User';
import {RootState} from './index';

// Reducers
const {reducer, actions} = createSlice({
  name: 'loginUser',
  initialState: null,
  reducers: {
    setLoginUser: (state, action): UserDTO | null => action.payload,
  },
});

// Actions
export const login = (loginForm: {
  email: string;
  password: string;
}): AppThunk<Promise<UserDTO>> => async (
  dispatch: Dispatch,
): Promise<UserDTO> => {
  const user = await authService.login(loginForm);
  dispatch(actions.setLoginUser(user));
  return user;
};

export const getLoginUser = (): AppThunk<Promise<UserDTO>> => async (
  dispatch: Dispatch,
): Promise<UserDTO> => {
  const user = await authService.getLoginUser();
  dispatch(actions.setLoginUser(user));
  return user;
};

export const logout = (): AppThunk => (dispatch: Dispatch): void => {
  authService.logout();
  dispatch(actions.setLoginUser(null));
};

// Selectors
export const selectors = {
  selectLoginUser: (state: RootState): UserDTO | null => state.loginUser,
};

export default reducer;
