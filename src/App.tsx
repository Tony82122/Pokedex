import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { HomePage, AboutPage } from './Pages';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;

