import { Routes, Route } from 'react-router-dom';
import TopHead from './TopHead';
import NavBar from './NavBar';

function Layout() {
    return (
        <>
            <TopHead />
            <NavBar />
            <Routes>
                <Route path="" element={<Home />} />
                <Route exact path="home" element={<Home />} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </>
    )
}

function Home() {
    return <h2>Home</h2>
}

function NotFound () {
    return (
      <h1>Page not found</h1>
    )
  }

export default Layout;