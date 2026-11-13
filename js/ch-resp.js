/* Respiratory biomed. Data-driven chapter: see "DATA-DRIVEN CHAPTERS" in app.js for the block types. */
window.CHAPTERS=window.CHAPTERS||{};
CHAPTERS.resp={
short:'Respiratory',eyebrow:'Respiratory biomed',h1:'Moving air, moving gas',
blurb:'Mechanics of breathing, lung volumes and spirometry, gas exchange, oxygen transport, control of breathing, asthma, COPD, infections.',
lede:'Breathing has four jobs: move air in and out (ventilation), swap gases across the alveolar wall (diffusion), match air to blood (V/Q), and carry the gases in blood. Each job has its own tests and its own way of failing, and almost every lung disease is one of them going wrong.',
secs:[
/* ------------------------------------------------------------------ */
{id:'resp-mech',eb:'Mechanics',h:'The mechanics of breathing',p:'Air moves down pressure gradients. The respiratory muscles change the volume of the chest; by Boyle\'s law (pressure × volume is constant) that changes the pressure in the alveoli, and air follows.',b:[
 ['think','The lungs are two balloons inside a sealed jar with a movable base. Pull the base down (the diaphragm) and the jar gets bigger, the pressure inside the balloons drops, and air is sucked in. Let go and the stretched balloons spring back, pushing the air out. Puncture the jar (pneumothorax) and the balloon collapses however hard you pull.'],
 ['pw','breathin','breathout'],
 ['table',['Pressure','At rest (end of expiration)','During inspiration','Why it matters'],[
  ['Atmospheric','0 (reference)','0','All others are measured relative to this'],
  ['Alveolar','0','Falls to about −1 cmH₂O, so air flows in','Rises above 0 in expiration, so air flows out'],
  ['Intrapleural','About −5 cmH₂O','Becomes more negative (about −8)','Always negative in quiet breathing: it holds the lung against the chest wall'],
  ['Transpulmonary (alveolar − intrapleural)','+5','Increases','The pressure that keeps the lung inflated; if it reaches zero the lung collapses']]],
 ['cards',[
  ['Compliance: how easily the lungs stretch',['Compliance = change in volume ÷ change in pressure.','<b>High compliance</b> (floppy lungs, easy to inflate, poor recoil): <b>emphysema</b>, old age.','<b>Low compliance</b> (stiff lungs, hard work to inflate): <b>pulmonary fibrosis</b>, pulmonary oedema, pneumonia, lack of surfactant; also a stiff chest wall (obesity, kyphoscoliosis).','Two things make the lung recoil: <b>elastic fibres</b> and the <b>surface tension</b> of the fluid lining the alveoli.']],
  ['Surfactant',['A mix of phospholipid and protein made by <b>type II pneumocytes</b> (type I cells are the thin ones for gas exchange).','It <b>lowers surface tension</b>, so less pressure is needed to inflate the lung (compliance rises).','It lowers surface tension more in small alveoli, so they do not empty into large ones (Laplace: pressure = 2 × tension ÷ radius).','It keeps alveoli dry by reducing the pull on fluid from capillaries.','Made from about 24 weeks of gestation; production is stimulated by cortisol and thyroxine.'],'Preterm babies lack it: respiratory distress syndrome.'],
  ['Airway resistance',['By Poiseuille\'s law, resistance is proportional to 1 ÷ radius⁴: <b>halve the radius and resistance rises 16-fold</b>.','Most resistance is in the medium-sized bronchi; the tiny airways are so numerous that together they offer little, which is why early small-airway disease is "silent".','<b>Parasympathetic</b> (vagus, M₃) constricts bronchi and increases mucus; <b>β₂ stimulation</b> (circulating adrenaline, salbutamol) dilates them.','Airways are pulled open as the lung expands, so resistance is lowest at high lung volumes and airways tend to close in forced expiration.']]]],
 ['notes',
  ['clin','Pneumothorax','Air in the pleural space breaks the seal: intrapleural pressure rises to atmospheric, transpulmonary pressure falls to zero and the lung recoils inwards. Sudden pleuritic chest pain and breathlessness; reduced breath sounds with a <b>hyper-resonant</b> percussion note. Typical patient for a spontaneous one: tall, thin young man, or someone with COPD. <b>Tension pneumothorax:</b> a one-way valve traps more air with every breath, pushing the mediastinum across (trachea deviates <b>away</b>), kinking the great veins and causing shock. It is a clinical diagnosis: decompress immediately (needle or finger thoracostomy), then insert a chest drain in the "safe triangle".'],
  ['fix','Resp Biomed deck · expiration','The slide says the "internal intercostals relax" in expiration. Quiet expiration is passive: the <b>diaphragm and external intercostals relax</b> and the lung recoils. The internal intercostals and abdominal muscles <b>contract</b> only in forced expiration.']]
]},
/* ------------------------------------------------------------------ */
{id:'resp-volumes',eb:'Measurement',h:'Lung volumes and lung function tests',p:'Four volumes that do not overlap, and four capacities made by adding them together. Spirometry measures the air you can move; it cannot measure the air you cannot breathe out.',b:[
 ['explore','dg-spiro','Lung volumes and capacities','A spirometer trace: quiet breathing, one maximal breath in, one maximal breath out. Tap a block.',660,
  `<svg viewBox="0 0 780 330" role="img" aria-label="Spirometry trace with lung volumes and capacities">
   <path class="ax" d="M60,20 V300 H500"/>
   <g class="sm" text-anchor="end"><text x="52" y="304">0</text><text x="52" y="214">2</text><text x="52" y="124">4</text><text x="52" y="34">6 L</text></g>
   <path class="grid" d="M60,30 H750 M60,170 H750 M60,192 H750 M60,246 H750"/>
   <path class="c2" d="M70,192 C80,192 85,170 95,170 C105,170 110,192 120,192 C130,192 135,170 145,170 C155,170 160,192 170,192 C180,192 185,170 195,170 C205,170 210,192 220,192 C232,192 240,40 262,30 C284,40 300,236 330,246 C352,240 362,196 376,192 C386,192 391,170 401,170 C411,170 416,192 426,192 C436,192 441,170 451,170 C461,170 466,192 476,192"/>
   <text x="262" y="22" class="sm" text-anchor="middle">maximal inspiration</text><text x="336" y="262" class="sm" text-anchor="middle">maximal expiration</text><text x="120" y="212" class="sm">quiet breathing</text>
   <g data-k="irv"><rect x="516" y="30" width="48" height="140" class="n-org"/><text x="540" y="104" class="sm lab b" text-anchor="middle">IRV</text></g>
   <g data-k="tv"><rect x="516" y="170" width="48" height="22" class="n-imm"/><text x="540" y="185" class="sm lab b" text-anchor="middle">TV</text></g>
   <g data-k="erv"><rect x="516" y="192" width="48" height="54" class="n-nerve"/><text x="540" y="223" class="sm lab b" text-anchor="middle">ERV</text></g>
   <g data-k="rv"><rect x="516" y="246" width="48" height="54" class="n-blood"/><text x="540" y="277" class="sm lab b" text-anchor="middle">RV</text></g>
   <g data-k="ic"><rect x="572" y="30" width="48" height="162" class="n-box"/><text x="596" y="115" class="sm lab b" text-anchor="middle">IC</text></g>
   <g data-k="frc"><rect x="572" y="192" width="48" height="108" class="n-box"/><text x="596" y="250" class="sm lab b" text-anchor="middle">FRC</text></g>
   <g data-k="vc"><rect x="628" y="30" width="48" height="216" class="n-box"/><text x="652" y="142" class="sm lab b" text-anchor="middle">VC</text></g>
   <g data-k="tlc"><rect x="684" y="30" width="48" height="270" class="n-box"/><text x="708" y="168" class="sm lab b" text-anchor="middle">TLC</text></g>
   <text x="540" y="320" class="hd" text-anchor="middle">VOLUMES</text><text x="652" y="320" class="hd" text-anchor="middle">CAPACITIES</text>
  </svg>`,
  {tv:['Tidal volume (TV) · about 500 mL','The air moved in one quiet breath. About 150 mL of it only fills the conducting airways (anatomical dead space), so about 350 mL reaches the alveoli.'],
   irv:['Inspiratory reserve volume (IRV) · about 3 L','The extra air you can breathe in after a normal breath in.'],
   erv:['Expiratory reserve volume (ERV) · about 1.2 L','The extra air you can force out after a normal breath out. Reduced by obesity and pregnancy.'],
   rv:['Residual volume (RV) · about 1.2 L','The air left after a maximal breath out. It stops the alveoli collapsing. <b>Cannot be measured by spirometry</b> (needs helium dilution or body plethysmography). Raised in obstructive disease (air trapping).'],
   ic:['Inspiratory capacity (IC) = TV + IRV','The most you can breathe in from the resting position.'],
   frc:['Functional residual capacity (FRC) = ERV + RV · about 2.4 L','The volume in the lungs at the end of a quiet breath out, where the inward recoil of the lung balances the outward spring of the chest wall. It is the oxygen store you rely on when breathing stops (pre-oxygenation before anaesthesia fills it).'],
   vc:['Vital capacity (VC) = IRV + TV + ERV · about 4.8 L','The most air you can move in one breath. Forced vital capacity (FVC) is the same measured during a forced blow.'],
   tlc:['Total lung capacity (TLC) · about 6 L','Everything: VC + RV. <b>Reduced in restrictive disease, increased in emphysema</b> (hyperinflation).']}],
 ['cards',[
  ['Ventilation sums',['<b>Minute ventilation</b> = tidal volume × respiratory rate = 0.5 L × 12 = 6 L/min.','<b>Alveolar ventilation</b> = (tidal volume − dead space) × rate = 0.35 L × 12 = 4.2 L/min. This is what removes CO₂.','<b>Anatomical dead space:</b> the conducting airways, about 150 mL. <b>Alveolar dead space:</b> alveoli that are ventilated but not perfused (e.g. pulmonary embolism). Together: physiological dead space.','Rapid shallow breathing wastes more of each breath on dead space, so CO₂ rises even if minute ventilation looks normal.']],
  ['The tests',['<b>Peak expiratory flow:</b> the fastest flow in a hard blow from full lungs (L/min). Simple home monitoring for asthma; varies with height, age and sex.','<b>Spirometry:</b> a forced blow from full lungs for at least 6 seconds gives <b>FEV₁</b> (volume in the first second), <b>FVC</b> and their ratio.','<b>Bronchodilator reversibility:</b> FEV₁ rising by 12% and 200 mL or more after salbutamol supports asthma.','<b>FeNO:</b> nitric oxide in breath, raised in eosinophilic airway inflammation (asthma).','<b>Transfer factor (TLCO):</b> uptake of a tiny dose of carbon monoxide in a 10-second breath-hold: tests the gas-exchange surface.']]]],
 ['table',['','Obstructive','Restrictive'],[
  ['Problem','Narrowed airways: air is hard to get <b>out</b>','Small or stiff lungs: hard to get air <b>in</b>'],
  ['FEV₁','<span class="down">↓↓</span>','<span class="down">↓</span>'],
  ['FVC','Normal or slightly <span class="down">↓</span>','<span class="down">↓↓</span>'],
  ['FEV₁ / FVC','<b>Below 0.7</b>','<b>Normal or raised</b> (above 0.7)'],
  ['Total lung capacity','Normal or <span class="up">↑</span> (air trapping)','<span class="down">↓</span>'],
  ['Examples','Asthma, COPD, bronchiectasis, cystic fibrosis','Pulmonary fibrosis, sarcoidosis, obesity, kyphoscoliosis, neuromuscular weakness, pleural disease'],
  ['Transfer factor','Low in emphysema; normal or high in asthma','Low in fibrosis; normal if the cause is outside the lung']]],
 ['sw','dg-loops','Flow–volume loops','Expiration is drawn upwards and inspiration downwards. Full lungs are on the left. The dashed outline is normal.',600,
  `<svg viewBox="0 0 700 330" role="img" aria-label="Flow-volume loops">
   <path class="ax" d="M70,20 V310 M70,170 H660"/>
   <text x="26" y="96" class="sm" text-anchor="middle" transform="rotate(-90 26 96)">expiratory flow</text><text x="26" y="244" class="sm" text-anchor="middle" transform="rotate(-90 26 244)">inspiratory flow</text>
   <text x="650" y="188" class="sm" text-anchor="end">volume breathed out →</text>
   <path data-v="obs res fixed" d="M140,170 C150,80 170,40 190,40 L520,170 C480,270 200,280 140,170 Z" fill="none" stroke="var(--muted)" stroke-width="2" stroke-dasharray="6 5"/>
   <g data-v="normal"><path class="c2" d="M140,170 C150,80 170,40 190,40 L520,170 C480,270 200,280 140,170 Z"/><text x="200" y="34" class="sm lab b">peak expiratory flow</text><text x="140" y="188" class="sm lab" text-anchor="middle">TLC</text><text x="520" y="188" class="sm lab" text-anchor="middle">RV</text></g>
   <g data-v="obs"><path class="c1" d="M90,170 C98,110 110,90 124,90 C170,150 300,160 470,170 C420,240 150,250 90,170 Z"/><text x="250" y="132" class="sm lab b">scooped-out curve</text></g>
   <g data-v="res"><path class="c3" d="M330,170 C338,90 350,56 362,56 L580,170 C550,250 380,255 330,170 Z"/><text x="440" y="74" class="sm lab b">tall, narrow loop</text></g>
   <g data-v="fixed"><path class="c5" d="M140,170 C146,120 160,110 180,110 L420,110 C470,112 505,140 520,170 C505,205 470,228 420,230 L180,230 C160,230 146,220 140,170 Z"/><text x="300" y="102" class="sm lab b" text-anchor="middle">flattened top and bottom</text></g>
  </svg>`,
  [['normal','Normal','<b>Normal.</b> Flow rises quickly to a peak, then falls in an almost straight line as the lungs empty. Inspiration is a smooth, symmetrical curve.'],
   ['obs','Obstructive','<b>Obstructive (asthma, COPD).</b> Peak flow is reduced and the expiratory limb is <b>scooped out</b>, because small airways collapse early in the blow. The loop is shifted to the left: the lungs are hyperinflated, with a raised residual volume.'],
   ['res','Restrictive','<b>Restrictive (fibrosis).</b> The shape is normal but <b>narrow</b>: all volumes are small. Flows are relatively preserved for the volume, giving a tall "witch\'s hat".'],
   ['fixed','Fixed upper airway obstruction','<b>Fixed obstruction of the trachea or larynx</b> (tracheal stenosis, large goitre): flow is capped in both directions, so both limbs are flattened. A variable obstruction outside the chest (vocal cord problem) flattens only inspiration; one inside the chest flattens only expiration.']]],
 ['fix','Resp Biomed deck · spirometry examples','The slide lists pneumothorax as an example of restrictive disease and says COPD gives a "mixed obstructive and restrictive pattern". COPD is <b>obstructive</b> by definition: FEV₁/FVC below 0.7 after a bronchodilator. For the transfer factor test the gas measured is <b>carbon monoxide</b>, not CO₂.']
]},
/* ------------------------------------------------------------------ */
{id:'resp-gas',eb:'Gas exchange',h:'Gas exchange and V/Q matching',p:'Oxygen and carbon dioxide cross the alveolar wall by simple diffusion, driven by differences in partial pressure. It only works if ventilated alveoli are next to perfused capillaries.',b:[
 ['table',['Law','What it says','Use it for'],[
  ['Boyle','At constant temperature, pressure × volume is constant','How changing chest volume moves air'],
  ['Dalton','Total pressure of a gas mixture = the sum of the partial pressures of each gas','Partial pressure of oxygen in air = 21% × 101 kPa ≈ 21 kPa'],
  ['Henry','The amount of gas dissolved in a liquid is proportional to its partial pressure and its solubility','CO₂ is about 20 times more soluble than O₂, so it crosses easily'],
  ['Fick','Diffusion rate ∝ (surface area × pressure difference × solubility) ÷ thickness','Emphysema lowers area; fibrosis and oedema raise thickness'],
  ['Laplace','Pressure to keep a sphere open = 2 × surface tension ÷ radius','Why surfactant matters most in small alveoli']]],
 ['fix','Resp Biomed deck · Dalton\'s law','The slide defines Dalton\'s law as gases moving down their concentration gradient. That is diffusion (Fick\'s law). Dalton\'s law is that the total pressure equals the sum of the partial pressures.'],
 ['table',['','PO₂ (kPa)','PCO₂ (kPa)'],[
  ['Air','21','0.04'],
  ['Alveolar gas','13.3','5.3'],
  ['Arterial blood','11–13','4.7–6.0'],
  ['Mixed venous blood','5.3','6.1'],
  ['Tissue cell','Below 5 (mitochondria work down to about 0.5)','Above 6']]],
 ['fig','dg-vq','Matching ventilation (V) to perfusion (Q)','Blood enters each unit blue (deoxygenated) from the left.',640,
  `<svg viewBox="0 0 780 290" role="img" aria-label="Ventilation perfusion matching">
   <defs><linearGradient id="vqg" x1="0" x2="1"><stop offset="0" style="stop-color:var(--vein)"/><stop offset="1" style="stop-color:var(--artery)"/></linearGradient></defs>
   <g><circle cx="130" cy="96" r="50" style="fill:var(--paper);stroke:var(--accent);stroke-width:3"/><rect x="40" y="150" width="180" height="26" rx="13" fill="url(#vqg)"/>
    <path d="M130,20 V44" class="a-plain"/><text x="130" y="100" class="sm" text-anchor="middle">O₂ in, CO₂ out</text>
    <text x="130" y="206" class="b lab" text-anchor="middle">Matched: V/Q about 1</text><text x="130" y="224" class="sm" text-anchor="middle">blood leaves fully oxygenated</text></g>
   <g><circle cx="390" cy="96" r="50" style="fill:var(--sunk);stroke:var(--line-2);stroke-width:3"/><rect x="300" y="150" width="180" height="26" rx="13" style="fill:var(--vein)"/>
    <path d="M376,26 L404,40 M404,26 L376,40" stroke="var(--inhib)" stroke-width="3"/><text x="390" y="92" class="sm" text-anchor="middle">fluid, pus or</text><text x="390" y="108" class="sm" text-anchor="middle">collapse</text>
    <text x="390" y="206" class="b lab" text-anchor="middle">Shunt: V/Q = 0</text><text x="390" y="224" class="sm" text-anchor="middle">perfused but not ventilated</text><text x="390" y="242" class="sm lab" text-anchor="middle">pneumonia, pulmonary oedema</text><text x="390" y="260" class="sm" text-anchor="middle">extra oxygen helps little</text></g>
   <g><circle cx="650" cy="96" r="50" style="fill:var(--paper);stroke:var(--accent);stroke-width:3"/><rect x="560" y="150" width="180" height="26" rx="13" style="fill:var(--sunk);stroke:var(--line-2)"/>
    <rect x="566" y="152" width="34" height="22" rx="8" style="fill:var(--clin)"/><path d="M650,20 V44" class="a-plain"/><text x="650" y="100" class="sm" text-anchor="middle">air but no blood</text>
    <text x="650" y="206" class="b lab" text-anchor="middle">Dead space: V/Q = ∞</text><text x="650" y="224" class="sm" text-anchor="middle">ventilated but not perfused</text><text x="650" y="242" class="sm lab" text-anchor="middle">pulmonary embolism</text><text x="650" y="260" class="sm" text-anchor="middle">wasted ventilation</text></g>
  </svg>`],
 ['cards',[
  ['V/Q in the healthy lung',['Standing up, gravity sends more <b>blood</b> and more <b>air</b> to the bases, but blood flow increases more steeply than ventilation.','So V/Q is <b>high at the apex</b> (about 3) and <b>low at the base</b> (about 0.6); overall about 0.8.','<b>Hypoxic pulmonary vasoconstriction:</b> pulmonary arterioles constrict where alveolar oxygen is low, diverting blood to better-ventilated lung. This is the opposite of systemic vessels. If the whole lung is hypoxic (altitude, COPD) it raises pulmonary artery pressure and strains the right heart (cor pulmonale).']],
  ['Five causes of a low arterial PO₂',['<b>Hypoventilation</b> (opiates, neuromuscular weakness): CO₂ is high too.','<b>V/Q mismatch</b> (asthma, COPD, pulmonary embolism, pneumonia): the commonest cause; corrects with oxygen.','<b>Shunt</b> (collapsed or fluid-filled lung, some heart defects): corrects poorly with oxygen.','<b>Diffusion limitation</b> (fibrosis, emphysema): worse on exercise.','<b>Low inspired oxygen</b> (altitude).']]]],
 ['table',['Type of hypoxia','Problem','Arterial PO₂','Examples'],[
  ['Hypoxaemic (hypoxic)','Not enough oxygen gets into the blood','Low','Lung disease, hypoventilation, altitude'],
  ['Anaemic','Blood cannot carry enough oxygen','<b>Normal</b> (and saturation is normal)','Anaemia, carbon monoxide poisoning'],
  ['Circulatory (stagnant)','Blood is not delivered to the tissues','Normal','Heart failure, shock, arterial blockage'],
  ['Histotoxic','Cells cannot use the oxygen delivered','Normal (venous oxygen is high)','Cyanide poisoning, sepsis']]],
 ['table',['','Type 1 respiratory failure','Type 2 respiratory failure'],[
  ['Definition','PaO₂ below 8 kPa with a <b>normal or low</b> PaCO₂','PaO₂ below 8 kPa with PaCO₂ <b>above 6 kPa</b>'],
  ['Mechanism','V/Q mismatch or shunt. The healthy lung can blow off extra CO₂ but cannot add extra oxygen, because haemoglobin there is already saturated','<b>Alveolar hypoventilation</b>: not enough air is moved to clear CO₂'],
  ['Causes','Pneumonia, pulmonary oedema, pulmonary embolism, asthma, fibrosis','COPD, exhaustion in severe asthma, opiates and sedatives, neuromuscular disease (Guillain–Barré, MND), obesity, chest wall deformity'],
  ['Oxygen','Give oxygen to a target saturation of 94–98%','<b>Controlled oxygen</b>, target 88–92%; consider non-invasive ventilation if acidotic']]],
 ['fix','Renal deck · respiratory failure','The slide says type 2 failure is due to "alveolar hyperventilation" and notes "don\'t treat with O₂". It is <b>hypoventilation</b>, and hypoxia must still be treated: give <b>controlled</b> oxygen aiming for 88–92% and recheck the blood gas.']
]},
/* ------------------------------------------------------------------ */
{id:'resp-transport',eb:'Transport',h:'Carrying oxygen and carbon dioxide',p:'Oxygen is so poorly soluble that 98% of it travels bound to haemoglobin. Carbon dioxide dissolves much better and mostly travels as bicarbonate.',b:[
 ['widget','odc'],
 ['cards',[
  ['Haemoglobin',['Adult haemoglobin (HbA) is four chains (2 α, 2 β), each with a haem group holding one <b>Fe²⁺</b>, which binds one O₂: four per molecule.','<b>Cooperative binding:</b> the first oxygen is the hardest; binding flips the molecule from the tense (T) to the relaxed (R) state, making the next easier. This gives the <b>S-shaped curve</b>.','The flat top means saturation stays high even if PO₂ falls a little; the steep part means a small fall in tissue PO₂ unloads a lot of oxygen.','<b>Oxygen content</b> = 1.34 mL × Hb (g/dL) × saturation, plus a tiny dissolved amount: about 200 mL per litre of blood.']],
  ['Two effects with names',['<b>Bohr effect</b> (in the tissues): CO₂ and H⁺ bind haemoglobin and lower its affinity for oxygen, so oxygen is released exactly where metabolism is highest. The curve shifts right.','<b>Haldane effect</b> (in the lungs): when haemoglobin picks up oxygen it lets go of CO₂ and H⁺, so CO₂ is released for breathing out. Deoxygenated blood can carry more CO₂.','<b>2,3-DPG</b> from red cells also shifts the curve right; it rises in anaemia and at altitude.']]]],
 ['pw','o2cascade','co2carry'],
 ['table',['Carbon dioxide travels as','Share','How'],[
  ['Bicarbonate','About 70%','In the red cell, carbonic anhydrase converts CO₂ + H₂O → H⁺ + HCO₃⁻. Bicarbonate leaves in exchange for chloride (the <b>chloride shift</b>); haemoglobin buffers the H⁺'],
  ['Carbamino compounds','About 20%','CO₂ binds the amino ends of haemoglobin chains (more readily when deoxygenated)'],
  ['Dissolved','About 10%','In plasma; this is what PaCO₂ measures']]],
 ['notes',
  ['clin','Saturation is not the same as content','In <b>anaemia</b> the PaO₂ and saturation are normal: every haemoglobin molecule is full, there are just too few. In <b>carbon monoxide poisoning</b> CO binds haemoglobin about 240 times more tightly than oxygen; an ordinary pulse oximeter reads carboxyhaemoglobin as oxygenated and gives a falsely normal figure. Headache, confusion and a normal oximeter in several members of one household: think CO. Treat with 100% oxygen.'],
  ['clin','Cyanosis and oximetry','Central cyanosis (blue tongue and lips) appears when there is about 50 g/L of deoxygenated haemoglobin, so it shows late in anaemia and early in polycythaemia. Pulse oximeters can <b>over-read in people with darker skin</b> and are unreliable with poor perfusion, nail varnish or movement; if in doubt, take an arterial blood gas.'],
  ['fix','Resp Biomed deck · anaemia','The slide says anaemia means "decreased O₂ saturation". Saturation is <b>normal</b> in anaemia; it is the oxygen <b>content</b> of blood that is reduced. The fourth type of hypoxia is <b>histotoxic</b> (printed as "isotoxic").']]
]},
/* ------------------------------------------------------------------ */
{id:'resp-control',eb:'Control',h:'Control of breathing',p:'Breathing is set mainly by carbon dioxide, sensed as acidity in the brainstem. Oxygen only takes over when it is seriously low.',b:[
 ['two',
  ['axis','dg-co2','The carbon dioxide feedback loop','Central chemoreceptors provide about 80% of the drive to breathe.',{label:'Control of breathing by carbon dioxide',step:84,nodes:[{t:'Arterial PCO₂ rises',c:'n-blood'},{t:'CSF becomes more acidic',s:'CO₂ crosses the blood–brain barrier',c:'n-box'},{t:'Central chemoreceptors',s:'ventral surface of the medulla',c:'n-nerve'},{t:'Respiratory centre',s:'medulla and pons',c:'n-org'},{t:'Diaphragm and intercostals',s:'breathing deeper and faster',c:'n-musc'}],links:['','H⁺','','phrenic and intercostal nerves'],fb:[[4,0,'-','CO₂ blown off']]}],
  ['card','Who senses what',['<b>Central chemoreceptors</b> (medulla): respond to H⁺ in the CSF, which reflects arterial CO₂. H⁺ and bicarbonate in blood cannot cross the blood–brain barrier quickly; CO₂ can.','<b>Peripheral chemoreceptors</b>: <b>carotid bodies</b> (glossopharyngeal nerve, CN IX) and aortic bodies (vagus, CN X). The only sensors for <b>low oxygen</b> (PaO₂ below about 8 kPa); they also respond quickly to CO₂ and to acid in the blood (the breathlessness of ketoacidosis).','<b>Stretch receptors</b> in the airways stop over-inflation (Hering–Breuer reflex); <b>irritant receptors</b> cause cough and bronchoconstriction; <b>J receptors</b> respond to fluid in the lung (rapid shallow breathing).','<b>Higher centres:</b> voluntary control, emotion, pain; muscle and joint receptors raise breathing at the start of exercise.']]],
 ['table',['Centre','Where','Job'],[
  ['Dorsal respiratory group','Medulla','Mainly inspiration: drives the diaphragm through the phrenic nerve (C3, 4, 5)'],
  ['Ventral respiratory group','Medulla','Forced expiration and extra inspiratory drive; contains the rhythm generator (pre-Bötzinger complex)'],
  ['Pontine respiratory group','Pons','Fine-tunes the switch between breathing in and out'],
  ['Cortex','Cerebrum','Voluntary override (speech, breath-holding)']]],
 ['notes',
  ['clin','Chronic CO₂ retention and oxygen','In some people with severe COPD the CSF has adapted to a chronically high CO₂ (bicarbonate has moved in), so the CO₂ drive is blunted. Giving high-concentration oxygen can worsen CO₂ retention, mainly by undoing hypoxic vasoconstriction (worse V/Q matching) and through the Haldane effect, as well as reducing hypoxic drive. So: start with <b>controlled oxygen (24–28%, target 88–92%)</b>, check a blood gas, and never withhold oxygen from a hypoxic patient.'],
  ['clin','Things that depress or stimulate breathing','<b>Depress:</b> opioids (reversed by naloxone), benzodiazepines, alcohol, anaesthetics, brainstem stroke, raised intracranial pressure. <b>Stimulate:</b> acidosis (Kussmaul breathing in ketoacidosis), salicylate poisoning, anxiety, pain, pregnancy (progesterone), altitude. At altitude, low oxygen drives hyperventilation; the resulting alkalosis is corrected over days by the kidneys losing bicarbonate, which acetazolamide speeds up.'],
  ['clin','Noises: wheeze and stridor','<b>Wheeze:</b> a musical sound mainly in <b>expiration</b>, from narrowed small airways inside the chest (asthma, COPD, bronchiolitis). In expiration the pressure around the airways rises and narrows them further. <b>Stridor:</b> a harsh sound mainly in <b>inspiration</b>, from obstruction of the larynx or trachea outside the chest (croup, epiglottitis, foreign body, anaphylaxis). Stridor is an emergency.'],
  ['fix','Resp Biomed deck · stridor','The slide says stridor is caused by "lack of innervation to the pharynx". Stridor is turbulent flow through a <b>narrowed upper airway</b> (larynx or trachea).']]
]},
/* ------------------------------------------------------------------ */
{id:'resp-airways',eb:'Airways disease',h:'Asthma, COPD and cystic fibrosis',p:'Three obstructive diseases with different causes: an allergic inflammation that comes and goes, smoke damage that does not reverse, and a faulty chloride channel that makes mucus too thick to clear.',b:[
 ['fig','dg-asthma','A bronchiole: normal and in asthma','Three things narrow the airway: muscle spasm, swollen wall, mucus.',560,
  `<svg viewBox="0 0 800 280" role="img" aria-label="Normal and asthmatic bronchiole in cross-section">
   <text x="170" y="22" class="b" text-anchor="middle">Normal</text><text x="520" y="22" class="b" text-anchor="middle">Asthma</text>
   <circle cx="170" cy="140" r="96" style="fill:none;stroke:var(--muscle);stroke-width:7"/><circle cx="170" cy="140" r="86" style="fill:var(--artery-tint);stroke:var(--line-2)"/><circle cx="170" cy="140" r="68" style="fill:var(--paper);stroke:var(--line-2)"/>
   <text x="170" y="144" class="sm lab" text-anchor="middle">open lumen</text>
   <circle cx="520" cy="140" r="92" style="fill:none;stroke:var(--muscle);stroke-width:18"/><circle cx="520" cy="140" r="80" style="fill:var(--artery-tint);stroke:var(--line-2)"/>
   <path d="M520,104 C544,100 560,122 554,144 C550,164 534,178 516,174 C496,172 484,154 488,134 C492,116 504,106 520,104 Z" style="fill:var(--paper);stroke:var(--line-2)"/>
   <path d="M508,132 C520,124 536,134 532,148 C528,160 512,160 506,150 C502,142 502,136 508,132 Z" style="fill:var(--nerve-tint);stroke:var(--nerve)"/>
   <path d="M606,74 L640,56" stroke="var(--line-2)" fill="none"/><text x="600" y="50" class="sm lab b">thick, contracted smooth muscle</text>
   <path d="M586,186 L620,214" stroke="var(--line-2)" fill="none"/><text x="590" y="230" class="sm lab b">swollen, inflamed wall</text><text x="590" y="246" class="sm">eosinophils, thick basement</text><text x="590" y="262" class="sm">membrane</text>
   <path d="M520,146 L420,236" stroke="var(--line-2)" fill="none"/><text x="330" y="252" class="sm lab b">mucus plug</text>
   <path d="M266,140 L300,140" stroke="var(--line-2)" fill="none"/><text x="304" y="136" class="sm lab">thin smooth</text><text x="304" y="152" class="sm">muscle layer</text>
  </svg>`],
 ['pw','asthma','copd'],
 ['table',['','Asthma','COPD'],[
  ['Cause','Type I hypersensitivity and Th2 inflammation in a susceptible (atopic) person','Smoking (or other inhaled smoke and dust); rarely α₁-antitrypsin deficiency'],
  ['Age and pattern','Often starts in childhood; <b>variable</b>, with good days and bad days; worse at night and early morning; triggers','Over 35; <b>persistent and progressive</b> breathlessness, cough and sputum'],
  ['Airflow obstruction','<b>Reversible</b> with bronchodilator or over time','<b>Not fully reversible</b>: FEV₁/FVC below 0.7 after bronchodilator'],
  ['Inflammation','Eosinophils, mast cells; raised FeNO and blood eosinophils','Neutrophils and macrophages; proteases destroy alveolar walls'],
  ['Pathology','Smooth muscle thickening, basement membrane thickening, mucus plugs','<b>Chronic bronchitis</b> (mucus gland overgrowth, cough with sputum for 3 months in 2 years) and <b>emphysema</b> (destroyed alveolar walls, loss of elastic recoil, air trapping)'],
  ['Transfer factor','Normal','Reduced in emphysema'],
  ['Mainstay of treatment','<b>Inhaled corticosteroid</b>, with a bronchodilator for relief','<b>Stop smoking</b>; long-acting bronchodilators (LABA + LAMA); vaccines; pulmonary rehabilitation']]],
 ['table',['Inhaler or drug','Class','How it works','Notes'],[
  ['Salbutamol, terbutaline','Short-acting β₂ agonist (SABA)','β₂ receptor → G<sub>s</sub> → <b>cAMP rises</b> → airway smooth muscle relaxes','Blue reliever; works in minutes for 4 hours. Tremor, fast heart rate, low potassium'],
  ['Formoterol, salmeterol','Long-acting β₂ agonist (LABA)','As above, for 12 hours','In asthma never used without an inhaled steroid. Formoterol acts fast enough to be a reliever'],
  ['Beclometasone, budesonide, fluticasone','Inhaled corticosteroid (ICS)','Switch off inflammatory genes: fewer eosinophils and cytokines','The preventer. Oral thrush and hoarse voice: use a spacer and rinse the mouth'],
  ['Ipratropium (short), tiotropium (long)','Muscarinic antagonist (SAMA, LAMA)','Block M₃ receptors: less vagal bronchoconstriction and mucus','Mainstay in COPD; dry mouth'],
  ['Montelukast','Leukotriene receptor antagonist','Blocks the cysteinyl leukotriene receptor','Tablet; helps aspirin-sensitive and exercise-induced asthma; sleep and mood side effects'],
  ['Theophylline, aminophylline','Methylxanthine','Inhibit phosphodiesterase, so cAMP is not broken down','Narrow therapeutic range: arrhythmias and seizures in overdose'],
  ['Prednisolone','Oral corticosteroid','As inhaled steroids, systemically','Short courses for attacks'],
  ['Omalizumab, mepolizumab','Biologics','Anti-IgE; anti-IL-5','Severe asthma under specialists']]],
 ['notes',
  ['clin','How asthma is treated now','UK guidance changed in November 2024 (joint BTS, NICE and SIGN guideline). For people aged 12 and over, a blue salbutamol inhaler on its own is no longer recommended at diagnosis. The first step is a combined <b>low-dose inhaled steroid with formoterol, used as needed</b> ("AIR": anti-inflammatory reliever), stepping up to the same inhaler taken regularly and as needed (<b>MART</b>). You will still meet many patients on the older scheme of a blue reliever plus a separate brown preventer.'],
  ['clin','Acute severe asthma','<b>Severe:</b> peak flow 33–50% of best, cannot finish a sentence, respiratory rate 25 or more, heart rate 110 or more. <b>Life-threatening:</b> peak flow below 33%, saturation below 92%, <b>silent chest</b>, cyanosis, exhaustion, confusion, or a <b>normal PaCO₂</b> (a breathless patient should have a low CO₂; "normal" means they are tiring). Treat with oxygen, back-to-back nebulised salbutamol with ipratropium, prednisolone or hydrocortisone, then IV magnesium sulfate and intensive care review.'],
  ['clin','COPD exacerbations and oxygen','An exacerbation (more breathlessness, more sputum, purulent sputum) is treated with nebulised bronchodilators, a short course of prednisolone, and antibiotics if the sputum is purulent. Give controlled oxygen (target 88–92%) and check a blood gas; if the patient stays acidotic with a high CO₂, start <b>non-invasive ventilation</b>. Long-term oxygen therapy is offered to non-smokers with a resting PaO₂ below 7.3 kPa.'],
  ['fix','Resp Biomed deck · salbutamol','The treatment table says the β₂ agonist "inhibits cAMP production". It does the opposite: β₂ receptors couple to G<sub>s</sub> and <b>increase</b> cAMP, which relaxes smooth muscle.']],
 ['pwside','cf',
  ['table',['Organ','Effect of thick secretions'],[
   ['Lungs','Mucus cannot be cleared: chronic infection (<i>S. aureus</i> early, then <i>Pseudomonas</i>), <b>bronchiectasis</b>, respiratory failure'],
   ['Pancreas','Blocked ducts: fat malabsorption, greasy stools, poor weight gain, lack of vitamins A, D, E, K; later CF-related diabetes'],
   ['Gut','Meconium ileus in the newborn; constipation'],
   ['Liver','Blocked bile ducts: cirrhosis in a minority'],
   ['Reproductive','Absent vas deferens: most men are infertile'],
   ['Sweat','Salty sweat: the basis of the sweat test (chloride above 60 mmol/L)']]],
  ['card','Cystic fibrosis: the facts',['Autosomal recessive; about 1 in 25 people of white European ancestry carry it; about 1 in 2500 babies are affected.','The CFTR gene on chromosome 7 codes for a chloride (and bicarbonate) channel.','<b>F508del</b> (class II) is the commonest mutation: the protein misfolds and is destroyed before it reaches the membrane. <b>G551D</b> (class III) reaches the membrane but will not open.','<b>Diagnosis:</b> newborn heel-prick (immunoreactive trypsinogen), sweat test, genetic testing.','<b>Treatment:</b> chest physiotherapy, nebulised DNase and hypertonic saline, antibiotics, pancreatic enzymes (Creon) and vitamins. <b>CFTR modulators:</b> ivacaftor (a potentiator: holds the channel open) with correctors such as elexacaftor and tezacaftor (help the misfolded protein reach the membrane).']]]
]},
/* ------------------------------------------------------------------ */
{id:'resp-infection',eb:'Infection',h:'Respiratory infections and other chest emergencies',p:'Most upper respiratory infections are viral and get better on their own. The skill is spotting the few that need antibiotics, admission or an airway.',b:[
 ['table',['Upper airway infection','Usual cause','Features','Management'],[
  ['Common cold','Rhinovirus, coronaviruses','Runny nose, sore throat, cough, mild fever','Rest, fluids, paracetamol. No antibiotics'],
  ['Acute sinusitis','Viral in about 98%; bacterial (pneumococcus, <i>Haemophilus</i>) in 2%','Facial pain and pressure, blocked nose, discoloured discharge','Self-care for 10 days; then nasal steroid; antibiotics only if very unwell or prolonged. Rare spread to the orbit or brain'],
  ['Tonsillitis and pharyngitis','Viruses (most); group A streptococcus','Sore throat, fever, pus on tonsils, tender neck nodes, <b>no cough</b> suggests strep','Use a FeverPAIN or Centor score; phenoxymethylpenicillin if high. A peritonsillar abscess (quinsy) needs draining'],
  ['Glandular fever','Epstein–Barr virus','Teenager with severe sore throat, large nodes, fatigue, big spleen','Supportive; avoid contact sport; amoxicillin causes a rash'],
  ['Croup','Parainfluenza virus','Child 6 months to 3 years: barking cough, hoarse voice, <b>stridor</b>','A single dose of oral dexamethasone; nebulised adrenaline if severe'],
  ['Epiglottitis','<i>Haemophilus influenzae</i> type b (rare since the vaccine)','Rapid onset, high fever, drooling, sitting forward, quiet stridor','Do not examine the throat; call an anaesthetist; secure the airway; IV ceftriaxone'],
  ['Otitis media','Viruses, pneumococcus, <i>Haemophilus</i>','Ear pain, fever, red bulging drum','Analgesia; most resolve in 3 days']]],
 ['table',['Lower airway infection','Usual cause','Features','Management'],[
  ['Bronchiolitis','Respiratory syncytial virus','Baby under 1 in winter: coryza then cough, wheeze, fine crackles, poor feeding','Supportive: oxygen and feeding support. Bronchodilators and steroids do not help'],
  ['Community-acquired pneumonia','<b><i>Streptococcus pneumoniae</i></b> (commonest); <i>Haemophilus influenzae</i> (in COPD)','Fever, productive cough, pleuritic pain, breathlessness, crackles and bronchial breathing; confusion in older people','CURB-65 score; <b>amoxicillin</b>; add a macrolide if moderate or severe'],
  ['Atypical pneumonia','<i>Mycoplasma pneumoniae</i>, <i>Legionella</i> (hotels, air conditioning; low sodium), <i>Chlamydophila</i>','Dry cough, headache, muscle aches, few chest signs','<b>Macrolide</b> (clarithromycin) or doxycycline: these organisms have no cell wall or live inside cells'],
  ['Hospital-acquired pneumonia','<i>Staph. aureus</i> including MRSA, Gram-negatives such as <i>Pseudomonas</i> and <i>Klebsiella</i>','New chest infection more than 48 hours after admission','Broad-spectrum antibiotics by local policy (e.g. co-amoxiclav, piperacillin–tazobactam)'],
  ['Aspiration pneumonia','Mouth anaerobes and Gram-negatives','After stroke, reduced consciousness, alcohol; usually the <b>right lower lobe</b> (the right main bronchus is wider and more vertical)','Co-amoxiclav or similar; swallowing assessment'],
  ['Tuberculosis','<i>Mycobacterium tuberculosis</i>','Cough over 3 weeks, haemoptysis, night sweats, weight loss; upper lobe cavities','Sputum for acid-fast bacilli and PCR; 6 months of combination therapy (RIPE)']]],
 ['cards',[
  ['CURB-65: how sick is this pneumonia?',['<b>C</b>onfusion (new).','<b>U</b>rea above 7 mmol/L.','<b>R</b>espiratory rate 30 or more.','<b>B</b>lood pressure: systolic below 90 or diastolic 60 or less.','Age <b>65</b> or over.','One point each. 0–1: usually treated at home. 2: consider hospital. 3 or more: severe, high risk of death, consider intensive care.']],
  ['What pneumonia does to gas exchange',['Alveoli fill with neutrophils, fluid and bacteria (consolidation).','Those alveoli are still perfused but not ventilated: a <b>shunt</b>, so PaO₂ falls (type 1 respiratory failure).','The stiff, fluid-filled lung has low compliance, so the work of breathing rises.','Inflammation reaching the pleura causes sharp pain on breathing in, and sometimes an effusion or empyema (pus).']],
  ['Bronchiectasis',['Permanently widened, damaged bronchi that pool mucus and keep getting infected: a vicious circle.','Causes: cystic fibrosis, previous severe infection (pneumonia, TB, whooping cough), primary ciliary dyskinesia, immune deficiency.','Daily cough with large amounts of sputum, haemoptysis, coarse crackles, clubbing.','Diagnosed on high-resolution CT. Treated with chest physiotherapy and prompt antibiotics.']]]],
 ['notes',
  ['clin','Pulmonary embolism','A clot from a leg vein lodges in a pulmonary artery: ventilated lung with no blood flow (<b>dead space</b>). Sudden breathlessness, pleuritic chest pain, haemoptysis, fast heart rate; a large one causes collapse. Hypoxia with a low CO₂ (hyperventilation). Assess with the Wells score, then D-dimer or CT pulmonary angiogram; treat with a DOAC or heparin, and thrombolysis if there is shock.'],
  ['clin','Pleural effusion','Fluid in the pleural space: stony dull percussion, reduced breath sounds. <b>Transudate</b> (protein-poor): heart failure, low albumin (liver disease, nephrotic syndrome). <b>Exudate</b> (protein-rich): pneumonia, cancer, TB, pulmonary embolism. Light\'s criteria use fluid and serum protein and LDH to tell them apart.'],
  ['clin','Subcutaneous emphysema','Air tracking under the skin of the chest, neck and face, with a crackling feel (crepitus), from a pneumothorax, a blocked chest drain, trauma or oesophageal rupture. It usually reabsorbs, but look for the cause and watch the airway.']]
]}
],
/* ====================== pathways ====================== */
pw:{
breathin:{t:'Quiet inspiration',k:'resp',sec:'resp-mech',mn:'Contract, expand, pressure falls, air flows in',steps:[
 ['The respiratory centre fires down the phrenic nerves (C3, 4, 5) and intercostal nerves',''],
 ['The diaphragm contracts and flattens','It does about 70% of the work of quiet breathing.'],
 ['The external intercostals lift the ribs up and out','Upper ribs move like a pump handle (front to back); lower ribs like a bucket handle (side to side).'],
 ['The chest cavity enlarges',''],
 ['Intrapleural pressure becomes more negative','The lungs are pulled outwards with the chest wall.'],
 ['Alveolar volume rises, so alveolar pressure falls below atmospheric','Boyle\'s law.'],
 ['Air flows in down the pressure gradient','Until alveolar pressure equals atmospheric again.']],
 foot:'Forced inspiration adds the accessory muscles: sternocleidomastoid, scalenes and pectorals. Seeing them used at rest is a sign of respiratory distress.'},
breathout:{t:'Quiet expiration',k:'resp',sec:'resp-mech',mn:'Relax, recoil, pressure rises, air flows out',steps:[
 ['The inspiratory muscles relax','No muscle contraction is needed: quiet expiration is passive.'],
 ['The diaphragm domes upwards and the ribs fall',''],
 ['The stretched elastic lung recoils inwards','Helped by surface tension.'],
 ['Chest and alveolar volume fall',''],
 ['Alveolar pressure rises above atmospheric',''],
 ['Air flows out until the pressures are equal','The lungs come to rest at functional residual capacity, where lung recoil balances chest wall spring.']],
 foot:'Forced expiration (coughing, exercise, obstructive disease) uses the internal intercostals and abdominal muscles.'},
o2cascade:{t:'The journey of oxygen: air to mitochondria',k:'resp',sec:'resp-transport',mn:'The oxygen cascade: 21 → 13 → 5 → 1 kPa',steps:[
 ['Air is breathed in: PO₂ about 21 kPa',''],
 ['It is warmed, humidified and mixed with gas already in the lungs','Alveolar PO₂ is about 13 kPa.'],
 ['Oxygen diffuses across the alveolar wall','Type I pneumocyte, fused basement membranes and capillary endothelium: about 0.5 µm; equilibrium is reached a third of the way along the capillary.'],
 ['It binds haemoglobin in red cells','About 98% saturated; arterial PO₂ 11–13 kPa.'],
 ['The heart pumps it to the tissues','Oxygen delivery = cardiac output × oxygen content.'],
 ['In tissue capillaries PO₂ is lower, and CO₂ and acid are higher','Haemoglobin releases oxygen (Bohr effect); about a quarter is unloaded at rest.'],
 ['Oxygen diffuses into cells and to the mitochondria','Where it is the final electron acceptor in oxidative phosphorylation.'],
 ['Venous blood returns still about 75% saturated','A reserve that is drawn on in exercise.']]},
co2carry:{t:'How carbon dioxide gets from tissue to lung',k:'resp',sec:'resp-transport',mn:'Into the red cell, become bicarbonate, swap for chloride, reverse in the lung',steps:[
 ['Cells make CO₂, which diffuses into capillary blood',''],
 ['Most enters red cells','A little stays dissolved; some binds haemoglobin as carbamino compounds.'],
 ['Carbonic anhydrase converts CO₂ and water to carbonic acid','Which splits into H⁺ and bicarbonate.'],
 ['Deoxygenated haemoglobin mops up the H⁺','This also helps it release oxygen (Bohr effect).'],
 ['Bicarbonate leaves the red cell in exchange for chloride','The chloride shift.'],
 ['Blood travels to the lungs carrying CO₂ mostly as plasma bicarbonate',''],
 ['In the lungs, oxygen binds haemoglobin, which releases H⁺','The Haldane effect.'],
 ['The reactions run backwards: bicarbonate re-enters, CO₂ is re-formed','It diffuses into the alveoli and is breathed out.']]},
asthma:{t:'An asthma attack: early and late phases',k:'resp',sec:'resp-airways',mn:'Sensitise, cross-link, spasm, then eosinophils',steps:[
 ['Sensitisation: an inhaled allergen is presented to T cells','In an atopic person they become Th2 cells.'],
 ['Th2 cells release IL-4, IL-5 and IL-13','IL-4 and IL-13 make B cells switch to IgE; IL-5 recruits eosinophils.'],
 ['IgE coats mast cells in the airway wall',''],
 ['Re-exposure: allergen cross-links IgE and mast cells degranulate','Histamine, leukotrienes and prostaglandin D₂.'],
 ['Early phase (minutes): bronchospasm, wall oedema, mucus','Wheeze, cough, tight chest; relieved by a β₂ agonist.'],
 ['Late phase (4–12 hours): eosinophils and Th2 cells arrive','Their toxic proteins damage the epithelium; relieved by steroids, not by salbutamol alone.'],
 ['Repeated attacks remodel the airway','Thicker smooth muscle and basement membrane, more mucus glands: obstruction becomes less reversible.']],
 foot:'Triggers: allergens (house dust mite, pollen, pets), viral infections, cold air, exercise, smoke, NSAIDs and beta-blockers.'},
copd:{t:'How smoking causes COPD',k:'resp',sec:'resp-airways',mn:'Smoke, neutrophils, proteases, lost walls, trapped air',steps:[
 ['Smoke irritates the airway epithelium','Cilia are paralysed and goblet cells multiply.'],
 ['Macrophages and neutrophils are recruited',''],
 ['They release proteases such as neutrophil elastase','Smoke also inactivates the protective α₁-antitrypsin.'],
 ['Elastin in the alveolar walls is destroyed: emphysema','Less surface area for gas exchange.'],
 ['Loss of elastic recoil lets small airways collapse in expiration','Air is trapped: hyperinflation, barrel chest.'],
 ['Mucus glands enlarge and airways scar: chronic bronchitis','Productive cough and narrowed airways.'],
 ['V/Q mismatch causes hypoxia, later CO₂ retention',''],
 ['Chronic hypoxia constricts pulmonary arteries','Pulmonary hypertension and right heart failure (cor pulmonale): ankle swelling.']],
 foot:'Stopping smoking is the only thing that slows the fall in FEV₁.'},
cf:{t:'Cystic fibrosis: from gene to lung damage',k:'resp',sec:'resp-airways',mn:'No chloride out, more sodium in, dry surface, stuck mucus, infection',steps:[
 ['Two faulty copies of the CFTR gene are inherited','Autosomal recessive.'],
 ['The CFTR chloride channel is missing or does not work','In F508del it misfolds and is degraded.'],
 ['Chloride cannot be secreted onto the airway surface, and sodium absorption increases','Water follows the sodium into the cells.'],
 ['The airway surface liquid is dehydrated','Mucus becomes thick and sticky.'],
 ['Cilia cannot move it: mucociliary clearance fails',''],
 ['Bacteria are trapped and persist','Chronic infection and neutrophil-driven inflammation.'],
 ['The airway walls are destroyed: bronchiectasis',''],
 ['Progressive respiratory failure','']],
 foot:'In the sweat duct the same defect stops chloride (and sodium) being reabsorbed, so the sweat is salty.'}
},
/* ====================== flashcards ====================== */
flips:[
 ['Boyle\'s law','Pressure × volume is constant: enlarging the chest lowers alveolar pressure.'],
 ['Cell that makes surfactant','Type II pneumocyte.'],
 ['Halving airway radius changes resistance by...','16 times (radius to the fourth power).'],
 ['Which lung volumes cannot be measured by spirometry?','Residual volume, and so FRC and total lung capacity.'],
 ['FRC is made of...','Expiratory reserve volume + residual volume.'],
 ['FEV₁/FVC in obstructive vs restrictive disease','Obstructive: below 0.7. Restrictive: normal or raised.'],
 ['Positive bronchodilator reversibility','FEV₁ rises by 12% and 200 mL or more.'],
 ['Anatomical dead space','About 150 mL.'],
 ['Shunt vs dead space','Shunt: perfused, not ventilated (pneumonia). Dead space: ventilated, not perfused (pulmonary embolism).'],
 ['Type 1 vs type 2 respiratory failure','Both PaO₂ below 8 kPa. Type 1: CO₂ normal or low. Type 2: CO₂ above 6 kPa.'],
 ['Things that shift the oxygen curve right','Raised CO₂, acid, 2,3-DPG, exercise, temperature (CADET, face right).'],
 ['Bohr vs Haldane','Bohr: CO₂ and H⁺ make Hb release oxygen (tissues). Haldane: oxygen makes Hb release CO₂ (lungs).'],
 ['Main form of CO₂ in blood','Bicarbonate (about 70%).'],
 ['Main stimulus to breathe','Arterial CO₂, sensed as H⁺ in the CSF by central chemoreceptors.'],
 ['Where is low oxygen sensed?','Peripheral chemoreceptors: carotid bodies (CN IX) and aortic bodies (CN X).'],
 ['Oxygen target in a CO₂ retainer','88–92%.'],
 ['How does salbutamol work?','β₂ agonist: raises cAMP, relaxing airway smooth muscle.'],
 ['Life-threatening asthma: three signs','Silent chest, saturation below 92%, peak flow below 33% (also a normal PaCO₂).'],
 ['CURB-65','Confusion, Urea above 7, Respiratory rate 30+, Blood pressure below 90 systolic or 60 diastolic, age 65+.'],
 ['Commonest cause of community-acquired pneumonia','Streptococcus pneumoniae.'],
 ['CFTR is a channel for...','Chloride (chromosome 7; commonest mutation F508del).'],
 ['Wheeze vs stridor','Wheeze: expiratory, small airways. Stridor: inspiratory, upper airway.'],
 ['Tension pneumothorax: tracheal deviation','Away from the affected side.']
],
/* ====================== questions ====================== */
qs:[
{sec:'resp-mech',type:'sba',q:'A premature baby born at 28 weeks has grunting, recession and worsening oxygen levels within hours of birth. The chest X-ray has a ground-glass appearance. What is the underlying problem?',
 o:['Lack of surfactant increases surface tension, so alveoli collapse','Airway smooth muscle is in spasm','The diaphragm is paralysed','The alveoli are filled with meconium','Pulmonary blood flow is blocked by clot'],a:0,
 e:'Respiratory distress syndrome. Type II pneumocytes do not make enough surfactant until about 34 weeks. Without it surface tension is high, compliance is low and alveoli collapse at the end of each breath. Antenatal corticosteroids speed surfactant production; surfactant can be given down the endotracheal tube.'},
{sec:'resp-mech',type:'sba',q:'A tall 22-year-old man has sudden right-sided chest pain and breathlessness. He becomes very distressed, with a heart rate of 135, blood pressure of 78/50, absent breath sounds on the right and a trachea pushed to the left. What should be done immediately?',
 o:['Decompress the right side of the chest','Request a chest X-ray','Give nebulised salbutamol','Start IV antibiotics','Arrange a CT pulmonary angiogram'],a:0,
 e:'Tension pneumothorax: a one-way valve lets air into the pleural space but not out, so pressure builds, the mediastinum shifts away and venous return to the heart is obstructed. It is a clinical diagnosis and treatment must not wait for imaging: decompress, then place a chest drain.'},
{sec:'resp-mech',type:'saq',q:'Which law explains why air enters the lungs when the chest cavity enlarges?',acc:['boyle'],m:'Boyle\'s law',
 e:'At constant temperature, pressure is inversely proportional to volume. Enlarging the chest lowers alveolar pressure below atmospheric, and air flows in down the gradient.'},
{sec:'resp-volumes',type:'sba',q:'A 60-year-old smoker has an FEV₁ of 1.6 L (55% of predicted) and an FVC of 3.4 L (88% of predicted) after a bronchodilator. What does this show?',
 o:['An obstructive defect','A restrictive defect','Normal spirometry','Poor technique only','A mixed defect with mainly restriction'],a:0,
 e:'FEV₁/FVC = 1.6 ÷ 3.4 = 0.47, well below 0.7, with a near-normal FVC: airflow obstruction. That it persists after a bronchodilator, in a smoker, fits COPD. In restriction both values fall together and the ratio is normal or high.'},
{sec:'resp-volumes',type:'sba',q:'A woman with pulmonary fibrosis has spirometry. Which pattern is expected?',
 o:['Low FVC, low FEV₁, FEV₁/FVC ratio normal or raised','Normal FVC, low FEV₁, ratio below 0.7','High total lung capacity and residual volume','Normal FVC and FEV₁ with a low peak flow','Low FVC with a ratio below 0.5'],a:0,
 e:'Fibrosis makes the lungs stiff (low compliance), so all volumes are reduced: a restrictive pattern. The airways are held open by the scarred lung, so the fraction blown out in the first second is normal or even high. Transfer factor is reduced.'},
{sec:'resp-volumes',type:'saq',q:'A man breathes 12 times a minute with a tidal volume of 500 mL and a dead space of 150 mL. What is his alveolar ventilation in litres per minute?',acc:['4.2|4200'],m:'4.2 L/min: (500 − 150) × 12',
 e:'Only the air that reaches the alveoli takes part in gas exchange. Alveolar ventilation = (tidal volume − dead space) × rate = 350 mL × 12 = 4200 mL/min. Minute ventilation, by contrast, is 500 × 12 = 6 L/min.'},
{sec:'resp-gas',type:'sba',q:'A patient with lobar pneumonia has a PaO₂ of 7.2 kPa that improves only slightly on high-flow oxygen. Which mechanism best explains the hypoxaemia?',
 o:['Shunt: blood passes alveoli that are not ventilated','Increased dead space','Hypoventilation','Low inspired oxygen','Reduced haemoglobin'],a:0,
 e:'Consolidated alveoli are perfused but contain no air, so blood passing them is not oxygenated (V/Q = 0). Extra oxygen cannot reach that blood, and haemoglobin leaving healthy lung is already saturated, so the response to oxygen is poor. Dead space is ventilation without perfusion, as in pulmonary embolism.'},
{sec:'resp-gas',type:'sba',q:'A 70-year-old with COPD is drowsy. Blood gas on air: pH 7.29, PaO₂ 6.8 kPa, PaCO₂ 8.9 kPa, bicarbonate 31 mmol/L. What is the correct interpretation?',
 o:['Type 2 respiratory failure with an acute-on-chronic respiratory acidosis','Type 1 respiratory failure with respiratory alkalosis','Metabolic acidosis with respiratory compensation','Type 2 respiratory failure with a metabolic alkalosis as the main problem','A normal gas for a patient with COPD'],a:0,
 e:'PaO₂ below 8 with PaCO₂ above 6 is type 2 failure. The pH is low with a high CO₂: respiratory acidosis. The raised bicarbonate shows the kidneys have been compensating for chronic CO₂ retention, but the pH is still acidic, so this is an acute deterioration. Give controlled oxygen (88–92%) and consider non-invasive ventilation.'},
{sec:'resp-gas',type:'saq',q:'What is the name of the response in which pulmonary arterioles constrict in areas of lung where alveolar oxygen is low?',acc:['hypoxic'],m:'Hypoxic pulmonary vasoconstriction',
 e:'It diverts blood away from poorly ventilated alveoli to improve V/Q matching. Systemic arterioles do the opposite. When hypoxia is widespread (COPD, altitude) it raises pulmonary artery pressure and can cause right heart failure.'},
{sec:'resp-transport',type:'sba',q:'A family of four all have headaches, nausea and confusion at home in winter. Their oxygen saturations by fingertip probe are 99%. What is the most likely explanation for the normal reading?',
 o:['The probe cannot tell carboxyhaemoglobin from oxyhaemoglobin','Carbon monoxide does not affect oxygen carriage','Their haemoglobin concentration has risen','Carbon monoxide shifts the curve to the right','The probe measures dissolved oxygen'],a:0,
 e:'Carbon monoxide binds haemoglobin about 240 times more strongly than oxygen, lowering the oxygen-carrying capacity and shifting the curve left. Standard pulse oximeters read carboxyhaemoglobin as oxygenated, and PaO₂ (dissolved oxygen) is normal. Measure carboxyhaemoglobin on a blood gas and give 100% oxygen.'},
{sec:'resp-transport',type:'sba',q:'In exercising muscle, haemoglobin releases more oxygen than at rest for the same PO₂. Which combination explains this?',
 o:['Higher CO₂, lower pH and higher temperature shift the curve to the right','Lower CO₂ and higher pH shift the curve to the left','More 2,3-DPG shifts the curve to the left','Higher pH and lower temperature shift the curve to the right','The haemoglobin concentration in muscle capillaries increases'],a:0,
 e:'The Bohr effect: CO₂, H⁺ and heat stabilise the tense (deoxygenated) form of haemoglobin, lowering its affinity for oxygen, so more is unloaded where metabolism is greatest. Remember "CADET, face right": CO₂, Acid, 2,3-DPG, Exercise, Temperature.'},
{sec:'resp-transport',type:'saq',q:'In what chemical form is most carbon dioxide carried in the blood?',acc:['bicarbonate|hco3'],m:'Bicarbonate (HCO₃⁻)',
 e:'About 70% of CO₂ travels as bicarbonate, made in red cells by carbonic anhydrase and moved into plasma in exchange for chloride. About 20% is bound to haemoglobin as carbamino compounds and about 10% is dissolved.'},
{sec:'resp-control',type:'sba',q:'A man takes an overdose of morphine. His respiratory rate is 5 per minute. Blood gas: pH 7.18, PaCO₂ 10.2 kPa, PaO₂ 7.0 kPa. What is the main reason his breathing has slowed?',
 o:['Opioids reduce the sensitivity of the brainstem respiratory centre to CO₂','Opioids paralyse the diaphragm','Opioids block the carotid bodies\' response to oxygen only','Opioids cause bronchospasm','Opioids increase the CSF bicarbonate'],a:0,
 e:'μ-opioid receptors in the medulla depress the respiratory rhythm generator and blunt the response to rising CO₂, causing hypoventilation: type 2 respiratory failure with respiratory acidosis. Support the airway and breathing and give naloxone.'},
{sec:'resp-control',type:'sba',q:'A 3-year-old has a barking cough and a harsh noise when breathing in. Where is the obstruction?',
 o:['The larynx and upper trachea','The small bronchioles','The alveoli','The pleural space','The nasal passages'],a:0,
 e:'A harsh inspiratory noise is stridor, from narrowing of the upper airway outside the chest, which is pulled inwards during inspiration. With a barking cough in a young child this is croup (parainfluenza virus), treated with oral dexamethasone. Wheeze is expiratory and comes from the small airways.'},
{sec:'resp-control',type:'saq',q:'Which structures sense a fall in arterial oxygen and signal to the brainstem through the glossopharyngeal nerve?',acc:['carotid'],m:'The carotid bodies',
 e:'The carotid bodies (at the carotid bifurcation, CN IX) and aortic bodies (CN X) are the peripheral chemoreceptors. They are the only sensors for hypoxia and respond when PaO₂ falls below about 8 kPa. Do not confuse them with the carotid sinus, which senses blood pressure.'},
{sec:'resp-airways',type:'sba',q:'A 19-year-old with asthma has been wheezy for two days. Now she cannot speak, her chest is silent and her saturation is 90%. Blood gas: PaCO₂ 5.6 kPa. What does the PaCO₂ indicate?',
 o:['She is tiring: it should be low, so this is life-threatening','Her ventilation is adequate','She has a metabolic alkalosis','The sample was venous','She is hyperventilating from anxiety'],a:0,
 e:'In an asthma attack the patient hyperventilates, so PaCO₂ should be low. A normal or rising CO₂ means she can no longer keep up: life-threatening or near-fatal asthma, as do the silent chest and saturation below 92%. She needs oxygen, continuous nebulised salbutamol with ipratropium, steroids, IV magnesium and urgent intensive care review.'},
{sec:'resp-airways',type:'sba',q:'How do inhaled corticosteroids help in asthma?',
 o:['They suppress Th2 inflammation, reducing eosinophils, cytokines and airway hyper-responsiveness','They relax airway smooth muscle directly within minutes','They block muscarinic receptors','They block histamine receptors','They thin mucus by breaking DNA strands'],a:0,
 e:'Steroids act on nuclear receptors to switch off inflammatory genes. They take days to work and prevent attacks rather than relieve them, which is why they are "preventers". Bronchodilators (β₂ agonists, antimuscarinics) relax smooth muscle but do not treat the inflammation.'},
{sec:'resp-airways',type:'sba',q:'A 2-year-old has had recurrent chest infections, greasy stools and poor weight gain. Her sweat chloride is 85 mmol/L. What is the basic defect?',
 o:['A faulty chloride channel on epithelial cells','Absent dynein arms in cilia','Deficiency of α₁-antitrypsin','IgE-mediated airway inflammation','Absent surfactant protein'],a:0,
 e:'Cystic fibrosis: mutations in CFTR (chromosome 7) stop chloride secretion, so airway, pancreatic and bile secretions are thick. Sweat chloride above 60 mmol/L is diagnostic. Absent dynein arms cause primary ciliary dyskinesia; α₁-antitrypsin deficiency causes early emphysema.'},
{sec:'resp-airways',type:'saq',q:'Which inherited enzyme-inhibitor deficiency causes emphysema in young adults who have smoked little or not at all?',acc:['antitrypsin|a1at|aat'],m:'α₁-antitrypsin deficiency',
 e:'α₁-antitrypsin normally neutralises neutrophil elastase. Without it, elastase destroys alveolar walls (emphysema, typically in the lower lobes), and the misfolded protein accumulates in the liver, causing cirrhosis.'},
{sec:'resp-infection',type:'sba',q:'A 72-year-old has fever, cough with rusty sputum and new confusion. Respiratory rate 32, BP 88/54, urea 9.4 mmol/L. What is his CURB-65 score, and what does it mean?',
 o:['5: severe pneumonia needing hospital and intensive care review','2: can be treated at home','3: treat at home with oral antibiotics','1: low risk','0: no pneumonia'],a:0,fixed:true,
 e:'Confusion (1), urea above 7 (1), respiratory rate 30 or more (1), systolic blood pressure below 90 (1), age 65 or over (1) = 5. A score of 3 or more indicates severe pneumonia with a high risk of death: admit, give IV antibiotics promptly and involve critical care.'},
{sec:'resp-infection',type:'sba',q:'A 25-year-old has had a dry cough, headache and aching muscles for 10 days. The chest X-ray shows patchy shadowing. Amoxicillin has not helped. Which antibiotic should be used?',
 o:['Clarithromycin','Flucloxacillin','Co-amoxiclav','Gentamicin','Metronidazole'],a:0,
 e:'An "atypical" pneumonia in a young adult is usually Mycoplasma pneumoniae, which has no cell wall, so β-lactams such as amoxicillin, flucloxacillin and co-amoxiclav cannot work. Macrolides and doxycycline inhibit bacterial protein synthesis and cover atypical organisms.'},
{sec:'resp-infection',type:'saq',q:'Which virus is the usual cause of bronchiolitis in babies under one year old?',acc:['rsv|syncytial'],m:'Respiratory syncytial virus (RSV)',
 e:'RSV causes winter epidemics of bronchiolitis: coryza, then cough, wheeze, crackles and feeding difficulty. Treatment is supportive. An RSV vaccine is now offered in pregnancy and to older adults, and high-risk babies can be given a monoclonal antibody.'}
]};
