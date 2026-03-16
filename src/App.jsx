import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NaviBar from './components/NaviBar';
import Home from './components/Home';
import Login from './components/login';
import Join from './components/Join';
import Member from './components/Member';
import List from './components/List';
import CreateBoard from './components/CreateBoard';
import EditBoard from './components/EditBoard';
import Board from './components/Board';

const App = () => {
    return (
        <BrowserRouter>
        <NaviBar />
        <Routes>
            <Route path='/' element={<Home />} ></Route>
            <Route path='/join' element={<Join />} ></Route>
            <Route path='/login' element={<Login />} ></Route>
            <Route path='/board/create' element={<CreateBoard />} ></Route>
            <Route path='/list' element={<List />}></Route>
            <Route path='/board/:id' element={<Board />}></Route>
            <Route path='/board/edit/:id' element={<EditBoard />} ></Route>
            <Route path='/member' element={<Member />} ></Route>
        </Routes>
        </BrowserRouter>
    );
};

export default App;