import React from 'react'
import { Provider } from 'react-redux'

import configStore from './store'

import './app.less'

const store = configStore()

const App: React.FC = (props) => {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
}

export default App
