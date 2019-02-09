import React from "react";

import { Button, Navbar, Sidebar, Footer } from "ui";

import "./App.scss";

const App = () => {

    return (
        <div className="app">
            <Navbar />
            <Sidebar />
            <div className="content-container">
                <Button>click me</Button>
            </div>
            <Footer />
        </div>
    );
};

export default App