/* RECALL MODE
   Blurs the answers in every table, topic card, key-value list and step list inside the chapters, leaving only the
   headings readable. Tap a blurred item to reveal it, a row or column heading to reveal that line, or a card title for
   the whole card. Each table can also be filled in: type your answers into the empty cells, then "Show answers" puts
   the real answer above what you wrote. Typed answers are kept on this device. */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}};
const SCOPE=['start','found','msk','blood','immune','infect','neuro','endo','resp','cardio','renal','gi'];
const hash=s=>{let h=5381; for(let i=0;i<s.length;i++) h=((h<<5)+h+s.charCodeAt(i))>>>0; return h.toString(36);};
const txt=el=>el?el.textContent.replace(/\s+/g,' ').trim():'';
const btn=$('#recall-btn');
let tries=LS.get('bio-recall-try',{}), ready=false, on=false, saveT=null;
const saveTries=()=>{clearTimeout(saveT); saveT=setTimeout(()=>LS.set('bio-recall-try',tries),250);};

/* Move an element's content (from node `from` onwards) into a block span, which is what gets blurred */
function wrap(el,from){const a=document.createElement('span'); a.className='rc-a';
  let n=from===undefined?el.firstChild:from; while(n){const nx=n.nextSibling; a.appendChild(n); n=nx;}
  el.appendChild(a); return a;}
const unit=(el,from)=>{if(!txt(el)) return false; wrap(el,from); el.classList.add('rc-u'); return true;};

function prepare(){
  if(ready) return; ready=true;
  SCOPE.forEach(k=>{const p=document.getElementById('panel-'+k); if(!p) return;
    $$('.sec',p).forEach(sec=>{
      /* tables: every body cell except the row heading; group rows stay as headings */
      $$('.tbl-wrap',sec).forEach((tw,ti)=>{const t=$('table',tw); if(!t) return;
        const heads=$$('thead th',t).map(txt); let n=0;
        $$('tbody tr',t).forEach(tr=>{if(tr.classList.contains('grp')) return; const rh=txt(tr.cells[0]);
          Array.from(tr.cells).forEach(c=>{if(c.tagName!=='TD'||!unit(c)) return; n++;
            c.classList.add('rc-td'); c.dataset.rk=`${sec.id}:${ti}:${hash(rh)}:${c.cellIndex}`;
            c.dataset.rl=((rh?rh+' · ':'')+(heads[c.cellIndex]||'')).slice(0,90);});});
        if(!n) return;
        tw.classList.add('rc-ready');
        const bar=document.createElement('div'); bar.className='rc-bar';
        bar.innerHTML='<span class="rc-tag">Recall</span><button type="button" class="rc-b" data-rc="fill" aria-pressed="false">✎ Fill it in</button><button type="button" class="rc-b" data-rc="show" aria-pressed="false">Show answers</button><button type="button" class="rc-b ghost" data-rc="clear" hidden>Clear my answers</button><span class="rc-stat" aria-live="polite"></span>';
        tw.parentNode.insertBefore(bar,tw); syncBar(tw);});
      /* topic cards: bullets, paragraphs and definitions; the card title stays */
      $$('.card',sec).forEach(card=>{let n=0;
        Array.from(card.children).forEach(ch=>{const tag=ch.tagName;
          if(tag==='UL'||tag==='OL') Array.from(ch.children).forEach(li=>{if(unit(li)) n++;});
          else if(tag==='P'){if(unit(ch)) n++;}
          else if(tag==='DL') $$('dd',ch).forEach(dd=>{if(unit(dd)) n++;});});
        const h=card.querySelector(':scope > h4');
        if(n&&h){card.classList.add('rc-card'); const b=document.createElement('button'); b.type='button'; b.className='rc-cb'; b.setAttribute('aria-pressed','false'); b.textContent='Show'; h.appendChild(b);}});
      /* step lists: the step title stays, its description is hidden */
      $$('.flow > div',sec).forEach(st=>{const b=st.querySelector(':scope > b'); if(b&&b.nextSibling) unit(st,b.nextSibling);});
    });});
  here();
}

/* ---------- revealing ---------- */
function mine(u){ /* show what was typed under the real answer */
  if(!u.classList.contains('rc-td')) return;
  const v=(tries[u.dataset.rk]||'').trim(); let m=$(':scope > .rc-mine',u);
  if(!v){if(m) m.remove(); return;}
  if(!m){m=document.createElement('span'); m.className='rc-mine'; u.appendChild(m);}
  m.innerHTML='<i>You wrote</i>'; m.appendChild(document.createTextNode(v));}
function setUnits(list,show){list.forEach(u=>{u.classList.toggle('rc-on',show); if(show) mine(u);}); after(list);}
function after(list){const tws=new Set(), cards=new Set();
  list.forEach(u=>{const tw=u.closest('.tbl-wrap'); if(tw) tws.add(tw); const c=u.closest('.rc-card'); if(c) cards.add(c);});
  tws.forEach(syncBar); cards.forEach(syncCard);}
const flip=list=>setUnits(list,list.some(u=>!u.classList.contains('rc-on')));
function syncCard(card){const b=$(':scope > h4 > .rc-cb',card); if(!b) return; const us=$$('.rc-u',card), all=us.length&&us.every(u=>u.classList.contains('rc-on'));
  b.textContent=all?'Hide':'Show'; b.setAttribute('aria-pressed',String(all));}
function syncBar(tw){const bar=tw.previousElementSibling; if(!bar||!bar.classList.contains('rc-bar')) return;
  const cells=$$('.rc-td',tw), all=cells.length&&cells.every(c=>c.classList.contains('rc-on')), fill=tw.classList.contains('rc-fill');
  const done=cells.filter(c=>(tries[c.dataset.rk]||'').trim()).length;
  const sb=$('[data-rc="show"]',bar); sb.textContent=all?'Hide answers':'Show answers'; sb.setAttribute('aria-pressed',String(all));
  $('[data-rc="fill"]',bar).setAttribute('aria-pressed',String(fill));
  const cb=$('[data-rc="clear"]',bar); cb.hidden=!done; if(!cb.dataset.arm) cb.textContent='Clear my answers';
  $('.rc-stat',bar).textContent=fill?`${done} of ${cells.length} filled in`:(done?`${done} typed answer${done===1?'':'s'} saved`:'');}

function fillMode(tw,want){
  tw.classList.toggle('rc-fill',want);
  if(want){
    const cells=$$('.rc-td',tw); setUnits(cells,false);
    cells.forEach(c=>{if($(':scope > .rc-try',c)) return;
      const ta=document.createElement('textarea'); ta.className='rc-try'; ta.rows=1; ta.spellcheck=false;
      ta.setAttribute('aria-label','Your answer: '+c.dataset.rl); ta.value=tries[c.dataset.rk]||''; c.appendChild(ta);});
    const first=cells.find(c=>!(tries[c.dataset.rk]||'').trim())||cells[0]; if(first) $('.rc-try',first).focus({preventScroll:true});
  }
  syncBar(tw);
}

/* ---------- clicks and typing ---------- */
document.addEventListener('click',e=>{
  if(!on) return; const t=e.target;
  const rb=t.closest('.rc-bar [data-rc]');
  if(rb){const tw=rb.closest('.rc-bar').nextElementSibling, a=rb.dataset.rc;
    if(a==='fill') fillMode(tw,!tw.classList.contains('rc-fill'));
    else if(a==='show') flip($$('.rc-td',tw));
    else if(a==='clear'){
      if(!rb.dataset.arm){rb.dataset.arm='1'; rb.textContent='Tap again to clear'; setTimeout(()=>{delete rb.dataset.arm; syncBar(tw);},3000); return;}
      delete rb.dataset.arm; $$('.rc-td',tw).forEach(c=>{delete tries[c.dataset.rk]; const ta=$(':scope > .rc-try',c); if(ta) ta.value=''; mine(c);}); saveTries(); syncBar(tw);}
    return;}
  const dock=t.closest('.rc-dock [data-rcd]');
  if(dock){const a=dock.dataset.rcd, p=SCOPE.map(k=>document.getElementById('panel-'+k)).find(x=>x&&!x.hidden);
    if(a==='off') setOn(false); else if(p) setUnits($$('.rc-u',p),a==='show'); return;}
  const cb=t.closest('.rc-cb'); if(cb){flip($$('.rc-u',cb.closest('.rc-card'))); return;}
  if(t.closest('textarea,input,select,a,button,label')) return;
  if(String(window.getSelection&&getSelection()||'').trim()) return;   /* the reader is selecting text, not tapping */
  const u=t.closest('.rc-u');
  if(u){if(u.classList.contains('rc-td')&&u.closest('.rc-fill')&&!u.classList.contains('rc-on')) return; flip([u]); return;}
  const th=t.closest('.rc-ready th');
  if(th){const tbl=th.closest('table'), rows=$$('tbody tr',tbl).filter(r=>!r.classList.contains('grp'));
    if(th.closest('thead')){const i=th.cellIndex; flip(i===0?$$('.rc-td',tbl):rows.map(r=>r.cells[i]).filter(c=>c&&c.classList.contains('rc-u')));}
    else flip($$('.rc-u',th.parentElement)); return;}
  const h=t.closest('.rc-card > h4'); if(h){flip($$('.rc-u',h.parentElement)); return;}
  const dt=t.closest('dl > dt'); if(dt){const dd=dt.nextElementSibling; if(dd&&dd.classList.contains('rc-u')) flip([dd]);}
});
document.addEventListener('input',e=>{const ta=e.target; if(!ta.classList||!ta.classList.contains('rc-try')) return;
  const c=ta.closest('.rc-td'), v=ta.value; if(v.trim()) tries[c.dataset.rk]=v; else delete tries[c.dataset.rk]; saveTries(); syncBar(c.closest('.tbl-wrap'));});

/* ---------- switching the mode ---------- */
const dockEl=document.createElement('div'); dockEl.className='rc-dock'; dockEl.setAttribute('role','region'); dockEl.setAttribute('aria-label','Recall mode');
dockEl.innerHTML='<div class="rc-dt"><b>Recall mode</b><span class="rc-hint">Tap anything blurred to reveal it. Tap a row or column heading for the whole line, or a card title for the whole card. Use "Fill it in" on a table to type your answers.</span></div><div class="rc-db"><button type="button" class="rc-b" data-rcd="show">Show all</button><button type="button" class="rc-b" data-rcd="hide">Hide all</button><button type="button" class="rc-b strong" data-rcd="off">Turn off</button></div>';
document.body.appendChild(dockEl);
function here(){const p=SCOPE.map(k=>document.getElementById('panel-'+k)).find(x=>x&&!x.hidden); document.body.classList.toggle('rc-here',!!p);}
function setOn(v){
  on=!!v; if(on) prepare();
  if(on){ /* every session starts hidden */
    $$('.rc-u.rc-on').forEach(u=>u.classList.remove('rc-on')); $$('.rc-fill').forEach(tw=>tw.classList.remove('rc-fill'));
    $$('.rc-ready').forEach(syncBar); $$('.rc-card').forEach(syncCard);}
  document.body.classList.toggle('recall',on);
  if(btn){btn.setAttribute('aria-pressed',String(on)); btn.title=on?'Recall mode is on: answers are hidden. Click to show everything.':'Recall mode: hide the answers so you can test yourself';}
  LS.set('bio-recall',on); here();
}
document.addEventListener('tab-shown',here);
if(btn) btn.addEventListener('click',()=>setOn(!on));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&on&&e.target.classList&&e.target.classList.contains('rc-try')) e.target.blur();});
if(LS.get('bio-recall',false)) setOn(true);
})();
