// import { Provider } from 'react-redux'
import "./App.css";
import Header from "./components/header/Header";
// import store from './store/store'
import HomePage from "./components/homePage/HomePage";
import HomePage2 from "./components/homepage2/HomePage2";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import Footer from "./components/footer/Footer";
import { SocketProvider } from "./store/utils/SocketContext";
import Header_v2 from "./components/header_v2/Header_v2";

function App() {
  return (
    // <Router>
    <SocketProvider>
      <BrowserRouter>
        {/* <Provider store={store}> */}
        <Header />
        {/* <Header_v2 /> */}
        {/* <AppRouter className="pt-20"/> */}

        <div className="pt-20">
          {/* Apply padding for content */}
          <AppRouter />
        </div>

        {/* <HomePage /> */}

        {/* <StoryData /> */}
        {/* <HomePage2 /> */}
        <Footer />
        {/* </Provider> */}
      </BrowserRouter>
    </SocketProvider>
    // </Router>
  );
}

export default App;
