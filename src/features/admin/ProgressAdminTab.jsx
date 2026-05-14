import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../lib/AuthContext'
import { supabase } from '../../lib/supabase'
import { CRYPTO_BOOTCAMP } from '../programa/data/cryptoBootcampData'
import { CURSO } from '../programa/data/cursoData'

const TOTAL_BOOTCAMP = CRYPTO_BOOTCAMP.reduce((a, m) => a + m.clases.length, 0)
const TOTAL_PROGRAMA = CURSO.reduce((a, m) => a + m.lecciones.length, 0)

// lesson_id → { moduleTitulo, course }
const LESSON_MAP = {}
CRYPTO_BOOTCAMP.forEach(m => m.clases.forEach(c => {
  LESSON_MAP[c.id] = { moduleTitulo: m.titulo, course: 'bootcamp' }
}))
CURSO.forEach(m => m.lecciones.forEach(l => {
  LESSON_MAP[l.id] = { moduleTitulo: m.titulo.replace(/Módulo \d+ — /, ''), course: 'programa' }
}))

const fmtDate = (d) => d
  ? new Date(d).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })
  : '—'

const pct = (done, total) => total ? Math.round((done / total) * 100) : 0

function ProgressBar({ done, total, color = '#00e5ff' }) {
  const p = pct(done, total)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 4, background: 'var(--border-dim)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${p}%`, height: '100%', background: p === 100 ? '#00ff88' : color, borderRadius: 2, transition: 'width 0.3s' }} />
      </div>
      <span style={{ fontSize: 11, color: 'var(--text-dim)', minWidth: 32, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
        {done}/{total}
      </span>
    </div>
  )
}

function ModuleBreakdown({ lessonIds }) {
  const bootcampModules = CRYPTO_BOOTCAMP.map(m => {
    const done = m.clases.filter(c => lessonIds.includes(c.id)).length
    return { titulo: m.titulo, done, total: m.clases.length }
  })
  const programaModules = CURSO.map(m => {
    const done = m.lecciones.filter(l => lessonIds.includes(l.id)).length
    return { titulo: m.titulo.replace(/Módulo \d+ — /, ''), done, total: m.lecciones.length }
  })

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: '16px 20px 20px', background: 'var(--bg-base)', borderTop: '1px solid var(--border-dim)' }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: '#00e5ff', marginBottom: 10 }}>
          Crypto Bootcamp
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {bootcampModules.map((m, i) => (
            <div key={i}>
              <div style={{ fontSize: 11, color: m.done === m.total ? '#00ff88' : 'var(--text-muted)', marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {m.done === m.total ? '✓ ' : ''}{m.titulo}
              </div>
              <ProgressBar done={m.done} total={m.total} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: '#a78bfa', marginBottom: 10 }}>
          Programa
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {programaModules.map((m, i) => (
            <div key={i}>
              <div style={{ fontSize: 11, color: m.done === m.total ? '#00ff88' : 'var(--text-muted)', marginBottom: 3 }}>
                {m.done === m.total ? '✓ ' : ''}{m.titulo}
              </div>
              <ProgressBar done={m.done} total={m.total} color='#a78bfa' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ProgressAdminTab() {
  const { isAdmin } = useAuth()
  const [students, setStudents]   = useState([])
  const [progress, setProgress]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')
  const [expanded, setExpanded]   = useState(null)
  const [sortBy, setSortBy]       = useState('bootcamp') // 'bootcamp' | 'programa' | 'name' | 'last'

  const load = useCallback(async () => {
    if (!isAdmin) { setLoading(false); return }
    setLoading(true)
    const [{ data: profiles }, { data: prog }] = await Promise.all([
      supabase.from('profiles').select('id, full_name, email, is_paid').order('created_at', { ascending: false }),
      supabase.from('user_lesson_progress').select('user_id, course, lesson_id, completed_at').order('completed_at', { ascending: false }),
    ])
    setStudents(profiles || [])
    setProgress(prog || [])
    setLoading(false)
  }, [isAdmin])

  useEffect(() => { load() }, [load])

  const stats = students.map(u => {
    const up      = progress.filter(p => p.user_id === u.id)
    const bootcamp = up.filter(p => p.course === 'bootcamp').length
    const programa = up.filter(p => p.course === 'programa').length
    const lastAt   = up[0]?.completed_at ?? null
    return { ...u, bootcamp, programa, lastAt, lessonIds: up.map(p => p.lesson_id) }
  })

  const filtered = stats
    .filter(u => !search || u.full_name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'bootcamp') return b.bootcamp - a.bootcamp
      if (sortBy === 'programa') return b.programa - a.programa
      if (sortBy === 'name')     return (a.full_name || a.email || '').localeCompare(b.full_name || b.email || '')
      if (sortBy === 'last')     return (b.lastAt || '') > (a.lastAt || '') ? 1 : -1
      return 0
    })

  const initials = (u) => (u.full_name || u.email || '?').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  const SortBtn = ({ id, label }) => (
    <button
      onClick={() => setSortBy(id)}
      style={{
        background: sortBy === id ? 'rgba(var(--color-accent-rgb),0.1)' : 'transparent',
        border: `1px solid ${sortBy === id ? 'var(--border-blue)' : 'var(--border-dim)'}`,
        color: sortBy === id ? 'var(--color-accent)' : 'var(--text-dim)',
        fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6,
        cursor: 'pointer', fontFamily: 'Outfit,sans-serif', letterSpacing: 0.5,
      }}
    >{label}</button>
  )

  if (!isAdmin) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: 'var(--text-label)', fontSize: 14, fontFamily: 'Outfit,sans-serif' }}>
      🔒 Acceso restringido
    </div>
  )

  const activeStudents = stats.filter(u => u.bootcamp + u.programa > 0).length
  const avgBootcamp    = stats.length ? Math.round(stats.reduce((a, u) => a + u.bootcamp, 0) / stats.length) : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Summary cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[
          { label: 'Estudiantes totales', value: students.length, sub: 'registrados' },
          { label: 'Con progreso activo', value: activeStudents, sub: 'han completado ≥ 1 lección' },
          { label: 'Promedio Bootcamp', value: `${avgBootcamp}/${TOTAL_BOOTCAMP}`, sub: 'lecciones por estudiante' },
        ].map((c, i) => (
          <div key={i} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-dim)', borderRadius: 10, padding: '14px 18px' }}>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 6, fontFamily: 'Outfit,sans-serif', letterSpacing: 0.5 }}>{c.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit,sans-serif' }}>{c.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Controls ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Buscar estudiante..."
          style={{
            flex: 1, minWidth: 180, padding: '8px 12px', background: 'var(--bg-input)',
            border: '1px solid var(--border-dim)', color: 'var(--text-primary)',
            fontSize: 13, borderRadius: 8, fontFamily: 'Outfit,sans-serif', outline: 'none',
          }}
        />
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--text-faint)', fontFamily: 'Outfit,sans-serif' }}>Ordenar:</span>
          <SortBtn id="bootcamp" label="Bootcamp" />
          <SortBtn id="programa" label="Programa" />
          <SortBtn id="last"     label="Reciente" />
          <SortBtn id="name"     label="Nombre" />
        </div>
        <button onClick={load} style={{ padding: '7px 14px', background: 'transparent', border: '1px solid var(--border-dim)', color: 'var(--text-dim)', fontSize: 12, borderRadius: 8, cursor: 'pointer', fontFamily: 'Outfit,sans-serif' }}>
          ↺ Recargar
        </button>
      </div>

      {/* ── Student list ── */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-faint)', fontSize: 13, fontFamily: 'Outfit,sans-serif' }}>Cargando...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border-dim)', borderRadius: 10, overflow: 'hidden' }}>

          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 12, padding: '10px 20px', background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-dim)' }}>
            {['Estudiante', 'Bootcamp', 'Programa', 'Última actividad'].map((h, i) => (
              <div key={i} style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--text-faint)', fontFamily: 'Outfit,sans-serif' }}>{h}</div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--text-faint)', fontSize: 13, fontFamily: 'Outfit,sans-serif' }}>
              No se encontraron estudiantes
            </div>
          )}

          {filtered.map((u, idx) => {
            const isOpen = expanded === u.id
            return (
              <div key={u.id} style={{ borderBottom: idx < filtered.length - 1 ? '1px solid var(--border-dim)' : 'none' }}>

                {/* Row */}
                <div
                  onClick={() => setExpanded(isOpen ? null : u.id)}
                  style={{
                    display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 12,
                    padding: '14px 20px', cursor: 'pointer', alignItems: 'center',
                    background: isOpen ? 'rgba(var(--color-accent-rgb),0.04)' : 'transparent',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = 'var(--bg-elevated)' }}
                  onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = 'transparent' }}
                >
                  {/* Student info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(var(--color-accent-rgb),0.12)', border: '1px solid var(--border-blue)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 800, color: 'var(--color-accent)', fontFamily: 'Outfit,sans-serif',
                    }}>{initials(u)}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Outfit,sans-serif' }}>
                        {u.full_name || '—'}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{u.email}</div>
                    </div>
                    {u.is_paid && (
                      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.8, color: '#00e5ff', background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: 999, padding: '2px 8px' }}>PRO</span>
                    )}
                  </div>

                  {/* Bootcamp */}
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: u.bootcamp > 0 ? 'var(--text-primary)' : 'var(--text-faint)', fontFamily: 'Outfit,sans-serif', marginBottom: 4 }}>
                      {pct(u.bootcamp, TOTAL_BOOTCAMP)}%
                    </div>
                    <ProgressBar done={u.bootcamp} total={TOTAL_BOOTCAMP} />
                  </div>

                  {/* Programa */}
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: u.programa > 0 ? 'var(--text-primary)' : 'var(--text-faint)', fontFamily: 'Outfit,sans-serif', marginBottom: 4 }}>
                      {pct(u.programa, TOTAL_PROGRAMA)}%
                    </div>
                    <ProgressBar done={u.programa} total={TOTAL_PROGRAMA} color='#a78bfa' />
                  </div>

                  {/* Last activity */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, color: u.lastAt ? 'var(--text-muted)' : 'var(--text-faint)', fontFamily: 'Outfit,sans-serif' }}>
                      {u.lastAt ? fmtDate(u.lastAt) : 'Sin actividad'}
                    </span>
                    <span style={{ fontSize: 14, color: 'var(--text-faint)', transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s' }}>›</span>
                  </div>
                </div>

                {/* Expanded module breakdown */}
                {isOpen && <ModuleBreakdown lessonIds={u.lessonIds} />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
