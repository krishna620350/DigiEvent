import { BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';

import App from '../Components/App';
import FormPropsTextFields from '../Components/Js/login';

class Router extends React.Component {
    render() {
        return <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={<App />}
                        />
                        <Route
                            path="/login"
                            element={<FormPropsTextFields />}
                        />
                        <Route 
                            path="/Register"
                            element={<FormPropsTextFields />}
                        />
                    </Routes>
                </BrowserRouter>
    }
}

export default Router;