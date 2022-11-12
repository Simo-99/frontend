import React from "react";
import Login from './components/Login';
import Logout from './components/Logout';

import Months_Past from './components/SUBMITS/Months_Past';
import Months_View from './components/SUBMITS/Months_View';
import Years_View from './components/SUBMITS/Years_View';
import Submits_Edit from './components/SUBMITS/Submits_Edit';
import Table_Form from './components/SUBMITS/Table_Form';

import Players from './components/PLAYERS/Players';
import Formers from './components/PLAYERS/Formers';

import Players_Show from './components/PLAYERS/Players_Show';
import Players_Hide from './components/PLAYERS/Players_Hide';
import Players_Delete from './components/PLAYERS/Players_Delete';
import Players_Add from './components/PLAYERS/Players_Add';
import Players_Edit from './components/PLAYERS/Players_Edit';
import Players_View from './components/PLAYERS/Players_View';

import Hall from './components/SUBMITS/Hall';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';



const ROLES = {
  'User': 0,
  'Helper': 1,
  'Admin': 2
}

function App() {



  return (

    <Routes>

      <Route path="/" element={<Layout />}>

        {/* PUBLIC ROUTES*/}
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />

        {/* PRIVATE ROUTES*/}
        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
          <Route path="/players" element={<Players />} />
          <Route path="/players/formers" element={<Formers />} />
          <Route path="/players/:id/submits" element={<Players_View />} />

          <Route path="/hall" element={<Hall />} />
          <Route path="/months" element={<Months_Past />} />

          <Route path="/months/:month" element={<Months_View />} />
          <Route path="/years/:year" element={<Years_View />} />

        </Route>

        {/* PROTECTED ROUTES*/}

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/players/:id/hide" element={<Players_Hide />} />
          <Route path="/players/:id/show" element={<Players_Show />} />
          <Route path="/players/:id/delete" element={<Players_Delete />} />
          <Route path="/players/:id/edit" element={<Players_Edit />} />
          <Route path="/players/add" element={<Players_Add />} />

          <Route path="/submits/:id/edit" element={<Submits_Edit />} />
          <Route path="/data" element={<Table_Form />} />

        </Route>

      </Route>
    </Routes >
  );
}

export default App;