import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import postReducer from "../slices/postSlice";
import appReducer from "../slices/appSlice";
// import filterReducer from "../slices/filterSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  app: appReducer,
  // filter: filterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: { warnAfter: 128 },
    }).concat(thunk),
});

export const persistor = persistStore(store);
