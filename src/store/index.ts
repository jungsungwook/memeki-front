import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slice/userSlice';
import { userAuthController } from './controller/userAuthController';

const store = configureStore({
  reducer: {
    user: userSlice,
    [userAuthController.reducerPath]: userAuthController.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 직렬화 검사 비활성화
    }).concat(userAuthController.middleware),
  devTools: process.env.NODE_ENV !== 'production', // 개발 모드에서만 DevTools 활성화
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
