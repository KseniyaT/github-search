import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Repository from './pages/repository/Repository';
import Issue from './pages/issue/Issue';
import NoMatch from './pages/no-match/NoMatch';
import 'materialize-css/dist/css/materialize.min.css';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repository/:owner/:repositoryId" element={<Repository />} />
          <Route path="/issue/:owner/:repositoryId/:number" element={<Issue />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>  
      </main>
    </> 
  );
};

export default App;
