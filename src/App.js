import Login from './components/LOGIN';
import Logout from './components/LOGOUT';

import Months_Past from './components/SUBMITS/MONTHS_PAST';
import Months_View from './components/SUBMITS/MONTHS_VIEW';
import Years_View from './components/SUBMITS/YEARS_VIEW';
import Submits_Edit from './components/SUBMITS/SUBMITS_EDIT';
import Table_Form from './components/SUBMITS/TABLE_FORM';

import PLAYERS from './components/PLAYERS/PLAYERS';
import FORMERS from './components/PLAYERS/FORMERS';

import PLAYERS_SHOW from './components/PLAYERS/PLAYERS_SHOW';
import PLAYERS_HIDE from './components/PLAYERS/PLAYERS_HIDE';
import PLAYERS_DELETE from './components/PLAYERS/PLAYERS_DELETE';
import PLAYERS_ADD from './components/PLAYERS/PLAYERS_ADD';
import PLAYERS_EDIT from './components/PLAYERS/PLAYERS_EDIT';
import PLAYERS_VIEW from './components/PLAYERS/PLAYERS_VIEW';

import Hall from './components/SUBMITS/HALL';
import RequireAuth from './RequireAuth';
import { Routes, Route } from 'react-router-dom';



const ROLES = { 'User': 0, 'Helper': 1, 'Admin': 2 }

function App() {



  return (

    <Routes>

      <Route path="/">

        {/* PUBLIC ROUTES*/}
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />

        {/* PRIVATE ROUTES*/}
        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin, ROLES.Helper]} />}>
          <Route path="/players" element={<PLAYERS />} />
          <Route path="/players/formers" element={<FORMERS />} />
          <Route path="/players/:id/submits" element={<PLAYERS_VIEW />} />

          <Route path="/hall" element={<Hall />} />
          <Route path="/months" element={<Months_Past />} />

          <Route path="/months/:month" element={<Months_View />} />
          <Route path="/years/:year" element={<Years_View />} />

        </Route>

        {/* PROTECTED ROUTES*/}

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/players/:id/hide" element={<PLAYERS_HIDE />} />
          <Route path="/players/:id/show" element={<PLAYERS_SHOW />} />
          <Route path="/players/:id/delete" element={<PLAYERS_DELETE />} />
          <Route path="/players/:id/edit" element={<PLAYERS_EDIT />} />
          <Route path="/players/add" element={<PLAYERS_ADD />} />

          <Route path="/submits/:id/edit" element={<Submits_Edit />} />
          <Route path="/data" element={<Table_Form />} />

        </Route>

      </Route>
    </Routes >
  );
}

export default App;