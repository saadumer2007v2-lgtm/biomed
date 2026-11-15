/* Renal biomed. Data-driven chapter: see "DATA-DRIVEN CHAPTERS" in app.js for the block types. */
window.CHAPTERS=window.CHAPTERS||{};
(function(){
const art=(a,e)=>`<path d="M60,110 H272" style="stroke:var(--artery);stroke-width:${a};fill:none;stroke-linecap:round"/><path d="M368,110 H580" style="stroke:var(--artery);stroke-width:${e};fill:none;stroke-linecap:round"/>`;
const res=t=>`<text x="320" y="240" class="b" text-anchor="middle">${t}</text>`;
const tube=(c,w)=>`fill:none;stroke:var(--${c});stroke-width:${w};stroke-linecap:round`;

CHAPTERS.renal={
short:'Renal',eyebrow:'Renal biomed',h1:'Filter, reclaim, fine-tune',
blurb:'Glomerular filtration, the nephron segment by segment, water and sodium, diuretics, acid–base and blood gases, electrolytes, AKI and CKD, infections, stones, bladder control, transplants.',
lede:'The kidneys filter 180 litres of plasma a day and take back 99% of it. What they choose not to take back controls the body\'s water, salt, potassium, acid and blood pressure. Learn what each segment of the nephron does and most renal physiology, pharmacology and disease follows from it.',
secs:[
/* ------------------------------------------------------------------ */
{id:'renal-filter',eb:'Filtration',h:'Filtration: the glomerulus',p:'A fifth of the plasma reaching the glomerulus is pushed through a three-layer filter into Bowman\'s capsule: about 125 mL every minute. This is the glomerular filtration rate (GFR), the best single measure of kidney function.',b:[
 ['think','A coffee filter under pressure. Water and small solutes pass through; the grounds (cells and proteins) stay behind. Squeeze the outlet pipe (the efferent arteriole) and pressure in the filter rises; squeeze the inlet (the afferent arteriole) and it falls.'],
 ['cards',[
  ['The filtration barrier: three layers',['<b>Fenestrated endothelium:</b> full of pores; holds back cells.','<b>Glomerular basement membrane:</b> type IV collagen with a negative charge, which repels albumin (also negative).','<b>Podocytes:</b> their interlocking foot processes leave narrow filtration slits bridged by a slit diaphragm (nephrin).','<b>Passes freely:</b> water, ions, glucose, amino acids, urea, creatinine. <b>Held back:</b> cells and almost all albumin.','<b>Mesangial cells</b> sit between the capillaries: they give support, clear debris and can contract to reduce the filtering surface.','<b>Damage shows as leak:</b> albumin first (measure the albumin:creatinine ratio), then heavy proteinuria; inflammation lets red cells through.']],
  ['The forces (Starling again)',['<b>Glomerular capillary pressure:</b> about 55 mmHg, pushing fluid out. High because there is an arteriole at each end.','<b>Bowman\'s capsule pressure:</b> about 15 mmHg, pushing back. Rises if the urinary tract is blocked.','<b>Plasma oncotic pressure:</b> about 30 mmHg, holding fluid in.','<b>Net filtration pressure</b> = 55 − 15 − 30 = <b>10 mmHg</b>.','<b>GFR</b> = net filtration pressure × the filtration coefficient (surface area × permeability) ≈ 125 mL/min, or 180 L/day.','Renal blood flow is about 1.2 L/min, a fifth of cardiac output. <b>Filtration fraction</b> = GFR ÷ renal plasma flow ≈ 20%.']]]],
 ['sw','dg-arterioles','Arteriole tone and GFR','The two arterioles are taps either side of the filter. Choose which one changes.',560,
  `<svg viewBox="0 0 640 256" role="img" aria-label="Effect of afferent and efferent arteriole tone on glomerular filtration">
   <text x="160" y="62" class="sm lab b" text-anchor="middle">afferent arteriole</text><text x="480" y="62" class="sm lab b" text-anchor="middle">efferent arteriole</text>
   <text x="60" y="88" class="sm">blood in →</text><text x="580" y="88" class="sm" text-anchor="end">→ blood out</text>
   <circle cx="320" cy="110" r="50" class="n-box"/><circle cx="320" cy="110" r="36" class="n-blood"/><text x="320" y="114" class="sm b" text-anchor="middle">glomerulus</text>
   <path d="M320,162 V202" class="a-plain"/><text x="332" y="188" class="sm">filtrate</text>
   <g data-v="normal">${art(22,22)}${res('glomerular pressure 55 mmHg · GFR 125 mL/min')}</g>
   <g data-v="affc">${art(8,22)}<text x="160" y="148" class="sm b t-inh" text-anchor="middle">NSAIDs, noradrenaline</text>${res('glomerular pressure ↓ · GFR ↓ · blood flow ↓')}</g>
   <g data-v="affd">${art(34,22)}<text x="160" y="152" class="sm b t-stim" text-anchor="middle">prostaglandins, ANP</text>${res('glomerular pressure ↑ · GFR ↑ · blood flow ↑')}</g>
   <g data-v="effc">${art(22,8)}<text x="480" y="148" class="sm b t-inh" text-anchor="middle">angiotensin II</text>${res('glomerular pressure ↑ · GFR kept up · blood flow ↓')}</g>
   <g data-v="effd">${art(22,34)}<text x="480" y="152" class="sm b t-drug" text-anchor="middle">ACE inhibitor or ARB</text>${res('glomerular pressure ↓ · GFR ↓ · blood flow ↑')}</g>
  </svg>`,
  [['normal','Normal','<b>Normal.</b> Both arterioles have resting tone. Between a mean arterial pressure of about 80 and 180 mmHg, the kidney keeps GFR steady by adjusting the afferent arteriole (the myogenic response and tubuloglomerular feedback).'],
   ['affc','Afferent constricts','<b>Afferent constriction.</b> Less blood gets in: pressure in the glomerulus, GFR and renal blood flow all fall. Causes: sympathetic drive and noradrenaline (shock), adenosine, and <b>NSAIDs</b>, which remove the prostaglandins that normally hold this arteriole open. Harmless in a healthy person, dangerous in someone who is dehydrated or in heart failure.'],
   ['affd','Afferent dilates','<b>Afferent dilation.</b> More blood gets in: glomerular pressure, GFR and blood flow rise. Prostaglandins, nitric oxide and natriuretic peptides do this. It is how the kidney protects its blood flow when perfusion pressure is low.'],
   ['effc','Efferent constricts','<b>Efferent constriction.</b> Blood is dammed back in the glomerulus: pressure rises and <b>GFR is maintained even though blood flow falls</b> (filtration fraction rises). This is the job of <b>angiotensin II</b> when renal perfusion is poor.'],
   ['effd','Efferent dilates','<b>Efferent dilation.</b> ACE inhibitors and ARBs remove angiotensin II, so the outlet opens and glomerular pressure falls. Over the long term this <b>protects</b> the filter in diabetes and chronic kidney disease (less pressure, less protein leak). But if GFR was depending on angiotensin II (renal artery stenosis, dehydration), it falls sharply: acute kidney injury.']]],
 ['pw','tgf'],
 ['cards',[
  ['Measuring GFR',['<b>Creatinine</b> is a waste product of muscle (from creatine phosphate), made at a steady rate. It is freely filtered and not reabsorbed; a little is secreted, so it slightly overestimates GFR.','<b>eGFR</b> is calculated from the blood creatinine, age and sex. Normal is <b>90 mL/min/1.73 m² or more</b>.','Creatinine depends on <b>muscle mass</b>: eGFR flatters a frail, thin person and under-rates a bodybuilder.','Creatinine does not climb out of the normal range until about <b>half</b> of kidney function is lost, and eGFR is unreliable when function is changing fast (AKI).','<b>Trimethoprim</b> blocks creatinine secretion: creatinine rises without any fall in GFR.','<b>Inulin</b> clearance is the gold standard (filtered, never reabsorbed or secreted) but is used only in research. <b>Cystatin C</b> is an alternative blood marker.']],
  ['Clearance',['<b>Clearance</b> is the volume of plasma completely cleared of a substance each minute.','<b>Clearance = (U × V) ÷ P</b>: urine concentration × urine flow ÷ plasma concentration.','<b>Worked example:</b> urine creatinine 8 mmol/L, urine flow 1.5 mL/min, plasma creatinine 0.1 mmol/L. Clearance = 8 × 1.5 ÷ 0.1 = <b>120 mL/min</b>.','Filtered and neither reabsorbed nor secreted (inulin): clearance = GFR.','Filtered and reabsorbed (glucose): clearance = 0, until plasma glucose passes the <b>renal threshold</b> of about 10 to 11 mmol/L and the transporters are saturated.','Filtered and secreted (PAH): clearance = renal plasma flow.','<b>Filtered load</b> = GFR × plasma concentration. <b>Excretion</b> = filtered − reabsorbed + secreted.']]]],
 ['notes',
  ['clin','Nephrotic and nephritic syndromes','<b>Nephrotic:</b> the podocytes are damaged and the filter leaks protein. More than 3.5 g of protein a day in the urine, low blood albumin and oedema (puffy eyes, swollen legs, frothy urine), with high cholesterol and a risk of clots. Minimal change disease in children; membranous nephropathy and diabetes in adults. <b>Nephritic:</b> the glomerulus is inflamed and bleeds. Blood in the urine (red cell casts), high blood pressure, low urine output and a rising creatinine. IgA nephropathy, post-streptococcal glomerulonephritis, vasculitis.'],
  ['fix','Renal System deck · the glomerulus','Several slips on this slide. Blood <b>arrives</b> in the afferent arteriole; filtrate enters Bowman\'s capsule. GFR is the volume of <b>filtrate</b> formed per minute (about 125 mL/min), not "how much blood passes through". "Aim for >0.5 mL/kg/min" is not a GFR: <b>0.5 mL/kg/hour</b> is the minimum acceptable <b>urine output</b>. "GFR = GBHP − CHP − BCOP" is the formula for <b>net filtration pressure</b>; GFR is that pressure multiplied by the filtration coefficient. And the waste product measured is <b>creatinine</b>, not creatine (creatine is the muscle energy store it comes from).']]
]},
/* ------------------------------------------------------------------ */
{id:'renal-tubule',eb:'Reabsorption',h:'The nephron, segment by segment',p:'Each segment has one main job and one signature transporter, and each diuretic blocks one of them. Every tubular cell pumps sodium out on its blood side with the Na⁺/K⁺-ATPase; what differs is how sodium gets in from the urine side. Water follows sodium wherever the wall lets it.',b:[
 ['explore','dg-nephron','The nephron','A single nephron, straightened out. Tap a segment to see what it reabsorbs, which hormones control it and which drugs act there.',680,
  `<svg viewBox="0 0 760 430" role="img" aria-label="Diagram of a nephron with its segments">
   <defs><linearGradient id="medg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--vein-tint)"/><stop offset="1" stop-color="var(--vein)"/></linearGradient></defs>
   <path class="grid" d="M40,178 H730"/>
   <text x="728" y="168" class="hd" text-anchor="end">CORTEX</text><text x="728" y="196" class="hd" text-anchor="end">MEDULLA</text>
   <rect x="34" y="188" width="10" height="208" rx="5" fill="url(#medg)"/>
   <g class="sm"><text x="52" y="202">300</text><text x="52" y="296">600</text><text x="52" y="392">1,200 mOsm/kg</text><text x="604" y="422" text-anchor="middle">urine: 1 to 2 L a day</text><text x="12" y="60">afferent</text><text x="12" y="134">efferent</text></g>
   <g data-k="glom"><path d="M40,70 L74,84 M40,116 L74,102" style="${tube('artery',6)}"/><circle cx="100" cy="92" r="32" class="n-box"/><circle cx="96" cy="92" r="19" class="n-blood"/><text x="104" y="44" class="sm lab b" text-anchor="middle">glomerulus</text><text x="100" y="150" class="sm" text-anchor="middle">125 mL/min</text></g>
   <g data-k="pct"><path d="M132,92 C150,56 170,128 190,92 C210,56 230,128 250,92 C262,72 282,78 298,94" style="${tube('accent',14)}"/><text x="216" y="44" class="sm lab b" text-anchor="middle">proximal tubule</text><text x="222" y="150" class="sm" text-anchor="middle">65–70% of Na⁺ and water</text><text x="222" y="166" class="sm t-drug" text-anchor="middle">acetazolamide ⊣</text></g>
   <g data-k="desc"><path d="M300,98 C320,112 330,132 330,160 V350 C330,372 344,386 365,386" style="${tube('vein',7)}"/><path d="M300,98 C320,112 330,132 330,160 V350 C330,372 344,386 365,386" style="fill:none;stroke:transparent;stroke-width:26"/><text x="316" y="262" class="sm lab b" text-anchor="end">thin descending limb</text><text x="316" y="278" class="sm" text-anchor="end">water leaves</text></g>
   <g data-k="asc"><path d="M365,386 C386,386 400,372 400,350 V160 C400,132 410,112 430,98" style="${tube('muscle',13)}"/><text x="416" y="262" class="sm lab b">thick ascending limb</text><text x="416" y="278" class="sm">25% of Na⁺ · no water</text><text x="416" y="294" class="sm t-drug">furosemide ⊣</text></g>
   <g data-k="dct"><path d="M432,94 C450,56 470,128 490,92 C510,56 530,128 550,92 C560,76 574,74 586,84" style="${tube('lymph',14)}"/><text x="506" y="44" class="sm lab b" text-anchor="middle">distal tubule</text><text x="506" y="150" class="sm" text-anchor="middle">5% of Na⁺</text><text x="506" y="166" class="sm t-drug" text-anchor="middle">thiazides ⊣</text></g>
   <g data-k="cd"><path d="M592,88 C602,98 604,112 604,132 V396" style="${tube('nerve',14)}"/><text x="622" y="262" class="sm lab b">collecting duct</text><text x="622" y="278" class="sm">2–5% of Na⁺</text><text x="622" y="294" class="sm">water only with ADH</text><text x="622" y="310" class="sm t-drug">spironolactone ⊣</text></g>
  </svg>`,
  {glom:['Glomerulus and Bowman\'s capsule','Filters about <b>125 mL/min</b> of protein-free plasma. Blood enters by the afferent arteriole and leaves by the efferent arteriole. The <b>juxtaglomerular apparatus</b> sits at this point: renin-releasing granular cells in the wall of the afferent arteriole, next to the macula densa of the tubule.'],
   pct:['Proximal convoluted tubule: bulk reabsorption','Takes back <b>65 to 70% of filtered sodium and water</b>, almost all glucose and amino acids, about 85% of bicarbonate, and most phosphate and potassium. The fluid stays the same concentration as plasma. Sodium enters through the <b>Na⁺/H⁺ exchanger</b> and with glucose through <b>SGLT2</b>. It also <b>secretes</b> organic acids and bases, including many drugs (penicillin, furosemide, metformin). Its cells work hard and are the first to die in shock or with toxins: acute tubular necrosis. <b>Drugs:</b> acetazolamide, SGLT2 inhibitors.'],
   desc:['Thin descending limb: water leaves','Permeable to water (aquaporin-1) but not to salt. As it dives into the salty medulla, water is drawn out and the fluid inside becomes more concentrated: up to 1,200 mOsm/kg at the tip of the longest loops.'],
   asc:['Thick ascending limb: salt leaves, water cannot follow','<b>Impermeable to water.</b> The <b>NKCC2</b> transporter carries one sodium, one potassium and two chloride ions out of the tubular fluid: <b>25% of filtered sodium</b>. This makes the medulla salty and leaves the fluid dilute (about 100 mOsm/kg). Potassium leaks back into the lumen, making it positive, and that voltage drives <b>calcium and magnesium</b> between the cells. <b>Loop diuretics</b> block NKCC2: the most powerful diuretics, and they waste calcium and magnesium too.'],
   dct:['Distal convoluted tubule: fine tuning','Reabsorbs <b>5% of sodium</b> through the <b>Na⁺–Cl⁻ cotransporter (NCC)</b>. Still impermeable to water, so the fluid is diluted further. <b>Calcium</b> reabsorption here is switched on by parathyroid hormone. <b>Thiazides</b> block NCC; with less sodium entering the cell, more calcium is reabsorbed, so thiazides raise blood calcium.'],
   cd:['Collecting duct: the final decision','<b>Principal cells:</b> sodium enters through <b>ENaC</b> and potassium leaves in exchange; <b>aldosterone</b> increases both. <b>Intercalated cells:</b> secrete H⁺ (or bicarbonate) to set the final urine pH. <b>Water:</b> the wall is watertight unless <b>ADH</b> inserts aquaporin-2; then water is drawn out into the salty medulla and urine can reach 1,200 mOsm/kg. With no ADH, urine can be as dilute as 50 mOsm/kg. <b>Drugs:</b> spironolactone (blocks aldosterone), amiloride (blocks ENaC), tolvaptan (blocks the ADH receptor).']}],
 ['pw','urinepath','countercurrent'],
 ['table',['Segment','Share of filtered Na⁺','How Na⁺ enters the cell','Water','Hormones','Diuretic'],[
  ['Proximal tubule','65–70%','Na⁺/H⁺ exchanger; cotransport with glucose (SGLT2), amino acids, phosphate','Follows freely (aquaporin-1)','Angiotensin II increases Na⁺ uptake; PTH reduces phosphate uptake','Acetazolamide, SGLT2 inhibitors, mannitol'],
  ['Thin descending limb','None','','Leaves (aquaporin-1)','',''],
  ['Thick ascending limb','25%','NKCC2 (Na⁺–K⁺–2Cl⁻)','<b>None</b>','','Loop diuretics'],
  ['Distal convoluted tubule','5%','NCC (Na⁺–Cl⁻)','<b>None</b>','PTH increases calcium reabsorption','Thiazides'],
  ['Collecting duct','2–5%','ENaC channel (principal cells)','Only with ADH (aquaporin-2)','Aldosterone, ADH; ANP opposes','Spironolactone, amiloride']]],
 ['cards',[
  ['Principal and intercalated cells',['<b>Principal cells:</b> ENaC lets sodium in. That leaves the lumen negative, which pulls potassium out through potassium channels. "Sodium in, potassium out", driven by <b>aldosterone</b>.','<b>α-intercalated cells:</b> pump H⁺ into the urine and return new bicarbonate to the blood. Busy in acidosis. They also reabsorb potassium.','<b>β-intercalated cells:</b> secrete bicarbonate in alkalosis.','<b>The consequence:</b> anything that delivers more sodium to the collecting duct (loop and thiazide diuretics) or raises aldosterone makes the kidney lose potassium and H⁺: <b>hypokalaemic alkalosis</b>.']],
  ['Glucose handling',['<b>SGLT2</b> in the early proximal tubule reabsorbs about 90% of filtered glucose with sodium; <b>SGLT1</b> further along takes the rest. Glucose leaves the cell through GLUT2.','Normally no glucose reaches the urine. Above a plasma level of about 10 to 11 mmol/L the transporters are saturated and glucose spills over, dragging water with it: polyuria and thirst.','<b>SGLT2 inhibitors</b> (the "-gliflozins") block this on purpose. They lower glucose and protect the heart and kidneys. Expect glucose on the dipstick. Side effects: genital thrush, urine infections, and ketoacidosis with a near-normal glucose.','A faulty SGLT2 gene causes harmless familial renal glycosuria; a faulty SGLT1 mainly affects the gut.']],
  ['Aquaporins',['<b>Aquaporin-1:</b> proximal tubule and thin descending limb. Always present.','<b>Aquaporin-2:</b> collecting duct, urine side. Inserted <b>only when ADH is present</b>.','<b>Aquaporin-3 and -4:</b> collecting duct, blood side. Always present: the exit for water that entered through aquaporin-2.']],
  ['Tight junctions set the leak',['<b>Proximal tubule: leaky.</b> Sodium, chloride and water also pass between the cells.','<b>Thick ascending limb: selective.</b> Calcium and magnesium pass between cells, pushed by the positive lumen.','<b>Collecting duct: very tight.</b> It can hold steep gradients between urine and blood.','The claudin proteins in the junction decide what gets through.']]]],
 ['notes',
  ['exam','<b>Loops lose calcium; thiazides keep it.</b> A loop diuretic removes the voltage that drives calcium reabsorption; a thiazide increases calcium uptake in the distal tubule.'],
  ['fix','Renal System deck · DCT and collecting duct notes','The speaker note headed "In DCT" (bicarbonate and water reabsorption, the Na⁺/H⁺ exchanger, two thirds of water and electrolytes) is describing the <b>proximal</b> tubule. The distal convoluted tubule is impermeable to water and reabsorbs about 5% of sodium through the Na⁺–Cl⁻ cotransporter. Intercalated cells are in the late distal tubule and the collecting duct.']]
]},
/* ------------------------------------------------------------------ */
{id:'renal-water',eb:'Balance',h:'Water, sodium and ADH',p:'Two separate systems. The <b>concentration</b> of the blood (osmolality) is controlled by ADH and thirst, which move water. The <b>volume</b> of the circulation is controlled by the renin–angiotensin–aldosterone system and natriuretic peptides, which move sodium. So the plasma sodium tells you about water balance, not about how much sodium is in the body.',b:[
 ['two',
  ['axis','dg-adh','Osmoregulation','A rise in osmolality of only 1 to 2% is enough to trigger it.',{label:'Control of plasma osmolality by ADH',nodes:[{t:'Osmoreceptors',s:'hypothalamus',c:'n-nerve'},{t:'Posterior pituitary',s:'releases ADH',c:'n-org'},{t:'Collecting duct',s:'V₂ receptor → aquaporin-2',c:'n-box'},{t:'Water is reabsorbed',s:'small volume of strong urine',c:'n-blood'}],links:['osmolality ↑','ADH',''],fb:[[3,0,'-','osmolality falls']],side:[[0,['also switch on','thirst'],'sm']]}],
  ['card','ADH (vasopressin) and its receptors',['<b>Made</b> in the supraoptic and paraventricular nuclei of the hypothalamus; <b>released</b> from the posterior pituitary.','<b>Triggers:</b> raised osmolality (the main one); a fall in blood volume or pressure of more than about 10%; angiotensin II; nausea and pain. <b>Alcohol</b> switches it off.','<b>V₂, collecting duct:</b> G<sub>s</sub> → cAMP → aquaporin-2 moves to the luminal membrane.','<b>V₂, endothelium:</b> releases von Willebrand factor and factor VIII, which is why desmopressin is used in mild haemophilia A and von Willebrand disease.','<b>V₁, blood vessels:</b> vasoconstriction.','<b>V₃, pituitary:</b> helps release ACTH.','<b>Desmopressin</b> is a synthetic ADH selective for V₂: used for cranial diabetes insipidus and bedwetting.']]],
 ['pw','adhpath'],
 ['cards',[
  ['Where the water is',['A 70 kg adult holds about <b>42 L</b> of water.','<b>Two thirds inside cells</b> (28 L): the main cation is potassium.','<b>One third outside cells</b> (14 L): the main cation is sodium. About 11 L is interstitial fluid and 3 L is plasma.','<b>Plasma osmolality</b> ≈ 2 × sodium + glucose + urea = 275 to 295 mOsm/kg.','Water moves freely between compartments until osmolality is equal; sodium stays outside cells. So sodium sets the size of the extracellular compartment.']],
  ['Prescribing fluids (NICE)',['<b>Maintenance for a day:</b> 25 to 30 mL/kg of water, about 1 mmol/kg each of sodium, potassium and chloride, and 50 to 100 g of glucose.','<b>Resuscitation:</b> 500 mL of crystalloid (0.9% saline or Hartmann\'s) over less than 15 minutes, then reassess.','<b>0.9% saline</b> contains 154 mmol/L of sodium and of chloride. Large volumes cause a hyperchloraemic acidosis.','<b>5% glucose</b> is in effect water: it spreads through all compartments and does little for blood volume.']]]],
 ['table',['','Hyponatraemia (below 135 mmol/L)','Hypernatraemia (above 145 mmol/L)'],[
  ['What it means','Too much water for the amount of sodium','Too little water for the amount of sodium'],
  ['Causes','Sort by volume. <b>Dry:</b> diuretics (especially thiazides), vomiting and diarrhoea, Addison\'s disease. <b>Normal volume:</b> SIADH, hypothyroidism, drinking too much water. <b>Overloaded:</b> heart failure, cirrhosis, nephrotic syndrome','Water loss without replacement: not drinking (older or unwell people), diarrhoea, sweating, <b>diabetes insipidus</b>, osmotic diuresis from high glucose'],
  ['What happens to cells','Water moves into brain cells and they swell','Water leaves brain cells and they shrink'],
  ['Symptoms','Headache, nausea, lethargy, confusion; if severe or sudden, seizures and coma','Thirst, dry mouth, weakness, irritability, confusion, seizures'],
  ['Treatment','Treat the cause. Fluid restriction for SIADH; saline if dry. Hypertonic (3%) saline only for seizures or coma','Water by mouth, or hypotonic fluid slowly by vein'],
  ['The danger','Correcting faster than about 10 mmol/L in 24 hours: <b>osmotic demyelination</b> (central pontine myelinolysis)','Correcting too fast: cerebral oedema']]],
 ['cards',[
  ['SIADH: too much ADH',['ADH is released when it should not be. Water is retained and sodium is diluted; the patient looks neither dry nor overloaded.','<b>Tests:</b> low plasma osmolality with urine that is <b>inappropriately concentrated</b> (osmolality above 100) and contains sodium (above 30 mmol/L).','<b>Causes:</b> small cell lung cancer; pneumonia; meningitis, head injury, stroke; drugs (SSRIs, carbamazepine); pain and surgery.','<b>Treatment:</b> treat the cause and restrict fluid; tolvaptan (a V₂ blocker) if needed.']],
  ['Diabetes insipidus: too little ADH effect',['<b>Cranial:</b> the pituitary does not release ADH (surgery, tumour, head injury).','<b>Nephrogenic:</b> the kidney ignores it (<b>lithium</b>, high calcium, low potassium, inherited).','Litres of dilute urine and great thirst. Sodium rises if the patient cannot drink.','<b>Water deprivation test:</b> the urine stays dilute. Then give desmopressin: urine concentrates in cranial DI but not in nephrogenic DI.','Diabetes <b>mellitus</b> also causes polyuria and thirst, but through glucose in the urine.']]]],
 ['notes',
  ['fix','Renal System deck · sodium homeostasis note','The note says ADH "promotes Na and water reabsorption". ADH moves <b>water only</b> (and makes vessels constrict). Sodium reabsorption is controlled by aldosterone and angiotensin II. Keeping the two systems separate is the key to understanding sodium results. The hypernatraemia slide also leaves out diabetes insipidus, the cause examiners like best.']]
]},
/* ------------------------------------------------------------------ */
{id:'renal-diuretics',eb:'Pharmacology',h:'Diuretics',p:'A diuretic makes the kidney excrete more sodium, and water follows. Each class blocks one sodium transporter. The earlier it acts and the more sodium that segment handles, the stronger the drug. Anything that sends extra sodium on to the collecting duct makes the kidney lose potassium and acid.',b:[
 ['think','The nephron as a row of toll booths, each taking back some sodium. Close a big, busy booth (the loop) and a flood of sodium gets through. Close the small last booth (the collecting duct) and you lose only a trickle, but that booth is where sodium is swapped for potassium.'],
 ['table',['Class','Examples','Where and what it blocks','Used for','Side effects'],[
  ['Loop','Furosemide, bumetanide','Thick ascending limb: NKCC2','Pulmonary oedema and heart failure; oedema of kidney and liver disease','Low potassium, sodium, magnesium and calcium; metabolic alkalosis; dehydration and kidney injury; gout; hearing damage at high IV doses'],
  ['Thiazide and thiazide-like','Bendroflumethiazide, indapamide','Distal convoluted tubule: NCC','Hypertension; mild oedema','Low sodium (common in older people), low potassium, low magnesium; <b>raised</b> calcium, urate (gout) and glucose; erectile dysfunction'],
  ['Aldosterone antagonist','Spironolactone, eplerenone','Collecting duct: the aldosterone receptor','Heart failure; ascites in cirrhosis; Conn\'s syndrome; resistant hypertension','<b>High potassium</b>; breast enlargement and tenderness in men (spironolactone also blocks androgen receptors)'],
  ['ENaC blocker','Amiloride','Collecting duct: the ENaC sodium channel','With a loop or thiazide, to hold on to potassium','High potassium'],
  ['Carbonic anhydrase inhibitor','Acetazolamide','Proximal tubule: carbonic anhydrase, so bicarbonate (and sodium) cannot be reabsorbed','Glaucoma; prevention of altitude sickness; raised intracranial pressure','Metabolic acidosis, low potassium, kidney stones, tingling. Weak, and its effect wears off'],
  ['Osmotic','Mannitol','Filtered but not reabsorbed: holds water in the tubule. In the blood it draws water out of cells','Raised intracranial pressure; acute glaucoma','First expands the blood volume (can tip heart failure into pulmonary oedema), then dehydrates'],
  ['SGLT2 inhibitor','Dapagliflozin, empagliflozin','Proximal tubule: SGLT2','Type 2 diabetes, heart failure, chronic kidney disease','Genital thrush, urinary infection, ketoacidosis']]],
 ['cards',[
  ['Why loop and thiazide diuretics waste potassium',['More sodium arrives at the collecting duct.','Principal cells take it up through ENaC and secrete potassium in exchange.','Volume loss raises aldosterone, which increases the exchange further.','Intercalated cells secrete more H⁺ as well.','Result: <b>hypokalaemic metabolic alkalosis</b>.','Potassium-sparing drugs block this last step, so they do the opposite: <b>high potassium and a mild acidosis</b>.']],
  ['Prescribing safely',['Check kidney function and electrolytes before and 1 to 2 weeks after starting.','<b>"Sick day rules":</b> during vomiting, diarrhoea or fever, pause diuretics, ACE inhibitors and ARBs, metformin and NSAIDs.','<b>The "triple whammy":</b> ACE inhibitor + diuretic + NSAID is a classic cause of acute kidney injury.','Spironolactone with an ACE inhibitor or ARB: watch the potassium.','Thiazides in older people: watch the sodium.']]]],
 ['notes',
  ['clin','Altitude sickness and acetazolamide','At altitude, low oxygen makes you hyperventilate. CO₂ falls and the blood becomes alkaline (a respiratory alkalosis), which then holds breathing back. Acetazolamide makes the kidney lose bicarbonate, creating a mild metabolic acidosis that offsets the alkalosis, so breathing can keep rising.'],
  ['fix','Renal System deck · potassium-sparing diuretics','The slide lists "testicular atrophy" and says aldosterone antagonists prevent the "synthesis" of aldosterone. Spironolactone <b>blocks the receptor</b>; aldosterone is still made. The typical hormonal side effect is <b>gynaecomastia</b> in men (and menstrual irregularity in women), because spironolactone also blocks androgen receptors; eplerenone does not. The altitude note also calls the alkalosis "metabolic": it is respiratory.']]
]},
/* ------------------------------------------------------------------ */
{id:'renal-acidbase',eb:'Balance',h:'Acid–base balance and blood gases',p:'Blood pH is held between 7.35 and 7.45. The body makes acid all the time: CO₂ from metabolism, removed by the lungs, and about 70 mmol a day of other acids from protein, removed by the kidneys.',b:[
 ['cards',[
  ['Three lines of defence',['<b>Buffers (seconds):</b> soak up H⁺ at once. Bicarbonate is the main one outside cells; haemoglobin, other proteins and phosphate work inside them.','<b>Lungs (minutes):</b> breathe more to blow off CO₂, or less to keep it.','<b>Kidneys (hours to days):</b> reclaim all the filtered bicarbonate, and excrete H⁺ bound to phosphate and ammonium, making new bicarbonate as they do so.','<b>CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻</b>, speeded up by carbonic anhydrase.','<b>Henderson–Hasselbalch:</b> pH = pK + log (bicarbonate ÷ dissolved CO₂). pH depends on the <b>ratio</b> of bicarbonate (kidneys) to CO₂ (lungs).']],
  ['Normal values',['<b>pH</b> 7.35 to 7.45','<b>PaCO₂</b> 4.7 to 6.0 kPa','<b>PaO₂</b> 11 to 13 kPa (breathing air)','<b>Bicarbonate</b> 22 to 26 mmol/L','<b>Base excess</b> −2 to +2 mmol/L. More negative than −2 means a metabolic acidosis; more positive than +2, a metabolic alkalosis.','<b>Lactate</b> below 2 mmol/L']]]],
 ['pw','bicarb'],
 ['widget','abg'],
 ['table',['Disorder','pH','First change','Compensation','Common causes'],[
  ['Respiratory acidosis','<span class="down">↓</span>','PaCO₂ <span class="up">↑</span>','Kidneys keep bicarbonate (takes days)','Under-breathing: COPD, exhaustion in severe asthma, opioids and sedatives, weak respiratory muscles (Guillain–Barré), obesity'],
  ['Respiratory alkalosis','<span class="up">↑</span>','PaCO₂ <span class="down">↓</span>','Kidneys excrete bicarbonate','Over-breathing: anxiety, pain, low oxygen (pulmonary embolus, pneumonia, altitude), early aspirin overdose, pregnancy'],
  ['Metabolic acidosis','<span class="down">↓</span>','Bicarbonate <span class="down">↓</span>','Deep, fast breathing (Kussmaul): PaCO₂ falls','<b>Raised anion gap:</b> ketoacidosis, lactic acidosis, kidney failure, poisons. <b>Normal anion gap:</b> diarrhoea, renal tubular acidosis, Addison\'s disease'],
  ['Metabolic alkalosis','<span class="up">↑</span>','Bicarbonate <span class="up">↑</span>','Slower breathing: PaCO₂ rises a little','Vomiting, diuretics, Conn\'s and Cushing\'s syndromes, low potassium']]],
 ['cards',[
  ['Reading a blood gas in five steps',['<b>1. Oxygen.</b> Is the PaO₂ adequate for the oxygen being given?','<b>2. pH.</b> Acidaemia (below 7.35) or alkalaemia (above 7.45)?','<b>3. PaCO₂.</b> Would it explain the pH? High CO₂ with a low pH is respiratory.','<b>4. Bicarbonate and base excess.</b> Would they explain the pH? Low bicarbonate with a low pH is metabolic.','<b>5. Compensation.</b> Has the other one moved in the direction that pulls pH back? Compensation never overshoots. If CO₂ and bicarbonate both push pH the same way, it is a <b>mixed</b> disorder.','<b>ROME:</b> Respiratory Opposite (pH and CO₂ move in opposite directions), Metabolic Equal (pH and bicarbonate move the same way).']],
  ['The anion gap',['<b>Anion gap = (Na⁺ + K⁺) − (Cl⁻ + HCO₃⁻).</b> Normal about 10 to 18 mmol/L (4 to 12 if potassium is left out).','It stands for the anions that are not measured: albumin, phosphate, and any added acid.','<b>Raised gap:</b> an acid has been added whose anion is not chloride. <b>KULT:</b> <b>K</b>etones (diabetes, alcohol, starvation), <b>U</b>raemia, <b>L</b>actate (sepsis, shock, metformin), <b>T</b>oxins (methanol, ethylene glycol, aspirin).','<b>Normal gap:</b> bicarbonate has been lost and replaced by chloride: diarrhoea, renal tubular acidosis, acetazolamide, Addison\'s disease, a lot of saline.','<b>Worked example:</b> Na 140, K 4, Cl 100, HCO₃ 12. Gap = 144 − 112 = 32: raised.']],
  ['Respiratory failure',['<b>Type 1:</b> PaO₂ below 8 kPa with a normal or low PaCO₂. A ventilation–perfusion mismatch: pneumonia, pulmonary embolus, pulmonary oedema, asthma. Extra breathing can clear CO₂ but cannot add much oxygen to blood that is already saturated.','<b>Type 2:</b> PaO₂ below 8 kPa <b>and</b> PaCO₂ above 6 kPa. Not enough air is reaching the alveoli (<b>hypoventilation</b>): COPD, a tiring asthmatic, opioids, neuromuscular disease, chest wall deformity.','In type 2 failure give <b>controlled oxygen</b> aiming for saturations of 88 to 92%, and support breathing (non-invasive ventilation) if the pH is falling.','A normal or rising PaCO₂ in an asthma attack is a danger sign: the patient is tiring.']]]],
 ['notes',
  ['clin','Diabetic ketoacidosis on a blood gas','Glucose above 11 mmol/L, ketones 3 mmol/L or more in blood (or ++ in urine), and pH below 7.3 or bicarbonate below 15. A raised anion gap metabolic acidosis with respiratory compensation: low pH, low bicarbonate and a low PaCO₂ from deep sighing breathing.'],
  ['fix','Renal System deck · ABG slides','<b>Diarrhoea</b> is listed with vomiting as a cause of metabolic alkalosis. Vomiting loses stomach acid (alkalosis); diarrhoea loses bicarbonate and causes a normal anion gap <b>acidosis</b>. Type 2 respiratory failure is put down to "alveolar hyperventilation": it is <b>hypoventilation</b>. The note "Don\'t treat with O₂" is dangerous as written: hypoxia kills, so give controlled oxygen to a target of 88 to 92%. The summary table\'s last column is headed O₂ but shows bicarbonate. And the acid–base slide has CO₂ sensed by peripheral chemoreceptors with pCO₂ then rising: CO₂ is sensed mainly by the <b>central</b> chemoreceptors, and the extra breathing makes pCO₂ fall.']]
]},
/* ------------------------------------------------------------------ */
{id:'renal-electrolytes',eb:'Balance',h:'Potassium, calcium, phosphate and magnesium',p:'Potassium sets the resting membrane potential; calcium sets how easily a nerve fires. That is why disorders of both show up in nerves, muscle and the ECG.',b:[
 ['cards',[
  ['Potassium: where it is and what moves it',['<b>98% is inside cells</b> (about 140 mmol/L inside, 3.5 to 5.3 outside), kept there by the Na⁺/K⁺-ATPase.','<b>Into cells:</b> insulin, β₂ agonists (salbutamol), alkalosis.','<b>Out of cells:</b> acidosis, lack of insulin, and cell breakdown (crush injury, haemolysis, tumour lysis).','<b>Out of the body:</b> the collecting duct, driven by aldosterone and by sodium delivery.','A sample that has haemolysed in the tube gives a falsely high result: repeat it before treating a surprising one.']],
  ['Corrected calcium',['About 40% of plasma calcium is bound to albumin and inactive; only the free (ionised) part matters.','<b>Corrected calcium</b> = measured calcium + 0.02 × (40 − albumin in g/L).','<b>Alkalosis</b> makes more calcium bind to albumin: hyperventilation causes tingling and spasm with a normal total calcium.','PTH raises calcium (bone, kidney, and vitamin D activation); calcitriol raises calcium and phosphate; calcitonin lowers calcium a little.']]]],
 ['table',['','Hypokalaemia (below 3.5 mmol/L)','Hyperkalaemia (above 5.5 mmol/L)'],[
  ['Causes','Loop and thiazide diuretics; vomiting and diarrhoea; too much aldosterone or cortisol (Conn\'s, Cushing\'s); insulin and salbutamol; alkalosis; low magnesium','Kidney failure (acute or chronic); ACE inhibitors, ARBs, spironolactone, NSAIDs, trimethoprim; Addison\'s disease; acidosis (DKA); tissue breakdown'],
  ['Effect on cells','Resting potential more negative: cells are harder to excite','Resting potential less negative: sodium channels inactivate'],
  ['Features','Weakness, cramps, constipation, palpitations, passing a lot of urine','Often nothing until the heart rhythm changes; weakness'],
  ['ECG','Flat T waves, U waves, ST depression, long QT','Tall tented T waves, flat P waves, long PR, wide QRS, then a sine wave and arrest'],
  ['Treatment','Potassium by mouth; by vein in saline, usually no faster than 10 mmol an hour on a ward. Replace magnesium too','Calcium gluconate to protect the heart; insulin <b>with</b> glucose and salbutamol to move potassium into cells; then remove it (stop the drugs, binders, dialysis)']]],
 ['table',['','Hypocalcaemia (below 2.2 mmol/L)','Hypercalcaemia (above 2.6 mmol/L)'],[
  ['Causes','Vitamin D deficiency, chronic kidney disease, hypoparathyroidism (often after neck surgery), low magnesium, acute pancreatitis','<b>Primary hyperparathyroidism and cancer</b> cause 90% (bone metastases, myeloma, PTH-related peptide from squamous cell cancers). Also sarcoidosis, thiazides, too much vitamin D'],
  ['Effect on cells','Nerves fire too easily: with less calcium outside, sodium channels open more readily','Nerves and muscle are less excitable'],
  ['Features','Tingling round the mouth and in the fingers, cramps, <b>tetany</b>, spasm of the larynx, seizures. Chvostek\'s sign (tapping the facial nerve twitches the face); Trousseau\'s sign (a blood pressure cuff brings on hand spasm)','<b>"Bones, stones, abdominal groans and psychic moans":</b> bone pain, kidney stones, constipation and nausea, low mood and confusion; thirst and polyuria'],
  ['ECG','Long QT','Short QT'],
  ['Treatment','IV calcium gluconate if severe; calcium and vitamin D by mouth','<b>IV 0.9% saline first</b>, then a bisphosphonate; treat the cause (remove the parathyroid adenoma)']]],
 ['cards',[
  ['Phosphate (normal 0.8 to 1.5 mmol/L)',['PTH makes the kidney excrete phosphate; the kidney is the main route out.','<b>Low:</b> <b>refeeding syndrome</b>, hyperparathyroidism, vitamin D deficiency, alcohol excess. Cells run short of ATP: muscle weakness (including the breathing muscles and heart), confusion.','<b>Refeeding syndrome:</b> feeding after starvation releases insulin, which drives phosphate, potassium and magnesium into cells. Arrhythmias, heart failure and seizures follow within days. Feed slowly, give thiamine, and replace electrolytes.','<b>High:</b> chronic kidney disease (the commonest cause), tumour lysis, crush injury. Phosphate binds calcium: low calcium, itching, and calcium deposits in blood vessels. Treat with a low-phosphate diet, phosphate binders, dialysis.']],
  ['Magnesium (normal 0.7 to 1.0 mmol/L)',['A cofactor for the Na⁺/K⁺-ATPase and needed for PTH release. Reabsorbed mainly in the thick ascending limb.','<b>Low:</b> diuretics, proton pump inhibitors, alcohol, diarrhoea, malnutrition. Tremor, tetany, seizures and arrhythmias (torsades de pointes).','Low magnesium causes a <b>low potassium and a low calcium that will not correct</b> until the magnesium is replaced.','<b>High:</b> kidney failure plus magnesium-containing laxatives or antacids, or magnesium treatment. Lost reflexes, drowsiness, slow breathing, heart block. Antidote: calcium gluconate.','<b>IV magnesium sulfate</b> is a treatment for eclampsia, torsades de pointes and life-threatening asthma.']]]],
 ['pw','ckdmbd'],
 ['notes',
  ['fix','Renal System deck · electrolyte slides','Severe hyperkalaemia is treated with "insulin or glucose": it is insulin <b>with</b> glucose. Insulin is what moves potassium into cells; the glucose is only there to prevent hypoglycaemia. The phosphate slide sets hypophosphataemia at below 0.4 mmol/L (the lower limit of normal is 0.8) and gives the same symptoms for high and low phosphate: a high phosphate causes trouble mainly by lowering calcium. The main ECG change of hypercalcaemia is a short QT interval.']]
]},
/* ------------------------------------------------------------------ */
{id:'renal-failure',eb:'Disease',h:'Testing the kidneys: AKI and CKD',p:'Kidneys fail quietly. Acute kidney injury is a fall in function over hours to days and is often reversible. Chronic kidney disease is damage lasting more than three months and usually is not.',b:[
 ['table',['Test','What it tells you','Notes'],[
  ['Creatinine and eGFR','How well the kidneys filter','UK units: µmol/L. eGFR 90 or more is normal. Rises late'],
  ['Urea','Waste from protein breakdown','Normal 2.5 to 7.8 mmol/L. Rises more than creatinine in dehydration and after bleeding into the gut'],
  ['Potassium and bicarbonate','The dangerous consequences of failure','High potassium and acidosis'],
  ['Urine albumin:creatinine ratio (ACR)','Albumin leaking through the filter: the earliest sign of damage in diabetes and hypertension','<b>3 mg/mmol or more is abnormal</b>; above 30 is heavy. Use an early-morning sample'],
  ['Urine dipstick','Blood, protein, glucose, ketones, nitrites, white cells','See the next table'],
  ['Urine microscopy','Cells and casts','Red cell casts: glomerulonephritis. Muddy brown casts: acute tubular necrosis. White cell casts: pyelonephritis or interstitial nephritis'],
  ['Ultrasound','Size, obstruction (hydronephrosis), cysts','Two small kidneys mean long-standing disease'],
  ['Biopsy','The exact diagnosis in glomerular disease','']]],
 ['table',['Dipstick square','A positive means','Remember'],[
  ['Blood','Infection, stones, tumour of the bladder, kidney or prostate, glomerulonephritis','Also positive with free haemoglobin (haemolysis) or myoglobin (muscle breakdown): no red cells under the microscope. <b>Painless visible blood in the urine of an older adult is cancer until proved otherwise</b>'],
  ['Protein','Glomerular disease; also infection, fever, heavy exercise','Detects mainly albumin. Measure it properly with an ACR'],
  ['Glucose','Blood glucose above the renal threshold: diabetes','Expected with SGLT2 inhibitors; the threshold is lower in pregnancy'],
  ['Ketones','Fat is being burned for fuel: diabetic ketoacidosis, starvation, vomiting',''],
  ['Bilirubin and urobilinogen','Liver disease or a blocked bile duct (bilirubin); haemolysis (urobilinogen)','Only conjugated bilirubin can enter urine'],
  ['Nitrites','Bacteria: most Gram-negative organisms turn nitrate into nitrite','Specific for infection'],
  ['Leucocyte esterase','White cells in the urine','Sensitive but less specific']]],
 ['tree','aki'],
 ['cards',[
  ['AKI: definition and stages',['Any one of: creatinine up by <b>26 µmol/L or more within 48 hours</b>; creatinine <b>1.5 times baseline</b> or more within 7 days; urine output <b>below 0.5 mL/kg/hour for 6 hours</b>.','<b>Stage 1:</b> creatinine 1.5 to 1.9 × baseline; urine below 0.5 for 6 hours.','<b>Stage 2:</b> 2 to 2.9 ×; urine below 0.5 for 12 hours.','<b>Stage 3:</b> 3 × or more, or needing dialysis; urine below 0.3 for 24 hours, or none for 12.','<b>At risk:</b> over 65, existing kidney disease, heart failure, diabetes, sepsis, dehydration, nephrotoxic drugs, contrast dye.']],
  ['AKI: what to do',['<b>Find and treat the cause.</b> Fluids if dry; treat sepsis; relieve obstruction (bladder scan, catheter, ultrasound).','<b>Stop the drugs that harm:</b> NSAIDs, ACE inhibitors and ARBs, diuretics if dry, gentamicin. Reduce doses of drugs cleared by the kidney (metformin, opioids, heparins).','Dip the urine: blood and protein together suggest glomerulonephritis and need urgent specialist advice.','Chart fluid balance and check electrolytes daily.','<b>Dialysis is needed for (AEIOU):</b> <b>A</b>cidosis, <b>E</b>lectrolytes (high potassium that will not come down), <b>I</b>ntoxication (lithium, aspirin), <b>O</b>verload (pulmonary oedema), <b>U</b>raemia (pericarditis, confusion).']],
  ['CKD: definition and stages',['Abnormal kidney function or structure for <b>more than 3 months</b>: an eGFR below 60, or evidence of damage (raised ACR, blood in the urine, abnormal scan).','<b>G1</b> 90 or more (with other evidence of damage) · <b>G2</b> 60 to 89 · <b>G3a</b> 45 to 59 · <b>G3b</b> 30 to 44 · <b>G4</b> 15 to 29 · <b>G5</b> below 15 (kidney failure).','<b>A1</b> ACR below 3 · <b>A2</b> 3 to 30 · <b>A3</b> above 30.','<b>Causes:</b> diabetes (the commonest), hypertension, glomerulonephritis, polycystic kidney disease, obstruction, drugs.']],
  ['CKD: consequences and treatment',['Everything the kidney does goes wrong: salt and water retention with <b>hypertension</b>; <b>high potassium</b>; <b>acidosis</b>; <b>anaemia</b> (less erythropoietin); <b>bone disease</b> (less active vitamin D, high phosphate); uraemia (nausea, itching).','Most people with CKD die of <b>cardiovascular disease</b>, not kidney failure.','<b>Slow it down:</b> control blood pressure; an ACE inhibitor or ARB if the ACR is raised; an SGLT2 inhibitor; good diabetic control; a statin.','<b>Treat the consequences:</b> iron and erythropoietin, phosphate binders, vitamin D, bicarbonate.','<b>Replace the kidney:</b> haemodialysis, peritoneal dialysis or a transplant.']]]],
 ['notes',
  ['fix','Renal System deck · AKI and function tests','The AKI slide lists "hypotension, haemorrhage, dehydration, diuretics, NSAIDs, hypovolaemia" as <b>intra-renal</b> causes. Those are <b>pre-renal</b> (too little blood reaching the kidney). Intrinsic causes are acute tubular necrosis, glomerulonephritis, interstitial nephritis and vasculitis. The function test slide uses American units ("creatinine above 1.2", "BUN 7 to 20", "ACR above 30") and calls an eGFR above 60 normal: in the UK creatinine is in µmol/L, urea in mmol/L, an ACR of 3 mg/mmol or more is abnormal, and a normal eGFR is 90 or more.'],
  ['fix','Renal System deck · urine dipstick and calculations','The entry for <b>ketones</b> describes bilirubin and urobilinogen. Ketones mean fat is being burned (ketoacidosis, starvation); bilirubin and urobilinogen are separate squares that point to liver disease or haemolysis. On the calculations slide, the useful formula is <b>clearance = urine concentration × urine flow ÷ plasma concentration</b>; "Cu" and "Cp" refer to creatinine, not creatine.']]
]},
/* ------------------------------------------------------------------ */
{id:'renal-urology',eb:'Disease',h:'Infections, stones, bladder control and congenital disorders',p:'The lower urinary tract is plumbing. Its problems are infection climbing up it, stones blocking it, and a bladder that fails to store or to empty.',b:[
 ['cards',[
  ['Urinary tract infection',['<b>Organisms:</b> <i>E. coli</i> in about 80% (its fimbriae grip the bladder lining); also <i>Klebsiella</i>, <i>Proteus</i> (makes urease: alkaline urine and stones), <i>Enterococcus</i>, <i>Staphylococcus saprophyticus</i> in young women; <i>Pseudomonas</i> and <i>Candida</i> with catheters.','Bacteria from the bowel <b>ascend</b> the urethra.','<b>Risk factors:</b> being female (short urethra), sex, pregnancy, the menopause, diabetes, catheters, obstruction (enlarged prostate, stones), immunosuppression.','<b>Cystitis (bladder):</b> burning on passing urine, frequency, urgency, suprapubic pain, cloudy or smelly urine, sometimes blood. New confusion in older people.','<b>Pyelonephritis (kidney):</b> fever, rigors, loin pain and vomiting. Can cause sepsis.']],
  ['Diagnosis and treatment (NICE)',['<b>Women under 65:</b> a dipstick positive for <b>nitrites</b>, or for leucocytes and blood, supports the diagnosis.','<b>Over 65, men, pregnancy, catheters:</b> do not rely on the dipstick; send urine for culture. Bacteria in the urine without symptoms are left alone, except in pregnancy.','<b>Non-pregnant women:</b> nitrofurantoin or trimethoprim for <b>3 days</b>.','<b>Men:</b> 7 days.','<b>Pregnancy:</b> 7 days. Nitrofurantoin (but not close to delivery); avoid trimethoprim in the first trimester because it blocks folate.','<b>Pyelonephritis:</b> cefalexin, co-amoxiclav or ciprofloxacin for 7 to 10 days; admit if septic.','Nitrofurantoin works only when concentrated in urine, so it needs an eGFR of 45 or more.']]]],
 ['table',['Stone','How common','Clues'],[
  ['Calcium oxalate (or phosphate)','About 80%','Show on X-ray. Dehydration, high urinary calcium, hyperparathyroidism'],
  ['Struvite (magnesium ammonium phosphate)','About 10%','Infection with urease-producing bacteria (<i>Proteus</i>); alkaline urine; large "staghorn" stones filling the renal pelvis'],
  ['Uric acid','5 to 10%','<b>Invisible on plain X-ray</b> (seen on CT). Gout, acidic urine, cell breakdown'],
  ['Cystine','1%','Inherited cystinuria; young patients']]],
 ['cards',[
  ['Renal colic',['Sudden, severe pain from <b>loin to groin</b>, coming in waves; the patient cannot lie still. Nausea, and blood on the dipstick in about 90%.','Stones lodge at three narrow points: where the renal pelvis joins the ureter, where the ureter crosses the pelvic brim, and where it enters the bladder.','<b>Imaging:</b> non-contrast <b>CT of the kidneys, ureters and bladder</b> within 24 hours; ultrasound in pregnancy and children.','<b>Pain relief:</b> an NSAID such as diclofenac.','<b>Emergency:</b> a blocked kidney with fever is an infected, obstructed system: urgent drainage (nephrostomy or stent).','<b>Under 5 mm:</b> usually pass by themselves. <b>5 to 10 mm in the lower ureter:</b> an alpha-blocker helps. <b>Larger:</b> shock wave lithotripsy or ureteroscopy. <b>Over 20 mm or staghorn:</b> percutaneous removal.','<b>Prevention:</b> 2.5 to 3 L of fluid a day, less salt, a normal calcium intake.']],
  ['Congenital disorders',['<b>Horseshoe kidney</b> (1 in 500): the lower poles fuse, and the kidney is caught under the inferior mesenteric artery as it ascends. Usually silent; more stones, infections and obstruction. Linked with Turner syndrome.','<b>Renal agenesis:</b> one missing kidney causes no trouble. With none, the fetus makes no urine, so there is no amniotic fluid and the lungs cannot develop (Potter sequence).','<b>Autosomal dominant polycystic kidney disease</b> (1 in 1,000; PKD1 on chromosome 16, PKD2 on 4): cysts enlarge through adult life. Loin pain, blood in the urine, hypertension, stones, kidney failure in middle age. Also liver cysts and <b>berry aneurysms</b> (subarachnoid haemorrhage).','<b>Autosomal recessive polycystic kidney disease:</b> rare, presents in infancy, with liver fibrosis.','<b>Vesico-ureteric reflux:</b> urine flows back up to the kidney: repeated infections and scarring in children.']],
  ['How the kidney develops',['Three sets of kidneys form in turn: the pronephros (vanishes), the mesonephros (works briefly; its duct becomes the vas deferens in males) and the <b>metanephros</b>, the permanent kidney, from week 5.','The <b>ureteric bud</b> grows from the mesonephric duct and forms the ureter, renal pelvis, calyces and collecting ducts.','The <b>metanephric mesenchyme</b> forms the nephrons, from glomerulus to distal tubule.','The kidneys start in the pelvis and <b>ascend</b>, taking new arteries as they go: hence extra renal arteries and the occasional pelvic kidney.','The bladder forms from the urogenital sinus.']],
  ['Enlarged prostate',['Benign prostatic hyperplasia squeezes the urethra: hesitancy, poor stream, dribbling, a feeling of incomplete emptying, getting up at night.','<b>Tamsulosin</b> (an α₁ blocker) relaxes smooth muscle in the prostate and bladder neck within days; it can cause dizziness on standing.','<b>Finasteride</b> (a 5α-reductase inhibitor) stops testosterone becoming dihydrotestosterone and shrinks the gland over months.','<b>Acute retention</b> (painful, unable to pass urine, palpable bladder): catheterise.']]]],
 ['pw','micturition'],
 ['table',['Nerve','Spinal roots','Type','Effect'],[
  ['Hypogastric','T10 to L2','Sympathetic','<b>Storage.</b> β₃ receptors relax the detrusor; α₁ receptors close the internal sphincter'],
  ['Pelvic splanchnic','S2 to S4','Parasympathetic','<b>Voiding.</b> Acetylcholine on M₃ receptors contracts the detrusor'],
  ['Pudendal','S2 to S4','Somatic (voluntary)','Holds the external sphincter shut until you choose to relax it']]],
 ['table',['Type of incontinence','What happens','Why','Treatment'],[
  ['Stress','Leaks with a cough, laugh, sneeze or lift','A weak pelvic floor and sphincter: childbirth, the menopause, prostate surgery','<b>Pelvic floor muscle training</b> for 3 months; surgery; duloxetine if surgery is not wanted'],
  ['Urge (overactive bladder)','A sudden, strong urge and then a leak; frequency, getting up at night','The detrusor contracts when it should not. Often no cause; sometimes neurological (multiple sclerosis, stroke)','<b>Bladder training</b> for 6 weeks; cut down caffeine; antimuscarinics (oxybutynin, solifenacin, tolterodine: dry mouth, constipation, confusion in older people); mirabegron (a β₃ agonist); botulinum toxin into the bladder'],
  ['Overflow','Constant dribbling from a bladder that never empties; poor stream','A blocked outlet (enlarged prostate) or a weak detrusor (diabetic nerve damage, antimuscarinic drugs, cauda equina syndrome)','Catheter; treat the blockage'],
  ['Continuous or functional','Leaks all the time, or cannot get to the toilet in time','A fistula or spinal injury; or immobility and dementia','Treat the cause; practical help']]],
 ['notes',
  ['exam','"S2, 3, 4 keeps the pee off the floor": the parasympathetic supply to the bladder and the pudendal nerve both come from S2 to S4. Loss of bladder control with numbness around the anus and leg weakness is <b>cauda equina syndrome</b>: an emergency.'],
  ['fix','Renal System deck · UTI and stones slides','The dipstick test for bacteria detects <b>nitrites</b> (the slide says nitrates: bacteria convert nitrate to nitrite). In pregnancy NICE recommends <b>7 days</b> of antibiotic, not 5. "CT KUB" stands for kidneys, <b>ureters</b> and bladder, and is done without contrast. For the pain of renal colic the recommended NSAID is diclofenac. A "complicated" UTI means one in a person with an abnormal urinary tract, a catheter, pregnancy, immunosuppression, or in a man.']]
]},
/* ------------------------------------------------------------------ */
{id:'renal-transplant',eb:'Disease',h:'Kidney transplants and rejection',p:'A transplant is the best treatment for kidney failure. The new kidney is placed in the iliac fossa and joined to the iliac vessels and the bladder; the old kidneys are usually left where they are. The price is lifelong immunosuppression.',b:[
 ['think','HLA molecules are the cell\'s identity card. T cells are border guards trained to recognise their own country\'s card. A donor kidney carries foreign cards on every cell, so matching makes the cards look as similar as possible, and immunosuppressants make the guards less zealous.'],
 ['table',['Rejection','When','Mechanism','What you see','What is done'],[
  ['Hyperacute','Minutes to hours','<b>Antibodies already present</b> in the recipient (against donor ABO or HLA antigens, from an earlier transfusion, pregnancy or transplant) bind the graft\'s blood vessels, fix complement and trigger clotting. A type II hypersensitivity','The kidney turns blue and clots on the operating table','Prevented by ABO matching and the crossmatch. The graft must be removed'],
  ['Acute','Weeks to months; most in the first 6 months','<b>T cells</b> recognise donor HLA (type IV hypersensitivity). CD8 cells kill graft cells; CD4 cells recruit macrophages and help B cells make antibody','Creatinine rises, often with no symptoms; a biopsy shows lymphocytes invading the kidney','High-dose steroids. Usually reversible'],
  ['Chronic','Months to years','Slow immune and non-immune injury. The graft\'s arteries thicken and narrow, and the tissue scars','Gradual loss of function, protein in the urine, hypertension','No good treatment: the commonest cause of late graft loss']]],
 ['cards',[
  ['How T cells see the graft',['<b>Direct recognition:</b> recipient T cells bind intact donor MHC on donor antigen-presenting cells that arrived with the graft. Involves CD4 and CD8 cells. Drives early acute rejection.','<b>Indirect recognition:</b> the recipient\'s own antigen-presenting cells take up donor MHC, chop it up and present the pieces on their MHC class II to CD4 cells. Drives chronic rejection.','<b>HLA genes</b> are on <b>chromosome 6</b>. Class I (HLA-A, B, C) is on all nucleated cells; class II (HLA-DR, DQ, DP) on antigen-presenting cells.','Matching matters most for <b>HLA-DR, then B, then A</b>.']],
  ['Matching donor and recipient',['<b>ABO blood group</b> compatibility.','<b>Tissue typing:</b> donor and recipient HLA types compared; the closer the better, though a perfect match is not essential.','<b>Crossmatch:</b> recipient serum is mixed with donor lymphocytes. A reaction means antibodies are already there: do not transplant.','<b>Graft types:</b> autograft (self), isograft (identical twin), allograft (another person), xenograft (another species). The first two are not rejected.','The cornea has no blood vessels and is rarely rejected.']]]],
 ['table',['Drug','Class and target','Main side effects'],[
  ['Basiliximab','Antibody against the IL-2 receptor (CD25) on T cells. Given at the time of surgery (induction)','Well tolerated'],
  ['Tacrolimus, ciclosporin','<b>Calcineurin inhibitors.</b> Calcineurin is the enzyme that switches on the IL-2 gene; without IL-2, T cells do not multiply','<b>Toxic to the kidney</b>, hypertension, tremor, diabetes (tacrolimus), gum overgrowth and excess hair (ciclosporin). Blood levels are monitored; many drug interactions (CYP3A4)'],
  ['Mycophenolate, azathioprine','<b>Antiproliferatives.</b> Block purine synthesis, so lymphocytes cannot copy their DNA','Low blood counts, gut upset. Mycophenolate harms the fetus. Azathioprine: dangerous with allopurinol'],
  ['Prednisolone','Corticosteroid: switches off many cytokine genes','Weight gain, diabetes, thin bones and skin, infection'],
  ['Sirolimus','mTOR inhibitor: blocks the response to IL-2','Poor wound healing, high lipids']]],
 ['notes',
  ['clin','The cost of immunosuppression','<b>Infections:</b> cytomegalovirus, <i>Pneumocystis</i> pneumonia, BK virus, fungal infections; co-trimoxazole and valganciclovir are given to prevent them. <b>Cancers:</b> skin cancer (especially squamous cell) and lymphoma driven by Epstein–Barr virus. <b>Cardiovascular disease</b> and diabetes from the drugs themselves. Typical long-term treatment is tacrolimus + mycophenolate ± prednisolone.'],
  ['fix','Renal System deck · transplant notes','The notes place induction therapy "2 weeks pre" transplant. Induction (basiliximab) is given <b>at the time of the operation</b>, since deceased-donor transplants cannot be scheduled. A kidney transplant is a <b>heterotopic</b> graft (placed in the iliac fossa, not where the native kidney lies).']]
]}
],
/* ================================================================== */
trees:{
aki:{kind:'vein',dir:'ltr',label:'Causes of acute kidney injury',hint:'Tap any box for details. Ask three questions: is enough blood getting in, is the kidney itself damaged, can urine get out?',root:{t:'Acute kidney injury',s:'creatinine up, urine down',d:'A fall in kidney function over hours to days. Always ask the three questions in order, because pre-renal and post-renal causes are quick to reverse.',c:[
 {t:'Pre-renal',s:'not enough blood reaching it',k:'artery',d:'The commonest group. The kidney is structurally normal and recovers if perfusion is restored quickly. If not, the tubules die (acute tubular necrosis).',c:[
  {t:'Low volume',s:'bleeding, D&V, burns',k:'artery',d:'Haemorrhage, vomiting and diarrhoea, burns, over-diuresis.'},
  {t:'Low output',s:'heart failure, heart attack',k:'artery',d:'The heart cannot deliver enough blood to the kidney.'},
  {t:'Vasodilation',s:'sepsis',k:'artery',d:'Blood pressure falls because vessels everywhere dilate.'},
  {t:'Drugs',s:'NSAIDs, ACE inhibitors',k:'artery',d:'NSAIDs constrict the afferent arteriole; ACE inhibitors and ARBs dilate the efferent arteriole. Either lowers glomerular pressure when perfusion is already poor.'}]},
 {t:'Intrinsic',s:'damage inside the kidney',k:'vein',d:'Disease of the tubules, glomeruli, interstitium or vessels.',c:[
  {t:'Tubules',s:'acute tubular necrosis',k:'vein',d:'The commonest intrinsic cause. Prolonged poor perfusion, or toxins: gentamicin, contrast dye, myoglobin from crushed muscle. Muddy brown casts. Recovers over days to weeks.'},
  {t:'Glomeruli',s:'glomerulonephritis',k:'vein',d:'Blood and protein on the dipstick, red cell casts, high blood pressure. Needs urgent specialist review.'},
  {t:'Interstitium',s:'drug allergy',k:'vein',d:'Acute interstitial nephritis: an allergic reaction to proton pump inhibitors, penicillins or NSAIDs. Sometimes rash, fever and eosinophils.'},
  {t:'Vessels',s:'vasculitis, HUS',k:'vein',d:'Inflammation or clotting in small renal vessels. Haemolytic uraemic syndrome follows E. coli O157 diarrhoea in children.'}]},
 {t:'Post-renal',s:'urine cannot drain',k:'lymph',d:'Obstruction. It must block both kidneys, a single working kidney, or the bladder outlet. Ultrasound shows hydronephrosis. Relieve it with a catheter, stent or nephrostomy.',c:[
  {t:'In the tube',s:'stones, clot',k:'lymph',d:'Stones in the ureter or urethra; blood clot; a blocked catheter.'},
  {t:'In the wall',s:'tumour, stricture',k:'lymph',d:'Bladder or ureteric tumour; urethral stricture.'},
  {t:'Pressing from outside',s:'prostate, pelvic tumour',k:'lymph',d:'An enlarged prostate is the commonest cause in men; also cervical and bowel cancers.'}]}]}}
},
/* ================================================================== */
pw:{
tgf:{t:'Tubuloglomerular feedback',k:'renal',sec:'renal-filter',mn:'More salt at the macula densa: close the inlet',steps:[
 ['Arterial pressure rises, pushing up glomerular pressure and GFR',''],
 ['More filtrate flows down the tubule, so more sodium chloride reaches the macula densa','The macula densa is a patch of tubule cells at the end of the thick ascending limb, where the tubule touches its own glomerulus.'],
 ['Macula densa cells take up more sodium chloride',''],
 ['They release adenosine onto the afferent arteriole next door',''],
 ['The afferent arteriole constricts',''],
 ['Glomerular pressure and GFR fall back to normal',''],
 ['Renin release from the neighbouring granular cells is held down','']],
 foot:'A fall in GFR does the reverse: the afferent arteriole dilates and renin is released, so angiotensin II constricts the efferent arteriole.'},
urinepath:{t:'From filtrate to toilet',k:'renal',sec:'renal-tubule',mn:'Glomerulus, tubule, duct, calyx, pelvis, ureter, bladder',steps:[
 ['Glomerular capillaries','Blood arrives through the afferent arteriole.'],
 ['Bowman\'s capsule',''],
 ['Proximal convoluted tubule',''],
 ['Thin descending limb of the loop of Henle',''],
 ['Thin, then thick, ascending limb',''],
 ['Distal convoluted tubule',''],
 ['Collecting duct',''],
 ['Renal papilla, into a minor calyx','Fluid is not changed after this point: it is now urine.'],
 ['Major calyx',''],
 ['Renal pelvis',''],
 ['Ureter','Peristalsis carries urine down. Stones lodge at its three narrowest points.'],
 ['Bladder',''],
 ['Urethra','']]},
countercurrent:{t:'Making concentrated urine',k:'renal',sec:'renal-tubule',mn:'Pump salt out, trap it, then let water follow',an:'The loop does not concentrate the urine itself. It builds a salty medulla that the collecting duct then uses.',steps:[
 ['The thick ascending limb pumps sodium chloride into the medulla but keeps water in the tubule',''],
 ['The medulla around it becomes saltier than the fluid in the tubule',''],
 ['Water is drawn out of the neighbouring descending limb, concentrating the fluid inside it',''],
 ['This concentrated fluid flows round the bend into the ascending limb, which pumps out still more salt',''],
 ['Repeated along the loop, the effect multiplies: 300 mOsm/kg in the cortex, up to 1,200 at the papilla','Countercurrent multiplication.'],
 ['Urea recycled from the collecting duct adds to the gradient at the tip',''],
 ['The vasa recta, hairpin capillaries beside the loop, carry away water without washing out the salt','Countercurrent exchange.'],
 ['Dilute fluid, about 100 mOsm/kg, arrives in the collecting duct',''],
 ['With ADH present, water leaves the collecting duct into the salty medulla and the urine becomes concentrated','']]},
adhpath:{t:'Dehydration: how ADH saves water',k:'renal',sec:'renal-water',mn:'Shrink, fire, release, insert, reabsorb',steps:[
 ['Water is lost and plasma osmolality rises',''],
 ['Osmoreceptor cells in the hypothalamus shrink as water leaves them',''],
 ['They signal to the supraoptic and paraventricular nuclei, and to the thirst centre',''],
 ['ADH, made in those nuclei, is released from nerve endings in the posterior pituitary',''],
 ['ADH binds V₂ receptors on the blood side of collecting duct cells','G<sub>s</sub> → cAMP → protein kinase A.'],
 ['Vesicles carrying aquaporin-2 fuse with the membrane on the urine side',''],
 ['Water moves out of the duct into the salty medulla','It leaves the cell through aquaporin-3 and -4.'],
 ['A small volume of concentrated urine is passed, and plasma osmolality falls back',''],
 ['ADH release and thirst switch off','']]},
bicarb:{t:'Reclaiming bicarbonate in the proximal tubule',k:'renal',sec:'renal-acidbase',mn:'Secrete H⁺, split, diffuse, rebuild, return',steps:[
 ['Bicarbonate is freely filtered but cannot cross the luminal membrane by itself',''],
 ['The tubular cell secretes H⁺ into the lumen in exchange for sodium',''],
 ['H⁺ joins a filtered bicarbonate ion to make carbonic acid',''],
 ['Carbonic anhydrase on the brush border splits it into CO₂ and water',''],
 ['CO₂ diffuses into the cell',''],
 ['Carbonic anhydrase inside the cell turns CO₂ and water back into H⁺ and bicarbonate',''],
 ['The bicarbonate leaves into the blood, with sodium',''],
 ['The H⁺ is secreted again to collect another bicarbonate','No acid has been excreted yet: this only recovers what was filtered.']],
 foot:'To excrete the day\'s acid, the collecting duct secretes H⁺ that is carried away by phosphate and ammonium. Each H⁺ lost this way adds a new bicarbonate to the blood.'},
ckdmbd:{t:'Why kidney failure damages bone',k:'renal',sec:'renal-electrolytes',mn:'Phosphate up, vitamin D down, calcium down, PTH up',steps:[
 ['Nephrons are lost and GFR falls',''],
 ['Less phosphate is filtered, so plasma phosphate rises',''],
 ['The failing kidney also activates less vitamin D','It lacks the 1α-hydroxylase that makes calcitriol.'],
 ['Less calcium is absorbed from the gut, and phosphate binds what there is: plasma calcium falls',''],
 ['Low calcium, high phosphate and low calcitriol all stimulate the parathyroid glands',''],
 ['PTH rises: secondary hyperparathyroidism',''],
 ['PTH drives osteoclasts to break down bone',''],
 ['Bone pain and fractures follow, and calcium phosphate is laid down in blood vessels','Renal osteodystrophy. Treated with phosphate binders and activated vitamin D.']]},
micturition:{t:'The micturition reflex',k:'renal',sec:'renal-urology',mn:'Fill, stretch, urge, permit, relax, contract',steps:[
 ['The bladder fills; the detrusor relaxes so pressure stays low','Sympathetic nerves: β₃ relaxes the detrusor and α₁ closes the internal sphincter.'],
 ['At about 300 to 400 mL, stretch receptors in the bladder wall fire',''],
 ['Signals travel in the pelvic nerves to the sacral cord and up to the pons and cortex: you feel the urge',''],
 ['The cortex holds the reflex back until it is convenient','The external sphincter is kept shut voluntarily through the pudendal nerve.'],
 ['When you decide to go, the pontine micturition centre switches from storage to voiding',''],
 ['Sympathetic and pudendal activity stop, and both sphincters relax',''],
 ['Parasympathetic pelvic nerves fire: acetylcholine on M₃ receptors contracts the detrusor',''],
 ['Urine flows, and the flow keeps the contraction going until the bladder is empty','']]}
},
/* ================================================================== */
flips:[
 ['Normal GFR','About 125 mL/min (180 L/day). eGFR 90 or more.'],
 ['Three layers of the filter','Fenestrated endothelium, basement membrane, podocyte slit diaphragm.'],
 ['Net filtration pressure','About 10 mmHg (55 out − 15 capsule − 30 oncotic).'],
 ['NSAIDs and the afferent arteriole','They remove prostaglandins, so it constricts: GFR falls.'],
 ['ACE inhibitors and the efferent arteriole','They remove angiotensin II, so it dilates: glomerular pressure falls.'],
 ['Clearance formula','Urine concentration × urine flow ÷ plasma concentration.'],
 ['Share of sodium reabsorbed in the proximal tubule','65 to 70%.'],
 ['Transporter in the thick ascending limb','NKCC2 (Na⁺–K⁺–2Cl⁻): blocked by loop diuretics.'],
 ['Transporter in the distal convoluted tubule','NCC (Na⁺–Cl⁻): blocked by thiazides.'],
 ['Sodium channel in the collecting duct','ENaC: increased by aldosterone, blocked by amiloride.'],
 ['Where ADH is made and released','Made in the hypothalamus; released from the posterior pituitary.'],
 ['ADH-dependent water channel','Aquaporin-2.'],
 ['Renal threshold for glucose','About 10 to 11 mmol/L.'],
 ['SIADH urine','Inappropriately concentrated, with sodium in it, despite dilute plasma.'],
 ['Correcting sodium too fast','Osmotic demyelination (central pontine myelinolysis).'],
 ['Loop diuretic side effects','Low K⁺, Na⁺, Mg²⁺, Ca²⁺; alkalosis; gout; ototoxicity.'],
 ['Thiazides and calcium','They raise it.'],
 ['Spironolactone side effects','High potassium; gynaecomastia.'],
 ['Anion gap','(Na⁺ + K⁺) − (Cl⁻ + HCO₃⁻). Raised by ketones, urea, lactate, toxins.'],
 ['Vomiting causes...','Hypochloraemic, hypokalaemic metabolic alkalosis.'],
 ['Diarrhoea causes...','Normal anion gap metabolic acidosis.'],
 ['Type 2 respiratory failure','PaO₂ below 8 kPa with PaCO₂ above 6 kPa: hypoventilation.'],
 ['ECG in hypokalaemia','Flat T waves, U waves, long QT.'],
 ['Chvostek\'s and Trousseau\'s signs','Hypocalcaemia.'],
 ['First treatment for hypercalcaemia','IV 0.9% saline.'],
 ['Refeeding syndrome','Low phosphate (with low potassium and magnesium) after feeding the starved.'],
 ['AKI urine output criterion','Below 0.5 mL/kg/hour for 6 hours.'],
 ['Commonest cause of CKD','Diabetes.'],
 ['Commonest UTI organism','E. coli.'],
 ['Stone not seen on plain X-ray','Uric acid.'],
 ['Bladder contraction','Parasympathetic S2 to S4, acetylcholine on M₃.'],
 ['Hyperacute rejection','Pre-formed antibodies; minutes to hours.'],
 ['Tacrolimus','Calcineurin inhibitor: blocks IL-2 production. Nephrotoxic.'],
 ['HLA genes','Chromosome 6.']
],
/* ================================================================== */
qs:[
{sec:'renal-filter',type:'sba',q:'A 70-year-old woman who takes ramipril starts ibuprofen for knee pain and then has three days of gastroenteritis. Her creatinine triples. What have the two drugs done to her glomerular arterioles?',
 o:['Ibuprofen has constricted the afferent arteriole; ramipril has dilated the efferent arteriole','Ibuprofen has dilated the afferent arteriole; ramipril has constricted the efferent arteriole','Both drugs have constricted the afferent arteriole','Both drugs have dilated the efferent arteriole','Ibuprofen has constricted the efferent arteriole; ramipril has constricted the afferent arteriole'],a:0,
 e:'When the kidney is poorly perfused, prostaglandins hold the afferent arteriole open and angiotensin II squeezes the efferent arteriole to keep glomerular pressure up. NSAIDs remove the first defence and ACE inhibitors the second. With dehydration as well, filtration collapses: a pre-renal AKI.'},
{sec:'renal-filter',type:'saq',q:'Glomerular capillary pressure is 55 mmHg, pressure in Bowman\'s capsule is 15 mmHg and plasma oncotic pressure is 30 mmHg. What is the net filtration pressure in mmHg?',acc:['10'],m:'10 mmHg (55 − 15 − 30)',
 e:'Net filtration pressure = the pressure pushing fluid out, minus the two pressures opposing it. GFR is this pressure multiplied by the filtration coefficient.'},
{sec:'renal-filter',type:'sba',q:'Which cells detect the amount of sodium chloride in the tubular fluid and signal to the afferent arteriole?',
 o:['Macula densa cells','Granular (juxtaglomerular) cells','Podocytes','Mesangial cells','Principal cells'],a:0,
 e:'The macula densa is a plaque of tubular cells at the end of the thick ascending limb. More sodium chloride makes it release adenosine, constricting the afferent arteriole; less makes the granular cells release renin. Granular cells make the renin but do not sense the tubular fluid.'},
{sec:'renal-filter',type:'sba',q:'A 4-year-old boy has puffy eyelids and swollen legs. His urine is frothy with 4+ protein on dipstick and no blood. Serum albumin is 18 g/L. Which part of the filtration barrier is damaged?',
 o:['Podocyte foot processes','The macula densa','The brush border of the proximal tubule','The afferent arteriole','The capillary endothelial cell nuclei'],a:0,
 e:'This is nephrotic syndrome; in children it is usually minimal change disease, in which podocyte foot processes are flattened (seen only on electron microscopy). Protein leaks through, albumin falls and oedema follows. It usually responds to steroids.'},
{sec:'renal-filter',type:'saq',q:'Urine creatinine is 10 mmol/L, plasma creatinine is 0.1 mmol/L and urine flow is 1.2 mL/min. What is the creatinine clearance in mL/min?',acc:['120'],m:'120 mL/min (10 × 1.2 ÷ 0.1)',
 e:'Clearance = urine concentration × urine flow ÷ plasma concentration = 10 × 1.2 ÷ 0.1 = 120 mL/min. Because creatinine is filtered and not reabsorbed, this approximates the GFR.'},
{sec:'renal-tubule',type:'sba',q:'Which segment of the nephron is impermeable to water and reabsorbs sodium through the NKCC2 transporter?',
 o:['Thick ascending limb of the loop of Henle','Proximal convoluted tubule','Thin descending limb of the loop of Henle','Distal convoluted tubule','Collecting duct'],a:0,
 e:'The thick ascending limb removes salt without water, which dilutes the tubular fluid and makes the medulla salty. NKCC2 is the target of loop diuretics. The distal convoluted tubule is also impermeable to water but uses the Na⁺–Cl⁻ cotransporter.'},
{sec:'renal-tubule',type:'sba',q:'A man with type 2 diabetes takes dapagliflozin. His urine dipstick shows 3+ glucose, but his blood glucose is 6.5 mmol/L. What is the explanation?',
 o:['The drug blocks SGLT2 in the proximal tubule, so filtered glucose is not reabsorbed','His diabetes is poorly controlled','The drug has damaged the glomerular filter','The drug blocks GLUT2 in the collecting duct','He has a urinary tract infection'],a:0,
 e:'SGLT2 normally reabsorbs about 90% of filtered glucose. Blocking it causes glucose to be lost in the urine at normal blood levels: that is how the drug works. The sugary urine explains the side effects of thrush and urinary infection.'},
{sec:'renal-tubule',type:'saq',q:'Roughly what percentage of filtered sodium is reabsorbed in the proximal convoluted tubule?',acc:['65|66|67|68|69|70|two third'],m:'About 65 to 70% (two thirds)',
 e:'The proximal tubule does the bulk work: about two thirds of sodium and water, nearly all glucose and amino acids and most bicarbonate. The loop takes 25%, the distal tubule 5% and the collecting duct the last few per cent.'},
{sec:'renal-tubule',type:'sba',q:'On which cells does aldosterone act, and what does it do?',
 o:['Principal cells of the collecting duct: more ENaC channels and Na⁺/K⁺-ATPase, so sodium is kept and potassium lost','Intercalated cells of the collecting duct: fewer proton pumps, so acid is kept','Cells of the thick ascending limb: more NKCC2, so sodium is kept and calcium lost','Proximal tubule cells: more SGLT2, so glucose is kept','Podocytes: narrower filtration slits, so less sodium is filtered'],a:0,
 e:'Aldosterone binds a receptor inside principal cells and increases ENaC on the urine side and the sodium pump on the blood side. Sodium is reabsorbed, and potassium is secreted in exchange. Too much aldosterone causes hypertension with a low potassium.'},
{sec:'renal-tubule',type:'sba',q:'A patient on high-dose furosemide cannot produce concentrated urine, even when dehydrated. Why?',
 o:['Blocking NKCC2 stops salt being pumped into the medulla, so there is no gradient to draw water out of the collecting duct','Furosemide blocks V₂ receptors in the collecting duct','Furosemide blocks aquaporin-2 channels directly','Furosemide stops the posterior pituitary releasing ADH','Furosemide makes the descending limb impermeable to water'],a:0,
 e:'Concentrating urine needs two things: a salty medulla, built by the thick ascending limb, and ADH to open the collecting duct to water. A loop diuretic removes the first, so ADH has nothing to work with.'},
{sec:'renal-water',type:'sba',q:'A 68-year-old smoker with small cell lung cancer is confused. Sodium is 118 mmol/L, plasma osmolality 250 mOsm/kg, urine osmolality 480 mOsm/kg and urine sodium 50 mmol/L. He is not dehydrated and has no oedema. What is the diagnosis?',
 o:['Syndrome of inappropriate ADH secretion','Diabetes insipidus','Addison\'s disease','Drinking too much water','Dehydration'],a:0,
 e:'Dilute plasma should switch ADH off and produce very dilute urine. Here the urine is concentrated and contains sodium: ADH is being released inappropriately, in this case by the tumour. Treatment is fluid restriction and treating the cause.'},
{sec:'renal-water',type:'sba',q:'A woman with a sodium of 112 mmol/L is given hypertonic saline and her sodium reaches 138 mmol/L within 20 hours. Four days later she cannot move her limbs and her speech is slurred. What has happened?',
 o:['Osmotic demyelination (central pontine myelinolysis)','Cerebral oedema','Subarachnoid haemorrhage','Wernicke\'s encephalopathy','A brainstem stroke from hypertension'],a:0,
 e:'In chronic hyponatraemia brain cells adapt by losing solutes. If sodium is then raised quickly, water is pulled out of them and myelin in the pons is damaged. Sodium should rise by no more than about 10 mmol/L in 24 hours.'},
{sec:'renal-water',type:'sba',q:'A man taking lithium for bipolar disorder passes 6 litres of dilute urine a day. After a dose of desmopressin his urine remains dilute. What is the diagnosis?',
 o:['Nephrogenic diabetes insipidus','Cranial diabetes insipidus','Syndrome of inappropriate ADH secretion','Primary polydipsia','Diabetes mellitus'],a:0,
 e:'Lithium makes the collecting duct unresponsive to ADH. Because the fault is in the kidney, giving more ADH (desmopressin) does not help. In cranial diabetes insipidus the urine would concentrate after desmopressin.'},
{sec:'renal-water',type:'saq',q:'Which water channel is inserted into the luminal membrane of the collecting duct in response to ADH?',acc:['aquaporin2|aquaporin 2|aqp2|aqp 2'],m:'Aquaporin-2',
 e:'ADH binds V₂ receptors, raising cAMP, and vesicles carrying aquaporin-2 fuse with the luminal membrane. Aquaporin-3 and -4 on the blood side are always present.'},
{sec:'renal-water',type:'sba',q:'Where is ADH synthesised?',
 o:['Supraoptic and paraventricular nuclei of the hypothalamus','Posterior pituitary','Anterior pituitary','Juxtaglomerular cells of the kidney','Zona glomerulosa of the adrenal cortex'],a:0,
 e:'ADH is made in hypothalamic nerve cell bodies, carried down their axons and stored in the posterior pituitary, which only releases it. Damage to the pituitary stalk can therefore cause cranial diabetes insipidus.'},
{sec:'renal-diuretics',type:'sba',q:'A man taking furosemide for heart failure has a potassium of 2.9 mmol/L and a bicarbonate of 33 mmol/L. How does furosemide cause the low potassium?',
 o:['More sodium reaches the collecting duct, where it is reabsorbed in exchange for potassium','It blocks potassium reabsorption in the proximal tubule','It opens potassium channels in the glomerulus','Acidosis moves potassium into cells','It suppresses aldosterone release'],a:0,
 e:'Loop diuretics send a large sodium load to the collecting duct, and volume loss raises aldosterone. Principal cells reabsorb the extra sodium and secrete potassium; intercalated cells secrete H⁺. Result: a hypokalaemic metabolic alkalosis.'},
{sec:'renal-diuretics',type:'sba',q:'Which diuretic raises plasma calcium, and can reduce the formation of calcium kidney stones?',
 o:['Bendroflumethiazide','Furosemide','Spironolactone','Acetazolamide','Mannitol'],a:0,
 e:'Thiazides increase calcium reabsorption in the distal tubule, so less calcium reaches the urine and blood calcium rises a little. Loop diuretics do the opposite. Acetazolamide makes the urine alkaline and can cause stones.'},
{sec:'renal-diuretics',type:'sba',q:'A man with cirrhosis takes spironolactone for ascites and develops tender swelling of both breasts. Why?',
 o:['Spironolactone also blocks androgen receptors','Spironolactone raises prolactin','Spironolactone blocks 5α-reductase','Spironolactone makes the adrenal release oestrogen','Spironolactone lowers sex hormone-binding globulin'],a:0,
 e:'Spironolactone is not selective for the aldosterone receptor: it also blocks androgen receptors, tipping the balance towards oestrogen. Eplerenone is more selective and does not cause gynaecomastia.'},
{sec:'renal-diuretics',type:'saq',q:'Which transporter do loop diuretics block?',acc:['nkcc|na k 2cl|na k cl|sodium potassium chloride|sodium potassium 2 chloride'],m:'The Na⁺–K⁺–2Cl⁻ cotransporter (NKCC2)',
 e:'NKCC2 on the luminal membrane of the thick ascending limb reabsorbs a quarter of filtered sodium. Blocking it also removes the voltage that drives calcium and magnesium reabsorption.'},
{sec:'renal-diuretics',type:'sba',q:'What effect does acetazolamide have on acid–base balance?',
 o:['Metabolic acidosis, because bicarbonate is lost in the urine','Metabolic alkalosis, because hydrogen ions are lost in the urine','Respiratory acidosis, because breathing is depressed','Metabolic alkalosis, because potassium is retained','No change in acid–base balance'],a:0,
 e:'Without carbonic anhydrase the proximal tubule cannot reclaim filtered bicarbonate, so it is lost in the urine (which becomes alkaline) and the blood becomes mildly acidic. This is put to use in preventing altitude sickness.'},
{sec:'renal-acidbase',type:'sba',q:'A 19-year-old is drowsy and breathing deeply. Blood gas on air: pH 7.12, PaCO₂ 2.8 kPa, bicarbonate 8 mmol/L. Glucose is 28 mmol/L. What does the gas show?',
 o:['Metabolic acidosis with respiratory compensation','Respiratory acidosis with metabolic compensation','Respiratory alkalosis','Mixed respiratory and metabolic acidosis','Metabolic alkalosis with respiratory compensation'],a:0,
 e:'Low pH with a low bicarbonate is a metabolic acidosis. The low PaCO₂ shows the lungs are compensating (Kussmaul breathing). With a high glucose this is diabetic ketoacidosis, a raised anion gap acidosis.'},
{sec:'renal-acidbase',type:'sba',q:'A man with severe COPD, when well, has: pH 7.36, PaCO₂ 8.2 kPa, PaO₂ 7.4 kPa, bicarbonate 36 mmol/L. How should this be described?',
 o:['Compensated respiratory acidosis with type 2 respiratory failure','Metabolic alkalosis with respiratory compensation and normal oxygenation','Acute respiratory acidosis with type 1 respiratory failure','Mixed respiratory and metabolic alkalosis','A normal blood gas'],a:0,
 e:'PaO₂ below 8 with PaCO₂ above 6 is type 2 respiratory failure. The CO₂ is high but the pH is nearly normal because the kidneys have retained bicarbonate over days: chronic, compensated respiratory acidosis. pH on the acid side of normal shows which process came first.'},
{sec:'renal-acidbase',type:'saq',q:'Sodium 140, potassium 4, chloride 100 and bicarbonate 12 mmol/L. Calculate the anion gap, including potassium, in mmol/L.',acc:['32'],m:'32 mmol/L (140 + 4 − 100 − 12)',
 e:'(140 + 4) − (100 + 12) = 32. The normal range is about 10 to 18, so an unmeasured acid has been added: ketones, lactate, urea or a toxin.'},
{sec:'renal-acidbase',type:'sba',q:'A 5-week-old baby with pyloric stenosis has had projectile vomiting for a week. Which disturbance is expected?',
 o:['Hypochloraemic, hypokalaemic metabolic alkalosis','Normal anion gap metabolic acidosis','Raised anion gap metabolic acidosis','Respiratory alkalosis','Respiratory acidosis'],a:0,
 e:'Vomiting loses hydrochloric acid, so bicarbonate rises and chloride falls. Dehydration raises aldosterone, which keeps sodium at the expense of potassium and H⁺, making both the low potassium and the alkalosis worse.'},
{sec:'renal-acidbase',type:'sba',q:'After a week of severe diarrhoea a man has pH 7.28, bicarbonate 14 mmol/L and an anion gap of 12 mmol/L. What is the cause of his acidosis?',
 o:['Loss of bicarbonate in the stool','Build-up of lactic acid','Build-up of ketoacids','Failure of the kidneys to excrete acid','Loss of hydrogen ions in the stool'],a:0,
 e:'Fluid from the lower gut is rich in bicarbonate. Losing it causes a metabolic acidosis in which chloride rises to fill the space, so the anion gap stays normal. Lactate, ketones and kidney failure all raise the gap.'},
{sec:'renal-acidbase',type:'saq',q:'Which enzyme, on the brush border and inside proximal tubule cells, is essential for reclaiming filtered bicarbonate?',acc:['carbonic anhydrase'],m:'Carbonic anhydrase',
 e:'Carbonic anhydrase splits carbonic acid into CO₂ and water in the lumen, and reverses the reaction inside the cell. Acetazolamide inhibits it, so bicarbonate is lost in the urine.'},
{sec:'renal-electrolytes',type:'sba',q:'Six hours after removal of her thyroid a woman has tingling round her mouth, and her hand goes into spasm when her blood pressure is taken. What is the cause?',
 o:['Hypocalcaemia from loss of parathyroid hormone','Hypercalcaemia from calcium released by the thyroid','Hypokalaemia from the stress response','Hyponatraemia from ADH release','Hypermagnesaemia from kidney injury'],a:0,
 e:'The parathyroid glands lie behind the thyroid and can be removed or bruised in surgery. PTH falls, calcium falls, and nerves become over-excitable: tingling, Trousseau\'s sign (spasm with the cuff) and Chvostek\'s sign. Severe cases need IV calcium gluconate.'},
{sec:'renal-electrolytes',type:'sba',q:'A 62-year-old woman is tired, constipated and has had a kidney stone. Calcium is 2.95 mmol/L and PTH is raised. What is the most likely diagnosis?',
 o:['Primary hyperparathyroidism','Bone metastases','Sarcoidosis','Vitamin D deficiency','Secondary hyperparathyroidism from kidney disease'],a:0,
 e:'A high calcium should switch PTH off. A PTH that is raised (or even normal) with a high calcium means the parathyroid is the cause, usually a single adenoma. In cancer and sarcoidosis PTH is suppressed. Secondary hyperparathyroidism has a low or normal calcium.'},
{sec:'renal-electrolytes',type:'sba',q:'A severely malnourished man is started on full nutrition. On day three he is confused and weak, and develops heart failure. Which blood result is most characteristic?',
 o:['Low phosphate','High sodium','High potassium','High calcium','High magnesium'],a:0,
 e:'Refeeding syndrome: carbohydrate triggers insulin, which drives phosphate, potassium and magnesium into cells. Phosphate falls furthest; without it cells cannot make ATP. Prevent it by starting feeds slowly, giving thiamine and replacing electrolytes.'},
{sec:'renal-electrolytes',type:'sba',q:'A woman on furosemide and omeprazole has a potassium of 2.8 mmol/L that stays low despite potassium supplements. Which other electrolyte should be checked and corrected?',
 o:['Magnesium','Sodium','Calcium','Phosphate','Chloride'],a:0,
 e:'Low magnesium (here from the diuretic and the proton pump inhibitor) makes the kidney leak potassium. The potassium will not correct until magnesium is replaced. Low magnesium also causes a resistant low calcium.'},
{sec:'renal-electrolytes',type:'saq',q:'Insulin lowers plasma potassium by stimulating which membrane pump?',acc:['na k atpase|nak atpase|sodium potassium|sodium pump|na k pump'],m:'The Na⁺/K⁺-ATPase (the sodium–potassium pump)',
 e:'Insulin increases the activity of the Na⁺/K⁺-ATPase, moving potassium into cells. This is used to treat hyperkalaemia (with glucose to prevent hypoglycaemia) and explains why potassium falls during treatment of diabetic ketoacidosis.'},
{sec:'renal-electrolytes',type:'sba',q:'Why does parathyroid hormone rise in chronic kidney disease?',
 o:['Phosphate is retained and less vitamin D is activated, so calcium falls','The damaged kidney cannot break PTH down, and nothing else is involved','The failing kidney retains calcium','Excess erythropoietin stimulates the parathyroid glands','Metabolic alkalosis lowers ionised calcium'],a:0,
 e:'A failing kidney excretes less phosphate and makes less calcitriol. Calcium falls, and low calcium, high phosphate and low calcitriol all stimulate the parathyroids: secondary hyperparathyroidism, which strips calcium from bone.'},
{sec:'renal-failure',type:'sba',q:'An 82-year-old man has had diarrhoea and vomiting for three days. He takes ramipril and ibuprofen. Blood pressure is 92/56 mmHg, creatinine is 280 µmol/L (90 a month ago) and urea is 28 mmol/L. The urine dipstick is normal. What type of acute kidney injury is this?',
 o:['Pre-renal','Intrinsic: glomerulonephritis','Intrinsic: acute interstitial nephritis','Post-renal','Not acute: this is chronic kidney disease'],a:0,
 e:'Volume loss, low blood pressure and two drugs that interfere with autoregulation point to under-perfusion. Urea has risen more than creatinine, and the bland dipstick argues against glomerular disease. Give fluids and stop both drugs; if perfusion is not restored, acute tubular necrosis follows.'},
{sec:'renal-failure',type:'sba',q:'A 76-year-old man with a long history of poor urinary stream has a creatinine of 420 µmol/L. His bladder can be felt up to the umbilicus. What is the best first step?',
 o:['Insert a urinary catheter','Give intravenous furosemide','Arrange a kidney biopsy','Start haemodialysis','Give two litres of intravenous fluid quickly'],a:0,
 e:'A palpable bladder with poor stream is chronic urinary retention from prostatic obstruction, causing post-renal kidney injury. Draining the bladder relieves the back-pressure. Watch for a large diuresis afterwards.'},
{sec:'renal-failure',type:'sba',q:'A woman with type 2 diabetes has an eGFR of 72 and a urine albumin:creatinine ratio of 12 mg/mmol on two tests four months apart. Which drug protects her kidneys by lowering pressure inside the glomerulus?',
 o:['An ACE inhibitor','A thiazide diuretic','A β-blocker','A dihydropyridine calcium channel blocker','An NSAID'],a:0,
 e:'She has chronic kidney disease (stage G2 A2): persistent albuminuria is kidney damage even with an eGFR above 60. ACE inhibitors and ARBs dilate the efferent arteriole, lowering glomerular pressure and protein leak. SGLT2 inhibitors also protect the kidney.'},
{sec:'renal-failure',type:'sba',q:'A man trapped under rubble for 10 hours has dark brown urine. The dipstick is strongly positive for blood, but no red cells are seen under the microscope. Creatine kinase is 45,000 U/L. What is the dipstick detecting?',
 o:['Myoglobin released from damaged muscle','Red blood cells from glomerulonephritis','Conjugated bilirubin','Red blood cells from a bladder injury','Urobilinogen'],a:0,
 e:'The blood square reacts to haem, whether in red cells, free haemoglobin or myoglobin. Crushed muscle releases myoglobin (rhabdomyolysis), which is toxic to the tubules and causes acute tubular necrosis, along with dangerous hyperkalaemia. Treatment is large volumes of IV fluid.'},
{sec:'renal-failure',type:'saq',q:'What is the minimum acceptable urine output for an adult, in mL per kg per hour?',acc:['0.5|half'],m:'0.5 mL/kg/hour',
 e:'Less than 0.5 mL/kg/hour for six hours meets the definition of acute kidney injury. For a 70 kg adult that is 35 mL an hour.'},
{sec:'renal-failure',type:'sba',q:'Why do patients with chronic kidney disease become anaemic?',
 o:['The kidneys make less erythropoietin','Iron is lost in the urine','Vitamin B12 is not activated by the kidney','Red cells are filtered out by damaged glomeruli','The spleen destroys red cells faster'],a:0,
 e:'Erythropoietin is made by cells in the kidney\'s interstitium in response to low oxygen. As kidney tissue is lost, less is made and the marrow produces fewer red cells: a normocytic anaemia, treated with iron and erythropoietin injections.'},
{sec:'renal-urology',type:'sba',q:'A 26-year-old woman who is not pregnant has two days of burning on passing urine and frequency. The dipstick is positive for nitrites and leucocytes. What is the most appropriate treatment?',
 o:['Nitrofurantoin for 3 days','Amoxicillin for 7 days','Ciprofloxacin for 7 days','Trimethoprim for 14 days','A single dose of gentamicin'],a:0,
 e:'An uncomplicated lower urinary tract infection in a non-pregnant woman is treated with three days of nitrofurantoin or trimethoprim. Men and pregnant women need seven days. Ciprofloxacin is kept for pyelonephritis.'},
{sec:'renal-urology',type:'sba',q:'Why is trimethoprim avoided in the first trimester of pregnancy?',
 o:['It blocks folate metabolism and may cause neural tube defects','It causes haemolysis in the newborn','It closes the ductus arteriosus early','It stains the baby\'s teeth','It damages growing cartilage'],a:0,
 e:'Trimethoprim inhibits dihydrofolate reductase. Folate is needed for neural tube closure in early pregnancy. Nitrofurantoin is avoided near delivery (haemolysis in the newborn); tetracyclines stain teeth; quinolones affect cartilage.'},
{sec:'renal-urology',type:'sba',q:'A 45-year-old man has sudden severe pain running from his left loin to his groin. He cannot keep still. The dipstick shows blood. Which is the best imaging test?',
 o:['Non-contrast CT of the kidneys, ureters and bladder','Plain abdominal X-ray','MRI of the pelvis','Intravenous urogram','Cystoscopy'],a:0,
 e:'Non-contrast CT detects almost all stones, including uric acid stones that are invisible on plain X-ray, and shows any obstruction. It should be done within 24 hours. Ultrasound is used in pregnancy and in children.'},
{sec:'renal-urology',type:'sba',q:'A woman with repeated <i>Proteus</i> urinary infections has a large branching stone filling her renal pelvis. What is it most likely to be made of?',
 o:['Struvite (magnesium ammonium phosphate)','Calcium oxalate','Uric acid','Cystine','Xanthine'],a:0,
 e:'Proteus makes urease, which splits urea into ammonia. The urine becomes alkaline and magnesium ammonium phosphate precipitates, forming staghorn stones that in turn shelter the bacteria.'},
{sec:'renal-urology',type:'sba',q:'A 58-year-old woman leaks small amounts of urine when she coughs or sneezes. Examination and urinalysis are normal. What is the first-line treatment?',
 o:['Supervised pelvic floor muscle training','Oxybutynin','Mirabegron','Bladder training','A long-term catheter'],a:0,
 e:'Leaking with raised abdominal pressure is stress incontinence, from a weak pelvic floor and sphincter. At least three months of supervised pelvic floor exercises come first. Antimuscarinics, mirabegron and bladder training are for urge incontinence.'},
{sec:'renal-urology',type:'saq',q:'Which spinal cord segments supply the parasympathetic nerves that make the bladder contract?',acc:['s2'],m:'S2 to S4',
 e:'The pelvic splanchnic nerves (S2 to S4) carry parasympathetic fibres to the detrusor; the pudendal nerve to the external sphincter comes from the same segments. This is why cauda equina compression causes retention and incontinence.'},
{sec:'renal-urology',type:'sba',q:'A 38-year-old man has high blood pressure and masses in both flanks. His father died of a brain haemorrhage at 45 while on dialysis. What is the most likely diagnosis?',
 o:['Autosomal dominant polycystic kidney disease','Autosomal recessive polycystic kidney disease','Horseshoe kidney','Renal cell carcinoma in both kidneys','Hydronephrosis from stones in both ureters'],a:0,
 e:'Adult polycystic kidney disease is autosomal dominant, so an affected parent is usual. Cysts enlarge both kidneys and cause hypertension and kidney failure in middle age. Berry aneurysms are associated and can rupture, causing subarachnoid haemorrhage.'},
{sec:'renal-transplant',type:'sba',q:'Minutes after the clamps are released on a newly transplanted kidney it becomes swollen, blue and stops producing urine. What is the mechanism?',
 o:['Antibodies already present in the recipient bind the graft and activate complement','Recipient cytotoxic T cells recognise donor HLA','Slow thickening of the graft\'s arteries','Donor T cells attack the recipient','The original kidney disease has recurred'],a:0,
 e:'Hyperacute rejection is caused by pre-formed antibodies against donor ABO or HLA antigens. They bind the graft endothelium at once, activating complement and clotting. It is prevented by blood group matching and the crossmatch test, and is now rare.'},
{sec:'renal-transplant',type:'sba',q:'How does tacrolimus prevent rejection?',
 o:['It inhibits calcineurin, so T cells cannot make IL-2','It is an antibody that blocks the IL-2 receptor','It blocks purine synthesis in dividing lymphocytes','It destroys B cells by binding CD20','It inhibits mTOR'],a:0,
 e:'Calcineurin is the enzyme that activates the transcription factor for the IL-2 gene. Without IL-2, activated T cells do not multiply. Basiliximab blocks the IL-2 receptor; mycophenolate and azathioprine block purine synthesis; sirolimus inhibits mTOR. Tacrolimus is itself toxic to the kidney.'},
{sec:'renal-transplant',type:'saq',q:'On which chromosome are the HLA genes found?',acc:['6|six'],m:'Chromosome 6',
 e:'The major histocompatibility complex sits on the short arm of chromosome 6 and is inherited as a block from each parent, so siblings have a 1 in 4 chance of being HLA-identical.'},
{sec:'renal-transplant',type:'sba',q:'Six weeks after a kidney transplant a woman feels well, but her creatinine has risen from 110 to 190 µmol/L. A biopsy shows lymphocytes invading the tubules. What is the usual treatment?',
 o:['High-dose intravenous methylprednisolone','Immediate removal of the graft','Stopping all immunosuppression','A course of antibiotics','Dialysis and waiting'],a:0,
 e:'This is acute T cell-mediated rejection, commonest in the first months and often silent apart from a rising creatinine. It usually responds to a short course of high-dose steroids, followed by adjustment of maintenance immunosuppression.'}
]};
})();
