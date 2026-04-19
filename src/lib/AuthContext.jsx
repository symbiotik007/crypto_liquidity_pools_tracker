// src/lib/AuthContext.jsx
// Maneja la sesión globalmente — disponible en toda la app
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [session, setSession]   = useState(null)
  const [user, setUser]         = useState(null)
  const [profile, setProfile]   = useState(null)  // datos de nuestra tabla users
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    // Sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      setLoading(false)
    })

    // Escuchar cambios de sesión
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
    const { data, error } = await supabase
      .from('users')
      .select('*, plans(*)')
      .eq('id', userId)
      .single()

    if (!error && data) {
      setProfile(data)
      // Actualizar last_seen_at
      await supabase
        .from('users')
        .update({ last_seen_at: new Date().toISOString() })
        .eq('id', userId)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
    setProfile(null)
  }

  // Plan limits helper
  const canAddPool = (currentPools) => {
    if (!profile) return false
    const maxPools = profile.plans?.max_pools ?? 1
    if (maxPools === -1) return true          // unlimited
    return currentPools < maxPools
  }

  const isPro     = profile?.plan_id === 'pro' || profile?.plan_id === 'premium'
  const isPremium = profile?.plan_id === 'premium'

  return (
    <AuthContext.Provider value={{
      session, user, profile, loading,
      signOut, fetchProfile, canAddPool,
      isPro, isPremium,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
