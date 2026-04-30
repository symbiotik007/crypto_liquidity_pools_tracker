import { createBrowserRouter, Navigate } from 'react-router-dom'
import RequireAuth        from './RequireAuth'
import Home              from '../pages/Home'
import App               from '../App'
import AuthCallback      from '../pages/AuthCallback'
import ProgramasPage     from '../pages/ProgramasPage'
import LiquidityEnginePage from '../pages/LiquidityEnginePage'

export const router = createBrowserRouter([
  { path: '/',                element: <Home /> },
  { path: '/app',             element: <RequireAuth><App /></RequireAuth> },
  { path: '/programas',       element: <ProgramasPage /> },
  { path: '/liquidity-engine', element: <LiquidityEnginePage /> },
  { path: '/auth/callback',   element: <AuthCallback /> },
  { path: '*',                element: <Navigate to="/" replace /> },
])
