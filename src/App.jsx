import { Provider } from 'react-redux'
import './App.css'
import Header from './components/header/Header'
import store from './store/store'
import HomePage from './components/homePage/HomePage'
function App() {

  return (
    <Provider store={store}>
      <Header />
      <HomePage />
    </Provider>
  )
}

export default App
