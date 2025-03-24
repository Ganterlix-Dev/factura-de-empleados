import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
// import VisitorDashboard from './VisitorDashboard';
// import AdminDashboard from './AdminDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                {/* <Route path="/visitor" element={<VisitorDashboard />} /> */}
                {/* <Route path="/admin" element={<AdminDashboard />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
