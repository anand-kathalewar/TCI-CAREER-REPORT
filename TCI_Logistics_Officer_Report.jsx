import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #0a0e1a; }

  .report-root {
    font-family: 'DM Sans', sans-serif;
    background: #0a0e1a;
    color: #e8e4d9;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  .bg-mesh {
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 20% 10%, rgba(12,58,107,0.35) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 80%, rgba(163,120,30,0.12) 0%, transparent 55%),
      radial-gradient(ellipse 40% 40% at 60% 40%, rgba(10,30,60,0.4) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  .content-wrap { position: relative; z-index: 1; max-width: 900px; margin: 0 auto; padding: 0 20px 60px; }

  /* ─── HERO ─── */
  .hero {
    padding: 56px 0 40px;
    border-bottom: 1px solid rgba(200,170,80,0.25);
    margin-bottom: 48px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(163,120,30,0.12);
    border: 1px solid rgba(163,120,30,0.4);
    border-radius: 2px;
    padding: 5px 14px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 2.5px;
    color: #c8a250;
    text-transform: uppercase;
    margin-bottom: 28px;
  }

  .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #c8a250; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }

  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 900;
    line-height: 1.1;
    color: #f0ece0;
    margin-bottom: 16px;
    letter-spacing: -0.5px;
  }

  .hero-title span { color: #c8a250; }

  .hero-sub {
    font-size: 15px;
    color: #8b9ab5;
    font-weight: 300;
    line-height: 1.7;
    max-width: 620px;
  }

  .hero-meta {
    margin-top: 28px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .meta-chip {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #8b9ab5;
    font-family: 'DM Mono', monospace;
  }

  .meta-chip strong { color: #c8a250; font-weight: 500; }

  /* ─── NAVIGATION TABS ─── */
  .nav-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 40px;
    border-bottom: 1px solid rgba(139,154,181,0.15);
    padding-bottom: 0;
  }

  .tab-btn {
    background: transparent;
    border: none;
    padding: 10px 18px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #8b9ab5;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: all 0.2s;
    letter-spacing: 0.3px;
  }

  .tab-btn:hover { color: #e8e4d9; }
  .tab-btn.active { color: #c8a250; border-bottom-color: #c8a250; }

  /* ─── SECTIONS ─── */
  .section { display: none; animation: fadeIn 0.4s ease; }
  .section.visible { display: block; }
  @keyframes fadeIn { from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);} }

  /* ─── SECTION HEADER ─── */
  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    color: #c8a250;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(22px, 3.5vw, 30px);
    font-weight: 700;
    color: #f0ece0;
    margin-bottom: 14px;
    line-height: 1.2;
  }

  .section-intro {
    font-size: 15px;
    color: #8b9ab5;
    line-height: 1.8;
    margin-bottom: 36px;
    max-width: 680px;
    font-weight: 300;
  }

  /* ─── COMPANY CARDS ─── */
  .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 36px; }

  .stat-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(200,162,80,0.15);
    border-radius: 4px;
    padding: 20px;
    position: relative;
    overflow: hidden;
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #c8a250, transparent);
  }

  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: #c8a250;
    line-height: 1;
    margin-bottom: 6px;
  }

  .stat-label { font-size: 11px; color: #8b9ab5; letter-spacing: 0.5px; }

  /* ─── INFO BLOCKS ─── */
  .info-block {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(139,154,181,0.1);
    border-left: 3px solid #c8a250;
    border-radius: 0 4px 4px 0;
    padding: 20px 24px;
    margin-bottom: 16px;
  }

  .info-block h4 {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #c8a250;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }

  .info-block p {
    font-size: 14px;
    color: #b0bdd4;
    line-height: 1.75;
    font-weight: 300;
  }

  /* ─── DIVISIONS GRID ─── */
  .div-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-bottom: 36px; }

  .div-card {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(139,154,181,0.1);
    border-radius: 4px;
    padding: 18px;
    transition: border-color 0.2s, background 0.2s;
  }

  .div-card:hover { border-color: rgba(200,162,80,0.4); background: rgba(200,162,80,0.04); }

  .div-icon { font-size: 22px; margin-bottom: 10px; }
  .div-name { font-size: 13px; font-weight: 600; color: #e8e4d9; margin-bottom: 6px; }
  .div-desc { font-size: 12px; color: #8b9ab5; line-height: 1.6; font-weight: 300; }

  /* ─── SKILL CARDS ─── */
  .skill-category {
    margin-bottom: 32px;
  }

  .skill-cat-title {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    color: #c8a250;
    text-transform: uppercase;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(200,162,80,0.2);
  }

  .skill-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }

  .skill-card {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(139,154,181,0.1);
    border-radius: 4px;
    padding: 18px 20px;
    transition: all 0.2s;
  }

  .skill-card:hover { border-color: rgba(200,162,80,0.35); transform: translateY(-2px); }

  .skill-header { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 10px; }
  .skill-icon { font-size: 18px; flex-shrink: 0; margin-top: 2px; }

  .skill-name { font-size: 13px; font-weight: 600; color: #e8e4d9; margin-bottom: 3px; }
  .skill-level {
    display: inline-block;
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #c8a250;
    background: rgba(200,162,80,0.1);
    border: 1px solid rgba(200,162,80,0.25);
    border-radius: 2px;
    padding: 2px 7px;
    font-family: 'DM Mono', monospace;
  }

  .skill-desc { font-size: 12.5px; color: #8b9ab5; line-height: 1.65; font-weight: 300; }

  /* ─── TRAIT CARDS ─── */
  .trait-list { display: flex; flex-direction: column; gap: 14px; }

  .trait-card {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(139,154,181,0.1);
    border-radius: 4px;
    padding: 20px 24px;
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: 16px;
    align-items: flex-start;
    transition: all 0.2s;
  }

  .trait-card:hover { border-color: rgba(200,162,80,0.3); background: rgba(200,162,80,0.03); }

  .trait-num {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 700;
    color: rgba(200,162,80,0.35);
    line-height: 1;
    padding-top: 3px;
  }

  .trait-name { font-size: 14px; font-weight: 600; color: #e8e4d9; margin-bottom: 6px; }
  .trait-why { font-size: 13px; color: #8b9ab5; line-height: 1.7; font-weight: 300; }
  .trait-action {
    margin-top: 10px;
    font-size: 12px;
    color: #c8a250;
    font-style: italic;
    font-weight: 300;
  }

  /* ─── 90 DAY PLAN ─── */
  .phase-block {
    margin-bottom: 32px;
    position: relative;
    padding-left: 28px;
  }

  .phase-block::before {
    content: '';
    position: absolute;
    left: 8px; top: 28px; bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, rgba(200,162,80,0.4), transparent);
  }

  .phase-dot {
    position: absolute;
    left: 0; top: 4px;
    width: 18px; height: 18px;
    border-radius: 50%;
    background: #0a0e1a;
    border: 2px solid #c8a250;
    display: flex; align-items: center; justify-content: center;
  }

  .phase-dot-inner { width: 6px; height: 6px; border-radius: 50%; background: #c8a250; }

  .phase-header {
    margin-bottom: 14px;
  }

  .phase-tag {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #c8a250;
    margin-bottom: 4px;
  }

  .phase-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    color: #f0ece0;
  }

  .phase-items { display: flex; flex-direction: column; gap: 10px; }

  .phase-item {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(139,154,181,0.1);
    border-radius: 4px;
    padding: 14px 16px;
    display: flex; gap: 12px; align-items: flex-start;
  }

  .phase-item-icon { font-size: 14px; flex-shrink: 0; margin-top: 1px; }
  .phase-item-text { font-size: 13px; color: #b0bdd4; line-height: 1.65; font-weight: 300; }
  .phase-item-text strong { color: #e8e4d9; font-weight: 600; }

  /* ─── CAREER PATH ─── */
  .career-ladder { display: flex; flex-direction: column; gap: 0; }

  .ladder-step {
    display: grid;
    grid-template-columns: 100px 20px 1fr;
    gap: 0 16px;
    align-items: stretch;
    min-height: 70px;
  }

  .ladder-year {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #8b9ab5;
    text-align: right;
    padding-top: 6px;
    letter-spacing: 0.5px;
  }

  .ladder-line {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .ladder-node {
    width: 14px; height: 14px;
    border-radius: 50%;
    background: #c8a250;
    flex-shrink: 0;
    margin-top: 4px;
  }

  .ladder-node.start { background: #e8e4d9; box-shadow: 0 0 0 3px rgba(232,228,217,0.2); }

  .ladder-connector {
    width: 2px;
    flex: 1;
    background: linear-gradient(to bottom, rgba(200,162,80,0.5), rgba(200,162,80,0.1));
    margin: 4px 0;
  }

  .ladder-content {
    padding: 2px 0 20px;
  }

  .ladder-role { font-size: 14px; font-weight: 600; color: #e8e4d9; margin-bottom: 4px; }
  .ladder-detail { font-size: 12.5px; color: #8b9ab5; line-height: 1.6; font-weight: 300; }
  .ladder-highlight { color: #c8a250; font-weight: 500; }

  /* ─── MANTRA ─── */
  .mantra-box {
    margin: 40px 0;
    background: linear-gradient(135deg, rgba(200,162,80,0.08), rgba(200,162,80,0.03));
    border: 1px solid rgba(200,162,80,0.3);
    border-radius: 4px;
    padding: 32px 36px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .mantra-box::before {
    content: '❝';
    position: absolute;
    top: 10px; left: 20px;
    font-size: 60px;
    color: rgba(200,162,80,0.1);
    font-family: 'Playfair Display', serif;
    line-height: 1;
  }

  .mantra-text {
    font-family: 'Playfair Display', serif;
    font-size: clamp(16px, 2.5vw, 20px);
    font-weight: 600;
    color: #f0ece0;
    line-height: 1.5;
    font-style: italic;
    position: relative;
  }

  .mantra-attr {
    margin-top: 12px;
    font-size: 12px;
    color: #c8a250;
    font-family: 'DM Mono', monospace;
    letter-spacing: 1px;
  }

  /* ─── ALERT BOX ─── */
  .alert-box {
    background: rgba(200,162,80,0.06);
    border: 1px solid rgba(200,162,80,0.25);
    border-radius: 4px;
    padding: 18px 22px;
    margin: 24px 0;
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }

  .alert-icon { font-size: 18px; flex-shrink: 0; }
  .alert-text { font-size: 13px; color: #b0bdd4; line-height: 1.7; font-weight: 300; }
  .alert-text strong { color: #c8a250; font-weight: 600; }

  /* ─── RESPONSIBILITY LIST ─── */
  .resp-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; margin-bottom: 28px; }

  .resp-item {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(139,154,181,0.08);
    border-radius: 4px;
    padding: 16px;
  }

  .resp-bullet {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #c8a250;
    flex-shrink: 0;
    margin-top: 6px;
  }

  .resp-text { font-size: 13px; color: #b0bdd4; line-height: 1.65; font-weight: 300; }
  .resp-text strong { color: #e8e4d9; font-weight: 600; display: block; margin-bottom: 3px; font-size: 13px; }

  /* ─── FOOTER ─── */
  .report-footer {
    margin-top: 60px;
    padding-top: 24px;
    border-top: 1px solid rgba(139,154,181,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .footer-text { font-size: 11px; color: rgba(139,154,181,0.5); font-family: 'DM Mono', monospace; }

  @media (max-width: 600px) {
    .ladder-step { grid-template-columns: 70px 16px 1fr; }
    .ladder-year { font-size: 10px; }
  }
`;

const TABS = [
  { id: "company", label: "About TCI" },
  { id: "role", label: "The Role" },
  { id: "traits", label: "Winning Traits" },
  { id: "skills", label: "Skills Arsenal" },
  { id: "plan", label: "90-Day Plan" },
  { id: "career", label: "Career Path" },
];

const DIVISIONS = [
  { icon: "🚛", name: "TCI Freight", desc: "India's largest surface transport entity. FTL, LTL, ODC (Over Dimensional Cargo), project heavy haul, small packages." },
  { icon: "🏭", name: "TCI Supply Chain Solutions", desc: "End-to-end 3PL/4PL: warehouse management, inbound/outbound logistics, distribution centre operations for Auto, Pharma, FMCG." },
  { icon: "🚢", name: "TCI Seaways", desc: "Coastal shipping, container cargo movement, port logistics, bulk cargo. Six vessels, three more planned by 2026." },
  { icon: "⚗️", name: "TCI XPS / Chemical", desc: "Secure, compliant transport for hazardous and non-hazardous chemical cargo with end-to-end traceability." },
  { icon: "🌡️", name: "TCI Cold Chain", desc: "Temperature-controlled logistics for pharmaceuticals, food, and dairy. Reefer storage and specialized fleet." },
  { icon: "🌍", name: "TCI Global", desc: "Subsidiaries in Bangladesh, Nepal, Middle East. Cross-border freight, customs clearance, EXIM logistics." },
];

const RESPONSIBILITIES = [
  { title: "Freight Coordination", desc: "Plan, dispatch, and track FTL/LTL consignments across TCI's 1,000+ office network. Liaise with drivers, fleet managers, and clients." },
  { title: "Warehousing Operations", desc: "Oversee inbound/outbound movement within distribution centres. Manage inventory accuracy, GRN (Goods Receipt Notes), and stock records." },
  { title: "Vendor & Transporter Management", desc: "Negotiate with secondary transporters. Evaluate vendor performance on cost, TAT (Turn Around Time), and safety compliance." },
  { title: "Documentation & Compliance", desc: "Maintain e-way bills, LR (Lorry Receipts), POD (Proof of Delivery), EPOD. Ensure GST and statutory logistics compliance." },
  { title: "Client Interaction & SLA Monitoring", desc: "Coordinate with client supply chain teams. Track SLA adherence, escalate delays proactively, prepare MIS reports." },
  { title: "Route Optimization", desc: "Analyse delivery routes using TCI's TMS (Transport Management System). Reduce cost-per-km without compromising delivery TAT." },
  { title: "Cross-functional Coordination", desc: "Work with Sales, Finance, IT, and Operations teams. At TCI, early career officers rotate across divisions — embrace it." },
  { title: "Data & MIS Reporting", desc: "Prepare daily/weekly logistics dashboards for management. Metrics: on-time delivery %, damage rate, vehicle utilization, freight cost." },
];

const TRAITS = [
  {
    name: "Ownership Mindset — Act Like a Business Owner",
    why: "TCI's culture explicitly rewards people who take charge. At training, most freshers wait to be told what to do. The ones who get fast-tracked are the ones who spot a problem and own the fix before anyone asks.",
    action: "On Day 1, introduce yourself to 5 people. On Week 1, ask your supervisor: 'What is the ONE metric you most need help improving?' Then make it your mission."
  },
  {
    name: "Analytical Thinking with Numbers",
    why: "Logistics is a data sport. Cost-per-km, vehicle utilization %, order fill rate, inventory turns — these numbers tell the real story. Your B.Tech gives you the analytical DNA; now apply it to supply chain data.",
    action: "Build a personal Excel dashboard tracking your branch's top 5 KPIs. In your second month, present it to your supervisor unsolicited."
  },
  {
    name: "Communication — Clear, Concise, Confident",
    why: "You'll constantly coordinate between drivers, warehouse staff, clients, and managers. Ambiguity costs money in logistics. A message misunderstood = a truck at the wrong location = a missed SLA.",
    action: "Practice the 3-sentence rule: State the situation, the action needed, and the deadline. Nothing more. Do it in Hindi, English — whatever the floor requires."
  },
  {
    name: "Calm Under Operational Fire",
    why: "A truck breaks down at midnight. A client's cargo is stuck at a toll. Customs hold on an EXIM shipment. These aren't hypotheticals — they're Tuesday at TCI. The officer who stays composed and problem-solves fastest is the one who earns trust.",
    action: "When something goes wrong, write it down: What happened? What did I do? What was the outcome? This logbook becomes your instinct bank."
  },
  {
    name: "Cross-Functional Curiosity",
    why: "TCI's formal policy is job rotation. Those who genuinely learn every function — freight, warehouse, seaways, SCS — become irreplaceable managers. Those who stay siloed stay stuck.",
    action: "Volunteer for cross-division tasks. If you're in freight, ask to shadow a warehousing operation for a day. Show hunger, not just competence."
  },
  {
    name: "Tech-First Attitude",
    why: "TCI is actively deploying Agentic AI, TMS platforms, and IoT-based fleet tracking. A fresher who embraces tech adoption — and better yet, proposes improvements — stands head and shoulders above peers who treat IT as an obstacle.",
    action: "Understand TCI's TMS end-to-end within the first 30 days. Identify one manual process you can suggest automating. Document it and present it formally."
  },
  {
    name: "Integrity Without Exception",
    why: "In logistics, cash, cargo, and contracts flow at enormous speed. TCI's institutional reputation — built over 67 years — rests on trust. One ethical lapse can end a career at TCI permanently.",
    action: "Simple code: If you wouldn't want your manager to see what you're doing, don't do it. Transparency is not weakness — it's your career insurance."
  },
  {
    name: "Relentless Learner",
    why: "TCI sends high performers to Harvard Business School, IIM, and NUS for advanced training. But that opportunity only comes to people who visibly learn and grow at every level. The training programme in Gurugram is an audition, not an orientation.",
    action: "Read one supply chain article daily. Understand what PM Gati Shakti and National Logistics Policy mean for TCI's business. Speaking the industry's language signals you're career-serious."
  },
];

const SKILLS = {
  technical: [
    { icon: "📊", name: "Excel & Data Analysis", level: "MASTER THIS", desc: "Logistics runs on spreadsheets — VLOOKUP, pivot tables, dashboards. Make Excel your native language from Day 1." },
    { icon: "🚦", name: "TMS & ERP Systems", level: "LEARN FAST", desc: "TCI uses proprietary Transport Management Systems. Learn every module, not just your own. Map system flows." },
    { icon: "📋", name: "Freight Documentation", level: "CORE SKILL", desc: "LR, POD, E-way bill, EPOD, GRN, invoicing, GST e-invoicing. Errors here = financial losses and compliance risk." },
    { icon: "📦", name: "Warehouse Management", level: "CORE SKILL", desc: "WMS basics, cycle counting, FIFO/FEFO, layout optimization, put-away and picking logic." },
    { icon: "🔢", name: "Supply Chain KPIs", level: "DIFFERENTIATE", desc: "OTIF (On Time In Full), order fill rate, freight cost/unit, inventory turnover, vehicle utilization %. Know them cold." },
    { icon: "🗺️", name: "Route Planning & GPS Tools", level: "APPLY NOW", desc: "Basic route optimization logic, map reading, toll and weight restriction awareness for national highways." },
  ],
  professional: [
    { icon: "🤝", name: "Stakeholder Management", level: "CRITICAL", desc: "Managing drivers, vendors, clients, and cross-functional teams requires trust-building, not authority." },
    { icon: "📝", name: "Report Writing & MIS", level: "CORE SKILL", desc: "Management Information Systems reports are how your performance gets seen upward. Make them clear, accurate, and insight-driven." },
    { icon: "⚡", name: "Problem-Solving Under TAT", level: "DIFFERENTIATOR", desc: "Time-sensitive decision-making. Build a personal escalation matrix — know who to call for what, at any hour." },
    { icon: "🌐", name: "Supply Chain Domain Knowledge", level: "BUILD FAST", desc: "Understand automotive, FMCG, pharma supply chains — TCI's primary sectors. Know your client's world better than they expect you to." },
  ],
  futuristic: [
    { icon: "🤖", name: "AI & Analytics Literacy", level: "FUTURE-PROOF", desc: "TCI is deploying Agentic AI for route optimization. A fresher who understands AI-driven insights will be invaluable in 2 years." },
    { icon: "♻️", name: "Green Logistics Understanding", level: "EMERGING", desc: "TCI's EV fleet, LNG trucks, and TEMT decarbonization tool are strategic priorities. MNC clients are mandating ESG compliance." },
    { icon: "🌏", name: "EXIM & Global Logistics Basics", level: "GROWTH PATH", desc: "As TCI expands in Bangladesh, Nepal, Middle East — cross-border knowledge opens international rotation opportunities." },
  ],
};

const PLAN_PHASES = [
  {
    tag: "Days 1–30",
    title: "Observe, Learn, Map",
    items: [
      { icon: "👂", text: "<strong>Listen more than you speak.</strong> Absorb the operational culture. Understand who the informal leaders are on the floor, not just the org chart." },
      { icon: "🗺️", text: "<strong>Map the full operations flow</strong> of your assigned branch: how a consignment enters, moves, is documented, and exits the system." },
      { icon: "💻", text: "<strong>Master the TMS system</strong> in your first two weeks. Ask IT staff to walk you through every module, even ones outside your immediate role." },
      { icon: "📚", text: "<strong>Read TCI's published material</strong> — 'Logistics Focus' magazine, their annual report, and blog. Know their strategic priorities before your first monthly review." },
      { icon: "🤝", text: "<strong>Build relationships intentionally.</strong> Know every team member by name. Understand their challenges. This will matter when you need cooperation under pressure." },
    ]
  },
  {
    tag: "Days 31–60",
    title: "Execute, Contribute, Improve",
    items: [
      { icon: "📊", text: "<strong>Build your personal KPI dashboard</strong> in Excel tracking your branch's performance. Present it to your supervisor — without being asked." },
      { icon: "⚙️", text: "<strong>Identify one process inefficiency</strong> and document it with data: what it costs, what a fix could look like, and what benefit it delivers." },
      { icon: "🔄", text: "<strong>Volunteer for cross-functional exposure.</strong> Request to shadow the warehouse operation, accompany a route survey, or attend a client call." },
      { icon: "📝", text: "<strong>Improve your MIS reports.</strong> Add one insight-driven observation to every report — not just data, but what the data means and what action it suggests." },
      { icon: "📖", text: "<strong>Start a Supply Chain reading habit.</strong> Spend 20 minutes daily on logistics news: PM Gati Shakti updates, industry shifts, competitor moves." },
    ]
  },
  {
    tag: "Days 61–90",
    title: "Lead, Propose, Distinguish",
    items: [
      { icon: "🚀", text: "<strong>Present your process improvement proposal</strong> formally to your manager. Back it with data. Show ROI. This is how you become visible." },
      { icon: "🎯", text: "<strong>Volunteer to lead a small project</strong> — even a warehouse audit, a vendor evaluation, or a route re-mapping exercise. Ownership at this stage is rare and remembered." },
      { icon: "🏆", text: "<strong>Request your 90-day performance feedback</strong> proactively. Ask: 'What should I do differently in the next 90 days to grow faster?' This signals self-awareness and ambition." },
      { icon: "🌐", text: "<strong>Speak the language of the business.</strong> In meetings, reference TCI's strategic priorities — green logistics, AI adoption, Q-Commerce growth. Connect your work to the big picture." },
      { icon: "📌", text: "<strong>Identify your preferred division path</strong> — Supply Chain Solutions, Freight, Seaways — and communicate your interest to your reporting manager. TCI rewards those who know where they want to go." },
    ]
  },
];

const LADDER = [
  { year: "2026 →", role: "Logistics Officer (Fresher)", detail: "Training Gurugram → Branch posting. Master operations, documentation, and client coordination.", highlight: "Your entry point. Make it count." },
  { year: "Year 2–3", role: "Senior Logistics Officer / Asst. Manager", detail: "Lead a process or small team. Cross-functional rotation likely. MIS ownership.", highlight: "Performance and initiative drive this jump." },
  { year: "Year 4–5", role: "Branch Manager / Operations Manager", detail: "P&L awareness for a branch. Vendor negotiations. Client SLA ownership.", highlight: "IIM / NUS sponsorship possible at this stage." },
  { year: "Year 6–8", role: "Regional Manager / Key Account Manager", detail: "Multi-branch oversight. Strategic client management. Green logistics and tech projects.", highlight: "Board visibility begins here." },
  { year: "Year 10+", role: "Vice President / Business Head", detail: "Division or regional leadership. Global assignments possible (Bangladesh, Middle East).", highlight: "TCI offers career-for-life. The ceiling is yours to set." },
];

export default function TCIReport() {
  const [activeTab, setActiveTab] = useState("company");

  return (
    <>
      <style>{styles}</style>
      <div className="report-root">
        <div className="bg-mesh" />
        <div className="content-wrap">

          {/* ─── HERO ─── */}
          <div className="hero">
            <div className="badge">
              <div className="badge-dot" />
              Career Intelligence Report · June 2026
            </div>
            <h1 className="hero-title">
              Your Son's Blueprint to<br />
              <span>Excel at TCI</span>
            </h1>
            <p className="hero-sub">
              A complete strategic guide for a new Logistics Officer joining Transport Corporation of India —
              covering the company, the role, the skills that separate good from extraordinary, and a 90-day action plan for rapid distinction.
            </p>
            <div className="hero-meta">
              <div className="meta-chip">🏢 <strong>Company:</strong> Transport Corporation of India Ltd (TCI)</div>
              <div className="meta-chip">📍 <strong>Location:</strong> Gurugram, Haryana HQ</div>
              <div className="meta-chip">💼 <strong>Role:</strong> Logistics Officer</div>
              <div className="meta-chip">🎓 <strong>Joining:</strong> 1 June 2026</div>
            </div>
          </div>

          {/* ─── TABS ─── */}
          <div className="nav-tabs">
            {TABS.map(t => (
              <button
                key={t.id}
                className={`tab-btn${activeTab === t.id ? " active" : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ════════════ ABOUT TCI ════════════ */}
          <div className={`section${activeTab === "company" ? " visible" : ""}`}>
            <div className="section-label">Section 01 — The Organisation</div>
            <h2 className="section-title">Know Your Company Before You Enter Its Doors</h2>
            <p className="section-intro">
              TCI isn't a trucking company. It's India's most sophisticated multimodal logistics organism —
              a 67-year-old institution that moves 2.5% of India's GDP by value every single year.
              Understanding its DNA is the first competitive advantage your son can build.
            </p>

            <div className="stat-grid">
              <div className="stat-card"><div className="stat-num">1958</div><div className="stat-label">Founded — 67 years of legacy</div></div>
              <div className="stat-card"><div className="stat-num">₹7,000Cr+</div><div className="stat-label">Group Revenue (FY2025)</div></div>
              <div className="stat-card"><div className="stat-num">30,000+</div><div className="stat-label">Employees nationwide</div></div>
              <div className="stat-card"><div className="stat-num">1,000+</div><div className="stat-label">Offices across India & SAARC</div></div>
              <div className="stat-card"><div className="stat-num">16Mn sq.ft</div><div className="stat-label">Warehousing footprint</div></div>
              <div className="stat-card"><div className="stat-num">6 Ships</div><div className="stat-label">Coastal fleet (3 more by 2026)</div></div>
            </div>

            <div className="info-block">
              <h4>The Origin Story</h4>
              <p>Founded in 1958 in Kolkata by Prabhu Dayal Agarwal as a single-truck operation, TCI grew through sheer institutional discipline into India's premier integrated logistics provider. The Agarwal family (D.P. Agarwal, Vineet Agarwal, Chander Agarwal) still leads with a long-term vision unusual in the industry — making TCI a stable, career-building institution rather than a transactional employer.</p>
            </div>

            <div className="info-block">
              <h4>Why TCI Wins — The Three Unfair Advantages</h4>
              <p><strong style={{color:'#e8e4d9'}}>1. Network depth no startup can replicate:</strong> 1,000+ owned offices built over decades. No tech-aggregator can buy this overnight. <strong style={{color:'#e8e4d9'}}>2. Multimodal ownership:</strong> Road, rail, sea — TCI owns assets across all modes, making it "sticky" for MNC clients who cannot afford supply chain disruption. <strong style={{color:'#e8e4d9'}}>3. Trust as a moat:</strong> In an industry plagued by the unorganized sector, TCI's corporate governance and transparency make it the default partner for Japan, US, and EU-based manufacturing companies operating in India.</p>
            </div>

            <div className="info-block">
              <h4>Where TCI Is Headed — The 2026–2030 Strategic Bets</h4>
              <p>TCI is actively investing in <strong style={{color:'#e8e4d9'}}>Agentic AI</strong> for route optimization, <strong style={{color:'#e8e4d9'}}>EV and LNG fleets</strong> for green logistics mandated by MNC clients, <strong style={{color:'#e8e4d9'}}>coastal shipping expansion</strong> (three new vessels), <strong style={{color:'#e8e4d9'}}>Quick-Commerce logistics</strong> as a new revenue driver, and <strong style={{color:'#e8e4d9'}}>international expansion</strong> in Bangladesh, Nepal, and the Middle East. A Logistics Officer joining today enters at the inflection point of TCI's most ambitious growth phase.</p>
            </div>

            <div style={{marginTop: 32}}>
              <div className="section-label" style={{marginBottom:14}}>TCI's Six Business Divisions</div>
              <div className="div-grid">
                {DIVISIONS.map((d, i) => (
                  <div className="div-card" key={i}>
                    <div className="div-icon">{d.icon}</div>
                    <div className="div-name">{d.name}</div>
                    <div className="div-desc">{d.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mantra-box">
              <div className="mantra-text">"One of India's leading logistics providers that moves 2.5% of India's GDP by value every year."</div>
              <div className="mantra-attr">— TCI Official Corporate Statement, 2025</div>
            </div>

            <div className="info-block">
              <h4>Culture That Rewards Ambition</h4>
              <p>TCI's stated policy: <em>employees at entry level can aspire to become members of the Board</em> through consistent performance. Job rotation is institutionalised. Senior performers are sponsored for Harvard Business School, IIM, and NUS training programmes. The company publishes 'Logistics Focus' and 'Enroute' magazines — showing an organization that invests in knowledge. Your son is not entering a job. He is entering a system designed to create business leaders.</p>
            </div>
          </div>

          {/* ════════════ THE ROLE ════════════ */}
          <div className={`section${activeTab === "role" ? " visible" : ""}`}>
            <div className="section-label">Section 02 — The Role</div>
            <h2 className="section-title">Logistics Officer — What the Job Actually Demands</h2>
            <p className="section-intro">
              The title says 'Officer.' The job is closer to conductor of a complex, high-speed orchestra.
              Every truck, every consignment, every SLA, every vendor interaction is a moving part.
              Here's what the role truly entails at a company of TCI's scale.
            </p>

            <div className="alert-box">
              <div className="alert-icon">⚡</div>
              <div className="alert-text">
                <strong>Critical insight for freshers:</strong> TCI's formal training in Gurugram is not just an induction — it is a structured assessment. Trainers and senior managers observe initiative, attitude, and learning pace. How your son performs in training determines the quality of his first branch posting. Treat Day 1 as the most important day.
              </div>
            </div>

            <div className="section-label" style={{margin: '28px 0 14px'}}>Core Responsibilities</div>
            <div className="resp-grid">
              {RESPONSIBILITIES.map((r, i) => (
                <div className="resp-item" key={i}>
                  <div className="resp-bullet" />
                  <div className="resp-text">
                    <strong>{r.title}</strong>
                    {r.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="info-block">
              <h4>The B.Tech Electrical Engineering Edge</h4>
              <p>This is underestimated. Electrical engineering trains the brain to think in systems, flows, and optimization — exactly what logistics demands. Circuit analysis = supply chain flow analysis. Energy efficiency = freight cost optimization. Fault diagnosis = root cause analysis of delivery failures. Your son should consciously leverage this engineering mindset. It will make his operational thinking sharper than most MBA freshers who see only the commercial surface.</p>
            </div>

            <div className="info-block">
              <h4>The Daily Reality — What a Good Day Looks Like</h4>
              <p>Morning: Review overnight freight movements, POD status, pending deliveries. Identify delayed consignments and escalate proactively to clients before they call you. Mid-day: Coordinate with vehicle dispatching, handle real-time exceptions (breakdowns, traffic, documentation errors). End of day: Update MIS, prepare next-day dispatch schedule, review vendor performance data. A good day is not one without problems — it's one where every problem was solved before it became a crisis.</p>
            </div>

            <div className="info-block">
              <h4>Industries Your Son Will Serve</h4>
              <p>TCI's client portfolio spans <strong style={{color:'#e8e4d9'}}>Automobile</strong> (critical SLA timelines), <strong style={{color:'#e8e4d9'}}>Pharmaceuticals</strong> (cold chain, regulatory compliance), <strong style={{color:'#e8e4d9'}}>FMCG</strong> (high volume, fast turnaround), <strong style={{color:'#e8e4d9'}}>Engineering & Defence</strong> (heavy haul, security protocols), <strong style={{color:'#e8e4d9'}}>E-Commerce</strong> (last-mile precision), and <strong style={{color:'#e8e4d9'}}>Chemicals</strong> (safety and compliance paramount). Each sector has unique logistics DNA. Learning sector nuances will make him a specialist faster.</p>
            </div>
          </div>

          {/* ════════════ TRAITS ════════════ */}
          <div className={`section${activeTab === "traits" ? " visible" : ""}`}>
            <div className="section-label">Section 03 — Character Architecture</div>
            <h2 className="section-title">The 8 Traits That Separate Leaders from Employees</h2>
            <p className="section-intro">
              Skills can be trained. Traits are character. The professionals who rise fastest at TCI — and in logistics globally — share these eight qualities.
              These are not soft skills. They are operational superpowers.
            </p>

            <div className="trait-list">
              {TRAITS.map((t, i) => (
                <div className="trait-card" key={i}>
                  <div className="trait-num">0{i + 1}</div>
                  <div>
                    <div className="trait-name">{t.name}</div>
                    <div className="trait-why">{t.why}</div>
                    <div className="trait-action">→ Action: {t.action}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mantra-box" style={{marginTop: 36}}>
              <div className="mantra-text">
                "In logistics, average performers manage shipments. Extraordinary ones manage outcomes. Your son should always be thinking: what is the result this client actually needs — and how do I deliver that, not just the task?"
              </div>
              <div className="mantra-attr">— Strategic Mindset for TCI Logistics Officers</div>
            </div>
          </div>

          {/* ════════════ SKILLS ════════════ */}
          <div className={`section${activeTab === "skills" ? " visible" : ""}`}>
            <div className="section-label">Section 04 — Skills Arsenal</div>
            <h2 className="section-title">What to Build, What to Master, What to Anticipate</h2>
            <p className="section-intro">
              Three tiers of skills. The first two create performance today.
              The third tier creates leadership relevance in TCI's tech-forward future.
            </p>

            <div className="skill-category">
              <div className="skill-cat-title">Tier 1 — Technical Operations Skills (Master Immediately)</div>
              <div className="skill-grid">
                {SKILLS.technical.map((s, i) => (
                  <div className="skill-card" key={i}>
                    <div className="skill-header">
                      <div className="skill-icon">{s.icon}</div>
                      <div>
                        <div className="skill-name">{s.name}</div>
                        <span className="skill-level">{s.level}</span>
                      </div>
                    </div>
                    <div className="skill-desc">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="skill-category">
              <div className="skill-cat-title">Tier 2 — Professional Effectiveness Skills (Build in Months 1–6)</div>
              <div className="skill-grid">
                {SKILLS.professional.map((s, i) => (
                  <div className="skill-card" key={i}>
                    <div className="skill-header">
                      <div className="skill-icon">{s.icon}</div>
                      <div>
                        <div className="skill-name">{s.name}</div>
                        <span className="skill-level">{s.level}</span>
                      </div>
                    </div>
                    <div className="skill-desc">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="skill-category">
              <div className="skill-cat-title">Tier 3 — Future-Readiness Skills (Start Year 2 Onwards)</div>
              <div className="skill-grid">
                {SKILLS.futuristic.map((s, i) => (
                  <div className="skill-card" key={i}>
                    <div className="skill-header">
                      <div className="skill-icon">{s.icon}</div>
                      <div>
                        <div className="skill-name">{s.name}</div>
                        <span className="skill-level">{s.level}</span>
                      </div>
                    </div>
                    <div className="skill-desc">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="alert-box">
              <div className="alert-icon">🎯</div>
              <div className="alert-text">
                <strong>The certifications worth pursuing:</strong> APICS CSCP (Certified Supply Chain Professional), CILT (Chartered Institute of Logistics and Transport) membership, Six Sigma Yellow/Green Belt (process improvement at TCI scale), and Google Data Analytics certificate for MIS enhancement. TCI may sponsor these for high performers.
              </div>
            </div>
          </div>

          {/* ════════════ 90 DAY PLAN ════════════ */}
          <div className={`section${activeTab === "plan" ? " visible" : ""}`}>
            <div className="section-label">Section 05 — Execution Blueprint</div>
            <h2 className="section-title">The 90-Day Plan to Become Undeniably Visible</h2>
            <p className="section-intro">
              The first 90 days at any organization is the most important period of a career.
              Impressions formed now persist for years. This is not a passive orientation period —
              it is the highest-leverage time your son will ever have at TCI.
            </p>

            {PLAN_PHASES.map((phase, i) => (
              <div className="phase-block" key={i}>
                <div className="phase-dot"><div className="phase-dot-inner" /></div>
                <div className="phase-header">
                  <div className="phase-tag">{phase.tag}</div>
                  <div className="phase-title">{phase.title}</div>
                </div>
                <div className="phase-items">
                  {phase.items.map((item, j) => (
                    <div className="phase-item" key={j}>
                      <div className="phase-item-icon">{item.icon}</div>
                      <div className="phase-item-text" dangerouslySetInnerHTML={{__html: item.text}} />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="mantra-box">
              <div className="mantra-text">
                "Don't try to be the most experienced person in the room. Be the most prepared, most curious, and most dependable. At your level, those three things are indistinguishable from genius."
              </div>
              <div className="mantra-attr">— Advice for TCI Freshers, 2026</div>
            </div>

            <div className="info-block">
              <h4>The ONE Question to Ask in Every Situation</h4>
              <p>"What outcome does this person / team / client actually need, and what is the fastest responsible way I can deliver it?" Not "what am I supposed to do?" — but "what needs to happen?" This single shift in thinking is the difference between a logistics employee and a logistics leader.</p>
            </div>
          </div>

          {/* ════════════ CAREER PATH ════════════ */}
          <div className={`section${activeTab === "career" ? " visible" : ""}`}>
            <div className="section-label">Section 06 — Long-Term Vision</div>
            <h2 className="section-title">The Career Arc TCI Makes Possible</h2>
            <p className="section-intro">
              TCI formally states that an entry-level officer can aspire to Board membership through consistent performance.
              This is not a PR line — the company has a documented culture of internal promotion.
              Here is the realistic trajectory for a high-performer.
            </p>

            <div className="career-ladder">
              {LADDER.map((step, i) => (
                <div className="ladder-step" key={i}>
                  <div className="ladder-year">{step.year}</div>
                  <div className="ladder-line">
                    <div className={`ladder-node${i === 0 ? " start" : ""}`} />
                    {i < LADDER.length - 1 && <div className="ladder-connector" />}
                  </div>
                  <div className="ladder-content">
                    <div className="ladder-role">{step.role}</div>
                    <div className="ladder-detail">
                      {step.detail}{" "}
                      <span className="ladder-highlight">{step.highlight}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="info-block" style={{marginTop: 32}}>
              <h4>The International Opportunity</h4>
              <p>TCI has subsidiaries in Bangladesh, Nepal, and the Middle East — and has just announced a strategic collaboration with Flying Whales (France) for integrated air logistics in India. As TCI's global footprint expands through 2026–2030, logistics officers with strong operational track records and cross-functional exposure will be the pipeline for international postings. Your son's B.Tech background gives him technical credibility in cross-border infrastructure and energy logistics contexts.</p>
            </div>

            <div className="info-block">
              <h4>What TCI Rewards — The Promotion Code</h4>
              <p>Based on TCI's documented culture: <strong style={{color:'#e8e4d9'}}>Performance consistency</strong> (not one great quarter, but sustained results), <strong style={{color:'#e8e4d9'}}>cross-functional versatility</strong> (those who learn multiple divisions advance faster), <strong style={{color:'#e8e4d9'}}>client relationship ownership</strong> (key accounts follow officers they trust), and <strong style={{color:'#e8e4d9'}}>initiative visibility</strong> (proposals, improvements, presentations). The fastest risers at TCI are not the most experienced — they are the most intentional.</p>
            </div>

            <div className="mantra-box">
              <div className="mantra-text">
                "Beta, you have not just taken a job. You have entered one of India's finest institutions of commerce, discipline, and nation-building. Every consignment TCI moves feeds a family, enables a factory, and keeps India running. Carry that weight — and carry it with pride."
              </div>
              <div className="mantra-attr">— From your father, with love and ambition</div>
            </div>

            <div className="alert-box">
              <div className="alert-icon">🌟</div>
              <div className="alert-text">
                <strong>Final message to your son:</strong> The train from Nagpur to Delhi carries you toward an organization that has shaped India's commerce for 67 years. You arrive not as a fresher who needs to prove he belongs — but as an engineer, trained to think in systems, solve under pressure, and build things that last. Walk in with gratitude, curiosity, and the quiet confidence of someone who has prepared. The rest will follow. <strong>TCI doesn't just build careers. It builds leaders. Become one.</strong>
              </div>
            </div>
          </div>

          {/* ─── FOOTER ─── */}
          <div className="report-footer">
            <div className="footer-text">PREPARED FOR ANAND KATHALEWAR · NAGPUR · MAY 2026</div>
            <div className="footer-text">TRANSPORT CORPORATION OF INDIA · NSE: TCI</div>
          </div>

        </div>
      </div>
    </>
  );
}
