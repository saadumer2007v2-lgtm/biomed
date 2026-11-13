/* ================= APP ================= */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}},del(k){try{localStorage.removeItem(k);}catch(e){}}};
const shuffle=a=>{a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a;};

/* ---------- chapters, navigation, routing ---------- */
const CH=window.CHAPTERS||{};
const NAV=[['',[['start','Home']]],
 ['Year 1 systems',[['found','Cells, genes & drugs'],['msk','Musculoskeletal'],['blood','Blood & healing'],['immune','Immunity'],['infect','Infection & drugs'],['neuro','Nervous system'],['endo','Endocrine & reproduction'],['resp','Respiratory'],['cardio','Cardiovascular'],['renal','Renal'],['gi','Gastrointestinal']]],
 ['Revise',[['spec','Unofficial spec'],['test','Self-test'],['exam','Exam papers'],['sources','Sources & slide checks']]]];
const NAMES={}; NAV.forEach(g=>g[1].forEach(([k,n])=>{NAMES[k]=n;}));
const PANELS=$$('.panel').map(p=>p.dataset.panel);
const SYSTEMS=NAV[1][1].map(x=>x[0]).filter(k=>PANELS.includes(k));
let io=null, current=null;
function buildNav(){
  const nav=$('#chapter-nav'); if(!nav) return;
  let n=0;
  nav.innerHTML=NAV.map(([g,items])=>`${g?`<span class="eyebrow">${esc(g)}</span>`:''}<ul>${items.filter(([k])=>PANELS.includes(k)).map(([k,name])=>`<li><button type="button" class="nav-ch" data-tab="${k}">${g==='Year 1 systems'?`<span class="num">${++n}</span>`:''}<span>${esc(name)}</span></button></li>`).join('')}</ul>`).join('');
}
function buildRail(tab){
  const panel=$('#panel-'+tab), secs=$$('.sec',panel).filter(s=>s.id);
  const ol=$('#rail-list'), sel=$('#toc-select');
  ol.innerHTML=''; sel.innerHTML='';
  secs.forEach(s=>{const h=$('h2',s), t=h?h.textContent:s.id;
    const li=document.createElement('li'); li.innerHTML=`<a href="#${s.id}" data-id="${s.id}">${esc(t)}</a>`; ol.appendChild(li);
    const o=document.createElement('option'); o.value=s.id; o.textContent=t; sel.appendChild(o);});
  const host=$(`.nav-ch[data-tab="${tab}"]`); if(host) host.parentNode.appendChild(ol);
  ol.hidden=secs.length<2; const mt=$('.mobile-toc'); if(mt) mt.hidden=secs.length<2;
  if(io) io.disconnect();
  if('IntersectionObserver' in window){
    io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){$$('#rail-list a').forEach(a=>a.classList.toggle('on',a.dataset.id===e.target.id)); if(sel.value!==e.target.id) sel.value=e.target.id;}});},{rootMargin:'-15% 0px -70% 0px'});
    secs.forEach(s=>io.observe(s));
  }
}
function closeDrawer(){document.body.classList.remove('nav-open'); const b=$('#menu-btn'); if(b) b.setAttribute('aria-expanded','false');}
function setHash(h){try{history.replaceState(null,'','#'+h);}catch(e){}}
function showTab(tab,anchor){
  if(!PANELS.includes(tab)) tab='start';
  if(current!==tab){
    $$('[data-tab]').forEach(b=>{const on=b.dataset.tab===tab; if(b.getAttribute('role')==='tab') b.setAttribute('aria-selected',String(on)); b.classList.toggle('on',on); if(on) b.setAttribute('aria-current','page'); else b.removeAttribute('aria-current');});
    $$('.panel').forEach(p=>{p.hidden=(p.dataset.panel!==tab);});
    document.body.classList.toggle('wide',tab==='exam');
    buildRail(tab); current=tab; LS.set('bio-tab',tab);
    document.dispatchEvent(new CustomEvent('tab-shown',{detail:tab}));
  }
  closeDrawer();
  if(anchor){const el=document.getElementById(anchor); if(el) requestAnimationFrame(()=>el.scrollIntoView());}
  else window.scrollTo(0,0);
  setHash(anchor||tab);
}
function route(h){
  h=(h||'').replace(/^#/,'');
  if(!h){showTab(LS.get('bio-tab','start')); return;}
  if(PANELS.includes(h)){showTab(h); return;}
  const el=document.getElementById(h), p=el&&el.closest('.panel');
  if(p){showTab(p.dataset.panel,h); return;}
  showTab('start');
}
function goTo(el){
  const p=el.closest('.panel'); if(!p) return;
  showTab(p.dataset.panel,(el.closest('.sec')||{}).id);
  const d=el.closest('details'); if(d) d.open=true;
  requestAnimationFrame(()=>{el.scrollIntoView({block:'start'}); el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');});
}
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-tab]'); if(t){e.preventDefault(); showTab(t.dataset.tab); return;}
  const a=e.target.closest('a[href^="#"]'); if(!a) return;
  const h=a.getAttribute('href').slice(1); if(!h) return;
  e.preventDefault(); route(h);
});
(function(){const mb=$('#menu-btn'), bd=$('#rail-backdrop');
  if(mb) mb.addEventListener('click',()=>{const on=!document.body.classList.contains('nav-open'); document.body.classList.toggle('nav-open',on); mb.setAttribute('aria-expanded',String(on));});
  if(bd) bd.addEventListener('click',closeDrawer);
  document.addEventListener('keydown',e=>{if(e.key==='Escape') closeDrawer();});
})();
$('#toc-select').addEventListener('change',e=>{const el=document.getElementById(e.target.value); if(el){el.scrollIntoView(); setHash(e.target.value);}});

/* ---------- pathways: learn / hide / order / quick tap ---------- */
const PWC={bone:'var(--pw-bone)',musc:'var(--pw-musc)',blood:'var(--pw-blood)',imm:'var(--pw-imm)',micro:'var(--pw-micro)',drug:'var(--pw-drug)',gen:'var(--pw-gen)'};
const PWK={bone:'Bone',musc:'Muscle',blood:'Blood',imm:'Immune',micro:'Microbiology',drug:'Pharmacology',gen:'Physiology'};
const MODES=[['learn','Learn'],['hide','Hide'],['order','Order'],['tap','Quick tap']];
let drillDone=LS.get('bio-drill',{});
function markDrill(id,perfect){
  const prev=drillDone[id];
  if(perfect) drillDone[id]=true; else if(!prev) drillDone[id]='done';
  LS.set('bio-drill',drillDone); document.dispatchEvent(new CustomEvent('drill-update'));
}
function stepLi(s,i,extra){return `<li data-i="${i}"${extra||''}><b>${esc(s[0])}</b>${s[1]?`<span class="d">${esc(s[1])}</span>`:''}</li>`;}
function mountPathway(host,id,opts){
  const P=PATHWAYS[id]; if(!P){console.warn('Missing pathway',id); return;}
  opts=opts||{};
  const n=P.steps.length;
  host.innerHTML=`<div class="pw" style="--pwc:${PWC[P.k]||PWC.gen}" data-pw="${id}"${opts.anchor?` id="pw-${id}"`:''}>
    <div class="pw-head"><h4><span class="k">${esc(PWK[P.k]||'Pathway')} · ${n} steps</span>${esc(P.t)}</h4>${P.mn?`<span class="mn">${esc(P.mn)}</span>`:''}
    <div class="seg" role="group" aria-label="Mode for ${esc(P.t)}">${MODES.map(([m,l])=>`<button type="button" data-m="${m}">${l}</button>`).join('')}</div></div>
    <div class="pw-body"></div><div class="pw-status" aria-live="polite"></div>${P.foot?`<p class="pw-foot">${esc(P.foot)}</p>`:''}</div>`;
  const card=$('.pw',host), body=$('.pw-body',card), status=$('.pw-status',card);
  function setMode(m){
    card.classList.toggle('hide',m==='hide');
    $$('.seg button',card).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.m===m)));
    status.onclick=null;
    if(m==='learn'){
      body.innerHTML=`${P.an?`<div class="pw-an"><span class="tag">Think of it as</span><p>${esc(P.an)}</p></div>`:''}<ol class="pw-steps">${P.steps.map((s,i)=>stepLi(s,i)).join('')}</ol>`;
      status.innerHTML=''; status.hidden=true;
    } else if(m==='hide'){
      body.innerHTML=`<ol class="pw-steps">${P.steps.map((s,i)=>stepLi(s,i,' tabindex="0" role="button" aria-label="Reveal step '+(i+1)+'"')).join('')}</ol>`;
      status.hidden=false;
      const lis=$$('li',body);
      const upd=()=>{const r=lis.filter(l=>l.classList.contains('rev')).length;
        status.innerHTML=`<span>Say each step aloud, then tap to check. ${r} of ${n} revealed.</span><span><button class="linkbtn" data-a="all" type="button">Reveal all</button> · <button class="linkbtn" data-a="none" type="button">Hide all</button></span>`;};
      lis.forEach(li=>{const t=()=>{li.classList.toggle('rev'); upd();}; li.addEventListener('click',t); li.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault(); t();}});});
      status.onclick=e=>{const a=e.target.closest('[data-a]'); if(!a) return; lis.forEach(l=>l.classList.toggle('rev',a.dataset.a==='all')); upd();};
      upd();
    } else if(m==='order'){ orderMode(P,id,body,status); }
    else { tapMode(P,id,body,status,()=>setMode('tap')); }
  }
  $$('.seg button',card).forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.m)));
  setMode(opts.mode||'learn');
}

/* Order mode: drag and drop (mouse, touch via the grip, keyboard), tap two cards to swap, check with direction hints */
let dragListenersOn=false, DRAG=null;
function orderMode(P,id,body,status){
  const n=P.steps.length;
  const hasDet=P.steps.filter(s=>s[1]).length>=Math.ceil(n/2);
  let face=hasDet?LS.get('bio-face','title'):'title';
  let checks=0, helped=false, solved=false, selected=null;
  let order=shuffle([...Array(n).keys()]);
  while(n>1&&order.every((v,i)=>v===i)) order=shuffle(order);
  body.innerHTML=`<div class="dd-tools">${hasDet?`<div class="seg seg-sm" role="group" aria-label="Card text"><button type="button" data-face="title">Step names</button><button type="button" data-face="detail">Details only (harder)</button></div>`:''}
    <span class="dd-help">Drag the cards into order (on a phone, drag by the ⠿ grip), tap two cards to swap them, or use the arrows. Keyboard: Space to pick up, ↑ ↓ to move.</span></div>
    <ol class="dd-list"></ol>
    <div class="dd-actions"><button type="button" class="btn" data-a="check">Check order</button><button type="button" class="btn ghost" data-a="hint">Hint</button><button type="button" class="btn ghost" data-a="show">Show answer</button><button type="button" class="btn ghost" data-a="shuffle">Shuffle again</button></div>`;
  const list=$('.dd-list',body);
  const items=()=>$$('.dd-item',list);
  const label=i=>{const s=P.steps[i]; return face==='detail'&&s[1]?s[1]:s[0];};
  list.innerHTML=order.map(i=>`<li class="dd-item" data-i="${i}" tabindex="0"><span class="dd-grip" aria-hidden="true">⠿</span><span class="dd-pos"></span><span class="dd-txt">${esc(label(i))}</span><span class="dd-dir" aria-hidden="true"></span><span class="dd-mv"><button type="button" class="dd-up" aria-label="Move up">↑</button><button type="button" class="dd-dn" aria-label="Move down">↓</button></span></li>`).join('');
  status.hidden=false;
  const say=t=>{status.innerHTML=`<span>${t}</span>`;};
  function renumber(){items().forEach((li,p)=>{$('.dd-pos',li).textContent=p+1; li.setAttribute('aria-label',`Position ${p+1} of ${n}: ${label(+li.dataset.i)}`);});}
  function clearMarks(){items().forEach(li=>{li.classList.remove('ok','no','hinted'); $('.dd-dir',li).textContent='';});}
  function changed(){renumber(); clearMarks(); if(!solved) say(`Arrange all ${n} steps, then press Check order.`);}
  function setFace(f){face=f; LS.set('bio-face',f); $$('[data-face]',body).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.face===f))); items().forEach(li=>{$('.dd-txt',li).textContent=label(+li.dataset.i);}); renumber();}
  function select(li){ if(selected) selected.classList.remove('sel'); selected=li; if(li) li.classList.add('sel'); }
  function swap(a,b){const ph=document.createElement('li'); list.replaceChild(ph,a); list.replaceChild(a,b); list.replaceChild(b,ph);}
  function move(li,dir){
    if(dir<0&&li.previousElementSibling) list.insertBefore(li,li.previousElementSibling);
    else if(dir>0&&li.nextElementSibling) list.insertBefore(li.nextElementSibling,li);
    changed(); say(`Moved to position ${items().indexOf(li)+1} of ${n}.`);
  }
  function solve(perfect,shown){
    solved=true; select(null); list.classList.add('solved');
    items().forEach(li=>{const s=P.steps[+li.dataset.i]; li.classList.add('ok'); li.classList.remove('no');
      const extra=face==='detail'?s[0]:s[1]; if(extra&&!$('.dd-more',li)) $('.dd-txt',li).insertAdjacentHTML('beforeend',`<span class="dd-more">${esc(extra)}</span>`);});
    if(shown) say('Here is the correct order. Read it through, then Shuffle again and rebuild it from memory.');
    else { markDrill(id,perfect); status.innerHTML=`<span class="${perfect?'ok':''}">${perfect?'Perfect: correct on the first check with no hints.':`Solved after ${checks} check${checks===1?'':'s'}${helped?' with help':''}. Shuffle again for a clean run.`}</span>`; }
  }
  function check(){
    if(solved) return; select(null); checks++;
    let ok=0; items().forEach((li,p)=>{const i=+li.dataset.i, good=i===p; li.classList.toggle('ok',good); li.classList.toggle('no',!good); $('.dd-dir',li).textContent=good?'✓':(i<p?'↑ earlier':'↓ later'); if(good) ok++;});
    if(ok===n) solve(checks===1&&!helped);
    else say(`${ok} of ${n} in the right place. Arrows show which way each red card needs to move.`);
  }
  function hint(){
    if(solved) return; helped=true; select(null);
    const its=items(), p=its.findIndex((li,k)=>+li.dataset.i!==k); if(p<0){check(); return;}
    const target=its.find(li=>+li.dataset.i===p); list.insertBefore(target,its[p]);
    changed(); target.classList.add('hinted'); say(`Step ${p+1} has been placed for you.`);
  }
  $$('[data-face]',body).forEach(b=>b.addEventListener('click',()=>setFace(b.dataset.face)));
  $('.dd-actions',body).addEventListener('click',e=>{const a=e.target.closest('[data-a]'); if(!a) return;
    if(a.dataset.a==='check') check(); else if(a.dataset.a==='hint') hint();
    else if(a.dataset.a==='show'){helped=true; items().sort((x,y)=>x.dataset.i-y.dataset.i).forEach(li=>list.appendChild(li)); renumber(); solve(false,true);}
    else orderMode(P,id,body,status);});
  list.addEventListener('click',e=>{
    if(solved||list.dataset.justDragged) return;
    const li=e.target.closest('.dd-item'); if(!li) return;
    if(e.target.closest('.dd-up')){move(li,-1); e.target.closest('button').focus(); return;}
    if(e.target.closest('.dd-dn')){move(li,1); e.target.closest('button').focus(); return;}
    if(!selected){select(li); say('Card picked: tap another card to swap them.');}
    else if(selected===li){select(null); say('Swap cancelled.');}
    else {const a=selected; select(null); swap(a,li); changed();}
  });
  list.addEventListener('keydown',e=>{
    const li=e.target.closest('.dd-item'); if(!li||e.target!==li||solved) return;
    if(e.key===' '||e.key==='Enter'){e.preventDefault(); const on=!li.classList.contains('grab'); items().forEach(x=>x.classList.remove('grab')); li.classList.toggle('grab',on); say(on?'Picked up: use ↑ and ↓ to move, Space to drop.':'Dropped.');}
    else if(e.key==='ArrowUp'||e.key==='ArrowDown'){e.preventDefault(); const d=e.key==='ArrowUp'?-1:1;
      if(li.classList.contains('grab')||e.altKey){move(li,d); li.focus();}
      else {const t=d<0?li.previousElementSibling:li.nextElementSibling; if(t) t.focus();}}
    else if(e.key==='Escape'){li.classList.remove('grab');}
  });
  list.addEventListener('pointerdown',e=>{
    const li=e.target.closest('.dd-item'); if(!li||solved||e.button!==0||e.target.closest('button')) return;
    const grip=!!e.target.closest('.dd-grip');
    if(e.pointerType!=='mouse'&&!grip) return;
    if(grip) e.preventDefault();
    DRAG={li,list,sy:e.clientY+window.scrollY,y:e.clientY,active:false,raf:0,done:changed};
  });
  if(!dragListenersOn){ dragListenersOn=true;
    const place=()=>{const d=DRAG, li=d.li, L=d.list;
      li.style.transform=`translateY(${d.y+window.scrollY-d.sy}px)`;
      const r=li.getBoundingClientRect(), mid=r.top+r.height/2;
      let nx=li.nextElementSibling;
      while(nx&&mid>nx.getBoundingClientRect().top+nx.offsetHeight/2){const b=li.offsetTop; L.insertBefore(nx,li); d.sy+=li.offsetTop-b; li.style.transform=`translateY(${d.y+window.scrollY-d.sy}px)`; nx=li.nextElementSibling;}
      let pv=li.previousElementSibling;
      while(pv&&mid<pv.getBoundingClientRect().top+pv.offsetHeight/2){const b=li.offsetTop; L.insertBefore(li,pv); d.sy+=li.offsetTop-b; li.style.transform=`translateY(${d.y+window.scrollY-d.sy}px)`; pv=li.previousElementSibling;}
    };
    const auto=()=>{if(!DRAG||!DRAG.active) return; const y=DRAG.y; let v=0;
      if(y<130) v=-Math.min(18,(130-y)/4); else if(y>innerHeight-70) v=Math.min(18,(y-(innerHeight-70))/4);
      if(v){window.scrollBy(0,v); place();} DRAG.raf=requestAnimationFrame(auto);};
    window.addEventListener('pointermove',e=>{ if(!DRAG) return; DRAG.y=e.clientY;
      if(!DRAG.active){ if(Math.abs(e.clientY+window.scrollY-DRAG.sy)<5) return; DRAG.active=true; DRAG.li.classList.add('dragging'); DRAG.list.classList.add('is-dragging'); $$('.sel',DRAG.list).forEach(x=>x.classList.remove('sel')); DRAG.raf=requestAnimationFrame(auto); }
      e.preventDefault(); place();},{passive:false});
    const end=()=>{ if(!DRAG) return; const d=DRAG; DRAG=null; cancelAnimationFrame(d.raf);
      if(d.active){ d.li.classList.remove('dragging'); d.li.style.transform=''; d.list.classList.remove('is-dragging'); d.list.dataset.justDragged='1'; setTimeout(()=>{delete d.list.dataset.justDragged;},60); d.done(); } };
    window.addEventListener('pointerup',end); window.addEventListener('pointercancel',end);
    window.addEventListener('touchmove',e=>{if(DRAG&&DRAG.active) e.preventDefault();},{passive:false});
  }
  if(hasDet) setFace(face); else renumber();
  say(`Arrange all ${n} steps, then press Check order.`);
}

/* Quick tap: tap the steps in sequence */
function tapMode(P,id,body,status,restart){
  const n=P.steps.length; let next=0, mistakes=0;
  const order=shuffle(P.steps.map((s,i)=>i));
  body.innerHTML=`<ol class="pw-steps placed"></ol><div class="pw-pool">${order.map(i=>`<button type="button" class="pw-chip" data-i="${i}">${esc(P.steps[i][0])}</button>`).join('')}</div>`;
  status.hidden=false;
  const placed=$('.placed',body), pool=$('.pw-pool',body);
  const upd=()=>{
    if(next<n){status.innerHTML=`<span>Tap the next step. Placed ${next} of ${n} · mistakes ${mistakes}</span><button class="linkbtn" data-a="restart" type="button">Restart</button>`; return;}
    const perfect=mistakes===0; markDrill(id,perfect);
    status.innerHTML=`<span class="${perfect?'ok':''}">${perfect?'Perfect: every step in order first time.':`Complete with ${mistakes} mistake${mistakes===1?'':'s'}. Try again tomorrow for a clean run.`}</span><button class="linkbtn" data-a="restart" type="button">Shuffle again</button>`;
  };
  pool.addEventListener('click',e=>{
    const c=e.target.closest('.pw-chip'); if(!c) return; const i=+c.dataset.i;
    if(i===next){ placed.insertAdjacentHTML('beforeend',stepLi(P.steps[i],i)); c.remove(); next++; }
    else { mistakes++; c.classList.remove('bad'); void c.offsetWidth; c.classList.add('bad'); }
    upd();
  });
  status.onclick=e=>{if(e.target.closest('[data-a="restart"]')) restart();};
  upd();
}
function renderPathways(){ $$('.pw-slot[data-pw]').forEach(h=>mountPathway(h,h.dataset.pw,{anchor:true})); }

/* ---------- diagrams: hide and reveal labels ---------- */
function setupDiagrams(){
  $$('figure.dg').forEach(fig=>{
    const svg=$('svg',fig); if(!svg||!$('text.lab',svg)) return;
    const head=$('.dg-head',fig);
    let tools=$('.dg-tools',head); if(!tools){tools=document.createElement('div'); tools.className='dg-tools'; head.appendChild(tools);}
    tools.insertAdjacentHTML('beforeend',`<span class="hint" hidden>Tap a box to reveal</span><button class="linkbtn dg-all" type="button" hidden>Reveal all</button><button class="pbtn dg-q" type="button" aria-pressed="false">Hide labels</button>`);
    const btn=$('.dg-q',tools), all=$('.dg-all',tools), hint=$('.hint',tools);
    let built=false;
    function build(){
      if(built) return; built=true;
      $$('text.lab',svg).forEach(t=>{
        let b; try{b=t.getBBox();}catch(e){return;}
        if(!b||!b.width) return;
        const r=document.createElementNS('http://www.w3.org/2000/svg','rect');
        r.setAttribute('x',b.x-3); r.setAttribute('y',b.y-2); r.setAttribute('width',b.width+6); r.setAttribute('height',b.height+4); r.setAttribute('rx',4);
        r.setAttribute('class','lab-box'+['slide','sL','sR'].filter(c=>t.classList.contains(c)).map(c=>' '+c).join(''));
        if(t.getAttribute('transform')) r.setAttribute('transform',t.getAttribute('transform'));
        t.parentNode.insertBefore(r,t);
        const toggle=()=>{ if(!fig.classList.contains('quiz')) return; const on=!t.classList.contains('rev'); t.classList.toggle('rev',on); r.classList.toggle('rev',on); };
        r.addEventListener('click',toggle); t.addEventListener('click',toggle);
      });
    }
    btn.addEventListener('click',()=>{
      build();
      const on=!fig.classList.contains('quiz');
      fig.classList.toggle('quiz',on); btn.setAttribute('aria-pressed',String(on)); btn.textContent=on?'Show labels':'Hide labels';
      hint.hidden=!on; all.hidden=!on;
      $$('.rev',svg).forEach(x=>x.classList.remove('rev'));
    });
    all.addEventListener('click',()=>{$$('text.lab, .lab-box',svg).forEach(x=>x.classList.add('rev'));});
  });
  const sb=$('#sarc-btn'), ss=$('#sarc-svg');
  if(sb&&ss) sb.addEventListener('click',()=>{const on=!ss.classList.contains('contract'); ss.classList.toggle('contract',on); sb.textContent=on?'Relax':'Contract'; sb.setAttribute('aria-pressed',String(on));});
}

/* ---------- branching tree (haematopoiesis) ---------- */
const KIND={artery:['var(--artery)','var(--artery-tint)'],vein:['var(--vein)','var(--vein-tint)'],nerve:['var(--nerve)','var(--nerve-tint)'],lymph:['var(--lymph)','var(--lymph-tint)']};
const mctx=document.createElement('canvas').getContext('2d');
const tw=(t,f)=>{mctx.font=f; return mctx.measureText(t).width;};
function renderTree(host){
  const def=TREES[host.dataset.tree]; if(!def) return;
  const F1='700 13px "Atkinson Hyperlegible", system-ui, sans-serif', F2='500 10.5px "IBM Plex Mono", ui-monospace, monospace';
  const nodes=[];
  (function prep(n,d,p){n._d=d; n._p=p; n._w=Math.ceil(Math.max(tw(n.t,F1),n.s?tw(n.s,F2):0))+26; n._h=n.s?38:28; nodes.push(n); (n.c||[]).forEach(c=>prep(c,d+1,n));})(def.root,0,null);
  const colW=[]; nodes.forEach(n=>{colW[n._d]=Math.max(colW[n._d]||0,n._w);});
  const GX=30, SLOT=44, colX=[0];
  for(let i=1;i<colW.length;i++) colX[i]=colX[i-1]+colW[i-1]+GX;
  const W=colX[colW.length-1]+colW[colW.length-1]+6;
  let y=6; (function lay(n){ if(!n.c||!n.c.length){n._y=y+SLOT/2; y+=SLOT;} else {n.c.forEach(lay); n._y=(n.c[0]._y+n.c[n.c.length-1]._y)/2;} })(def.root);
  const H=y+6;
  nodes.forEach(n=>{n._x=colX[n._d]+3;});
  let links='', boxes='';
  nodes.forEach((n,i)=>{
    const [stroke,fill]=KIND[n.k||def.kind]||KIND.vein;
    if(n._p){const p=n._p; const x1=p._x+p._w, x2=n._x, mx=(x1+x2)/2;
      links+=`<path class="tlink" stroke="${stroke}" d="M${x1},${p._y} C${mx},${p._y} ${mx},${n._y} ${x2},${n._y}"/>`;}
    const ty=n.s?n._y-3.5:n._y+4.5;
    boxes+=`<g class="tnode" data-i="${i}" tabindex="0" role="button" aria-label="${esc(n.t)}"><rect x="${n._x}" y="${n._y-n._h/2}" width="${n._w}" height="${n._h}" rx="8" fill="${fill}" stroke="${stroke}"/><text x="${n._x+13}" y="${ty}">${esc(n.t)}</text>${n.s?`<text class="s" x="${n._x+13}" y="${n._y+12}">${esc(n.s)}</text>`:''}</g>`;
  });
  const prev=host.dataset.sel;
  host.innerHTML=`<div class="tree-box"><div class="scroll-x"><svg class="tree-svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="group" aria-label="${esc(def.label||'Haematopoiesis flowchart')}">${links}${boxes}</svg></div><div class="tdetail" aria-live="polite">${esc(def.hint||'Tap any cell for details. Red: myeloid line. Green: lymphoid line.')}</div></div>`;
  const det=$('.tdetail',host);
  const select=g=>{$$('.tnode',host).forEach(x=>x.classList.toggle('on',x===g)); const n=nodes[+g.dataset.i]; host.dataset.sel=g.dataset.i;
    det.innerHTML=`<b>${esc(n.t)}</b>${n.s?` <span class="rt">${esc(n.s)}</span>`:''}<br>${esc(n.d||'')}`;};
  $$('.tnode',host).forEach(g=>{g.addEventListener('click',()=>select(g)); g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault(); select(g);}});});
  if(prev!=null){const g=$(`.tnode[data-i="${prev}"]`,host); if(g) select(g);}
}
const renderTrees=()=>$$('[data-tree]').forEach(renderTree);

/* ---------- mini diagram grids ---------- */
function renderMinis(){
  const put=(sel,list)=>{const h=$(sel); if(!h) return;
    h.innerHTML=list.map(([t,c,s])=>`<div class="mini"><svg viewBox="0 0 120 140" role="img" aria-label="${esc(t)}">${s}</svg><b>${esc(t)}</b><span>${esc(c)}</span></div>`).join('');};
  put('#fx-grid',MINIS.fx); put('#shape-grid',MINIS.shapes);
}

/* ---------- filterable tables ---------- */
function setupTableFilters(){
  const inp=$('#org-search'), t=$('#org-table'); if(!inp||!t) return;
  inp.addEventListener('input',()=>{const q=inp.value.trim().toLowerCase(); const rows=$$('tbody tr',t);
    rows.forEach(tr=>{if(!tr.classList.contains('grp')) tr.hidden=!!q&&!tr.textContent.toLowerCase().includes(q);});
    let g=null, any=false; rows.forEach(tr=>{if(tr.classList.contains('grp')){if(g) g.hidden=!any; g=tr; any=false;} else if(!tr.hidden) any=true;}); if(g) g.hidden=!any;});
}

/* ---------- rapid recall cards: grid or one at a time ---------- */
const BLKNAME=k=>k==='start'?'Foundations':(NAMES[k]||k);
function chapterOptions(keys,first){return first.map(([v,l])=>`<option value="${v}">${esc(l)}</option>`).join('')+keys.map(k=>`<option value="${k}">${esc(BLKNAME(k))}</option>`).join('');}
function renderFlips(){
  const g=$('#flip-grid'), solo=$('#flip-solo'), sel=$('#flip-filter'); if(!g) return;
  let filter='all', list=FLIPS.slice(), mode='grid', queue=[], known=0, total=0;
  sel.innerHTML=chapterOptions(SYSTEMS.filter(k=>FLIPS.some(f=>f[0]===k)),[['all','All chapters']]);
  const pick=()=>FLIPS.filter(f=>filter==='all'||f[0]===filter);
  const draw=()=>{
    list=list.filter(f=>filter==='all'||f[0]===filter);
    g.innerHTML=list.map(f=>`<button type="button" class="flip" aria-expanded="false"><span class="tagline">${esc(BLKNAME(f[0]))}</span><span class="q">${esc(f[1])}</span><span class="a">${esc(f[2])}</span></button>`).join('');
    $('#flip-count').textContent=`${list.length} cards`;
  };
  function soloStart(){queue=shuffle(pick()); known=0; total=queue.length; soloDraw();}
  function soloDraw(){
    if(!queue.length){solo.innerHTML=`<div class="solo-card done"><p class="solo-q">Deck finished.</p><p class="muted">You knew ${known} of ${total} first time. Cards you missed came back until you got them.</p><button type="button" class="btn" data-s="again">Go again</button></div>`; return;}
    const f=queue[0];
    solo.innerHTML=`<div class="solo-meta"><span>${total-queue.length} of ${total} done · ${known} known first time</span><span class="tagline">${esc(BLKNAME(f[0]))}</span></div>
      <button type="button" class="solo-card" data-s="flip" aria-expanded="false"><span class="solo-q">${esc(f[1])}</span><span class="solo-a" hidden>${esc(f[2])}</span><span class="solo-tip">Say the answer out loud, then tap to flip</span></button>
      <div class="solo-btns" hidden><button type="button" class="btn ghost" data-s="miss">Didn't know: show again later</button><button type="button" class="btn" data-s="know">Knew it</button></div>`;
  }
  solo.addEventListener('click',e=>{const b=e.target.closest('[data-s]'); if(!b) return; const s=b.dataset.s;
    if(s==='flip'){$('.solo-a',solo).hidden=false; $('.solo-tip',solo).hidden=true; b.setAttribute('aria-expanded','true'); $('.solo-btns',solo).hidden=false; $('[data-s="know"]',solo).focus();}
    else if(s==='know'){const f=queue.shift(); if(!f._miss) known++; delete f._miss; soloDraw();}
    else if(s==='miss'){const f=queue.shift(); f._miss=true; queue.splice(Math.min(queue.length,3),0,f); soloDraw();}
    else if(s==='again') soloStart();});
  g.addEventListener('click',e=>{const b=e.target.closest('.flip'); if(!b) return; const on=!b.classList.contains('on'); b.classList.toggle('on',on); b.setAttribute('aria-expanded',String(on));});
  $('#flip-shuffle').addEventListener('click',()=>{list=shuffle(pick()); if(mode==='solo') soloStart(); else draw();});
  $('#flip-reset').addEventListener('click',()=>{$$('.flip',g).forEach(b=>{b.classList.remove('on'); b.setAttribute('aria-expanded','false');});});
  sel.addEventListener('change',()=>{filter=sel.value; list=pick(); if(mode==='solo') soloStart(); draw();});
  $$('#flip-mode button').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.v; $$('#flip-mode button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
    g.hidden=mode!=='grid'; solo.hidden=mode!=='solo'; $('#flip-reset').hidden=mode!=='grid'; if(mode==='solo') soloStart();}));
  draw();
}

/* ---------- pathway drills ---------- */
function renderDrills(){
  const list=$('#drill-list'), stage=$('#drill-stage'), sel=$('#drill-filter'), todo=$('#drill-todo'); if(!list) return;
  let filter='all', active=null;
  const ids=Object.keys(PATHWAYS);
  sel.innerHTML=chapterOptions(['start'].concat(SYSTEMS).filter(k=>ids.some(id=>PATHWAYS[id].blk===k)),[['all','All chapters']]);
  const visible=()=>ids.filter(id=>{const P=PATHWAYS[id]; if(todo&&todo.checked&&drillDone[id]===true) return false; return filter==='all'||P.blk===filter;});
  function draw(){
    list.innerHTML=visible().map(id=>{const P=PATHWAYS[id], d=drillDone[id]; return `<li><button type="button" class="drill-btn${id===active?' on':''}" data-id="${id}" style="--pwc:${PWC[P.k]||PWC.gen}"><span class="dot"></span><span class="dt">${esc(P.t)}</span><span class="db">${esc(BLKNAME(P.blk))} · ${P.steps.length} steps${d===true?' · <span class="tick">perfect</span>':d?' · done':''}</span></button></li>`;}).join('')||'<li class="muted small" style="padding:8px">Every pathway here is perfect. Try them again in a week.</li>';
    const done=ids.filter(id=>drillDone[id]===true).length;
    $('#drill-count').textContent=`${done} of ${ids.length} pathways ordered perfectly`;
  }
  function open(id){ active=id; const P=PATHWAYS[id];
    const sec=document.getElementById(P.sec), h=sec&&sec.querySelector('h2');
    stage.innerHTML=`<div class="drill-host"></div><p class="small muted">Read it in context: <a href="#${P.sec}">${esc(h?h.textContent:P.sec)}</a></p>`;
    mountPathway($('.drill-host',stage),id,{mode:'order'});
    $$('.drill-btn',list).forEach(x=>x.classList.toggle('on',x.dataset.id===id));
    if(window.matchMedia('(max-width: 820px)').matches) stage.scrollIntoView({block:'start'});
  }
  list.addEventListener('click',e=>{const b=e.target.closest('.drill-btn'); if(b) open(b.dataset.id);});
  sel.addEventListener('change',()=>{filter=sel.value; draw();});
  if(todo) todo.addEventListener('change',draw);
  const rnd=$('#drill-random'); if(rnd) rnd.addEventListener('click',()=>{const v=visible().filter(id=>id!==active); if(v.length) open(v[Math.floor(Math.random()*v.length)]);});
  document.addEventListener('drill-update',draw);
  draw();
}

/* ---------- questions: one card component, used in Self-test and inside chapters ---------- */
const SUB={'₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9','α':'alpha','β':'beta','γ':'gamma','κ':'kappa'};
const norm=s=>String(s).toLowerCase().replace(/[₀-₉αβγκ]/g,c=>SUB[c]).replace(/[^a-z0-9]/g,'');
function matchGroups(groups,ans,no){const n=norm(ans); if(!n) return false; if(no&&no.some(w=>n.includes(norm(w)))) return false; return groups.every(g=>g.split('|').some(a=>n.includes(norm(a))));}
const QS={}; let qst=LS.get('bio-quiz',{});
/* Spread correct answers across positions with a fixed per-question seed, so the order is stable between visits */
function seededMix(q,seed){
  if(q.type!=='sba'||q.fixed||q._mixed) return;
  let x=seed>>>0||1; const r=()=>{x^=x<<13; x>>>=0; x^=x>>>17; x^=x<<5; x>>>=0; return x/4294967296;};
  const perm=q.o.map((o,j)=>j); for(let i=perm.length-1;i>0;i--){const j=Math.floor(r()*(i+1)); [perm[i],perm[j]]=[perm[j],perm[i]];}
  q.o=perm.map(j=>q.o[j]); q.a=perm.indexOf(q.a); q._mixed=true;
}
function prepQuestions(){
  QUIZ.forEach(q=>{ if(q.type==='vsaq'){q.type='saq'; q.acc=q.req; q.m=MODEL[q.id]||'';} q.t=q.c; QS[q.id]=q; });
  Object.keys(CH).forEach((k,ci)=>(CH[k].qs||[]).forEach((q,i)=>{q.id=k+'-'+(i+1); q.ch=k; q.t=k; seededMix(q,(ci+3)*7919+i*104729+17); QS[q.id]=q;}));
}
const QL='ABCDE';
function qCard(q){
  const s=qst[q.id], tag=q.type==='sba'?'Single best answer':'Short answer', cat=q.t==='immune'?'Blood, immunity & infection':(NAMES[q.t]||q.t);
  let body='';
  if(q.type==='sba') body=`<div class="opts">${q.o.map((o,i)=>{let cls=''; if(s){ if(i===q.a) cls='right'; else if(i===s.a) cls='wrong'; }
      return `<button type="button" class="opt ${cls}" data-i="${i}" ${s?'disabled':''}><span class="l">${QL[i]}</span><span>${esc(o)}</span></button>`;}).join('')}</div>`;
  else body=`<div class="vsaq"><input type="text" placeholder="Type a short answer" aria-label="Your answer" value="${s&&typeof s.a==='string'?esc(s.a):''}" ${s?'disabled':''}><button type="button" class="btn" data-act="check" ${s?'disabled':''}>Check</button><button type="button" class="btn ghost" data-act="reveal" ${s?'disabled':''}>Show answer</button></div>`;
  const ex=s?`<div class="expl"><span class="verdict ${s.ok?'ok':'no'}">${s.ok?'Correct.':'Not quite.'}</span><span><b>Answer:</b> ${esc(q.type==='sba'?q.o[q.a]:q.m)}</span><span>${esc(q.e)}</span><span><button type="button" class="linkbtn" data-act="retry">Try this one again</button></span></div>`:'';
  return `<div class="q" data-id="${q.id}"><div class="qhead"><span class="qtype">${tag}</span><span class="qtype">${esc(cat)}</span></div><p class="stem">${esc(q.q)}</p>${body}${ex}</div>`;
}
document.addEventListener('click',e=>{
  const qEl=e.target.closest('.q[data-id]'); if(!qEl) return;
  const q=QS[qEl.dataset.id]; if(!q) return;
  const opt=e.target.closest('.opt'), act=e.target.closest('[data-act]');
  if(act&&act.dataset.act==='retry') delete qst[q.id];
  else if(qst[q.id]) return;
  else if(opt){const i=+opt.dataset.i; qst[q.id]={a:i,ok:i===q.a};}
  else if(act){const inp=$('input',qEl), v=inp.value; if(act.dataset.act==='check'&&!v.trim()){inp.focus(); return;}
    qst[q.id]={a:v,ok:act.dataset.act==='check'&&matchGroups(q.acc,v,q.no)};}
  else return;
  LS.set('bio-quiz',qst); qEl.outerHTML=qCard(q); document.dispatchEvent(new CustomEvent('quiz-update'));
});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches&&e.target.matches('.q .vsaq input')){const b=e.target.parentElement.querySelector('[data-act="check"]'); if(b) b.click();}});
function drawChecks(root){ $$('.chk',root||document).forEach(h=>{const c=CH[h.dataset.ch]; if(c) $('.qz',h).innerHTML=(c.qs||[]).filter(q=>q.sec===h.dataset.sec).map(qCard).join('');}); }
function renderQuiz(){
  const list=$('#qz-list'), sel=$('#qz-filter'); if(!list) return;
  const all=Object.values(QS), cats=['msk','immune'].concat(SYSTEMS).filter((k,i,a)=>a.indexOf(k)===i&&all.some(q=>q.t===k));
  sel.innerHTML=`<option value="all">All ${all.length} questions</option>`+cats.map(k=>`<option value="${k}">${esc(k==='immune'?'Blood, immunity & infection':NAMES[k])} (${all.filter(q=>q.t===k).length})</option>`).join('')+'<option value="wrong">Ones I got wrong</option><option value="todo">Not yet answered</option>';
  let filter=LS.get('bio-qzf','all'); if(!Array.from(sel.options).some(o=>o.value===filter)) filter='all'; sel.value=filter;
  function score(){const ids=Object.keys(qst).filter(id=>QS[id]), n=ids.length, c=ids.filter(id=>qst[id].ok).length; $('#qz-score').textContent=n?`${n} of ${all.length} answered · ${c} correct (${Math.round(c/n*100)}%)`:`0 of ${all.length} answered`;}
  function draw(){
    const qs=all.filter(q=>filter==='all'||q.t===filter||(filter==='wrong'&&qst[q.id]&&!qst[q.id].ok)||(filter==='todo'&&!qst[q.id]));
    list.innerHTML=qs.length?qs.map(qCard).join(''):'<p class="muted">Nothing to show for this filter.</p>';
    score();
  }
  sel.addEventListener('change',()=>{filter=sel.value; LS.set('bio-qzf',filter); draw();});
  document.addEventListener('quiz-update',score);
  document.addEventListener('tab-shown',e=>{if(e.detail==='test') draw(); else if(CH[e.detail]) drawChecks($('#panel-'+e.detail));});
  const rb=$('#qz-reset'), rm=$('#qz-reset-msg'); let armed=false;
  rb.addEventListener('click',()=>{ if(!armed){armed=true; rb.textContent='Click again to clear'; rm.textContent=''; setTimeout(()=>{armed=false; rb.textContent='Clear my answers';},4000); return;}
    armed=false; qst={}; LS.set('bio-quiz',qst); rb.textContent='Clear my answers'; rm.textContent='Answers cleared.'; draw(); drawChecks(); });
  draw();
}

/* ================= EXAM PAPERS ================= */
const TOPICS={haem:['Haemostasis & blood','haemostasis'],wound:['Wound healing','wound'],inflam:['Inflammation','inflammation'],innate:['Innate immunity','innate'],
  compl:['Complement','complement'],lymph:['Lymphatic system','lymph'],adapt:['Adaptive immunity','adaptive'],ab:['Antibodies','antibodies'],
  hyper:['Hypersensitivity, autoimmunity & transplant','hypersens'],idef:['Immunodeficiency & HIV','hypersens'],vacc:['Vaccines & herd immunity','vaccines'],
  micro:['Microbes & pathogenesis','micro'],path:['Pathogens & the immune response','pathogens'],diag:['Diagnosing infection','diagnosis'],
  drug:['Antimicrobials','antimicrobials'],ipc:['Infection control, sepsis & fever','ipc']};
SYSTEMS.forEach(k=>{if(CH[k]&&CH[k].secs&&CH[k].secs.length) TOPICS[k]=[NAMES[k],CH[k].secs[0].id];});
const fmt=ms=>{ms=Math.max(0,Math.round(ms/1000)); const h=Math.floor(ms/3600), m=Math.floor(ms%3600/60), s=ms%60; return (h?h+':'+String(m).padStart(2,'0'):m)+':'+String(s).padStart(2,'0');};
const LETTER='ABCDE';
function renderExam(){
  const root=$('#exam-app'); if(!root) return;
  const PAPERS=window.EXAM_PAPERS||{};
  const cq=[]; Object.keys(CH).forEach(k=>(CH[k].qs||[]).forEach(q=>cq.push(q)));
  if(cq.length&&!PAPERS.C) PAPERS.C={title:'Paper C: body systems',blurb:'Nervous system, endocrine and reproduction, respiratory, cardiovascular, renal, GI and core cell science. The same questions as the "Check yourself" boxes inside those chapters.',qs:cq};
  const pool=[], byId={};
  /* Spread the correct answers across positions with a fixed per-question seed, so the order is stable between visits */
  const seeded=(seed,arr)=>{let x=seed>>>0||1; const r=()=>{x^=x<<13; x>>>=0; x^=x>>>17; x^=x<<5; x>>>=0; return x/4294967296;};
    for(let i=arr.length-1;i>0;i--){const j=Math.floor(r()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]];} return arr;};
  Object.keys(PAPERS).sort().forEach(k=>PAPERS[k].qs.forEach((q,i)=>{q.id=q.id||(k+(i+1)); q.paper=k; q.n=i+1; pool.push(q); byId[q.id]=q;
    if(q.type==='sba'&&!q.fixed&&!q._mixed){const perm=seeded((k.charCodeAt(0)*7919+i*104729+17),q.o.map((o,j)=>j)); q.o=perm.map(j=>q.o[j]); q.a=perm.indexOf(q.a); q._mixed=true;}}));
  if(!pool.length){root.innerHTML='<p class="muted">The exam papers did not load.</p>'; return;}
  let S=LS.get('bio-exam-cur',null);
  if(S&&(!S.ids||S.ids.some(id=>!byId[id]))) S=null;
  let view='setup', segStart=0, tick=null, confirmEnd=false, rv={st:null,filter:'all',auto:false};
  const save=()=>{if(S) LS.set('bio-exam-cur',Object.assign({},S,{elapsed:elapsedMs()}));};
  const elapsedMs=()=>S?S.elapsed+(segStart?Date.now()-segStart:0):0;
  const answered=(st,q)=>{const a=st.ans[q.id]; return q.type==='sba'?a!=null:!!(a&&String(a).trim());};
  const autoRight=(st,q)=>q.type==='sba'?st.ans[q.id]===q.a:matchGroups(q.acc,st.ans[q.id]||'',q.no);
  const isRight=(st,q)=>(q.type==='saq'&&st.over&&st.over[q.id]!=null)?st.over[q.id]:autoRight(st,q);
  function score(st){const qs=st.ids.map(id=>byId[id]); let c=0; const top={}, typ={sba:[0,0],saq:[0,0]};
    qs.forEach(q=>{const r=isRight(st,q); if(r) c++; const t=top[q.t]=top[q.t]||[0,0]; t[1]++; if(r) t[0]++; typ[q.type][1]++; if(r) typ[q.type][0]++;});
    return {n:qs.length,c,top,typ,unans:qs.filter(q=>!answered(st,q)).length};}
  function stopClock(){ if(segStart){S.elapsed+=Date.now()-segStart; segStart=0;} clearInterval(tick); tick=null; }
  function startClock(){ stopClock(); if(!S||S.paused||S.finished) return; segStart=Date.now(); tick=setInterval(updClock,1000); updClock(); }
  function updClock(){ const el=$('#ex-clock'); if(!S||!el) return; const e=elapsedMs();
    if(S.set.timed){const rem=S.set.mins*60000-e; if(rem<=0){finish(true); return;} el.textContent=fmt(rem)+' left'; el.classList.toggle('low',rem<5*60000);}
    else el.textContent=fmt(e)+' elapsed';
    const now=Date.now(); if(!updClock.t||now-updClock.t>10000){updClock.t=now; save();} }
  window.addEventListener('pagehide',save);
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden') save();});

  /* ----- setup ----- */
  function paperInfo(k){const qs=PAPERS[k].qs; return {n:qs.length,sba:qs.filter(q=>q.type==='sba').length,saq:qs.filter(q=>q.type==='saq').length};}
  function drawSetup(){
    view='setup'; stopClock();
    const hist=LS.get('bio-exam-hist',[]), seen=LS.get('bio-exam-seen',{});
    const best=k=>{const h=hist.filter(x=>x.paper===k&&x.full); return h.length?Math.max(...h.map(x=>x.pct)):null;};
    const pref=LS.get('bio-exam-set',{timed:false,fb:'each',shufQ:false,shufO:false,src:'A'});
    const topicCounts={}; pool.forEach(q=>{topicCounts[q.t]=(topicCounts[q.t]||0)+1;});
    const wrongN=pool.filter(q=>seen[q.id]===0).length, unseenN=pool.filter(q=>seen[q.id]==null).length;
    root.innerHTML=`
    ${S&&!S.finished?`<div class="ex-resume note exam"><span class="tag">Exam in progress</span><p><b>${esc(S.label)}</b>: ${S.ids.filter(id=>answered(S,byId[id])).length} of ${S.ids.length} answered · ${fmt(S.elapsed)} used${S.set.timed?` of ${S.set.mins} min`:''} · feedback ${S.set.fb==='each'?'after each question':'at the end'}.</p><div class="ex-row"><button type="button" class="btn" data-x="resume">Resume</button><button type="button" class="btn ghost" data-x="discard">Discard it</button></div></div>`:''}
    <div class="ex-setup">
      <fieldset class="ex-card"><legend>1 · Choose a paper</legend>
        <div class="ex-papers">${Object.keys(PAPERS).sort().map(k=>{const i=paperInfo(k), b=best(k); return `<label class="ex-paper"><input type="radio" name="ex-src" value="${k}"${pref.src===k?' checked':''}><span><b>${esc(PAPERS[k].title)}</b><span class="small muted">${i.n} questions · ${i.sba} single best answer · ${i.saq} short answer${b!=null?` · best ${b}%`:''}</span><span class="small">${esc(PAPERS[k].blurb||'')}</span></span></label>`;}).join('')}
          <label class="ex-paper"><input type="radio" name="ex-src" value="custom"${pref.src==='custom'?' checked':''}><span><b>Custom practice set</b><span class="small muted">Pick topics and a number of questions from both papers (${pool.length} in the bank)</span></span></label>
        </div>
        <div class="ex-custom" ${pref.src==='custom'?'':'hidden'}>
          <div class="ex-row"><span class="eyebrow">Topics</span><button type="button" class="linkbtn" data-x="tall">All</button><button type="button" class="linkbtn" data-x="tnone">None</button></div>
          <div class="pill-btns ex-topics">${Object.keys(TOPICS).filter(t=>topicCounts[t]).map(t=>`<button type="button" class="pbtn" data-t="${t}" aria-pressed="${(pref.topics||Object.keys(TOPICS)).includes(t)}">${esc(TOPICS[t][0])} <span class="muted">${topicCounts[t]}</span></button>`).join('')}</div>
          <div class="ex-row">
            <label>From <select id="ex-from"><option value="all">all questions</option><option value="wrong"${pref.from==='wrong'?' selected':''}>ones I got wrong before (${wrongN})</option><option value="unseen"${pref.from==='unseen'?' selected':''}>ones I have not tried (${unseenN})</option></select></label>
            <label>How many <select id="ex-count">${[10,20,30,50,100].map(v=>`<option${(pref.count||20)===v?' selected':''}>${v}</option>`).join('')}<option value="999"${pref.count===999?' selected':''}>all that match</option></select></label>
            <span class="small muted" id="ex-match"></span>
          </div>
        </div>
      </fieldset>
      <fieldset class="ex-card"><legend>2 · Timing</legend>
        <div class="seg" role="group" aria-label="Timing"><button type="button" data-tm="0" aria-pressed="${!pref.timed}">Untimed</button><button type="button" data-tm="1" aria-pressed="${!!pref.timed}">Timed</button></div>
        <label class="ex-mins" ${pref.timed?'':'hidden'}>Minutes <input type="number" id="ex-mins" min="1" max="600" step="1"> <span class="small muted">Default is 72 seconds per question (AMK pace).</span></label>
      </fieldset>
      <fieldset class="ex-card"><legend>3 · Feedback</legend>
        <div class="seg" role="group" aria-label="Feedback"><button type="button" data-fb="each" aria-pressed="${pref.fb!=='end'}">After each question</button><button type="button" data-fb="end" aria-pressed="${pref.fb==='end'}">All at the end</button></div>
        <p class="small muted">${'After each question: check your answer and read the explanation straight away (best for learning). At the end: answers stay hidden and changeable until you submit (best for exam practice).'}</p>
        <label class="ex-check"><input type="checkbox" id="ex-shufq"${pref.shufQ?' checked':''}> Shuffle the question order</label>
        <label class="ex-check"><input type="checkbox" id="ex-shufo"${pref.shufO?' checked':''}> Shuffle the answer options</label>
      </fieldset>
      <div class="ex-row"><button type="button" class="btn ex-go" data-x="start">Start</button><span class="small muted" id="ex-start-msg"></span></div>
    </div>
    ${hist.length?`<div class="ex-card ex-hist"><h3>Your attempts</h3><div class="tbl-wrap"><table><thead><tr><th>Date</th><th>Set</th><th>Score</th><th>Time</th><th>Mode</th></tr></thead><tbody>${hist.slice(-12).reverse().map(h=>`<tr><td class="nowrap">${new Date(h.date).toLocaleDateString('en-GB',{day:'numeric',month:'short'})} ${new Date(h.date).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}</td><td>${esc(h.label)}</td><td><b>${h.c}/${h.n}</b> (${h.pct}%)</td><td>${fmt(h.ms)}</td><td>${h.timed?'Timed':'Untimed'}, ${h.fb==='each'?'feedback each':'feedback at end'}</td></tr>`).join('')}</tbody></table></div>
      <div class="ex-row">${LS.get('bio-exam-last',null)?'<button type="button" class="btn ghost" data-x="last">Review my last attempt</button>':''}<button type="button" class="btn ghost" data-x="clearhist">Clear history</button></div></div>`:''}`;
    const mins=$('#ex-mins',root);
    const src=()=>($('input[name="ex-src"]:checked',root)||{}).value||'A';
    const topicsOn=()=>$$('.ex-topics .pbtn',root).filter(b=>b.getAttribute('aria-pressed')==='true').map(b=>b.dataset.t);
    function customIds(){const ts=topicsOn(), from=$('#ex-from',root).value; const sn=LS.get('bio-exam-seen',{});
      return pool.filter(q=>ts.includes(q.t)&&(from==='all'||(from==='wrong'&&sn[q.id]===0)||(from==='unseen'&&sn[q.id]==null))).map(q=>q.id);}
    function count(){const s=src(); if(s!=='custom') return PAPERS[s].qs.length; const m=customIds().length, c=+$('#ex-count',root).value; return Math.min(m,c);}
    function refresh(){const s=src(); $('.ex-custom',root).hidden=s!=='custom';
      if(s==='custom'){const m=customIds().length; $('#ex-match',root).textContent=`${m} question${m===1?'':'s'} match`;}
      if(!mins.dataset.touched) mins.value=Math.max(1,Math.round(count()*1.2));}
    root.onchange=e=>{if(e.target.name==='ex-src'||e.target.id==='ex-from'||e.target.id==='ex-count') refresh(); if(e.target===mins) mins.dataset.touched='1';};
    mins.addEventListener('input',()=>{mins.dataset.touched='1';});
    root.onclick=e=>{
      const b=e.target.closest('button'); if(!b) return;
      if(b.dataset.t){b.setAttribute('aria-pressed',String(b.getAttribute('aria-pressed')!=='true')); refresh(); return;}
      if(b.dataset.tm!=null){$$('[data-tm]',root).forEach(x=>x.setAttribute('aria-pressed',String(x===b))); $('.ex-mins',root).hidden=b.dataset.tm!=='1'; return;}
      if(b.dataset.fb){$$('[data-fb]',root).forEach(x=>x.setAttribute('aria-pressed',String(x===b))); return;}
      const x=b.dataset.x; if(!x) return;
      if(x==='tall'||x==='tnone'){$$('.ex-topics .pbtn',root).forEach(t=>t.setAttribute('aria-pressed',String(x==='tall'))); refresh();}
      else if(x==='resume'){run();}
      else if(x==='discard'){if(b.dataset.armed){S=null; LS.del('bio-exam-cur'); drawSetup();} else {b.dataset.armed='1'; b.textContent='Click again to discard';}}
      else if(x==='last'){const L=LS.get('bio-exam-last',null); if(L) results(L,false);}
      else if(x==='clearhist'){if(b.dataset.armed){LS.del('bio-exam-hist'); LS.del('bio-exam-last'); LS.del('bio-exam-seen'); drawSetup();} else {b.dataset.armed='1'; b.textContent='Click again: clears history and weak-question tracking';}}
      else if(x==='start'){
        const s=src(), timed=$('[data-tm="1"]',root).getAttribute('aria-pressed')==='true', fb=$('[data-fb="end"]',root).getAttribute('aria-pressed')==='true'?'end':'each';
        const shufQ=$('#ex-shufq',root).checked, shufO=$('#ex-shufo',root).checked;
        let ids, label;
        if(s==='custom'){ids=shuffle(customIds()).slice(0,+$('#ex-count',root).value); label=`Custom set (${ids.length})`; if(!ids.length){$('#ex-start-msg',root).textContent='No questions match: choose more topics or a different source.'; return;}}
        else {ids=PAPERS[s].qs.map(q=>q.id); label=PAPERS[s].title;}
        if(shufQ&&s!=='custom') ids=shuffle(ids);
        if(S&&!S.finished&&!b.dataset.armed){b.dataset.armed='1'; $('#ex-start-msg',root).textContent='This will replace the exam in progress. Click Start again to confirm.'; return;}
        LS.set('bio-exam-set',{timed,fb,shufQ,shufO,src:s,topics:topicsOn(),from:$('#ex-from',root).value,count:+$('#ex-count',root).value});
        begin(ids,label,{timed,mins:Math.max(1,+mins.value||Math.round(ids.length*1.2)),fb,shufO});
      }
    };
    refresh();
  }
  function begin(ids,label,set){
    S={label,ids,cur:0,ans:{},opt:{},flag:{},lock:{},over:{},set,elapsed:0,started:Date.now(),finished:false,paused:false};
    if(set.shufO) ids.forEach(id=>{const q=byId[id]; if(q.type==='sba') S.opt[id]=shuffle(q.o.map((o,i)=>i));});
    save(); run();
  }

  /* ----- running ----- */
  function run(){ view='run'; confirmEnd=false;
    root.innerHTML=`<div class="ex-run">
      <div class="ex-top"><div><b>${esc(S.label)}</b><span class="small muted"> · ${S.set.timed?'Timed':'Untimed'} · feedback ${S.set.fb==='each'?'after each question':'at the end'}</span></div>
        <div class="ex-row"><span class="ex-clock" id="ex-clock" aria-live="off"></span><button type="button" class="btn ghost" data-r="pause">Pause</button><button type="button" class="btn ghost" data-r="setup">Save and exit</button><button type="button" class="btn" data-r="end">Finish</button></div></div>
      <div class="ex-prog" aria-hidden="true"><i></i></div>
      <div class="ex-confirm" hidden></div>
      <div class="ex-body"><div class="ex-main" id="ex-main"></div>
        <aside class="ex-side"><details class="ex-navbox"${window.matchMedia('(min-width: 901px)').matches?' open':''}><summary>Question map <span class="small muted" id="ex-mapsum"></span></summary><div class="ex-grid" id="ex-grid"></div>
          <div class="ex-legend small muted"><span><i class="lg cur"></i>current</span><span><i class="lg ans"></i>answered</span><span><i class="lg flag"></i>flagged</span>${S.set.fb==='each'?'<span><i class="lg ok"></i>right</span><span><i class="lg no"></i>wrong</span>':''}</div></details>
          <p class="small muted ex-keys">Keys: <kbd>A</kbd>–<kbd>E</kbd> or <kbd>1</kbd>–<kbd>5</kbd> choose · <kbd>Enter</kbd> ${S.set.fb==='each'?'check / next':'next'} · <kbd>←</kbd> <kbd>→</kbd> move · <kbd>F</kbd> flag</p></aside></div></div>`;
    root.onchange=null;
    root.onclick=onRunClick;
    root.oninput=e=>{if(e.target.id==='ex-saq'){const q=byId[S.ids[S.cur]]; if(S.lock[q.id]) return; S.ans[q.id]=e.target.value; save(); grid(); const c=$('[data-r="check"]',root); if(c) c.disabled=!answered(S,q);}};
    drawQ(); grid(); if(S.paused) pauseView(); else startClock();
  }
  function grid(){
    const g=$('#ex-grid',root); if(!g) return;
    g.innerHTML=S.ids.map((id,p)=>{const q=byId[id]; let c=''; if(p===S.cur) c+=' cur'; if(answered(S,q)) c+=' ans'; if(S.flag[id]) c+=' flag';
      if(S.lock[id]) c+=isRight(S,q)?' ok':' no';
      return `<button type="button" class="ex-cell${c}" data-go="${p}" aria-label="Question ${p+1}${S.flag[id]?', flagged':''}${answered(S,q)?', answered':''}">${p+1}</button>`;}).join('');
    const a=S.ids.filter(id=>answered(S,byId[id])).length, f=S.ids.filter(id=>S.flag[id]).length;
    $('#ex-mapsum',root).textContent=`${a}/${S.ids.length} answered${f?` · ${f} flagged`:''}`;
    $('.ex-prog i',root).style.width=(a/S.ids.length*100)+'%';
  }
  function optOrder(q){return S.opt[q.id]||q.o.map((o,i)=>i);}
  function feedbackHTML(st,q,showOverride){
    const r=isRight(st,q), ans=st.ans[q.id], has=answered(st,q);
    let h=`<div class="ex-fb ${r?'ok':'no'}"><p class="verdict ${r?'ok':'no'}">${r?'Correct':has?'Incorrect':'Not answered'}</p>`;
    if(q.type==='sba') h+=`<p><b>Answer:</b> ${esc(q.o[q.a])}</p>`;
    else {h+=`<p><b>Your answer:</b> ${has?esc(ans):'<i>blank</i>'}</p><p><b>Model answer:</b> ${esc(q.m)}</p>`;
      if(showOverride&&has){const o=st.over[q.id]; h+=`<p class="small muted">Auto-marked as ${autoRight(st,q)?'correct':'incorrect'} by keyword match. Mark it yourself if that is wrong:</p><div class="ex-row"><button type="button" class="pbtn" data-ov="1" aria-pressed="${o===true}">Count as correct</button><button type="button" class="pbtn" data-ov="0" aria-pressed="${o===false}">Count as wrong</button>${o!=null?'<button type="button" class="linkbtn" data-ov="x">Use auto-mark</button>':''}</div>`;}}
    return h+`<p class="ex-expl">${esc(q.e)}</p></div>`;
  }
  function drawQ(){
    const main=$('#ex-main',root), q=byId[S.ids[S.cur]], p=S.cur, n=S.ids.length, locked=!!S.lock[q.id], each=S.set.fb==='each';
    let body='';
    if(q.type==='sba'){
      body=`<p class="ex-lead small muted">Choose the single best answer.</p><div class="opts" role="radiogroup">${optOrder(q).map((oi,k)=>{let c=''; if(S.ans[q.id]===oi) c+=' sel';
        if(locked){ if(oi===q.a) c+=' right'; else if(S.ans[q.id]===oi) c+=' wrong'; }
        return `<button type="button" class="opt${c}" role="radio" aria-checked="${S.ans[q.id]===oi}" data-o="${oi}" ${locked?'disabled':''}><span class="l">${LETTER[k]}</span><span>${esc(q.o[oi])}</span></button>`;}).join('')}</div>`;
    } else {
      body=`<label class="ex-lead small muted" for="ex-saq">Type a short answer (usually 1–5 words). Spelling is matched loosely.</label><div class="vsaq"><input type="text" id="ex-saq" autocomplete="off" spellcheck="false" value="${esc(S.ans[q.id]||'')}" ${locked?'disabled':''} placeholder="Your answer"></div>`;
    }
    main.innerHTML=`<article class="ex-q">
      <div class="qhead"><span class="qtype">Question ${p+1} of ${n}</span><span class="qtype">${q.type==='sba'?'Single best answer':'Short answer'}</span>${each||S.finished?`<span class="qtype">${esc(TOPICS[q.t]?TOPICS[q.t][0]:q.t)}</span>`:''}
        <button type="button" class="pbtn ex-flag" data-r="flag" aria-pressed="${!!S.flag[q.id]}">${S.flag[q.id]?'⚑ Flagged':'⚐ Flag for review'}</button></div>
      <p class="stem">${esc(q.q)}</p>${body}
      ${locked?feedbackHTML(S,q,true):''}
      <div class="ex-nav"><button type="button" class="btn ghost" data-r="prev" ${p===0?'disabled':''}>← Previous</button>
        ${each&&!locked?`<button type="button" class="btn" data-r="check" ${answered(S,q)?'':'disabled'}>Check answer</button>`:''}
        ${p<n-1?`<button type="button" class="btn ${each&&!locked?'ghost':''}" data-r="next">${each&&!locked?'Skip':'Next'} →</button>`:`<button type="button" class="btn" data-r="end">Finish paper</button>`}</div>
    </article>`;
    const inp=$('#ex-saq',main); if(inp&&!locked&&window.matchMedia('(pointer:fine)').matches) inp.focus();
  }
  function go(p){ if(p<0||p>=S.ids.length) return; S.cur=p; save(); drawQ(); grid(); const m=$('#ex-main',root); if(m&&m.getBoundingClientRect().top<60) m.scrollIntoView({block:'start'}); }
  function check(){ const q=byId[S.ids[S.cur]]; if(S.lock[q.id]||!answered(S,q)) return; S.lock[q.id]=true; save(); drawQ(); grid(); const f=$('.ex-fb',root); if(f) f.scrollIntoView({block:'nearest'}); }
  function choose(oi){ const q=byId[S.ids[S.cur]]; if(q.type!=='sba'||S.lock[q.id]) return; S.ans[q.id]=oi; save(); drawQ(); grid(); }
  function onRunClick(e){
    const b=e.target.closest('button'); if(!b) return;
    if(b.dataset.go!=null){go(+b.dataset.go); return;}
    if(b.dataset.o!=null){choose(+b.dataset.o); return;}
    if(b.dataset.ov!=null){const q=byId[S.ids[S.cur]]; if(b.dataset.ov==='x') delete S.over[q.id]; else S.over[q.id]=b.dataset.ov==='1'; save(); drawQ(); grid(); return;}
    const r=b.dataset.r; if(!r) return;
    if(r==='next') go(S.cur+1); else if(r==='prev') go(S.cur-1); else if(r==='check') check();
    else if(r==='flag'){const id=S.ids[S.cur]; S.flag[id]=!S.flag[id]; if(!S.flag[id]) delete S.flag[id]; save(); drawQ(); grid();}
    else if(r==='pause'){S.paused=true; stopClock(); save(); pauseView();}
    else if(r==='unpause'){S.paused=false; save(); run();}
    else if(r==='setup'){stopClock(); save(); drawSetup(); window.scrollTo(0,root.offsetTop-80);}
    else if(r==='end') askEnd();
    else if(r==='endno'){$('.ex-confirm',root).hidden=true;}
    else if(r==='endyes') finish(false);
    else if(r==='gofirst'){$('.ex-confirm',root).hidden=true; const p=S.ids.findIndex(id=>!answered(S,byId[id])||S.flag[id]); if(p>=0) go(p);}
  }
  function pauseView(){ $('#ex-main',root).innerHTML=`<div class="ex-paused"><p class="solo-q">Paused</p><p class="muted">The clock is stopped and the question is hidden.</p><button type="button" class="btn" data-r="unpause">Resume</button></div>`; const c=$('#ex-clock',root); if(c) c.textContent=fmt(S.set.timed?S.set.mins*60000-S.elapsed:S.elapsed)+(S.set.timed?' left':'')+' · paused'; }
  function askEnd(){ const box=$('.ex-confirm',root); const un=S.ids.filter(id=>!answered(S,byId[id])).length, fl=S.ids.filter(id=>S.flag[id]).length;
    box.innerHTML=`<p><b>Finish and mark this paper?</b> ${un?`${un} question${un===1?' is':'s are'} unanswered. `:'Every question is answered. '}${fl?`${fl} flagged for review.`:''}</p><div class="ex-row"><button type="button" class="btn" data-r="endyes">Finish and see results</button>${un||fl?'<button type="button" class="btn ghost" data-r="gofirst">Go to the first unanswered or flagged</button>':''}<button type="button" class="btn ghost" data-r="endno">Keep going</button></div>`;
    box.hidden=false; box.scrollIntoView({block:'nearest'}); }
  function finish(timeUp){
    stopClock(); S.finished=true; S.ended=Date.now(); S.timeUp=!!timeUp;
    const sc=score(S), pct=Math.round(sc.c/sc.n*100);
    const hist=LS.get('bio-exam-hist',[]);
    const paper=Object.keys(PAPERS).find(k=>PAPERS[k].title===S.label)||null;
    S.hid=Date.now(); hist.push({hid:S.hid,date:S.started,label:S.label,paper,full:!!paper,n:sc.n,c:sc.c,pct,ms:S.elapsed,timed:S.set.timed,fb:S.set.fb});
    LS.set('bio-exam-hist',hist.slice(-50));
    const seen=LS.get('bio-exam-seen',{}); S.ids.forEach(id=>{const q=byId[id]; if(answered(S,q)) seen[id]=isRight(S,q)?1:0;}); LS.set('bio-exam-seen',seen);
    LS.set('bio-exam-last',S); LS.del('bio-exam-cur');
    const done=S; S=null; results(done,timeUp);
  }

  /* ----- results and review ----- */
  function results(st,timeUp){
    view='results'; rv={st,filter:'all'};
    const sc=score(st), pct=Math.round(sc.c/sc.n*100);
    const tops=Object.keys(sc.top).map(t=>({t,c:sc.top[t][0],n:sc.top[t][1],p:sc.top[t][0]/sc.top[t][1]})).sort((a,b)=>a.p-b.p);
    const hist=LS.get('bio-exam-hist',[]), prev=hist.filter(h=>h.label===st.label&&h.hid!==st.hid);
    const wrongIds=st.ids.filter(id=>!isRight(st,byId[id]));
    root.innerHTML=`<div class="ex-results">
      ${timeUp?'<div class="note fix"><span class="tag">Time is up</span><p>The paper was submitted automatically when the clock ran out.</p></div>':''}
      <div class="ex-score"><div class="ex-big"><span>${pct}%</span><small>${sc.c} of ${sc.n} correct</small></div>
        <dl class="kv"><dt>Set</dt><dd>${esc(st.label)}</dd><dt>Time</dt><dd>${fmt(st.elapsed)}${st.set.timed?` of ${st.set.mins} min allowed`:' (untimed)'}</dd>
        <dt>SBA</dt><dd>${sc.typ.sba[0]} of ${sc.typ.sba[1]}</dd><dt>Short answer</dt><dd>${sc.typ.saq[0]} of ${sc.typ.saq[1]} <span class="small muted">(check the auto-marking below)</span></dd>
        <dt>Unanswered</dt><dd>${sc.unans}</dd>${prev.length?`<dt>Previous</dt><dd>${prev.slice(-3).map(h=>h.pct+'%').join(', ')}</dd>`:''}</dl></div>
      <div class="ex-card"><h3>By topic, weakest first</h3><div class="ex-bars">${tops.map(o=>`<div class="ex-bar"><span class="nm">${esc(TOPICS[o.t]?TOPICS[o.t][0]:o.t)}</span><span class="tr"><i style="width:${Math.round(o.p*100)}%" class="${o.p<.5?'lo':o.p<.75?'mid':'hi'}"></i></span><span class="v">${o.c}/${o.n}</span>${TOPICS[o.t]?`<a href="#${TOPICS[o.t][1]}" class="small">Revise</a>`:''}</div>`).join('')}</div></div>
      <div class="ex-row">${wrongIds.length?`<button type="button" class="btn" data-v="retry">Retry the ${wrongIds.length} I got wrong or skipped</button>`:''}<button type="button" class="btn ghost" data-v="new">Back to papers</button></div>
      <div class="ex-card"><div class="ex-row ex-revhead"><h3>Review</h3><div class="pill-btns" id="ex-rvf">${[['all','All'],['wrong','Wrong or skipped'],['flag','Flagged'],['saq','Short answers']].map(([v,l])=>`<button type="button" class="pbtn" data-f="${v}" aria-pressed="${v==='all'}">${l}</button>`).join('')}</div></div><div id="ex-rvlist"></div></div>
    </div>`;
    root.onchange=null; root.oninput=null;
    root.onclick=e=>{const b=e.target.closest('button'); if(!b) return;
      if(b.dataset.f){rv.filter=b.dataset.f; $$('#ex-rvf .pbtn',root).forEach(x=>x.setAttribute('aria-pressed',String(x===b))); drawReview(); return;}
      if(b.dataset.ov!=null){const id=b.closest('[data-q]').dataset.q; if(b.dataset.ov==='x') delete st.over[id]; else st.over[id]=b.dataset.ov==='1'; persistOverride(st); const y=window.scrollY; results(st,false); window.scrollTo(0,y); return;}
      if(b.dataset.v==='retry'){begin(shuffle(wrongIds),'Retry: '+st.label.replace(/^Retry: /,''),Object.assign({},st.set,{mins:Math.max(1,Math.round(wrongIds.length*1.2))}));}
      else if(b.dataset.v==='new'){drawSetup(); window.scrollTo(0,root.offsetTop-80);}};
    drawReview();
  }
  function persistOverride(st){
    const sc=score(st), hist=LS.get('bio-exam-hist',[]), h=hist.find(x=>x.hid===st.hid);
    if(h){h.c=sc.c; h.pct=Math.round(sc.c/sc.n*100); LS.set('bio-exam-hist',hist);}
    const last=LS.get('bio-exam-last',null); if(last&&last.hid===st.hid) LS.set('bio-exam-last',st);
    const seen=LS.get('bio-exam-seen',{}); st.ids.forEach(id=>{const q=byId[id]; if(answered(st,q)) seen[id]=isRight(st,q)?1:0;}); LS.set('bio-exam-seen',seen);
  }
  function drawReview(){
    const st=rv.st, f=rv.filter, el=$('#ex-rvlist',root);
    const rows=st.ids.map((id,p)=>({q:byId[id],p})).filter(({q})=>f==='all'||(f==='wrong'&&!isRight(st,q))||(f==='flag'&&st.flag[q.id])||(f==='saq'&&q.type==='saq'));
    el.innerHTML=rows.length?rows.map(({q,p})=>{const r=isRight(st,q);
      const opts=q.type==='sba'?`<ol class="ex-ropts">${q.o.map((o,i)=>`<li class="${i===q.a?'right':st.ans[q.id]===i?'wrong':''}">${esc(o)}${i===q.a?' <b>✓ answer</b>':st.ans[q.id]===i?' <b>✗ your choice</b>':''}</li>`).join('')}</ol>`:'';
      return `<details class="ex-rv ${r?'ok':'no'}" data-q="${q.id}"${!r&&f!=='all'?' open':''}><summary><span class="ex-rvn">${p+1}</span><span class="ex-rvv">${r?'✓':'✗'}</span><span class="ex-rvs">${esc(q.q.length>140?q.q.slice(0,140)+'…':q.q)}</span><span class="qtype">${esc(TOPICS[q.t]?TOPICS[q.t][0]:q.t)}</span>${st.flag[q.id]?'<span class="qtype">⚑</span>':''}</summary>
        <div class="ex-rvb"><p class="stem">${esc(q.q)}</p>${opts}${feedbackHTML(st,q,true)}</div></details>`;}).join(''):'<p class="muted">Nothing in this filter.</p>';
  }

  /* ----- keyboard ----- */
  document.addEventListener('keydown',e=>{
    if(current!=='exam'||view!=='run'||!S||S.paused||e.ctrlKey||e.metaKey||e.altKey) return;
    const typing=!!(e.target.matches&&e.target.matches('input,textarea,select'));
    const q=byId[S.ids[S.cur]];
    if(typing){ if(e.key==='Enter'&&e.target.id==='ex-saq'){e.preventDefault(); if(S.set.fb==='each'&&!S.lock[q.id]&&answered(S,q)) check(); else go(S.cur+1);} return; }
    const k=e.key.toLowerCase();
    if(q.type==='sba'&&/^[1-5a-e]$/.test(k)){const idx=/[1-5]/.test(k)?+k-1:k.charCodeAt(0)-97; const ord=optOrder(q); if(idx<ord.length){e.preventDefault(); choose(ord[idx]);} return;}
    if(k==='enter'){e.preventDefault(); if(S.set.fb==='each'&&!S.lock[q.id]&&answered(S,q)) check(); else if(S.cur<S.ids.length-1) go(S.cur+1); else askEnd();}
    else if(k==='arrowright'){e.preventDefault(); go(S.cur+1);} else if(k==='arrowleft'){e.preventDefault(); go(S.cur-1);}
    else if(k==='f'){const id=S.ids[S.cur]; S.flag[id]=!S.flag[id]; if(!S.flag[id]) delete S.flag[id]; save(); drawQ(); grid();}
  });
  drawSetup();
}

/* ================= DATA-DRIVEN CHAPTERS =================
   Chapters in js/ch-*.js are plain data (window.CHAPTERS). Each section is a list of blocks: ['p', html], ['table', head, rows],
   ['cards', [...]], ['pw', id...], ['fig'|'explore'|'sw'|'axis', ...], ['clin'|'think'|'exam'|'fix', ...], ['tree', key], ['widget', name]. */
Object.assign(PWC,{neuro:'var(--nerve-ink)',endo:'var(--warn)',repro:'var(--muscle)',resp:'var(--vein)',cardio:'var(--artery)',renal:'var(--accent)',gi:'var(--pw-bone)',cell:'var(--pw-gen)'});
Object.assign(PWK,{neuro:'Nervous',endo:'Endocrine',repro:'Reproduction',resp:'Respiratory',cardio:'Cardiovascular',renal:'Renal',gi:'Gastrointestinal',cell:'Cell science'});
const XP={}, SWV={}, FIXES=[];
function tableHTML(head,rows){const n=head.length;
  return `<div class="tbl-wrap"><table><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>typeof r==='string'?`<tr class="grp"><td colspan="${n}">${r}</td></tr>`:`<tr>${r.map((c,i)=>i?`<td>${c}</td>`:`<th>${c}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
function cardHTML(c){const body=Array.isArray(c[1])?`<ul>${c[1].map(x=>`<li>${x}</li>`).join('')}</ul>`:`<p>${c[1]}</p>`;
  return `<div class="card"><h4>${c[0]}</h4>${body}${c[2]?`<p class="meta">${c[2]}</p>`:''}</div>`;}
function figWrap(id,title,cap,minw,svg,top,bottom,cls){
  return `<figure class="dg${cls?' '+cls:''}" id="${id}"><div class="dg-head"><h3>${title}</h3><span class="cap">${cap||''}</span></div>${top||''}<div class="dg-fig"${minw?` style="--minw:${minw}px"`:''}>${svg}</div>${bottom||''}</figure>`;}
/* Hormone-axis style flowchart: stacked boxes, labelled arrows, feedback loops on the right, notes on the left */
function axisSVG(a){
  const N=a.nodes, cx=300, bw=220, bh=46, step=a.step||92, x0=cx-bw/2, xr=x0+bw, ys=[]; let y=10, out='';
  N.forEach((n,i)=>{ys.push(y);
    out+=`<rect x="${x0}" y="${y}" width="${bw}" height="${bh}" rx="10" class="${n.c||'n-org'}"/><text x="${cx}" y="${y+(n.s?20:28)}" class="b lab" text-anchor="middle">${n.t}</text>${n.s?`<text x="${cx}" y="${y+37}" class="sm" text-anchor="middle">${n.s}</text>`:''}`;
    if(i<N.length-1){const l=(a.links||[])[i]; out+=`<path d="M${cx},${y+bh} V${y+step-3}" class="a-stim"/>${l?`<text x="${cx+10}" y="${y+bh+(step-bh)/2+4}" class="sm lab b t-stim">${l}</text>`:''}`;}
    y+=step;});
  let H=y-step+bh+12;
  (a.fb||[]).forEach((f,j)=>{const from=f[0], to=f[1], pos=f[2]==='+', y1=ys[from]+bh/2+(j?7:-2), y2=ys[to]+bh/2+(j%2?9:-4), off=56+j*34;
    out+=`<path d="M${xr},${y1} C${xr+off},${y1} ${xr+off},${y2} ${xr+5},${y2}" class="${pos?'a-stim':'a-inh'}"/><text x="${xr+off*0.76+8}" y="${(y1+y2)/2+4}" class="sm ${pos?'t-stim':'t-inh'}">${pos?'+':'−'}${f[3]?' '+f[3]:''}</text>`;});
  (a.side||[]).forEach(s=>{const lines=[].concat(s[1]), yy=ys[s[0]]+bh/2-(lines.length-1)*7+4;
    out+=lines.map((l,k)=>`<text x="${x0-12}" y="${yy+k*15}" class="sm ${s[2]||'t-drug'}" text-anchor="end">${l}</text>`).join('');});
  if(a.fx){const lines=a.fx, h=18+lines.length*16; out+=`<path d="M${cx},${H-12} V${H+10}" class="a-stim"/><rect x="${cx-200}" y="${H+12}" width="400" height="${h}" rx="10" class="n-box"/>`+lines.map((l,k)=>`<text x="${cx}" y="${H+32+k*16}" class="sm${k?'':' b'}" text-anchor="middle">${l}</text>`).join(''); H+=h+22;}
  /* crop to the content so the figure stays readable in a narrow column */
  const nfb=(a.fb||[]).length, left=a.side?0:(a.fx?92:x0-14), right=Math.max(nfb?xr+56+(nfb-1)*34+104:xr+14,a.fx?508:0);
  return {w:right-left,svg:`<svg viewBox="${left} 0 ${right-left} ${H}" role="img" aria-label="${esc(a.label||'Flow diagram')}">${out}</svg>`};
}
function blockHTML(b){
  switch(b[0]){
    case 'p': return `<div class="prose">${[].concat(b[1]).map(x=>`<p>${x}</p>`).join('')}</div>`;
    case 'h': return `<h3>${b[1]}</h3>`;
    case 'think': return `<div class="note think"><span class="tag">Think of it as</span><p>${b[1]}</p></div>`;
    case 'clin': return `<div class="note clin"><span class="tag">Clinical link · ${b[1]}</span><p>${b[2]}</p></div>`;
    case 'exam': return `<div class="note exam"><span class="tag">Exam tip</span><p>${b[1]}</p></div>`;
    case 'fix': FIXES.push([b[1],b[2]]); return `<div class="note fix"><span class="tag">Slide check · ${b[1]}</span><p>${b[2]}</p></div>`;
    case 'notes': return `<div class="notes">${b.slice(1).map(blockHTML).join('')}</div>`;
    case 'table': return tableHTML(b[1],b[2]);
    case 'cards': return `<div class="twocol">${b[1].map(cardHTML).join('')}</div>`;
    case 'card': return cardHTML(b.slice(1));
    case 'pw': return `<div class="pws">${b.slice(1).map(id=>`<div class="pw-slot" data-pw="${id}"></div>`).join('')}</div>`;
    case 'pwside': return `<div class="pws"><div class="pw-slot" data-pw="${b[1]}"></div><div class="sub">${b.slice(2).map(blockHTML).join('')}</div></div>`;
    case 'two': return `<div class="twocol${b.slice(1).some(x=>['axis','fig','explore','sw'].includes(x[0]))?' wide2':''}">${b.slice(1).map(blockHTML).join('')}</div>`;
    case 'fig': return figWrap(b[1],b[2],b[3],b[4],b[5]);
    case 'explore': XP[b[1]]=b[6]; return figWrap(b[1],b[2],b[3],b[4],b[5],'',`<div class="xp-keys">${Object.keys(b[6]).map(k=>`<button type="button" class="pbtn" data-xk="${k}" aria-pressed="false">${b[6][k][0]}</button>`).join('')}</div><div class="xp-detail" aria-live="polite">Tap a part of the diagram, or one of the buttons, to see what it does.</div>`,'explore');
    case 'sw': SWV[b[1]]=b[6]; return figWrap(b[1],b[2],b[3],b[4],b[5],`<div class="seg sw-seg" role="group" aria-label="Choose a pattern">${b[6].map(v=>`<button type="button" data-sv="${v[0]}">${v[1]}</button>`).join('')}</div>`,'<div class="xp-detail sw-detail" aria-live="polite"></div>','sw');
    case 'axis': {const r=axisSVG(b[4]); return figWrap(b[1],b[2],b[3],Math.round(Math.min(380,r.w*0.72)),r.svg);}
    case 'tree': return `<div class="tree-host" data-tree="${b[1]}"></div>`;
    case 'kv': return `<div class="card"><h4>${b[1]}</h4><dl class="kv">${b[2].map(r=>`<dt>${r[0]}</dt><dd>${r[1]}</dd>`).join('')}</dl></div>`;
    case 'flow': return `<div class="flow">${b[1].map(r=>`<div><b>${r[0]}</b>${r[1]||''}</div>`).join('')}</div>`;
    case 'widget': return `<div class="widget" data-widget="${b[1]}"></div>`;
    case 'html': return b[1];
  }
  console.warn('Unknown block',b[0]); return '';
}
function renderChapters(){
  Object.keys(CH).forEach(k=>{const c=CH[k], panel=$('#panel-'+k); if(!panel) return;
    if(c.pw) Object.keys(c.pw).forEach(id=>{const P=c.pw[id]; P.blk=k; PATHWAYS[id]=P;});
    if(c.trees) Object.assign(TREES,c.trees);
    (c.flips||[]).forEach(f=>FLIPS.push([k,f[0],f[1]]));
    const n={}; (c.qs||[]).forEach(q=>{n[q.sec]=(n[q.sec]||0)+1;});
    panel.innerHTML=`<div class="opener"><span class="eyebrow">${c.eyebrow}</span><h1>${c.h1}</h1><p class="lede">${c.lede}</p></div>`+
      c.secs.map(s=>`<section class="sec" id="${s.id}"><header><span class="eyebrow">${c.short} · ${s.eb}</span><h2>${s.h}</h2>${s.p?`<p>${s.p}</p>`:''}</header>${s.b.map(blockHTML).join('')}${n[s.id]?`<div class="chk" data-ch="${k}" data-sec="${s.id}"><div class="chk-head"><h3>Check yourself</h3><span class="small muted">${n[s.id]} question${n[s.id]===1?'':'s'} on this section. Your answers are saved on this device and also appear in Self-test and Paper C.</span></div><div class="qz"></div></div>`:''}</section>`).join('');
  });
  const fx=$('#panel-sources .fixes');
  if(fx&&FIXES.length) fx.insertAdjacentHTML('beforeend',FIXES.map(f=>`<div class="note fix"><span class="tag">${f[0]}</span><p>${f[1]}</p></div>`).join(''));
}
/* explore figures (tap a part) and switch figures (choose a pattern) */
function xpSelect(fig,key){const m=XP[fig.id]; if(!m||!m[key]) return;
  $$('[data-k]',fig).forEach(el=>el.classList.toggle('on',el.getAttribute('data-k')===key));
  $$('[data-xk]',fig).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.xk===key)));
  $('.xp-detail',fig).innerHTML=`<b>${m[key][0]}</b><br>${m[key][1]}`;}
function swSelect(fig,key){const v=(SWV[fig.id]||[]).find(x=>x[0]===key); if(!v) return;
  $$('[data-v]',fig).forEach(el=>{el.style.display=el.getAttribute('data-v').split(' ').includes(key)?'':'none';});
  $$('[data-sv]',fig).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.sv===key)));
  $('.sw-detail',fig).innerHTML=v[2];}
function setupFigures(){
  document.addEventListener('click',e=>{
    const fig=e.target.closest('figure.dg'); if(!fig) return;
    if(fig.classList.contains('explore')){const b=e.target.closest('[data-xk]'), k=e.target.closest('[data-k]'); const key=b?b.dataset.xk:(k&&k.getAttribute('data-k')); if(key) xpSelect(fig,key);}
    else if(fig.classList.contains('sw')){const b=e.target.closest('[data-sv]'); if(b) swSelect(fig,b.dataset.sv);}
  });
  $$('figure.sw').forEach(f=>{const v=SWV[f.id]; if(v) swSelect(f,v[0][0]);});
  $$('.widget[data-widget]').forEach(h=>{const w=WIDGETS[h.dataset.widget]; if(w) w(h);});
}

/* ---------- interactive widgets ---------- */
const WIDGETS={
  /* Oxygen-haemoglobin dissociation curve with shifts */
  odc(host){
    host.innerHTML=`<figure class="dg"><div class="dg-head"><h3>Oxygen–haemoglobin dissociation curve</h3><span class="cap">Shift the curve and watch how much oxygen haemoglobin unloads in the tissues.</span></div>
      <div class="wg-ctl"><div class="seg" role="group" aria-label="Shift the curve"><button type="button" data-s="-1">Left shift</button><button type="button" data-s="0" aria-pressed="true">Normal</button><button type="button" data-s="1">Right shift</button></div>
      <label class="ex-check"><input type="checkbox" data-o="hbf"> Fetal Hb</label><label class="ex-check"><input type="checkbox" data-o="mb"> Myoglobin</label><label class="ex-check"><input type="checkbox" data-o="co"> CO poisoning</label></div>
      <div class="dg-fig"><svg viewBox="0 0 560 340" role="img" aria-label="Oxygen dissociation curve"></svg></div><div class="xp-detail" aria-live="polite"></div></figure>`;
    const svg=$('svg',host), det=$('.xp-detail',host); let shift=0; const on={};
    const X=p=>60+p*33.57, Y=s=>290-s*2.6, sat=(p,p50,n,max)=>(max||100)*Math.pow(p,n)/(Math.pow(p50,n)+Math.pow(p,n));
    const path=(p50,n,max)=>{let d=''; for(let p=0;p<=14.01;p+=0.25) d+=(p?'L':'M')+X(p).toFixed(1)+','+Y(sat(p,p50,n,max)).toFixed(1); return d;};
    function draw(){
      const p50=[2.7,3.5,4.6][shift+1], lung=sat(13.3,p50,2.7), tis=sat(5.3,p50,2.7);
      let s='<path d="M60,290 H540 M60,290 V24" stroke="var(--ink-2)" stroke-width="1.5" fill="none"/>';
      for(let p=0;p<=14;p+=2) s+=`<text x="${X(p)}" y="308" class="sm" text-anchor="middle">${p}</text>`;
      [0,25,50,75,100].forEach(v=>{s+=`<text x="52" y="${Y(v)+4}" class="sm" text-anchor="end">${v}</text><path d="M60,${Y(v)} H540" stroke="var(--line)" stroke-dasharray="3 4"/>`;});
      s+=`<text x="300" y="332" class="sm" text-anchor="middle">partial pressure of oxygen, PO₂ (kPa)</text><text x="18" y="160" class="sm" text-anchor="middle" transform="rotate(-90 18 160)">Hb saturation (%)</text>`;
      s+=`<path d="M${X(13.3)},290 V30 M${X(5.3)},290 V30" stroke="var(--line-2)" stroke-dasharray="5 4"/><text x="${X(13.3)}" y="22" class="sm" text-anchor="middle">lungs</text><text x="${X(5.3)}" y="22" class="sm" text-anchor="middle">resting tissue</text>`;
      if(shift) s+=`<path d="${path(3.5,2.7)}" fill="none" stroke="var(--muted)" stroke-width="2" stroke-dasharray="6 5"/>`;
      if(on.mb) s+=`<path d="${path(0.37,1)}" fill="none" stroke="var(--muscle)" stroke-width="2.5"/><text x="${X(1.2)}" y="${Y(84)}" class="sm" style="fill:var(--muscle)">myoglobin</text>`;
      if(on.hbf) s+=`<path d="${path(2.5,2.7)}" fill="none" stroke="var(--clin)" stroke-width="2.5"/><text x="${X(2.2)}" y="${Y(62)}" class="sm" text-anchor="end" style="fill:var(--clin)">HbF</text>`;
      if(on.co) s+=`<path d="${path(2.2,2.2,50)}" fill="none" stroke="var(--warn)" stroke-width="2.5"/><text x="${X(10)}" y="${Y(54)}" class="sm" style="fill:var(--warn)">50% carboxyhaemoglobin</text>`;
      s+=`<path d="${path(p50,2.7)}" fill="none" stroke="var(--artery)" stroke-width="3.5"/><circle cx="${X(13.3)}" cy="${Y(lung)}" r="5" style="fill:var(--artery)"/><circle cx="${X(5.3)}" cy="${Y(tis)}" r="5" style="fill:var(--vein)"/>`;
      s+=`<path d="M${X(p50)},290 V${Y(50)} H60" stroke="var(--accent)" stroke-dasharray="2 3" fill="none"/><text x="${X(p50)+6}" y="284" class="sm" style="fill:var(--accent)">P50 ${p50.toFixed(1)}</text>`;
      svg.innerHTML=s;
      const why=shift>0?'<b>Right shift</b> (lower affinity, easier unloading): raised CO₂, acid (low pH), raised 2,3-DPG, exercise and raised temperature. Remember "CADET, face Right". This is the Bohr effect in working tissue.':shift<0?'<b>Left shift</b> (higher affinity, Hb holds on to oxygen): low CO₂, high pH, low 2,3-DPG, low temperature, fetal haemoglobin, carbon monoxide and methaemoglobin.':'<b>Normal adult curve.</b> The sigmoid shape comes from cooperative binding: each O₂ that binds makes the next bind more easily (tense → relaxed state).';
      det.innerHTML=`${why}<br>P50 = ${p50.toFixed(1)} kPa. Saturation in the lungs ${Math.round(lung)}%, in resting tissue ${Math.round(tis)}%, so about <b>${Math.round(lung-tis)}%</b> of the oxygen is unloaded.`+(on.hbf?'<br><b>Fetal Hb</b> (α₂γ₂) binds 2,3-DPG poorly, so its curve sits to the left of the mother\'s and oxygen moves from maternal to fetal blood.':'')+(on.mb?'<br><b>Myoglobin</b> has one haem, so no cooperativity: a hyperbolic curve. It only releases oxygen at very low PO₂, acting as a store in muscle.':'')+(on.co?'<br><b>Carbon monoxide</b> binds Hb about 240 times more tightly than oxygen: it lowers the oxygen-carrying capacity (lower plateau) and shifts the curve left, so the oxygen still carried is released poorly. PaO₂ and pulse oximetry can look normal.':'');
    }
    host.addEventListener('click',e=>{const b=e.target.closest('[data-s]'); if(!b) return; shift=+b.dataset.s; $$('[data-s]',host).forEach(x=>x.setAttribute('aria-pressed',String(x===b))); draw();});
    host.addEventListener('change',e=>{const o=e.target.dataset.o; if(o){on[o]=e.target.checked; draw();}});
    draw();
  },
  /* Arterial blood gas interpreter */
  abg(host){
    const PRE=[['Normal',7.40,5.3,24,12.5],['DKA',7.12,2.9,8,13.5],['COPD flare',7.29,8.4,29,6.9],['Panic attack',7.52,3.2,23,14],['Vomiting',7.51,6.3,36,11.5],['Chronic COPD',7.37,7.6,33,7.8],['Opiate overdose',7.21,9.8,27,7.2],['Cardiac arrest',7.02,8.1,13,6.5]];
    host.innerHTML=`<figure class="dg"><div class="dg-head"><h3>Blood gas interpreter</h3><span class="cap">Type in a gas, or load an example, and see the reasoning step by step.</span></div>
      <div class="wg-ctl"><label>pH <input type="number" step="0.01" data-f="ph" value="7.40"></label><label>PaCO₂ (kPa) <input type="number" step="0.1" data-f="co2" value="5.3"></label><label>HCO₃⁻ (mmol/L) <input type="number" step="1" data-f="hco3" value="24"></label><label>PaO₂ (kPa) <input type="number" step="0.1" data-f="o2" value="12.5"></label></div>
      <div class="wg-ctl"><span class="small muted">Examples:</span>${PRE.map((p,i)=>`<button type="button" class="pbtn" data-p="${i}">${p[0]}</button>`).join('')}</div>
      <ol class="abg-out" aria-live="polite"></ol></figure>`;
    const out=$('.abg-out',host), f=k=>parseFloat($(`[data-f="${k}"]`,host).value);
    function run(){
      const ph=f('ph'), c=f('co2'), h=f('hco3'), o=f('o2'); if([ph,c,h].some(isNaN)){out.innerHTML='<li>Enter pH, PaCO₂ and HCO₃⁻.</li>'; return;}
      const cHi=c>6.0, cLo=c<4.7, hHi=h>26, hLo=h<22, L=[];
      L.push(ph<7.35?`<b>pH ${ph.toFixed(2)} is low: acidaemia.</b>`:ph>7.45?`<b>pH ${ph.toFixed(2)} is high: alkalaemia.</b>`:`<b>pH ${ph.toFixed(2)} is in the normal range</b> (7.35–7.45). Check whether CO₂ and bicarbonate are also normal: if not, something is being compensated.`);
      L.push(`PaCO₂ ${c} kPa is ${cHi?'<b>high</b> (acid is being retained by the lungs)':cLo?'<b>low</b> (acid is being blown off)':'normal'} (4.7–6.0). HCO₃⁻ ${h} mmol/L is ${hHi?'<b>high</b> (extra base)':hLo?'<b>low</b> (base used up or lost)':'normal'} (22–26).`);
      let dx='', why='';
      if(ph<7.35){
        if(cHi&&hLo){dx='Mixed respiratory and metabolic acidosis'; why='Both systems are pushing the pH down, e.g. cardiac arrest, or severe sepsis with exhaustion.';}
        else if(cHi){dx='Respiratory acidosis'+(hHi?' with metabolic compensation (the kidneys have retained bicarbonate, so the problem is chronic, or acute-on-chronic)':', uncompensated (acute)'); why='Causes: hypoventilation. COPD, severe asthma that is tiring, opiates or sedatives, neuromuscular weakness (Guillain–Barré, MND), obesity hypoventilation.';}
        else if(hLo){dx='Metabolic acidosis'+(cLo?' with respiratory compensation (hyperventilation is blowing off CO₂)':', uncompensated'); why='Next step: the anion gap. Raised gap: ketones (DKA), lactate (sepsis, shock), renal failure, toxins (salicylate, methanol). Normal gap: diarrhoea, renal tubular acidosis, Addison\'s.';}
        else {dx='Acidaemia with normal CO₂ and bicarbonate'; why='Check the numbers: this combination is unusual.';}
      } else if(ph>7.45){
        if(cLo&&hHi){dx='Mixed respiratory and metabolic alkalosis'; why='Both systems are pushing the pH up, e.g. hyperventilation plus vomiting or diuretics.';}
        else if(cLo){dx='Respiratory alkalosis'+(hLo?' with metabolic compensation (the kidneys have excreted bicarbonate)':', uncompensated (acute)'); why='Causes: hyperventilation. Anxiety, pain, hypoxia (PE, pneumonia, altitude), early salicylate poisoning, pregnancy.';}
        else if(hHi){dx='Metabolic alkalosis'+(cHi?' with respiratory compensation (breathing has slowed to retain CO₂)':', uncompensated'); why='Causes: loss of acid by vomiting, diuretics (loop, thiazide), hypokalaemia, Conn\'s or Cushing\'s.';}
        else {dx='Alkalaemia with normal CO₂ and bicarbonate'; why='Check the numbers: this combination is unusual.';}
      } else {
        if(!cHi&&!cLo&&!hHi&&!hLo){dx='Normal acid–base status'; why='';}
        else if(cHi&&hHi){dx=ph<7.40?'Fully compensated respiratory acidosis':'Fully compensated metabolic alkalosis'; why=ph<7.40?'The pH sits on the acid side of 7.40, so the original problem was CO₂ retention; raised bicarbonate takes days, so this is chronic (e.g. stable COPD).':'The pH sits on the alkaline side of 7.40, so the original problem was the metabolic alkalosis.';}
        else if(cLo&&hLo){dx=ph>7.40?'Fully compensated respiratory alkalosis':'Fully compensated metabolic acidosis'; why='The body never over-compensates, so the side of 7.40 the pH sits on tells you which problem came first.';}
        else {dx='Mixed disorder with a normal pH'; why='CO₂ and bicarbonate are abnormal in opposite directions, so two primary processes are cancelling out (e.g. salicylate poisoning: respiratory alkalosis plus metabolic acidosis).';}
      }
      L.push(`<b>Conclusion: ${dx}.</b>${why?' '+why:''}`);
      if(!isNaN(o)) L.push(o<8?`PaO₂ ${o} kPa is below 8: <b>respiratory failure, type ${c>6?'2 (with high CO₂: ventilation is failing)':'1 (CO₂ normal or low: a V/Q mismatch or diffusion problem)'}</b>.`:o<10?`PaO₂ ${o} kPa is low (hypoxaemia) but above the 8 kPa threshold for respiratory failure. Always interpret it against the inspired oxygen.`:`PaO₂ ${o} kPa is adequate (on air it should be above 10). If the patient is on oxygen, a "normal" value may still be too low for the amount given.`);
      out.innerHTML=L.map(x=>`<li>${x}</li>`).join('');
    }
    host.addEventListener('input',run);
    host.addEventListener('click',e=>{const b=e.target.closest('[data-p]'); if(!b) return; const p=PRE[+b.dataset.p]; ['ph','co2','hco3','o2'].forEach((k,i)=>{$(`[data-f="${k}"]`,host).value=p[i+1];}); run();});
    run();
  },
  /* Break a hormone axis and see what the blood tests do */
  hormone(host){
    const AX={
      thyroid:{name:'Thyroid (HPT) axis',h:['TRH','TSH','T4 / T3'],sc:[
        ['Normal',[0,0,0],'TRH drives TSH, TSH drives T4 and T3, and T4/T3 feed back to switch both off.'],
        ['Primary hypothyroidism (Hashimoto\'s, iodine deficiency, after thyroidectomy)',[1,1,-1],'The gland has failed, so T4 is low. With no negative feedback the pituitary pushes harder: TSH is high. TSH is the most sensitive test.'],
        ['Secondary hypothyroidism (pituitary failure)',[1,-1,-1],'The pituitary cannot make TSH, so the healthy thyroid is not stimulated. Low T4 with a low or inappropriately normal TSH.'],
        ['Graves\' disease',[-1,-1,1],'Antibodies stimulate the TSH receptor, so the gland ignores the pituitary. T4 and T3 are high and feedback suppresses TSH to undetectable.'],
        ['TSH-secreting pituitary adenoma (rare)',[-1,1,1],'The tumour ignores feedback: T4 is high and TSH is high or inappropriately normal.'],
        ['Too much levothyroxine',[-1,-1,1],'Exogenous T4 suppresses TSH. A suppressed TSH in someone on levothyroxine means the dose is too high.']]},
      adrenal:{name:'Adrenal (HPA) axis',h:['CRH','ACTH','Cortisol'],sc:[
        ['Normal',[0,0,0],'CRH drives ACTH, ACTH drives cortisol from the zona fasciculata, and cortisol feeds back on both.'],
        ['Addison\'s disease (primary adrenal failure)',[1,1,-1],'The cortex is destroyed, so cortisol and aldosterone are low. ACTH is high, and the excess ACTH (made from POMC along with MSH) causes pigmentation. Low Na⁺, high K⁺.'],
        ['Secondary adrenal insufficiency (pituitary disease, or stopping long-term steroids suddenly)',[0,-1,-1],'Low ACTH means low cortisol. No pigmentation, and aldosterone is preserved because it is controlled by renin–angiotensin, so potassium is normal.'],
        ['Cushing\'s disease (pituitary ACTH adenoma)',[-1,1,1],'The adenoma makes ACTH, driving both adrenals. Cortisol is high. A high-dose dexamethasone test partly suppresses it.'],
        ['Adrenal adenoma making cortisol',[-1,-1,1],'Cortisol is high and feedback suppresses ACTH to undetectable. The other adrenal shrinks.'],
        ['Ectopic ACTH (small cell lung cancer)',[-1,1,1],'Very high ACTH from the tumour, not suppressed by dexamethasone. Often pigmentation and low potassium.'],
        ['Long-term prednisolone',[-1,-1,-1],'The drug provides glucocorticoid action (so Cushingoid features), but suppresses CRH and ACTH, so the patient\'s own cortisol is low and the adrenals atrophy. Never stop suddenly.']]},
      gonad:{name:'Gonadal (HPG) axis',h:['GnRH','LH / FSH','Testosterone or oestrogen'],sc:[
        ['Normal',[0,0,0],'Pulsatile GnRH drives LH and FSH; sex steroids (and inhibin, for FSH) feed back.'],
        ['Primary (hypergonadotropic) hypogonadism: menopause, Turner, Klinefelter, mumps orchitis',[1,1,-1],'The gonad has failed. Sex steroids are low and LH and FSH are high because feedback is lost.'],
        ['Secondary (hypogonadotropic) hypogonadism: Kallmann, pituitary tumour, anorexia, heavy exercise',[-1,-1,-1],'The drive from above is missing: low LH and FSH, so low sex steroids.'],
        ['Prolactinoma',[-1,-1,-1],'Prolactin inhibits GnRH release: low LH and FSH, low sex steroids. Amenorrhoea, galactorrhoea, loss of libido, infertility.'],
        ['Anabolic steroid (exogenous testosterone) use',[-1,-1,1],'Blood testosterone is high, but LH and FSH are suppressed, so the testes stop making their own testosterone and sperm: testicular atrophy and infertility.'],
        ['Combined oral contraceptive pill',[-1,-1,1],'Exogenous oestrogen and progestogen suppress GnRH, FSH and LH: no follicle matures and there is no LH surge, so no ovulation.']]}};
    host.innerHTML=`<figure class="dg"><div class="dg-head"><h3>Break the axis: what happens to the blood tests?</h3><span class="cap">Pick an axis and a problem. Predict the three hormone levels before you look.</span></div>
      <div class="wg-ctl"><label>Axis <select data-ax>${Object.keys(AX).map(k=>`<option value="${k}">${AX[k].name}</option>`).join('')}</select></label><label>Scenario <select data-sc></select></label><button type="button" class="pbtn" data-hide aria-pressed="false">Hide levels until I guess</button></div>
      <div class="hx-tiles"></div><div class="xp-detail" aria-live="polite"></div></figure>`;
    const ax=$('[data-ax]',host), sc=$('[data-sc]',host), tiles=$('.hx-tiles',host), det=$('.xp-detail',host), hb=$('[data-hide]',host); let hide=false, shown=true;
    const where=['Hypothalamus','Anterior pituitary','Target gland'], A=['↓ low','→ normal','↑ high'], C=['down','flat','up'];
    function fill(){sc.innerHTML=AX[ax.value].sc.map((s,i)=>`<option value="${i}">${s[0]}</option>`).join(''); draw(true);}
    function draw(reset){const a=AX[ax.value], s=a.sc[+sc.value]; if(reset) shown=!hide;
      tiles.innerHTML=a.h.map((h,i)=>`<div class="hx-tile ${shown?C[s[1][i]+1]:''}"><span class="eyebrow">${where[i]}</span><b>${h}</b><span class="hx-v">${shown?A[s[1][i]+1]:'?'}</span></div>`).join('')+(shown?'':'<button type="button" class="btn" data-show>Show the answer</button>');
      det.innerHTML=shown?s[2]:'Decide whether each hormone is high, normal or low, then show the answer.';}
    ax.addEventListener('change',fill); sc.addEventListener('change',()=>draw(true));
    host.addEventListener('click',e=>{if(e.target.closest('[data-show]')){shown=true; draw();} else if(e.target.closest('[data-hide]')){hide=!hide; hb.setAttribute('aria-pressed',String(hide)); draw(true);}});
    fill();
  }
};

/* ================= UNOFFICIAL SPEC ================= */
function specHash(s){let h=5381; for(let i=0;i<s.length;i++) h=((h<<5)+h+s.charCodeAt(i))>>>0; return h.toString(36);}
let specSt=LS.get('bio-spec',{});
const SPECS=(window.SPEC||[]).filter(c=>PANELS.includes(c.ch));
SPECS.forEach((c,ci)=>c.groups.forEach((g,gi)=>{g.items=g.items.map((it,ii)=>{const text=Array.isArray(it)?it[0]:it; return {text,tag:Array.isArray(it)?it[1]:'',id:c.ch+':'+specHash(text),num:`${ci+1}.${gi+1}.${ii+1}`};});}));
function specCount(c){const n=[0,0,0,0]; c.groups.forEach(g=>g.items.forEach(it=>{n[specSt[it.id]||0]++;})); return n;}
const specBar=n=>{const t=n[0]+n[1]+n[2]+n[3]||1; return `<span class="spec-bar" aria-hidden="true"><i class="g" style="width:${n[3]/t*100}%"></i><i class="a" style="width:${n[2]/t*100}%"></i><i class="r" style="width:${n[1]/t*100}%"></i></span>`;};
function renderSpec(){
  const host=$('#spec-app'); if(!host||!SPECS.length) return;
  const TAG={c:'Clinical link',d:'Drug',x:'Data or calculation'};
  const total=SPECS.reduce((a,c)=>a+c.groups.reduce((b,g)=>b+g.items.length,0),0);
  host.innerHTML=`<div class="spec-top"><div class="spec-sum"></div>
    <div class="spec-tools"><label class="sel-wrap">Show <select id="spec-filter" class="sel"><option value="all">Everything</option><option value="0">Not rated yet</option><option value="work">Needs work (red or amber)</option><option value="3">Solid (green)</option><option value="c">Clinical links only</option><option value="d">Drugs only</option></select></label>
      <input type="search" class="search" id="spec-search" placeholder="Filter the spec, e.g. feedback, ECG, diuretic" aria-label="Filter the spec">
      <button type="button" class="btn ghost" data-sp="open">Expand all</button><button type="button" class="btn ghost" data-sp="close">Collapse all</button><button type="button" class="btn ghost" data-sp="print">Print</button><button type="button" class="btn ghost" data-sp="reset">Reset ratings</button></div>
    <p class="small muted">Rate each point honestly: <span class="rk r">✗</span> cannot explain it yet, <span class="rk a">~</span> shaky, <span class="rk g">✓</span> could teach it. Tap a rating again to clear it. "Notes" jumps to the section that covers it. Ratings are saved on this device.</p></div>
    ${SPECS.map((c,ci)=>`<details class="spec-ch" data-ch="${c.ch}"><summary><span class="num">${ci+1}</span><b>${esc(c.title)}</b><span class="spec-prog"></span></summary>
      ${c.groups.map((g,gi)=>`<div class="spec-g"><div class="spec-gh"><h3>${ci+1}.${gi+1} ${esc(g.t)}</h3>${g.sec?`<a href="#${g.sec}" class="small">Notes →</a>`:''}</div>
        <ul class="spec-items">${g.items.map(it=>`<li data-id="${it.id}" data-tag="${it.tag}"><span class="num">${it.num}</span><span class="tx">${it.text}${it.tag?` <span class="stag ${it.tag}">${TAG[it.tag]}</span>`:''}</span><span class="rate" role="group" aria-label="Confidence"><button type="button" data-r="1" aria-label="Cannot explain it yet">✗</button><button type="button" data-r="2" aria-label="Shaky">~</button><button type="button" data-r="3" aria-label="Solid">✓</button></span></li>`).join('')}</ul></div>`).join('')}</details>`).join('')}`;
  const sel=$('#spec-filter',host), q=$('#spec-search',host);
  function paint(){
    const all=[0,0,0,0];
    SPECS.forEach(c=>{const n=specCount(c); n.forEach((v,i)=>{all[i]+=v;}); const t=n[0]+n[1]+n[2]+n[3];
      $(`.spec-ch[data-ch="${c.ch}"] .spec-prog`,host).innerHTML=`${specBar(n)}<span class="cnt">${n[3]}/${t} solid</span>`;});
    $('.spec-sum',host).innerHTML=`<div class="ex-big"><span>${Math.round(all[3]/total*100)}%</span><small>${all[3]} of ${total} points solid</small></div><div class="spec-sumbar">${specBar(all)}<span class="small muted">${all[3]} solid · ${all[2]} shaky · ${all[1]} not yet · ${all[0]} unrated</span></div>`;
    $$('.spec-items li',host).forEach(li=>{const r=specSt[li.dataset.id]||0; li.className=r?'r'+r:''; $$('[data-r]',li).forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.r===r)));});
    document.dispatchEvent(new CustomEvent('spec-update'));
  }
  function filter(){
    const f=sel.value, s=q.value.trim().toLowerCase(), active=f!=='all'||!!s;
    $$('.spec-ch',host).forEach(d=>{let any=false;
      $$('.spec-g',d).forEach(g=>{let gAny=false; const gt=$('h3',g).textContent.toLowerCase();
        $$('li',g).forEach(li=>{const r=specSt[li.dataset.id]||0;
          const okF=f==='all'||(f==='work'&&(r===1||r===2))||(f==='0'&&r===0)||(f==='3'&&r===3)||((f==='c'||f==='d')&&li.dataset.tag===f);
          const okS=!s||li.textContent.toLowerCase().includes(s)||gt.includes(s);
          li.hidden=!(okF&&okS); if(!li.hidden) gAny=true;});
        g.hidden=!gAny; if(gAny) any=true;});
      d.hidden=!any; if(active) d.open=any;});
  }
  host.addEventListener('click',e=>{
    const r=e.target.closest('[data-r]'), sp=e.target.closest('[data-sp]');
    if(r){const id=r.closest('li').dataset.id, v=+r.dataset.r; if(specSt[id]===v) delete specSt[id]; else specSt[id]=v; LS.set('bio-spec',specSt); paint(); return;}
    if(!sp) return; const a=sp.dataset.sp;
    if(a==='open'||a==='close') $$('.spec-ch',host).forEach(d=>{d.open=a==='open';});
    else if(a==='print'){$$('.spec-ch',host).forEach(d=>{d.open=true;}); window.print();}
    else if(a==='reset'){if(sp.dataset.armed){specSt={}; LS.set('bio-spec',specSt); delete sp.dataset.armed; sp.textContent='Reset ratings'; paint(); filter();} else {sp.dataset.armed='1'; sp.textContent='Click again to clear all ratings';}}
  });
  sel.addEventListener('change',filter); q.addEventListener('input',filter);
  const cur=SPECS.find(c=>c.ch===LS.get('bio-tab','')); const first=$(`.spec-ch[data-ch="${cur?cur.ch:SPECS[0].ch}"]`,host); if(first) first.open=true;
  paint();
}

/* ---------- home: chapter grid ---------- */
const BLURB={msk:'Bone, calcium, muscle, cartilage, NSAIDs and imaging.',blood:'Blood cells, haemostasis in four acts, and wound healing.',immune:'Lymphatics, innate and adaptive immunity, complement, antibodies, vaccines.',infect:'Microbes, diagnosis, antimicrobials, infection control, fever.'};
function renderHome(){
  const g=$('#home-grid'); if(!g) return;
  const card=(k,i)=>{const c=CH[k]||{}, sp=SPECS.find(x=>x.ch===k), n=sp?specCount(sp):null, t=n?n[0]+n[1]+n[2]+n[3]:0, secs=$$('#panel-'+k+' .sec').length;
    return `<button type="button" class="home-card" data-tab="${k}"><span class="num">${i+1}</span><b>${esc(NAMES[k])}</b><span class="small">${esc(c.blurb||BLURB[k]||'')}</span>${n?specBar(n):''}<span class="small muted">${secs} sections${n?` · ${n[3]} of ${t} spec points solid`:''}</span></button>`;};
  g.innerHTML=SYSTEMS.map(card).join('')+
    `<button type="button" class="home-card alt" data-tab="spec"><span class="num">✓</span><b>Unofficial spec</b><span class="small">Every point you need to know, block by block, with a red, amber, green tracker.</span></button>
     <button type="button" class="home-card alt" data-tab="test"><span class="num">?</span><b>Self-test</b><span class="small">Pathway drills, flashcards and quick questions for every chapter.</span></button>
     <button type="button" class="home-card alt" data-tab="exam"><span class="num">⏱</span><b>Exam papers</b><span class="small">Three timed or untimed papers, plus custom sets by topic.</span></button>`;
}

/* ---------- search across every chapter ---------- */
function setupSearch(){
  const inp=$('#site-search'), box=$('#search-results'); if(!inp||!box) return;
  const idx=[];
  $$('.panel').forEach(p=>{const ch=NAMES[p.dataset.panel]||'';
    $$('.sec',p).forEach(s=>{const h2=$('h2',s); if(!h2) return; const sec=h2.textContent;
      idx.push({t:sec,k:'Section',ch,el:s,w:3});
      $$('h3,h4',s).forEach(h=>{const pw=h.closest('.pw'); const t=pw?h.lastChild.textContent:h.textContent; if(t&&t.length>2&&!h.closest('.chk-head')) idx.push({t,k:pw?'Pathway':h.closest('.dg')?'Diagram':'Topic',ch,sec,el:h,w:2});});
      $$('tbody th',s).forEach(th=>{const t=th.textContent.trim(); if(t.length>2&&t.length<70) idx.push({t,k:'Table row',ch,sec,el:th,w:1});});});});
  SPECS.forEach(c=>c.groups.forEach(g=>g.items.forEach(it=>{idx.push({t:it.text.replace(/<[^>]+>/g,''),k:'Spec point',ch:'Spec',sec:c.title,spec:it.id,w:0});})));
  idx.forEach(x=>{x.l=x.t.toLowerCase();});
  let res=[], cur=-1;
  function run(){
    const q=inp.value.trim().toLowerCase(); if(q.length<2){box.hidden=true; return;}
    const toks=q.split(/\s+/);
    res=idx.filter(x=>toks.every(t=>x.l.includes(t))).map(x=>({x,s:x.w*10+(x.l.startsWith(toks[0])?8:0)+(x.l===q?20:0)-Math.min(x.l.length,80)/40})).sort((a,b)=>b.s-a.s).slice(0,14).map(r=>r.x);
    cur=-1;
    box.innerHTML=res.length?res.map((x,i)=>`<button type="button" class="sr" data-i="${i}"><b>${esc(x.t.length>90?x.t.slice(0,90)+'…':x.t)}</b><span>${x.k} · ${esc(x.ch)}${x.sec?' › '+esc(x.sec):''}</span></button>`).join(''):'<p class="small muted" style="padding:10px 12px">No matches. Try a shorter word.</p>';
    box.hidden=false;
  }
  function pick(i){const x=res[i]; if(!x) return; box.hidden=true; inp.blur();
    if(x.spec){showTab('spec'); const li=$(`#spec-app li[data-id="${x.spec}"]`); if(li){li.hidden=false; const g=li.closest('.spec-g'), d=li.closest('details'); if(g) g.hidden=false; if(d){d.hidden=false; d.open=true;} requestAnimationFrame(()=>{li.scrollIntoView({block:'center'}); li.classList.remove('flash'); void li.offsetWidth; li.classList.add('flash');});}}
    else goTo(x.el);}
  inp.addEventListener('input',run); inp.addEventListener('focus',run);
  inp.addEventListener('keydown',e=>{
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault(); const b=$$('.sr',box); if(!b.length) return; cur=(cur+(e.key==='ArrowDown'?1:-1)+b.length)%b.length; b.forEach((x,i)=>x.classList.toggle('on',i===cur));}
    else if(e.key==='Enter'){e.preventDefault(); pick(cur<0?0:cur);} else if(e.key==='Escape'){box.hidden=true; inp.blur();}});
  box.addEventListener('click',e=>{const b=e.target.closest('.sr'); if(b) pick(+b.dataset.i);});
  document.addEventListener('click',e=>{if(!e.target.closest('.top-search')) box.hidden=true;});
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!(e.target.matches&&e.target.matches('input,textarea,select'))){e.preventDefault(); inp.focus();}});
}

/* ---------- Anki export ---------- */
function buildAnki(){
  const ta=$('#anki-text'); if(!ta) return;
  const clean=s=>String(s).replace(/[\t\r\n]+/g,' ').trim();
  const lines=[];
  QUIZ.forEach(q=>{const front=q.type==='sba'?`${q.q}<br>${q.o.map((o,i)=>'ABCDE'[i]+'. '+o).join('<br>')}`:q.q;
    const ans=q.type==='sba'?`${'ABCDE'[q.a]}. ${q.o[q.a]}`:(MODEL[q.id]||''); lines.push(clean(front)+'\t'+clean(`<b>${ans}</b><br>${q.e}`));});
  const P=window.EXAM_PAPERS||{};
  Object.keys(P).sort().forEach(k=>P[k].qs.forEach(q=>{const front=q.type==='sba'?`${q.q}<br>${q.o.map((o,i)=>'ABCDE'[i]+'. '+o).join('<br>')}`:q.q;
    const ans=q.type==='sba'?`${'ABCDE'[q.a]}. ${q.o[q.a]}`:q.m; lines.push(clean(front)+'\t'+clean(`<b>${ans}</b><br>${q.e}`));}));
  FLIPS.forEach(f=>lines.push(clean(f[1])+'\t'+clean(f[2])));
  Object.values(PATHWAYS).forEach(P=>lines.push(clean(`Pathway: ${P.t}. List the ${P.steps.length} steps in order.${P.mn?' ('+P.mn+')':''}`)+'\t'+clean(P.steps.map((s,i)=>`${i+1}. ${s[0]}`).join('<br>'))));
  ta.value=lines.join('\n');
  const msg=$('#anki-msg');
  $('#anki-copy').addEventListener('click',()=>{
    const done=()=>{msg.textContent=`Copied ${lines.length} cards.`;};
    const fallback=()=>{ta.focus(); ta.select(); let ok=false; try{ok=document.execCommand('copy');}catch(e){} msg.textContent=ok?`Copied ${lines.length} cards.`:'Text selected below: press Ctrl+C or Cmd+C to copy.';};
    try{ navigator.clipboard.writeText(ta.value).then(done,fallback); }catch(e){ fallback(); }
  });
  msg.textContent=`${lines.length} cards ready.`;
}

/* ---------- Year 1 timeline: mark the current block ---------- */
(function(){const t=new Date(); t.setHours(12,0,0,0);
  $$('.blk[data-s]').forEach(b=>{const s=new Date(b.dataset.s+'T00:00:00'), e=new Date(b.dataset.e+'T23:59:59');
    if(t>e) b.classList.add('done'); else if(t>=s){b.classList.add('now'); const h=$('b',b); if(h) h.textContent+=' · now';}});
})();

/* ---------- init ---------- */
prepQuestions(); buildNav(); renderChapters(); renderPathways(); setupDiagrams(); renderTrees(); renderMinis(); setupTableFilters(); setupFigures(); drawChecks();
renderFlips(); renderDrills(); renderQuiz(); renderExam(); renderSpec(); renderHome(); buildAnki(); setupSearch();
document.addEventListener('spec-update',renderHome);
route(location.hash);
window.addEventListener('hashchange',()=>route(location.hash));
if(document.fonts&&document.fonts.ready) document.fonts.ready.then(renderTrees);
})();
