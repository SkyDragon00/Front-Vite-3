import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import {
  Login,
  Register,
  Home,
  Admin,
  AdminAddGame,
  AdminDeleteGame,
  Purchase,
  Recommendations,
  Seasonal,
  AdminDateReport
} from './pages';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoute />}>
        <Route path='/home' element={<Home />} />
        <Route path='/purchase' element={<Purchase />} />
        <Route path='/recommendations' element={<Recommendations />} />
        <Route path='/seasonal' element={<Seasonal />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/add-game' element={<AdminAddGame />} />
        <Route path='/admin/delete-game' element={<AdminDeleteGame />} />
        <Route path="/admin/date-report" element={<AdminDateReport />} />
      </Route>
    </Routes>
  )
}
