import Login from './components/LOGIN';
import Logout from './components/LOGOUT';
import Home from './components/HOME';

import MONTHS_PAST from './components/SUBMITS/MONTHS_PAST';
import MONTHS_VIEW from './components/SUBMITS/MONTHS_VIEW';
import YEARS_VIEW from './components/SUBMITS/YEARS_VIEW';
import SUBMITS_EDIT from './components/SUBMITS/SUBMITS_EDIT';
import TABLE_FORM from './components/SUBMITS/TABLE_FORM';

import PLAYERS from './components/PLAYERS/PLAYERS';
import FORMERS from './components/PLAYERS/FORMERS';

import PLAYERS_SHOW from './components/PLAYERS/PLAYERS_SHOW';
import PLAYERS_HIDE from './components/PLAYERS/PLAYERS_HIDE';
import PLAYERS_DELETE from './components/PLAYERS/PLAYERS_DELETE';
import PLAYERS_ADD from './components/PLAYERS/PLAYERS_ADD';
import PLAYERS_EDIT from './components/PLAYERS/PLAYERS_EDIT';
import PLAYERS_VIEW from './components/PLAYERS/PLAYERS_VIEW';

import RequireAuth from './RequireAuth';
import { Routes, Route } from 'react-router-dom';
import HALL from './components/SUBMITS/HALL';



const ROLES = { 'User': 0, 'Helper': 1, 'Admin': 2 }

function App() {



  return (

    <Routes>

      <Route path="/">

        {/* PUBLIC ROUTES*/}
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />

        {/* PRIVATE ROUTES*/}
        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin, ROLES.Helper]} />}>
          <Route path="/players" element={<PLAYERS />} />
          <Route path="/players/formers" element={<FORMERS />} />
          <Route path="/players/:id/submits" element={<PLAYERS_VIEW />} />

          <Route path="/hall" element={<HALL />} />
          <Route path="/months" element={<MONTHS_PAST />} />

          <Route path="/months/:month" element={<MONTHS_VIEW />} />
          <Route path="/years/:year" element={<YEARS_VIEW />} />

        </Route>

        {/* PROTECTED ROUTES*/}

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/players/:id/hide" element={<PLAYERS_HIDE />} />
          <Route path="/players/:id/show" element={<PLAYERS_SHOW />} />
          <Route path="/players/:id/delete" element={<PLAYERS_DELETE />} />
          <Route path="/players/:id/edit" element={<PLAYERS_EDIT />} />
          <Route path="/players/add" element={<PLAYERS_ADD />} />

          <Route path="/submits/:id/edit" element={<SUBMITS_EDIT />} />
          <Route path="/data" element={<TABLE_FORM />} />

        </Route>

      </Route>
    </Routes >
  );
}

export default App;