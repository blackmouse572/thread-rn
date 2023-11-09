import {configureStore} from '@reduxjs/toolkit';
import {userReducer} from './reducers/userReducer';
import {postReducer} from './reducers/postReducer';
import {notificationReducer} from './reducers/notificationReducer';

const Store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    notification: notificationReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;

export default Store;
