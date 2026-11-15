/* Cells, genes and drugs: the foundations that every system chapter leans on. Data-driven chapter: see app.js for the block types. */
window.CHAPTERS=window.CHAPTERS||{};
(function(){
/* curves for the pharmacology figures are computed, not hand-drawn */
const X0=70,X1=600,YB=260;
const path=(f,a,b,step,sx,sy)=>{let d='';for(let t=a;t<=b+1e-9;t+=step)d+=(d?'L':'M')+sx(t).toFixed(1)+','+sy(f(t)).toFixed(1);return d;};
/* pharmacokinetics: time 0 to 24 h, concentration 0 to 220 (arbitrary) */
const tx=t=>X0+t*(X1-X0)/24, cy=c=>YB-c;
const K=Math.LN2/4, iv=t=>200*Math.exp(-K*t), oral=t=>165*(Math.exp(-K*t)-Math.exp(-1.0*t));
const rep=t=>{let c=0;for(let i=0;i<=5;i++){const ti=i*4;if(t>=ti)c+=100*Math.exp(-K*(t-ti));}return c;};
const zero=t=>Math.max(0,200-10*t);
const pkAxes=`<path class="ax" d="M${X0},30 V${YB} H${X1+10}"/><g class="sm" text-anchor="middle">${[0,4,8,12,16,20,24].map(h=>`<text x="${tx(h).toFixed(0)}" y="276">${h}</text>`).join('')}<text x="335" y="294">time (hours)</text></g><text x="24" y="150" class="sm" text-anchor="middle" transform="rotate(-90 24 150)">plasma concentration</text>`;
const dash=d=>`<path d="${d}" fill="none" stroke="var(--muted)" stroke-width="1.6" stroke-dasharray="5 4"/>`;
const pkSVG=`<svg viewBox="0 0 640 300" role="img" aria-label="Plasma concentration against time for different ways of giving a drug">${pkAxes}
 <g data-v="iv"><path class="c2" d="${path(iv,0,24,0.25,tx,cy)}"/>${dash(`M${X0},${cy(100)} H${tx(4).toFixed(1)} V${YB} M${X0},${cy(50)} H${tx(8).toFixed(1)} V${YB}`)}<text x="${tx(4)+8}" y="${cy(100)-6}" class="sm b">half after 4 hours</text><text x="${tx(8)+8}" y="${cy(50)-6}" class="sm b">a quarter after 8</text></g>
 <g data-v="oral">${dash(path(iv,0,24,0.25,tx,cy))}<path class="c3" d="${path(oral,0,24,0.25,tx,cy)}"/><text x="${tx(1.2)}" y="52" class="sm">same dose by vein</text><text x="${tx(5.2)}" y="${cy(96)}" class="sm b">by mouth: slower, lower peak</text></g>
 <g data-v="rep"><path class="c1" d="${path(rep,0,24,0.05,tx,cy)}"/>${dash(`M${X0},${cy(200)} H${X1} M${X0},${cy(100)} H${X1}`)}<text x="${X1}" y="${cy(200)-6}" class="sm b" text-anchor="end">steady state: peaks and troughs level off</text></g>
 <g data-v="zero">${dash(path(iv,0,24,0.25,tx,cy))}<path class="c5" d="${path(zero,0,24,0.5,tx,cy)}"/><text x="${tx(10.5)}" y="${cy(118)}" class="sm b">straight line: the same amount removed every hour</text></g>
</svg>`;
/* pharmacodynamics: log concentration -3..3, response 0..100% */
const lx=x=>X0+(x+3)*(X1-X0)/6, ry=e=>YB-e*2.1, sig=(max,ec)=>x=>max/(1+Math.pow(10,ec-x));
const curve=(max,ec)=>path(sig(max,ec),-3,3,0.05,lx,ry);
const pdAxes=`<path class="ax" d="M${X0},30 V${YB} H${X1+10}"/><g class="sm" text-anchor="end"><text x="62" y="${YB+4}">0</text><text x="62" y="${ry(50)+4}">50</text><text x="62" y="${ry(100)+4}">100</text></g><path class="grid" d="M${X0},${ry(100)} H${X1} M${X0},${ry(50)} H${X1}"/><text x="335" y="290" class="sm" text-anchor="middle">concentration of drug (log scale) →</text><text x="24" y="150" class="sm" text-anchor="middle" transform="rotate(-90 24 150)">response (% of maximum)</text>`;
const pdSVG=`<svg viewBox="0 0 640 300" role="img" aria-label="Dose-response curves">${pdAxes}
 <g data-v="full"><path class="c2" d="${curve(100,0)}"/>${dash(`M${lx(0).toFixed(1)},${ry(50)} V${YB}`)}<text x="${lx(0)}" y="276" class="sm b" text-anchor="middle">EC₅₀</text><text x="${lx(1.3)}" y="${ry(100)-8}" class="sm b">maximum effect (efficacy)</text></g>
 <g data-v="partial">${dash(curve(100,0))}<path class="c3" d="${curve(55,0)}"/><text x="${lx(1.1)}" y="${ry(55)-8}" class="sm b">partial agonist: lower ceiling</text></g>
 <g data-v="comp">${dash(curve(100,0))}<path class="c1" d="${curve(100,1.4)}"/><text x="${lx(-2.9)}" y="${ry(100)-8}" class="sm b">shifted right, same maximum</text></g>
 <g data-v="noncomp">${dash(curve(100,0))}<path class="c5" d="${curve(50,0)}"/><text x="${lx(1.1)}" y="${ry(50)-8}" class="sm b">maximum reduced</text></g>
 <g data-v="potency"><path class="c2" d="${curve(100,-1)}"/><path class="c4" d="${curve(100,1)}"/><text x="${lx(-1.9)}" y="${ry(62)}" class="sm b" text-anchor="end">drug A</text><text x="${lx(1.5)}" y="${ry(52)}" class="sm b">drug B</text></g>
</svg>`;
const abox=(k,x,w,a,b,y1,y2)=>`<g data-k="${k}"><rect x="${x}" y="90" width="${w}" height="60" rx="10" class="n-org"/><text x="${x+w/2}" y="115" class="lab b" text-anchor="middle">${a}</text><text x="${x+w/2}" y="134" class="sm" text-anchor="middle">${b}</text><text x="${x+w/2}" y="172" class="sm b" text-anchor="middle">${y1}</text>${y2?`<text x="${x+w/2}" y="188" class="sm b" text-anchor="middle">${y2}</text>`:''}</g>`;

CHAPTERS.found={
short:'Cells, genes & drugs',eyebrow:'Foundations',h1:'Cells, genes and drugs',
blurb:'How cells signal, how they make energy, how genes become proteins and are inherited, and how drugs move through the body and act on it.',
lede:'These are the ideas every system chapter leans on. A receptor in the heart, the kidney and the airway works the same way; so does a mitochondrion; so does the arithmetic of a drug\'s half-life. Learn them once here and the rest of the site gets easier.',
secs:[
/* ------------------------------------------------------------------ */
{id:'found-signal',eb:'Cell biology',h:'How cells talk: receptors and second messengers',p:'A signal (a hormone, a transmitter, a drug) binds a receptor, and the receptor changes what the cell is doing. There are only four kinds of receptor. What differs is where they sit and how fast they act.',b:[
 ['explore','dg-receptors','The four families of receptor','From fastest to slowest. Tap one.',640,
  `<svg viewBox="0 0 720 310" role="img" aria-label="Four families of receptor">
   <rect x="20" y="110" width="680" height="20" rx="4" style="fill:var(--line);stroke:none"/>
   <text x="24" y="30" class="hd">OUTSIDE THE CELL</text><text x="24" y="154" class="hd">INSIDE</text>
   <g data-k="ion"><rect x="60" y="40" width="110" height="200" class="hit"/><text x="114" y="60" class="lab b" text-anchor="middle">ion channel</text><circle cx="114" cy="84" r="7" class="n-drug"/><rect x="98" y="96" width="12" height="48" rx="5" class="n-nerve"/><rect x="118" y="96" width="12" height="48" rx="5" class="n-nerve"/><path d="M114,150 V186" class="a-stim"/><text x="114" y="204" class="sm" text-anchor="middle">Na⁺, Ca²⁺ or Cl⁻</text><text x="114" y="228" class="sm b" text-anchor="middle">milliseconds</text></g>
   <g data-k="gpcr"><rect x="210" y="40" width="130" height="200" class="hit"/><text x="275" y="60" class="lab b" text-anchor="middle">G protein-coupled</text><circle cx="264" cy="84" r="7" class="n-drug"/><rect x="246" y="96" width="36" height="48" rx="8" class="n-org"/><circle cx="300" cy="156" r="13" class="n-drug"/><text x="300" y="160" class="sm b" text-anchor="middle">G</text><text x="275" y="204" class="sm" text-anchor="middle">cAMP, IP₃, Ca²⁺</text><text x="275" y="228" class="sm b" text-anchor="middle">seconds</text></g>
   <g data-k="rtk"><rect x="370" y="40" width="130" height="200" class="hit"/><text x="435" y="60" class="lab b" text-anchor="middle">enzyme-linked</text><circle cx="435" cy="82" r="7" class="n-drug"/><rect x="422" y="92" width="9" height="58" rx="4" class="n-imm"/><rect x="439" y="92" width="9" height="58" rx="4" class="n-imm"/><circle cx="418" cy="164" r="8" class="n-blood"/><text x="418" y="168" class="sm b" text-anchor="middle">P</text><circle cx="452" cy="164" r="8" class="n-blood"/><text x="452" y="168" class="sm b" text-anchor="middle">P</text><text x="435" y="204" class="sm" text-anchor="middle">kinase cascade</text><text x="435" y="228" class="sm b" text-anchor="middle">minutes</text></g>
   <g data-k="nuc"><rect x="520" y="40" width="180" height="262" class="hit"/><text x="610" y="60" class="lab b" text-anchor="middle">nuclear receptor</text><circle cx="610" cy="82" r="7" class="n-drug"/><path d="M610,92 V212" class="a-stim"/><ellipse cx="610" cy="250" rx="84" ry="40" class="n-box"/><rect x="594" y="218" width="32" height="20" rx="5" class="n-blood"/><text x="610" y="233" class="sm b" text-anchor="middle">R</text><text x="610" y="258" class="sm" text-anchor="middle">gene switched on</text><text x="610" y="276" class="sm b" text-anchor="middle">hours to days</text></g>
  </svg>`,
  {ion:['Ligand-gated ion channels','The receptor <b>is</b> a channel: the signal binds and the pore opens. The fastest signalling there is, used at synapses. <b>Examples:</b> the nicotinic acetylcholine receptor at the neuromuscular junction (sodium in: contraction), the GABA<sub>A</sub> receptor (chloride in: inhibition; benzodiazepines make it open more often), NMDA and AMPA glutamate receptors, 5-HT₃. Not the same as <b>voltage-gated</b> channels, which open in response to membrane potential and are the targets of local anaesthetics and many antiarrhythmics.'],
   gpcr:['G protein-coupled receptors','One protein chain crossing the membrane seven times. Binding makes the attached <b>G protein</b> swap GDP for GTP; its α subunit then switches an enzyme on or off, changing the level of a <b>second messenger</b>. One receptor activates many G proteins, each enzyme makes many messengers: huge <b>amplification</b>. The α subunit turns itself off by breaking GTP down to GDP. The largest receptor family and the target of about a third of all drugs: adrenergic, muscarinic, opioid, histamine, dopamine receptors.'],
   rtk:['Enzyme-linked receptors','The receptor has an enzyme on its inner end, usually a <b>tyrosine kinase</b>. Binding pulls two receptors together; they phosphorylate each other, and the phosphates become docking sites that start a cascade (Ras → MAP kinase, or PI3 kinase). <b>Examples:</b> the insulin receptor, and growth factor receptors (EGF, HER2, VEGF). Cytokine receptors borrow a separate kinase (JAK–STAT). Stuck in the "on" position they drive cancers: hence trastuzumab (HER2) and imatinib.'],
   nuc:['Nuclear (intracellular) receptors','For signals that dissolve in fat and pass straight through the membrane: <b>steroid hormones</b> (cortisol, aldosterone, oestrogen, testosterone), <b>thyroid hormone</b>, vitamin D, retinoic acid. Hormone and receptor bind DNA and switch genes on or off, so new proteins are made. Slow to start and slow to wear off: a dose of prednisolone takes hours to work and its effects outlast its presence in the blood.']}],
 ['table',['G protein','Enzyme and second messenger','Receptors that use it','Typical effect'],[
  ['<b>G<sub>s</sub></b> (stimulatory)','Adenylyl cyclase <span class="up">↑</span>: <b>cAMP rises</b>, activating protein kinase A','β₁, β₂, H₂, V₂, D₁; glucagon, TSH, ACTH, PTH','Heart beats faster and harder (β₁); smooth muscle relaxes (β₂)'],
  ['<b>G<sub>i</sub></b> (inhibitory)','Adenylyl cyclase <span class="down">↓</span>: <b>cAMP falls</b>; potassium channels open','M₂, α₂, D₂, opioid receptors, somatostatin','Heart slows (M₂); transmitter release falls (α₂, opioids)'],
  ['<b>G<sub>q</sub></b>','Phospholipase C: <b>IP₃</b> releases calcium from stores, and <b>DAG</b> activates protein kinase C','α₁, M₁, M₃, H₁, V₁; angiotensin II (AT₁), oxytocin','Smooth muscle contracts (α₁, M₃); glands secrete']]],
 ['pw','gscascade','gqcascade'],
 ['cards',[
  ['Kinases, phosphatases and switching off',['A <b>kinase</b> adds a phosphate to a protein; a <b>phosphatase</b> removes it. Phosphorylation is the cell\'s universal on/off switch.','Signals must end. <b>cAMP</b> is broken down by <b>phosphodiesterase</b> (blocked by caffeine and theophylline; sildenafil blocks the cGMP version).','The G protein hydrolyses its own GTP.','With constant stimulation, receptors are phosphorylated and pulled inside the cell: <b>desensitisation</b>. This is why salbutamol works less well when overused, and nasal decongestants stop working after a few days.']],
  ['Gap junctions',['Channels made of six <b>connexin</b> proteins from each of two touching cells, joining their cytoplasm directly.','Ions and small molecules pass, so electrical signals spread without a synapse.','<b>Heart muscle</b> (intercalated discs) and <b>smooth muscle</b> of the gut and uterus contract as a unit because of them.','<b>Clinical:</b> connexin-32 mutations cause one form of Charcot–Marie–Tooth disease (a peripheral neuropathy); connexin-26 mutations are the commonest cause of inherited deafness; disordered connexins contribute to atrial fibrillation.']]]],
 ['notes',
  ['clin','When signalling is stuck on','<b>Cholera toxin</b> locks G<sub>s</sub> in the "on" state in gut cells: cAMP stays high, chloride channels stay open, and water pours out. <b>Pertussis toxin</b> disables G<sub>i</sub>, with a similar rise in cAMP. In cancer, a mutation can leave <b>Ras</b> or a growth factor receptor permanently active, or the cell may make many extra copies of the receptor gene (HER2 in breast cancer). Mutations in cardiac sodium and potassium channels cause <b>long QT syndrome</b> and sudden arrhythmias.'],
  ['fix','Nervous System deck · cell communication','Two corrections. A G protein does not "convert GDP to GTP": the activated receptor makes it <b>release GDP and bind a fresh GTP</b>; later the α subunit hydrolyses that GTP to switch off. And the line about an "a sub-unit" transferring ADP-ribose onto G<sub>s</sub>α is describing <b>cholera toxin</b>, not normal signalling. Elsewhere the deck speaks of NSAIDs inhibiting "COX receptors": cyclo-oxygenase is an <b>enzyme</b>.']]
]},
/* ------------------------------------------------------------------ */
{id:'found-energy',eb:'Metabolism',h:'Making ATP: from glucose to water',p:'Cells run on ATP and store almost none: a resting adult turns over their own body weight in ATP each day. Nearly all of it comes from passing electrons from food to oxygen inside mitochondria.',b:[
 ['explore','dg-atp','Where the ATP comes from','One glucose molecule, followed through four stages. Tap a stage.',660,
  `<svg viewBox="0 0 760 280" role="img" aria-label="Overview of glucose oxidation">
   <text x="115" y="40" class="b" text-anchor="middle">glucose</text><path d="M115,48 V86" class="a-plain"/>
   <text x="672" y="40" class="b" text-anchor="middle">oxygen</text><path d="M672,48 V86" class="a-plain"/><path d="M700,152 V186" class="a-plain"/><text x="700" y="204" class="sm b" text-anchor="middle">water</text>
   <path d="M182,120 H212 M342,120 H377 M517,120 H552" class="a-plain"/>
   <g class="sm" text-anchor="middle"><text x="196" y="80">pyruvate</text><text x="360" y="80">acetyl-CoA</text><text x="534" y="80">NADH, FADH₂</text></g>
   ${abox('glyc',50,130,'Glycolysis','cytoplasm','2 ATP · 2 NADH')}${abox('link',215,125,'Link reaction','mitochondrial matrix','2 NADH · 2 CO₂')}${abox('krebs',380,135,'Krebs cycle','mitochondrial matrix','2 ATP · 6 NADH','2 FADH₂ · 4 CO₂')}${abox('etc',555,165,'Electron transport','inner membrane','about 28 ATP')}
   <g data-k="lact"><path d="M36,150 V226" class="a-plain" style="stroke-dasharray:5 4"/><path d="M50,136 H36 V150" fill="none" stroke="var(--ink-2)" stroke-width="1.8" stroke-dasharray="5 4"/><text x="16" y="246" class="sm lab b">lactate, when there is no oxygen</text></g>
   <g data-k="fat"><path d="M360,236 V128" class="a-plain" style="stroke-dasharray:5 4"/><text x="360" y="256" class="sm lab b" text-anchor="middle">fatty acids join here (β-oxidation)</text></g>
  </svg>`,
  {glyc:['Glycolysis','In the <b>cytoplasm</b> of every cell, with or without oxygen. One glucose (6 carbons) is split into two <b>pyruvate</b> (3 carbons), with a net gain of <b>2 ATP and 2 NADH</b>. The committed, rate-limiting step is <b>phosphofructokinase-1</b>: slowed by ATP and citrate (plenty of energy), speeded by AMP and by insulin. Red blood cells have no mitochondria and depend on glycolysis entirely.'],
   link:['The link reaction','Pyruvate enters the mitochondrion and <b>pyruvate dehydrogenase</b> removes one carbon as CO₂, leaving <b>acetyl-CoA</b> and making NADH. The step cannot be reversed: this is why <b>fat cannot be turned into glucose</b>. The enzyme needs <b>thiamine (vitamin B1)</b>; in deficiency (alcohol dependence), pyruvate backs up as lactate and the brain suffers (Wernicke\'s encephalopathy).'],
   krebs:['The Krebs (citric acid) cycle','In the mitochondrial <b>matrix</b>. Acetyl-CoA (2 carbons) joins oxaloacetate (4) to make citrate (6), which is taken apart again to release 2 CO₂. The energy is captured as <b>3 NADH, 1 FADH₂ and 1 GTP</b> per turn (two turns per glucose). It is the common final pathway for carbohydrate, fat and protein, and supplies building blocks for amino acids and haem.'],
   etc:['The electron transport chain and oxidative phosphorylation','On the <b>inner mitochondrial membrane</b>. NADH and FADH₂ hand their electrons to a chain of four complexes; the energy released pumps protons out of the matrix. Protons flow back through <b>ATP synthase</b>, which makes ATP. <b>Oxygen</b> is the final electron acceptor, becoming water. This stage makes about 28 of the roughly 32 ATP from each glucose. Without oxygen it stops, and so do the Krebs cycle and link reaction behind it.'],
   lact:['Anaerobic metabolism: lactate','Without oxygen (or mitochondria), NADH cannot be recycled by the electron transport chain. <b>Lactate dehydrogenase</b> converts pyruvate to lactate, regenerating NAD⁺ so glycolysis can carry on making its 2 ATP. Lactate goes to the liver to be made back into glucose (the Cori cycle). A <b>raised blood lactate</b> means tissues are not getting or using enough oxygen: shock, sepsis, a blocked artery.'],
   fat:['Fat and protein as fuel','<b>Fatty acids</b> are cut two carbons at a time into acetyl-CoA by <b>β-oxidation</b> in the mitochondria, making much more ATP per gram than glucose (about 106 ATP from one palmitate). When acetyl-CoA is made faster than the Krebs cycle can use it (fasting, uncontrolled diabetes), the liver turns it into <b>ketones</b>. <b>Amino acids</b> lose their nitrogen (to urea) and enter as pyruvate, acetyl-CoA or Krebs cycle intermediates.']}],
 ['pw','oxphos','fuelswitch'],
 ['cards',[
  ['Mitochondria',['Two membranes: a leaky <b>outer</b> one and a folded <b>inner</b> one (cristae) carrying the electron transport chain. The <b>matrix</b> inside holds the Krebs cycle and β-oxidation.','They have their own small circular <b>DNA</b>, inherited only from the <b>mother</b>, coding for parts of the chain.','They also store calcium and start <b>apoptosis</b> (programmed cell death) by releasing cytochrome c.','Tissues that need the most energy have the most mitochondria (heart, brain, kidney tubules), and suffer first in mitochondrial disease and hypoxia.']],
  ['Poisons and uncouplers',['<b>Cyanide</b> and <b>carbon monoxide</b> block complex IV: electrons cannot reach oxygen, so cells cannot use the oxygen they are given.','<b>Uncouplers</b> (dinitrophenol, sold illegally as a slimming pill; high-dose aspirin) let protons leak back without making ATP. Fuel is burned but the energy is lost as <b>heat</b>: dangerous overheating.','<b>Brown fat</b> in babies uses a natural uncoupling protein (thermogenin) to make heat without shivering.','<b>Metformin</b> mildly inhibits complex I; in kidney failure it can build up and cause lactic acidosis.']],
  ['Reactive oxygen species',['A few electrons leak from complexes I and III and react with oxygen to make <b>superoxide</b>, a free radical: a molecule with an unpaired electron that damages DNA, lipids and proteins.','<b>Defences:</b> superoxide dismutase (superoxide → hydrogen peroxide), then catalase and glutathione peroxidase (hydrogen peroxide → water). Vitamins C and E mop up radicals directly.','<b>Oxidative stress</b> is production outrunning the defences. It contributes to ageing, to atherosclerosis (oxidised LDL), and to the damage done when blood returns to tissue after ischaemia.','Neutrophils make reactive oxygen species <b>on purpose</b> to kill bacteria (the respiratory burst).','Red cells rely on NADPH from the pentose phosphate pathway to keep glutathione working: in <b>G6PD deficiency</b>, oxidant drugs and fava beans cause haemolysis.']],
  ['Quick stores and long stores',['<b>Creatine phosphate:</b> a few seconds of ATP in muscle; its waste product is creatinine.','<b>Glycogen:</b> in liver (keeps blood glucose up for about a day of fasting) and muscle (for its own use only).','<b>Fat:</b> weeks of fuel in adipose tissue.','<b>Protein:</b> a last resort; breaking down muscle supplies amino acids for glucose production.']]]],
 ['notes',
  ['exam','Know the four stages, where each happens and what each needs: glycolysis (cytoplasm, no oxygen needed), link reaction and Krebs cycle (matrix), electron transport chain (inner membrane, needs oxygen). And know the one-way step: pyruvate to acetyl-CoA.'],
  ['clin','Why a raised lactate matters','Lactate above 2 mmol/L is one of the first things measured in a sick patient. It rises when oxygen delivery fails (shock, sepsis, cardiac arrest, a dead piece of bowel), and falls again as the circulation is restored, so it is used to track treatment.']]
]},
/* ------------------------------------------------------------------ */
{id:'found-genes',eb:'Genetics',h:'From gene to protein, and from parent to child',p:'A gene is a stretch of DNA that codes for a protein. Disease can come from a mistake in the code, in how it is read, in how the protein is folded, or in how many copies of a chromosome a person has.',b:[
 ['pw','geneprotein'],
 ['cards',[
  ['The basics',['<b>DNA:</b> two strands in a double helix. A pairs with T, G with C. About 20,000 protein-coding genes on 23 pairs of chromosomes, with a small separate genome in mitochondria.','<b>Exons</b> are the coding parts of a gene; <b>introns</b> are cut out. <b>Promoters</b> and enhancers control when the gene is read.','The <b>genetic code</b> is read in three-base <b>codons</b>, each meaning one amino acid. AUG starts; three codons stop. Several codons can code for the same amino acid.','<b>Chromatin:</b> DNA is wound round <b>histone</b> proteins. Tightly packed chromatin is silent; open chromatin can be read.','<b>Epigenetics:</b> lasting changes in gene activity without a change in sequence: methyl groups on DNA (silencing) and acetyl groups on histones (opening). X-inactivation in women and imprinting work this way.']],
  ['Protein folding and quality control',['Proteins for export or for membranes are made on the <b>rough endoplasmic reticulum</b>, where chaperones help them fold and sugars are added.','Misfolded proteins are held back, tagged with <b>ubiquitin</b> and destroyed by the <b>proteasome</b>.','The Golgi apparatus finishes, sorts and ships proteins.','<b>When it goes wrong:</b> in the commonest form of <b>cystic fibrosis</b> (ΔF508) the CFTR protein is made but misfolds and is destroyed before reaching the membrane. In α₁-antitrypsin deficiency the misfolded protein piles up in liver cells. Amyloid diseases and prion diseases are disorders of folding.']],
  ['Types of mutation',['<b>Silent:</b> the new codon means the same amino acid. No effect.','<b>Missense:</b> one amino acid is swapped for another. Sickle cell disease: glutamate → valine in β-globin.','<b>Nonsense:</b> a stop codon appears early; the protein is cut short.','<b>Frameshift:</b> bases are inserted or deleted (not in threes), scrambling everything downstream. Duchenne muscular dystrophy.','<b>Triplet repeat expansion:</b> a three-base repeat grows with each generation, so the disease starts earlier each time (anticipation). Huntington\'s disease, myotonic dystrophy, fragile X.','<b>Splice site</b> mutations spoil intron removal. Some β-thalassaemias.']],
  ['Chromosomes and cell division',['<b>Mitosis:</b> one division, two identical <b>diploid</b> cells (46 chromosomes). For growth and repair.','<b>Meiosis:</b> two divisions, four different <b>haploid</b> cells (23). For eggs and sperm. Crossing over and random assortment shuffle the genes.','<b>Non-disjunction</b> (a pair failing to separate in meiosis) gives a gamete with one too many or too few; the risk rises with the mother\'s age.','<b>Trisomy 21 (Down\'s syndrome):</b> learning disability, typical facial features, heart defects (atrioventricular septal defect), duodenal atresia, early Alzheimer\'s disease.','<b>45,X (Turner syndrome):</b> short stature, ovaries that fail, coarctation of the aorta. <b>47,XXY (Klinefelter syndrome):</b> tall, small testes, infertility.','<b>Apoptosis</b> is tidy, programmed cell death with no inflammation; <b>necrosis</b> is messy death from injury, with inflammation.']]]],
 ['table',['Pattern','How to recognise it in a family','Risk to each child','Examples'],[
  ['Autosomal dominant','Affected people in every generation; men and women equally; father-to-son transmission occurs','1 in 2 if one parent is affected','Huntington\'s disease, adult polycystic kidney disease, familial hypercholesterolaemia, Marfan syndrome, neurofibromatosis'],
  ['Autosomal recessive','Often no family history; parents are healthy carriers; more likely if parents are related','1 in 4 affected, 1 in 2 carriers, if both parents carry it','Cystic fibrosis, sickle cell disease, thalassaemia, haemochromatosis, phenylketonuria'],
  ['X-linked recessive','Almost only males affected; passed through carrier females; <b>never father to son</b>','Carrier mother: 1 in 2 sons affected, 1 in 2 daughters carriers','Haemophilia A and B, Duchenne muscular dystrophy, G6PD deficiency, red–green colour blindness'],
  ['Mitochondrial','Passed on only by <b>mothers</b>, to all their children; severity varies widely','All children of an affected mother may be affected','MELAS, Leber\'s hereditary optic neuropathy'],
  ['Multifactorial','Runs in families without a clear pattern: many genes plus environment','Raised, but low','Type 2 diabetes, hypertension, asthma, schizophrenia, cleft lip']]],
 ['notes',
  ['exam','Carrier arithmetic for a recessive disease: two carrier parents have a 1 in 4 chance of an affected child with each pregnancy. A healthy brother or sister of an affected child has a <b>2 in 3</b> chance of being a carrier (the affected outcome has been ruled out).'],
  ['clin','Why one gene can protect and harm','Carrying one copy of the sickle cell gene protects against severe malaria, which is why the gene is common where malaria is. Two copies cause sickle cell disease. The same logic may explain the frequency of the cystic fibrosis and haemochromatosis genes in Europe.']]
]},
/* ------------------------------------------------------------------ */
{id:'found-pk',eb:'Pharmacology',h:'Pharmacokinetics: what the body does to a drug',p:'Four processes decide how much drug reaches its target and for how long: <b>A</b>bsorption, <b>D</b>istribution, <b>M</b>etabolism and <b>E</b>xcretion. Three numbers summarise them: bioavailability, volume of distribution and clearance. From those you can work out a dose.',b:[
 ['sw','dg-pk','Concentration against time','The same drug (half-life 4 hours) given in different ways. Choose one.',560,pkSVG,
  [['iv','One dose by vein','<b>A single intravenous dose, first-order elimination.</b> All the drug is in the blood at once. A constant <b>fraction</b> is then removed per hour, so the level halves every half-life: 100%, 50%, 25%, 12.5%. After about <b>five half-lives</b> (here, 20 hours) almost all of it has gone. Most drugs behave like this.'],
   ['oral','One dose by mouth','<b>The same dose swallowed.</b> The level rises as the drug is absorbed, peaks, then falls at the same rate as before. The peak is lower and later. The area under this curve as a fraction of the area under the intravenous curve is the <b>bioavailability</b> (F): how much of the dose reaches the circulation intact. It is reduced by poor absorption and by <b>first-pass metabolism</b> in the gut wall and liver.'],
   ['rep','Repeated doses','<b>A dose every 4 hours.</b> Each dose arrives before the last has gone, so the level climbs, then flattens when the amount removed between doses equals the dose given: <b>steady state</b>. This takes <b>4 to 5 half-lives</b> whatever the dose. If you cannot wait that long (digoxin, phenytoin, amiodarone), give a <b>loading dose</b> first. After a dose change, wait five half-lives before measuring the level.'],
   ['zero','Zero-order elimination','<b>Zero-order (saturation) kinetics.</b> The enzymes are working flat out, so a constant <b>amount</b> is removed per hour whatever the level: a straight line, with no fixed half-life. <b>Alcohol</b>, <b>phenytoin</b> and high-dose aspirin behave this way. A small rise in dose can cause a large, unpredictable rise in level: phenytoin doses are changed in small steps, guided by blood levels.']]],
 ['table',['Stage','What decides it','Clinical points'],[
  ['Absorption','Route; how well the drug dissolves in fat; ionisation; gut motility and blood flow; destruction by acid or enzymes','Only the <b>un-ionised</b> form crosses membranes. Weak acids (aspirin) are un-ionised in acid; weak bases in alkali. Food, vomiting and other drugs alter absorption (iron and antacids bind tetracyclines and levothyroxine)'],
  ['Distribution','Blood flow; binding to plasma proteins; fat solubility; special barriers (brain, placenta)','Only <b>unbound</b> drug is active. Fat-soluble drugs enter the brain and fat stores. Low albumin raises the free fraction of highly bound drugs (phenytoin, warfarin)'],
  ['Metabolism','Mainly liver enzymes; see the last section','Makes drugs water-soluble; sometimes activates them (prodrugs)'],
  ['Excretion','Kidney: filtration, active secretion by the proximal tubule, and passive reabsorption. Also bile, breath, breast milk','Reduce doses of renally cleared drugs when the eGFR is low (gentamicin, digoxin, lithium, metformin, low molecular weight heparin). Making urine alkaline traps weak acids in the urine: used in aspirin overdose']]],
 ['cards',[
  ['Three numbers',['<b>Bioavailability (F):</b> the fraction of a dose reaching the systemic circulation unchanged. 100% by vein; anything less by mouth.','<b>Volume of distribution (Vd)</b> = amount of drug in the body ÷ plasma concentration. An "apparent" volume. Small (about 5 L): the drug stays in plasma (heparin, warfarin). Large (hundreds of litres): it is hidden in tissues (digoxin, amiodarone), and dialysis will not remove it.','<b>Clearance (CL):</b> the volume of plasma cleared of drug per unit time; liver and kidney added together.','<b>Half-life</b> = 0.693 × Vd ÷ CL. It grows if the drug is more widely distributed or cleared more slowly.']],
  ['Dosing sums',['<b>Loading dose</b> = Vd × target concentration. It depends on volume, not clearance.','<b>Maintenance dose rate</b> = CL × target concentration. It depends on clearance, not volume.','<b>Time to steady state</b> ≈ 4 to 5 half-lives.','<b>Worked example:</b> Vd 40 L, target 2 mg/L, clearance 5 L/hour. Loading dose = 80 mg. Maintenance = 10 mg/hour. Half-life = 0.693 × 40 ÷ 5 = 5.5 hours, so steady state in about a day.','In kidney failure, clearance falls: the loading dose stays the same but the maintenance dose is reduced.']]]],
 ['notes',
  ['think','A bath with the plug out. The taps are the dose, the size of the bath is the volume of distribution, and the plughole is clearance. The water level settles where water in equals water out. A bigger bath takes longer to fill and longer to drain, but the final level depends only on the taps and the plughole.'],
  ['fix','Decks · pharmacokinetics slides','The renal deck gives "Vd = plasma concentration ÷ dose": it is the other way up, <b>dose ÷ plasma concentration</b>. The nervous system deck says "pKa: higher = absorbed more readily". The pKa is simply the pH at which half the drug is ionised; what matters is whether the drug is <b>un-ionised at the pH of the gut</b>. A weak acid is absorbed better where it is acidic, a weak base where it is alkaline.']]
]},
/* ------------------------------------------------------------------ */
{id:'found-pd',eb:'Pharmacology',h:'Pharmacodynamics: what a drug does to the body',p:'Almost every drug works by binding a protein: a receptor, an enzyme, an ion channel or a transporter. Two properties describe it: how tightly it binds (affinity) and what it does once bound (efficacy).',b:[
 ['table',['Target','What the drug does','Examples'],[
  ['Receptor','Switches it on (agonist) or stops the natural signal reaching it (antagonist)','Salbutamol (β₂ agonist), bisoprolol (β₁ antagonist), morphine (opioid agonist), naloxone (opioid antagonist)'],
  ['Enzyme','Usually inhibits it','Ramipril (ACE), aspirin and ibuprofen (cyclo-oxygenase), statins (HMG-CoA reductase), methotrexate (dihydrofolate reductase)'],
  ['Ion channel','Blocks or opens it','Lidocaine (sodium channels), amlodipine (calcium channels), gliclazide (closes K<sub>ATP</sub> channels)'],
  ['Transporter (carrier)','Blocks it','Omeprazole (proton pump), furosemide (NKCC2), sertraline (serotonin re-uptake), dapagliflozin (SGLT2), digoxin (Na⁺/K⁺-ATPase)'],
  ['Other','Acts chemically or on DNA or microbes','Antacids, osmotic laxatives, chemotherapy, antibiotics']]],
 ['sw','dg-doseresp','Dose–response curves','Response plotted against the log of drug concentration gives an S-shaped curve. Choose a comparison.',560,pdSVG,
  [['full','A full agonist','<b>A full agonist.</b> Two things can be read off. <b>Efficacy</b> is the height of the plateau: the greatest effect the drug can produce. <b>Potency</b> is how far left the curve sits, measured by the <b>EC₅₀</b>: the concentration giving half the maximum effect. A lower EC₅₀ means a more potent drug.'],
   ['partial','Partial agonist','<b>A partial agonist</b> (solid) binds the receptor but activates it less well: however much is given, the maximum response is lower. Given alongside a full agonist it competes for the receptor and so <b>reduces</b> the response. Buprenorphine is a partial opioid agonist: pain relief with a ceiling on respiratory depression, but it can bring on withdrawal in someone taking morphine.'],
   ['comp','Competitive antagonist','<b>Agonist plus a competitive (reversible) antagonist.</b> The antagonist sits in the same binding site without activating it. Adding more agonist out-competes it, so the curve shifts to the <b>right</b> (more agonist needed) but reaches the <b>same maximum</b>. Naloxone against morphine; atropine against acetylcholine; most β-blockers.'],
   ['noncomp','Irreversible or non-competitive antagonist','<b>Agonist plus an irreversible or non-competitive antagonist.</b> Receptors are taken out of action, by permanent binding or by binding at a different site. No amount of agonist restores them, so the <b>maximum falls</b>. The effect lasts until new protein is made: aspirin on platelet cyclo-oxygenase (for the 7 to 10 day life of the platelet), omeprazole on the proton pump, clopidogrel.'],
   ['potency','Potency versus efficacy','<b>Two full agonists.</b> Drug A is 100 times more <b>potent</b> than drug B (its curve lies to the left), but both reach the same maximum: equal <b>efficacy</b>. Potency only tells you the size of the tablet. Efficacy tells you what the drug can achieve. Bumetanide is far more potent than furosemide, yet at the right doses they do the same job.']]],
 ['cards',[
  ['The vocabulary',['<b>Affinity:</b> how tightly a drug binds. Agonists and antagonists both have it.','<b>Efficacy:</b> the ability to activate the receptor once bound. Antagonists have none.','<b>Agonist</b> · <b>partial agonist</b> · <b>antagonist</b> · <b>inverse agonist</b> (reduces a receptor\'s resting activity; many antihistamines).','<b>Selectivity:</b> no drug is truly specific. Salbutamol prefers β₂ but at high doses stimulates β₁ (fast heart rate). Side effects are often the same action in the wrong place.','<b>Physiological antagonism:</b> two drugs with opposite effects through different receptors (adrenaline against histamine in anaphylaxis).','<b>Chemical antagonism:</b> one substance binds and inactivates another (protamine and heparin; activated charcoal).']],
  ['Therapeutic index',['<b>Therapeutic index</b> = the dose that is toxic in half of people ÷ the dose that works in half of people. A measure of safety margin.','<b>Wide:</b> penicillin, most inhaled drugs.','<b>Narrow:</b> small changes in level cause toxicity or failure, so blood levels or effects are monitored. <b>Digoxin, lithium, phenytoin, theophylline, gentamicin and vancomycin, warfarin (by INR), ciclosporin and tacrolimus.</b>','These are the drugs most affected by interactions and by kidney or liver impairment.']],
  ['When drugs stop working',['<b>Desensitisation (tachyphylaxis):</b> the response fades within minutes to hours as receptors uncouple.','<b>Tolerance:</b> more drug is needed for the same effect over days to weeks: receptors are reduced in number (opioids, nitrates), or metabolism speeds up (alcohol).','<b>Dependence:</b> withdrawal symptoms when the drug is stopped.','<b>Resistance:</b> microbes or cancer cells evolve to evade the drug.','The reverse also happens: block a receptor for a long time and the cell makes more of them. Stopping a β-blocker suddenly can cause a rebound fast heart rate and angina.']],
  ['Adverse drug reactions',['<b>Type A (augmented):</b> too much of the known action. Dose-related, predictable, common. Bleeding on warfarin, low glucose on insulin, low pressure on antihypertensives.','<b>Type B (bizarre):</b> unrelated to the dose or the main action. Allergic or genetic, rare, unpredictable. Penicillin anaphylaxis, Stevens–Johnson syndrome.','Also: chronic (steroids and osteoporosis), delayed (cancers, harm to the fetus), end-of-use (withdrawal).','Report suspected reactions through the <b>Yellow Card</b> scheme.']]]],
 ['notes',
  ['fix','Nervous System deck · pharmacodynamics','"EC₅₀: concentration of drug required to occupy 50% of available receptors" mixes up two things. The <b>EC₅₀</b> is the concentration producing <b>50% of the maximum effect</b>. The concentration at which half the receptors are occupied is the <b>K<sub>d</sub></b>, a measure of affinity. They often differ, because many tissues have spare receptors and reach a full response with only a fraction occupied.']]
]},
/* ------------------------------------------------------------------ */
{id:'found-metab',eb:'Pharmacology',h:'Drug metabolism, interactions and safe prescribing',p:'The liver turns fat-soluble drugs into water-soluble ones the kidney can excrete. Anything that speeds up or slows down the enzymes that do this will change the dose a patient is really getting.',b:[
 ['flow',[
  ['Phase I: change the molecule','Oxidation, reduction or hydrolysis, mostly by the <b>cytochrome P450</b> (CYP) enzymes in the smooth endoplasmic reticulum of liver cells. Adds or exposes a reactive group. The product may be inactive, still active (diazepam), or newly active (a <b>prodrug</b>: codeine → morphine, clopidogrel, enalapril). Sometimes it is toxic (paracetamol → NAPQI).'],
  ['Phase II: attach something','<b>Conjugation</b> with glucuronic acid, sulfate, glutathione, acetate or an amino acid. The product is larger, water-soluble and almost always inactive.'],
  ['Out','Small conjugates leave in <b>urine</b>, larger ones in <b>bile</b>. Gut bacteria can remove the conjugate so the drug is reabsorbed: <b>enterohepatic recirculation</b>, which prolongs the action of some drugs.']]],
 ['table',['','Enzyme inducers','Enzyme inhibitors'],[
  ['What they do','Make the liver produce more CYP enzyme. Other drugs are broken down <b>faster</b> and may stop working. Takes days to weeks','Block CYP enzymes. Other drugs are broken down more <b>slowly</b> and build up to toxic levels. Takes hours to days'],
  ['The main ones','<b>Rifampicin</b>, carbamazepine, phenytoin, phenobarbital, St John\'s wort, chronic alcohol use, smoking','<b>Clarithromycin</b> and erythromycin, fluconazole and other azoles, ciprofloxacin, isoniazid, amiodarone, verapamil and diltiazem, ritonavir, sodium valproate, cimetidine, <b>grapefruit juice</b>, a bout of heavy drinking'],
  ['Classic consequences','The contraceptive pill fails; warfarin stops working; a transplant is rejected as ciclosporin levels fall','Bleeding on warfarin; muscle damage on simvastatin; theophylline toxicity; long QT with some drug pairs']]],
 ['pw','paracetamol'],
 ['cards',[
  ['First-pass metabolism',['A drug swallowed passes through the gut wall and then, in the portal vein, through the liver before it reaches the rest of the body.','Some drugs are almost wholly removed on this first pass: <b>GTN</b> (so it is given under the tongue), lidocaine, and much of oral morphine and propranolol.','Routes that avoid it: under the tongue, through the skin, by inhalation, by injection, and (partly) by rectum.','In liver disease or with a shunt past the liver, first-pass removal falls and oral doses must be reduced.']],
  ['Genes and drug response',['<b>CYP2D6:</b> about 1 in 14 white Europeans cannot convert <b>codeine</b> to morphine and get no pain relief; ultra-rapid metabolisers make too much and risk overdose (codeine is avoided in breastfeeding mothers and children).','<b>TPMT:</b> low activity makes <b>azathioprine</b> dangerously toxic to bone marrow. Tested before starting.','<b>Acetylator status:</b> slow acetylators are more prone to isoniazid nerve damage.','<b>G6PD deficiency:</b> haemolysis with nitrofurantoin, primaquine, dapsone.','<b>HLA-B*57:01:</b> severe allergy to abacavir.']],
  ['Who needs a different dose',['<b>Older people:</b> less kidney function, less liver blood flow, more body fat, and many medicines at once.','<b>Kidney impairment:</b> reduce or avoid drugs cleared by the kidney.','<b>Liver disease:</b> reduce drugs with high first-pass removal; avoid sedatives and opioids (they can trigger encephalopathy).','<b>Pregnancy:</b> avoid known teratogens: sodium valproate, isotretinoin, warfarin, ACE inhibitors, methotrexate, lithium, tetracyclines, trimethoprim in the first trimester.','<b>Children:</b> dose by weight; newborns conjugate poorly.']],
  ['Kinds of drug interaction',['<b>Pharmacokinetic:</b> one drug changes the level of another: absorption (antacids binding antibiotics), protein binding, metabolism (the table above), or excretion (NSAIDs raising lithium and methotrexate).','<b>Pharmacodynamic:</b> two drugs add to or oppose each other\'s effect: two sedatives; an NSAID with an anticoagulant; a β-blocker with verapamil; an ACE inhibitor with spironolactone (potassium).','Check the BNF before prescribing for anyone on a narrow therapeutic index drug.']]]],
 ['notes',
  ['exam','The interactions asked most often: <b>warfarin</b> with an inducer or inhibitor; <b>clarithromycin with a statin</b>; <b>rifampicin with the contraceptive pill</b>; <b>NSAID + ACE inhibitor + diuretic</b> (kidney injury); <b>methotrexate with trimethoprim</b> (both block folate).'],
  ['clin','Paracetamol overdose','Often no symptoms on the first day. Liver cell injury appears at 2 to 3 days (very high ALT, rising prothrombin time), sometimes with kidney failure. Measure the paracetamol level 4 hours or more after ingestion and plot it on the treatment line; if above it, or if the overdose was staggered or the timing is uncertain, give <b>acetylcysteine</b>, which restores glutathione. People who drink heavily, are malnourished or take enzyme-inducing drugs are at greater risk.']]
]}
],
/* ================================================================== */
pw:{
gscascade:{t:'A Gs signal: adrenaline on a β receptor',k:'cell',sec:'found-signal',mn:'Receptor, G protein, cyclase, cAMP, kinase, off',steps:[
 ['Adrenaline binds a β receptor on the cell surface',''],
 ['The receptor changes shape and activates a G<sub>s</sub> protein, which swaps its GDP for GTP',''],
 ['The α subunit, carrying GTP, separates and activates adenylyl cyclase',''],
 ['Adenylyl cyclase converts ATP into cyclic AMP','The second messenger. One enzyme makes many molecules: amplification.'],
 ['cAMP activates protein kinase A',''],
 ['Protein kinase A phosphorylates target proteins, changing what the cell does','In the heart: calcium channels open more. In the liver: glycogen is broken down. In airway muscle: relaxation.'],
 ['The α subunit hydrolyses its GTP to GDP and switches itself off',''],
 ['Phosphodiesterase breaks cAMP down to AMP and the signal ends','']]},
gqcascade:{t:'A Gq signal: making smooth muscle contract',k:'cell',sec:'found-signal',mn:'PLC splits PIP₂ into IP₃ and DAG',steps:[
 ['A signal such as noradrenaline binds its receptor (here, α₁)',''],
 ['The receptor activates a G<sub>q</sub> protein',''],
 ['G<sub>q</sub> activates phospholipase C in the membrane',''],
 ['Phospholipase C splits a membrane lipid (PIP₂) into IP₃ and DAG',''],
 ['IP₃ diffuses to the endoplasmic reticulum and opens calcium channels',''],
 ['Calcium floods into the cytoplasm','Meanwhile DAG, with calcium, activates protein kinase C.'],
 ['Calcium binds calmodulin, which activates myosin light chain kinase',''],
 ['Myosin is phosphorylated and the smooth muscle contracts','']]},
oxphos:{t:'The electron transport chain',k:'cell',sec:'found-energy',mn:'Electrons down, protons out, protons back, ATP made',an:'A hydroelectric dam: electrons falling down the chain pump water (protons) uphill behind the dam, and it can only flow back through the turbine (ATP synthase).',steps:[
 ['NADH gives its electrons to complex I; FADH₂ gives its electrons to complex II','NADH enters higher up the chain, so it yields more ATP than FADH₂.'],
 ['Coenzyme Q carries the electrons to complex III',''],
 ['Cytochrome c carries them on to complex IV',''],
 ['As electrons pass through complexes I, III and IV, protons are pumped from the matrix into the space between the membranes',''],
 ['A steep proton gradient builds up across the inner membrane',''],
 ['At complex IV the electrons are handed to oxygen, which picks up protons and becomes water','Cyanide and carbon monoxide block this step.'],
 ['Protons flow back into the matrix through ATP synthase (complex V)',''],
 ['The flow turns the enzyme like a turbine, joining ADP and phosphate into ATP','']]},
fuelswitch:{t:'From fed to starving: which fuel is burned',k:'cell',sec:'found-energy',mn:'Glucose, glycogen, new glucose, fat, ketones',steps:[
 ['After a meal, insulin is high: cells burn glucose, and the surplus is stored as glycogen and fat',''],
 ['A few hours later insulin falls and glucagon rises',''],
 ['The liver breaks down glycogen to keep blood glucose steady','Lasts about 12 to 24 hours.'],
 ['As glycogen runs out, the liver makes new glucose from lactate, amino acids and glycerol','Gluconeogenesis. Cortisol helps supply the amino acids from muscle.'],
 ['Fat stores release fatty acids, which muscle and liver burn in place of glucose',''],
 ['The liver converts excess acetyl-CoA into ketones',''],
 ['After several days the brain takes most of its energy from ketones, sparing glucose and so sparing muscle protein','']],
 foot:'Diabetic ketoacidosis is this starvation response running out of control, because without insulin the body cannot tell that glucose is plentiful.'},
geneprotein:{t:'From gene to working protein',k:'gen',sec:'found-genes',mn:'Transcribe, process, export, translate, fold, ship',steps:[
 ['Transcription factors bind the promoter and open up the chromatin',''],
 ['RNA polymerase II copies one DNA strand into pre-messenger RNA','Transcription, in the nucleus.'],
 ['The RNA is processed: a cap is added at one end and a poly-A tail at the other, and the introns are spliced out',''],
 ['Mature mRNA leaves the nucleus through a nuclear pore',''],
 ['A ribosome binds the mRNA and finds the start codon, AUG',''],
 ['Transfer RNAs bring amino acids one at a time, matching each codon; the ribosome joins them into a chain','Translation. Many antibiotics work by blocking bacterial ribosomes.'],
 ['At a stop codon the finished chain is released',''],
 ['The chain folds, helped by chaperones; proteins for export do this inside the rough endoplasmic reticulum',''],
 ['The Golgi apparatus modifies, sorts and sends the protein to where it is needed','']]},
paracetamol:{t:'Paracetamol: safe dose and overdose',k:'drug',sec:'found-metab',mn:'Conjugation saturates, NAPQI rises, glutathione runs out',steps:[
 ['At normal doses about 90% of paracetamol is conjugated with glucuronide or sulfate and excreted','Phase II. Harmless.'],
 ['A small part is oxidised by cytochrome P450 to NAPQI, a reactive, toxic product','Phase I.'],
 ['Glutathione in the liver cell binds NAPQI at once and makes it safe',''],
 ['In overdose, the conjugation pathways are saturated',''],
 ['More paracetamol is pushed down the P450 route, making much more NAPQI',''],
 ['The liver\'s glutathione is used up',''],
 ['Free NAPQI binds to cell proteins and kills liver cells, starting around the central vein',''],
 ['Acetylcysteine supplies the raw material for new glutathione and prevents the damage if given in time','']]}
},
/* ================================================================== */
flips:[
 ['Four receptor families','Ion channel, G protein-coupled, enzyme-linked (kinase), nuclear.'],
 ['Gs protein','Adenylyl cyclase up: cAMP rises (β₁, β₂, H₂, V₂).'],
 ['Gi protein','Adenylyl cyclase down: cAMP falls (M₂, α₂, opioid).'],
 ['Gq protein','Phospholipase C: IP₃ and DAG, calcium rises (α₁, M₃, H₁).'],
 ['What breaks down cAMP?','Phosphodiesterase.'],
 ['Insulin receptor type','Receptor tyrosine kinase.'],
 ['Steroid hormone receptors','Inside the cell; act on gene transcription; slow.'],
 ['Where is glycolysis?','Cytoplasm. Net 2 ATP per glucose.'],
 ['Where is the Krebs cycle?','Mitochondrial matrix.'],
 ['Final electron acceptor','Oxygen.'],
 ['Enzyme of the link reaction and its vitamin','Pyruvate dehydrogenase; thiamine (B1).'],
 ['Why can\'t fat become glucose?','Pyruvate → acetyl-CoA cannot be reversed.'],
 ['Cyanide','Blocks complex IV of the electron transport chain.'],
 ['Mitochondrial DNA is inherited from...','The mother only.'],
 ['Missense, nonsense, frameshift','Wrong amino acid; early stop; reading frame scrambled.'],
 ['X-linked recessive clue','Affected males, carrier females, never father to son.'],
 ['Two carrier parents: risk of an affected child','1 in 4.'],
 ['Bioavailability','Fraction of a dose reaching the circulation unchanged.'],
 ['Volume of distribution','Amount of drug in the body ÷ plasma concentration.'],
 ['Time to steady state','4 to 5 half-lives.'],
 ['Loading dose','Volume of distribution × target concentration.'],
 ['First-order versus zero-order','Constant fraction per hour versus constant amount per hour.'],
 ['Zero-order drugs','Alcohol, phenytoin, high-dose aspirin.'],
 ['EC₅₀','Concentration giving half the maximum effect: a measure of potency.'],
 ['Competitive antagonist: effect on the curve','Shifts right; same maximum.'],
 ['Partial agonist','Lower maximum effect, whatever the dose.'],
 ['Enzyme inducers','Rifampicin, carbamazepine, phenytoin, St John\'s wort, chronic alcohol, smoking.'],
 ['Enzyme inhibitors','Clarithromycin, azoles, ciprofloxacin, amiodarone, grapefruit juice.'],
 ['Paracetamol antidote','Acetylcysteine (restores glutathione).'],
 ['Narrow therapeutic index drugs','Digoxin, lithium, phenytoin, theophylline, gentamicin, warfarin.']
],
/* ================================================================== */
qs:[
{sec:'found-signal',type:'sba',q:'Salbutamol relaxes airway smooth muscle by acting on β₂ receptors. Which second messenger rises inside the cell?',
 o:['Cyclic AMP','Inositol trisphosphate (IP₃)','Cyclic GMP','Diacylglycerol','Calcium'],a:0,
 e:'β receptors couple to G<sub>s</sub>, which activates adenylyl cyclase and raises cAMP. In smooth muscle, protein kinase A then lowers calcium and inactivates myosin light chain kinase, so the muscle relaxes. IP₃, DAG and calcium belong to the G<sub>q</sub> pathway, which makes smooth muscle contract.'},
{sec:'found-signal',type:'sba',q:'Noradrenaline constricts arterioles through α₁ receptors. Which pathway do these receptors use?',
 o:['Gq: phospholipase C, IP₃ and a rise in calcium','Gs: adenylyl cyclase and a rise in cAMP','Gi: a fall in cAMP','A receptor tyrosine kinase','A ligand-gated sodium channel'],a:0,
 e:'α₁, M₁, M₃, H₁ and AT₁ receptors all couple to G<sub>q</sub>. IP₃ releases calcium from the sarcoplasmic reticulum; calcium–calmodulin activates myosin light chain kinase and the muscle contracts.'},
{sec:'found-signal',type:'sba',q:'A patient starts prednisolone. Why do steroids take hours to begin working?',
 o:['Their receptors are inside the cell and act by changing gene transcription','They must first be converted to cAMP','Their receptors are ion channels that open slowly','They are absorbed very slowly from the gut','They act only after the G protein has hydrolysed GTP'],a:0,
 e:'Steroid hormones are fat-soluble and cross the membrane to bind intracellular receptors. The complex binds DNA and alters transcription; new proteins have to be made before any effect is seen. For the same reason the effect outlasts the drug.'},
{sec:'found-signal',type:'saq',q:'Which enzyme breaks down cyclic AMP, ending a Gs signal?',acc:['phosphodiesterase|pde'],m:'Phosphodiesterase',
 e:'Phosphodiesterases convert cAMP to AMP (and cGMP to GMP). Theophylline and caffeine inhibit them, prolonging cAMP signals; sildenafil inhibits the cGMP-specific type 5.'},
{sec:'found-signal',type:'sba',q:'The insulin receptor belongs to which family?',
 o:['Receptor tyrosine kinases','G protein-coupled receptors','Ligand-gated ion channels','Nuclear receptors','Voltage-gated channels'],a:0,
 e:'Insulin binding makes the two halves of the receptor phosphorylate each other on tyrosine residues, starting cascades that move GLUT4 transporters to the cell surface and switch on glycogen and fat synthesis.'},
{sec:'found-energy',type:'sba',q:'Mature red blood cells have no mitochondria. How do they make ATP?',
 o:['Glycolysis alone, producing lactate','The Krebs cycle in the cytoplasm','β-oxidation of fatty acids','Oxidative phosphorylation on the cell membrane','Breaking down ketones'],a:0,
 e:'Without mitochondria there is no Krebs cycle, β-oxidation or electron transport chain. Red cells rely on glycolysis (2 ATP per glucose), converting pyruvate to lactate to regenerate NAD⁺.'},
{sec:'found-energy',type:'sba',q:'A man pulled from a house fire has a headache and confusion; smoke inhalation with cyanide poisoning is suspected. His blood oxygen level is normal. Why are his tissues starved of energy?',
 o:['Cyanide blocks complex IV, so electrons cannot be passed to oxygen','Cyanide stops haemoglobin releasing oxygen','Cyanide uncouples the proton gradient from ATP synthase','Cyanide blocks glycolysis','Cyanide destroys the mitochondrial membrane'],a:0,
 e:'Cyanide binds cytochrome c oxidase (complex IV). Oxygen is delivered but cannot be used; the chain stops, ATP falls and lactate rises. Carbon monoxide also inhibits complex IV as well as displacing oxygen from haemoglobin.'},
{sec:'found-energy',type:'sba',q:'A man who drinks heavily and eats little becomes confused and unsteady, with abnormal eye movements. Which enzyme is failing for want of its vitamin cofactor?',
 o:['Pyruvate dehydrogenase, which needs thiamine','Phosphofructokinase, which needs folate','Lactate dehydrogenase, which needs vitamin B12','ATP synthase, which needs vitamin C','Hexokinase, which needs vitamin K'],a:0,
 e:'Wernicke\'s encephalopathy is caused by thiamine (vitamin B1) deficiency. Thiamine is a cofactor for pyruvate dehydrogenase and for an enzyme of the Krebs cycle; without it the brain cannot oxidise glucose properly. Give thiamine before glucose.'},
{sec:'found-energy',type:'saq',q:'In which part of the cell does glycolysis take place?',acc:['cytoplasm|cytosol'],m:'The cytoplasm (cytosol)',
 e:'Glycolysis needs neither mitochondria nor oxygen. The link reaction and Krebs cycle are in the mitochondrial matrix; the electron transport chain is on the inner mitochondrial membrane.'},
{sec:'found-energy',type:'sba',q:'A young woman takes "fat-burning" tablets bought online and is brought in with a temperature of 41 °C, sweating and a fast heart rate. The tablets contain dinitrophenol. What does it do?',
 o:['It lets protons leak across the inner mitochondrial membrane, so fuel is burned as heat without making ATP','It blocks complex I, stopping electron transport','It inhibits ATP synthase directly','It blocks glycolysis in muscle','It stimulates β₃ receptors on fat cells'],a:0,
 e:'Dinitrophenol is an uncoupler: it carries protons back into the matrix, bypassing ATP synthase. The chain runs faster to compensate, burning fuel and oxygen, and the energy is released as heat. There is no antidote.'},
{sec:'found-energy',type:'saq',q:'What is the final acceptor of electrons in the electron transport chain?',acc:['oxygen|o2'],m:'Oxygen (it is reduced to water)',
 e:'At complex IV, oxygen accepts electrons and protons to form water. This is the reason we need to breathe: without oxygen, the chain backs up and ATP production falls by more than 90%.'},
{sec:'found-genes',type:'sba',q:'Sickle cell disease is caused by a single base change that replaces glutamate with valine in β-globin. What type of mutation is this?',
 o:['Missense','Nonsense','Frameshift','Silent','Triplet repeat expansion'],a:0,
 e:'A missense mutation swaps one amino acid for another. A nonsense mutation creates a premature stop codon; a frameshift is an insertion or deletion that alters the reading frame; a silent mutation leaves the amino acid unchanged.'},
{sec:'found-genes',type:'sba',q:'A healthy couple have a son with cystic fibrosis. What is the chance that their next child will have the disease?',
 o:['1 in 4','1 in 2','1 in 3','2 in 3','1 in 8'],a:0,
 e:'Cystic fibrosis is autosomal recessive, so both parents must be carriers. Each pregnancy carries a 1 in 4 chance of an affected child, a 1 in 2 chance of a carrier and a 1 in 4 chance of a child with two normal copies.'},
{sec:'found-genes',type:'sba',q:'A boy has Duchenne muscular dystrophy. His mother\'s brother had the same disease. His father and his sisters are well. What is the pattern of inheritance?',
 o:['X-linked recessive','Autosomal dominant','Autosomal recessive','Mitochondrial','X-linked dominant'],a:0,
 e:'Affected males related through unaffected (carrier) females, with no father-to-son transmission, is the pattern of X-linked recessive inheritance. Each son of a carrier mother has a 1 in 2 chance of being affected.'},
{sec:'found-genes',type:'sba',q:'In the commonest form of cystic fibrosis (ΔF508), what happens to the CFTR protein?',
 o:['It misfolds in the endoplasmic reticulum and is destroyed before reaching the cell membrane','No messenger RNA is made','It reaches the membrane but stays permanently open','It is made in excess and blocks the Golgi apparatus','It is secreted from the cell'],a:0,
 e:'Loss of one phenylalanine makes CFTR fold wrongly. The cell\'s quality control tags it with ubiquitin and the proteasome destroys it. New "corrector" drugs help the protein fold and reach the surface; "potentiators" (ivacaftor) help it open.'},
{sec:'found-genes',type:'saq',q:'From which parent is mitochondrial DNA inherited?',acc:['mother|maternal'],m:'The mother',
 e:'The egg supplies virtually all of the embryo\'s mitochondria. Mitochondrial diseases are therefore passed on by affected mothers to all their children, and never by fathers.'},
{sec:'found-genes',type:'sba',q:'Which process copies a gene into messenger RNA?',
 o:['Transcription, by RNA polymerase in the nucleus','Translation, by ribosomes in the cytoplasm','Replication, by DNA polymerase','Splicing, by the proteasome','Conjugation, in the Golgi apparatus'],a:0,
 e:'Transcription makes RNA from DNA in the nucleus. After capping, tailing and splicing, the mRNA is exported and translated into protein by ribosomes.'},
{sec:'found-pk',type:'sba',q:'A drug has a half-life of 6 hours and is started as a regular dose with no loading dose. About how long will it take to reach steady state?',
 o:['24 to 30 hours','6 hours','12 hours','3 days','1 week'],a:0,
 e:'Steady state is reached after about 4 to 5 half-lives, whatever the dose or dosing interval: here 24 to 30 hours. The same rule gives the time for a drug to be eliminated after stopping.'},
{sec:'found-pk',type:'saq',q:'A drug has a volume of distribution of 50 L. What loading dose, in mg, is needed to reach a plasma concentration of 4 mg/L?',acc:['200'],m:'200 mg (50 L × 4 mg/L)',
 e:'Loading dose = volume of distribution × target concentration = 50 × 4 = 200 mg. Clearance does not come into it; clearance decides the maintenance dose.'},
{sec:'found-pk',type:'sba',q:'GTN is given as a spray under the tongue, not as a swallowed tablet. Why?',
 o:['Swallowed GTN is almost completely removed by first-pass metabolism in the liver','GTN is destroyed by stomach acid','GTN is too large a molecule to be absorbed from the gut','Sublingual GTN is not absorbed and acts locally','GTN irritates the stomach lining'],a:0,
 e:'Blood from the gut passes through the liver before reaching the general circulation. GTN is so extensively metabolised there that little survives. Veins under the tongue drain straight to the systemic circulation, bypassing the liver.'},
{sec:'found-pk',type:'sba',q:'A patient taking phenytoin has a small increase in dose and two weeks later is unsteady, with slurred speech and a very high blood level. Why did the level rise so much?',
 o:['Phenytoin\'s metabolism is saturated, so it is eliminated at a fixed rate (zero-order kinetics)','Phenytoin induces its own metabolism','Phenytoin has a very large volume of distribution','Phenytoin is excreted unchanged by the kidney','Phenytoin has first-order kinetics'],a:0,
 e:'At treatment levels the liver enzymes that clear phenytoin are nearly saturated. Beyond that point a constant amount is removed per day, so a small extra dose accumulates. Doses are changed in small steps with blood level monitoring.'},
{sec:'found-pk',type:'sba',q:'Digoxin has a volume of distribution of about 500 L in an adult. What does this tell you?',
 o:['Most of the drug is bound in the tissues, not in the plasma','The drug stays within the bloodstream','The drug is rapidly excreted by the kidneys','The patient has 500 L of body water','The drug is highly bound to plasma albumin'],a:0,
 e:'Volume of distribution is an apparent volume: dose ÷ plasma concentration. A value far larger than body water means the drug has left the plasma for the tissues (digoxin binds to muscle). Such drugs need loading doses and cannot be removed by dialysis.'},
{sec:'found-pk',type:'saq',q:'After a single intravenous dose, what percentage of a drug remains in the body after three half-lives?',acc:['12.5|12 5|one eighth|1/8|an eighth'],m:'12.5% (one eighth)',
 e:'Each half-life halves what is left: 50% after one, 25% after two, 12.5% after three, about 3% after five.'},
{sec:'found-pd',type:'sba',q:'A patient taking regular morphine for cancer pain is given buprenorphine, a partial agonist at the same receptor, and develops sweating, cramps and worse pain. Why?',
 o:['The partial agonist displaces morphine but activates the receptor less, so the overall effect falls','Buprenorphine is an enzyme inducer and speeds up morphine metabolism','Buprenorphine blocks the absorption of morphine','The two drugs combine chemically in the blood','Buprenorphine is an irreversible antagonist'],a:0,
 e:'A partial agonist has high affinity but lower efficacy. In the presence of a full agonist it takes over receptors and delivers a smaller response: in effect it acts as an antagonist, and can bring on withdrawal.'},
{sec:'found-pd',type:'sba',q:'Naloxone is given to a patient with morphine overdose. On a dose–response curve for morphine, what does naloxone do?',
 o:['It shifts the curve to the right without lowering the maximum','It lowers the maximum response without shifting the curve','It shifts the curve to the left','It makes the curve steeper','It has no effect on the curve'],a:0,
 e:'Naloxone is a competitive antagonist: it and morphine compete for the same site, so more morphine is needed for the same effect, but a high enough dose can still reach the maximum. Naloxone\'s half-life is shorter than morphine\'s, so the patient may relapse and need repeat doses.'},
{sec:'found-pd',type:'sba',q:'A single low dose of aspirin reduces platelet clumping for about a week, although the drug is cleared from the blood within hours. Why?',
 o:['Aspirin irreversibly inactivates cyclo-oxygenase, and platelets cannot make new enzyme','Aspirin has a very large volume of distribution','Aspirin is stored inside platelets and released slowly','Aspirin\'s metabolite has a half-life of a week','Aspirin induces an enzyme that destroys thromboxane'],a:0,
 e:'Aspirin acetylates cyclo-oxygenase permanently. Platelets have no nucleus, so they cannot replace it; the effect lasts for the platelet\'s lifespan of 7 to 10 days. Duration of action here depends on the target, not on the drug\'s half-life.'},
{sec:'found-pd',type:'sba',q:'Drug A produces its full effect at one tenth of the dose of drug B. Both drugs produce the same maximum effect. Which statement is correct?',
 o:['A is more potent than B; they have equal efficacy','A has greater efficacy than B; they have equal potency','A is a full agonist and B is a partial agonist','B is a competitive antagonist of A','A has a wider therapeutic index than B'],a:0,
 e:'Potency is about how much drug is needed (the position of the curve along the dose axis). Efficacy is the maximum effect achievable (the height of the curve). Potency matters little clinically as long as the right dose can be given.'},
{sec:'found-pd',type:'saq',q:'What name is given to an adverse drug reaction that is an exaggeration of the drug\'s normal action and depends on the dose?',acc:['type a|augmented'],m:'Type A (augmented)',
 e:'Type A reactions are predictable and common: bleeding with anticoagulants, hypoglycaemia with insulin. Type B (bizarre) reactions are unpredictable, not dose-related and often immune: anaphylaxis, Stevens–Johnson syndrome.'},
{sec:'found-metab',type:'sba',q:'A woman taking warfarin, with a stable INR, is given clarithromycin for a chest infection. A week later she has nosebleeds and an INR of 8. What is the mechanism?',
 o:['Clarithromycin inhibits the cytochrome P450 enzymes that break down warfarin','Clarithromycin induces the enzymes that activate warfarin','Clarithromycin displaces vitamin K from the liver','Clarithromycin reduces the absorption of vitamin K only','Clarithromycin blocks the excretion of warfarin by the kidney'],a:0,
 e:'Macrolides inhibit CYP3A4 (and warfarin is cleared by CYP enzymes), so warfarin accumulates. Antibiotics also reduce vitamin K-producing gut bacteria, adding to the effect. INR should be checked a few days after starting any interacting drug.'},
{sec:'found-metab',type:'sba',q:'A woman using the combined oral contraceptive pill is treated for tuberculosis with rifampicin and becomes pregnant. Why did the pill fail?',
 o:['Rifampicin induces liver enzymes, so the hormones were broken down faster','Rifampicin inhibits liver enzymes, so the hormones accumulated','Rifampicin binds the hormones in the gut','Rifampicin blocks oestrogen receptors','Rifampicin increases excretion of the hormones by the kidney'],a:0,
 e:'Rifampicin is the most powerful enzyme inducer in common use. It increases the amount of CYP enzyme, so oestrogen and progestogen levels fall below those needed to suppress ovulation. Another method of contraception is needed during treatment and for weeks afterwards.'},
{sec:'found-metab',type:'sba',q:'A mother takes codeine after a caesarean section; her breastfed baby becomes drowsy and breathes slowly. Which explanation fits?',
 o:['She is an ultra-rapid CYP2D6 metaboliser and converts codeine to morphine unusually fast','She lacks CYP2D6 and cannot metabolise codeine','Codeine is not metabolised and passes unchanged into milk','The baby has G6PD deficiency','Codeine inhibits the baby\'s liver enzymes'],a:0,
 e:'Codeine is a prodrug activated to morphine by CYP2D6. People with extra copies of the gene make large amounts of morphine, which passes into breast milk. For this reason codeine is not recommended for breastfeeding mothers or for children under 12.'},
{sec:'found-metab',type:'saq',q:'Which substance in liver cells normally makes the toxic paracetamol metabolite NAPQI safe?',acc:['glutathione'],m:'Glutathione',
 e:'Glutathione binds NAPQI. In overdose it is used up, and NAPQI then damages liver cells. Acetylcysteine provides cysteine for making new glutathione.'},
{sec:'found-metab',type:'sba',q:'In phase II drug metabolism, what usually happens?',
 o:['A large water-soluble group such as glucuronic acid is attached to the drug','The drug is oxidised by cytochrome P450','The drug is reabsorbed from the gut','The drug is bound to albumin','The drug is activated from a prodrug'],a:0,
 e:'Phase II reactions are conjugations (glucuronidation, sulfation, acetylation, glutathione conjugation). They make the molecule larger, more water-soluble and usually inactive, ready for excretion in urine or bile. Oxidation by cytochrome P450 is phase I.'}
]};
})();
