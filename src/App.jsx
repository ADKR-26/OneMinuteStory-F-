import { Provider } from 'react-redux'
import './App.css'
import Header from './components/header/Header'
import store from './store/store'
import HomePage from './components/homePage/HomePage'
import HomePage2 from './components/homepage2/HomePage2'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter'

function App() {

  return (
    // <Router>
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <AppRouter />
        {/* <HomePage /> */}

        {/* <StoryData /> */}
        {/* <HomePage2 /> */}
      </Provider>
    </BrowserRouter>
    // </Router>
  )
}

export default App
