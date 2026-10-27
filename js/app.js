/* ================= APP ================= */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}},del(k){try{localStorage.removeItem(k);}catch(e){}}};
const shuffle=a=>{a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a;};

/* ---------- tabs, rail, routing ---------- */
const PANELS=['start','msk','blood','immune','infect','test','exam','sources'];
const NAMES={start:'Start here',msk:'MSK biomed',blood:'Blood & healing',immune:'Immunity',infect:'Infection & drugs',test:'Self-test',exam:'Exam papers',sources:'Sources'};
let io=null, current=null;
function buildRail(tab){
  const panel=$('#panel-'+tab), secs=$$('.sec',panel).filter(s=>s.id);
  const ol=$('#rail-list'), sel=$('#toc-select');
  ol.innerHTML=''; sel.innerHTML='';
  secs.forEach(s=>{const h=$('h2',s), t=h?h.textContent:s.id;
    const li=document.createElement('li'); li.innerHTML=`<a href="#${s.id}" data-id="${s.id}">${esc(t)}</a>`; ol.appendChild(li);
    const o=document.createElement('option'); o.value=s.id; o.textContent=t; sel.appendChild(o);});
  $('#rail-title').textContent=NAMES[tab];
  if(io) io.disconnect();
  if('IntersectionObserver' in window){
    io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){$$('#rail-list a').forEach(a=>a.classList.toggle('on',a.dataset.id===e.target.id)); if(sel.value!==e.target.id) sel.value=e.target.id;}});},{rootMargin:'-15% 0px -70% 0px'});
    secs.forEach(s=>io.observe(s));
  }
}
function setHash(h){try{history.replaceState(null,'','#'+h);}catch(e){}}
function showTab(tab,anchor){
  if(!PANELS.includes(tab)) tab='start';
  if(current!==tab){
    $$('.tab').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.tab===tab)));
    $$('.panel').forEach(p=>{p.hidden=(p.dataset.panel!==tab);});
    document.body.classList.toggle('wide',tab==='exam');
    buildRail(tab); current=tab; LS.set('bio-tab',tab);
  }
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
$$('.tab').forEach(b=>b.addEventListener('click',()=>{showTab(b.dataset.tab); try{b.scrollIntoView({inline:'center',block:'nearest'});}catch(e){}}));
document.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="#"]'); if(!a) return;
  const h=a.getAttribute('href').slice(1); if(!h) return;
  e.preventDefault(); route(h);
});
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
    DRAG={li,list,sy:e.pageY,y:e.clientY,active:false,raf:0,done:changed};
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
      if(!DRAG.active){ if(Math.abs(e.pageY-DRAG.sy)<5) return; DRAG.active=true; DRAG.li.classList.add('dragging'); DRAG.list.classList.add('is-dragging'); $$('.sel',DRAG.list).forEach(x=>x.classList.remove('sel')); DRAG.raf=requestAnimationFrame(auto); }
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
  host.innerHTML=`<div class="tree-box"><div class="scroll-x"><svg class="tree-svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="group" aria-label="Haematopoiesis flowchart">${links}${boxes}</svg></div><div class="tdetail" aria-live="polite">Tap any cell for details. Red: myeloid line. Green: lymphoid line.</div></div>`;
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
const FTAG={msk:'MSK',blood:'Blood & healing',immune:'Immunity',infect:'Infection & drugs'};
function renderFlips(){
  const g=$('#flip-grid'), solo=$('#flip-solo'); if(!g) return;
  let filter='all', list=FLIPS.slice(), mode='grid', queue=[], known=0, total=0;
  const pick=()=>FLIPS.filter(f=>filter==='all'||f[0]===filter);
  const draw=()=>{
    list=list.filter(f=>filter==='all'||f[0]===filter);
    g.innerHTML=list.map(f=>`<button type="button" class="flip" aria-expanded="false"><span class="tagline">${FTAG[f[0]]||f[0]}</span><span class="q">${esc(f[1])}</span><span class="a">${esc(f[2])}</span></button>`).join('');
    $('#flip-count').textContent=`${list.length} cards`;
  };
  function soloStart(){queue=shuffle(pick()); known=0; total=queue.length; soloDraw();}
  function soloDraw(){
    if(!queue.length){solo.innerHTML=`<div class="solo-card done"><p class="solo-q">Deck finished.</p><p class="muted">You knew ${known} of ${total} first time. Cards you missed came back until you got them.</p><button type="button" class="btn" data-s="again">Go again</button></div>`; return;}
    const f=queue[0];
    solo.innerHTML=`<div class="solo-meta"><span>${total-queue.length} of ${total} done · ${known} known first time</span><span class="tagline">${FTAG[f[0]]||f[0]}</span></div>
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
  $$('#flip-filter .pbtn').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.f; $$('#flip-filter .pbtn').forEach(x=>x.setAttribute('aria-pressed',String(x===b))); list=pick(); if(mode==='solo') soloStart(); draw();}));
  $$('#flip-mode button').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.v; $$('#flip-mode button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
    g.hidden=mode!=='grid'; solo.hidden=mode!=='solo'; $('#flip-reset').hidden=mode!=='grid'; if(mode==='solo') soloStart();}));
  draw();
}

/* ---------- pathway drills ---------- */
function renderDrills(){
  const list=$('#drill-list'), stage=$('#drill-stage'); if(!list) return;
  let filter='all', active=null;
  const ids=Object.keys(PATHWAYS);
  const BLK={start:'Start',msk:'MSK',blood:'Blood & healing',immune:'Immunity',infect:'Infection'};
  const visible=()=>ids.filter(id=>{const P=PATHWAYS[id]; if(filter==='all') return true; if(filter==='todo') return drillDone[id]!==true; return P.blk===filter;});
  function draw(){
    list.innerHTML=visible().map(id=>{const P=PATHWAYS[id], d=drillDone[id]; return `<li><button type="button" class="drill-btn${id===active?' on':''}" data-id="${id}" style="--pwc:${PWC[P.k]}"><span class="dot"></span><span class="dt">${esc(P.t)}</span><span class="db">${BLK[P.blk]||''} · ${P.steps.length} steps${d===true?' · <span class="tick">perfect</span>':d?' · done':''}</span></button></li>`;}).join('')||'<li class="muted small" style="padding:8px">Every pathway here is perfect. Try them again in a week.</li>';
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
  $$('#drill-filter .pbtn').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.f; $$('#drill-filter .pbtn').forEach(x=>x.setAttribute('aria-pressed',String(x===b))); draw();}));
  const rnd=$('#drill-random'); if(rnd) rnd.addEventListener('click',()=>{const v=visible().filter(id=>id!==active); if(v.length) open(v[Math.floor(Math.random()*v.length)]);});
  document.addEventListener('drill-update',draw);
  draw();
}

/* ---------- quick questions ---------- */
const norm=s=>String(s).toLowerCase().replace(/[^a-z0-9]/g,'');
function matchGroups(groups,ans,no){const n=norm(ans); if(!n) return false; if(no&&no.some(w=>n.includes(norm(w)))) return false; return groups.every(g=>g.split('|').some(a=>n.includes(norm(a))));}
function renderQuiz(){
  const list=$('#qz-list'); if(!list) return;
  let st=LS.get('bio-quiz',{}), filter='all';
  const L='ABCDE';
  function score(){const v=Object.values(st), n=v.length, c=v.filter(x=>x.ok).length; $('#qz-score').textContent=n?`${n} of ${QUIZ.length} answered · ${c} correct (${Math.round(c/n*100)}%)`:`0 of ${QUIZ.length} answered`;}
  function expl(q,ok){const ans=q.type==='sba'?`${L[q.a]}. ${q.o[q.a]}`:MODEL[q.id]||'';
    return `<div class="expl"><span class="verdict ${ok?'ok':'no'}">${ok?'Correct.':'Not quite.'}</span><span><b>Answer:</b> ${esc(ans)}</span><span>${esc(q.e)}</span></div>`;}
  function card(q){
    const s=st[q.id], tag=q.type==='sba'?'Single best answer':'Very short answer', cat=q.c==='msk'?'MSK':'Immune & lymphatic';
    let body='';
    if(q.type==='sba'){
      body=`<div class="opts">${q.o.map((o,i)=>{let cls=''; if(s){ if(i===q.a) cls='right'; else if(i===s.a) cls='wrong'; }
        return `<button class="opt ${cls}" data-i="${i}" ${s?'disabled':''}><span class="l">${L[i]}</span><span>${esc(o)}</span></button>`;}).join('')}</div>`;
    } else {
      body=`<div class="vsaq"><input type="text" id="v-${q.id}" placeholder="Type 1–3 words" aria-label="Your answer" value="${s?esc(s.a):''}" ${s?'disabled':''}><button class="btn" data-act="check" ${s?'disabled':''}>Check</button><button class="btn ghost" data-act="reveal" ${s?'disabled':''}>Show answer</button></div>`;
    }
    return `<div class="q" data-id="${q.id}"><div class="qhead"><span class="qtype">${tag}</span><span class="qtype">${cat}</span></div><p class="stem">${esc(q.q)}</p>${body}${s?expl(q,s.ok):''}</div>`;
  }
  function draw(){
    const qs=QUIZ.filter(q=>filter==='all'||q.c===filter||(filter==='wrong'&&st[q.id]&&!st[q.id].ok));
    list.innerHTML=qs.length?qs.map(card).join(''):`<p class="muted">${filter==='wrong'?'No wrong answers saved yet. Answer some questions first.':'No questions here.'}</p>`;
    score();
  }
  list.addEventListener('click',e=>{
    const qEl=e.target.closest('.q'); if(!qEl) return; const q=QUIZ.find(x=>x.id===qEl.dataset.id); if(st[q.id]) return;
    const opt=e.target.closest('.opt'), act=e.target.closest('[data-act]');
    if(opt){const i=+opt.dataset.i; st[q.id]={a:i,ok:i===q.a};}
    else if(act){const v=$('input',qEl).value; if(act.dataset.act==='check'&&!v.trim()){ $('input',qEl).focus(); return; }
      st[q.id]={a:v,ok:act.dataset.act==='check'&&matchGroups(q.req,v)};}
    else return;
    LS.set('bio-quiz',st); qEl.outerHTML=card(q); score();
  });
  list.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('.vsaq input')){const b=e.target.parentElement.querySelector('[data-act="check"]'); if(b) b.click();}});
  $$('#qz-filter .pbtn').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.f; $$('#qz-filter .pbtn').forEach(x=>x.setAttribute('aria-pressed',String(x===b))); draw();}));
  const rb=$('#qz-reset'), rm=$('#qz-reset-msg'); let armed=false;
  rb.addEventListener('click',()=>{ if(!armed){armed=true; rb.textContent='Click again to clear'; rm.textContent=''; setTimeout(()=>{armed=false; rb.textContent='Clear my answers';},4000); return;}
    armed=false; st={}; LS.set('bio-quiz',st); rb.textContent='Clear my answers'; rm.textContent='Answers cleared.'; draw(); });
  draw();
}

/* ================= EXAM PAPERS ================= */
const TOPICS={haem:['Haemostasis & blood','haemostasis'],wound:['Wound healing','wound'],inflam:['Inflammation','inflammation'],innate:['Innate immunity','innate'],
  compl:['Complement','complement'],lymph:['Lymphatic system','lymph'],adapt:['Adaptive immunity','adaptive'],ab:['Antibodies','antibodies'],
  hyper:['Hypersensitivity, autoimmunity & transplant','hypersens'],idef:['Immunodeficiency & HIV','hypersens'],vacc:['Vaccines & herd immunity','vaccines'],
  micro:['Microbes & pathogenesis','micro'],path:['Pathogens & the immune response','pathogens'],diag:['Diagnosing infection','diagnosis'],
  drug:['Antimicrobials','antimicrobials'],ipc:['Infection control, sepsis & fever','ipc']};
const fmt=ms=>{ms=Math.max(0,Math.round(ms/1000)); const h=Math.floor(ms/3600), m=Math.floor(ms%3600/60), s=ms%60; return (h?h+':'+String(m).padStart(2,'0'):m)+':'+String(s).padStart(2,'0');};
const LETTER='ABCDE';
function renderExam(){
  const root=$('#exam-app'); if(!root) return;
  const PAPERS=window.EXAM_PAPERS||{};
  const pool=[], byId={};
  Object.keys(PAPERS).sort().forEach(k=>PAPERS[k].qs.forEach((q,i)=>{q.id=k+(i+1); q.paper=k; q.n=i+1; pool.push(q); byId[q.id]=q;}));
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
        <aside class="ex-side"><details class="ex-navbox" open><summary>Question map <span class="small muted" id="ex-mapsum"></span></summary><div class="ex-grid" id="ex-grid"></div>
          <div class="ex-legend small muted"><span><i class="lg cur"></i>current</span><span><i class="lg ans"></i>answered</span><span><i class="lg flag"></i>flagged</span>${S.set.fb==='each'?'<span><i class="lg ok"></i>right</span><span><i class="lg no"></i>wrong</span>':''}</div></details>
          <p class="small muted ex-keys">Keys: <kbd>A</kbd>–<kbd>E</kbd> or <kbd>1</kbd>–<kbd>5</kbd> choose · <kbd>Enter</kbd> ${S.set.fb==='each'?'check / next':'next'} · <kbd>←</kbd> <kbd>→</kbd> move · <kbd>F</kbd> flag</p></aside></div></div>`;
    root.onchange=null;
    root.onclick=onRunClick;
    root.oninput=e=>{if(e.target.id==='ex-saq'){const q=byId[S.ids[S.cur]]; if(S.lock[q.id]) return; S.ans[q.id]=e.target.value; save(); grid();}};
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
    const typing=e.target.matches('input,textarea,select');
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
renderPathways(); setupDiagrams(); renderTrees(); renderMinis(); setupTableFilters(); renderFlips(); renderDrills(); renderQuiz(); renderExam(); buildAnki();
route(location.hash);
window.addEventListener('hashchange',()=>route(location.hash));
if(document.fonts&&document.fonts.ready) document.fonts.ready.then(renderTrees);
})();
