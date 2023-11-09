import {createReducer} from '@reduxjs/toolkit';
import {RootState} from '../Store';
import {User} from './userReducer';
export type Reply = {
  user: User;
  title: string;
  likes: User[];
  _id: string;
  reply: Reply[];
};
export type Post = {
  image: {
    public_id: string;
    url: string;
  };
  _id: string;
  title: string;
  user: User;
  replies: Reply[];
  likes: User[];
};
export type IPostType = {
  posts: any[];
  post: any;
  error: any;
  isSuccess: boolean;
  isLoading: boolean;
};
const intialState: IPostType = {
  posts: [],
  post: {},
  error: null,
  isSuccess: false,
  isLoading: true,
};

export const postReducer = createReducer(intialState, {
  postCreateRequest: state => {
    state.isLoading = true;
  },
  postCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.post = action.payload;
    state.isSuccess = true;
  },
  postCreateFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  getAllPostsRequest: state => {
    state.isLoading = true;
  },
  getAllPostsSuccess: (state, action) => {
    state.isLoading = false;
    state.posts = action.payload;
  },
  getAllPostsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  clearErrors: state => {
    state.error = null;
  },
});

export const selectPost: (state: RootState) => IPostType = (state: RootState) =>
  state.post;
