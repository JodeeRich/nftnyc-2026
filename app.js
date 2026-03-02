/* app.js — NFT.NYC 2026 — Living Neural Network Infographic
   Cycling animation: each ecosystem takes a turn as the featured top node. */

(function () {
  'use strict';

  // ============================================
  // DATA
  // ============================================
  const ECOSYSTEMS = [
    { id: 'ai', name: 'AI Agent Identity', subtitle: 'ERC-8004 Reputation', icon: '🤖', color: '#3B82F6',
      desc: 'NFTs provide authenticity, ownership, and monetization rails for AI-generated and agent-driven systems. Autonomous agents with wallets use ERC-8004 for on-chain identity and portable reputation.',
      examples: ['AIcred.ai', 'ERC-8004', 'Autonomous Wallets'],
      subs: ['AIcred.ai', 'Autonomous Wallets'] },
    { id: 'gaming', name: 'Gaming & Virtual Economies', subtitle: 'Player-Owned Assets', icon: '🎮', color: '#8B5CF6',
      desc: 'Web3 gaming studios, fully on-chain games, virtual assets, digital fashion, interoperable items, and player-owned economies.',
      examples: ['Empire.Kred', 'HotGarage.Kred', 'Immutable'],
      subs: ['Empire.Kred', 'HotGarage.Kred'] },
    { id: 'infra', name: 'On-Chain Infrastructure', subtitle: 'ENS, L1/L2, ZK Identity', icon: '⛓️', color: '#06B6D4',
      desc: 'Layer 1 and Layer 2 blockchains, rollups, wallets, ZK identity, NFT liquidity layers, and fully on-chain systems.',
      examples: ['ENS', 'NFT Developer Apps'],
      subs: ['ENS', 'NFT Dev Apps'] },
    { id: 'social', name: 'Social NFTs', subtitle: 'Collaborative Art & Moots', icon: '🎨', color: '#EC4899',
      desc: 'Collaborative and community-driven digital art projects merging social interaction with generative AI and on-chain provenance.',
      examples: ['GangUp Project', 'Artist Moots'],
      subs: ['GangUp Project', 'Artist Moots'] },
    { id: 'communities', name: 'NFT Communities', subtitle: 'Identity & Belonging', icon: '👥', color: '#EF4444',
      desc: 'Internet-native communities, NFT-native media platforms, creator-led ecosystems, and meme culture.',
      examples: ['Hot Wheels NFT', 'Meme Culture'],
      subs: ['Hot Wheels NFT', 'Meme Culture'] },
    { id: 'creator', name: 'Creator & IP Economy', subtitle: 'Community-Owned IP', icon: '💡', color: '#F59E0B',
      desc: 'Community-owned IP, NFT membership models, music and film ownership, token-gated media, and revitalized brands.',
      examples: ['Token-Gated Media', 'Brand Revival'],
      subs: ['Token-Gated Media', 'Brand Revival'] },
    { id: 'defi', name: 'DeFi & Capital Markets', subtitle: 'NFT Lending & RWA', icon: '💰', color: '#10B981',
      desc: 'NFT lending, fractionalization, real-world assets via NFTs, DeFi infrastructure, and meme coins as community capital.',
      examples: ['NFT Lending', 'Fractionalization'],
      subs: ['NFT Lending', 'Fractionalization'] },
    { id: 'brands', name: 'Brands & Engagement', subtitle: 'Loyalty, Phygital, Ticketing', icon: '🏷️', color: '#F97316',
      desc: 'NFT-based loyalty programs, phygital authentication, NFT ticketing, digital collectibles, and retail integrations.',
      examples: ['Phygital Auth', 'NFT Ticketing'],
      subs: ['Phygital Auth', 'NFT Ticketing'] },
    { id: 'culture', name: 'Culture: Art & Music', subtitle: 'On-Chain Attribution', icon: '🎵', color: '#D946EF',
      desc: 'Digital art, generative art, AI-generated art with on-chain attribution, music royalty ownership.',
      examples: ['Generative Art', 'Music Ownership'],
      subs: ['Generative Art', 'Music Ownership'] },
    { id: 'marketplaces', name: 'NFT Marketplaces', subtitle: 'Royalty Infrastructure', icon: '🏪', color: '#38BDF8',
      desc: 'Marketplace infrastructure, royalty systems, creator coin models, and new distribution mechanisms.',
      examples: ['Royalties', 'Creator Coins'],
      subs: ['Royalties', 'Creator Coins'] }
  ];

  const N = ECOSYSTEMS.length; // 10

  const CONNECTIONS = [
    [0, 1], [0, 2], [0, 3], [0, 5], [0, 6], [0, 7], [0, 9],
    [1, 2], [1, 4], [1, 6], [1, 9],
    [2, 6], [2, 9],
    [3, 4], [3, 5], [3, 8],
    [4, 5], [4, 7],
    [5, 8], [5, 9],
    [6, 7], [6, 9],
    [7, 8], [7, 9],
    [8, 9]
  ];

  const SPEAKERS = [
    { name: 'Nate B. Jones', role: 'AI Strategist / AIcred.ai', eco: 'AI Agent Identity', ecoColor: '#3B82F6', why: 'Co-creator of AIcred.ai, former Amazon exec. Frames ERC-8004 as the "digital passport" for AI agents.', handle: 'NateBJones' },
    { name: 'Robbie Ferguson', role: 'Co-Founder & President, Immutable', eco: 'Gaming & Virtual Economies', ecoColor: '#8B5CF6', why: 'Built the largest Web3 gaming infrastructure: 700+ games, 5M+ Passport signups.', handle: '0xferg' },
    { name: 'Nick Johnson', role: 'Founder & Lead Developer, ENS', eco: 'On-Chain Infrastructure', ecoColor: '#06B6D4', why: 'Former Google engineer. ENS names are NFTs — the original on-chain identity token.', handle: 'nicksdjohnson' },
    { name: 'Pindar Van Arman', role: 'AI Artist & Generative Art Pioneer', eco: 'Social NFTs', ecoColor: '#EC4899', why: '20+ years building painting robots. GangUp merges social collaboration with generative AI.', handle: 'PindarVanArman' },
    { name: 'Roham Gharegozlou', role: 'CEO & Co-Founder, Dapper Labs', eco: 'NFT Communities', ecoColor: '#EF4444', why: 'Created CryptoKitties and NBA Top Shot. Brought 2M+ non-crypto users onto blockchain.', handle: 'roham' },
    { name: 'Bearsnake', role: 'COO, Magic Machine (Forgotten Runes)', eco: 'Creator & IP Economy', ecoColor: '#F59E0B', why: 'Turned down a Hollywood buyout to keep IP community-owned. MMORPG on Nintendo/PlayStation/Xbox.', handle: 'BearSnake' },
    { name: 'Stephen Young', role: 'Founder & CEO, NFTfi', eco: 'DeFi & Capital Markets', ecoColor: '#10B981', why: 'Built the first NFT lending protocol. 60,000+ loans, zero security incidents.', handle: 'stephen_yo' },
    { name: 'Chris Lee', role: 'Co-Founder, IYK', eco: 'Brands & Engagement', ecoColor: '#F97316', why: 'Infrastructure connecting physical products to on-chain NFTs via NFC. Backed by a16z.', handle: 'clee681' },
    { name: 'Justin Blau (3LAU)', role: 'DJ/Producer & CEO, Royal', eco: 'Culture: Art & Music', ecoColor: '#D946EF', why: 'Sold the first tokenized album ($11.7M). Royal lets fans own streaming royalties.', handle: '3LAU' },
    { name: 'Jacob Horne', role: 'Co-Founder & CEO, Zora', eco: 'NFT Marketplaces', ecoColor: '#38BDF8', why: 'Forbes 30 Under 30. $353M trading volume, $27M paid to creators.', handle: 'js_horne' }
  ];

  // ============================================
  // THEME TOGGLE
  // ============================================
  const toggle = document.querySelector('[data-theme-toggle]');
  const rootEl = document.documentElement;
  let theme = 'dark';
  rootEl.setAttribute('data-theme', theme);

  if (toggle) {
    toggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      rootEl.setAttribute('data-theme', theme);
      toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      toggle.innerHTML = theme === 'dark'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    });
  }

  // ============================================
  // MOBILE NAV
  // ============================================
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  if (mobileMenuBtn && mobileOverlay) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileOverlay.classList.contains('active');
      mobileOverlay.classList.toggle('active');
      mobileOverlay.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
      mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
      mobileMenuBtn.innerHTML = isOpen
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>';
    });
    mobileOverlay.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileOverlay.classList.remove('active');
        mobileOverlay.setAttribute('aria-hidden', 'true');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      });
    });
  }

  // ============================================
  // NEURAL NETWORK INFOGRAPHIC — ANIMATED CYCLING
  //
  // Architecture:
  // - 1 "featured" slot at the top (large node, prominent)
  // - 9 "orbit" slots arranged around the spine
  // - Every CYCLE_MS, the featured ecosystem rotates:
  //   current featured slides down to the next orbit slot,
  //   next ecosystem slides up to the featured slot.
  // - All positions are interpolated smoothly via requestAnimationFrame.
  // - Lines/connections are redrawn each frame during transitions.
  // ============================================

  const W = 1000, H = 720;
  const CYCLE_MS = 4000;       // time each ecosystem stays featured
  const TRANSITION_MS = 1200;  // duration of the swap animation

  // The featured position
  const FEATURED_POS = { x: 500, y: 115 };

  // The 9 orbit positions (same as before, for non-featured nodes)
  const ORBIT_SLOTS = [
    { x: 175, y: 175 },
    { x: 820, y: 175 },
    { x: 155, y: 340 },
    { x: 830, y: 320 },
    { x: 190, y: 505 },
    { x: 810, y: 475 },
    { x: 310, y: 615 },
    { x: 690, y: 620 },
    { x: 820, y: 610 }
  ];

  // Spine points (static backdrop)
  const SPINE_PTS = [
    { x: 500, y: 60 },
    { x: 480, y: 180 },
    { x: 520, y: 310 },
    { x: 490, y: 440 },
    { x: 510, y: 560 },
    { x: 500, y: 670 }
  ];

  // ============================================
  // STATE
  // ============================================
  let featuredIdx = 0;           // which ecosystem is currently featured (0 = AI)
  let transitionStart = null;    // timestamp when transition began (null = idle)
  let prevFeatured = 0;          // ecosystem that was featured before transition
  let nextFeatured = 1;          // ecosystem transitioning to featured
  // Current animated positions for all 10 ecosystems
  let currentPositions = new Array(N);
  // Target positions (after transition completes)
  let targetPositions = new Array(N);
  // Source positions (at start of transition)
  let sourcePositions = new Array(N);

  // Assign initial positions: ecosystem 0 = featured, 1-9 = orbit slots 0-8
  function getRestPositions(featIdx) {
    const positions = new Array(N);
    positions[featIdx] = { ...FEATURED_POS };
    let slotIdx = 0;
    for (let i = 0; i < N; i++) {
      if (i === featIdx) continue;
      positions[i] = { ...ORBIT_SLOTS[slotIdx] };
      slotIdx++;
    }
    return positions;
  }

  // Initialize positions
  currentPositions = getRestPositions(0);

  // ============================================
  // SVG SETUP
  // ============================================
  function buildMesh() {
    const svg = document.getElementById('meshSvg');
    const linesGroup = document.getElementById('meshLines');
    const nodesGroup = document.getElementById('meshNodes');
    if (!svg || !linesGroup || !nodesGroup) return;

    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

    // --- DEFS ---
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

    // Spine gradient
    const spineGrad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    spineGrad.id = 'spineGrad';
    spineGrad.setAttribute('x1', '0'); spineGrad.setAttribute('y1', '0');
    spineGrad.setAttribute('x2', '0'); spineGrad.setAttribute('y2', '1');
    [
      { offset: '0%',   color: '#3B82F6', opacity: '1' },
      { offset: '20%',  color: '#8B5CF6', opacity: '1' },
      { offset: '45%',  color: '#EC4899', opacity: '1' },
      { offset: '65%',  color: '#F59E0B', opacity: '1' },
      { offset: '85%',  color: '#10B981', opacity: '1' },
      { offset: '100%', color: '#38BDF8', opacity: '1' }
    ].forEach(s => {
      const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop.setAttribute('offset', s.offset);
      stop.setAttribute('stop-color', s.color);
      stop.setAttribute('stop-opacity', s.opacity);
      spineGrad.appendChild(stop);
    });
    defs.appendChild(spineGrad);

    // Glow filter
    const synGlow = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    synGlow.id = 'synGlow';
    synGlow.setAttribute('x', '-50%'); synGlow.setAttribute('y', '-50%');
    synGlow.setAttribute('width', '200%'); synGlow.setAttribute('height', '200%');
    const synBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    synBlur.setAttribute('in', 'SourceGraphic'); synBlur.setAttribute('stdDeviation', '6');
    synGlow.appendChild(synBlur);
    defs.appendChild(synGlow);

    // Core glow filter
    const coreGlow = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    coreGlow.id = 'coreGlow';
    coreGlow.setAttribute('x', '-100%'); coreGlow.setAttribute('y', '-100%');
    coreGlow.setAttribute('width', '300%'); coreGlow.setAttribute('height', '300%');
    const coreBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    coreBlur.setAttribute('in', 'SourceGraphic'); coreBlur.setAttribute('stdDeviation', '18');
    coreGlow.appendChild(coreBlur);
    defs.appendChild(coreGlow);

    svg.insertBefore(defs, linesGroup);

    // --- AMBIENT PARTICLES ---
    const particlesG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    particlesG.setAttribute('class', 'ambient-particles');
    for (let i = 0; i < 50; i++) {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('cx', Math.random() * W);
      c.setAttribute('cy', Math.random() * H);
      c.setAttribute('r', Math.random() * 1.2 + 0.3);
      c.setAttribute('fill', `rgba(255,255,255,${Math.random() * 0.06 + 0.01})`);
      c.style.animation = `particleDrift ${10 + Math.random() * 15}s ease-in-out infinite`;
      c.style.animationDelay = `${Math.random() * -20}s`;
      particlesG.appendChild(c);
    }
    svg.insertBefore(particlesG, linesGroup);

    // --- SPINE (static backdrop) ---
    const spineD = buildSpinePath();

    // Wide ambient glow — STRONG
    const spineGlowPath = createPath(spineD, 'url(#spineGrad)', 50, 0.2);
    spineGlowPath.setAttribute('filter', 'url(#coreGlow)');
    spineGlowPath.classList.add('spine-glow');
    linesGroup.appendChild(spineGlowPath);

    // Medium glow — visible
    const spineMedPath = createPath(spineD, 'url(#spineGrad)', 14, 0.4);
    spineMedPath.setAttribute('filter', 'url(#synGlow)');
    linesGroup.appendChild(spineMedPath);

    // Sharp spine line — prominent
    const spineSharp = createPath(spineD, 'url(#spineGrad)', 3, 0.85);
    spineSharp.classList.add('spine-line');
    linesGroup.appendChild(spineSharp);

    // Second sharp line for double-helix feel
    const spineSharp2 = createPath(spineD, 'url(#spineGrad)', 1.5, 0.5);
    spineSharp2.setAttribute('stroke-dasharray', '8 12');
    linesGroup.appendChild(spineSharp2);

    // Spine labels
    [
      { x: 500, y: 248, label: 'TOKENIZATION', size: '13', weight: '700', opacity: '0.8' },
      { x: 500, y: 440, label: 'LAYER', size: '12', weight: '600', opacity: '0.6' },
    ].forEach(sl => {
      const pill = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      pill.setAttribute('x', sl.x - 52); pill.setAttribute('y', sl.y - 10);
      pill.setAttribute('width', '104'); pill.setAttribute('height', '20');
      pill.setAttribute('rx', '10');
      pill.setAttribute('fill', 'rgba(139,92,246,0.12)');
      pill.setAttribute('stroke', 'rgba(139,92,246,0.25)');
      pill.setAttribute('stroke-width', '0.5');
      pill.classList.add('spine-label-pill');
      nodesGroup.appendChild(pill);

      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t.setAttribute('x', sl.x); t.setAttribute('y', sl.y);
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('dominant-baseline', 'middle');
      t.setAttribute('fill', `rgba(200,180,255,${sl.opacity})`);
      t.setAttribute('font-family', "'Clash Display', sans-serif");
      t.setAttribute('font-size', sl.size);
      t.setAttribute('font-weight', sl.weight);
      t.setAttribute('letter-spacing', '0.2em');
      t.textContent = sl.label;
      t.classList.add('spine-label');
      nodesGroup.appendChild(t);
    });

    // Spine pulses (static SVG animateMotion — these don't need JS animation)
    for (let p = 0; p < 4; p++) {
      const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      pulse.setAttribute('r', p % 2 === 0 ? '4' : '3');
      pulse.setAttribute('fill', p % 2 === 0 ? '#8B5CF6' : '#3B82F6');
      pulse.setAttribute('opacity', '0.9');
      pulse.classList.add('spine-pulse');
      const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
      anim.setAttribute('dur', `${5 + p}s`);
      anim.setAttribute('repeatCount', 'indefinite');
      anim.setAttribute('begin', `${p * 1.5}s`);
      anim.setAttribute('path', spineD);
      if (p % 2 === 1) { anim.setAttribute('keyPoints', '1;0'); anim.setAttribute('keyTimes', '0;1'); }
      pulse.appendChild(anim);
      linesGroup.appendChild(pulse);
    }

    // --- CREATE DYNAMIC ELEMENTS (redrawn each frame) ---
    // We use a dedicated group for dynamic lines and nodes
    const dynLinesG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    dynLinesG.id = 'dynLines';
    linesGroup.appendChild(dynLinesG);

    const dynNodesG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    dynNodesG.id = 'dynNodes';
    nodesGroup.appendChild(dynNodesG);

    // Initial render
    renderFrame();

    // Start the animation loop
    requestAnimationFrame(animationLoop);

    // Schedule first cycle
    setTimeout(startNextCycle, CYCLE_MS);
  }

  // ============================================
  // ANIMATION LOOP
  // ============================================
  function animationLoop(timestamp) {
    if (transitionStart !== null) {
      const elapsed = timestamp - transitionStart;
      const rawT = Math.min(elapsed / TRANSITION_MS, 1);
      // Smooth ease-in-out (cubic bezier approximation)
      const t = rawT < 0.5
        ? 4 * rawT * rawT * rawT
        : 1 - Math.pow(-2 * rawT + 2, 3) / 2;

      // Interpolate positions
      for (let i = 0; i < N; i++) {
        currentPositions[i] = {
          x: sourcePositions[i].x + (targetPositions[i].x - sourcePositions[i].x) * t,
          y: sourcePositions[i].y + (targetPositions[i].y - sourcePositions[i].y) * t
        };
      }

      renderFrame();

      if (rawT >= 1) {
        // Transition complete
        transitionStart = null;
        featuredIdx = nextFeatured;
        currentPositions = getRestPositions(featuredIdx);
        renderFrame();
        // Schedule next cycle
        setTimeout(startNextCycle, CYCLE_MS);
      }
    }
    requestAnimationFrame(animationLoop);
  }

  function startNextCycle() {
    prevFeatured = featuredIdx;
    nextFeatured = (featuredIdx + 1) % N;

    // Snapshot current positions as source
    sourcePositions = currentPositions.map(p => ({ ...p }));
    // Compute target: nextFeatured goes to FEATURED_POS, everyone else fills orbit
    targetPositions = getRestPositions(nextFeatured);

    transitionStart = performance.now();
  }

  // ============================================
  // RENDER FRAME — redraws all dynamic elements
  // ============================================
  function renderFrame() {
    const dynLinesG = document.getElementById('dynLines');
    const dynNodesG = document.getElementById('dynNodes');
    if (!dynLinesG || !dynNodesG) return;

    // Clear previous frame
    dynLinesG.innerHTML = '';
    dynNodesG.innerHTML = '';

    const pos = currentPositions;

    // Determine which node is currently featured (or transitioning)
    const currentFeatIdx = transitionStart !== null ? -1 : featuredIdx;
    // During transition, compute a "featured-ness" factor for each node
    const featFactor = new Array(N).fill(0);
    if (transitionStart !== null) {
      const elapsed = performance.now() - transitionStart;
      const rawT = Math.min(elapsed / TRANSITION_MS, 1);
      const t = rawT < 0.5 ? 4 * rawT * rawT * rawT : 1 - Math.pow(-2 * rawT + 2, 3) / 2;
      featFactor[prevFeatured] = 1 - t;
      featFactor[nextFeatured] = t;
    } else {
      featFactor[featuredIdx] = 1;
    }

    // --- SYNAPSE CONNECTIONS: each node → nearest spine point ---
    for (let i = 0; i < N; i++) {
      const p = pos[i];
      const sp = nearestSpine(p);
      const curv = (p.x < 500 ? 0.1 : -0.1) * (i % 2 === 0 ? 1 : -1);
      const pathD = curvePath(sp.x, sp.y, p.x, p.y, curv);
      const isFeat = featFactor[i] > 0.5;

      // Glow
      const gPath = createPath(pathD, ECOSYSTEMS[i].color, isFeat ? 10 : 6, isFeat ? 0.06 : 0.03);
      gPath.setAttribute('filter', 'url(#synGlow)');
      dynLinesG.appendChild(gPath);

      // Main line
      const mPath = createPath(pathD, ECOSYSTEMS[i].color, isFeat ? 1.8 : 1, isFeat ? 0.4 : 0.2);
      mPath.classList.add('synapse-line');
      dynLinesG.appendChild(mPath);
    }

    // --- CROSS-CONNECTIONS ---
    CONNECTIONS.forEach(([a, b]) => {
      const pa = pos[a], pb = pos[b];
      const curv = ((a + b) % 3 - 1) * 0.04;
      const pathD = curvePath(pa.x, pa.y, pb.x, pb.y, curv);
      const isConnFeat = featFactor[a] > 0.3 || featFactor[b] > 0.3;
      const crossPath = createPath(pathD,
        isConnFeat ? `rgba(255,255,255,0.07)` : 'rgba(255,255,255,0.03)',
        isConnFeat ? 0.7 : 0.4,
        1
      );
      crossPath.classList.add('synapse-cross');
      dynLinesG.appendChild(crossPath);
    });

    // --- NODES ---
    for (let i = 0; i < N; i++) {
      const eco = ECOSYSTEMS[i];
      const p = pos[i];
      const ff = featFactor[i]; // 0 = orbit, 1 = fully featured

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.style.cursor = 'pointer';

      // Sizes interpolated by featured factor
      const baseR = 34;
      const featR = 45;
      const nodeR = baseR + (featR - baseR) * ff;
      const ambientR = 42 + 43 * ff; // 42 → 85
      const ringR = nodeR + 8;

      // Ambient glow
      const amb = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      amb.setAttribute('cx', p.x); amb.setAttribute('cy', p.y);
      amb.setAttribute('r', ambientR);
      amb.setAttribute('fill', hexToRgba(eco.color, 0.03 + 0.04 * ff));
      amb.setAttribute('filter', ff > 0.5 ? 'url(#coreGlow)' : 'url(#synGlow)');
      if (ff > 0.5) amb.classList.add('ai-ambient');
      g.appendChild(amb);

      // Pulse ring (featured only)
      if (ff > 0.2) {
        const pulseRing = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        pulseRing.setAttribute('cx', p.x); pulseRing.setAttribute('cy', p.y);
        pulseRing.setAttribute('r', ringR + 6);
        pulseRing.setAttribute('fill', 'none');
        pulseRing.setAttribute('stroke', eco.color);
        pulseRing.setAttribute('stroke-width', '1');
        pulseRing.setAttribute('opacity', 0.25 * ff);
        if (ff > 0.8) pulseRing.classList.add('ai-pulse-ring');
        g.appendChild(pulseRing);
      }

      // Outer ring
      const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      ring.setAttribute('cx', p.x); ring.setAttribute('cy', p.y);
      ring.setAttribute('r', ringR);
      ring.setAttribute('fill', 'none');
      ring.setAttribute('stroke', hexToRgba(eco.color, 0.2 + 0.15 * ff));
      ring.setAttribute('stroke-width', '1');
      g.appendChild(ring);

      // Fill circle
      const fill = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      fill.setAttribute('cx', p.x); fill.setAttribute('cy', p.y);
      fill.setAttribute('r', nodeR);
      fill.setAttribute('fill', hexToRgba(eco.color, 0.06 + 0.05 * ff));
      fill.setAttribute('stroke', eco.color);
      fill.setAttribute('stroke-width', 1 + 0.5 * ff);
      fill.setAttribute('opacity', 0.7 + 0.3 * ff);
      g.appendChild(fill);

      // Icon — size scales with featured
      const iconSize = 16 + 6 * ff;
      addText(g, p.x, p.y - (6 + 8 * ff), eco.icon, '#fff', 'sans-serif', iconSize, '400', 'middle');

      // Name
      const nameSize = 9 + 5 * ff;
      if (ff > 0.5) {
        // Featured: show name + subtitle
        addText(g, p.x, p.y + 10, eco.name, '#fff', "'Clash Display', sans-serif", nameSize, '700', 'middle');
        addText(g, p.x, p.y + 26, eco.subtitle, hexToRgba(eco.color, 0.8), "'Inter', sans-serif", '9', '500', 'middle');
      } else {
        // Orbit: wrapped name
        const nameLines = wrapText(eco.name, 14);
        nameLines.forEach((line, li) => {
          addText(g, p.x, p.y + 10 + li * 12, line, '#fff', "'Clash Display', sans-serif", nameSize, '600', 'middle');
        });
      }

      // Sub-nodes (only when not mid-transition or close to rest)
      if (ff < 0.15 || ff > 0.85) {
        const subs = eco.subs || [];
        if (ff > 0.85) {
          // Featured sub-nodes — positioned above, wider apart
          const subLocs = [
            { x: p.x - 80, y: p.y - 35 },
            { x: p.x + 80, y: p.y - 35 }
          ];
          subs.forEach((sub, j) => {
            if (j >= subLocs.length) return;
            const sl = subLocs[j];
            const subLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            subLine.setAttribute('x1', p.x); subLine.setAttribute('y1', p.y);
            subLine.setAttribute('x2', sl.x); subLine.setAttribute('y2', sl.y);
            subLine.setAttribute('stroke', eco.color);
            subLine.setAttribute('stroke-width', '1');
            subLine.setAttribute('opacity', '0.4');
            dynLinesG.appendChild(subLine);

            const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dot.setAttribute('cx', sl.x); dot.setAttribute('cy', sl.y);
            dot.setAttribute('r', '5');
            dot.setAttribute('fill', eco.color);
            dot.setAttribute('opacity', '0.85');
            g.appendChild(dot);
            addText(g, sl.x, sl.y - 12, sub, hexToRgba(eco.color, 0.9), "'Inter', sans-serif", '9', '600', 'middle');
          });
        } else {
          // Orbit sub-nodes — visible satellites
          const baseAngle = Math.atan2(p.y - 360, p.x - 500);
          subs.forEach((sub, j) => {
            const angle = baseAngle + (j === 0 ? 0.5 : -0.5);
            const dist = 62;
            const sx = p.x + Math.cos(angle) * dist;
            const sy = p.y + Math.sin(angle) * dist;

            const subLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            subLine.setAttribute('x1', p.x); subLine.setAttribute('y1', p.y);
            subLine.setAttribute('x2', sx); subLine.setAttribute('y2', sy);
            subLine.setAttribute('stroke', eco.color);
            subLine.setAttribute('stroke-width', '0.8');
            subLine.setAttribute('opacity', '0.3');
            dynLinesG.appendChild(subLine);

            const subDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            subDot.setAttribute('cx', sx); subDot.setAttribute('cy', sy);
            subDot.setAttribute('r', '4');
            subDot.setAttribute('fill', eco.color);
            subDot.setAttribute('opacity', '0.7');
            g.appendChild(subDot);

            const isRight = sx > 500;
            addText(g, isRight ? sx + 8 : sx - 8, sy + 1, sub,
              'rgba(255,255,255,0.65)', "'Inter', sans-serif", '8', '500',
              isRight ? 'start' : 'end');
          });
        }
      }

      dynNodesG.appendChild(g);
    }
  }

  // ============================================
  // HELPERS
  // ============================================
  function buildSpinePath() {
    const pts = SPINE_PTS;
    let d = `M${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(pts.length - 1, i + 2)];
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    return d;
  }

  function nearestSpine(pos) {
    let best = SPINE_PTS[0], bestDist = Infinity;
    SPINE_PTS.forEach(sp => {
      const d = Math.hypot(sp.x - pos.x, sp.y - pos.y);
      if (d < bestDist) { bestDist = d; best = sp; }
    });
    return best;
  }

  function curvePath(x1, y1, x2, y2, curvature) {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const dx = x2 - x1, dy = y2 - y1;
    const cx = mx - dy * curvature, cy = my + dx * curvature;
    return `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`;
  }

  function createPath(d, stroke, strokeWidth, opacity) {
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', d);
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', stroke);
    p.setAttribute('stroke-width', strokeWidth);
    p.setAttribute('opacity', opacity);
    p.setAttribute('stroke-linecap', 'round');
    return p;
  }

  function addText(parent, x, y, text, fill, font, size, weight, anchor) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    el.setAttribute('x', x);
    el.setAttribute('y', y);
    el.setAttribute('text-anchor', anchor);
    el.setAttribute('dominant-baseline', 'middle');
    el.setAttribute('fill', fill);
    el.setAttribute('font-family', font);
    el.setAttribute('font-size', size);
    el.setAttribute('font-weight', weight);
    el.textContent = text;
    parent.appendChild(el);
    return el;
  }

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function wrapText(text, maxChars) {
    if (text.length <= maxChars) return [text];
    const words = text.split(' ');
    const lines = [];
    let current = '';
    words.forEach(w => {
      if ((current + ' ' + w).trim().length > maxChars && current) {
        lines.push(current.trim());
        current = w;
      } else {
        current = (current + ' ' + w).trim();
      }
    });
    if (current) lines.push(current.trim());
    return lines.slice(0, 2);
  }

  // ============================================
  // RENDER SPEAKERS
  // ============================================
  function renderSpeakers() {
    const grid = document.getElementById('speakersGrid');
    if (!grid) return;
    grid.innerHTML = SPEAKERS.map(s => {
      const initial = s.name.charAt(0);
      return `
        <article class="speaker-card fade-in">
          <div class="speaker-top">
            <div class="speaker-avatar" style="background:${s.ecoColor};" aria-hidden="true">${initial}</div>
            <div>
              <h3 class="speaker-name">${s.name}</h3>
              <p class="speaker-role">${s.role}</p>
            </div>
          </div>
          <span class="speaker-tag" style="background:${hexToRgba(s.ecoColor, 0.12)}; color:${s.ecoColor};">${s.eco}</span>
          <p class="speaker-why">${s.why}</p>
          <a href="https://x.com/${s.handle}" class="speaker-handle" target="_blank" rel="noopener noreferrer">@${s.handle}</a>
        </article>`;
    }).join('');
  }

  // ============================================
  // RENDER ECOSYSTEM CARDS
  // ============================================
  function renderEcosystem() {
    const grid = document.getElementById('ecosystemGrid');
    if (!grid) return;
    grid.innerHTML = ECOSYSTEMS.map(eco => `
      <article class="eco-card fade-in" style="--card-color:${eco.color};">
        <div class="eco-card-header">
          <span class="eco-card-icon">${eco.icon}</span>
          <h3 class="eco-card-name">${eco.name}</h3>
        </div>
        <p class="eco-card-desc">${eco.desc}</p>
        ${eco.examples.length ? `
          <div class="eco-card-examples">
            ${eco.examples.map(ex => `<span class="eco-example-tag">${ex}</span>`).join('')}
          </div>` : ''}
      </article>
    `).join('');
  }

  // ============================================
  // ACTIVITY FEED
  // ============================================
  const FEED_POSTS = [
    { title: 'Relay the NFT Rat is alive in Times Square', color: '#3B82F6' },
    { title: 'Open call for 2026 NFT art on Collect.Kred', color: '#8B5CF6' },
    { title: 'Social art, Connects us all', color: '#EC4899' },
    { title: 'Tokenised agentic identity', color: '#06B6D4' },
    { title: 'Abandoned communities and NFTs rescued', color: '#EF4444' },
    { title: 'Featured artist hubs', color: '#F59E0B' },
    { title: 'Your journey to NFT.NYC 2026', color: '#10B981' }
  ];

  function renderActivityFeed() {
    const track = document.getElementById('activityTrack');
    if (!track) return;

    // Build one set of items
    function buildItems() {
      return FEED_POSTS.map(p => `
        <div class="feed-item">
          <span class="feed-dot" style="background:${p.color};"></span>
          <span class="feed-title">${p.title}</span>
        </div>
      `).join('');
    }

    // Duplicate the set for seamless infinite vertical scroll
    track.innerHTML = buildItems() + buildItems();

    // 7 posts × 2s each = 14s per full set
    track.parentElement.style.setProperty('--feed-duration', '14s');
  }

  // ============================================
  // INIT
  // ============================================
  buildMesh();
  renderSpeakers();
  renderEcosystem();
  renderActivityFeed();

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
