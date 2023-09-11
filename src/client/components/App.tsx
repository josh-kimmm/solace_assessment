'use client'

import { Provider } from 'react-redux';
import store from "@/client/store";
import React from 'react';


type PropTypes = { children: React.ReactNode }
const App = ({ children }: PropTypes) => {

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
};


export default App;