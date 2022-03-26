import 'tachyons';
import Signup from './pages/Signup';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />

        <Route path="*" element={<NotFound/>} />
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
