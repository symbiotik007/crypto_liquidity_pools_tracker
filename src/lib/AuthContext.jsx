// src/lib/AuthContext.jsx
// Maneja la sesión globalmente — disponible en toda la app
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [session, setSession]   = useState(null)
  const [user, setUser]         = useState(null)
  const [profile, setProfile]   = useState(null)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) fetchProfile(session.user.id)
        else setProfile(null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId) => {
    // Lee de la tabla profiles (creada con is_admin, is_paid, is_sso_gmail)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (!error && data) setProfile(data)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
    setProfile(null)
  }

  // Plan limits helper — mantiene compatibilidad con tabla plans si existe
  const canAddPool = (currentPools) => {
    if (!profile) return false
    const maxPools = profile.plans?.max_pools ?? 1
    if (maxPools === -1) return true
    return currentPools < maxPools
  }

  // Derivados directo desde profiles
  const isAdmin    = profile?.is_admin    === true
  const isPaid     = profile?.is_paid     === true
  const isPaused   = profile?.is_paused   === true
  const isSsoGmail = profile?.is_sso_gmail === true
  const isPro      = isPaid
  const isPremium  = isPaid
  const planLabel  = isPaid ? 'Trader en Formación' : 'Potencial Trader'

  return (
    <AuthContext.Provider value={{
      session, user, profile, loading,
      signOut, fetchProfile, canAddPool,
      isAdmin, isPaid, isPaused, isSsoGmail,
      isPro, isPremium, planLabel,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
