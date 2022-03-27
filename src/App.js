import 'tachyons';
import SignupLogin from './pages/SignupLogin';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupLogin login={false}/>} />
        <Route path="/login" element={<SignupLogin login={true} />} />
        <Route path="/*" element={<Layout/>} />
      </Routes>
    </Router>
  );
}

function NotFound () {
  return (
    <h1>Page not found</h1>
  )
}

export default App;
