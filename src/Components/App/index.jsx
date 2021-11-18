import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from 'Components/Header';
import LoginPage from 'Components/LoginPage';
import Dashboard from 'Components/Dashboard';
import CreateMeeting from 'Components/CreateMeeting';

import "./app.css"
const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route exact path="/" element={<LoginPage />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/create" element={<CreateMeeting />} />
            </Routes>
        </>
    );
}

export default App;
