// src/pages/Home.jsx
import { useState, useEffect, useRef } from 'react'
import oscarImg from '../assets/OscarB1.jpg'
import cryptoHouseLogo from '../assets/cryptohouselogo.png'
import CryptoPriceBar from '../components/CryptoPriceBar'

// ─────────────────────────────────────────────────────────────────

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cyan:    #00e5ff;
    --dark:    #050a0f;
    --dark2:   #070d14;
    --dark3:   #0a1520;
    --border:  #0e2435;
    --text:    #c8e6f0;
    --muted:   #4a7a96;
    --dimmed:  #2a5a72;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Outfit', sans-serif;
    background: var(--dark);
    color: var(--text);
    overflow-x: hidden;
  }

  /* ── NAVBAR — pill flotante centrada ── */
  .nav-wrap {
    position: fixed; top: 40px; left: 0; right: 0; z-index: 100;
    display: flex; justify-content: center; pointer-events: none;
  }
  .nav {
    pointer-events: all;
    display: flex; align-items: center; gap: 2px;
    padding: 5px 5px 5px 18px;
    background: rgba(7,13,20,0.82);
    border: 1px solid rgba(0,229,255,0.12);
    border-radius: 999px;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.04) inset,
                0 8px 40px rgba(0,0,0,0.5),
                0 0 24px rgba(0,229,255,0.05);
  }
  .nav-brand {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none; padding-right: 16px;
    border-right: 1px solid rgba(0,229,255,0.1);
    margin-right: 6px;
  }
  .nav-name { font-size: 12px; font-weight: 700; color: rgba(200,230,240,0.85); letter-spacing: 1.5px; text-transform: uppercase; }
  .nav-links { display: flex; align-items: center; gap: 2px; }
  .nav-link {
    font-size: 12.5px; color: rgba(200,230,240,0.55); text-decoration: none;
    font-weight: 500; letter-spacing: 0.4px; cursor: pointer;
    padding: 7px 14px; border-radius: 999px;
    transition: background 0.15s, color 0.15s;
    white-space: nowrap;
  }
  .nav-link:hover { background: rgba(0,229,255,0.08); color: #c8e6f0; }
  .nav-link.active { color: var(--cyan); }
  .nav-sep {
    width: 1px; height: 20px; background: rgba(0,229,255,0.1);
    margin: 0 8px; flex-shrink: 0;
  }
  .nav-cta {
    padding: 7px 16px; background: transparent; color: rgba(200,230,240,0.55);
    font-family: 'Outfit', sans-serif; font-size: 12.5px; font-weight: 600;
    border: none; cursor: pointer; letter-spacing: 0.3px; border-radius: 999px;
    transition: background 0.15s, color 0.15s; text-decoration: none; display: inline-block;
    white-space: nowrap;
  }
  .nav-cta:hover { background: rgba(0,229,255,0.07); color: #c8e6f0; }

  /* ── DROPDOWN Formación ── */
  .nav-dropdown { position: relative; }
  .nav-dropdown-btn {
    font-size: 12.5px; color: rgba(200,230,240,0.55); font-weight: 500;
    letter-spacing: 0.4px; cursor: pointer; padding: 7px 14px; border-radius: 999px;
    display: flex; align-items: center; gap: 4px;
    transition: background 0.15s, color 0.15s;
    background: none; border: none; font-family: 'Outfit', sans-serif; white-space: nowrap;
  }
  .nav-dropdown-btn:hover, .nav-dropdown-btn.open { background: rgba(0,229,255,0.08); color: #c8e6f0; }
  .nav-dropdown-menu {
    position: absolute; top: calc(100% + 6px); left: 50%;
    transform: translateX(-50%);
    background: rgba(7,13,20,0.97); border: 1px solid rgba(0,229,255,0.18);
    border-radius: 12px; padding: 6px; min-width: 210px;
    transition: opacity 0.15s, transform 0.15s;
    backdrop-filter: blur(24px); z-index: 1000;
    box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset;
  }
  .nav-dropdown-item {
    display: flex; align-items: center; gap: 10px; padding: 10px 14px;
    border-radius: 8px; color: rgba(200,230,240,0.75); font-size: 13px; font-weight: 500;
    text-decoration: none; transition: all 0.12s; cursor: pointer;
    white-space: nowrap; background: none; border: none;
    font-family: 'Outfit', sans-serif; width: 100%; text-align: left;
  }
  .nav-dropdown-item:hover { background: rgba(0,229,255,0.08); color: var(--cyan); }
  .nav-dropdown-sep { height: 1px; background: rgba(0,229,255,0.08); margin: 4px 6px; }

  /* ── Rainbow App button — pill shape ── */
  .nav-app {
    position: relative; overflow: hidden;
    padding: 8px 20px; border-radius: 999px;
    font-family: 'Outfit', sans-serif; font-size: 12.5px; font-weight: 700;
    letter-spacing: 0.5px; text-transform: uppercase;
    text-decoration: none; display: inline-block; cursor: pointer; color: #050a0f;
    background: linear-gradient(90deg, #00e5ff, #7b61ff, #ff4f6e, #ffb347, #00ff88, #00e5ff);
    background-size: 280% 100%;
    border: none;
    transition: background-position 0.55s ease, box-shadow 0.3s ease;
    box-shadow: 0 0 12px rgba(0,229,255,0.3);
    white-space: nowrap;
  }
  .nav-app:hover {
    background-position: 100% 0;
    box-shadow: 0 0 20px rgba(123,97,255,0.55), 0 0 36px rgba(0,229,255,0.3);
    color: #050a0f;
  }
  .nav-app::after {
    content: ''; position: absolute; inset: 0; border-radius: 999px;
    background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%);
    transform: translateX(-100%); transition: transform 0.4s ease;
  }
  .nav-app:hover::after { transform: translateX(100%); }

  @media(max-width:900px) {
    .nav-links, .nav-sep, .nav-cta { display: none; }
    .nav { padding: 5px 5px 5px 14px; }
    .nav-brand { border-right: none; padding-right: 8px; margin-right: 0; }
  }

  /* ── HERO ── */
  .hero {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    text-align: center; padding: 48px 40px 80px;
    position: relative; overflow: hidden;
    background: var(--dark);
  }
  .hero::before {
    content: '';
    position: absolute; top: -40%; left: 50%; transform: translateX(-50%);
    width: 800px; height: 800px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 65%);
    pointer-events: none;
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(var(--border) 1px, transparent 1px),
                      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 60px 60px; opacity: 0.3; pointer-events: none;
  }
  .hero-content { position: relative; z-index: 1; max-width: 820px; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 16px; border: 1px solid rgba(0,229,255,0.3);
    background: rgba(0,229,255,0.05); margin-bottom: 28px;
    font-size: 12px; color: var(--cyan); letter-spacing: 1.5px; text-transform: uppercase;
  }
  .hero-badge-dot { width: 6px; height: 6px; background: var(--cyan); border-radius: 50%; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .hero-title {
    font-size: clamp(42px, 7vw, 72px); font-weight: 900;
    line-height: 1.05; margin-bottom: 12px;
    color: #fff; letter-spacing: -1px;
  }
  .hero-title span { color: var(--cyan); }
  .hero-sub {
    font-size: clamp(16px, 2vw, 20px); color: var(--muted);
    line-height: 1.7; max-width: 580px; margin: 0 auto 40px;
    font-weight: 400;
  }
  .hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 60px; }
  .btn-primary {
    padding: 15px 36px; background: var(--cyan); color: var(--dark);
    font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700;
    border: none; cursor: pointer; letter-spacing: 0.5px; text-transform: uppercase;
    transition: all 0.15s; text-decoration: none; display: inline-block;
    border-radius: 10px;
  }
  .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
  .btn-secondary {
    padding: 15px 36px; background: transparent; color: var(--text);
    font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 600;
    border: 1px solid var(--border); cursor: pointer;
    transition: all 0.15s; text-decoration: none; display: inline-block;
    border-radius: 10px;
  }
  .btn-secondary:hover { border-color: var(--cyan); color: var(--cyan); }

  /* ── GLARE BUTTON ── */
  .btn-glare {
    position: relative; overflow: hidden;
    padding: 17px 44px;
    background: linear-gradient(135deg, #00c8e0 0%, #00e5ff 45%, #7b61ff 100%);
    color: #050a0f; font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 800;
    border: none; cursor: pointer; letter-spacing: 0.5px; border-radius: 10px;
    text-decoration: none; display: inline-block;
    box-shadow: 0 0 32px rgba(0,229,255,0.35), 0 4px 20px rgba(0,0,0,0.4);
    transition: box-shadow 0.25s, transform 0.2s;
  }
  .btn-glare:hover {
    box-shadow: 0 0 48px rgba(0,229,255,0.55), 0 8px 32px rgba(0,0,0,0.5);
    transform: translateY(-2px);
  }
  .btn-glare-shine {
    position: absolute; top: 0; left: -75%;
    width: 50%; height: 100%;
    background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%);
    transform: skewX(-20deg);
    animation: glareSlide 3s ease-in-out infinite;
  }
  @keyframes glareSlide {
    0%   { left: -75%; opacity: 0; }
    15%  { opacity: 1; }
    45%  { left: 130%; opacity: 0; }
    100% { left: 130%; opacity: 0; }
  }

  .hero-stats { display: flex; gap: 48px; justify-content: center; flex-wrap: wrap; }
  .hero-stat-val { font-size: 32px; font-weight: 800; color: #fff; }
  .hero-stat-val span { color: var(--cyan); }
  .hero-stat-lab { font-size: 12px; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; margin-top: 4px; }

  /* ── SECTIONS COMMON ── */
  section { padding: 100px 60px; }
  .section-label {
    font-size: 11px; font-weight: 700; color: var(--cyan);
    letter-spacing: 3px; text-transform: uppercase; margin-bottom: 16px;
    display: flex; align-items: center; gap: 10px;
  }
  .section-label::before { content: ''; width: 24px; height: 1px; background: var(--cyan); }
  .section-title {
    font-size: clamp(32px, 4vw, 48px); font-weight: 800;
    color: #fff; line-height: 1.1; margin-bottom: 16px; letter-spacing: -0.5px;
  }
  .section-title span { color: var(--cyan); }
  .section-desc { font-size: 17px; color: var(--muted); line-height: 1.7; max-width: 580px; }
  .center { text-align: center; }
  .center .section-label { justify-content: center; }
  .center .section-label::before { display: none; }
  .center .section-desc { margin: 0 auto; }

  /* ── ABOUT (Oscar) ── */
  .about { background: var(--dark); }
  .about-inner {
    max-width: 1140px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
  }
  .about-img-wrap { position: relative; }
  .about-img-box {
    width: 100%; aspect-ratio: 4/5; background: var(--dark3);
    border: 1px solid var(--border); position: relative; overflow: hidden;
  }
  .about-img-placeholder {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #0a1520 0%, #050a0f 100%);
    font-size: 80px; color: var(--border);
  }
  .about-accent {
    position: absolute; bottom: -20px; right: -20px;
    width: 140px; height: 140px; background: var(--cyan);
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 4px; z-index: 1;
  }
  .about-accent-num { font-size: 36px; font-weight: 900; color: var(--dark); line-height: 1; }
  .about-accent-lab { font-size: 10px; font-weight: 700; color: var(--dark); letter-spacing: 1px; text-transform: uppercase; text-align: center; }
  .about-content { display: flex; flex-direction: column; gap: 20px; }
  .about-tag { font-size: 12px; color: var(--cyan); letter-spacing: 2px; text-transform: uppercase; font-weight: 600; }
  .about-name { font-size: 48px; font-weight: 900; color: #fff; line-height: 1; letter-spacing: -1px; }
  .about-role { font-size: 18px; color: var(--muted); font-weight: 500; }
  .about-text { font-size: 15px; color: var(--muted); line-height: 1.8; }
  .about-highlights { display: flex; flex-direction: column; gap: 12px; }
  .about-hl {
    display: flex; align-items: center; gap: 14px;
    font-size: 14px; color: var(--text); font-weight: 500;
  }
  .about-hl-dot { width: 8px; height: 8px; background: var(--cyan); flex-shrink: 0; }

  /* ── SERVICES (Cursos) ── */
  .services { background: var(--dark2); }
  .services-inner { max-width: 1200px; margin: 0 auto; }
  .services-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 20px; margin-top: 60px; align-items: stretch;
  }
  .service-card {
    background: var(--dark3); border: 1px solid var(--border);
    padding: 36px 32px; display: flex; flex-direction: column; gap: 18px;
    transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
    position: relative; overflow: hidden;
    box-shadow: 0 4px 24px rgba(0,0,0,0.35);
  }
  .service-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: var(--cyan); transform: scaleX(0); transform-origin: left;
    transition: transform 0.35s;
  }
  /* Glare shine layer */
  .service-card::after {
    content: ''; position: absolute; top: 0; left: -80%;
    width: 40%; height: 100%;
    background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%);
    transform: skewX(-20deg); pointer-events: none;
    transition: left 0.5s ease;
  }
  .service-card:hover { border-color: rgba(0,229,255,0.4); transform: translateY(-6px); box-shadow: 0 16px 48px rgba(0,229,255,0.09); }
  .service-card:hover::before { transform: scaleX(1); }
  .service-card:hover::after { left: 120%; }

  /* Card popular — borde destacado sin cambio de tamaño */
  .service-card.featured {
    border-color: rgba(0,229,255,0.3);
    box-shadow: 0 0 0 1px rgba(0,229,255,0.08), 0 8px 40px rgba(0,229,255,0.1);
  }
  .service-card.featured::before { transform: scaleX(1); height: 3px; background: linear-gradient(90deg, var(--cyan), #7b61ff); }

  .service-icon {
    width: 52px; height: 52px; background: rgba(0,229,255,0.08);
    border: 1px solid rgba(0,229,255,0.18);
    display: flex; align-items: center; justify-content: center; font-size: 24px;
  }
  .service-badge {
    display: inline-block; padding: 4px 12px;
    background: rgba(0,229,255,0.08); border: 1px solid rgba(0,229,255,0.2);
    font-size: 10px; color: var(--cyan); font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; align-self: flex-start;
  }
  .service-card.featured .service-badge {
    background: rgba(0,229,255,0.14); border-color: rgba(0,229,255,0.45);
    box-shadow: 0 0 10px rgba(0,229,255,0.2);
  }
  .service-name { font-size: 22px; font-weight: 800; color: #fff; }
  .service-sub  { font-size: 12px; color: var(--cyan); font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
  .service-desc { font-size: 14px; color: var(--muted); line-height: 1.75; }
  .service-divider { height: 1px; background: var(--border); margin: 2px 0; }
  .service-list { display: flex; flex-direction: column; gap: 10px; }
  .service-li {
    display: flex; align-items: center; gap: 10px;
    font-size: 13px; color: var(--text);
  }
  .service-li::before { content: '✓'; color: var(--cyan); font-size: 12px; font-weight: 700; flex-shrink: 0; }
  .service-btn {
    margin-top: auto; padding: 14px 0; background: transparent;
    border: 1px solid rgba(0,229,255,0.22); color: var(--cyan);
    font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 700;
    letter-spacing: 1px; text-transform: uppercase; cursor: pointer;
    transition: all 0.18s; text-align: center; text-decoration: none; display: block;
    border-radius: 10px;
  }
  .service-btn:hover { border-color: var(--cyan); color: #fff; background: rgba(0,229,255,0.05); }
  .service-card.featured .service-btn {
    background: rgba(0,229,255,0.1); border-color: rgba(0,229,255,0.4);
  }
  .service-card.featured .service-btn:hover { background: rgba(0,229,255,0.16); border-color: var(--cyan); }

  /* ── EXCHANGE BADGES ── */
  .exchange-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 2px; }
  .exchange-row-label { font-size: 10px; font-weight: 700; color: var(--muted); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 8px; }
  .exchange-badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 10px; border-radius: 2px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
    white-space: nowrap;
  }
  .exchange-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

  /* ── INFO MODAL ── */
  @keyframes infoFadeIn { from { opacity:0 } to { opacity:1 } }
  @keyframes infoSlideUp { from { transform:translateY(20px);opacity:0 } to { transform:translateY(0);opacity:1 } }
  .info-overlay {
    position: fixed; inset: 0; background: rgba(5,10,15,0.82);
    z-index: 999; display: flex; align-items: center; justify-content: center;
    padding: 20px; backdrop-filter: blur(10px);
    animation: infoFadeIn 0.2s ease;
  }
  .info-box {
    background: #070d14; border: 1px solid rgba(0,229,255,0.2);
    width: 100%; max-width: 460px; max-height: 90vh; overflow-y: auto;
    animation: infoSlideUp 0.25s ease;
    box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,229,255,0.08);
  }
  .info-top {
    padding: 32px 36px 28px; border-bottom: 1px solid #0e2435;
    position: relative;
  }
  .info-tag {
    font-size: 10px; font-weight: 700; color: var(--cyan);
    letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px;
  }
  .info-title { font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 4px; }
  .info-sub { font-size: 13px; color: var(--muted); }
  .info-program-pill {
    display: inline-flex; align-items: center; gap: 8px;
    margin-top: 14px; padding: 6px 14px;
    background: rgba(0,229,255,0.07); border: 1px solid rgba(0,229,255,0.2);
    font-size: 12px; color: var(--cyan); font-weight: 600;
  }
  .info-close {
    position: absolute; top: 20px; right: 20px;
    background: none; border: none; color: var(--muted); font-size: 20px;
    cursor: pointer; padding: 4px; line-height: 1; transition: color 0.15s;
  }
  .info-close:hover { color: #ff4f6e; }
  .info-body { padding: 28px 36px 36px; display: flex; flex-direction: column; gap: 18px; }
  .info-lbl { display: block; font-size: 11px; font-weight: 700; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 7px; }
  .info-inp {
    width: 100%; padding: 12px 16px;
    background: #0a1520; border: 1px solid #1a3a5e;
    color: var(--text); font-family: 'Outfit', sans-serif;
    font-size: 14px; outline: none; transition: border-color 0.15s;
  }
  .info-inp:focus { border-color: var(--cyan); }
  .info-inp::placeholder { color: #2a4a5e; }
  .info-inp.err { border-color: #ff4f6e; }
  .info-submit {
    width: 100%; padding: 15px; background: var(--cyan); border: none;
    color: var(--dark); font-family: 'Outfit', sans-serif; font-size: 15px;
    font-weight: 700; cursor: pointer; letter-spacing: 0.5px;
    transition: opacity 0.15s; margin-top: 4px; border-radius: 10px;
  }
  .info-submit:hover { opacity: 0.88; }
  .info-submit:disabled { opacity: 0.4; cursor: not-allowed; }
  .info-note { font-size: 11px; color: var(--muted); text-align: center; line-height: 1.6; }
  .info-ok { padding: 32px; text-align: center; }
  .info-ok-icon { font-size: 48px; margin-bottom: 16px; }
  .info-ok-title { font-size: 22px; font-weight: 800; color: #fff; margin-bottom: 8px; }
  .info-ok-sub { font-size: 14px; color: var(--muted); line-height: 1.7; }

  @media(max-width:768px){
    .services-grid { grid-template-columns: 1fr; gap: 16px; }
    .info-top,.info-body { padding-left: 24px; padding-right: 24px; }
  }

  /* ── WHY US ── */
  .why { background: var(--dark); }
  .why-inner { max-width: 1140px; margin: 0 auto; }
  .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 60px; }
  .why-card { display: flex; flex-direction: column; gap: 16px; padding: 8px 0; }
  .why-num {
    font-size: 48px; font-weight: 900; color: rgba(0,229,255,0.15);
    line-height: 1; font-variant-numeric: tabular-nums;
  }
  .why-title { font-size: 20px; font-weight: 700; color: #fff; }
  .why-desc  { font-size: 14px; color: var(--muted); line-height: 1.7; }
  .why-line  { width: 40px; height: 2px; background: var(--cyan); margin-top: 4px; }

  /* ── DARK CTA BAND ── */
  .band {
    padding: 80px 60px; text-align: center;
    position: relative; overflow: hidden;
  }
  .band-card {
    max-width: 780px; margin: 0 auto;
    background: linear-gradient(135deg, #0c1e2e 0%, #071830 55%, #0a0f1e 100%);
    border: 1px solid rgba(0,229,255,0.25);
    padding: 64px 56px;
    position: relative; overflow: hidden;
    box-shadow: 0 0 0 1px rgba(0,229,255,0.06), 0 24px 80px rgba(0,0,0,0.5), 0 0 60px rgba(0,229,255,0.07);
  }
  .band-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, transparent, var(--cyan), #7b61ff, transparent);
  }
  .band-card::after {
    content: ''; position: absolute; top: -60%; left: 50%; transform: translateX(-50%);
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 65%);
    pointer-events: none;
  }
  .band-glare {
    position: absolute; top: 0; left: -60%; width: 35%; height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.04), transparent);
    transform: skewX(-20deg); pointer-events: none;
    animation: glareSlide 5s ease-in-out infinite;
  }
  .band-title { font-size: clamp(26px, 3.5vw, 42px); font-weight: 900; color: #fff; margin-bottom: 16px; letter-spacing: -0.5px; position: relative; z-index: 1; }
  .band-title span { color: var(--cyan); }
  .band-sub { font-size: 16px; color: var(--muted); margin-bottom: 36px; position: relative; z-index: 1; }

  /* ── TESTIMONIALS ── */
  .testimonials { background: var(--dark2); }
  .testimonials-inner { max-width: 1140px; margin: 0 auto; }
  .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 60px; }
  .testi-card {
    background: var(--dark3); border: 1px solid var(--border);
    padding: 32px; display: flex; flex-direction: column; gap: 20px;
  }
  .testi-quote { font-size: 14px; color: var(--text); line-height: 1.8; font-style: italic; flex: 1; }
  .testi-quote::before { content: '"'; color: var(--cyan); font-size: 32px; font-style: normal; line-height: 0; vertical-align: -12px; margin-right: 4px; }
  .testi-author { display: flex; align-items: center; gap: 12px; }
  .testi-avatar {
    width: 44px; height: 44px; background: var(--cyan);
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 16px; color: var(--dark); flex-shrink: 0;
  }
  .testi-name { font-size: 14px; font-weight: 700; color: #fff; }
  .testi-role { font-size: 12px; color: var(--cyan); }
  .testi-stars { color: var(--cyan); font-size: 13px; margin-top: 4px; }

  /* ── FAQ ── */
  .faq { background: var(--dark); }
  .faq-inner { max-width: 780px; margin: 0 auto; }
  .faq-list  { display: flex; flex-direction: column; gap: 0; margin-top: 60px; }
  .faq-item  { border-bottom: 1px solid var(--border); }
  .faq-q {
    width: 100%; padding: 24px 0; background: none; border: none;
    display: flex; justify-content: space-between; align-items: center;
    cursor: pointer; font-family: 'Outfit', sans-serif;
    font-size: 16px; font-weight: 600; color: #fff; text-align: left; gap: 16px;
    transition: color 0.15s;
  }
  .faq-q:hover { color: var(--cyan); }
  .faq-icon { font-size: 20px; color: var(--cyan); flex-shrink: 0; line-height: 1; transition: transform 0.2s; }
  .faq-icon.open { transform: rotate(45deg); }
  .faq-a { font-size: 15px; color: var(--muted); line-height: 1.8; padding-bottom: 24px; }

  /* ── CONTACT ── */
  .contact { background: var(--dark2); }
  .contact-inner { max-width: 1140px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
  .contact-methods { display: flex; flex-direction: column; gap: 16px; margin-top: 32px; }
  .contact-card {
    display: flex; align-items: center; gap: 16px;
    padding: 20px 24px; background: var(--dark3); border: 1px solid var(--border);
    text-decoration: none; transition: border-color 0.15s;
  }
  .contact-card:hover { border-color: var(--cyan); }
  .contact-card-icon { font-size: 24px; }
  .contact-card-label { font-size: 13px; font-weight: 700; color: #fff; }
  .contact-card-val   { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .contact-arrow { margin-left: auto; color: var(--cyan); font-size: 18px; }
  .contact-form { display: flex; flex-direction: column; gap: 16px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-label { font-size: 11px; font-weight: 600; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; }
  .form-input, .form-textarea {
    background: var(--dark3); border: 1px solid var(--border);
    color: var(--text); padding: 12px 16px;
    font-family: 'Outfit', sans-serif; font-size: 14px; outline: none;
    transition: border-color 0.15s; resize: none;
  }
  .form-input:focus, .form-textarea:focus { border-color: var(--cyan); }
  .form-input::placeholder, .form-textarea::placeholder { color: var(--dimmed); }
  .form-submit {
    padding: 14px; background: var(--cyan); color: var(--dark);
    font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700;
    border: none; cursor: pointer; letter-spacing: 1px; text-transform: uppercase;
    transition: opacity 0.15s; border-radius: 10px;
  }
  .form-submit:hover { opacity: 0.88; }
  .form-success {
    background: #001a0e; border: 1px solid #003a22;
    padding: 14px; font-size: 14px; color: #00ff88; text-align: center;
  }

  /* ── FOOTER ── */
  .footer { background: var(--dark); border-top: 1px solid var(--border); padding: 60px 60px 32px; }
  .footer-inner { max-width: 1140px; margin: 0 auto; }
  .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
  .footer-brand-desc { font-size: 14px; color: var(--muted); line-height: 1.7; margin: 16px 0 20px; max-width: 280px; }
  .footer-socials { display: flex; gap: 12px; }
  .footer-social {
    width: 36px; height: 36px; border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--muted); text-decoration: none; font-size: 14px; font-weight: 700;
    transition: all 0.15s;
  }
  .footer-social:hover { border-color: var(--cyan); color: var(--cyan); }
  .footer-col-title { font-size: 12px; font-weight: 700; color: #fff; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 20px; }
  .footer-links { display: flex; flex-direction: column; gap: 12px; }
  .footer-link { font-size: 14px; color: var(--muted); text-decoration: none; transition: color 0.15s; }
  .footer-link:hover { color: var(--cyan); }
  .footer-bottom {
    border-top: 1px solid var(--border); padding-top: 24px;
    display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
    font-size: 12px; color: var(--dimmed);
  }
  .footer-disclaimer { font-size: 11px; color: var(--dimmed); line-height: 1.7; margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border); }

  /* ── TICKER BAND ── */
  .ticker { background: var(--cyan); padding: 10px 0; overflow: hidden; }
  .ticker-track {
    display: flex; gap: 0; white-space: nowrap;
    animation: ticker 30s linear infinite;
  }
  @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .ticker-item { font-size: 12px; font-weight: 700; color: var(--dark); padding: 0 32px; letter-spacing: 2px; text-transform: uppercase; }
  .ticker-sep { color: rgba(5,10,15,0.4); }

  /* ── RESPONSIVE ── */
  .ticker-top { margin-top: 96px; }

  @media (max-width: 900px) {
    .nav-wrap { top: 36px; }
    .nav { padding: 5px 5px 5px 14px; }
    .nav-links, .nav-sep, .nav-cta { display: none; }
    .ticker-top { margin-top: 88px; }
    section { padding: 70px 20px; }
    .about-inner, .contact-inner { grid-template-columns: 1fr; gap: 40px; }
    .services-grid, .why-grid, .testimonials-grid { grid-template-columns: 1fr; }
    .footer-top { grid-template-columns: 1fr 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .hero { padding: 48px 20px 60px; }
    .band { padding: 60px 20px; }
    .band-card { padding: 40px 24px; }
    .footer { padding: 48px 20px 24px; }
    .hero-stats { gap: 28px; }
    .hero-title { font-size: clamp(34px, 8vw, 56px); }
    .section-title { font-size: clamp(26px, 6vw, 40px); }
    .about-name { font-size: 36px; }
    .why-grid { gap: 24px; }
    .nav-app { padding: 7px 14px; font-size: 11.5px; }
  }
`

const FAQS = [
  {
    q: '¿Necesito experiencia previa en trading para unirme?',
    a: 'No. Nuestros programas están diseñados desde cero. Comenzamos con los fundamentos y avanzamos progresivamente hasta estrategias profesionales. Lo único que necesitas es disciplina y ganas de aprender.',
  },
  {
    q: '¿Qué incluye el Bootcamp Crypto?',
    a: 'Incluye acceso completo a la plataforma, sesiones en vivo semanales, grabaciones de todas las clases, herramientas de análisis y acompañamiento personalizado de Oscar por 90 días.',
  },
  {
    q: '¿Cómo accedo después de inscribirme?',
    a: 'Tan pronto confirmes tu pago te enviamos las credenciales de acceso por WhatsApp en menos de 2 horas. Puedes comenzar inmediatamente desde cualquier dispositivo.',
  },
  {
    q: '¿Cuánto dinero necesito para empezar a invertir?',
    a: 'Puedes comenzar desde $50 USD de manera progresiva. Lo importante es entender el mercado antes de invertir capital real. En el programa usamos cuentas de práctica hasta que tengas el conocimiento necesario.',
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: 'Aceptamos tarjeta débito/crédito, PSE (transferencia bancaria Colombia), PayPal, Nequi, Daviplata y criptomonedas. Escríbenos por WhatsApp y te guiamos paso a paso.',
  },
  {
    q: '¿Qué pasa si el programa no es lo que esperaba?',
    a: 'Nuestro enfoque no está diseñado para "gustar", sino para generar resultados reales. Es una formación estructurada, práctica y exigente, pensada para personas comprometidas con su crecimiento financiero. Si aplicas la metodología y participas activamente, vas a obtener valor. Esto no es contenido superficial ni promesas vacías: es un proceso serio de aprendizaje y ejecución. Por eso, más que una garantía, ofrecemos acompañamiento cercano, claridad en cada paso y una metodología probada.',
  },
]

const SERVICES = [
  {
    icon: '₿',
    badge: 'Más popular',
    name: 'Bootcamp Crypto',
    sub: 'Inversión y Trading de Criptomonedas',
    desc: 'Aprende a navegar el mercado cripto con estructura y disciplina, dominando análisis técnico, gestión de riesgo, DeFi y estrategias avanzadas para resultados consistentes. Todo depende de ti.',
    list: ['Análisis técnico cripto', 'DeFi & Liquidity Mining', 'Gestión de riesgo', 'Herramientas profesionales', 'Mentoría directa con Oscar'],
  },
  {
    icon: '📊',
    badge: 'Nuevo',
    name: 'Express Trading',
    sub: 'Trading de Futuros',
    desc: 'Domina el trading de contratos de futuros en Forex. Estrategias de breakout, gestión de posiciones y psicología.',
    list: ['Futuros Forex', 'Estrategias de breakout', 'Gestión de capital', 'Mentoría directa con Oscar'],
  },
  {
    icon: '🏛',
    badge: 'Beta',
    name: 'Liquidity Engine',
    sub: 'Gestión de Pools DeFi',
    desc: 'Nuestra plataforma exclusiva para gestionar tus pools de liquidez en Uniswap. Monitoreo en tiempo real, Configuración de cobertura de riesgo en los 5 mejores exchanges de criptomonedas del mundo.',
    list: ['Múltiples pools en un solo lugar', 'Seguimiento en tiempo real', 'SHORT de protección apalancado vía API en futuros', 'Acceso exclusivo para estudiantes'],
    exchanges: [
      { name: 'Binance', color: '#F0B90B', bg: 'rgba(240,185,11,0.1)', border: 'rgba(240,185,11,0.3)' },
      { name: 'Bybit', color: '#F7A600', bg: 'rgba(247,166,0,0.1)', border: 'rgba(247,166,0,0.3)' },
      { name: 'OKX', color: '#e0e0e0', bg: 'rgba(224,224,224,0.07)', border: 'rgba(224,224,224,0.2)' },
      { name: 'Bitget', color: '#00F0FF', bg: 'rgba(0,240,255,0.08)', border: 'rgba(0,240,255,0.25)' },
      { name: 'KuCoin', color: '#23AF91', bg: 'rgba(35,175,145,0.1)', border: 'rgba(35,175,145,0.3)' },
    ],
  },
]

const TESTIMONIALS = [
  {
    quote: 'Llevaba meses buscando alguien que realmente enseñara cripto de manera práctica. Con Oscar aprendí en 3 meses lo que no encontré en años de cursos online. La inversión valió completamente la pena.',
    name: 'María C.',
    role: 'Estudiante · Bogotá',
    initials: 'MC',
  },
  {
    quote: 'El Bootcamp Crypto me cambió la perspectiva. No solo aprendes estrategias sino que entiendes el mercado de verdad. Hoy manejo mis inversiones con confianza y resultados reales.',
    name: 'Juan P.',
    role: 'Ingeniero · Medellín',
    initials: 'JP',
  },
  {
    quote: 'Lo que más valoro es el acompañamiento personalizado. Oscar siempre está disponible para resolver dudas. En 90 días pasé de no saber nada a tener un portafolio activo y rentable.',
    name: 'Andrés R.',
    role: 'Emprendedor · Cali',
    initials: 'AR',
  },
]

const WHY = [
  { num: '01', title: 'Resultados medibles, no promesas', desc: 'Metodología práctica diseñada para que en aproximadamente 90 días adquieras el conocimiento y las herramientas necesarias para operar con confianza y criterio profesional. Todo depende de ti.' },
  { num: '02', title: 'Acceso directo, sin intermediarios', desc: 'Mentoría personalizada con acompañamiento real, soporte cercano y respuestas rápidas para acelerar tu evolución como trader.' },
  { num: '03', title: 'Ventaja tecnológica exclusiva', desc: 'Utiliza Liquidity Engine, nuestra tecnología propia para generar ingresos pasivos utilizando proveendo liquidez a un mercado descentralizado. Allí también puedes automatizar coberturas y proteger tu capital. (Finanzas descentralizadas)' },
]

function InfoModal({ program, onClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [done, setDone] = useState(false)
  const [errs, setErrs] = useState({})

  const validate = () => {
    const e = {}
    if (!name.trim()) e.name = true
    if (!phone.trim()) e.phone = true
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrs(e); return }
    const msg = encodeURIComponent(
      `Hola Oscar! Me interesa el programa *${program.name}*.\n\n` +
      `Nombre: ${name.trim()}\n` +
      (email.trim() ? `Email: ${email.trim()}\n` : '') +
      `WhatsApp: ${phone.trim()}\n\n` +
      `¿Podrías darme más información?`
    )
    window.open(`https://wa.me/573215646716?text=${msg}`, '_blank')
    setDone(true)
  }

  return (
    <div className="info-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="info-box">
        {done ? (
          <div className="info-ok">
            <div className="info-ok-icon">🚀</div>
            <div className="info-ok-title">¡Te redirigimos a WhatsApp!</div>
            <div className="info-ok-sub">
              Oscar responde en menos de 2 horas.<br />
              Si no se abrió automáticamente,<br />
              escríbenos al <strong style={{ color: '#00e5ff' }}>+57 321 564 6716</strong>
            </div>
            <button className="info-submit" style={{ marginTop: 24, width: 'auto', padding: '12px 32px' }} onClick={onClose}>
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <div className="info-top">
              <button className="info-close" onClick={onClose}>✕</button>
              <div className="info-tag">The Crypto House</div>
              <div className="info-title">Déjanos tus datos</div>
              <div className="info-sub">Te contactamos en menos de 2 horas</div>
              <div className="info-program-pill">
                <span>{program.icon}</span>
                <span>{program.name}</span>
              </div>
            </div>
            <form className="info-body" onSubmit={handleSubmit}>
              <div>
                <label className="info-lbl">Nombre completo *</label>
                <input
                  className={`info-inp${errs.name ? ' err' : ''}`}
                  placeholder="Tu nombre"
                  value={name}
                  onChange={e => { setName(e.target.value); setErrs(v => ({ ...v, name: false })) }}
                  autoFocus
                />
              </div>
              <div>
                <label className="info-lbl">Email</label>
                <input
                  className="info-inp"
                  type="email"
                  placeholder="tu@email.com (opcional)"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="info-lbl">WhatsApp / Teléfono *</label>
                <input
                  className={`info-inp${errs.phone ? ' err' : ''}`}
                  placeholder="+57 300 000 0000"
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setErrs(v => ({ ...v, phone: false })) }}
                />
              </div>
              <button className="info-submit" type="submit">
                Quiero información →
              </button>
              <div className="info-note">
                Al enviar, se abrirá WhatsApp con tus datos.<br />
                No spam. Solo te contactamos para ayudarte.
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-item">
      <button className="faq-q" onClick={() => setOpen(o => !o)}>
        {q}
        <span className={`faq-icon ${open ? 'open' : ''}`}>+</span>
      </button>
      {open && <div className="faq-a">{a}</div>}
    </div>
  )
}

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', msg: '' })
  const [sent, setSent] = useState(false)
  const [infoProgram, setInfoProgram] = useState(null)
  const [dropOpen, setDropOpen] = useState(false)
  const dropTimer = useRef(null)
  const openDrop  = () => { clearTimeout(dropTimer.current); setDropOpen(true) }
  const closeDrop = () => { dropTimer.current = setTimeout(() => setDropOpen(false), 220) }

  const handleContact = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.msg) return
    const subject = encodeURIComponent(`The Crypto House — Mensaje de ${formData.name}`)
    const body = encodeURIComponent(`Nombre: ${formData.name}\nEmail: ${formData.email}\n\n${formData.msg}`)
    window.location.href = `mailto:profeoscarbol@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  const HEADER_H = 96 // price bar 32 + nav pill ~56 + gap

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.pageYOffset - HEADER_H
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }

  const goTo = (e, id) => { e.preventDefault(); scrollTo(id) }
  const scrollTop = (e) => { e?.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  // Handle pending scroll from sub-pages (e.g. when navigating back from Programas/LE)
  useEffect(() => {
    const target = sessionStorage.getItem('pendingScroll')
    if (target) {
      sessionStorage.removeItem('pendingScroll')
      setTimeout(() => scrollTo(target), 150)
    }
  }, [])

  const TICKER_ITEMS = ['Bootcamp Crypto', '·', 'Trading de Futuros', '·', 'DeFi & Liquidity Pools', '·', 'Hyperliquid', '·', 'Uniswap V3', '·', 'Formación Profesional', '·']

  return (
    <>
      <style>{CSS}</style>

      {/* ── CRYPTO PRICE BAR (fixed top: 0) — shared component ── */}
      <CryptoPriceBar />

      {/* ── NAVBAR pill flotante ── */}
      <div className="nav-wrap">
        <nav className="nav">
          <a href="#" className="nav-brand" onClick={scrollTop}>
            <img src={cryptoHouseLogo} alt="The Crypto House" style={{ height: 30, width: 'auto', objectFit: 'contain' }} />
            <div className="nav-name">The Crypto House</div>
          </a>
          <div className="nav-links">
            <a className="nav-link" onClick={scrollTop} href="#">Inicio</a>
            <a className="nav-link" onClick={e => goTo(e, 'sobre')} href="#">Instructor</a>
            <div className="nav-dropdown" onMouseEnter={openDrop} onMouseLeave={closeDrop}>
              <button
                className={`nav-dropdown-btn${dropOpen ? ' open' : ''}`}
                onClick={() => { window.location.hash = '#programas' }}
              >
                Formación ▾
              </button>
              {dropOpen && (
                <div className="nav-dropdown-menu">
                  <button className="nav-dropdown-item" onClick={() => { window.location.hash = '#programas' }}>
                    <span>₿</span> Bootcamp Crypto
                  </button>
                  <div className="nav-dropdown-sep" />
                  <button className="nav-dropdown-item" onClick={() => { window.location.hash = '#programas' }}>
                    <span>📊</span> Express Trading
                  </button>
                </div>
              )}
            </div>
            <a className="nav-link" onClick={e => { e.preventDefault(); window.location.hash = '#liquidity-engine' }} href="#">Liquidity Engine</a>
            <a className="nav-link" onClick={e => goTo(e, 'faq')} href="#">FAQ</a>
            <a className="nav-link" onClick={e => goTo(e, 'contacto')} href="#">Contacto</a>
          </div>
          <div className="nav-sep" />
          <a className="nav-app" href="/#app">Acceder al Ecosistema</a>
        </nav>
      </div>

      {/* TICKER — debajo del nav pill */}
      <div className="ticker ticker-top">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="ticker-item">{item}</span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="hero" id="inicio" style={{ marginTop: 0 }}>
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            DEJA DE IMPROVISAR, EMPIEZA A OPERAR
          </div>
          <h1 className="hero-title">
            Domina <span>Crypto</span>, Futuros<br />
            y DeFi con una estrategia profesional.
          </h1>
          <p className="hero-sub">
            Aprende a operar con disciplina, gestión de riesgo y una metodología diseñada para resultados consistentes.
            <br />

          </p>
          <div className="hero-btns">
            <a className="btn-glare" onClick={e => goTo(e, 'cursos')} href="#">
              <span className="btn-glare-shine" />
              Acceder al bootcamp →
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-val"><span>3</span></div>
              <div className="hero-stat-lab">Programas disponibles</div>
            </div>
            <div>
              <div className="hero-stat-val">90</div>
              <div className="hero-stat-lab">Días al resultado</div>
            </div>
            <div>
              <div className="hero-stat-val">1<span>·</span>1</div>
              <div className="hero-stat-lab">Mentoría personalizada</div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE MÍ */}
      <section className="about" id="sobre">
        <div className="about-inner">
          <div className="about-img-wrap">
            <div className="about-img-box">
              <img src={oscarImg} alt="Oscar Bolaños" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          <div className="about-content">
            <div className="about-tag">Fundador · The Crypto House</div>
            <div className="about-name">Oscar Bolaños</div>
            <div className="about-role">Trader profesional & Mentor de inversiones</div>
            <p className="about-text">
              Soy Oscar, operador de criptomonedas VIP en Bybit y con experiencia en Prop Firms, brokers y estructuras de inversión enfocadas en DeFi, futuros y gestión de liquidez. Durante más de 4 años he trabajado en la ejecución, análisis y desarrollo de estrategias aplicadas a mercados reales, con enfoque en consistencia, control de riesgo y toma de decisiones basada en datos.
            </p>
            <p className="about-text">
              Creé The Crypto House con una misión clara: democratizar el acceso a la educación
              financiera de calidad. Mi metodología combina teoría sólida con práctica real,
              acompañamiento cercano y herramientas tecnológicas propias como el Liquidity Engine para operaciones descentralizadas.
            </p>
            <div className="about-highlights">
              {[                
                'Desarrollador del Liquidity Engine — herramienta de monitoreo y cobertura de capital DeFi propia. 🤖'
              ].map((h, i) => (
                <div key={i} className="about-hl">
                  <div className="about-hl-dot" />
                  {h}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TICKER 2 */}
      <div className="ticker">
        <div className="ticker-track" style={{ animationDirection: 'reverse' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="ticker-item">{item}</span>
          ))}
        </div>
      </div>

      {/* SERVICIOS */}
      <section className="services" id="cursos">
        <div className="services-inner">
          <div className="center">
            <div className="section-label">Nuestros Programas</div>
            <h2 className="section-title">La solución correcta<br /><span>para tu nivel</span></h2>
            <p className="section-desc">
              No importa si estás comenzando o ya tienes experiencia: aquí desarrollas una operativa profesional con procesos claros y resultados sostenibles.
            </p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div key={i} className={`service-card${i === 0 ? ' featured' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="service-icon">{s.icon}</div>
                  <div className="service-badge">{s.badge}</div>
                </div>
                <div>
                  <div className="service-name">{s.name}</div>
                  <div className="service-sub">{s.sub}</div>
                </div>
                <div className="service-desc">{s.desc}</div>
                <div className="service-divider" />
                <div className="service-list">
                  {s.list.map((li, j) => <div key={j} className="service-li">{li}</div>)}
                </div>
                {s.exchanges && (
                  <div>
                    <div className="exchange-row-label">Compatible con</div>
                    <div className="exchange-row">
                      {s.exchanges.map((ex, j) => (
                        <span key={j} className="exchange-badge" style={{ background: ex.bg, border: `1px solid ${ex.border}`, color: ex.color }}>
                          <span className="exchange-dot" style={{ background: ex.color }} />
                          {ex.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <button className="service-btn" onClick={() => {
                  if (i === 2) window.location.hash = '#liquidity-engine'
                  else window.location.hash = '#programas'
                }}>
                  {i === 2 ? 'Explorar Liquidity Engine →' : 'Ver programa completo →'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="why">
        <div className="why-inner">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', marginBottom: 60 }}>
            <div>
              <div className="section-label">Por qué elegirnos</div>
              <h2 className="section-title">No somos otro<br /><span>curso de internet.</span></h2>
            </div>
            <p className="section-desc" style={{ alignSelf: 'end' }}>
              Oscar trabaja directamente contigo — sin intermediarios, sin grupos masivos.
              Nuestro diferencial está en el acompañamiento 1 a 1, la tecnología propia
              y la metodología práctica que funciona desde el primer mes.
            </p>
          </div>
          <div className="why-grid">
            {WHY.map((w, i) => (
              <div key={i} className="why-card">
                <div className="why-num">{w.num}</div>
                <div className="why-line" />
                <div className="why-title">{w.title}</div>
                <div className="why-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <div className="band">
        <div className="band-card">
          <div className="band-glare" />
          <h2 className="band-title">El momento de empezar<br />es <span>ahora.</span></h2>
          <p className="band-sub">Sé de los primeros en formarse directamente con Oscar.<br />Plazas limitadas para garantizar acompañamiento 1 a 1.</p>
          <a className="btn-glare" onClick={e => goTo(e, 'contacto')} href="#" style={{ fontSize: 15, padding: '15px 44px', position: 'relative', zIndex: 1 }}>
            <span className="btn-glare-shine" />
            Empezar ahora →
          </a>
        </div>
      </div>

      {/* TESTIMONIOS */}
      <section className="testimonials">
        <div className="testimonials-inner">
          <div className="center">
            <div className="section-label">Testimonios</div>
            <h2 className="section-title">Lo que dicen<br /><span>nuestros estudiantes</span></h2>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testi-card">
                <div className="testi-quote">{t.quote}</div>
                <div className="testi-author">
                  <div className="testi-avatar">{t.initials}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                    <div className="testi-stars">★★★★★</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq">
        <div className="faq-inner">
          <div className="center" style={{ marginBottom: 0 }}>
            <div className="section-label">FAQ</div>
            <h2 className="section-title">Preguntas<br /><span>frecuentes</span></h2>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="contact" id="contacto">
        <div className="contact-inner">
          <div>
            <div className="section-label">Contacto</div>
            <h2 className="section-title">Hablemos<br /><span>hoy mismo.</span></h2>
            <p className="section-desc" style={{ marginTop: 12 }}>
              ¿Tienes dudas sobre algún programa? Escríbenos directamente.
              Respondemos en menos de 2 horas.
            </p>
            <div className="contact-methods">
              <a className="contact-card" href="https://wa.me/573215646716" target="_blank" rel="noreferrer">
                <div className="contact-card-icon">💬</div>
                <div>
                  <div className="contact-card-label">WhatsApp</div>
                  <div className="contact-card-val">+57 321 564 6716 · Respuesta inmediata</div>
                </div>
                <div className="contact-arrow">→</div>
              </a>
              <a className="contact-card" href="mailto:profeoscarbol@gmail.com">
                <div className="contact-card-icon">✉</div>
                <div>
                  <div className="contact-card-label">Email</div>
                  <div className="contact-card-val">profeoscarbol@gmail.com</div>
                </div>
                <div className="contact-arrow">→</div>
              </a>
              <a className="contact-card" href="https://www.linkedin.com/in/oscandrebol/" target="_blank" rel="noreferrer">
                <div className="contact-card-icon">💼</div>
                <div>
                  <div className="contact-card-label">LinkedIn</div>
                  <div className="contact-card-val">Oscar Bolaños · Perfil profesional</div>
                </div>
                <div className="contact-arrow">→</div>
              </a>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 24 }}>
              Envíanos un mensaje
            </div>
            {sent ? (
              <div className="form-success">
                ✓ Mensaje enviado — nos pondremos en contacto pronto!
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleContact}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nombre *</label>
                    <input className="form-input" placeholder="Tu nombre"
                      value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" placeholder="tu@email.com"
                      value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">¿En qué programa estás interesado? *</label>
                  <textarea className="form-textarea" rows={5}
                    placeholder="Cuéntame sobre tu experiencia actual y qué programa te interesa..."
                    value={formData.msg} onChange={e => setFormData(p => ({ ...p, msg: e.target.value }))} />
                </div>
                <button className="form-submit" type="submit">
                  Enviar mensaje →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                <img src={cryptoHouseLogo} alt="The Crypto House" style={{ height: 38, width: 'auto', objectFit: 'contain' }} />
                <div className="nav-name">The Crypto House</div>
              </div>
              <p className="footer-brand-desc">
                Formación profesional en criptomonedas, trading y DeFi para Colombia y Latam.
                Transformamos vidas a través de la educación financiera.
              </p>
              <div className="footer-socials">
                <a className="footer-social" href="https://wa.me/573215646716" target="_blank" rel="noreferrer">W</a>
                <a className="footer-social" href="mailto:profeoscarbol@gmail.com">@</a>
                <a className="footer-social" href="https://www.linkedin.com/in/oscandrebol/" target="_blank" rel="noreferrer" title="LinkedIn">in</a>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Programas</div>
              <div className="footer-links">
                <a className="footer-link" href="#">Bootcamp Crypto</a>
                <a className="footer-link" href="#">Express Trading</a>
                <a className="footer-link" href="#">Liquidity Engine</a>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Compañía</div>
              <div className="footer-links">
                <a className="footer-link" onClick={e => goTo(e, 'sobre')} href="#">Sobre Oscar</a>
                <a className="footer-link" onClick={e => goTo(e, 'faq')} href="#">FAQ</a>
                <a className="footer-link" onClick={e => goTo(e, 'contacto')} href="#">Contacto</a>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Herramientas</div>
              <div className="footer-links">
                <a className="footer-link" href="/#app">Liquidity Engine App</a>
                <a className="footer-link" href="https://app.hyperliquid.xyz" target="_blank" rel="noreferrer">Hyperliquid</a>
                <a className="footer-link" href="https://app.uniswap.org" target="_blank" rel="noreferrer">Uniswap</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 The Crypto House · Todos los derechos reservados.</span>
            <span>profeoscarbol@gmail.com · +57 321 564 6716</span>
          </div>
          <div className="footer-disclaimer">
            <strong>Aviso de riesgo:</strong> El trading e inversión en criptomonedas conlleva riesgo significativo de pérdida.
            Los resultados pasados no garantizan resultados futuros. Todo el contenido de The Crypto House es de carácter educativo
            y no constituye asesoramiento financiero. Invierte solo lo que estás dispuesto a perder.
          </div>
        </div>
      </footer>

      {infoProgram && <InfoModal program={infoProgram} onClose={() => setInfoProgram(null)} />}
    </>
  )
}