/* Cardiovascular biomed. Data-driven chapter: see "DATA-DRIVEN CHAPTERS" in app.js for the block types. */
window.CHAPTERS=window.CHAPTERS||{};
(function(){
/* ECG strips are drawn from a small signal model, so each rhythm is one line. Positive values are upward deflections. */
const BASE=112, g=(x,c,w,h)=>h*Math.exp(-(x-c)*(x-c)/(2*w*w));
const beat=(x,r,o)=>{o=o||{};const s=o.s||1;
  return (o.p===0?0:g(x,r-(o.pr||26),5,6))+g(x,r-5*s,1.6*s,-5)+g(x,r,2.2*s,o.rh||46)+g(x,r+5.5*s,1.9*s,-11)+(o.st?g(x,r+16,9,o.st):0)+g(x,r+(o.tx||36),o.tw||9,o.th==null?12:o.th);};
const strip=f=>{let d='';for(let x=40;x<=680;x+=1.5)d+=(d?'L':'M')+x+','+(BASE-f(x)).toFixed(1);return d;};
const each=(arr,fn)=>x=>arr.reduce((t,v,i)=>t+fn(x,v,i),0);
const R6=[90,190,290,390,490,590], P7=[60,160,260,360,460,560,660];
const ECG={
 normal:strip(each(R6,(x,r)=>beat(x,r))),
 first:strip(each([110,214,318,422,526,630],(x,r)=>beat(x,r,{pr:50}))),
 wenck:strip(each(P7,(x,p,i)=>{const pr=[26,40,56,0,26,40,56][i];return g(x,p,5,6)+(pr&&p+pr<670?beat(x,p+pr,{p:0}):0);})),
 mob2:strip(each(P7,(x,p,i)=>g(x,p,5,6)+(i%3!==2&&p+26<670?beat(x,p+26,{p:0}):0))),
 chb:strip(x=>[50,112,174,236,298,360,422,484,546,608,670].reduce((t,p)=>t+g(x,p,5,6),0)+[84,256,428,600].reduce((t,r)=>t+beat(x,r,{p:0,s:1.8,tx:52,tw:12,th:-10}),0)),
 af:strip(x=>[72,150,262,330,452,522,610].reduce((t,r)=>t+beat(x,r,{p:0,th:8}),0)+2.2*Math.sin(x/2.9)+1.6*Math.sin(x/1.7+1)+1.2*Math.sin(x/4.3+2)),
 flutter:strip(x=>{const fr=((x-40)%34)/34;return (fr<0.75?-fr/0.75:-(1-fr)/0.25)*9+4.5+[108,244,380,516,652].reduce((t,r)=>t+beat(x,r,{p:0,th:0}),0);}),
 vt:strip(x=>{const th=(x-40)/44*2*Math.PI;return 36*Math.sin(th)+9*Math.sin(2*th+0.6);}),
 vf:strip(x=>(10+6*Math.sin(x/37))*Math.sin(x/5.1)+7*Math.sin(x/3.3+1)+5*Math.sin(x/8.9+2)),
 stemi:strip(each(R6,(x,r)=>beat(x,r,{st:15,th:17,tx:34,tw:11}))),
 hyperk:strip(each(R6,(x,r)=>beat(x,r,{p:0,s:1.7,tx:42,tw:5,th:36,rh:36})))
};
const cap=t=>`<text x="360" y="22" class="sm lab b" text-anchor="middle">${t}</text>`;
const pm=xs=>xs.map(x=>`<text x="${x}" y="98" class="sm b t-stim" text-anchor="middle">P</text>`).join('');
const NOTE={
 normal:cap('P before every QRS · regular · rate 60 to 100')+'<text x="64" y="98" class="sm b" text-anchor="middle">P</text><text x="90" y="58" class="sm b" text-anchor="middle">QRS</text><text x="128" y="92" class="sm b" text-anchor="middle">T</text>',
 first:cap('long PR interval, but every P is followed by a QRS'),
 wenck:cap('PR gets longer and longer, then a QRS is dropped')+'<text x="390" y="84" class="sm b t-inh" text-anchor="middle">no QRS</text>',
 mob2:cap('PR stays the same; a QRS is dropped without warning')+'<text x="290" y="84" class="sm b t-inh" text-anchor="middle">no QRS</text><text x="590" y="84" class="sm b t-inh" text-anchor="middle">no QRS</text>',
 chb:cap('P waves and QRS complexes ignore each other; slow, broad escape rhythm')+pm([50,174,236,360,484,546,670]),
 af:cap('no P waves · wobbly baseline · irregularly irregular QRS'),
 flutter:cap('sawtooth flutter waves at 300 a minute; here every fourth one is conducted'),
 vt:cap('broad, regular, fast complexes'),
 vf:cap('chaotic: no recognisable complexes, no cardiac output'),
 stemi:cap('ST segment lifted off the baseline')+'<text x="102" y="58" class="sm b t-inh">ST elevation</text>',
 hyperk:cap('no P waves · wide QRS · tall tented T waves')
};
let gridD='';for(let x=40;x<=680;x+=40)gridD+=`M${x},32V192`;for(let y=32;y<=192;y+=40)gridD+=`M40,${y}H680`;
const ecgSVG=`<svg viewBox="0 0 720 204" role="img" aria-label="ECG rhythm strips"><path d="${gridD}" style="fill:none;stroke:var(--line);stroke-width:1"/>`+
 Object.keys(ECG).map(k=>`<g data-v="${k}"><path d="${ECG[k]}" style="fill:none;stroke:var(--ink);stroke-width:1.7;stroke-linejoin:round"/>${NOTE[k]}</g>`).join('')+`</svg>`;

CHAPTERS.cardio={
short:'Cardiovascular',eyebrow:'Cardiovascular biomed',h1:'The pump, the pipes and the pressure',
blurb:'Blood flow, the cardiac cycle, action potentials and the ECG, cardiac output, blood pressure and its drugs, coronary disease, heart failure, congenital heart disease, anaemia.',
lede:'The cardiovascular system is a pump, a set of pipes and a control system that keeps the pressure steady. Nearly every question comes back to three equations: flow = pressure ÷ resistance, cardiac output = stroke volume × heart rate, and blood pressure = cardiac output × resistance.',
secs:[
/* ------------------------------------------------------------------ */
{id:'cardio-flow',eb:'Haemodynamics',h:'Blood flow and how it is controlled',p:'Flow = pressure difference ÷ resistance. The body keeps arterial pressure fairly constant and shares flow between organs by changing the resistance of their arterioles.',b:[
 ['think','A water main and taps. The heart and large arteries are the main, kept at a steady pressure. Each organ has its own tap (its arterioles) and opens it when it needs more. The brainstem only steps in when so many taps are open that the mains pressure starts to fall.'],
 ['cards',[
  ['What sets resistance (Poiseuille\'s law)',['Resistance is proportional to <b>viscosity × length ÷ radius⁴</b>.','Radius dominates: <b>halve the radius and flow falls to one sixteenth</b>.','<b>Arterioles</b> are the main site of resistance: the biggest pressure drop in the circulation happens across them.','Viscosity rises with a high red cell count (polycythaemia) or high plasma protein (myeloma). Vessel length hardly changes.','Flow is normally smooth (laminar). <b>Turbulent</b> flow through a narrowed valve or artery is what you hear as a murmur or bruit.','Velocity is slowest in the capillaries, because their total cross-sectional area is the largest: time for exchange.']],
  ['What sets arteriolar tone',['<b>Sympathetic nerves:</b> noradrenaline on <b>α₁</b> receptors (G<sub>q</sub>, IP₃, calcium) constricts. Vessels have resting sympathetic tone and almost no parasympathetic supply.','<b>Adrenaline:</b> at low levels prefers <b>β₂</b> (G<sub>s</sub>, cAMP), dilating vessels in muscle and heart; at high levels α₁ wins and vessels constrict.','<b>Constrictors:</b> angiotensin II, ADH (also called vasopressin: one hormone, two names), endothelin, thromboxane A₂.','<b>Dilators:</b> nitric oxide (from endothelium, acting through cGMP), prostacyclin, adenosine, ANP, histamine, bradykinin.','<b>Local metabolites</b> override everything else in working tissue.']]]],
 ['pw','myogenic','hyperaemia'],
 ['table',['Circulation','Main control','Special features'],[
  ['Coronary','Metabolic: adenosine and low oxygen dilate','The heart already extracts about 70% of the oxygen delivered, so extra demand can only be met by <b>extra flow</b>. The left ventricle is perfused mainly in <b>diastole</b>, because its own contraction squeezes the vessels shut. A fast heart rate shortens diastole.'],
  ['Cerebral','Autoregulation and CO₂','Flow is constant between a mean pressure of about 60 and 150 mmHg. <b>High CO₂ dilates</b>, low CO₂ constricts (hyperventilation causes light-headedness). Sympathetic nerves have little effect.'],
  ['Skeletal muscle','At rest: sympathetic α₁ tone. In exercise: local metabolites','Flow can rise 20-fold. The muscle pump helps venous return.'],
  ['Skin','Sympathetic nerves, for temperature control','Arteriovenous shunts open to lose heat and close to keep it. Not driven by metabolism. Cold, clammy skin is an early sign of shock.'],
  ['Pulmonary','Oxygen in the alveoli','Low pressure (25/10 mmHg), takes the whole cardiac output. <b>Hypoxia constricts</b> pulmonary arterioles, the opposite of every other circulation, to match blood flow to ventilation.'],
  ['Renal','Autoregulation (myogenic and tubuloglomerular feedback)','Takes 20 to 25% of cardiac output, far more than it needs for oxygen: the flow is for filtering.'],
  ['Gut (splanchnic)','Sympathetic nerves; local hormones after a meal','A blood reservoir: constricts in exercise and shock.']]],
 ['cards',[
  ['Capillary exchange: Starling forces',['<b>Hydrostatic pressure</b> pushes fluid out: about 35 mmHg at the arteriolar end, 15 mmHg at the venous end.','<b>Oncotic pressure</b> from plasma proteins (mostly albumin) holds fluid in: about 25 mmHg.','The small net loss of fluid drains away in the <b>lymph</b>.','<b>Oedema</b> has four mechanisms: raised hydrostatic pressure (heart failure, venous blockage), low oncotic pressure (nephrotic syndrome, liver failure, malnutrition), leaky capillaries (inflammation, sepsis, burns), blocked lymphatics (lymphoedema).']],
  ['Venous return',['Veins hold about <b>two thirds</b> of the blood volume: they are the reservoir.','Blood gets back to the heart with help from the <b>skeletal muscle pump</b> and venous valves, the <b>respiratory pump</b> (breathing in lowers pressure in the chest), <b>sympathetic venoconstriction</b>, and blood volume itself.','Standing still pools about 500 mL in the legs: the reason soldiers on parade faint.','Venous return sets preload, so over time cardiac output must equal venous return.']]]],
 ['notes',
  ['clin','Shock','Shock is not enough blood flow to the tissues. <b>Hypovolaemic</b> (bleeding, dehydration), <b>cardiogenic</b> (pump failure after a heart attack), <b>distributive</b> (widespread vasodilation: sepsis, anaphylaxis, spinal cord injury) and <b>obstructive</b> (pulmonary embolus, tension pneumothorax, tamponade). Early signs are the compensations: fast heart rate, cool hands, slow capillary refill, low urine output, fast breathing. <b>Low blood pressure is a late sign.</b> Lactate rises as tissues switch to anaerobic metabolism. Septic shock can start with warm, flushed skin.'],
  ['fix','Cardio Biomed deck · active hyperaemia','The slide says the metabolites of active tissue "all cause a release of nitric oxide". Adenosine, CO₂, H⁺, K⁺ and low oxygen relax arteriolar smooth muscle <b>directly</b>. Nitric oxide is released by the endothelium in response to faster flow (shear stress), which widens the larger feeding arteries. The same deck lists "ADH, vasopressin" as two constrictors: they are the same hormone.']]
]},
/* ------------------------------------------------------------------ */
{id:'cardio-cycle',eb:'The pump',h:'The cardiac cycle',p:'One heartbeat lasts about 0.8 seconds at rest: a third of it systole, two thirds diastole. Valves are passive: each opens and closes only because the pressure on one side becomes higher than on the other.',b:[
 ['explore','dg-wiggers','The cardiac cycle (Wiggers diagram)','Left heart pressures, the ECG, heart sounds and ventricular volume on one time line. Tap a phase.',680,
  `<svg viewBox="0 0 760 410" role="img" aria-label="Wiggers diagram: pressures, ECG, heart sounds and ventricular volume through one cardiac cycle">
   <path class="ax" d="M70,24 V255 H700"/>
   <g class="sm" text-anchor="end"><text x="62" y="254">0</text><text x="62" y="184">40</text><text x="62" y="114">80</text><text x="62" y="44">120</text><text x="62" y="322">ECG</text><text x="62" y="349">sounds</text><text x="62" y="378">LV volume</text></g>
   <text x="22" y="140" class="sm" text-anchor="middle" transform="rotate(-90 22 140)">pressure (mmHg)</text>
   <path class="grid" d="M150,24 V398 M190,24 V398 M400,24 V398 M450,24 V398"/>
   <g class="sm"><text x="148" y="16" text-anchor="end">mitral closes</text><text x="192" y="16">aortic opens</text><text x="398" y="16" text-anchor="end">aortic closes</text><text x="452" y="16">mitral opens</text></g>
   <path class="c1" d="M70,100 C110,104 150,108 190,110 C215,64 262,42 297,44 C340,48 380,62 400,77 C404,84 408,84 412,76 C418,70 424,72 432,74 C520,84 620,96 700,100"/>
   <path class="c5" d="M70,236 C90,234 100,228 112,229 C125,230 140,233 150,232 C162,225 178,150 190,110 C215,60 260,38 295,40 C340,44 380,60 400,78 C420,110 436,220 450,236 C462,244 480,244 500,242 C580,240 650,238 700,236"/>
   <path class="c2" d="M70,240 C90,238 100,226 112,227 C128,229 142,238 150,236 C160,230 172,230 185,236 C200,244 220,244 235,243 C300,240 400,228 450,225 C462,228 474,242 492,243 C560,243 640,241 700,240"/>
   <text x="530" y="76" class="sm lab b" style="fill:var(--artery)">aorta</text><text x="255" y="150" class="sm lab b" style="fill:var(--pw-micro)">left ventricle</text><text x="520" y="226" class="sm lab b" style="fill:var(--vein)">left atrium</text>
   <path class="ax" d="M70,318 h8 q10,-9 20,0 h36 l4,3 l5,-30 l5,38 l4,-11 h160 q24,-16 48,0 H700"/>
   <g class="sm b"><text x="88" y="303" text-anchor="middle">P</text><text x="144" y="282" text-anchor="middle">QRS</text><text x="336" y="300" text-anchor="middle">T</text><text x="156" y="349">S1</text><text x="406" y="349">S2</text></g>
   <g class="sm"><text x="96" y="349">(S4)</text><text x="466" y="349">(S3)</text><text x="196" y="352">120 mL</text><text x="406" y="385">50 mL</text></g>
   <path class="c4" d="M70,364 C100,362 130,357 150,357 H190 C230,359 330,388 400,390 H450 C478,372 520,368 600,366 C640,365 680,364 700,364"/>
   <g data-k="as"><rect class="hit" x="70" y="24" width="80" height="380"/><text x="110" y="406" class="b" text-anchor="middle">①</text></g>
   <g data-k="ivc"><rect class="hit" x="150" y="24" width="40" height="380"/><text x="170" y="406" class="b" text-anchor="middle">②</text></g>
   <g data-k="ej"><rect class="hit" x="190" y="24" width="210" height="380"/><text x="295" y="406" class="b" text-anchor="middle">③</text></g>
   <g data-k="ivr"><rect class="hit" x="400" y="24" width="50" height="380"/><text x="425" y="406" class="b" text-anchor="middle">④</text></g>
   <g data-k="fill"><rect class="hit" x="450" y="24" width="250" height="380"/><text x="575" y="406" class="b" text-anchor="middle">⑤</text></g>
  </svg>`,
  {as:['① Atrial systole','Just after the <b>P wave</b> the atria contract and top up the ventricles: the last 10 to 20% of filling (more when the heart is fast or the ventricle is stiff). It makes the <b>a wave</b> of the JVP. This "atrial kick" is lost in atrial fibrillation. A <b>fourth heart sound</b> here means the atrium is pushing into a stiff ventricle.'],
   ivc:['② Isovolumetric contraction','After the <b>QRS</b> the ventricles contract. Ventricular pressure rises above atrial pressure, so the mitral and tricuspid valves close: the <b>first heart sound</b>. For about 0.05 seconds <b>all four valves are closed</b>: pressure climbs steeply but volume cannot change. The tricuspid valve bulging back makes the <b>c wave</b> of the JVP.'],
   ej:['③ Ejection','When left ventricular pressure passes aortic pressure (about 80 mmHg) the aortic valve opens. About <b>70 mL</b> (the stroke volume) is ejected, fast at first and then more slowly; about 50 mL stays behind. The <b>T wave</b> comes near the end. Meanwhile the atria are filling against closed AV valves: the <b>x descent</b>, then the <b>v wave</b>.'],
   ivr:['④ Isovolumetric relaxation','The ventricle relaxes. Its pressure drops below aortic pressure and the aortic and pulmonary valves close: the <b>second heart sound</b>, and the small notch on the aortic trace. All four valves are closed again while pressure falls with no change in volume.'],
   fill:['⑤ Ventricular filling','When ventricular pressure falls below atrial pressure the mitral valve opens (the <b>y descent</b>). Filling is fast at first, then slow. About <b>80% of filling is passive</b>. A <b>third heart sound</b> early in this phase means blood rushing into an overfilled ventricle: normal in young people and pregnancy, otherwise a sign of heart failure. The left ventricle receives most of its coronary blood flow now. When the heart speeds up, it is this phase that shortens.']}],
 ['pw','cardiaccycle'],
 ['table',['Sound','What makes it','When','Notes'],[
  ['S1 ("lub")','Mitral and tricuspid valves closing','Start of systole; in time with the carotid pulse','Loudest at the apex'],
  ['S2 ("dub")','Aortic, then pulmonary valve closing','End of systole','The two parts split on breathing in: more blood returns to the right heart, so the pulmonary valve closes later'],
  ['S3','Rapid filling of an already full ventricle','Early diastole, just after S2','Normal under about 30 and in pregnancy. Otherwise: <b>heart failure</b>, mitral regurgitation'],
  ['S4','Atrial contraction against a stiff ventricle','Late diastole, just before S1','Always abnormal: left ventricular hypertrophy from hypertension or aortic stenosis. Cannot occur in atrial fibrillation'],
  ['Systolic murmur','Flow between S1 and S2','','<b>Aortic stenosis</b> (ejection, radiates to the carotids) or <b>mitral regurgitation</b> (pansystolic, radiates to the axilla)'],
  ['Diastolic murmur','Flow after S2','','<b>Aortic regurgitation</b> (early, blowing) or <b>mitral stenosis</b> (mid-diastolic rumble). Always abnormal']]],
 ['cards',[
  ['The JVP waveform',['The jugular venous pressure shows <b>right atrial pressure</b>: the internal jugular vein is a manometer with no valves between it and the atrium.','<b>a wave:</b> atrial contraction. Absent in AF. Giant "cannon" waves in complete heart block (atrium contracts against a closed valve).','<b>c wave:</b> tricuspid valve bulging at the start of ventricular systole.','<b>x descent:</b> the atrium relaxes and the valve ring is pulled down.','<b>v wave:</b> venous filling of the atrium against the closed tricuspid valve. Giant v waves in tricuspid regurgitation.','<b>y descent:</b> the tricuspid valve opens and the atrium empties.','<b>Raised JVP</b> (more than about 3 cm above the sternal angle with the patient at 45°): right heart failure, fluid overload, pulmonary embolus, tamponade.']],
  ['Numbers worth knowing',['End-diastolic volume about <b>120 mL</b>; end-systolic volume about <b>50 mL</b>; stroke volume about <b>70 mL</b>.','<b>Ejection fraction</b> = stroke volume ÷ end-diastolic volume = 55 to 70%.','Cardiac output = 70 mL × 70 beats/min ≈ <b>5 L/min</b>.','Pressures (mmHg): right atrium 0 to 5; right ventricle 25/0; pulmonary artery 25/10; left atrium 5 to 12; left ventricle 120/5; aorta 120/80.','The right ventricle pumps the same volume at one fifth of the pressure: its wall is much thinner.']]]],
 ['notes',
  ['exam','The order of valve events never changes: <b>mitral closes (S1) → aortic opens → aortic closes (S2) → mitral opens</b>. Opening is silent in a healthy heart. Both isovolumetric phases have all four valves closed.'],
  ['fix','Cardio Biomed deck · atrial systole','The slide says the extra blood from atrial contraction raises ventricular pressure above atrial pressure and "snaps the AV valves shut". The valves close because the <b>ventricles start to contract</b>: that is what raises ventricular pressure above atrial pressure.'],
  ['fix','Cardio Biomed deck · ejection fraction','"In heart failure, the EF is reduced by 40% or less" should read: heart failure with reduced ejection fraction means an EF <b>below 40%</b> (normal is 55 to 70%). About half of people with heart failure have a normal ejection fraction.']]
]},
/* ------------------------------------------------------------------ */
{id:'cardio-electric',eb:'Electricity',h:'Pacemakers, action potentials and contraction',p:'The heart beats on its own. Pacemaker cells set the rhythm, a wiring system spreads it in the right order, and calcium turns each action potential into a contraction.',b:[
 ['think','A stadium wave. One section starts it (the SA node). It spreads because neighbours are linked hand to hand (gap junctions). At the aisle a steward holds everyone for a moment (the AV node) so the first stand has finished before the second stand begins.'],
 ['pw','conduction'],
 ['explore','dg-cap','Two kinds of cardiac action potential','Working muscle cells have a stable resting potential and a long plateau. Pacemaker cells never rest. Tap a phase.',680,
  `<svg viewBox="0 0 760 290" role="img" aria-label="Action potentials of a ventricular muscle cell and a sinoatrial node cell">
   <text x="210" y="20" class="b" text-anchor="middle">Ventricular muscle cell</text><text x="580" y="20" class="b" text-anchor="middle">SA node (pacemaker) cell</text>
   <path class="ax" d="M56,34 V256 H366 M436,34 V256 H726"/>
   <path class="grid" d="M56,101 H366 M436,101 H726 M436,163 H726"/>
   <g class="sm" text-anchor="end"><text x="50" y="75">+20</text><text x="50" y="105">0</text><text x="50" y="244">−90</text><text x="430" y="105">0</text><text x="430" y="167">−40</text><text x="430" y="198">−60</text></g>
   <text x="14" y="150" class="sm" text-anchor="middle" transform="rotate(-90 14 150)">membrane potential (mV)</text>
   <text x="210" y="276" class="sm" text-anchor="middle">about 300 ms</text><text x="580" y="276" class="sm" text-anchor="middle">one cycle: about 800 ms at rest</text>
   <text x="722" y="158" class="sm" text-anchor="end">threshold</text>
   <path class="c1" d="M60,240 H102 L108,71 L128,94 C165,96 225,102 250,114 C275,130 295,236 312,240 H360"/>
   <path class="c2" d="M440,194 C480,186 520,172 540,163 C552,150 560,90 572,86 C590,88 620,180 642,194 C670,188 700,176 720,168"/>
   <g data-k="v4"><rect class="hit" x="56" y="34" width="42" height="222"/><rect class="hit" x="312" y="34" width="54" height="222"/><text x="74" y="228" class="b">4</text><text x="334" y="228" class="b">4</text></g>
   <g data-k="v0"><rect class="hit" x="98" y="34" width="18" height="222"/><text x="112" y="152" class="b">0</text></g>
   <g data-k="v1"><rect class="hit" x="116" y="34" width="22" height="222"/><text x="122" y="64" class="b">1</text></g>
   <g data-k="v2"><rect class="hit" x="138" y="34" width="112" height="222"/><text x="188" y="88" class="b">2</text></g>
   <g data-k="v3"><rect class="hit" x="250" y="34" width="62" height="222"/><text x="296" y="170" class="b">3</text></g>
   <g data-k="p4"><rect class="hit" x="436" y="34" width="104" height="222"/><rect class="hit" x="642" y="34" width="84" height="222"/><text x="482" y="170" class="b">4</text><text x="674" y="178" class="b">4</text></g>
   <g data-k="p0"><rect class="hit" x="540" y="34" width="36" height="222"/><text x="528" y="130" class="b">0</text></g>
   <g data-k="p3"><rect class="hit" x="576" y="34" width="66" height="222"/><text x="626" y="130" class="b">3</text></g>
  </svg>`,
  {v0:['Muscle · phase 0 · rapid depolarisation','Fast voltage-gated <b>sodium</b> channels open and sodium floods in: −90 to +20 mV in a millisecond or two. This is the start of the QRS. Class I antiarrhythmics (flecainide, lidocaine) block these channels.'],
   v1:['Muscle · phase 1 · early repolarisation','Sodium channels inactivate and a brief outward <b>potassium</b> current makes a small notch.'],
   v2:['Muscle · phase 2 · plateau','<b>L-type calcium</b> channels let calcium in while potassium leaks out, so the voltage holds steady. This calcium triggers contraction. The plateau makes the action potential last about 300 ms, so the cell is refractory for almost the whole contraction: <b>cardiac muscle cannot be tetanised</b>, and it always has time to refill. This is the ST segment. Verapamil and diltiazem block L-type channels.'],
   v3:['Muscle · phase 3 · repolarisation','Calcium channels close and delayed rectifier <b>potassium</b> channels carry potassium out. This is the T wave. Drugs that block these potassium channels (amiodarone, sotalol, and many non-cardiac drugs such as some antipsychotics and macrolides) <b>lengthen the QT interval</b> and can cause torsades de pointes.'],
   v4:['Muscle · phase 4 · resting potential','A stable −90 mV, held by potassium channels and the Na⁺/K⁺-ATPase. A high blood potassium makes this less negative, which inactivates sodium channels: conduction slows, the QRS widens and the heart can stop.'],
   p4:['Pacemaker · phase 4 · pacemaker potential','No stable resting potential. <b>"Funny" channels</b> (HCN) open when the cell repolarises and let sodium leak in, so the cell drifts up to threshold; T-type calcium channels help at the end. <b>The slope sets the heart rate.</b> Sympathetic nerves (β₁, more cAMP) steepen it; the vagus (M₂: less cAMP, and potassium channels open) flattens it and starts it lower. Ivabradine blocks funny channels.'],
   p0:['Pacemaker · phase 0 · upstroke','<b>L-type calcium channels</b> open, not sodium channels. The upstroke is therefore slow, and conduction through nodal tissue is slow: this is why the AV node delays the impulse, and why verapamil and diltiazem slow the heart and the AV node.'],
   p3:['Pacemaker · phase 3 · repolarisation','Calcium channels close and potassium leaves. Reaching about −60 mV reopens the funny channels and the cycle starts again.']}],
 ['table',['','Sympathetic','Parasympathetic (vagus)'],[
  ['Transmitter and receptor','Noradrenaline and adrenaline on <b>β₁</b> (G<sub>s</sub>: cAMP rises)','Acetylcholine on <b>M₂</b> (G<sub>i</sub>: cAMP falls, potassium channels open)'],
  ['SA node','Steeper pacemaker slope: <b>rate rises</b> (positive chronotropy)','Flatter slope from a lower start: <b>rate falls</b>'],
  ['AV node','Faster conduction: shorter PR interval','Slower conduction: longer PR interval'],
  ['Ventricular muscle','More calcium entry and faster re-uptake: <b>stronger</b> and shorter beat','Very little effect'],
  ['At rest','','<b>Dominant.</b> Left alone the SA node fires at about 100/min; vagal tone holds it at 60 to 70'],
  ['Drugs','β-blockers oppose it','Atropine blocks M₂: used for dangerous bradycardia']]],
 ['pw','cardiacecc'],
 ['cards',[
  ['Digoxin',['Inhibits the <b>Na⁺/K⁺-ATPase</b> of heart muscle.','Sodium builds up inside the cell, so the Na⁺/Ca²⁺ exchanger removes less calcium.','More calcium is stored in the sarcoplasmic reticulum and released with each beat: <b>stronger contraction</b>.','It also increases <b>vagal tone at the AV node</b>, slowing the ventricular rate in atrial fibrillation.','<b>Narrow therapeutic range.</b> Toxicity: nausea, confusion, yellow-green vision, and almost any arrhythmia.','<b>Low potassium makes toxicity more likely</b> (digoxin and potassium compete for the same site on the pump), so beware loop and thiazide diuretics. It is cleared by the kidneys and builds up in renal impairment.'],'Used for rate control in AF, especially with heart failure.'],
  ['Antiarrhythmic drugs (Vaughan Williams classes)',['<b>I · sodium channel blockers</b> (flecainide, lidocaine): slow phase 0.','<b>II · β-blockers</b> (bisoprolol): slow the SA and AV nodes.','<b>III · potassium channel blockers</b> (amiodarone, sotalol): lengthen the action potential and refractory period.','<b>IV · rate-limiting calcium channel blockers</b> (verapamil, diltiazem): slow the nodes.','<b>Adenosine:</b> blocks the AV node for a few seconds to stop a supraventricular tachycardia; causes brief chest tightness and a sense of doom. Avoid in asthma.','<b>Amiodarone</b> side effects: thyroid disease (it is full of iodine), lung fibrosis, liver damage, grey skin, sensitivity to sunlight, corneal deposits.']]]],
 ['notes',
  ['exam','Compare with skeletal muscle: cardiac muscle needs <b>calcium from outside the cell</b> to trigger release from its stores, has gap junctions so the whole chamber contracts as one, cannot be tetanised, and varies its force by changing calcium, not by recruiting more fibres.'],
  ['fix','Cardio Biomed deck · excitation–contraction coupling','The slide says "atria is non-conductive so prevents spread to ventricles". Atrial muscle conducts well. It is the <b>fibrous ring</b> (the fibrous skeleton holding the valves) that insulates atria from ventricles, leaving the AV node and bundle of His as the only way through. The same slide calls the working muscle cells "arrhythmic cells": it means the contractile cells, which are driven by the autorhythmic (pacemaker) cells.']]
]},
/* ------------------------------------------------------------------ */
{id:'cardio-ecg',eb:'Electricity',h:'The ECG and rhythm problems',p:'The ECG records the heart\'s electrical activity from the skin. A wave of depolarisation travelling towards a lead writes an upward deflection; travelling away, a downward one.',b:[
 ['cards',[
  ['What each part means',['<b>P wave:</b> atrial depolarisation.','<b>PR interval</b> (start of P to start of QRS): the delay at the AV node. Normal 120 to 200 ms (3 to 5 small squares).','<b>QRS complex:</b> ventricular depolarisation. Normal under 120 ms (3 small squares). Atrial repolarisation is hidden inside it.','<b>ST segment:</b> the plateau, when all the ventricular muscle is depolarised. It should sit on the baseline.','<b>T wave:</b> ventricular repolarisation.','<b>QT interval</b> (start of QRS to end of T): the whole ventricular action potential. Corrected for heart rate, it should be under about 440 ms in men and 460 ms in women.']],
  ['Reading one, in order',['Paper runs at 25 mm/s: a small square is 0.04 s and a large square is 0.2 s.','<b>Rate:</b> 300 ÷ the number of large squares between R waves. If irregular, count the complexes in 10 seconds and multiply by 6.','<b>Rhythm:</b> regular? Is there a P wave before every QRS, and a QRS after every P?','<b>Axis:</b> leads I and aVF both positive means a normal axis.','<b>Intervals:</b> PR, QRS width, QT.','<b>ST segments and T waves:</b> raised, depressed, inverted? In which leads?']]]],
 ['table',['Leads','Part of the left ventricle','Artery usually responsible'],[
  ['II, III, aVF','Inferior','Right coronary artery'],
  ['V1 to V2','Septal','Left anterior descending (LAD)'],
  ['V3 to V4','Anterior','Left anterior descending'],
  ['I, aVL, V5 to V6','Lateral','Circumflex'],
  ['ST depression with tall R waves in V1 to V3','Posterior (a mirror image)','Right coronary or circumflex']]],
 ['sw','dg-ecg','Rhythm strips','One lead, about six seconds. Choose a rhythm and compare it with normal.',640,ecgSVG,
  [['normal','Sinus rhythm','<b>Normal sinus rhythm.</b> Every beat starts in the SA node: a P wave, a short pause at the AV node, a narrow QRS, then a T wave. Regular, 60 to 100 a minute.'],
   ['first','1st degree block','<b>First-degree heart block.</b> The PR interval is longer than 200 ms (one large square) but every impulse still gets through. Causes: athletes, ageing, β-blockers, digoxin. No treatment needed.'],
   ['wenck','Mobitz I','<b>Second-degree block, Mobitz type I (Wenckebach).</b> The AV node tires: each PR interval is longer than the last until one P wave is not conducted, then the cycle restarts. Usually benign; common in sleep and in athletes.'],
   ['mob2','Mobitz II','<b>Second-degree block, Mobitz type II.</b> The PR interval is constant, but now and then a P wave is not followed by a QRS. The fault is below the AV node and can suddenly become complete block: needs a <b>pacemaker</b>.'],
   ['chb','Complete block','<b>Third-degree (complete) heart block.</b> Nothing passes from atria to ventricles. The atria beat at their own rate (P waves marked) and a slow escape pacemaker in the ventricles produces broad complexes at 30 to 40 a minute. Dizziness, collapse (Stokes–Adams attacks), heart failure. Atropine or temporary pacing first, then a <b>permanent pacemaker</b>.'],
   ['af','Atrial fibrillation','<b>Atrial fibrillation.</b> Chaotic electrical activity in the atria, usually starting near the pulmonary veins. The AV node lets impulses through at random: an <b>irregularly irregular</b> pulse with no P waves. The atria do not contract, so blood stagnates in the left atrial appendage and can clot: <b>five times the risk of stroke</b>.'],
   ['flutter','Atrial flutter','<b>Atrial flutter.</b> A single re-entry circuit runs round the right atrium about 300 times a minute, giving a sawtooth baseline. The AV node usually lets through every second wave, so a regular pulse of <b>150</b> should make you think of flutter. Managed like AF; ablation works very well.'],
   ['vt','Ventricular tachycardia','<b>Ventricular tachycardia.</b> A fast rhythm starting in the ventricles, usually from scar after a heart attack. Complexes are broad because the impulse spreads through muscle and not the Purkinje system. With a pulse: amiodarone, or a synchronised shock if unstable. Without a pulse: treat as cardiac arrest and <b>defibrillate</b>.'],
   ['vf','Ventricular fibrillation','<b>Ventricular fibrillation.</b> The ventricles quiver with no coordinated contraction: no pulse and no output. Cardiac arrest: <b>CPR and immediate defibrillation</b>. Along with pulseless VT this is a "shockable" rhythm. Asystole and pulseless electrical activity are not shockable.'],
   ['stemi','ST elevation','<b>ST elevation.</b> In a group of leads looking at one territory, with chest pain, this means a coronary artery is completely blocked (STEMI). Widespread saddle-shaped ST elevation in nearly all leads suggests pericarditis instead.'],
   ['hyperk','Hyperkalaemia','<b>Hyperkalaemia.</b> Tall tented T waves first, then flat P waves, a long PR, a wide QRS, and finally a sine wave and arrest. An emergency: give <b>calcium gluconate</b> to protect the heart.']]],
 ['table',['Rhythm','Key points','Treatment'],[
  ['Atrial fibrillation','Causes: hypertension, heart failure, mitral valve disease, coronary disease, sepsis, thyrotoxicosis, alcohol. Palpitations, breathlessness, or no symptoms','<b>Rate control</b> (β-blocker or rate-limiting calcium channel blocker; digoxin if sedentary or in heart failure). <b>Rhythm control</b> in selected patients (cardioversion, flecainide, amiodarone, ablation). <b>Anticoagulate</b> according to the CHA₂DS₂-VASc score, usually with a DOAC; assess bleeding risk with ORBIT'],
  ['Supraventricular tachycardia','A re-entry circuit through or beside the AV node. Sudden, regular, narrow-complex, 150 to 250 a minute, often in a young person','Vagal manoeuvres (Valsalva), then <b>adenosine</b>; shock if unstable'],
  ['Bundle branch block','One bundle fails, so that ventricle is activated late through muscle: QRS wider than 120 ms. <b>WiLLiaM:</b> left bundle branch block has a W in V1 and an M in V6. <b>MaRRoW:</b> right bundle branch block has an M in V1 and a W in V6','Left bundle branch block is always abnormal; new LBBB with chest pain is treated as a heart attack. Right bundle branch block can be normal, or a sign of right heart strain (pulmonary embolus)'],
  ['Cardiac arrest','Shockable: VF and pulseless VT. Non-shockable: asystole and pulseless electrical activity','CPR 30:2. Shockable: defibrillate every 2 minutes, adrenaline and amiodarone after the third shock. Non-shockable: adrenaline, and look for a reversible cause (the 4 Hs and 4 Ts)']]],
 ['notes',
  ['clin','Hyperkalaemia','Potassium above 6.5 mmol/L, or any level with ECG changes, is an emergency. Causes: kidney failure, ACE inhibitors, spironolactone, Addison\'s disease, tissue breakdown. <b>1.</b> Protect the heart: 10% <b>calcium gluconate</b> IV (it stabilises the membrane; it does not lower potassium). <b>2.</b> Shift potassium into cells: <b>insulin with glucose</b>, nebulised salbutamol. <b>3.</b> Remove it: stop the causative drugs, treat the cause, potassium binders or dialysis. Low potassium does the reverse on the ECG: flat T waves, U waves and a long QT.'],
  ['exam','An irregularly irregular pulse is atrial fibrillation until proved otherwise. A regular pulse of exactly 150 suggests flutter with 2:1 block.'],
  ['fix','Cardio Biomed deck · atrial fibrillation','The slide says the "AVN produces irregular faulty rhythms in the atria". The chaotic impulses arise in the <b>atria</b> (most often around the pulmonary veins). The AV node is the filter: it passes them on irregularly, which is why the ventricles beat irregularly.'],
  ['fix','Cardio Biomed deck · ST elevation and heart block slides','The explanation of ST elevation is muddled. Potassium leaving the cell is <b>repolarisation</b>, not depolarisation. In ischaemia ATP falls, ATP-sensitive potassium channels <b>open</b>, and the injured muscle repolarises early; current then flows between injured and healthy muscle and lifts the ST segment. Also, the slide titled "Heart Blocks (AVN)" describes <b>bundle branch block</b>, which is a fault below the AV node, not AV block. And the normal PR interval is 120 to 200 ms, not simply "under 200".']]
]},
/* ------------------------------------------------------------------ */
{id:'cardio-output',eb:'The pump',h:'Cardiac output: preload, afterload and contractility',p:'Cardiac output = stroke volume × heart rate: about 5 L/min at rest and up to 25 L/min in exercise. Stroke volume depends on how full the ventricle is, how hard it squeezes, and what it has to push against.',b:[
 ['table',['Factor','What it is','Raised by','Effect on stroke volume'],[
  ['Preload','The stretch on the ventricle at the end of diastole: end-diastolic volume','More venous return: IV fluid, lying down, raising the legs, venoconstriction, a slower heart rate (longer filling)','<span class="up">↑</span> (Frank–Starling)'],
  ['Afterload','The load the ventricle must overcome to eject: arterial pressure and systemic vascular resistance','Hypertension, vasoconstrictors, aortic stenosis','<span class="down">↓</span>, and the heart uses more oxygen; over years the wall thickens'],
  ['Contractility (inotropy)','Force of contraction at a given preload, set by how much calcium reaches the filaments','Sympathetic drive (β₁), adrenaline, dobutamine, digoxin. <b>Lowered</b> by β-blockers, verapamil, ischaemia, acidosis, heart failure','<span class="up">↑</span>'],
  ['Heart rate','Beats per minute','Sympathetic drive, vagal withdrawal, fever, thyroxine, atropine','Output rises until about 180/min, when diastole is too short to fill']]],
 ['sw','dg-pv','Left ventricular pressure–volume loop','One heartbeat, anticlockwise from the bottom left. The width of the loop is the stroke volume. The dashed outline is normal.',560,
  `<svg viewBox="0 0 640 330" role="img" aria-label="Left ventricular pressure-volume loops">
   <path class="ax" d="M70,24 V290 H610"/>
   <g class="sm" text-anchor="end"><text x="62" y="294">0</text><text x="62" y="230">40</text><text x="62" y="166">80</text><text x="62" y="102">120</text><text x="62" y="38">160</text></g>
   <g class="sm" text-anchor="middle"><text x="200" y="306">50</text><text x="330" y="306">100</text><text x="460" y="306">150</text><text x="590" y="306">200</text><text x="340" y="324">left ventricular volume (mL)</text></g>
   <text x="22" y="160" class="sm" text-anchor="middle" transform="rotate(-90 22 160)">pressure (mmHg)</text>
   <path d="M96,288 C250,286 400,280 480,250 C540,226 570,200 588,160" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="3 4"/>
   <text x="604" y="150" class="sm" text-anchor="end">filling curve</text>
   <path data-v="normal pre after" d="M96,290 L250,53" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="3 4"/>
   <text data-v="normal pre after" x="256" y="50" class="sm">contractility line</text>
   <path data-v="pre after contr hf" d="M200,282 C260,282 330,280 382,274 L382,162 C365,120 330,98 300,98 C260,98 220,112 200,130 Z" fill="none" stroke="var(--muted)" stroke-width="2" stroke-dasharray="6 5"/>
   <g data-v="normal"><path class="c2" d="M200,282 C260,282 330,280 382,274 L382,162 C365,120 330,98 300,98 C260,98 220,112 200,130 Z"/>
    <path d="M206,216 H376" class="a-plain" style="marker-start:url(#mk-plain)"/><text x="291" y="208" class="sm b" text-anchor="middle">stroke volume 70 mL</text>
    <g class="b"><text x="390" y="264">A</text><text x="390" y="158">B</text><text x="180" y="126">C</text><text x="180" y="278">D</text></g></g>
   <g data-v="pre"><path class="c3" d="M205,282 C280,282 380,278 460,268 L460,160 C440,115 380,94 330,94 C280,96 235,110 205,128 Z"/><text x="470" y="216" class="sm b">fuller ventricle</text></g>
   <g data-v="after"><path class="c1" d="M225,282 C280,282 340,279 382,274 L382,114 C365,80 330,62 300,62 C270,64 245,76 225,92 Z"/><text x="392" y="110" class="sm b">higher pressure to open the valve</text></g>
   <g data-v="contr"><path d="M96,290 L186,58" fill="none" stroke="var(--pw-micro)" stroke-width="1.8" stroke-dasharray="3 4"/><path class="c5" d="M161,282 C240,282 330,279 382,274 L382,162 C360,112 310,90 270,92 C225,96 185,108 161,122 Z"/><text x="194" y="56" class="sm b">steeper line</text></g>
   <g data-v="hf"><path d="M96,290 L480,86" fill="none" stroke="var(--nerve)" stroke-width="1.8" stroke-dasharray="3 4"/><path class="c4" d="M382,276 C430,274 480,262 512,238 L512,170 C500,140 470,124 440,124 C415,126 395,132 382,138 Z"/><text x="486" y="80" class="sm b">flatter line</text><text x="394" y="200" class="sm b">large, full,</text><text x="394" y="215" class="sm b">weak ventricle</text></g>
  </svg>`,
  [['normal','Normal','<b>Normal.</b> <b>D → A:</b> filling, from 50 to 120 mL at low pressure. <b>A:</b> mitral valve closes. <b>A → B:</b> isovolumetric contraction. <b>B:</b> aortic valve opens. <b>B → C:</b> ejection of 70 mL. <b>C:</b> aortic valve closes. <b>C → D:</b> isovolumetric relaxation. <b>D:</b> mitral valve opens. Ejection fraction = 70 ÷ 120 = 58%.'],
   ['pre','More preload','<b>More preload</b> (IV fluid, leg raise). The ventricle fills further along its filling curve, the stretched muscle contracts harder, and it empties to almost the same end-systolic volume: <b>a wider loop, a bigger stroke volume</b>. This is the Frank–Starling law.'],
   ['after','More afterload','<b>More afterload</b> (hypertension, vasoconstriction, aortic stenosis). The ventricle must reach a higher pressure before the aortic valve opens, and the valve closes earlier with more blood left behind: <b>a taller, narrower loop and a smaller stroke volume</b>, for more work.'],
   ['contr','More contractility','<b>More contractility</b> (sympathetic drive, dobutamine). The end-systolic line becomes steeper: the ventricle empties further from the same filling volume. <b>End-systolic volume falls; stroke volume and ejection fraction rise.</b>'],
   ['hf','Heart failure','<b>Heart failure with reduced ejection fraction.</b> Contractility is low (a flat end-systolic line), so the ventricle empties poorly. It dilates and operates at a high volume and a high filling pressure, which is transmitted back to the lungs. Here stroke volume is 50 mL from an end-diastolic volume of 170 mL: an ejection fraction of 29%.']]],
 ['cards',[
  ['The Frank–Starling law',['<b>The more the ventricle fills, the harder it contracts</b>, within limits.','Stretch brings actin and myosin into better overlap and makes troponin more sensitive to calcium.','It keeps the output of the right and left ventricles equal beat by beat, and matches output to venous return.','It is <b>not</b> the same as contractility. Starling is moving along one curve by changing filling; a change in contractility moves you to a different curve.','In a failing heart the curve is flat: more filling brings little more output, only congestion.']],
  ['Equations and worked examples',['<b>Cardiac output</b> = stroke volume × heart rate. 80 mL × 75 = 6 L/min.','<b>Stroke volume</b> = end-diastolic volume − end-systolic volume. 140 − 60 = 80 mL.','<b>Ejection fraction</b> = stroke volume ÷ end-diastolic volume. 80 ÷ 140 = 57%.','<b>Pulse pressure</b> = systolic − diastolic. 120 − 80 = 40 mmHg.','<b>Mean arterial pressure</b> = diastolic + ⅓ pulse pressure. 80 + 13 = 93 mmHg. (Diastole lasts twice as long as systole.)','<b>Mean arterial pressure</b> = cardiac output × total peripheral resistance.','<b>1 MET</b> = resting oxygen use = 3.5 mL O₂ per kg per minute ≈ 1 kcal per kg per hour.']]]],
 ['pw','exercisecv'],
 ['notes',
  ['clin','Aortic stenosis: an afterload problem','A narrowed valve (calcification with age, or a bicuspid valve in younger people) forces the left ventricle to generate very high pressures. The wall thickens (hypertrophy), needs more oxygen and becomes stiff. The classic triad on exertion is <b>angina, fainting and breathlessness</b>. Signs: ejection systolic murmur radiating to the carotids, a slow-rising pulse and a narrow pulse pressure. Treatment is valve replacement, by surgery or through a catheter (TAVI).'],
  ['fix','Cardio Biomed deck · "PACE" slide','Two corrections. "Increased EDV = increased contractility" describes the <b>Frank–Starling law</b> (more stretch, more force); contractility means a change in force at the <b>same</b> stretch. And afterload is not set by "NA/A on β₁ receptors": afterload is arterial pressure and vascular resistance, set largely by <b>α₁</b> receptors on arterioles. β₁ receptors raise heart rate and contractility.']]
]},
/* ------------------------------------------------------------------ */
{id:'cardio-bp',eb:'Control',h:'Blood pressure: control, hypertension and its drugs',p:'Mean arterial pressure = cardiac output × total peripheral resistance. Nerves correct it within seconds; hormones and the kidneys set it over hours and days by controlling blood volume.',b:[
 ['two',
  ['axis','dg-baro','The baroreceptor reflex','Shown for a rise in pressure. Seconds to act.',{label:'Baroreceptor reflex',nodes:[{t:'Baroreceptors',s:'carotid sinus · aortic arch',c:'n-nerve'},{t:'Medulla',s:'nucleus tractus solitarius',c:'n-nerve'},{t:'Autonomic outflow',s:'vagus ↑ · sympathetic ↓',c:'n-org'},{t:'Heart and vessels',s:'rate ↓ · force ↓ · vessels dilate',c:'n-blood'}],links:['via IX and X','','M₂ · β₁ · α₁'],fb:[[3,0,'-','pressure falls']],fx:['If pressure falls, the reverse','fewer signals → vagus ↓, sympathetic ↑','rate ↑ · force ↑ · vessels constrict']}],
  ['axis','dg-raas','The renin–angiotensin–aldosterone system','Hours to days to act. Three drug classes block it.',{label:'Renin angiotensin aldosterone system',nodes:[{t:'Angiotensinogen',s:'from the liver, always there',c:'n-box'},{t:'Angiotensin I',s:'inactive',c:'n-box'},{t:'Angiotensin II',s:'acts on AT₁ receptors',c:'n-blood'},{t:'Aldosterone',s:'adrenal zona glomerulosa',c:'n-org'}],links:['renin (kidney)','ACE (lung)',''],side:[[0,['renin is released when','kidney perfusion is low'],'sm'],[1,['ACE inhibitors block the','next step (ramipril)']],[2,['ARBs block AT₁','(losartan)']],[3,['spironolactone blocks','its receptor']]],fx:['Result','vasoconstriction · sodium and water retained · thirst · ADH','blood pressure and blood volume rise']}]],
 ['pw','baroreflex','raas'],
 ['table',['Hormone','From','Released in response to','Effect'],[
  ['Angiotensin II','Made in the blood by renin, then ACE','Low renal perfusion pressure, low sodium at the macula densa, sympathetic β₁ drive','Constricts arterioles; releases aldosterone and ADH; thirst; sodium reabsorption in the proximal tubule'],
  ['Aldosterone','Adrenal cortex, zona glomerulosa','Angiotensin II; high plasma potassium','Collecting duct keeps sodium (water follows) and loses potassium and H⁺'],
  ['ADH (vasopressin)','Made in the hypothalamus, released from the posterior pituitary','Raised plasma osmolality (the main trigger); a large fall in blood volume or pressure','V₂ receptors: aquaporin-2 channels in the collecting duct, so water is retained. V₁ receptors: vasoconstriction'],
  ['ANP and BNP','Atria (ANP) and ventricles (BNP)','Stretch of the chambers by too much volume','The opposite of the RAAS: sodium and water are lost, vessels dilate, renin and aldosterone fall. <b>BNP is the blood test for heart failure</b>'],
  ['Adrenaline','Adrenal medulla','Sympathetic activation','β₁: heart rate and force. β₂: dilates vessels in muscle. α₁: constricts at high levels']]],
 ['h','Hypertension'],
 ['cards',[
  ['Diagnosis (NICE)',['Clinic reading <b>140/90 or above</b>: confirm with ambulatory (ABPM) or home monitoring.','<b>Stage 1:</b> clinic 140/90 or more and daytime average <b>135/85</b> or more.','<b>Stage 2:</b> clinic 160/100 or more and average 150/95 or more.','<b>Severe:</b> clinic systolic 180 or diastolic 120 or more. Same-day assessment if there is retinal haemorrhage or papilloedema, confusion, chest pain, heart failure or kidney injury.','<b>It usually causes no symptoms</b>: it is found by measuring.','Look for organ damage: fundoscopy, urine albumin:creatinine ratio and dipstick, kidney function, ECG, HbA1c and lipids. Estimate 10-year risk with QRISK.']],
  ['Causes',['<b>Primary (essential), about 90%:</b> no single cause. Age, family history, obesity, salt, alcohol, inactivity; more common in people of Black African or African-Caribbean origin.','<b>Secondary: ROPED.</b>','<b>R</b>enal disease (the commonest; includes renal artery stenosis).','<b>O</b>besity and obstructive sleep apnoea.','<b>P</b>regnancy: pre-eclampsia.','<b>E</b>ndocrine: Conn\'s syndrome (too much aldosterone: low potassium), Cushing\'s, phaeochromocytoma, thyroid disease, acromegaly.','<b>D</b>rugs: NSAIDs, steroids, the combined pill, decongestants, cocaine, liquorice.','Also coarctation of the aorta. Suspect a secondary cause in anyone under 40 or with resistant or sudden hypertension.'],'Complications: stroke, heart attack, heart failure, AF, chronic kidney disease, retinopathy, aortic aneurysm and dissection, vascular dementia.']]],
 ['table',['Class','Examples','How it works','Side effects and cautions'],[
  ['ACE inhibitor (A)','Ramipril, lisinopril (-pril)','Stops angiotensin I becoming angiotensin II: less vasoconstriction, less aldosterone. Also stops the breakdown of bradykinin','<b>Dry cough</b> (bradykinin; about 1 in 10), angioedema, <b>high potassium</b>, first-dose hypotension, a rise in creatinine (dangerous in bilateral renal artery stenosis). Not in pregnancy. Check kidney function before and 1 to 2 weeks after starting'],
  ['Angiotensin receptor blocker (A)','Losartan, candesartan (-sartan)','Blocks the AT₁ receptor','As for ACE inhibitors but <b>no cough</b>: the alternative when cough is a problem. Never combined with an ACE inhibitor'],
  ['Calcium channel blocker, dihydropyridine (C)','Amlodipine, nifedipine (-dipine)','Blocks L-type calcium channels in arterial smooth muscle: arterioles dilate','<b>Ankle swelling</b>, flushing, headache, palpitations'],
  ['Calcium channel blocker, rate-limiting','Verapamil, diltiazem','Blocks L-type channels in the heart: slows the SA and AV nodes and weakens contraction','Constipation (verapamil), slow heart rate, heart block. <b>Never verapamil with a β-blocker.</b> Avoid in heart failure with reduced ejection fraction'],
  ['Thiazide-like diuretic (D)','Indapamide','Blocks the sodium–chloride cotransporter in the distal convoluted tubule','Low sodium, low potassium; raised glucose, urate (gout) and calcium'],
  ['β-blocker','Bisoprolol, atenolol (-olol)','Blocks β₁: lower heart rate and contractility, and less renin','Slow heart rate, tiredness, cold hands, erectile dysfunction; bronchospasm (avoid in asthma); hides the warning signs of hypoglycaemia. Not first line for blood pressure alone'],
  ['α₁-blocker','Doxazosin','Blocks α₁ receptors on arterioles: vasodilation','<b>Postural hypotension</b>. Also relaxes the prostate, which helps men with urinary symptoms'],
  ['Aldosterone antagonist','Spironolactone','Blocks the mineralocorticoid receptor in the collecting duct','<b>High potassium</b>, breast enlargement in men']]],
 ['flow',[
  ['Step 1','Type 2 diabetes at any age, or under 55 and not of Black African or African-Caribbean family origin: <b>A</b> (ACE inhibitor or ARB). Aged 55 or over, or of Black African or African-Caribbean origin without diabetes: <b>C</b> (calcium channel blocker).'],
  ['Step 2','<b>A + C</b>, or A + D (thiazide-like diuretic). In people of Black African or African-Caribbean origin, choose an ARB rather than an ACE inhibitor.'],
  ['Step 3','<b>A + C + D</b>.'],
  ['Step 4','Resistant hypertension. Potassium 4.5 mmol/L or less: add low-dose <b>spironolactone</b>. Above 4.5: add an alpha-blocker or beta-blocker. Ask for specialist advice.']]],
 ['notes',
  ['exam','Targets: clinic blood pressure <b>below 140/90</b> under the age of 80, and below 150/90 at 80 and over. Lifestyle advice comes with every step: less salt and alcohol, weight loss, exercise, stopping smoking.'],
  ['clin','Postural hypotension','A fall of 20 mmHg systolic (or 10 diastolic) within 3 minutes of standing, with dizziness or falls. The baroreflex is too slow or there is too little volume: older age, dehydration, antihypertensives (especially alpha-blockers and diuretics), autonomic neuropathy in diabetes or Parkinson\'s disease.'],
  ['fix','Cardio Biomed deck · RAAS slide','Three corrections. <b>Angiotensinogen</b> (not "angiotensin") is made by the liver all the time; the step that responds to low blood pressure is <b>renin</b> release from the kidney. ACE is not "released": it sits on the surface of endothelial cells, mostly in the lungs. And angiotensin II constricts vessels directly through AT₁ receptors on smooth muscle; it is <b>ACE itself</b> that breaks down bradykinin, which is why ACE inhibitors cause a cough and ARBs do not.'],
  ['fix','Cardio Biomed deck · antihypertensive table','Benign prostatic hyperplasia is listed as a side effect of alpha-blockers: it is a <b>use</b>. The side effect is postural hypotension. Doxazosin is the alpha-blocker used for blood pressure; tamsulosin is selective for the prostate. "Hepatotoxicity" is not a typical ACE inhibitor effect: remember cough, high potassium, angioedema and kidney function. The hypertension slide also lists symptoms; most people have none.']]
]},
/* ------------------------------------------------------------------ */
{id:'cardio-ihd',eb:'Disease',h:'Atherosclerosis, angina and heart attacks',p:'Coronary disease is a problem of supply and demand. A stable plaque limits supply on exertion (angina). A ruptured plaque with clot on top cuts off supply at rest (acute coronary syndrome).',b:[
 ['pwside','athero',
  ['card','Risk factors',['<b>Cannot change:</b> age, male sex, family history of early heart disease, South Asian origin.','<b>Can change:</b> smoking, high blood pressure, high LDL cholesterol, diabetes, obesity, inactivity, chronic kidney disease.','<b>Primary prevention:</b> QRISK score of 10% or more over 10 years: offer atorvastatin 20 mg.','<b>After an event:</b> atorvastatin 80 mg.']],
  ['card','Statins',['Inhibit <b>HMG-CoA reductase</b>, the rate-limiting step of cholesterol synthesis in the liver.','The liver responds by putting more LDL receptors on its surface, pulling LDL out of the blood.','Side effects: muscle aches, rarely muscle breakdown (check creatine kinase), raised liver enzymes.','Interact with clarithromycin and grapefruit juice (CYP3A4). Not in pregnancy.']]],
 ['table',['','Stable angina','Unstable angina','NSTEMI','STEMI'],[
  ['The plaque','Fixed narrowing, cap intact','Ruptured, with clot partly blocking the artery','Ruptured, with clot partly or briefly blocking the artery','Ruptured, with clot <b>completely</b> blocking the artery'],
  ['The pain','On exertion; gone within minutes of rest or GTN','At rest, or new and rapidly worsening','At rest, lasting more than 15 minutes','At rest, lasting more than 15 minutes'],
  ['Heart muscle','Short of oxygen only during effort','Ischaemia, no cell death','Partial-thickness (subendocardial) infarct','Full-thickness (transmural) infarct'],
  ['ECG','Normal at rest','Normal, or ST depression or T wave inversion','ST depression, T wave inversion, or normal','<b>ST elevation</b> in one territory, or new left bundle branch block'],
  ['Troponin','Normal','<b>Normal</b>','<b>Raised</b>','Raised (do not wait for it)']]],
 ['cards',[
  ['Recognising a heart attack',['Central crushing or tight chest pain spreading to the left arm, neck or jaw.','Sweating, nausea, breathlessness, pallor, a feeling of doom.','<b>Silent or atypical</b> presentations (breathlessness, collapse, indigestion-like pain, or nothing) are common in people with diabetes, older people and women.','<b>Complications:</b> arrhythmias (ventricular fibrillation is the commonest cause of early death), heart failure and cardiogenic shock, rupture of a papillary muscle (sudden mitral regurgitation), the septum or the free wall, pericarditis, left ventricular aneurysm and clot.']],
  ['Troponin',['Troponin I and T are parts of the troponin complex on the thin filament: C binds calcium, I inhibits, T anchors the complex to tropomyosin.','The <b>cardiac</b> forms are found only in heart muscle and leak into the blood when cells die.','High-sensitivity troponin rises within about 3 hours, peaks at 1 to 2 days and stays up for 1 to 2 weeks. It is measured on arrival and repeated: a <b>rise</b> is what matters.','Also raised in pulmonary embolus, myocarditis, sepsis and kidney failure, so interpret it with the history and ECG.']]]],
 ['flow',[
  ['Everyone with a suspected acute coronary syndrome','ECG within 10 minutes. <b>Aspirin 300 mg</b>, chewed. GTN and IV morphine for pain. Oxygen only if saturations are below 94%.'],
  ['STEMI','<b>Primary PCI</b> (angioplasty and stent) if symptoms began within 12 hours and it can be done within 120 minutes. If not, <b>thrombolysis</b> (alteplase or tenecteplase). A second antiplatelet drug and heparin are given around the procedure.'],
  ['NSTEMI or unstable angina','Fondaparinux and a second antiplatelet drug. Work out the <b>GRACE score</b> (risk of death within 6 months): above 3%, coronary angiography within 72 hours (at once if unstable); 3% or below, treat with drugs alone.'],
  ['Afterwards, for life','Aspirin 75 mg (with a second antiplatelet for up to 12 months), a <b>β-blocker</b>, an <b>ACE inhibitor</b> and high-dose <b>statin</b>. Cardiac rehabilitation and stopping smoking.']]],
 ['table',['Drug','How it works','Notes'],[
  ['GTN (spray or tablet under the tongue)','Releases nitric oxide → cGMP → smooth muscle relaxes. Mainly <b>dilates veins</b>: less blood returns to the heart, preload falls and the heart needs less oxygen. Also dilates coronary arteries','Headache, flushing, low blood pressure. Never with sildenafil. Isosorbide mononitrate is the long-acting form; tolerance develops without a nitrate-free period each day'],
  ['β-blocker','Slows the heart and weakens contraction: less oxygen demand, and a longer diastole for coronary filling','First-line prevention of angina, with or instead of a calcium channel blocker'],
  ['Calcium channel blocker','Amlodipine dilates arteries, lowering afterload; verapamil and diltiazem also slow the heart',''],
  ['Aspirin','Irreversibly inhibits COX-1 in platelets: no thromboxane A₂, so less aggregation','75 mg daily for life; stomach irritation and bleeding'],
  ['Clopidogrel, ticagrelor, prasugrel','Block the P2Y₁₂ (ADP) receptor on platelets','Given with aspirin after an acute coronary syndrome or stent'],
  ['Alteplase, tenecteplase','Activate plasminogen to plasmin, which digests fibrin','Thrombolysis: risk of bleeding, including into the brain']]],
 ['notes',
  ['fix','Cardio Biomed deck · GTN','The slide says GTN works by "arteriolar relaxation". At the doses used for angina it mainly relaxes <b>veins</b>, lowering preload and so the work of the heart; it also widens the coronary arteries.'],
  ['fix','Cardio Biomed deck · ischaemia table and MI management','<b>Unstable angina</b> is listed as "no ECG changes": the ECG may be normal but often shows ST depression or T wave inversion; what separates it from NSTEMI is a normal troponin. Troponin is described as "bound to actin" and blocking myosin: the blocker is <b>tropomyosin</b>; troponin is the calcium-sensitive switch that moves it. Myoglobin and creatine kinase are no longer used to diagnose heart attacks. In the STEMI slide, glycoprotein IIb/IIIa inhibitors are not routine treatment for PCI: standard care is aspirin plus a second antiplatelet and heparin. And pulmonary oedema follows <b>raised</b>, not reduced, pressure in the pulmonary veins and capillaries.']]
]},
/* ------------------------------------------------------------------ */
{id:'cardio-failure',eb:'Disease',h:'Heart failure and valve disease',p:'Heart failure is a syndrome, not a single disease: the heart cannot pump enough for the body\'s needs, or can only do so at high filling pressures. The body\'s attempts to compensate make it worse.',b:[
 ['think','Whipping a tired horse. The sympathetic system and the RAAS whip the failing heart to work harder and load it with more fluid. It keeps up for a while, then tires faster. Every drug that prolongs life in heart failure takes the whip away.'],
 ['pw','hfcycle'],
 ['table',['','Reduced ejection fraction (HFrEF)','Preserved ejection fraction (HFpEF)'],[
  ['Ejection fraction','Below 40%','50% or more'],
  ['The fault','Weak contraction ("systolic" failure)','Stiff ventricle that fills poorly ("diastolic" failure)'],
  ['The ventricle','Dilated, thin walled','Thick walled, normal-sized cavity'],
  ['Causes','Coronary disease and heart attack, dilated cardiomyopathy, myocarditis, alcohol, leaking valves','Hypertension, aortic stenosis, ageing, diabetes, obesity'],
  ['Extra heart sound','S3','S4'],
  ['Drugs that prolong life','ACE inhibitor (or ARB, or sacubitril–valsartan), β-blocker, mineralocorticoid receptor antagonist, SGLT2 inhibitor','SGLT2 inhibitor; control blood pressure and AF'],
  ['For symptoms','Loop diuretic','Loop diuretic']]],
 ['table',['','Left heart failure','Right heart failure'],[
  ['Blood backs up into','The lungs','The systemic veins'],
  ['Symptoms','Breathlessness on exertion, then lying flat (orthopnoea) and waking at night gasping (paroxysmal nocturnal dyspnoea); cough with pink frothy sputum; fatigue','Swollen ankles, swollen abdomen, weight gain, poor appetite'],
  ['Signs','Fine crackles at both lung bases, displaced apex beat, third heart sound, pleural effusions','Raised JVP, pitting oedema of ankles and sacrum, enlarged tender liver, ascites'],
  ['Common causes','Coronary disease, hypertension, valve disease','Left heart failure (the commonest), chronic lung disease (cor pulmonale), pulmonary embolus']]],
 ['cards',[
  ['Investigating',['<b>NT-proBNP</b> first: a normal level makes heart failure unlikely. Above 2,000 ng/L: echocardiogram within 2 weeks; 400 to 2,000: within 6 weeks.','<b>Echocardiogram:</b> ejection fraction, wall movement, valves.','<b>ECG:</b> rarely normal in heart failure.','<b>Chest X-ray (ABCDE):</b> <b>A</b>lveolar oedema (bat\'s wings), Kerley <b>B</b> lines, <b>C</b>ardiomegaly (heart wider than half the chest), <b>D</b>ilated upper lobe vessels, pleural <b>E</b>ffusions.']],
  ['Why each drug works',['<b>Loop diuretic</b> (furosemide): removes fluid. Relieves symptoms only.','<b>ACE inhibitor or ARB:</b> blocks the RAAS: less afterload, less fluid retention, less scarring.','<b>β-blocker</b> (bisoprolol, carvedilol): shields the heart from constant sympathetic drive. Start low, go slow.','<b>Spironolactone:</b> blocks aldosterone.','<b>SGLT2 inhibitor</b> (dapagliflozin): loses sodium and glucose in urine; improves survival.','<b>Sacubitril–valsartan:</b> stops the breakdown of natriuretic peptides and blocks AT₁.','<b>Acute pulmonary oedema:</b> sit up, oxygen, IV furosemide.']]]],
 ['table',['Valve problem','Murmur','Typical causes','Clues'],[
  ['Aortic stenosis','Ejection systolic, radiating to the carotids','Calcification with age; bicuspid valve','Slow-rising pulse, narrow pulse pressure; angina, fainting, breathlessness'],
  ['Aortic regurgitation','Early diastolic, at the left sternal edge, leaning forward','Bicuspid valve, endocarditis, a dilated aortic root (Marfan syndrome)','Collapsing pulse, wide pulse pressure'],
  ['Mitral regurgitation','Pansystolic at the apex, radiating to the axilla','Valve prolapse, papillary muscle damage after a heart attack, a dilated ventricle, endocarditis','Displaced apex, third heart sound'],
  ['Mitral stenosis','Low rumble in mid-diastole at the apex; loud S1','Rheumatic heart disease','Flushed cheeks, atrial fibrillation']]]
]},
/* ------------------------------------------------------------------ */
{id:'cardio-develop',eb:'Development',h:'Heart development and congenital heart disease',p:'The heart begins as a straight tube that starts beating on about day 22, loops, and is divided into four chambers by week 8. Most congenital heart disease is a septum, valve or great vessel that did not finish forming.',b:[
 ['pw','heartdev'],
 ['table',['Part of the heart tube','Becomes'],[
  ['Truncus arteriosus','Aorta and pulmonary trunk'],
  ['Bulbus cordis','Right ventricle and both outflow tracts'],
  ['Primitive ventricle','Left ventricle'],
  ['Primitive atrium','The rough-walled front parts of both atria'],
  ['Sinus venosus','The smooth part of the right atrium and the coronary sinus']]],
 ['cards',[
  ['Dividing the atria',['The <b>septum primum</b> grows down towards the endocardial cushions. The gap beneath it is the ostium primum.','Before that gap closes, holes appear higher up: the <b>ostium secundum</b>.','A second, thicker <b>septum secundum</b> grows to its right, overlapping the holes but leaving an opening: the <b>foramen ovale</b>.','The septum primum acts as a flap valve: blood passes right to left in the fetus, bypassing the lungs.','At birth left atrial pressure rises and pushes the flap shut. It stays unsealed (a patent foramen ovale) in about a quarter of adults.']],
  ['Dividing the ventricles and outflow tract',['A muscular septum grows up from the apex.','The final gap is closed by the <b>membranous septum</b> from the endocardial cushions: the commonest site of a ventricular septal defect.','<b>Neural crest cells</b> migrate in and build a <b>spiral septum</b> that divides the truncus into aorta and pulmonary trunk.','No spiral: <b>transposition</b>. No septum: persistent truncus arteriosus. Uneven division: <b>tetralogy of Fallot</b>.','Deletion of chromosome 22q11 (DiGeorge syndrome) disturbs neural crest cells: outflow tract defects.']]]],
 ['table',['Defect','What is wrong','Shunt','Clues'],[
  'Not cyanosed: left-to-right shunts and obstructions',
  ['Ventricular septal defect','A hole in the ventricular septum. The commonest defect','Left to right','Pansystolic murmur at the left sternal edge. Small ones often close; large ones cause heart failure in infancy'],
  ['Atrial septal defect','Usually an ostium secundum defect','Left to right','Fixed, wide splitting of S2. Often found in adults; a clot from a leg vein can cross to the brain'],
  ['Atrioventricular septal defect','The endocardial cushions fail to fuse','Left to right','Strongly linked with <b>Down\'s syndrome</b>'],
  ['Patent ductus arteriosus','The duct between aorta and pulmonary artery stays open','Left to right','Continuous "machinery" murmur below the left clavicle. Preterm babies, congenital rubella. Prostaglandins keep it open, so <b>NSAIDs</b> (ibuprofen, indomethacin) close it'],
  ['Coarctation of the aorta','Narrowing of the aorta near the duct','None','Weak, delayed femoral pulses; blood pressure higher in the arms than legs. Turner syndrome'],
  ['Aortic or pulmonary stenosis','A narrowed valve','None','Ejection systolic murmur; the ventricle behind it thickens'],
  'Cyanosed: right-to-left shunts',
  ['Tetralogy of Fallot','Ventricular septal defect, pulmonary stenosis, an aorta that overrides the defect, right ventricular hypertrophy','Right to left','The commonest cyanotic defect. Blue spells relieved by squatting; boot-shaped heart on X-ray'],
  ['Transposition of the great arteries','Aorta arises from the right ventricle and pulmonary artery from the left: two separate circuits','No mixing unless a shunt stays open','Blue from the first day. Give <b>prostaglandin</b> to keep the duct open, then an arterial switch operation. Maternal diabetes'],
  ['Single-ventricle hearts','Tricuspid atresia, hypoplastic left heart','Depends on the duct','Collapse when the duct closes; staged surgery'],
  ['Ebstein\'s anomaly','The tricuspid valve is set too low in the right ventricle','Right to left through an atrial defect','Linked with lithium in pregnancy']]],
 ['cards',[
  ['Imaging the heart',['<b>Echocardiography:</b> ultrasound through the chest wall. Chamber size, wall movement, ejection fraction, valves. Doppler shows flow: red towards the probe, blue away.','<b>Transoesophageal echo:</b> the probe sits just behind the left atrium: the best view of the atrial appendage (clot), the valves (endocarditis) and the atrial septum.','<b>Bubble echo:</b> shaken saline is injected into a vein. Bubbles are normally filtered out by the lungs; bubbles appearing in the <b>left</b> heart prove a right-to-left shunt.','<b>CT coronary angiography:</b> the first test for stable chest pain; shows the coronary arteries and calcium.','<b>Cardiac MRI:</b> the most detailed picture of muscle structure, function and scar.','<b>Invasive coronary angiography:</b> a catheter through the radial artery, with contrast and X-rays; a stent can be placed at the same time.','<b>Nuclear perfusion and PET:</b> which muscle is alive and well supplied.']],
  ['Eisenmenger syndrome',['A large left-to-right shunt floods the lungs for years.','The pulmonary arteries thicken and pulmonary pressure climbs.','When right-sided pressure exceeds left, the shunt <b>reverses</b>.','The patient becomes cyanosed and clubbed, and the defect can no longer be repaired.'],'The reason large defects are closed early.']]],
 ['notes',
  ['exam','The cyanotic defects start with T: <b>T</b>etralogy of Fallot, <b>T</b>ransposition, <b>T</b>runcus arteriosus, <b>T</b>ricuspid atresia, <b>T</b>otal anomalous pulmonary venous return.'],
  ['fix','Cardio Biomed deck · congenital and imaging slides','A patent foramen ovale is not the usual cause of an atrial septal defect: a PFO is a flap that failed to seal, while a true ASD (most often ostium secundum) is missing tissue. In tetralogy of Fallot the "overriding aorta" sits astride the ventricular septal defect, so it receives blood from both ventricles. Down\'s syndrome is classically linked with atrioventricular septal defects. And a bubble echo looks for shunts between the <b>right and left atria</b> (or ventricles), not "RA and LV".']]
]},
/* ------------------------------------------------------------------ */
{id:'cardio-anaemia',eb:'Blood',h:'Anaemia, iron and vitamin B12',p:'Anaemia is a low haemoglobin concentration: below about 130 g/L in men and 115 g/L in women. It is a finding, not a diagnosis. The red cell size (MCV) tells you where to look next.',b:[
 ['tree','anaemia'],
 ['table',['','Microcytic (MCV below 80 fL)','Normocytic (80 to 100)','Macrocytic (above 100)'],[
  ['Causes','<b>Iron deficiency</b> (by far the commonest), thalassaemia, anaemia of chronic disease, sideroblastic anaemia, lead poisoning','Acute blood loss, anaemia of chronic disease, chronic kidney disease (low EPO), haemolysis, bone marrow failure','<b>Megaloblastic:</b> B12 or folate deficiency. <b>Not megaloblastic:</b> alcohol, liver disease, hypothyroidism, many young red cells (reticulocytes), pregnancy, myelodysplasia, drugs such as methotrexate'],
  ['Next tests','Ferritin and iron studies; haemoglobin electrophoresis if ferritin is normal','Reticulocyte count, kidney function, CRP, blood film, haemolysis screen','B12, folate, thyroid and liver function, blood film']]],
 ['table',['','Iron deficiency','Anaemia of chronic disease','Thalassaemia trait'],[
  ['Ferritin (iron stores)','<span class="down">Low</span>','Normal or <span class="up">high</span>','Normal'],
  ['Serum iron','<span class="down">Low</span>','<span class="down">Low</span>','Normal'],
  ['Transferrin (total iron-binding capacity)','<span class="up">High</span>','<span class="down">Low</span>','Normal'],
  ['Transferrin saturation','<span class="down">Low</span>','<span class="down">Low</span>','Normal'],
  ['Why','Not enough iron in the body','Inflammation (IL-6) raises hepcidin, which locks iron inside macrophages and blocks absorption','A globin chain gene is faulty: very small cells but a high red cell count']]],
 ['pw','ironabs','b12abs'],
 ['cards',[
  ['Iron deficiency',['<b>Causes:</b> blood loss (periods; the gut), poor diet, malabsorption (coeliac disease), pregnancy and growth.','<b>Any man, or any woman after the menopause, with iron deficiency needs the gut investigated</b> for cancer.','<b>Signs:</b> pallor, spoon-shaped nails (koilonychia), cracks at the corners of the mouth (angular stomatitis), a smooth sore tongue (atrophic glossitis), craving for ice or non-foods (pica).','<b>Film:</b> small, pale red cells; pencil cells.','<b>Treatment:</b> oral ferrous sulfate or fumarate once a day (black stools, constipation, nausea), continued for 3 months after the haemoglobin is normal. IV iron if tablets fail.']],
  ['Vitamin B12 and folate',['Both are needed to make DNA. Without them the nucleus matures slowly while the cell keeps growing: large <b>megaloblasts</b> in the marrow, large red cells and hypersegmented neutrophils in the blood.','<b>B12:</b> from animal foods; stores last 2 to 5 years. Causes of deficiency: <b>pernicious anaemia</b> (the commonest in the UK), vegan diet, gastrectomy, disease or removal of the terminal ileum (Crohn\'s), metformin, nitrous oxide.','<b>Folate:</b> from green leaves; stores last a few months; absorbed in the jejunum. Causes: poor diet, alcohol, pregnancy, coeliac disease, methotrexate, trimethoprim, phenytoin.','<b>Only B12 deficiency damages nerves:</b> peripheral neuropathy, loss of vibration and position sense, and subacute combined degeneration of the spinal cord (dorsal columns and corticospinal tracts).','<b>Treatment:</b> intramuscular hydroxocobalamin three times a week for 2 weeks, then every 2 to 3 months; on alternate days until no further improvement if nerves are affected. Folic acid 5 mg daily for folate deficiency.']],
  ['Pernicious anaemia',['An <b>autoimmune</b> disease: antibodies against <b>intrinsic factor</b> or the gastric parietal cells that make it.','No intrinsic factor, so B12 cannot be absorbed in the terminal ileum.','Associated with other autoimmune diseases (thyroid disease, vitiligo, type 1 diabetes) and a raised risk of stomach cancer.','Test: intrinsic factor antibodies (specific), parietal cell antibodies (sensitive, less specific).','Treatment is B12 by injection for life, because tablets cannot be absorbed normally.']],
  ['Any anaemia: effects and haemolysis',['<b>Symptoms:</b> tiredness, breathlessness on exertion, palpitations, dizziness, headache; angina and heart failure get worse.','<b>Signs:</b> pale conjunctivae, fast pulse, a soft flow murmur.','<b>Compensation:</b> more 2,3-BPG (the dissociation curve shifts right), higher cardiac output, more erythropoietin.','<b>Haemolysis</b> (red cells destroyed early): raised unconjugated bilirubin with jaundice, raised LDH, low haptoglobin, raised reticulocytes. Causes include sickle cell disease, hereditary spherocytosis, G6PD deficiency, autoimmune haemolysis, malaria and mechanical heart valves.']]]],
 ['notes',
  ['exam','A low ferritin proves iron deficiency. But ferritin rises with inflammation, so a normal ferritin does not rule it out in someone who is unwell.'],
  ['fix','Cardio Biomed deck · types of anaemia','Three corrections. <b>B12 deficiency is not hypochromic</b>: it gives large cells with a normal haemoglobin concentration. Hypochromic, microcytic cells mean iron deficiency or thalassaemia. Hypothyroidism usually gives a <b>macrocytic</b> anaemia. And "normoblastic" macrocytosis is not caused by malabsorption (that causes B12 or folate deficiency, which is megaloblastic): its causes are alcohol, liver disease, hypothyroidism and a high reticulocyte count.'],
  ['fix','Cardio Biomed deck · B12 absorption','The slide has B12, haptocorrin and intrinsic factor forming one complex in the stomach. In the stomach B12 binds <b>haptocorrin</b> only. In the duodenum pancreatic enzymes digest haptocorrin, and only then does B12 bind <b>intrinsic factor</b>, which carries it to the terminal ileum. This is why pancreatic failure can also cause B12 deficiency. Always replace B12 before folate: folate alone can correct the blood count while the nerve damage progresses.']]
]}
],
/* ================================================================== */
trees:{
anaemia:{kind:'artery',dir:'ltr',label:'Working out the cause of anaemia from the MCV',hint:'Tap any box for details. Start with the size of the red cells.',root:{t:'Low haemoglobin',s:'look at the MCV',d:'Anaemia: haemoglobin below about 130 g/L in men or 115 g/L in women. The mean cell volume (MCV) splits the causes into three groups.',c:[
 {t:'Microcytic',s:'MCV below 80',k:'artery',d:'Small, pale cells: the marrow cannot make enough haemoglobin (not enough iron, or faulty globin chains).',c:[
  {t:'Iron deficiency',s:'ferritin low',k:'artery',d:'The commonest cause of anaemia worldwide. Find the reason: blood loss, diet, malabsorption or pregnancy.'},
  {t:'Thalassaemia',s:'ferritin normal',k:'artery',d:'Inherited fault in alpha or beta globin. The cells are very small for the degree of anaemia. Confirm with haemoglobin electrophoresis.'},
  {t:'Chronic disease',s:'ferritin normal or high',k:'artery',d:'Hepcidin locks iron away in macrophages. Usually normocytic, sometimes microcytic.'}]},
 {t:'Normocytic',s:'MCV 80 to 100',k:'vein',d:'Normal-sized cells: either they are being lost, or too few are being made. The reticulocyte count tells you which.',c:[
  {t:'Reticulocytes high',s:'marrow is responding',k:'vein',d:'Red cells are being lost or destroyed and the marrow is working to replace them.',c:[
   {t:'Bleeding',s:'recent blood loss',k:'vein',d:'Haemoglobin may be normal for the first hours, until fluid shifts dilute the blood.'},
   {t:'Haemolysis',s:'bilirubin and LDH high',k:'vein',d:'Jaundice, raised unconjugated bilirubin and LDH, low haptoglobin. A positive direct antiglobulin (Coombs) test means it is autoimmune.'}]},
  {t:'Reticulocytes low',s:'marrow is under-producing',k:'vein',d:'The marrow is not responding as it should.',c:[
   {t:'Chronic disease, CKD',s:'inflammation · low EPO',k:'vein',d:'Chronic inflammation, infection or cancer; or kidneys that no longer make enough erythropoietin.'},
   {t:'Marrow failure',s:'other counts low too',k:'vein',d:'Aplastic anaemia, leukaemia, marrow infiltration, chemotherapy. White cells and platelets are usually low as well.'}]}]},
 {t:'Macrocytic',s:'MCV above 100',k:'lymph',d:'Large cells. The blood film separates megaloblastic causes from the rest.',c:[
  {t:'Megaloblastic',s:'hypersegmented neutrophils',k:'lymph',d:'DNA synthesis is impaired, so the nucleus lags behind the cytoplasm.',c:[
   {t:'B12 deficiency',s:'nerves affected',k:'lymph',d:'Pernicious anaemia, vegan diet, ileal disease, metformin. Can cause neuropathy and spinal cord damage.'},
   {t:'Folate deficiency',s:'no nerve damage',k:'lymph',d:'Poor diet, alcohol, pregnancy, coeliac disease, methotrexate.'}]},
  {t:'Not megaloblastic',s:'round macrocytes',k:'lymph',d:'Alcohol, liver disease, hypothyroidism, reticulocytosis, pregnancy, myelodysplasia, drugs.'}]}]}}
},
/* ================================================================== */
pw:{
myogenic:{t:'Autoregulation: the myogenic response',k:'cardio',sec:'cardio-flow',mn:'Stretch makes the arteriole squeeze back',steps:[
 ['Arterial pressure rises',''],
 ['The wall of the arteriole is stretched',''],
 ['Stretch-sensitive channels open in its smooth muscle, depolarising the cells',''],
 ['Voltage-gated calcium channels open and calcium enters',''],
 ['The smooth muscle contracts and the arteriole narrows',''],
 ['Resistance rises in step with pressure',''],
 ['Blood flow to the organ stays about the same','Works between a mean pressure of roughly 60 and 150 mmHg in brain and kidney. Below that range, flow falls with pressure.']],
 foot:'It works in reverse too: a fall in pressure relaxes the arteriole.'},
hyperaemia:{t:'Active hyperaemia: flow follows demand',k:'cardio',sec:'cardio-flow',mn:'Work → waste → widening → washout',steps:[
 ['A tissue works harder','Exercising muscle, an active part of the brain, a faster-beating heart.'],
 ['It uses more oxygen and produces more waste','Oxygen falls; CO₂, H⁺, lactate, potassium and adenosine (from ATP breakdown) rise, and so does temperature.'],
 ['These metabolites relax the smooth muscle of nearby arterioles','A direct local effect: no nerves or hormones are needed.'],
 ['Arterioles dilate and more capillaries open',''],
 ['Blood flow through the tissue rises',''],
 ['Faster flow drags on the endothelium upstream, which releases nitric oxide','This widens the larger feeding arteries as well.'],
 ['Oxygen delivery now matches demand and the metabolites are washed away',''],
 ['When the work stops, arteriolar tone returns','']]},
cardiaccycle:{t:'One heartbeat',k:'cardio',sec:'cardio-cycle',mn:'Fill, top up, squeeze shut, eject, relax shut, fill',steps:[
 ['Late diastole: atria and ventricles are relaxed, AV valves are open and the ventricles fill passively','About 80% of filling happens before the atria contract.'],
 ['Atrial systole tops up the ventricles','Follows the P wave. End-diastolic volume, about 120 mL, is reached.'],
 ['The ventricles start to contract and their pressure rises above atrial pressure','Follows the QRS.'],
 ['The mitral and tricuspid valves close: first heart sound',''],
 ['Isovolumetric contraction: all valves closed, pressure climbs steeply',''],
 ['Ventricular pressure exceeds aortic and pulmonary artery pressure, and the outflow valves open',''],
 ['Ejection: about 70 mL leaves each ventricle',''],
 ['The ventricles relax and their pressure falls below arterial pressure','The T wave.'],
 ['The aortic and pulmonary valves close: second heart sound',''],
 ['Isovolumetric relaxation: all valves closed, pressure falls',''],
 ['Ventricular pressure drops below atrial pressure, the AV valves open and rapid filling begins','']]},
conduction:{t:'The conducting system',k:'cardio',sec:'cardio-electric',mn:'SA node → atria → AV node → His → branches → Purkinje',steps:[
 ['The SA node, in the right atrium near the superior vena cava, fires spontaneously','It is the fastest pacemaker, so it sets the rate: 60 to 100 a minute.'],
 ['The impulse spreads from cell to cell across both atria through gap junctions','The P wave; the atria contract.'],
 ['The fibrous ring between atria and ventricles stops it going any further','The AV node is the only electrical route through.'],
 ['The AV node conducts slowly, delaying the impulse by about 0.1 seconds','The PR interval. It gives the ventricles time to fill, and limits how many impulses get through in atrial fibrillation.'],
 ['The bundle of His carries the impulse into the septum',''],
 ['The right and left bundle branches run down either side of the septum','The septum itself depolarises from left to right.'],
 ['Purkinje fibres spread the impulse rapidly through the ventricular walls','The fastest conduction in the heart, about 4 m/s, so both ventricles contract together.'],
 ['Ventricular muscle depolarises from the apex upwards and from the inside outwards','The QRS. Blood is squeezed up towards the outflow valves.'],
 ['The ventricles repolarise','The T wave.']],
 foot:'If the SA node fails, slower pacemakers take over: AV node 40 to 60 a minute, ventricles 20 to 40.'},
cardiacecc:{t:'From action potential to heartbeat',k:'cardio',sec:'cardio-electric',mn:'Trigger calcium releases stored calcium',an:'Calcium from outside is the match; the calcium store is the bonfire.',steps:[
 ['The action potential spreads along the cell membrane and down the T-tubules',''],
 ['L-type calcium channels open during the plateau','A small amount of calcium enters from outside the cell.'],
 ['This trigger calcium opens ryanodine receptors on the sarcoplasmic reticulum','Calcium-induced calcium release. Unlike skeletal muscle, calcium from outside the cell is essential.'],
 ['Stored calcium floods into the cytosol',''],
 ['Calcium binds troponin C, and tropomyosin moves off the binding sites on actin',''],
 ['Myosin heads bind actin and cycle: the cell shortens','More calcium means more cross-bridges and a stronger beat. This is how the heart changes its force.'],
 ['SERCA pumps calcium back into the sarcoplasmic reticulum','Sped up by β₁ stimulation, so the heart also relaxes faster.'],
 ['The sodium–calcium exchanger removes the rest from the cell','Three sodium in for one calcium out. It depends on the sodium gradient made by the Na⁺/K⁺-ATPase: this is where digoxin acts.'],
 ['Calcium leaves troponin and the muscle relaxes','']]},
exercisecv:{t:'The cardiovascular response to exercise',k:'cardio',sec:'cardio-output',mn:'Output up five-fold, resistance down',steps:[
 ['At the start of exercise the brain raises sympathetic drive and withdraws vagal tone','"Central command", reinforced by signals from moving muscles and joints.'],
 ['Heart rate and contractility rise','β₁ receptors.'],
 ['Veins constrict and the muscle pump squeezes blood back to the heart',''],
 ['Venous return and preload rise, so stroke volume rises','Frank–Starling.'],
 ['Cardiac output rises, by up to five times',''],
 ['Metabolites dilate the arterioles of working muscle, so total peripheral resistance falls','Local control overrides sympathetic constriction in active muscle.'],
 ['Sympathetic constriction diverts blood away from the gut and kidneys',''],
 ['Systolic pressure rises; diastolic pressure stays the same or falls a little','Mean pressure rises only slightly: output is up but resistance is down.'],
 ['As the body warms, skin vessels dilate to lose heat','']]},
baroreflex:{t:'Standing up: the baroreceptor reflex',k:'cardio',sec:'cardio-bp',mn:'Less stretch, less firing, more sympathetic',steps:[
 ['You stand up, and gravity pools about 500 mL of blood in the leg veins',''],
 ['Venous return falls, so stroke volume and cardiac output fall',''],
 ['Arterial pressure dips',''],
 ['Baroreceptors in the carotid sinus and aortic arch are stretched less and fire less often',''],
 ['Fewer signals reach the nucleus tractus solitarius in the medulla','From the carotid sinus in the glossopharyngeal nerve (IX); from the aortic arch in the vagus (X).'],
 ['The medulla cuts vagal outflow and increases sympathetic outflow',''],
 ['Heart rate and contractility rise (β₁); arterioles and veins constrict (α₁)','Resistance rises, and venoconstriction pushes blood back towards the heart.'],
 ['Blood pressure is restored within a few heartbeats','']],
 foot:'Baroreceptors reset within days, so they cannot correct long-standing hypertension.'},
raas:{t:'The renin–angiotensin–aldosterone system',k:'cardio',sec:'cardio-bp',mn:'Renin, then ACE, then AT₁ and aldosterone',steps:[
 ['Blood pressure or blood volume falls',''],
 ['Juxtaglomerular cells in the wall of the afferent arteriole release renin','Three triggers: less stretch of the afferent arteriole, less sodium chloride reaching the macula densa, and sympathetic β₁ stimulation.'],
 ['Renin cuts angiotensinogen, made continuously by the liver, into angiotensin I',''],
 ['ACE on the endothelium, mostly in the lungs, converts angiotensin I to angiotensin II',''],
 ['Within minutes, angiotensin II constricts arterioles through AT₁ receptors','In the kidney it constricts the efferent arteriole more than the afferent, protecting filtration.'],
 ['Angiotensin II then makes the adrenal cortex release aldosterone','It also causes thirst and ADH release, and increases sodium reabsorption in the proximal tubule.'],
 ['Aldosterone makes the collecting duct reabsorb sodium, and water follows; potassium is lost',''],
 ['Blood volume and pressure rise, which switches renin release off','']]},
athero:{t:'How an atherosclerotic plaque forms and ruptures',k:'cardio',sec:'cardio-ihd',mn:'Injury, LDL, foam cells, cap, rupture, clot',an:'A spot under the skin of the artery: it fills with fat, walls itself off, and causes real trouble only when it bursts.',steps:[
 ['The endothelium is injured','By high blood pressure, smoking, high glucose, and turbulent flow where arteries branch.'],
 ['LDL cholesterol enters the intima and is oxidised',''],
 ['Endothelial cells display adhesion molecules; monocytes stick and migrate into the intima',''],
 ['Monocytes become macrophages, engulf oxidised LDL and turn into foam cells','A collection of foam cells is a fatty streak: present from the teenage years and reversible.'],
 ['Foam cells release cytokines and growth factors, then die, leaving a core of fat and debris',''],
 ['Smooth muscle cells migrate from the media into the intima, multiply and lay down collagen',''],
 ['A fibrous cap covers the lipid core: an atheromatous plaque','A thick cap makes a stable plaque, which narrows the artery and causes angina on exertion.'],
 ['Inflammation thins the cap until it ruptures','Enzymes from macrophages digest the collagen.'],
 ['Exposed collagen and tissue factor activate platelets and the clotting cascade',''],
 ['A thrombus forms on the plaque and blocks the artery: an acute coronary syndrome','']]},
hfcycle:{t:'The vicious circle of heart failure',k:'cardio',sec:'cardio-failure',mn:'Low output → compensation → more load → lower output',steps:[
 ['Heart muscle is damaged or overloaded','A heart attack, long-standing hypertension, valve disease.'],
 ['Cardiac output falls',''],
 ['Baroreceptors and the kidneys sense that the arteries are under-filled',''],
 ['The sympathetic system and the RAAS switch on, and ADH rises',''],
 ['Heart rate and contractility rise, arterioles constrict, and the kidneys keep salt and water',''],
 ['Preload and afterload both rise','Helpful for hours (Frank–Starling), harmful over months.'],
 ['The ventricle works harder against a greater load',''],
 ['Remodelling: the muscle thickens, stretches and scars','Angiotensin II, aldosterone and noradrenaline are directly toxic to heart muscle.'],
 ['Pumping gets worse, and fluid backs up into the lungs and tissues',''],
 ['Output falls further and the circle turns again','']]},
heartdev:{t:'Building a heart',k:'cardio',sec:'cardio-develop',mn:'Tubes, fuse, beat, loop, cushions, septa, spiral',steps:[
 ['Days 18 to 19: heart-forming cells in the mesoderm make two endocardial tubes',''],
 ['Day 21: the embryo folds, bringing the tubes together to fuse into one heart tube',''],
 ['Day 22: the tube begins to beat',''],
 ['Days 23 to 28: the tube loops to the right, bringing the atria up behind the ventricles',''],
 ['Week 4: endocardial cushions grow and divide the atrioventricular canal into right and left',''],
 ['Weeks 4 to 5: the septum primum, then the septum secundum, divide the atria, leaving the foramen ovale',''],
 ['Weeks 4 to 7: the muscular, then the membranous, septum divides the ventricles',''],
 ['Weeks 5 to 8: a spiral septum built by neural crest cells divides the outflow tract into aorta and pulmonary trunk',''],
 ['At birth: the foramen ovale and ductus arteriosus close','']]},
ironabs:{t:'Iron absorption',k:'blood',sec:'cardio-anaemia',mn:'Reduce, enter, store or export, oxidise, carry',steps:[
 ['Iron reaches the duodenum as haem iron (meat) or ferric iron, Fe³⁺ (plants)',''],
 ['Stomach acid and vitamin C keep it soluble; a reductase on the brush border reduces Fe³⁺ to Fe²⁺',''],
 ['Fe²⁺ enters the enterocyte through the DMT1 transporter','Haem is taken up separately and its iron released inside the cell.'],
 ['Inside the cell, iron is either stored as ferritin or passed on','Iron left in ferritin is lost when the cell is shed a few days later. The body has no way to excrete iron, so absorption is the only control.'],
 ['Ferroportin exports Fe²⁺ across the basolateral membrane','Hepcidin from the liver destroys ferroportin. Hepcidin is high in iron overload and inflammation, and low in iron deficiency.'],
 ['Hephaestin oxidises it back to Fe³⁺',''],
 ['Fe³⁺ binds transferrin in the plasma',''],
 ['Transferrin delivers iron to the bone marrow for haemoglobin, and to stores in the liver and macrophages','']]},
b12abs:{t:'Vitamin B12 absorption',k:'blood',sec:'cardio-anaemia',mn:'Free it, haptocorrin, swap to intrinsic factor, ileum',steps:[
 ['B12 arrives bound to animal protein in food',''],
 ['Stomach acid and pepsin free it from the protein',''],
 ['Free B12 binds haptocorrin from saliva, which protects it from acid',''],
 ['In the duodenum, pancreatic enzymes digest haptocorrin and release B12',''],
 ['B12 now binds intrinsic factor, which was secreted by the gastric parietal cells',''],
 ['The B12–intrinsic factor complex travels to the terminal ileum',''],
 ['It binds the cubilin receptor and is taken into the cell by endocytosis',''],
 ['B12 enters the blood bound to transcobalamin and is stored in the liver','Stores last 2 to 5 years, so deficiency develops slowly.']]}
},
/* ================================================================== */
flips:[
 ['Flow and vessel radius','Flow is proportional to radius to the fourth power.'],
 ['Main site of vascular resistance','Arterioles.'],
 ['Circulation that constricts in hypoxia','Pulmonary.'],
 ['When is the left ventricle perfused?','Mainly in diastole.'],
 ['First heart sound','Mitral and tricuspid valves closing.'],
 ['Second heart sound','Aortic and pulmonary valves closing.'],
 ['Third heart sound','Rapid filling of an overfilled ventricle: heart failure (normal in the young).'],
 ['Fourth heart sound','Atrial contraction into a stiff ventricle. Never in AF.'],
 ['Ejection fraction','Stroke volume ÷ end-diastolic volume. Normal 55 to 70%.'],
 ['Mean arterial pressure','Diastolic + one third of the pulse pressure.'],
 ['Giant v waves in the JVP','Tricuspid regurgitation.'],
 ['Cannon a waves','Complete heart block.'],
 ['Pacemaker potential','Funny (HCN) channels: sodium leaks in during phase 4.'],
 ['Upstroke in nodal cells','L-type calcium channels.'],
 ['Plateau of the ventricular action potential','Calcium in through L-type channels balances potassium out.'],
 ['Normal PR interval','120 to 200 ms (3 to 5 small squares).'],
 ['Normal QRS duration','Under 120 ms (3 small squares).'],
 ['Inferior leads and their artery','II, III, aVF: right coronary artery.'],
 ['Irregularly irregular pulse, no P waves','Atrial fibrillation.'],
 ['WiLLiaM and MaRRoW','LBBB: W in V1, M in V6. RBBB: M in V1, W in V6.'],
 ['Shockable arrest rhythms','Ventricular fibrillation and pulseless ventricular tachycardia.'],
 ['First drug in hyperkalaemia with ECG changes','IV calcium gluconate.'],
 ['Digoxin mechanism','Inhibits Na⁺/K⁺-ATPase: more calcium in the cell; also slows the AV node.'],
 ['Where is renin made?','Juxtaglomerular cells of the afferent arteriole.'],
 ['ACE inhibitor cough','Bradykinin is no longer broken down.'],
 ['First-line drug: hypertension aged 60, no diabetes','Calcium channel blocker (amlodipine).'],
 ['Unstable angina versus NSTEMI','Troponin: normal in unstable angina, raised in NSTEMI.'],
 ['Statin target','HMG-CoA reductase.'],
 ['How GTN relieves angina','Venodilation lowers preload and oxygen demand.'],
 ['Blood test for heart failure','NT-proBNP.'],
 ['Tetralogy of Fallot','VSD, pulmonary stenosis, overriding aorta, right ventricular hypertrophy.'],
 ['Drug that keeps the ductus open','Prostaglandin E (NSAIDs close it).'],
 ['Hepcidin','Liver hormone that blocks iron absorption by destroying ferroportin.'],
 ['Where is B12 absorbed?','Terminal ileum, bound to intrinsic factor.'],
 ['Low ferritin means...','Iron deficiency.']
],
/* ================================================================== */
qs:[
{sec:'cardio-flow',type:'sba',q:'An arteriole constricts so that its radius halves. If the pressure difference across it is unchanged, what happens to the flow through it?',
 o:['It falls to one sixteenth','It falls to one half','It falls to one quarter','It falls to one eighth','It falls to one thirty-second'],a:0,
 e:'Poiseuille\'s law: flow is proportional to the fourth power of the radius. Half the radius gives (½)⁴ = 1/16 of the flow. This is why small changes in arteriolar tone have such a large effect on blood pressure and on the flow to an organ.'},
{sec:'cardio-flow',type:'sba',q:'A 30-year-old woman hyperventilates during a panic attack and feels light-headed, with tingling around her mouth. Why has her cerebral blood flow fallen?',
 o:['Low arterial CO₂ constricts cerebral arterioles','High arterial oxygen constricts cerebral arterioles','Sympathetic nerves constrict cerebral arterioles through α₁ receptors','Her blood pressure has fallen below the range of autoregulation','Low CO₂ dilates cerebral veins, so blood pools'],a:0,
 e:'Cerebral arterioles are very sensitive to CO₂: a high level dilates them and a low level constricts them. Hyperventilation blows off CO₂, constricting cerebral vessels. (The tingling is from the alkalosis lowering ionised calcium.) The same effect is used briefly to lower intracranial pressure.'},
{sec:'cardio-flow',type:'saq',q:'Which type of blood vessel is the main site of resistance to blood flow?',acc:['arteriole'],m:'Arterioles',
 e:'The largest fall in pressure in the circulation happens across the arterioles. Their smooth muscle tone sets total peripheral resistance and decides how flow is shared between organs.'},
{sec:'cardio-flow',type:'sba',q:'A man with nephrotic syndrome loses large amounts of albumin in his urine and develops swollen legs. Which change in the Starling forces explains the oedema?',
 o:['Lower plasma oncotic pressure','Higher capillary hydrostatic pressure','Higher interstitial hydrostatic pressure','Blocked lymphatic drainage','Lower capillary permeability'],a:0,
 e:'Albumin provides most of the oncotic pressure that holds fluid inside capillaries. When it is low, more fluid is filtered into the tissues than the lymphatics can return. Heart failure causes oedema by raising hydrostatic pressure; inflammation by making capillaries leaky.'},
{sec:'cardio-cycle',type:'sba',q:'During which phase of the cardiac cycle are all four valves closed while left ventricular pressure rises from about 10 to 80 mmHg?',
 o:['Isovolumetric contraction','Isovolumetric relaxation','Rapid ejection','Atrial systole','Rapid ventricular filling'],a:0,
 e:'Once the ventricles start to contract, the AV valves close (S1). Until ventricular pressure exceeds aortic pressure the outflow valves stay closed too, so pressure rises with no change in volume. Isovolumetric relaxation also has all valves closed, but pressure is falling.'},
{sec:'cardio-cycle',type:'sba',q:'A 70-year-old man with long-standing hypertension has an extra heart sound just before the first heart sound. What produces it?',
 o:['Atrial contraction forcing blood into a stiff left ventricle','Rapid passive filling of a dilated ventricle','The aortic valve closing well before the pulmonary valve','Blood leaking back through the mitral valve','A stenosed mitral valve snapping open'],a:0,
 e:'A fourth heart sound comes in late diastole, when the atrium contracts against a stiff, hypertrophied ventricle. It is always abnormal and cannot occur in atrial fibrillation. A third heart sound comes early in diastole from rapid filling of an overloaded ventricle.'},
{sec:'cardio-cycle',type:'saq',q:'A left ventricle has an end-diastolic volume of 150 mL and an end-systolic volume of 60 mL. What is the ejection fraction, as a percentage?',acc:['60|0.6'],m:'60% (stroke volume 90 mL ÷ 150 mL)',
 e:'Stroke volume = 150 − 60 = 90 mL. Ejection fraction = 90 ÷ 150 = 0.6, or 60%, which is normal (55 to 70%).'},
{sec:'cardio-cycle',type:'sba',q:'On examining the neck of a breathless woman you see large waves in the jugular vein that coincide with the carotid pulse. Which lesion do giant v waves suggest?',
 o:['Tricuspid regurgitation','Atrial fibrillation','Complete heart block','Tricuspid stenosis','Aortic regurgitation'],a:0,
 e:'In tricuspid regurgitation the right ventricle pushes blood back into the right atrium during systole, producing a large systolic (v) wave. AF abolishes the a wave; complete heart block gives occasional cannon a waves; tricuspid stenosis gives large a waves.'},
{sec:'cardio-electric',type:'sba',q:'Which current produces the upstroke (phase 0) of the action potential in the SA node?',
 o:['Calcium entering through L-type channels','Sodium entering through fast voltage-gated channels','Sodium entering through funny (HCN) channels','Potassium leaving through delayed rectifier channels','Chloride entering through ligand-gated channels'],a:0,
 e:'Nodal cells have few working fast sodium channels. Funny channels bring the cell slowly up to threshold (phase 4), then L-type calcium channels produce the upstroke. This is why calcium channel blockers such as verapamil slow the SA and AV nodes.'},
{sec:'cardio-electric',type:'sba',q:'Why can cardiac muscle not be tetanised?',
 o:['The long plateau keeps the cell refractory for almost the whole contraction','Cardiac muscle has no sarcoplasmic reticulum','Gap junctions spread each impulse too slowly','The AV node filters out rapid impulses','Calcium is removed from the cytosol too quickly'],a:0,
 e:'The ventricular action potential lasts about 300 ms because of the calcium plateau, and the cell cannot be re-excited during it. By the time it can fire again, it has nearly relaxed. Contractions therefore cannot fuse, and the heart always has time to fill.'},
{sec:'cardio-electric',type:'sba',q:'A woman taking digoxin for atrial fibrillation is started on furosemide. Two weeks later she has nausea, yellow-tinged vision and frequent ventricular ectopic beats. Which disturbance has made digoxin toxicity more likely?',
 o:['Hypokalaemia','Hyperkalaemia','Hyponatraemia','Hypocalcaemia','Hypermagnesaemia'],a:0,
 e:'Digoxin competes with potassium for its binding site on the Na⁺/K⁺-ATPase. Loop diuretics lower potassium, so more digoxin binds and toxicity appears at a "normal" dose. Kidney impairment (digoxin is renally cleared), low magnesium and high calcium also increase the risk.'},
{sec:'cardio-electric',type:'saq',q:'Which ion channels carry the slow inward current that causes the pacemaker potential (phase 4) in the SA node?',acc:['funny|hcn'],m:'Funny (HCN) channels',
 e:'Funny channels open when the cell repolarises and let sodium leak in, so the membrane drifts up to threshold. Sympathetic stimulation (cAMP) opens them more readily and speeds the heart; ivabradine blocks them and slows it.'},
{sec:'cardio-electric',type:'sba',q:'A man with an inferior heart attack has a heart rate of 36 a minute and a blood pressure of 82/50 mmHg. Which drug is appropriate, and how does it work?',
 o:['Atropine: blocks muscarinic M₂ receptors at the SA and AV nodes','Adenosine: blocks conduction through the AV node','Bisoprolol: blocks β₁ receptors','Digoxin: increases vagal tone at the AV node','Verapamil: blocks L-type calcium channels'],a:0,
 e:'The right coronary artery usually supplies the SA and AV nodes, and inferior infarcts increase vagal tone, so bradycardia is common. Atropine removes the vagal brake by blocking M₂ receptors. Every other option would slow the heart further.'},
{sec:'cardio-ecg',type:'sba',q:'A 72-year-old woman with hypertension and type 2 diabetes has an irregularly irregular pulse of 130 a minute. The ECG shows no P waves. As well as controlling her heart rate, which treatment matters most for preventing a stroke?',
 o:['Anticoagulation with a direct oral anticoagulant','Aspirin 75 mg daily','Clopidogrel 75 mg daily','Digoxin','Atorvastatin'],a:0,
 e:'Atrial fibrillation lets blood stagnate and clot in the left atrial appendage. Her CHA₂DS₂-VASc score is 4 (age 65 to 74, female, hypertension, diabetes), so anticoagulation is recommended. Antiplatelet drugs do not adequately prevent stroke in AF.'},
{sec:'cardio-ecg',type:'sba',q:'An ECG shows the PR interval getting longer with each beat until a P wave is not followed by a QRS complex; the pattern then repeats. What is this?',
 o:['Second-degree heart block, Mobitz type I (Wenckebach)','First-degree heart block','Second-degree heart block, Mobitz type II','Third-degree (complete) heart block','Left bundle branch block'],a:0,
 e:'Progressive lengthening of the PR interval before a dropped beat is Wenckebach, a fault within the AV node that is usually benign. In Mobitz II the PR interval is fixed and beats drop without warning. In complete block P waves and QRS complexes are unrelated.'},
{sec:'cardio-ecg',type:'sba',q:'A man with crushing chest pain has ST elevation in leads II, III and aVF. Which artery is most likely to be blocked?',
 o:['Right coronary artery','Left anterior descending artery','Circumflex artery','Left main stem','A diagonal branch of the left anterior descending artery'],a:0,
 e:'II, III and aVF look at the inferior surface of the heart, supplied by the right coronary artery in most people. Anterior and septal leads (V1 to V4) reflect the left anterior descending artery; lateral leads (I, aVL, V5, V6) the circumflex.'},
{sec:'cardio-ecg',type:'sba',q:'A man on dialysis has missed two sessions. His potassium is 7.4 mmol/L and his ECG shows tall tented T waves and a broad QRS. Which drug should be given first?',
 o:['Intravenous calcium gluconate','Intravenous insulin with glucose','Nebulised salbutamol','An oral potassium-binding resin','Intravenous furosemide'],a:0,
 e:'With ECG changes the immediate danger is cardiac arrest. Calcium gluconate stabilises the cardiac membrane within minutes, though it does not lower potassium. Insulin with glucose and salbutamol then move potassium into cells, and dialysis removes it.'},
{sec:'cardio-ecg',type:'saq',q:'On a standard ECG there are 4 large squares between consecutive R waves. What is the heart rate in beats per minute?',acc:['75'],m:'75 beats per minute (300 ÷ 4)',
 e:'At 25 mm/s each large square is 0.2 seconds, so there are 300 large squares in a minute. Rate = 300 ÷ the number of large squares between R waves.'},
{sec:'cardio-output',type:'sba',q:'A dehydrated patient is given a litre of saline and her stroke volume rises. What is the mechanism?',
 o:['A larger end-diastolic volume stretches the muscle, so it contracts more forcefully','β₁ stimulation raises calcium in the muscle cells','Arterioles dilate, lowering afterload','The heart slows, lengthening systole','End-diastolic volume falls, raising the ejection fraction'],a:0,
 e:'This is the Frank–Starling law: more filling (preload) stretches the sarcomeres to a better overlap and makes them more sensitive to calcium, so the next contraction is stronger. It is a change in preload, not in contractility.'},
{sec:'cardio-output',type:'saq',q:'A patient has a blood pressure of 150/90 mmHg. What is the mean arterial pressure in mmHg?',acc:['110'],m:'110 mmHg (90 + one third of 60)',
 e:'Pulse pressure = 150 − 90 = 60 mmHg. Mean arterial pressure = diastolic + ⅓ pulse pressure = 90 + 20 = 110 mmHg. Diastolic pressure is weighted more heavily because diastole lasts about twice as long as systole.'},
{sec:'cardio-output',type:'sba',q:'A patient in cardiogenic shock is given dobutamine, a β₁ agonist. What happens to the left ventricular pressure–volume loop?',
 o:['End-systolic volume falls and stroke volume rises from the same end-diastolic volume','End-diastolic volume rises and stroke volume is unchanged','End-systolic volume rises because afterload increases','The loop becomes taller and narrower','End-diastolic pressure rises because the ventricle becomes stiffer'],a:0,
 e:'Greater contractility steepens the end-systolic pressure–volume line: the ventricle empties further from the same filling volume, so end-systolic volume falls and stroke volume and ejection fraction rise. A taller, narrower loop describes increased afterload.'},
{sec:'cardio-output',type:'saq',q:'A person has a heart rate of 80 beats per minute and a stroke volume of 65 mL. What is the cardiac output in litres per minute?',acc:['5.2|5200'],m:'5.2 L/min (65 mL × 80)',
 e:'Cardiac output = stroke volume × heart rate = 65 × 80 = 5,200 mL/min = 5.2 L/min.'},
{sec:'cardio-bp',type:'sba',q:'A 48-year-old white British man has an ambulatory blood pressure average of 152/96 mmHg. He does not have diabetes. According to NICE, which drug is first line?',
 o:['Ramipril','Amlodipine','Indapamide','Bisoprolol','Doxazosin'],a:0,
 e:'Under 55 and not of Black African or African-Caribbean origin: start with an ACE inhibitor (or ARB). Calcium channel blockers are first line at 55 or over, or for people of Black African or African-Caribbean origin without diabetes. Anyone with type 2 diabetes starts with an ACE inhibitor or ARB.'},
{sec:'cardio-bp',type:'sba',q:'A woman has had a dry, tickly cough since starting ramipril two months ago. What is the cause, and what is the best change?',
 o:['Bradykinin builds up because ACE normally breaks it down; switch to losartan','Angiotensin I builds up in the lungs; switch to lisinopril','Aldosterone falls and dries the airways; add spironolactone','Mast cells release histamine; add an antihistamine','β₂ receptors in the airways are blocked; switch to bisoprolol'],a:0,
 e:'ACE also breaks down bradykinin. With ACE blocked, bradykinin accumulates in the airways and causes a cough in about 1 in 10 people. Angiotensin receptor blockers act further down the pathway and leave bradykinin alone. Another ACE inhibitor would do the same.'},
{sec:'cardio-bp',type:'sba',q:'A 35-year-old woman has a blood pressure of 178/104 mmHg. She takes no medicines. Sodium is 144 mmol/L and potassium is 3.0 mmol/L. What is the most likely cause?',
 o:['Primary hyperaldosteronism (Conn\'s syndrome)','Phaeochromocytoma','Essential hypertension','Addison\'s disease','Coarctation of the aorta'],a:0,
 e:'Hypertension in a young person with a low potassium suggests too much aldosterone: sodium and water are retained and potassium is lost in the collecting duct. Screen with an aldosterone:renin ratio (high aldosterone, suppressed renin). Addison\'s disease causes low blood pressure and high potassium.'},
{sec:'cardio-bp',type:'sba',q:'A healthy man stands up quickly from lying down. Which event comes first in the reflex that maintains his blood pressure?',
 o:['Baroreceptors in the carotid sinus fire less often','Baroreceptors in the carotid sinus fire more often','Vagal outflow to the SA node increases','The kidneys release renin','The posterior pituitary releases ADH'],a:0,
 e:'Standing pools blood in the legs, so venous return and arterial pressure dip. Baroreceptors are stretch receptors: less stretch means fewer impulses. The medulla responds by cutting vagal tone and raising sympathetic outflow. Renin and ADH act over a longer timescale.'},
{sec:'cardio-bp',type:'saq',q:'Which cells release renin?',acc:['juxtaglomerular|granular|jg'],m:'Juxtaglomerular (granular) cells of the afferent arteriole',
 e:'Juxtaglomerular cells are modified smooth muscle cells in the wall of the afferent arteriole. They release renin when the arteriole is less stretched, when the macula densa senses less sodium chloride, and when β₁ receptors are stimulated.'},
{sec:'cardio-bp',type:'sba',q:'A 74-year-old man with widespread vascular disease starts ramipril. Two weeks later his creatinine has doubled. What is the most likely explanation?',
 o:['Bilateral renal artery stenosis: filtration depended on angiotensin II constricting the efferent arteriole','Direct toxicity of ramipril to the tubular cells','Crystals blocking both ureters','An allergic reaction in the kidney interstitium','Loss of prostaglandins constricting the afferent arteriole'],a:0,
 e:'When the renal arteries are narrowed, glomerular pressure is maintained by angiotensin II squeezing the efferent arteriole. An ACE inhibitor removes that, and filtration collapses. This is why kidney function is checked 1 to 2 weeks after starting. Loss of prostaglandins is the mechanism for NSAIDs.'},
{sec:'cardio-ihd',type:'sba',q:'A 58-year-old man has had crushing central chest pain for 40 minutes. His ECG shows ST elevation in V1 to V4. A hospital offering primary PCI is 30 minutes away. What is the best management?',
 o:['Aspirin 300 mg and immediate transfer for primary PCI','Thrombolysis with alteplase, then observe','Aspirin, then repeat the troponin in 3 hours before deciding','A GTN infusion and CT coronary angiography','Fondaparinux and coronary angiography within 72 hours'],a:0,
 e:'This is an anterior STEMI. The treatment is to reopen the artery as fast as possible: primary PCI if it can be done within 120 minutes, which it can here. Thrombolysis is for when PCI cannot be delivered in time. Do not wait for troponin when the ECG shows ST elevation.'},
{sec:'cardio-ihd',type:'sba',q:'A woman has 30 minutes of chest pain at rest. Her ECG shows ST depression in V4 to V6. Troponin is 12 ng/L on arrival and 340 ng/L three hours later. What is the diagnosis?',
 o:['NSTEMI','Unstable angina','STEMI','Stable angina','Pericarditis'],a:0,
 e:'Chest pain at rest with a rising troponin but no ST elevation is a non-ST elevation myocardial infarction. If the troponin had stayed normal it would be unstable angina. Stable angina comes on with exertion and settles with rest.'},
{sec:'cardio-ihd',type:'sba',q:'How does sublingual GTN relieve angina?',
 o:['It dilates veins, lowering preload and the oxygen demand of the heart','It blocks β₁ receptors, slowing the heart','It blocks L-type calcium channels in heart muscle','It inhibits cyclo-oxygenase in platelets','It dissolves fibrin in the coronary thrombus'],a:0,
 e:'GTN releases nitric oxide, which raises cGMP in vascular smooth muscle. Veins dilate most, so less blood returns to the heart, the ventricle is less stretched and needs less oxygen. Coronary arteries dilate too.'},
{sec:'cardio-ihd',type:'saq',q:'Which enzyme do statins inhibit?',acc:['hmg'],m:'HMG-CoA reductase',
 e:'HMG-CoA reductase is the rate-limiting enzyme of cholesterol synthesis. With less cholesterol made, liver cells put more LDL receptors on their surface and clear more LDL from the blood.'},
{sec:'cardio-ihd',type:'sba',q:'Five days after an anterior heart attack a man suddenly becomes very breathless. He has a new pansystolic murmur at the apex radiating to the axilla, and crackles throughout both lungs. What has happened?',
 o:['A papillary muscle has ruptured, causing acute mitral regurgitation','Dressler\'s syndrome','A left ventricular aneurysm has formed','The free wall has ruptured, causing tamponade','Another coronary artery has blocked'],a:0,
 e:'Dead papillary muscle can tear a few days after an infarct. The mitral valve suddenly leaks, and blood is forced back into the left atrium and lungs: acute pulmonary oedema with a new murmur of mitral regurgitation. Free wall rupture causes tamponade and collapse without a murmur.'},
{sec:'cardio-failure',type:'sba',q:'A 74-year-old woman has increasing breathlessness, needs three pillows to sleep, and has crackles at both lung bases and swollen ankles. Which blood test should be done first to decide whether she needs an echocardiogram?',
 o:['NT-proBNP','Troponin','D-dimer','Creatine kinase','C-reactive protein'],a:0,
 e:'Natriuretic peptides are released by stretched ventricles. A normal NT-proBNP makes heart failure unlikely; a raised level means an echocardiogram is needed (within 2 weeks if above 2,000 ng/L).'},
{sec:'cardio-failure',type:'sba',q:'Which of these drugs improves symptoms in heart failure with reduced ejection fraction but has not been shown to prolong life?',
 o:['Furosemide','Ramipril','Bisoprolol','Spironolactone','Dapagliflozin'],a:0,
 e:'Loop diuretics remove fluid and relieve breathlessness and swelling, but do not change survival. ACE inhibitors, β-blockers, mineralocorticoid receptor antagonists and SGLT2 inhibitors all reduce mortality by blocking the harmful compensations or their effects.'},
{sec:'cardio-failure',type:'saq',q:'Which extra heart sound, heard in early diastole, is caused by blood rushing into an overfilled, failing ventricle?',acc:['s3|third|3rd'],m:'The third heart sound (S3)',
 e:'S3 follows S2 closely and gives a "gallop" rhythm in heart failure. It can be normal in children, young adults and pregnancy. S4 comes just before S1 and means a stiff ventricle.'},
{sec:'cardio-failure',type:'sba',q:'β-blockers weaken contraction, yet they prolong life in chronic heart failure. Why?',
 o:['They protect the heart from the damaging long-term effects of sympathetic overactivity','They increase contractility once the patient is used to them','They make the kidneys excrete salt and water','They dilate veins and lower preload','They raise natriuretic peptide levels'],a:0,
 e:'Chronic sympathetic drive raises heart rate and oxygen demand, causes arrhythmias, drives renin release and is directly toxic to heart muscle. Blocking it slows remodelling. Because they do weaken contraction at first, β-blockers are started at a low dose in stable patients and increased slowly.'},
{sec:'cardio-develop',type:'sba',q:'A 6-week-old baby with Down\'s syndrome is breathless and sweaty when feeding and has a loud murmur. Echocardiography shows a defect in the centre of the heart involving both the atrial and ventricular septa. Which embryonic structure failed to develop normally?',
 o:['The endocardial cushions','The septum secundum','The spiral aorticopulmonary septum','The sixth aortic arch','The sinus venosus'],a:0,
 e:'The endocardial cushions divide the atrioventricular canal and contribute to the lower atrial septum, the upper ventricular septum and the AV valves. Failure gives an atrioventricular septal defect, the heart defect most strongly associated with Down\'s syndrome.'},
{sec:'cardio-develop',type:'sba',q:'A newborn becomes deeply cyanosed within hours of birth. There is no murmur, and oxygen makes no difference. The aorta is found to arise from the right ventricle. Which drug should be started at once?',
 o:['A prostaglandin E infusion, to keep the ductus arteriosus open','Indomethacin, to close the ductus arteriosus','Intravenous furosemide','Surfactant down the endotracheal tube','Adenosine'],a:0,
 e:'In transposition of the great arteries the two circulations run side by side, and the baby survives only if blood can mix between them through the duct or the foramen ovale. Prostaglandin E keeps the duct open until an arterial switch operation. NSAIDs would close it.'},
{sec:'cardio-develop',type:'sba',q:'A toddler with tetralogy of Fallot squats down when he becomes blue and breathless, and his colour improves. Why does squatting help?',
 o:['It raises systemic vascular resistance, so less blood shunts from right to left','It lowers systemic vascular resistance, so more blood reaches the lungs','It reduces venous return, resting the right ventricle','It slows the heart through the vagus nerve','It reopens the ductus arteriosus'],a:0,
 e:'In Fallot\'s tetralogy, blood leaving the right ventricle chooses between a narrowed pulmonary outflow and the aorta sitting over the septal defect. Squatting kinks the leg arteries and raises systemic resistance, making the aorta the harder route, so more blood goes to the lungs.'},
{sec:'cardio-develop',type:'saq',q:'Which migrating embryonic cells build the spiral septum that separates the aorta from the pulmonary trunk?',acc:['neural crest'],m:'Neural crest cells',
 e:'Cardiac neural crest cells migrate into the outflow tract and form the aorticopulmonary septum. Faults in this process cause transposition, persistent truncus arteriosus and tetralogy of Fallot, and explain the heart defects of 22q11 deletion.'},
{sec:'cardio-anaemia',type:'sba',q:'A 68-year-old man is tired. Haemoglobin is 92 g/L, MCV 71 fL and ferritin 6 µg/L. He eats a normal diet. What is the most important next step?',
 o:['Urgent referral for investigation of the upper and lower gut','Iron tablets, and repeat the blood count in a year','Vitamin B12 injections','Haemoglobin electrophoresis','Bone marrow biopsy'],a:0,
 e:'A low ferritin proves iron deficiency. In a man, or a woman after the menopause, the cause is bleeding from the gut until proved otherwise, and bowel or stomach cancer must be excluded. Iron should be given as well, but not instead.'},
{sec:'cardio-anaemia',type:'sba',q:'A woman with active rheumatoid arthritis has a haemoglobin of 101 g/L, MCV 84 fL, ferritin 310 µg/L, low serum iron and low transferrin. What is the mechanism of her anaemia?',
 o:['Raised hepcidin traps iron inside macrophages and blocks its absorption','Slow blood loss from the gut','Autoantibodies against intrinsic factor','Too little erythropoietin from the kidneys','A diet low in folate'],a:0,
 e:'This is anaemia of chronic disease. Inflammatory cytokines (IL-6) make the liver release hepcidin, which destroys ferroportin: iron cannot leave gut cells or macrophages. Stores (ferritin) are normal or high but the iron is unavailable, and transferrin is low.'},
{sec:'cardio-anaemia',type:'sba',q:'A 60-year-old woman with vitiligo has a haemoglobin of 86 g/L and an MCV of 118 fL. She has numb feet and cannot feel a tuning fork at her ankles. Her illness is most likely caused by antibodies against what?',
 o:['Intrinsic factor','Tissue transglutaminase','Thyroid peroxidase','Red cell membrane antigens','Acetylcholine receptors'],a:0,
 e:'Macrocytic anaemia with loss of vibration sense in someone with another autoimmune disease points to pernicious anaemia: autoantibodies against intrinsic factor (or parietal cells) prevent B12 absorption. Treatment is intramuscular hydroxocobalamin.'},
{sec:'cardio-anaemia',type:'sba',q:'A patient has a macrocytic anaemia and both B12 and folate are low. Why must B12 be replaced before folic acid?',
 o:['Folic acid alone can correct the anaemia while nerve damage gets worse','Folic acid blocks B12 absorption in the ileum','B12 is needed to absorb folic acid from the gut','Folic acid causes haemolysis when B12 is low','Folic acid given first causes a dangerous fall in potassium'],a:0,
 e:'Folic acid can restore DNA synthesis and improve the blood count, but it does nothing for the myelin damage of B12 deficiency and may hasten subacute combined degeneration of the spinal cord. So B12 is always given first.'},
{sec:'cardio-anaemia',type:'saq',q:'Which hormone, made by the liver, reduces iron absorption by destroying ferroportin?',acc:['hepcidin'],m:'Hepcidin',
 e:'Hepcidin is the master regulator of iron. It is high when iron stores are full and in inflammation (trapping iron), and low in iron deficiency (allowing more absorption).'},
{sec:'cardio-anaemia',type:'saq',q:'In which part of the gut is the vitamin B12–intrinsic factor complex absorbed?',acc:['ileum'],m:'The terminal ileum',
 e:'Receptors for the complex are found only in the terminal ileum. Crohn\'s disease or surgical removal of the terminal ileum therefore causes B12 deficiency. Iron and folate are absorbed higher up, in the duodenum and jejunum.'}
]};
})();
