import { Box } from "@mui/system";
import React, { Component } from "react";
import ReactDom from "react-dom";
import Navigation from "./Nav/Navigation";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";

import {QueryClient} from "react-query";

const client = new QueryClient();

function App() {
    return (
        <Box>
            <Navigation />
            <BrowserRouter>
                <div className="m-5">
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </Box>
    )
}


export default App;

if (document.getElementById('react')) {
    ReactDom.render(<App />, document.getElementById('react'));
}
