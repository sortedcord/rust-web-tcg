/* Rust Web TCG — card component */

const RARITY = {
  common:    { label: 'Common',    gem: '#6b5a44', glow: 'none' },
  uncommon:  { label: 'Uncommon',  gem: '#b89468', glow: 'none' },
  rare:      { label: 'Rare',      gem: '#e8b05a', glow: '0 0 0 1px #8a5a1a inset, 0 0 16px -6px rgba(232,176,90,.4)' },
  mythic:    { label: 'Mythic',    gem: '#ff7a1f', glow: '0 0 0 1px #6a2d05 inset, 0 0 28px -6px rgba(255,122,31,.65)' },
};

// Color identity per lane — all ember-warm, distinguished by hue within the family
const LANE = {
  frontend:  { key:'F', name: 'Frontend',  hex: '#e8a04a', bg: 'linear-gradient(180deg,#1e0f04,#2a1606)', ink:'#f4d9a8' },
  backend:   { key:'B', name: 'Backend',   hex: '#e8602b', bg: 'linear-gradient(180deg,#1f0a03,#2e1205)', ink:'#f4c9a0' },
  fullstack: { key:'S', name: 'Fullstack', hex: '#f2c15a', bg: 'linear-gradient(180deg,#22150a,#2e1e10)', ink:'#f7e2b5' },
  runtime:   { key:'R', name: 'Runtime',   hex: '#c47a28', bg: 'linear-gradient(180deg,#180a02,#241205)', ink:'#e8c28a' },
  data:      { key:'D', name: 'Data',      hex: '#b85a20', bg: 'linear-gradient(180deg,#180803,#241004)', ink:'#e8b088' },
  api:       { key:'A', name: 'API',       hex: '#d89050', bg: 'linear-gradient(180deg,#1c1006,#2a1a0a)', ink:'#f0cd98' },
  view:      { key:'V', name: 'View',      hex: '#a65f22', bg: 'linear-gradient(180deg,#15090a,#1f0e04)', ink:'#d9a170' },
  core:      { key:'C', name: 'Core',      hex: '#d4421a', bg: 'linear-gradient(180deg,#1a0804,#261004)', ink:'#f0b494' },
  tools:     { key:'T', name: 'Tools',     hex: '#f0bd5a', bg: 'linear-gradient(180deg,#1f1408,#2c1c0c)', ink:'#f7dba5' },
};

// resource cost icons (SVG glyphs)
function CostPip({ kind, size=22 }){
  const map = {
    CPU:   { bg:'#f2b866', ink:'#2a1606', glyph:'⚡' },  // generic compute
    ASYNC: { bg:'#e8852b', ink:'#1c0e04', glyph:'◉' },  // runtime
    NET:   { bg:'#d89050', ink:'#1c0a03', glyph:'⇄' },  // networking
    MEM:   { bg:'#b85a20', ink:'#f4d9a8', glyph:'▣' },  // state / memory
    UI:    { bg:'#f4d9a8', ink:'#2a1606', glyph:'◐' },  // view layer
    DB:    { bg:'#8a4a15', ink:'#f4d9a8', glyph:'▤' },  // data
  };
  const c = map[kind] || map.CPU;
  return (
    <span style={{
      width:size, height:size, borderRadius:'50%',
      background: c.bg, color: c.ink,
      display:'inline-flex', alignItems:'center', justifyContent:'center',
      fontFamily:'"JetBrains Mono", monospace', fontSize: size*0.55, fontWeight:700,
      boxShadow: `inset 0 -2px 3px rgba(0,0,0,.2), inset 0 1px 1px rgba(255,255,255,.6), 0 1px 1px rgba(0,0,0,.4)`,
      border: '1px solid rgba(0,0,0,.35)',
      lineHeight: 1,
    }}>{c.glyph}</span>
  );
}

// Art placeholder — abstract procedural "creature" per card (deterministic by seed)
// Per-card logo art — project logos, not repo social cards
const CARD_IMAGES = {
  // Frontend
  'Leptos':          'https://repository-images.githubusercontent.com/519882617/3d86477e-90b1-4be2-a401-ff414013529e',
  'Dioxus':          'https://raw.githubusercontent.com/DioxusLabs/dioxus/main/packages/docs-router/src/doc_examples/dog_app_assets/dioxus_logo.png',
  'Yew':             'https://yew.rs/img/logo.svg',
  'Sycamore':        'https://raw.githubusercontent.com/sycamore-rs/sycamore/master/assets/logo.png',
  // Backend
  'Axum':            'https://raw.githubusercontent.com/tokio-rs/axum/main/axum/src/docs/logo.png',
  'Actix Web':       'https://actix.rs/img/logo.png',
  'Rocket':          'https://rocket.rs/images/logo.svg',
  'Warp':            'https://raw.githubusercontent.com/seanmonstar/warp/master/assets/logo.svg',
  'Poem':            'https://raw.githubusercontent.com/poem-web/poem/master/logo.png',
  // Fullstack
  'Loco':            'https://loco.rs/icon.svg',
  'Perseus':         'https://raw.githubusercontent.com/framesurge/perseus/main/docs/assets/perseus-logo.svg',
  // Runtime
  'Tokio':           'https://tokio.rs/img/tokio-horizontal.svg',
  'async-std':       'https://raw.githubusercontent.com/async-rs/async-std/main/assets/async-std-logo.png',
  'smol':            'https://raw.githubusercontent.com/smol-rs/smol/master/assets/smol.png',
  // Data
  'SQLx':            'https://raw.githubusercontent.com/launchbadge/sqlx/main/assets/logo.png',
  'Diesel':          'https://diesel.rs/assets/images/diesel_logo_stacked_black.png',
  'SeaORM':          'https://www.sea-ql.org/SeaORM/img/SeaQL%20logo%20dual.png',
  // API
  'tonic':           'https://raw.githubusercontent.com/hyperium/tonic/master/.github/assets/tonic.png',
  'async-graphql':   'https://raw.githubusercontent.com/async-graphql/async-graphql/master/logo.svg',
  'utoipa':          'https://raw.githubusercontent.com/juhaku/utoipa/master/docs/utoipa.png',
  // View
  'Askama':          'https://raw.githubusercontent.com/rinja-rs/askama/main/book/src/logo.svg',
  'Maud':            'https://raw.githubusercontent.com/lambda-fairy/maud/main/logo.svg',
  'Tera':            'https://keats.github.io/tera/img/logo.png',
  'reqwest':         'https://avatars.githubusercontent.com/u/62226355',
  // Core
  'serde':           'https://serde.rs/img/serde.svg',
  'hyper':           'https://hyper.rs/hyper-logo.svg',
  'tower':           'https://raw.githubusercontent.com/tower-rs/tower/master/assets/tower.png',
  'tracing':         'https://raw.githubusercontent.com/tokio-rs/tracing/master/assets/logo.svg',
  'anyhow':          'https://avatars.githubusercontent.com/u/1940490',
  'thiserror':       'https://avatars.githubusercontent.com/u/1940490',
  // Tools
  'cargo':           'https://www.rust-lang.org/static/images/cargo.png',
  'wasm-bindgen':    'https://rustwasm.github.io/wasm-bindgen/_static/wasm-ferris.png',
  'trunk':           'https://trunkrs.dev/assets/trunk-logo.svg',
  'clap':            'https://raw.githubusercontent.com/clap-rs/clap/master/assets/clap.png',
};

// Fallback to GitHub opengraph if the logo URL fails
const OG_FALLBACK = {
  'Leptos':'leptos-rs/leptos','Dioxus':'DioxusLabs/dioxus','Yew':'yewstack/yew',
  'Sycamore':'sycamore-rs/sycamore','Axum':'tokio-rs/axum','Actix Web':'actix/actix-web',
  'Rocket':'rwf2/Rocket','Warp':'seanmonstar/warp','Poem':'poem-web/poem',
  'Loco':'loco-rs/loco','Perseus':'framesurge/perseus','Tokio':'tokio-rs/tokio',
  'async-std':'async-rs/async-std','smol':'smol-rs/smol','SQLx':'launchbadge/sqlx',
  'Diesel':'diesel-rs/diesel','SeaORM':'SeaQL/sea-orm','tonic':'hyperium/tonic',
  'async-graphql':'async-graphql/async-graphql','utoipa':'juhaku/utoipa',
  'Askama':'rinja-rs/askama','Maud':'lambda-fairy/maud','Tera':'Keats/tera',
  'reqwest':'seanmonstar/reqwest',
  'serde':'serde-rs/serde','hyper':'hyperium/hyper','tower':'tower-rs/tower',
  'tracing':'tokio-rs/tracing','anyhow':'dtolnay/anyhow','thiserror':'dtolnay/thiserror',
  'cargo':'rust-lang/cargo','wasm-bindgen':'rustwasm/wasm-bindgen','trunk':'trunk-rs/trunk',
  'clap':'clap-rs/clap',
};

function ImageArt({ src, fallback, lane, isRepoCard }){
  const [errored, setErrored] = React.useState(false);
  const url = errored && fallback ? `https://opengraph.githubassets.com/1/${fallback}` : src;
  const isCover = errored || isRepoCard; // repo/social cards → cover-fit
  return (
    <div style={{
      position:'relative', width:'100%', height:'100%',
      background:`radial-gradient(circle at 50% 50%, ${lane.hex}22, #0a0603 80%)`,
      display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden',
    }}>
      <img
        src={url}
        alt=""
        loading="lazy"
        onError={()=> setErrored(true)}
        style={isCover ? {
          width:'100%', height:'100%', objectFit:'cover', display:'block',
          filter:'saturate(1.05) contrast(1.02)',
        } : {
          maxWidth:'72%', maxHeight:'72%', width:'auto', height:'auto',
          objectFit:'contain', display:'block',
          filter:'drop-shadow(0 2px 8px rgba(0,0,0,.6))',
        }}
      />
      <div style={{
        position:'absolute', inset:0,
        background: `radial-gradient(140% 90% at 50% 50%, transparent 55%, rgba(10,6,3,.45) 100%)`,
        pointerEvents:'none',
      }}/>
    </div>
  );
}

function CardArt({ seed, lane, card }){
  if (card && CARD_IMAGES[card.name]){
    return <ImageArt
      src={CARD_IMAGES[card.name]}
      fallback={OG_FALLBACK[card.name]}
      lane={lane}
      isRepoCard={card.name === 'Leptos'}
    />;
  }
  // deterministic rand
  let s = 0; for (const ch of seed) s = (s*31 + ch.charCodeAt(0)) >>> 0;
  const rand = () => { s = (s*1664525 + 1013904223) >>> 0; return (s & 0xffffff) / 0xffffff; };
  const shapes = [];
  const palette = [lane.hex, '#f2b866', '#0a0603', lane.ink, '#e8852b'];
  const N = 14 + Math.floor(rand()*10);
  for (let i=0;i<N;i++){
    const cx = 20 + rand()*260;
    const cy = 20 + rand()*140;
    const r  = 6 + rand()*26;
    const kind = Math.floor(rand()*4);
    const col = palette[Math.floor(rand()*palette.length)];
    const op  = 0.35 + rand()*0.55;
    if (kind===0) shapes.push(<circle key={i} cx={cx} cy={cy} r={r} fill={col} opacity={op} />);
    else if (kind===1) shapes.push(<rect key={i} x={cx-r} y={cy-r} width={r*2} height={r*2} fill={col} opacity={op} transform={`rotate(${rand()*45} ${cx} ${cy})`} />);
    else if (kind===2) shapes.push(<polygon key={i} points={`${cx},${cy-r} ${cx+r},${cy+r} ${cx-r},${cy+r}`} fill={col} opacity={op} />);
    else shapes.push(<line key={i} x1={cx-r} y1={cy} x2={cx+r} y2={cy} stroke={col} strokeWidth={2+rand()*3} opacity={op} />);
  }
  return (
    <svg viewBox="0 0 300 180" preserveAspectRatio="none" style={{display:'block', width:'100%', height:'100%'}}>
      <defs>
        <linearGradient id={`bg-${seed}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={lane.hex} stopOpacity="0.35"/>
          <stop offset="1" stopColor="#0b0906" stopOpacity="0.9"/>
        </linearGradient>
        <pattern id={`grid-${seed}`} width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M 14 0 L 0 0 0 14" fill="none" stroke={lane.ink} strokeOpacity="0.07" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="300" height="180" fill="#0a0603" />
      <rect width="300" height="180" fill={`url(#bg-${seed})`} />
      <rect width="300" height="180" fill={`url(#grid-${seed})`} />
      {shapes}
      {/* corner sigil */}
      <g opacity="0.9" transform="translate(252, 150)">
        <circle r="14" fill="none" stroke={lane.ink} strokeOpacity=".6" strokeWidth="1"/>
        <text textAnchor="middle" dominantBaseline="central" fontFamily="JetBrains Mono, monospace" fontSize="12" fontWeight="700" fill={lane.ink}>{lane.key}</text>
      </g>
    </svg>
  );
}

function Card({ card, onClick }){
  const lane = LANE[card.lane];
  const rar  = RARITY[card.rarity];
  const [tilt, setTilt] = React.useState({x:0,y:0,on:false});

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top)  / r.height;
    setTilt({ x: (py-0.5)*-8, y: (px-0.5)*10, on:true, px, py });
  };
  const onLeave = () => setTilt({x:0,y:0,on:false,px:0.5,py:0.5});

  const holo = card.rarity==='mythic' || card.rarity==='rare';

  return (
    <div
      className="tcg-card"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={() => onClick && onClick(card)}
      style={{
        perspective: '1200px',
        width: 280, height: 400,
        cursor:'pointer',
        transformStyle:'preserve-3d',
      }}>
      <div style={{
        width:'100%', height:'100%',
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
        transition: tilt.on ? 'transform 60ms linear' : 'transform 220ms cubic-bezier(.2,.7,.2,1)',
        borderRadius: 'var(--card-radius)',
        background: lane.bg,
        padding: 10,
        position:'relative',
        boxShadow: `
          0 1px 0 rgba(255,180,100,.1) inset,
          0 -2px 0 rgba(0,0,0,.5) inset,
          0 14px 32px -12px rgba(0,0,0,.85),
          ${rar.glow}
        `,
        border:'1px solid #000',
      }}>

        {/* inner frame */}
        <div style={{
          position:'relative',
          height:'100%',
          borderRadius:'calc(var(--card-radius) - 6px)',
          border: `1px solid ${lane.ink}22`,
          background: `linear-gradient(180deg, rgba(255,255,255,.04), rgba(0,0,0,.2))`,
          display:'flex', flexDirection:'column', overflow:'hidden',
        }}>
          {/* TITLE BAR */}
          <div style={{
            display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'6px 8px',
            background: `linear-gradient(180deg, ${lane.hex}55, ${lane.hex}15)`,
            borderBottom: `1px solid ${lane.hex}55`,
          }}>
            <div style={{
              fontFamily:'"VT323", "JetBrains Mono", monospace',
              fontWeight:400, fontSize:22, letterSpacing:'0.02em',
              color: lane.ink,
              textShadow:`0 0 8px ${lane.hex}66, 0 1px 0 rgba(0,0,0,.6)`,
              whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
              lineHeight: 1,
            }}>{card.name}</div>
            <div style={{ display:'flex', gap:3 }}>
              {card.cost.map((c, i) => <CostPip key={i} kind={c} size={18} />)}
            </div>
          </div>

          {/* ART */}
          <div style={{
            height:150, position:'relative',
            borderBottom:`1px solid ${lane.ink}22`,
            overflow:'hidden', background:'#0b0906',
          }}>
            <CardArt seed={card.name} lane={lane} card={card} />
            {/* holo sheen */}
            {holo && (
              <div style={{
                position:'absolute', inset:0,
                background: `radial-gradient(240px 120px at ${(tilt.px||0.5)*100}% ${(tilt.py||0.5)*100}%, rgba(255,255,255,.18), transparent 60%)`,
                mixBlendMode:'screen', pointerEvents:'none',
              }}/>
            )}
          </div>

          {/* TYPE LINE */}
          <div style={{
            display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'5px 8px',
            background: `linear-gradient(180deg, ${lane.hex}33, ${lane.hex}0d)`,
            borderBottom:`1px solid ${lane.hex}44`,
            fontFamily:'"JetBrains Mono", monospace',
            fontSize: 10, letterSpacing:'0.08em',
            color: lane.ink, textTransform:'uppercase', fontWeight:600,
          }}>
            <span>{card.type}</span>
            <span style={{
              display:'inline-block', width:10, height:10, borderRadius:2,
              background: rar.gem,
              boxShadow:'inset 0 0 0 1px rgba(0,0,0,.5), inset 0 1px 1px rgba(255,255,255,.4)',
              transform:'rotate(45deg)',
            }}/>
          </div>

          {/* TEXT BOX */}
          <div style={{
            flex:1,
            padding:'8px 10px',
            background: 'linear-gradient(180deg, #1a0f07, #0f0804)',
            color:'#e8c896',
            fontFamily:'"JetBrains Mono", monospace',
            fontSize: 10.5, lineHeight: 1.45,
            display:'flex', flexDirection:'column', gap:6,
            overflow:'hidden',
            borderTop: `1px solid ${lane.hex}22`,
          }}>
            {card.abilities.map((a, i) => (
              <div key={i} style={{ display:'flex', gap:6 }}>
                <span style={{
                  fontFamily:'"JetBrains Mono", monospace',
                  fontSize: 9, letterSpacing:'0.1em', fontWeight:700,
                  color: lane.hex, textTransform:'uppercase',
                  flexShrink:0, paddingTop:1,
                }}>{a.label}</span>
                <span style={{ flex:1 }}>{a.text}</span>
              </div>
            ))}
            {card.flavor && (
              <div style={{
                marginTop:'auto', paddingTop:6,
                borderTop: `1px dashed ${lane.hex}44`,
                color:'#a07448', fontSize:10, lineHeight:1.4,
              }}>
                <span style={{color: lane.hex, opacity:.7}}>&gt;</span> {card.flavor}
                {card.flavorBy && <div style={{textAlign:'right', fontSize:9, color:'#7a5a2c', marginTop:2, opacity:.75}}>— {card.flavorBy}</div>}
              </div>
            )}
          </div>

          {/* STAT BAR */}
          <div style={{
            display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'4px 8px',
            background: '#050301',
            borderTop:`1px solid ${lane.hex}44`,
            fontFamily:'"JetBrains Mono", monospace',
            fontSize:9.5, letterSpacing:'0.1em', fontWeight:500,
            color: '#8a6a42',
          }}>
            <span style={{display:'inline-flex', alignItems:'center', gap:5}}>
              <svg width="11" height="7" viewBox="0 0 100 64" style={{flexShrink:0, opacity:.75}}>
                <ellipse cx="50" cy="36" rx="32" ry="18" fill={lane.hex} stroke="#2a1606" strokeWidth="3"/>
                <rect x="4" y="28" width="14" height="10" fill={lane.hex} stroke="#2a1606" strokeWidth="3"/>
                <rect x="82" y="28" width="14" height="10" fill={lane.hex} stroke="#2a1606" strokeWidth="3"/>
                <circle cx="42" cy="28" r="3" fill="#fff"/>
                <circle cx="58" cy="28" r="3" fill="#fff"/>
                <circle cx="42" cy="28" r="1.2" fill="#2a1606"/>
                <circle cx="58" cy="28" r="1.2" fill="#2a1606"/>
              </svg>
              rust-web.com · {String(card.no).padStart(3,'0')}/024 · {rar.label.toUpperCase()}
            </span>
            <span style={{
              background: `linear-gradient(180deg, ${lane.hex}, ${lane.hex}99)`,
              color:'#0a0603',
              fontWeight:700, padding:'2px 8px', borderRadius:2,
              fontSize: 11, letterSpacing:'0.02em',
              boxShadow:`inset 0 -1px 1px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,220,180,.4), 0 0 10px ${lane.hex}55`,
              fontFamily:'"VT323", monospace',
            }}>{card.power}/{card.toughness}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

Object.assign(window, { Card, LANE, RARITY, CostPip });
