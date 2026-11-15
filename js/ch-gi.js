/* Gastrointestinal biomed. Data-driven chapter: see "DATA-DRIVEN CHAPTERS" in app.js for the block types. */
window.CHAPTERS=window.CHAPTERS||{};
(function(){
const LD='stroke="var(--line-2)" fill="none"';
const lab=(y,a,b)=>`<text x="404" y="${y}" class="lab b">${a}</text><text x="404" y="${y+16}" class="sm">${b}</text>`;
const cell=(k,c,r,a,b,o)=>{const x=80+c*120,y=30+r*100,cx=x+60,cy=y+50;
  return `<g data-k="${k}"><rect x="${x}" y="${y}" width="120" height="100" class="n-box"/><text x="${cx}" y="${cy-(b?14:6)}" class="sm lab b" text-anchor="middle">${a}</text>${b?`<text x="${cx}" y="${cy+1}" class="sm lab b" text-anchor="middle">${b}</text>`:''}<text x="${cx}" y="${cy+(b?22:16)}" class="sm" text-anchor="middle">${o}</text></g>`;};
const jbox=(x,w,a,b,c)=>`<rect x="${x}" y="60" width="${w}" height="50" rx="9" class="${c||'n-box'}"/><text x="${x+w/2}" y="81" class="sm lab b" text-anchor="middle">${a}</text><text x="${x+w/2}" y="97" class="sm" text-anchor="middle">${b}</text>`;
const jhit=(x,w,t,r)=>`<rect x="${x-4}" y="56" width="${w+8}" height="58" rx="11" style="fill:none;stroke:var(--inhib);stroke-width:3"/><text x="${x+w/2}" y="44" class="sm b t-inh" text-anchor="middle">${t}</text><text x="360" y="282" class="b" text-anchor="middle">${r}</text>`;

CHAPTERS.gi={
short:'Gastrointestinal',eyebrow:'Gastrointestinal biomed',h1:'From mouth to portal vein',
blurb:'Gut wall and nerves, motility and vomiting, acid secretion and ulcers, the liver and jaundice, bile and pancreas, digestion and absorption, the bowel and its diseases, gut infections.',
lede:'The gut is a tube with one job, repeated in stages: break food down, absorb what is useful, and keep the outside world (acid, enzymes, bacteria) from getting in. Each region has its own secretions, its own control system and its own way of failing.',
secs:[
/* ------------------------------------------------------------------ */
{id:'gi-wall',eb:'Structure',h:'The gut wall, its nerves and its blood supply',p:'From oesophagus to anus the wall has the same four layers. The embryo\'s three gut regions (foregut, midgut, hindgut) explain which artery supplies each part and where its pain is felt.',b:[
 ['explore','dg-gutwall','The four layers of the gut wall','A cross-section, from the outside in. Tap a layer.',620,
  `<svg viewBox="0 0 720 340" role="img" aria-label="Cross-section of the gut wall showing its layers">
   <g data-k="serosa"><circle cx="190" cy="170" r="152" class="n-box"/><path d="M286,56 L398,46" ${LD}/>${lab(46,'Serosa','visceral peritoneum')}</g>
   <g data-k="long"><circle cx="190" cy="170" r="146" class="n-musc"/><path d="M310,101 L398,98" ${LD}/>${lab(96,'Longitudinal muscle','shortens the gut')}</g>
   <g data-k="myenteric"><circle cx="190" cy="170" r="130" style="fill:var(--nerve-tint);stroke:var(--nerve);stroke-width:1.4;stroke-dasharray:4 3"/><path d="M316,150 L398,148" ${LD}/>${lab(146,'Myenteric plexus','nerve net that drives movement')}</g>
   <g data-k="circ"><circle cx="190" cy="170" r="124" style="fill:color-mix(in srgb,var(--muscle) 26%,var(--paper));stroke:var(--muscle);stroke-width:1.4"/><path d="M300,197 L398,198" ${LD}/>${lab(196,'Circular muscle','squeezes; thickens into sphincters')}</g>
   <g data-k="submucosa"><circle cx="190" cy="170" r="102" class="n-imm"/><g fill="var(--nerve)"><circle cx="280" cy="170" r="3.5"/><circle cx="190" cy="80" r="3.5"/><circle cx="100" cy="170" r="3.5"/><circle cx="190" cy="260" r="3.5"/><circle cx="254" cy="106" r="3.5"/><circle cx="126" cy="106" r="3.5"/><circle cx="126" cy="234" r="3.5"/></g><path d="M263,223 L398,248" ${LD}/>${lab(246,'Submucosa','vessels, lymphatics, submucosal plexus')}</g>
   <g data-k="mucosa"><circle cx="190" cy="170" r="78" class="n-org"/><circle cx="190" cy="170" r="42" style="fill:var(--bone-art);stroke:var(--line-2)"/><text x="190" y="174" class="sm" text-anchor="middle">lumen</text><path d="M220,222 L398,298" ${LD}/>${lab(296,'Mucosa','epithelium, lamina propria, muscularis mucosae')}</g>
  </svg>`,
  {mucosa:['Mucosa','Three parts. The <b>epithelium</b> does the secreting and absorbing; its type changes along the gut. The <b>lamina propria</b> is loose connective tissue with capillaries, lymphatics and immune cells (Peyer\'s patches in the ileum). The <b>muscularis mucosae</b> is a thin muscle layer that ruffles the surface. A cancer that has not crossed the muscularis mucosae has not yet invaded.'],
   submucosa:['Submucosa','Dense connective tissue carrying the larger blood vessels and lymphatics, and glands in the oesophagus and duodenum (Brunner\'s glands, which secrete alkaline mucus). It contains the <b>submucosal (Meissner\'s) plexus</b>, which controls <b>secretion and local blood flow</b>.'],
   circ:['Circular muscle','The inner layer of the muscularis externa. Contracting it narrows the lumen, which mixes and propels the contents. It thickens to form the <b>sphincters</b>: lower oesophageal, pyloric, ileocaecal, internal anal. The stomach has an extra, innermost oblique layer for churning.'],
   myenteric:['Myenteric (Auerbach\'s) plexus','A net of neurons between the two muscle layers that controls <b>motility</b>. With the submucosal plexus it makes up the <b>enteric nervous system</b>, the "second brain": about as many neurons as the spinal cord, able to run peristalsis with no outside input. Where its ganglion cells are missing the bowel cannot relax: <b>Hirschsprung\'s disease</b> (colon) and <b>achalasia</b> (lower oesophagus).'],
   long:['Longitudinal muscle','The outer muscle layer. Contracting it shortens the segment ahead of a bolus. In the colon it is gathered into three bands, the <b>taeniae coli</b>, which bunch the colon into haustra.'],
   serosa:['Serosa (or adventitia)','Where the gut lies inside the peritoneal cavity, its outer coat is visceral peritoneum: smooth, slippery, and insensitive to cutting but sensitive to stretch. Retroperitoneal parts (oesophagus, most of the duodenum, ascending and descending colon, rectum) have a fibrous <b>adventitia</b> instead, which lets tumours spread more easily into neighbouring structures.']}],
 ['table',['','Foregut','Midgut','Hindgut'],[
  ['Runs from','Lower oesophagus to the middle of the duodenum (where the bile duct enters); also liver, gallbladder, pancreas, spleen','Middle of the duodenum to two thirds of the way along the transverse colon','Last third of the transverse colon to the upper anal canal'],
  ['Artery','Coeliac trunk (T12)','Superior mesenteric artery (L1)','Inferior mesenteric artery (L3)'],
  ['Parasympathetic supply','Vagus','Vagus','Pelvic splanchnic nerves (S2 to S4)'],
  ['Where visceral pain is felt','<b>Epigastrium</b>','<b>Around the umbilicus</b>','<b>Suprapubic region</b>'],
  ['Venous drainage','Portal vein','Portal vein','Portal vein']]],
 ['explore','dg-regions','Nine regions of the abdomen','Where pain is felt narrows down the organ. The patient\'s right is on your left. Tap a region.',420,
  `<svg viewBox="0 0 520 360" role="img" aria-label="The nine regions of the abdomen">
   <text x="44" y="180" class="sm" text-anchor="middle" transform="rotate(-90 44 180)">patient's right</text><text x="476" y="180" class="sm" text-anchor="middle" transform="rotate(90 476 180)">patient's left</text>
   ${cell('rh',0,0,'right','hypochondrium','liver, gallbladder')}${cell('epi',1,0,'epigastrium','','stomach, pancreas')}${cell('lh',2,0,'left','hypochondrium','spleen')}
   ${cell('rl',0,1,'right flank','','kidney, colon')}${cell('umb',1,1,'umbilical','','small bowel')}${cell('ll',2,1,'left flank','','kidney, colon')}
   ${cell('rif',0,2,'right iliac','fossa','appendix')}${cell('sp',1,2,'suprapubic','','bladder, uterus')}${cell('lif',2,2,'left iliac','fossa','sigmoid colon')}
  </svg>`,
  {rh:['Right hypochondrium','<b>Gallbladder</b> (biliary colic, cholecystitis: pain may spread to the right shoulder tip) and <b>liver</b> (hepatitis, congestion, abscess). Also the hepatic flexure of the colon, and pneumonia at the base of the right lung.'],
   epi:['Epigastrium','Where <b>foregut</b> pain is felt. <b>Stomach and duodenum</b> (gastritis, peptic ulcer), <b>pancreas</b> (pancreatitis: bores through to the back, eased by sitting forward), <b>oesophagus</b> (reflux). Never forget the heart (inferior heart attack) and a leaking aortic aneurysm.'],
   lh:['Left hypochondrium','<b>Spleen</b> (rupture after trauma, infarct; blood under the diaphragm refers pain to the left shoulder tip), stomach, tail of the pancreas, splenic flexure of the colon.'],
   rl:['Right flank','<b>Kidney</b> (pyelonephritis; a stone gives pain from loin to groin) and the ascending colon.'],
   umb:['Umbilical region','Where <b>midgut</b> pain is felt. <b>Small bowel</b> (obstruction, gastroenteritis), the <b>first hours of appendicitis</b>, mesenteric ischaemia (severe pain with little to find on examination), and aortic aneurysm.'],
   ll:['Left flank','Left <b>kidney</b> and the descending colon.'],
   rif:['Right iliac fossa','<b>Appendicitis</b> (once the peritoneum over the appendix is inflamed), <b>Crohn\'s disease</b> of the terminal ileum, cancer of the caecum, Meckel\'s diverticulum. In women: ovarian cyst or torsion, ectopic pregnancy, pelvic infection. In men: remember the testis (torsion).'],
   sp:['Suprapubic region','Where <b>hindgut</b> pain is felt. <b>Bladder</b> (cystitis, retention), <b>uterus</b> and tubes, and the colon.'],
   lif:['Left iliac fossa','<b>Diverticulitis</b> of the sigmoid colon ("left-sided appendicitis" of older people), constipation, ulcerative colitis, sigmoid volvulus; ovarian and tubal disease in women.']}],
 ['cards',[
  ['The enteric nervous system',['Two plexuses: <b>myenteric</b> (between the muscle layers: motility) and <b>submucosal</b> (secretion and blood flow).','<b>Short reflexes</b> stay within the gut wall: stretch or chemicals in the lumen trigger local contraction and secretion.','<b>Long reflexes</b> go through the brain or spinal cord. <b>Parasympathetic</b> (vagus; pelvic nerves for the hindgut) <b>speeds things up</b>: more motility and secretion, sphincters relax. <b>Sympathetic</b> (splanchnic nerves) <b>slows the gut</b> and closes sphincters.','<b>Interstitial cells of Cajal</b> are the pacemakers: they set a slow wave rhythm (3 a minute in the stomach, 12 in the duodenum, 8 in the ileum).','Serotonin (5-HT) from enterochromaffin cells is the main local signal for peristalsis and for nausea.']],
  ['Epithelium along the tube',['<b>Oesophagus:</b> stratified squamous, non-keratinised: built for abrasion.','<b>Stomach:</b> simple columnar, with gastric pits and glands.','<b>Small intestine:</b> simple columnar with <b>villi</b> and microvilli; goblet cells increase towards the ileum.','<b>Colon:</b> simple columnar with crypts and many goblet cells, but <b>no villi</b>.','<b>Anal canal below the pectinate line:</b> stratified squamous.','<b>Barrett\'s oesophagus:</b> acid reflux changes the lower oesophagus from squamous to columnar (metaplasia), raising the risk of adenocarcinoma.']]]],
 ['table',['The anal canal','Above the pectinate line','Below the pectinate line'],[
  ['Origin','Endoderm (hindgut)','Ectoderm'],
  ['Epithelium, and its cancer','Columnar: adenocarcinoma','Squamous: squamous cell carcinoma'],
  ['Artery','Superior rectal (from the inferior mesenteric)','Inferior rectal (from the internal pudendal)'],
  ['Veins','Superior rectal → <b>portal</b> system','Inferior rectal → <b>systemic</b> veins'],
  ['Lymph','Internal iliac nodes','Superficial inguinal nodes'],
  ['Nerves and pain','Visceral: <b>painless</b> (internal haemorrhoids)','Somatic (pudendal nerve): <b>painful</b> (external haemorrhoids, fissures)']]],
 ['notes',
  ['exam','Visceral pain is dull, poorly localised and felt in the midline, at the level of the gut region\'s embryonic origin. Once inflammation reaches the <b>parietal peritoneum</b> the pain becomes sharp and localised over the organ. Appendicitis shows both in sequence.'],
  ['fix','GI deck · enteric nervous system and epithelium','The slide labels the submucosal plexus "symp" and the myenteric plexus "PS". Both plexuses receive <b>both</b> sympathetic and parasympathetic input; they differ in what they control (secretion versus motility). The epithelium slide gives the colon villi: only the small intestine has villi. And the large intestine slide says "supplied by IMA": the caecum, ascending colon and most of the transverse colon are midgut, supplied by the <b>superior</b> mesenteric artery.']]
]},
/* ------------------------------------------------------------------ */
{id:'gi-motility',eb:'Movement',h:'Saliva, swallowing, motility and vomiting',p:'Food is moved by three patterns of muscle activity: peristalsis to propel, segmentation to mix, and a housekeeping wave between meals. Vomiting is the same machinery run in reverse, under orders from the brainstem.',b:[
 ['cards',[
  ['Saliva',['About 1 to 1.5 L a day, from the parotid (watery), submandibular (most of the resting flow) and sublingual (mucous) glands.','<b>Control is entirely nervous.</b> Parasympathetic (facial and glossopharyngeal nerves): copious, watery saliva. Sympathetic: a small volume of thick saliva (the dry mouth of fear).','<b>Contents:</b> water and mucus (lubrication), <b>amylase</b> (starts starch digestion), lingual lipase, bicarbonate (protects teeth), IgA and lysozyme (antibacterial).','<b>Dry mouth:</b> antimuscarinic drugs, dehydration, radiotherapy, Sjögren\'s syndrome: tooth decay and difficulty swallowing.','<b>Salivary stones</b> form mostly in the submandibular duct: pain and swelling at mealtimes.']],
  ['Three patterns of movement',['<b>Peristalsis:</b> circular muscle contracts behind the bolus and relaxes ahead of it; a travelling wave that propels. Primary peristalsis follows a swallow; secondary peristalsis is triggered by anything left stretching the oesophagus.','<b>Segmentation:</b> alternating rings of contraction chop and mix the contents with enzymes and bring them into contact with the wall. The main pattern in the small intestine after a meal.','<b>Migrating motor complex:</b> during fasting, a strong wave sweeps from stomach to terminal ileum every 90 minutes or so, clearing debris and bacteria. Driven by the hormone <b>motilin</b>; it is the "rumbling" of an empty stomach. Eating stops it.','<b>Mass movements:</b> a few times a day the colon pushes its contents a long way towards the rectum, often after a meal (the gastrocolic reflex).']]]],
 ['pw','swallow','vomit'],
 ['cards',[
  ['Stomach movement and emptying',['The upper stomach <b>relaxes to receive</b> a meal without a rise in pressure (a vagal reflex).','Waves of contraction push food towards a closed pylorus; most is thrown back (<b>retropulsion</b>), grinding it into chyme.','Only small squirts of fine chyme pass the pylorus with each wave.','<b>Emptying is slowed</b> by fat, acid, protein, and concentrated chyme in the duodenum: the <b>enterogastric reflex</b> and the hormones CCK, secretin and GIP. This matches delivery to the duodenum\'s ability to digest.','Liquids empty faster than solids; carbohydrate faster than protein; fat slowest.','<b>Gastroparesis</b> (slow emptying): diabetic autonomic neuropathy, opioids. Prokinetic drugs: metoclopramide, domperidone, erythromycin (which mimics motilin).']],
  ['What triggers vomiting',['The <b>vomiting centre</b> in the medulla coordinates the act. It takes input from four places.','<b>The gut:</b> irritation or over-stretching, signalled by vagal afferents and serotonin (5-HT₃).','<b>The chemoreceptor trigger zone</b> (area postrema, floor of the fourth ventricle): it lies <b>outside the blood–brain barrier</b>, so it samples the blood for drugs and toxins (opioids, chemotherapy, uraemia). Dopamine D₂ and 5-HT₃ receptors.','<b>The vestibular system:</b> motion sickness and vertigo. Histamine H₁ and muscarinic receptors.','<b>Higher centres:</b> smells, sights, fear, pain, raised intracranial pressure.']]]],
 ['table',['Anti-emetic class','Examples','Blocks','Best for','Watch for'],[
  ['Antihistamine','Cyclizine','H₁ receptors (vestibular system and vomiting centre)','Most causes; motion sickness, pregnancy, after surgery','Drowsiness, dry mouth'],
  ['Antimuscarinic','Hyoscine','Muscarinic receptors','Motion sickness; secretions in palliative care','Dry mouth, blurred vision, retention, confusion'],
  ['5-HT₃ antagonist','Ondansetron','5-HT₃ receptors in the gut and trigger zone','Chemotherapy; after surgery','Constipation, long QT'],
  ['Dopamine antagonist','Metoclopramide, domperidone, prochlorperazine','D₂ receptors in the trigger zone; metoclopramide and domperidone also speed gastric emptying','Drug-induced nausea, gastroparesis, migraine','Metoclopramide crosses into the brain: acute dystonia in young people, parkinsonism. Avoid in bowel obstruction'],
  ['NK₁ antagonist','Aprepitant','Substance P receptors','Delayed vomiting after chemotherapy',''],
  ['Corticosteroid','Dexamethasone','Uncertain','With ondansetron for chemotherapy','']]],
 ['notes',
  ['clin','Dysphagia: difficulty swallowing','<b>Solids first, then liquids, getting steadily worse:</b> something is narrowing the tube: cancer, or a stricture from long-standing reflux. <b>Solids and liquids together from the start:</b> a motility problem such as <b>achalasia</b>, where the myenteric neurons that relax the lower oesophageal sphincter are lost ("bird\'s beak" on a barium swallow). <b>Trouble starting a swallow, with coughing or nasal regurgitation:</b> a nerve or muscle problem (stroke, motor neurone disease). New dysphagia needs urgent endoscopy.'],
  ['clin','Complications of vomiting','Loss of acid and potassium (hypokalaemic, hypochloraemic <b>metabolic alkalosis</b>); dehydration; aspiration into the lungs; a <b>Mallory–Weiss tear</b> of the mucosa at the gastro-oesophageal junction (streaks of blood after retching); rarely, rupture of the oesophagus (Boerhaave\'s syndrome: severe chest pain, air in the mediastinum).'],
  ['fix','GI deck · vomiting slide','The slide says the fourth ventricle "houses the vomiting centre (chemoreceptor trigger zone)" as if they were one thing. The <b>chemoreceptor trigger zone</b> sits in the area postrema on the floor of the fourth ventricle, outside the blood–brain barrier. It is only one of the inputs to the <b>vomiting centre</b>, which lies deeper in the medulla. The oesophagus slide\'s "causes of haemastasis" should read haematemesis (vomiting blood).']]
]},
/* ------------------------------------------------------------------ */
{id:'gi-stomach',eb:'Secretion',h:'The stomach: acid, its control and what goes wrong',p:'The stomach stores a meal, grinds it, sterilises it with acid at pH 1 to 2 and starts protein digestion, while a layer of mucus stops it digesting itself. Ulcers are that balance tipping.',b:[
 ['table',['Cell','Where','Secretes','Notes'],[
  ['Parietal cell','Body and fundus','<b>Hydrochloric acid</b> and <b>intrinsic factor</b>','Intrinsic factor is the only stomach product essential to life: it is needed to absorb vitamin B12'],
  ['Chief cell','Body and fundus','<b>Pepsinogen</b> and gastric lipase','Acid converts pepsinogen to pepsin, which then activates more of itself'],
  ['Surface and neck mucous cells','Throughout','Mucus and bicarbonate','The protective layer; depends on prostaglandins'],
  ['Enterochromaffin-like (ECL) cell','Body','<b>Histamine</b>','The main local trigger for acid; stimulated by gastrin and the vagus'],
  ['G cell','Antrum','<b>Gastrin</b>','Released by peptides in the stomach, stretch and the vagus; switched off by acid'],
  ['D cell','Antrum and body','<b>Somatostatin</b>','The brake: released by acid, it inhibits G cells, ECL cells and parietal cells']]],
 ['explore','dg-parietal','How a parietal cell makes acid, and how drugs stop it','Three signals on the blood side switch on one pump on the stomach side. Tap a part.',640,
  `<svg viewBox="0 0 720 330" role="img" aria-label="Parietal cell: receptors, proton pump and drug targets">
   <text x="110" y="24" class="hd" text-anchor="middle">BLOOD SIDE</text><text x="630" y="24" class="hd" text-anchor="middle">STOMACH LUMEN</text>
   <rect x="228" y="34" width="292" height="276" rx="14" class="n-org"/><text x="374" y="56" class="sm b" text-anchor="middle">parietal cell</text>
   <g data-k="m3"><path d="M246,82 L494,152" class="a-stim"/><rect x="210" y="70" width="36" height="24" rx="6" class="n-nerve"/><text x="228" y="87" class="sm b" text-anchor="middle">M₃</text><text x="202" y="86" class="sm lab b" text-anchor="end">acetylcholine (vagus)</text><text x="300" y="80" class="sm">Ca²⁺</text></g>
   <g data-k="gas"><path d="M246,132 L494,160" class="a-stim"/><rect x="210" y="120" width="36" height="24" rx="6" class="n-imm"/><text x="228" y="137" class="sm b" text-anchor="middle">CCK₂</text><text x="202" y="136" class="sm lab b" text-anchor="end">gastrin (G cells)</text><text x="300" y="130" class="sm">Ca²⁺</text></g>
   <g data-k="h2"><path d="M246,182 L494,168" class="a-stim"/><rect x="210" y="170" width="36" height="24" rx="6" class="n-blood"/><text x="228" y="187" class="sm b" text-anchor="middle">H₂</text><text x="202" y="182" class="sm lab b" text-anchor="end">histamine (ECL cells)</text><text x="202" y="198" class="sm t-drug" text-anchor="end">famotidine ⊣</text><text x="300" y="196" class="sm">cAMP</text></g>
   <g data-k="inh"><path d="M246,232 L490,180" class="a-inh"/><rect x="210" y="220" width="36" height="24" rx="6" class="n-box"/><text x="228" y="237" class="sm b" text-anchor="middle">−</text><text x="202" y="232" class="sm lab b" text-anchor="end">prostaglandins,</text><text x="202" y="248" class="sm lab b" text-anchor="end">somatostatin</text></g>
   <g data-k="ca"><text x="388" y="278" class="sm lab b" text-anchor="middle">CO₂ + H₂O → H⁺ + HCO₃⁻</text><text x="388" y="294" class="sm" text-anchor="middle">carbonic anhydrase</text><path d="M300,274 L250,274" class="a-plain"/><text x="202" y="272" class="sm" text-anchor="end">HCO₃⁻ to blood,</text><text x="202" y="288" class="sm" text-anchor="end">swapped for Cl⁻</text><path d="M452,262 L500,188" class="a-plain"/></g>
   <g data-k="pump"><circle cx="520" cy="164" r="24" class="n-drug"/><text x="520" y="160" class="sm b" text-anchor="middle">H⁺/K⁺</text><text x="520" y="174" class="sm b" text-anchor="middle">pump</text><path d="M546,152 L600,152" class="a-stim"/><text x="608" y="156" class="b">H⁺</text><path d="M600,176 L548,176" class="a-plain"/><text x="608" y="180" class="sm">K⁺</text><path d="M522,236 L600,236" class="a-plain"/><text x="608" y="240" class="b">Cl⁻</text><text x="640" y="200" class="sm">= HCl, pH 1 to 2</text><text x="548" y="124" class="sm t-drug">omeprazole ⊣</text></g>
  </svg>`,
  {m3:['Acetylcholine: the nervous signal','The <b>vagus</b> releases acetylcholine onto <b>M₃ receptors</b> (G<sub>q</sub>, calcium rises). It also makes ECL cells release histamine and G cells release gastrin, so cutting the vagus (vagotomy) was once an operation for ulcers. It is the trigger in the <b>cephalic phase</b>: the sight, smell and taste of food.'],
   gas:['Gastrin: the hormonal signal','Released from antral <b>G cells</b> by peptides and amino acids in the stomach, stretch, and the vagus. It acts on <b>CCK₂ receptors</b> on the parietal cell, but its main effect is to make <b>ECL cells release histamine</b>. Acid in the antrum switches it off through somatostatin. A gastrin-secreting tumour (Zollinger–Ellison syndrome) causes severe, recurrent ulcers.'],
   h2:['Histamine: the local signal','Released by <b>ECL cells</b> next door and acting on <b>H₂ receptors</b> (G<sub>s</sub>, cAMP rises). It is the common final pathway for gastrin and much of the vagal effect, which is why <b>H₂ blockers</b> (famotidine; ranitidine was withdrawn) cut acid from all three triggers, though less completely than a proton pump inhibitor.'],
   inh:['The brakes','<b>Somatostatin</b> from D cells (released when the stomach is acid) and <b>prostaglandins</b> lower cAMP and reduce acid. Prostaglandins also drive the mucus and bicarbonate barrier and keep mucosal blood flow up. <b>NSAIDs</b> block prostaglandin synthesis: more acid, less protection. Misoprostol is a prostaglandin analogue that puts the protection back.'],
   ca:['Where the acid comes from','<b>Carbonic anhydrase</b> makes H⁺ and bicarbonate from CO₂ and water. The H⁺ goes to the pump. The bicarbonate leaves on the blood side in exchange for chloride: after a meal the blood leaving the stomach is slightly alkaline (the "alkaline tide"). Persistent vomiting loses the acid and keeps the bicarbonate: a metabolic alkalosis.'],
   pump:['The proton pump','The <b>H⁺/K⁺-ATPase</b> pushes H⁺ into the lumen in exchange for potassium, against a million-fold gradient. Chloride follows through its own channel, and potassium recycles. All three triggers work by putting more pumps into the membrane. <b>Proton pump inhibitors</b> (omeprazole, lansoprazole) bind the pump <b>irreversibly</b>, so acid returns only as new pumps are made: one dose a day lasts. They need acid to be activated, so are taken before food.']}],
 ['pw','hcl'],
 ['flow',[
  ['Cephalic phase (about 30% of acid)','Before food arrives. Sight, smell, taste and chewing act through the <b>vagus</b>: acetylcholine stimulates parietal cells directly, and releases gastrin and histamine.'],
  ['Gastric phase (about 60%)','Food in the stomach. <b>Stretch</b> triggers local and vagal reflexes; <b>peptides and amino acids</b> release gastrin. Food also buffers the acid, lifting the brake on gastrin.'],
  ['Intestinal phase (about 10%, then inhibitory)','Chyme in the duodenum. A little stimulation at first, then <b>inhibition</b>: acid releases <b>secretin</b>, fat and protein release <b>CCK</b> and GIP, and stretch triggers the <b>enterogastric reflex</b>. Acid secretion and emptying both slow.']]],
 ['table',['Hormone','Made by','Released by','Main actions'],[
  ['Gastrin','G cells, antrum','Peptides, stretch, vagus','More acid (through histamine), pepsinogen and intrinsic factor; growth of the gastric mucosa'],
  ['Cholecystokinin (CCK)','I cells, duodenum and jejunum','Fat and protein','Gallbladder contracts, sphincter of Oddi relaxes; pancreatic <b>enzymes</b>; slows gastric emptying; feeling of fullness'],
  ['Secretin','S cells, duodenum','<b>Acid</b>','Bicarbonate-rich fluid from pancreatic and bile ducts; less gastric acid'],
  ['Somatostatin','D cells, stomach, gut and pancreas','Acid in the stomach','Inhibits almost everything: acid, gastrin, pancreatic secretion, insulin and glucagon. Octreotide is the drug form'],
  ['GIP','K cells, duodenum','Glucose and fat','Insulin release (an incretin); less acid'],
  ['GLP-1','L cells, ileum and colon','Nutrients','Insulin release, slower emptying, less appetite. Semaglutide copies it'],
  ['Motilin','M cells, upper small intestine','Fasting','The migrating motor complex'],
  ['Ghrelin','Stomach','Fasting','Hunger'],
  ['Leptin','Fat cells','Fat stores','Fullness']]],
 ['cards',[
  ['Reflux (GORD)',['The lower oesophageal sphincter relaxes at the wrong times, letting acid back up.','<b>Symptoms:</b> heartburn after meals and on lying down or bending, acid taste, night cough.','<b>Made worse by:</b> obesity, pregnancy, hiatus hernia, smoking, alcohol, fatty meals, and drugs that relax the sphincter (calcium channel blockers, nitrates).','<b>Treatment:</b> weight loss, smaller and earlier evening meals, raising the bed head; alginates and antacids; a <b>proton pump inhibitor</b> for 4 to 8 weeks.','<b>Complications:</b> oesophagitis, stricture, Barrett\'s oesophagus, adenocarcinoma.','<b>Red flags</b> needing urgent endoscopy: difficulty swallowing, weight loss, vomiting blood, anaemia, age 55 or over with new symptoms.']],
  ['Peptic ulcers and <i>Helicobacter pylori</i>',['An ulcer is a break through the muscularis mucosae. Two causes explain nearly all: <b><i>H. pylori</i></b> and <b>NSAIDs</b>.','<b>Duodenal ulcer</b> (commoner): pain when hungry and at night, <b>relieved by eating</b>. <b>Gastric ulcer:</b> pain <b>worse with eating</b>, weight loss; must be biopsied to exclude cancer.','<b><i>H. pylori</i></b> is a spiral Gram-negative rod that survives in mucus by making <b>urease</b> (urea → ammonia, which neutralises acid around it).','<b>Tests:</b> stool antigen or urea breath test (stop the PPI for 2 weeks first).','<b>Eradication:</b> a PPI + amoxicillin + clarithromycin or metronidazole, twice daily for 7 days.','<b>Bleeding:</b> a posterior duodenal ulcer erodes the <b>gastroduodenal artery</b>: vomiting blood, black tarry stools. <b>Perforation:</b> an anterior ulcer bursts into the peritoneum: sudden rigid abdomen, air under the diaphragm on X-ray.','<i>H. pylori</i> also raises the risk of stomach cancer and MALT lymphoma.']]]],
 ['table',['Acid drug','Example','How it works','Notes'],[
  ['Proton pump inhibitor','Omeprazole, lansoprazole','Irreversibly blocks the H⁺/K⁺-ATPase','The most effective. Long-term: low magnesium, <i>C. difficile</i> infection, fractures, B12 deficiency. Given with NSAIDs for protection'],
  ['H₂ receptor antagonist','Famotidine','Blocks histamine H₂ receptors on parietal cells','When a PPI is not suitable'],
  ['Antacid','Aluminium hydroxide, magnesium salts','Neutralises acid already in the stomach','Quick, short relief. Aluminium constipates, magnesium loosens'],
  ['Alginate','Gaviscon','Forms a raft that floats on the stomach contents','Reflux, including in pregnancy'],
  ['Prostaglandin analogue','Misoprostol','Replaces the protective prostaglandin: more mucus, less acid','Diarrhoea; causes miscarriage, so not in pregnancy']]],
 ['notes',
  ['think','A battery acid tank with a rubber lining. The acid is needed; the lining (mucus, bicarbonate, tight junctions, good blood flow) is what keeps the tank intact. <i>H. pylori</i> and NSAIDs do not add acid so much as damage the lining.'],
  ['fix','GI deck · gastric acid slides','"H₂ antagonists inhibit histamine production" should read: they <b>block the H₂ receptor</b>; histamine is still released. The example given, ranitidine, has been withdrawn in the UK; famotidine is used. The stomach\'s mucus comes from <b>surface and neck mucous cells</b>, not goblet cells (goblet cells in the stomach are a sign of metaplasia). <i>H. pylori</i> is not treated with "either clarithromycin or metronidazole": it needs triple therapy with a PPI and <b>two</b> antibiotics. And it is a posterior duodenal ulcer that <b>erodes</b> the gastroduodenal artery (bleeding); it is the bowel wall, not the artery, that perforates.']]
]},
/* ------------------------------------------------------------------ */
{id:'gi-liver',eb:'Liver',h:'The liver, bilirubin and jaundice',p:'Everything absorbed from the gut passes through the liver first. It stores and releases fuel, makes plasma proteins and bile, and makes drugs and waste products water-soluble so they can be excreted.',b:[
 ['cards',[
  ['Blood in, bile out',['<b>Two blood supplies:</b> the <b>portal vein</b> (about 75%: nutrient-rich, low in oxygen, from gut and spleen) and the <b>hepatic artery</b> (25%: oxygen-rich).','They mix in the <b>sinusoids</b>, leaky capillaries that run between plates of hepatocytes to a <b>central vein</b>, then the hepatic veins and inferior vena cava.','<b>Bile flows the other way</b>, in canaliculi between hepatocytes, to the bile ducts.','A <b>portal triad</b> at each corner of a lobule holds a branch of the portal vein, the hepatic artery and a bile duct.','<b>Zone 1</b> (next to the triad) gets the best oxygen. <b>Zone 3</b> (around the central vein) gets the least and holds most of the cytochrome P450: it is hit first by low blood pressure and by <b>paracetamol overdose</b>.']],
  ['Cells of the liver',['<b>Hepatocytes:</b> metabolism, protein synthesis, bile production, detoxification.','<b>Kupffer cells:</b> resident macrophages in the sinusoids; remove bacteria from portal blood and old red cells.','<b>Stellate cells</b> (in the space of Disse): store vitamin A. When the liver is injured they turn into scar-making cells: the cause of <b>fibrosis and cirrhosis</b>.','<b>Sinusoidal endothelial cells:</b> full of holes, so plasma reaches the hepatocytes directly.']],
  ['What the liver does',['<b>Carbohydrate:</b> stores glucose as glycogen after meals; releases it between meals (glycogenolysis), and makes new glucose from lactate, amino acids and glycerol (gluconeogenesis).','<b>Protein:</b> makes albumin, clotting factors, transport proteins; turns ammonia into <b>urea</b>.','<b>Fat:</b> makes cholesterol, lipoproteins and ketones.','<b>Bile:</b> bile salts for fat digestion; excretion of bilirubin and cholesterol.','<b>Detoxification:</b> drugs, alcohol, hormones (including oestrogen and aldosterone).','<b>Storage:</b> glycogen, iron, copper, vitamins A, D, B12.','<b>Immune:</b> Kupffer cells; acute phase proteins such as CRP.']],
  ['Liver function tests',['<b>ALT and AST:</b> enzymes inside hepatocytes. Raised = <b>liver cell injury</b> (hepatitis). In the thousands: viral hepatitis, paracetamol, ischaemia. <b>AST more than twice ALT</b> suggests alcohol.','<b>ALP:</b> from the cells lining bile ducts (and from bone and placenta). Raised with GGT = <b>cholestasis</b> (blocked bile flow). Raised alone with a normal GGT = bone (Paget\'s disease, metastases, healing fracture, vitamin D deficiency, growing children) or pregnancy.','<b>GGT:</b> raised in cholestasis and by alcohol and enzyme-inducing drugs.','<b>Bilirubin:</b> see below.','<b>Albumin</b> and <b>prothrombin time</b> measure what the liver <b>makes</b>. The prothrombin time changes within a day or two, so it is the best guide to how badly an acutely sick liver is failing.']]]],
 ['pw','bilirubin'],
 ['sw','dg-jaundice','Jaundice: where is the fault?','Jaundice is a bilirubin above about 50 µmol/L, seen first in the whites of the eyes. Choose a type.',640,
  `<svg viewBox="0 0 720 300" role="img" aria-label="Bilirubin pathway and the three types of jaundice">
   ${jbox(20,140,'Old red cells','broken down in the spleen','n-blood')}${jbox(195,150,'Unconjugated bilirubin','carried on albumin')}${jbox(380,140,'Liver conjugates it','now water-soluble','n-org')}${jbox(555,145,'Bile duct to gut','conjugated bilirubin')}
   <path d="M162,85 H192 M347,85 H377 M522,85 H552" class="a-plain"/>
   <path d="M627,112 V150" class="a-plain"/><rect x="555" y="152" width="145" height="46" rx="9" class="n-box"/><text x="627" y="171" class="sm lab b" text-anchor="middle">Gut bacteria make</text><text x="627" y="187" class="sm lab b" text-anchor="middle">urobilinogen</text>
   <path d="M627,200 V226" class="a-plain"/><text x="627" y="244" class="sm" text-anchor="middle">stercobilin: brown stool</text>
   <path d="M553,175 H472" class="a-plain"/><rect x="326" y="152" width="144" height="46" rx="9" class="n-box"/><text x="398" y="171" class="sm lab b" text-anchor="middle">A little is reabsorbed</text><text x="398" y="187" class="sm" text-anchor="middle">and reaches the urine</text>
   <g data-v="normal"><text x="360" y="282" class="b" text-anchor="middle">bilirubin under 21 µmol/L · brown stool · pale yellow urine</text></g>
   <g data-v="pre">${jhit(20,140,'too many red cells destroyed','unconjugated ↑ · urine normal colour · stool normal or dark')}</g>
   <g data-v="hep">${jhit(380,140,'sick liver cells','both forms ↑ · dark urine · ALT and AST ↑↑')}</g>
   <g data-v="post">${jhit(555,145,'blocked bile duct','conjugated ↑ · dark urine · pale stool · itching · ALP and GGT ↑↑')}</g>
  </svg>`,
  [['normal','Normal','<b>Normal.</b> About 250 mg of bilirubin is made each day from the haem of old red cells. It is carried to the liver on albumin, conjugated, excreted in bile and converted by gut bacteria into the pigments that colour stool brown and urine yellow.'],
   ['pre','Pre-hepatic','<b>Pre-hepatic jaundice.</b> More bilirubin is made than the liver can conjugate: <b>haemolysis</b> (sickle cell disease, spherocytosis, malaria, autoimmune). The excess is <b>unconjugated</b>: bound to albumin, it cannot enter urine, so the urine is not dark. Liver enzymes are normal; reticulocytes and LDH are raised. <b>Gilbert\'s syndrome</b> behaves the same way: a mild, harmless lack of the conjugating enzyme, giving slight jaundice when fasting or unwell.'],
   ['hep','Hepatic','<b>Hepatic jaundice.</b> Damaged liver cells neither conjugate nor excrete properly, so both forms rise. Causes: viral hepatitis, alcohol, paracetamol and other drugs, autoimmune hepatitis, cirrhosis. ALT and AST are high. Urine is dark because conjugated bilirubin leaks back into blood and is filtered.'],
   ['post','Post-hepatic (obstructive)','<b>Post-hepatic jaundice.</b> Bile cannot reach the gut: <b>gallstones in the common bile duct</b>, cancer of the head of the pancreas, cholangiocarcinoma, strictures. Conjugated bilirubin backs up into the blood and spills into urine (<b>dark urine</b>); none reaches the gut (<b>pale stools</b>); bile salts in the skin cause <b>itching</b>. ALP and GGT are high. Painless jaundice with a palpable gallbladder is unlikely to be stones (Courvoisier\'s law): think pancreatic cancer.']]],
 ['pw','portalht'],
 ['table',['Sign of chronic liver disease','Why it happens'],[
  ['Jaundice','Bilirubin is not conjugated or excreted'],
  ['Easy bruising and bleeding','Fewer clotting factors (prothrombin time rises); low platelets from a large spleen'],
  ['Ankle swelling and <b>ascites</b>','Low albumin, portal hypertension, and salt retention from high aldosterone'],
  ['Spider naevi, palmar erythema, breast enlargement and small testes in men','Oestrogen is not broken down'],
  ['Confusion, drowsiness, flapping tremor (<b>hepatic encephalopathy</b>)','Ammonia from the gut is not turned into urea and reaches the brain. Set off by constipation, bleeding into the gut, infection, sedatives. Treated with <b>lactulose</b> and rifaximin'],
  ['Vomiting blood','Oesophageal <b>varices</b> from portal hypertension'],
  ['Enlarged spleen, veins radiating from the umbilicus (caput medusae)','Portal hypertension'],
  ['Infection of ascitic fluid (spontaneous bacterial peritonitis)','Gut bacteria cross into protein-poor ascites; fever, pain, or just getting worse. Diagnosed by a neutrophil count above 250 per mm³ in the fluid']]],
 ['cards',[
  ['Where portal and systemic veins meet',['When portal pressure rises, blood finds its way back to the heart through connections that are normally tiny.','<b>Lower oesophagus:</b> left gastric vein ↔ azygos system: <b>oesophageal varices</b>, which can bleed torrentially.','<b>Anal canal:</b> superior rectal ↔ inferior rectal veins: rectal varices.','<b>Umbilicus:</b> paraumbilical ↔ superficial abdominal veins: caput medusae.','<b>Retroperitoneum:</b> colic veins ↔ body wall veins.','A bleeding varix is treated with resuscitation, terlipressin, antibiotics and endoscopic banding; propranolol lowers portal pressure to prevent bleeds.']],
  ['Causes of cirrhosis and hepatitis',['<b>Alcohol.</b>','<b>Metabolic-associated fatty liver disease</b> (obesity, type 2 diabetes): now the commonest cause of abnormal liver tests.','<b>Viral hepatitis:</b> B and C cause chronic disease and liver cancer; A and E are spread by the faecal–oral route and are short-lived.','<b>Autoimmune:</b> autoimmune hepatitis, primary biliary cholangitis (anti-mitochondrial antibodies), primary sclerosing cholangitis (linked with ulcerative colitis).','<b>Inherited:</b> haemochromatosis (iron), Wilson\'s disease (copper), α₁-antitrypsin deficiency.','<b>Drugs:</b> paracetamol overdose (treated with acetylcysteine), methotrexate, amiodarone.']]]],
 ['notes',
  ['clin','First-pass metabolism','Drugs absorbed from the gut go through the portal vein to the liver before reaching the rest of the body, and some are largely destroyed on the way. That is why GTN is given under the tongue, why oral morphine doses are much larger than injected ones, and why doses must be reduced in liver disease. Veins from the mouth and the lower rectum bypass the liver.'],
  ['fix','GI deck · bilirubin and liver function slides','<b>Gilbert\'s syndrome</b> is described as "raised mixed bilirubin": it raises <b>unconjugated</b> bilirubin only, with otherwise normal liver tests, and needs no treatment. The note that the liver can make glucose "from fatty acids" is wrong: gluconeogenesis uses lactate, amino acids and glycerol; fatty acids cannot be converted to glucose. An isolated ALP rise is attributed to "pituitary tumours": the causes are bone disease, growth and pregnancy. "1972" on the clotting slide is a memory aid for the vitamin K-dependent factors: <b>10, 9, 7 and 2</b>.']]
]},
/* ------------------------------------------------------------------ */
{id:'gi-biliary',eb:'Liver',h:'Bile, gallstones and the pancreas',p:'Two glands empty into the duodenum through one opening. Bile brings detergent for fat; pancreatic juice brings the enzymes and the alkali. A gallstone stuck at the shared exit can upset both.',b:[
 ['pw','bileflow'],
 ['cards',[
  ['Bile',['The liver makes about 600 mL a day; the gallbladder stores it between meals and concentrates it five to ten times.','<b>Bile salts</b> (made from cholesterol): detergents with a fat-loving and a water-loving side. They <b>emulsify</b> fat and form <b>micelles</b>.','<b>Phospholipid (lecithin)</b> and <b>cholesterol</b>: cholesterol is excreted this way, kept in solution by bile salts and lecithin.','<b>Bilirubin:</b> a waste pigment, not a digestive agent.','<b>Bicarbonate-rich fluid</b> from the bile ducts, stimulated by secretin.','<b>Enterohepatic circulation:</b> 95% of bile salts are reabsorbed in the <b>terminal ileum</b> and returned to the liver, so each is reused several times per meal.','<b>CCK</b>, released by fat in the duodenum, contracts the gallbladder and relaxes the sphincter of Oddi.']],
  ['Gallstones',['Found in about 1 in 10 adults; most never cause symptoms.','<b>Cholesterol or mixed stones</b> (about 80%): too much cholesterol for the bile salts to hold in solution. <b>Pigment stones:</b> excess bilirubin, as in haemolysis.','<b>Risk factors:</b> female sex, age, obesity, pregnancy and oestrogen, rapid weight loss, Crohn\'s disease or removal of the terminal ileum (bile salts are lost).','<b>Ultrasound</b> is the first test.','Stones can also cause pancreatitis, and rarely block the bowel (gallstone ileus).']]]],
 ['table',['','Biliary colic','Acute cholecystitis','Stone in the common bile duct','Ascending cholangitis'],[
  ['What has happened','A stone briefly blocks the gallbladder outlet','A stone stays stuck in the cystic duct; the gallbladder becomes inflamed','A stone has moved into the common bile duct','A blocked duct has become infected with gut bacteria'],
  ['Pain','Right upper quadrant or epigastric, steady for up to a few hours, often after a fatty meal','Constant right upper quadrant pain, may spread to the right shoulder','May be painless, or colicky','Right upper quadrant'],
  ['Fever','No','<b>Yes</b>','No','<b>Yes, with rigors</b>'],
  ['Jaundice','No','No','<b>Yes</b>: dark urine, pale stools','<b>Yes</b>'],
  ['Signs and tests','Normal bloods','<b>Murphy\'s sign</b> (breath catches as you press under the right ribs); raised white cells and CRP','Raised ALP and bilirubin; dilated ducts on ultrasound; MRCP','<b>Charcot\'s triad:</b> fever, jaundice, right upper quadrant pain. Add shock and confusion: Reynolds\' pentad'],
  ['Treatment','Pain relief; planned laparoscopic cholecystectomy','Antibiotics, fluids; cholecystectomy within a week','<b>ERCP</b> to remove the stone, then cholecystectomy','<b>Emergency:</b> IV antibiotics, fluids, and urgent drainage by ERCP']]],
 ['cards',[
  ['Pancreatic juice',['About 1.5 L a day. <b>Acinar cells</b> make the enzymes; <b>duct cells</b> add bicarbonate-rich fluid.','<b>CCK</b> (fat and protein in the duodenum) and the vagus stimulate <b>enzyme</b> secretion.','<b>Secretin</b> (acid in the duodenum) stimulates <b>bicarbonate</b>, which neutralises stomach acid so the enzymes can work.','<b>Proteases</b> are secreted as inactive precursors (trypsinogen, chymotrypsinogen, procarboxypeptidase) so that the gland does not digest itself.','<b>Enteropeptidase</b> on the duodenal brush border turns trypsinogen into trypsin; <b>trypsin</b> then activates all the others.','<b>Amylase</b> and <b>lipase</b> (with colipase) are secreted in active form.','The bicarbonate is secreted through the <b>CFTR</b> channel: in cystic fibrosis the ducts clog and the gland fails.']],
  ['Acute pancreatitis',['Enzymes are activated inside the gland and digest it.','<b>Causes: gallstones and alcohol</b> account for about 80%. Others: ERCP, high triglycerides, high calcium, trauma, drugs (azathioprine, thiazides), mumps.','<b>Features:</b> severe epigastric pain going through to the back, eased by sitting forward; vomiting.','<b>Diagnosis:</b> amylase or lipase more than three times normal. The level does not show severity.','<b>Treatment is supportive:</b> generous IV fluids, pain relief, oxygen, early feeding; remove gallstones.','<b>Complications:</b> shock, respiratory failure (ARDS), low calcium, high glucose, necrosis and infection, pseudocyst.']],
  ['Chronic pancreatitis and pancreatic cancer',['<b>Chronic pancreatitis</b> (usually alcohol): the gland scars and calcifies. Pain; <b>loss of enzymes</b> (pale, greasy, floating stools: steatorrhoea; weight loss; lack of vitamins A, D, E and K); later <b>diabetes</b>. Treated with enzyme capsules (Creon) taken with food.','<b>Cancer of the head of the pancreas</b> blocks the bile duct: <b>painless jaundice</b>, dark urine, pale stools, itching, weight loss, and a gallbladder you can feel.','Cancer of the body and tail shows late, with back pain and weight loss.','A Whipple\'s operation removes the head of the pancreas with the duodenum and bile duct, which share its blood supply.']],
  ['The endocrine pancreas',['The islets of Langerhans make up 1 to 2% of the gland.','<b>β cells:</b> insulin (and amylin). <b>α cells:</b> glucagon. <b>δ cells:</b> somatostatin. <b>PP cells:</b> pancreatic polypeptide.','Covered in the endocrine chapter, with diabetes.']]]],
 ['notes',
  ['exam','Secretin answers acid with bicarbonate. CCK answers fat and protein with enzymes and bile. The two are the commonest hormone questions in GI physiology.'],
  ['fix','GI deck · bile slides','The route of bile is given as "common hepatic duct → common bile duct → cystic duct → gallbladder". Bile reaches the gallbladder from the <b>common hepatic duct through the cystic duct</b>; the common bile duct only begins below that junction and leads to the duodenum. "Bile salts contain bilirubin" is wrong: they are separate components of bile. Bile salts are detergents made from cholesterol; bilirubin is a waste pigment. Secretin stimulates the ducts to add <b>bicarbonate-rich fluid</b>, not bile salts.']]
]},
/* ------------------------------------------------------------------ */
{id:'gi-absorb',eb:'Absorption',h:'Digestion and absorption',p:'Digestion breaks food into pieces small enough to cross the gut wall: sugars, amino acids and small peptides, fatty acids. The small intestine, with its folds, villi and microvilli, has a surface the size of a tennis court to absorb them.',b:[
 ['pw','carbdigest','proteindigest','fatdigest'],
 ['table',['Nutrient','Where absorbed','How','If it fails'],[
  ['Glucose, galactose','Duodenum and jejunum','With sodium on <b>SGLT1</b>; out through GLUT2','Oral rehydration solution works because glucose and sodium pull each other (and water) in'],
  ['Fructose','Jejunum','Facilitated diffusion on <b>GLUT5</b>',''],
  ['Amino acids, di- and tripeptides','Jejunum','Amino acids with sodium; small peptides with H⁺ on PepT1',''],
  ['Fat','Jejunum','Diffusion from micelles; rebuilt and exported as chylomicrons into lymph','Steatorrhoea'],
  ['Iron','<b>Duodenum</b>','As Fe²⁺ on DMT1; needs acid','Iron deficiency in coeliac disease, after gastric surgery'],
  ['Folate','<b>Jejunum</b>','','Macrocytic anaemia'],
  ['Calcium','Duodenum and jejunum','Increased by activated vitamin D','Osteomalacia'],
  ['Vitamin B12','<b>Terminal ileum</b>','Bound to intrinsic factor','Macrocytic anaemia and nerve damage: pernicious anaemia, Crohn\'s disease, ileal resection'],
  ['Bile salts','<b>Terminal ileum</b>','Active transport','Bile salt diarrhoea; gallstones'],
  ['Vitamins A, D, E, K','Jejunum and ileum','With fat, in micelles','Night blindness (A), osteomalacia (D), neuropathy (E), bleeding (K)'],
  ['Water and salt','Small intestine (about 8 L a day) and colon (1 to 1.5 L)','Water follows sodium','Diarrhoea']]],
 ['cards',[
  ['Built for surface area',['<b>Circular folds</b> (plicae circulares): permanent folds of mucosa and submucosa, largest in the jejunum.','<b>Villi:</b> finger-like projections, each with a capillary network and a central lymph vessel (<b>lacteal</b>).','<b>Microvilli:</b> the brush border on each enterocyte, carrying the final digestive enzymes.','Together they increase the surface about 600-fold.','<b>Crypts</b> between the villi hold the stem cells; enterocytes are renewed every 3 to 5 days, which is why the gut suffers with chemotherapy.','<b>Duodenum:</b> Brunner\'s glands; receives bile and pancreatic juice. <b>Jejunum:</b> tall folds, most absorption. <b>Ileum:</b> Peyer\'s patches; B12 and bile salts.']],
  ['Coeliac disease',['An <b>autoimmune</b> reaction to <b>gluten</b> (wheat, barley, rye) in people with HLA-DQ2 or DQ8.','T cells attack the small bowel lining: <b>villous atrophy, crypt hyperplasia</b> and more lymphocytes in the epithelium. The absorbing surface is lost, worst in the duodenum and jejunum.','<b>Presents with:</b> tiredness, bloating, loose pale stools, weight loss or poor growth; <b>iron or folate deficiency</b>; an itchy blistering rash on the elbows (dermatitis herpetiformis); or no symptoms at all.','<b>Test:</b> tissue transglutaminase (tTG) IgA antibodies, with total IgA, <b>while still eating gluten</b>; confirmed by duodenal biopsy.','<b>Treatment:</b> a gluten-free diet for life.','Linked with type 1 diabetes and thyroid disease. Untreated: osteoporosis and a small risk of bowel lymphoma.']],
  ['Lactose intolerance',['<b>Lactase</b>, a brush border enzyme, splits lactose into glucose and galactose. Most of the world\'s adults make little of it.','Undigested lactose stays in the gut, holding water with it (osmotic diarrhoea), and colonic bacteria ferment it to gas and acids: bloating, wind, cramps and loose stools after milk.','Often temporary after gastroenteritis, when the brush border is damaged.','It is not an allergy: the immune system is not involved.']],
  ['Malabsorption: thinking it through',['<b>Not digested:</b> lack of pancreatic enzymes (chronic pancreatitis, cystic fibrosis) or of bile (obstruction).','<b>Not absorbed:</b> damaged or missing mucosa (coeliac disease, Crohn\'s disease, bowel resection).','<b>Eaten by something else:</b> bacterial overgrowth, <i>Giardia</i>.','<b>Clues:</b> steatorrhoea, weight loss, anaemia (iron, folate, B12), bruising (vitamin K), bone pain (vitamin D), swelling (protein).','<b>Tests:</b> blood count, iron, folate, B12, coeliac antibodies, faecal elastase (pancreatic function).']]]],
 ['notes',
  ['exam','Which deficiency goes with which part of the gut: <b>iron: duodenum · folate: jejunum · B12 and bile salts: terminal ileum</b>.'],
  ['fix','GI deck · protein digestion and small intestine slides','"Mastication breaks proteins down into small peptides or amino acids" is not right: chewing is mechanical only. Chemical digestion of protein begins in the stomach with <b>pepsin</b>. The duodenum is described as "mostly located in the right lower quadrant": it lies in the upper abdomen, curving round the head of the pancreas, mostly behind the peritoneum.']]
]},
/* ------------------------------------------------------------------ */
{id:'gi-bowel',eb:'Bowel',h:'The bowel: movement, obstruction and inflammation',p:'The colon receives about 1.5 litres of fluid a day and turns it into 150 grams of stool by reabsorbing salt and water. Its diseases announce themselves through a change in bowel habit, bleeding or pain.',b:[
 ['pw','defecation','appendicitis'],
 ['cards',[
  ['Diarrhoea: four mechanisms',['<b>Osmotic:</b> something unabsorbed holds water in the gut (lactose, laxatives). Stops with fasting.','<b>Secretory:</b> the gut actively secretes chloride and water (cholera toxin, bile salts, some tumours). Continues with fasting; large volumes.','<b>Inflammatory:</b> a damaged mucosa leaks blood, mucus and pus (ulcerative colitis, Crohn\'s disease, <i>Shigella</i>, <i>Campylobacter</i>).','<b>Fast transit:</b> too little time to absorb (hyperthyroidism, irritable bowel syndrome).','<b>Treatment is fluid replacement.</b> Loperamide (an opioid that stays in the gut) slows transit, but is avoided when there is blood or fever.']],
  ['Constipation and laxatives',['<b>Causes:</b> too little fibre and fluid, immobility, ignoring the urge, pregnancy; drugs (<b>opioids</b>, antimuscarinics, iron, calcium channel blockers, ondansetron); low thyroid, high calcium; painful anal conditions; and bowel cancer.','<b>Bulk-forming</b> (ispaghula husk): fibre that holds water and stretches the bowel. Needs fluid; takes days.','<b>Osmotic</b> (macrogol, lactulose): hold water in the bowel. Lactulose also lowers ammonia absorption in liver failure.','<b>Stimulant</b> (senna, bisacodyl): irritate the enteric nerves to increase movement. Work overnight; cramps.','<b>Softeners</b> (docusate; arachis oil enemas): wet and lubricate the stool.','Opioids always constipate: prescribe a laxative with them.']]]],
 ['table',['Bowel obstruction','Small bowel','Large bowel'],[
  ['Commonest causes','<b>Adhesions</b> from earlier surgery; hernias','<b>Cancer</b>; volvulus of the sigmoid; diverticular stricture'],
  ['Vomiting','Early, green','Late (may be faeculent)'],
  ['Constipation','Late','Early and complete: no stool or wind'],
  ['Distension','Less, central','Marked'],
  ['Pain','Colicky, central','Colicky, lower abdomen'],
  ['X-ray','Central loops wider than 3 cm; folds (valvulae conniventes) cross the <b>whole</b> width','Peripheral loops wider than 6 cm; haustra cross only <b>part</b> of the width. Sigmoid volvulus: "coffee bean"'],
  ['First steps','"Drip and suck": IV fluids and a nasogastric tube; nil by mouth; correct electrolytes; CT scan. Surgery if strangulated or not settling','The same, with surgery or decompression']]],
 ['table',['','Crohn\'s disease','Ulcerative colitis'],[
  ['Where','Anywhere from mouth to anus; most often the <b>terminal ileum</b>','<b>Colon only</b>; always starts at the rectum'],
  ['Pattern','Patchy: <b>skip lesions</b>','<b>Continuous</b>, spreading upwards'],
  ['Depth','<b>Full thickness</b> of the wall','<b>Mucosa and submucosa only</b>'],
  ['Under the microscope','Granulomas','Crypt abscesses, loss of goblet cells'],
  ['Symptoms','Pain (often right iliac fossa), diarrhoea, weight loss, mouth ulcers, disease around the anus','<b>Bloody diarrhoea</b> with mucus, urgency, the feeling of incomplete emptying'],
  ['Complications','<b>Strictures, fistulas, abscesses</b>; malabsorption (B12)','Toxic megacolon; <b>bowel cancer</b>; primary sclerosing cholangitis'],
  ['Smoking','Makes it worse','Seems to protect'],
  ['Treatment','Steroids to settle a flare; azathioprine, methotrexate or biological drugs (infliximab, adalimumab) to keep it settled; surgery is not a cure','Aminosalicylates (mesalazine) first; steroids for flares; azathioprine, biologics; removing the colon cures it'],
  ['Outside the gut (both)','Arthritis, erythema nodosum, eye inflammation (uveitis, episcleritis)','The same']]],
 ['cards',[
  ['Diverticular disease',['<b>Diverticula</b> are pouches of mucosa pushed out through weak points in the colon wall (where blood vessels enter), mostly in the <b>sigmoid</b>. Low-fibre diets and age: half of people over 70 have them.','<b>Diverticulosis:</b> pouches with no symptoms.','<b>Diverticulitis:</b> a pouch becomes blocked and infected: <b>left iliac fossa pain</b>, fever, raised white cells. Antibiotics; CT if severe.','<b>Complications:</b> perforation, abscess, <b>fistula</b> (into the bladder: air or stool in the urine), stricture, and sudden painless bleeding.']],
  ['Bowel cancer',['The fourth commonest cancer. Most arise from <b>adenomatous polyps</b> over about ten years, as mutations accumulate (APC, then KRAS, then p53).','<b>Left-sided and rectal:</b> change in bowel habit, blood in the stool, the feeling of incomplete emptying, obstruction.','<b>Right-sided:</b> <b>iron deficiency anaemia</b> and weight loss; little change in the bowels.','<b>Risk:</b> age, family history, ulcerative colitis, red and processed meat, obesity, smoking; inherited syndromes (familial adenomatous polyposis, Lynch syndrome).','<b>Screening:</b> a home stool test for hidden blood (FIT) every two years from the age of 50 to 74.','<b>Test:</b> colonoscopy with biopsy; CT to stage. Spreads first to the <b>liver</b> through the portal vein.']],
  ['When the gut forms wrongly',['In week 6 the midgut grows too fast for the abdomen and herniates into the umbilical cord; by week 10 it returns, rotating 270° anticlockwise.','<b>Exomphalos (omphalocele):</b> the gut fails to return; it lies in the cord <b>covered by a membrane</b>. Often with other anomalies.','<b>Gastroschisis:</b> a defect beside the umbilicus; bowel lies free with <b>no covering</b>. Usually an isolated problem.','<b>Malrotation:</b> the gut returns without rotating properly and can twist on its blood supply (volvulus): green vomiting in a newborn is a surgical emergency.','<b>Meckel\'s diverticulum:</b> a remnant of the vitelline duct. The rule of twos: 2% of people, 2 feet from the ileocaecal valve, 2 inches long. It may contain stomach lining that secretes acid and bleeds.','<b>Hirschsprung\'s disease:</b> nerve cells fail to reach the end of the colon; that segment cannot relax. No meconium in the first 48 hours.','<b>Pyloric stenosis:</b> at 2 to 8 weeks, projectile milky vomiting in a hungry baby.','<b>Intussusception:</b> at 6 to 18 months, one piece of bowel telescopes into the next (usually ileum into colon): bouts of screaming, drawing up the legs, "redcurrant jelly" stool.']],
  ['Irritable bowel syndrome',['Abdominal pain related to opening the bowels, with a change in stool frequency or form, and bloating, for at least 6 months, with <b>normal tests</b>.','A disorder of gut–brain signalling: the gut is over-sensitive to stretch.','Exclude coeliac disease, inflammation (faecal calprotectin) and red flags (bleeding, weight loss, anaemia, onset after 60).','Diet (regular meals, less caffeine, a low-FODMAP diet), antispasmodics (mebeverine), laxatives or loperamide as needed.']]]],
 ['notes',
  ['exam','Red flags for bowel cancer: a change in bowel habit lasting weeks, blood in the stool, <b>unexplained iron deficiency anaemia</b>, weight loss, or a mass. They need a FIT test and urgent referral.'],
  ['fix','GI deck · obstruction, diverticula and appendicitis slides','The slide says small bowel obstruction brings early vomiting "which may contain faecal matter": faeculent vomiting is a <b>late</b> sign. Early vomiting in small bowel obstruction is green (bile). Diverticulitis is put down to "anaerobic Gram-negatives like <i>E. coli</i>": the infection is mixed, with <i>E. coli</i> (which can grow with or without oxygen) and true anaerobes such as <i>Bacteroides</i>. Appendicitis usually starts with <b>blockage</b> of the appendix; infection follows.']]
]},
/* ------------------------------------------------------------------ */
{id:'gi-micro',eb:'Infection',h:'Gut infections, travel and the microbiome',p:'The colon holds more bacteria than the body has cells. Most are useful tenants; trouble comes when a pathogen arrives or antibiotics clear the residents and leave room for one.',b:[
 ['cards',[
  ['The microbiome',['Bacteria, viruses, fungi and protozoa, mostly in the <b>colon</b>, living in the mucus layer on top of the epithelium.','<b>Acquired at birth</b> (from the birth canal and the mother\'s gut) and from breast milk; shaped by diet, and disturbed by antibiotics.','<b>They ferment fibre</b> into short-chain fatty acids (butyrate, acetate, propionate): the main fuel of colon cells, with effects on appetite and glucose.','<b>They make</b> vitamin K and some B vitamins, and convert bilirubin and bile salts.','<b>They train the immune system:</b> gut-associated lymphoid tissue (Peyer\'s patches, lymphoid follicles) needs early colonisation to develop properly.','<b>They crowd out pathogens</b> ("colonisation resistance").','<b>They make ammonia</b> from protein, which the liver turns into urea: the reason lactulose and rifaximin help in liver failure.']],
  ['<i>Clostridioides difficile</i>',['A Gram-positive, spore-forming anaerobic rod. Spores survive on surfaces and are <b>not killed by alcohol gel</b>: wash hands with soap and water.','<b>Antibiotics clear the normal flora</b> and <i>C. difficile</i> overgrows. The usual culprits: clindamycin, cephalosporins, co-amoxiclav, ciprofloxacin. Proton pump inhibitors add to the risk.','<b>Toxins A and B</b> damage the colon: watery diarrhoea, cramps, fever, a high white cell count. Severe cases form yellow plaques (pseudomembranous colitis) and can progress to toxic megacolon.','<b>Diagnosis:</b> toxin in the stool.','<b>Treatment:</b> stop the offending antibiotic; <b>oral vancomycin for 10 days</b> (fidaxomicin second line). Isolate the patient. Faecal transplant for repeated relapses.']]]],
 ['table',['Organism','Typical source','Illness','Notes'],[
  ['Norovirus','Person to person; outbreaks on wards, ships','Sudden vomiting and watery diarrhoea for 1 to 3 days','The commonest cause of gastroenteritis in adults'],
  ['Rotavirus','Young children','Watery diarrhoea','Vaccine given at 8 and 12 weeks'],
  ['<i>Campylobacter jejuni</i>','Undercooked chicken','Fever, cramps, bloody diarrhoea','The commonest bacterial cause in the UK. Can trigger Guillain–Barré syndrome'],
  ['<i>Salmonella</i> (non-typhoidal)','Eggs, poultry','Diarrhoea, fever, vomiting',''],
  ['<i>Shigella</i>','Faecal–oral','Dysentery: blood and mucus','Very few organisms needed'],
  ['<i>E. coli</i> O157','Undercooked beef, petting farms','Bloody diarrhoea, little fever','Shiga toxin: <b>haemolytic uraemic syndrome</b> in children. Do not give antibiotics'],
  ['Enterotoxigenic <i>E. coli</i>','Contaminated food and water abroad','Watery "traveller\'s diarrhoea"',''],
  ['<i>Vibrio cholerae</i>','Contaminated water','Profuse "rice-water" diarrhoea, rapid dehydration','The toxin raises cAMP, opening chloride channels (CFTR). Treat with oral rehydration'],
  ['<i>Staphylococcus aureus</i>, <i>Bacillus cereus</i>','Toxin already in food (cream, reheated rice)','Vomiting within 1 to 6 hours',''],
  ['<i>Giardia lamblia</i>','Untreated water','Weeks of bloating, wind and greasy stools','Metronidazole']]],
 ['table',['Illness in a returning traveller','Cause and spread','Features','Diagnosis and treatment'],[
  ['Malaria','<i>Plasmodium</i> (falciparum is the dangerous one), by the bite of the female <i>Anopheles</i> mosquito','Fever, headache, muscle aches, sometimes jaundice; anaemia and low platelets. Severe: confusion, seizures, breathing difficulty, kidney failure','<b>Any fever after travel to the tropics is malaria until proved otherwise.</b> Thick and thin blood films (three, if negative) or a rapid antigen test. Artemisinin combination tablets; IV artesunate if severe'],
  ['Typhoid (enteric fever)','<i>Salmonella</i> Typhi, from food and water contaminated by human faeces','Rising fever, headache, abdominal pain, constipation then diarrhoea, a slow pulse for the fever, rose spots. Bleeding or perforation of the bowel in week three','<b>Blood culture.</b> Ceftriaxone or azithromycin. A vaccine exists'],
  ['Viral haemorrhagic fevers','Ebola, Lassa, Marburg: contact with body fluids','Fever, vomiting and diarrhoea, then bleeding','Isolate at once and call the infection specialists'],
  ['MERS','A coronavirus; Arabian peninsula, camels','Fever, cough, breathlessness; high mortality','Isolation; supportive care'],
  ['Hepatitis A and E','Faecal–oral','Flu-like illness, then jaundice','Self-limiting; vaccine for hepatitis A']]],
 ['notes',
  ['clin','Oral rehydration solution','Cholera toxin opens chloride channels but leaves the sodium–glucose transporter (SGLT1) working. A drink containing both glucose and sodium is therefore still absorbed, and water follows. This simple mixture is one of the great life-savers of modern medicine.'],
  ['exam','Vomiting within hours of a meal means a toxin that was already in the food. Bloody diarrhoea means an organism that invades or damages the colon: <i>Campylobacter</i>, <i>Shigella</i>, <i>Salmonella</i>, <i>E. coli</i> O157, or amoebae.']]
]}
],
/* ================================================================== */
pw:{
swallow:{t:'Swallowing',k:'gi',sec:'gi-motility',mn:'Push back, seal off, squeeze down, open, close',steps:[
 ['Oral phase (voluntary): the tongue presses the bolus against the hard palate and pushes it back into the pharynx',''],
 ['Touch receptors in the pharynx signal the swallowing centre in the medulla; from here the swallow is a reflex','Afferents in cranial nerves IX and X.'],
 ['The soft palate rises to seal off the nose',''],
 ['Breathing stops, the vocal cords close, and the larynx rises so that the epiglottis folds over its entrance','This is what protects the airway.'],
 ['The pharyngeal constrictors contract in sequence from above down',''],
 ['The upper oesophageal sphincter (cricopharyngeus) relaxes to let the bolus through, then closes',''],
 ['A wave of peristalsis carries the bolus down the oesophagus in about 8 seconds','Striated muscle at the top, smooth muscle lower down, coordinated by the vagus and the myenteric plexus.'],
 ['The lower oesophageal sphincter relaxes ahead of the wave, and the stomach relaxes to receive the bolus',''],
 ['The sphincter closes again to prevent reflux','']]},
vomit:{t:'The vomiting reflex',k:'gi',sec:'gi-motility',mn:'Nausea, deep breath, close the airway, squeeze',steps:[
 ['A trigger reaches the vomiting centre in the medulla','From the gut, the chemoreceptor trigger zone, the inner ear or higher centres.'],
 ['Nausea, salivation, sweating and pallor','Extra saliva protects the teeth from acid.'],
 ['The stomach relaxes and a reverse wave of peristalsis moves intestinal contents back into it',''],
 ['A deep breath is taken, then the glottis closes and the soft palate rises','This protects the airway and nose.'],
 ['The diaphragm and abdominal muscles contract hard, squeezing the stomach',''],
 ['The lower oesophageal sphincter relaxes and the stomach contents are expelled',''],
 ['Breathing resumes','']]},
hcl:{t:'Making hydrochloric acid',k:'gi',sec:'gi-stomach',mn:'CO₂ and water in, acid one way, bicarbonate the other',steps:[
 ['Inside the parietal cell, carbonic anhydrase combines CO₂ and water into carbonic acid',''],
 ['Carbonic acid splits into H⁺ and bicarbonate',''],
 ['The H⁺/K⁺-ATPase pumps H⁺ into the stomach lumen in exchange for potassium','This is the step proton pump inhibitors block.'],
 ['Bicarbonate leaves the cell into the blood in exchange for chloride','The "alkaline tide" after a meal.'],
 ['Chloride crosses the cell and passes into the lumen through its channel',''],
 ['Potassium leaks back into the lumen, to be used again by the pump',''],
 ['H⁺ and Cl⁻ meet in the lumen as hydrochloric acid, pH 1 to 2','It kills bacteria, unfolds proteins and converts pepsinogen to pepsin.']]},
bilirubin:{t:'The life of bilirubin',k:'gi',sec:'gi-liver',mn:'Haem, unconjugated, conjugated, urobilinogen, stercobilin',steps:[
 ['After about 120 days, red cells are taken up by macrophages in the spleen',''],
 ['Haem is split from globin, its iron is recycled, and the rest becomes biliverdin, then bilirubin',''],
 ['This unconjugated bilirubin is not water-soluble, so it travels to the liver bound to albumin','It cannot be filtered by the kidney.'],
 ['Hepatocytes take it up and attach glucuronic acid, using the enzyme UGT','Conjugated bilirubin is water-soluble.'],
 ['Conjugated bilirubin is secreted into bile and reaches the gut',''],
 ['Bacteria in the colon convert it to urobilinogen',''],
 ['Most urobilinogen is oxidised to stercobilin, which colours the stool brown',''],
 ['A little urobilinogen is reabsorbed; some is excreted by the kidney as urobilin, which colours urine yellow','']]},
portalht:{t:'From liver injury to portal hypertension',k:'gi',sec:'gi-liver',mn:'Injury, scar, resistance, back-pressure, bypass',steps:[
 ['The liver is injured again and again','Alcohol, fat, viral hepatitis.'],
 ['Stellate cells are activated and lay down collagen',''],
 ['Bands of scar tissue surround nodules of regenerating liver cells: cirrhosis',''],
 ['The distorted liver resists blood flow, and pressure rises in the portal vein',''],
 ['Blood backs up into the spleen, which enlarges and traps platelets',''],
 ['Blood bypasses the liver through connections with systemic veins, which swell into varices',''],
 ['Fluid is forced out of the gut capillaries into the peritoneal cavity as ascites','Made worse by low albumin and salt retention.'],
 ['Toxins from the gut, such as ammonia, bypass the liver and reach the brain: encephalopathy','']]},
bileflow:{t:'The route of bile',k:'gi',sec:'gi-biliary',mn:'Canaliculi, hepatic ducts, cystic duct and back, common bile duct, ampulla',steps:[
 ['Hepatocytes secrete bile into the canaliculi between them',''],
 ['Canaliculi drain into bile ductules, then the bile ducts of the portal triads',''],
 ['These join into the right and left hepatic ducts',''],
 ['The two unite as the common hepatic duct',''],
 ['Between meals the sphincter of Oddi is shut, so bile backs up through the cystic duct into the gallbladder',''],
 ['The gallbladder stores and concentrates it',''],
 ['After a fatty meal, CCK contracts the gallbladder: bile flows back down the cystic duct',''],
 ['It enters the common bile duct, which passes behind the duodenum and through the head of the pancreas',''],
 ['The bile duct joins the pancreatic duct at the ampulla of Vater',''],
 ['The sphincter of Oddi relaxes and bile enters the second part of the duodenum','']]},
carbdigest:{t:'Digesting carbohydrate',k:'gi',sec:'gi-absorb',mn:'Amylase, brush border, SGLT1, GLUT2',steps:[
 ['Salivary amylase starts to break starch in the mouth',''],
 ['Stomach acid inactivates it',''],
 ['Pancreatic amylase in the duodenum breaks starch into maltose and short chains',''],
 ['Brush border enzymes finish the job: maltase, sucrase and lactase release single sugars','Only single sugars can be absorbed.'],
 ['Glucose and galactose enter the enterocyte with sodium on SGLT1; fructose enters on GLUT5',''],
 ['All three leave the cell on the blood side through GLUT2',''],
 ['They travel in the portal vein to the liver',''],
 ['Starch that resists digestion, and fibre, pass on to be fermented by colonic bacteria','']]},
proteindigest:{t:'Digesting protein',k:'gi',sec:'gi-absorb',mn:'Pepsin, enteropeptidase, trypsin, brush border',steps:[
 ['Stomach acid unfolds proteins and converts pepsinogen into pepsin',''],
 ['Pepsin cuts proteins into large polypeptides',''],
 ['The pancreas secretes inactive proteases into the duodenum','Trypsinogen, chymotrypsinogen, procarboxypeptidase.'],
 ['Enteropeptidase on the duodenal brush border converts trypsinogen to trypsin',''],
 ['Trypsin activates more trypsinogen and the other proteases',''],
 ['Together they cut polypeptides into small peptides and amino acids',''],
 ['Brush border peptidases shorten the peptides further',''],
 ['Amino acids are absorbed with sodium; di- and tripeptides with H⁺',''],
 ['Inside the cell, peptides are split into amino acids, which pass into the portal blood','']]},
fatdigest:{t:'Digesting and absorbing fat',k:'gi',sec:'gi-absorb',mn:'Emulsify, lipase, micelle, rebuild, chylomicron, lymph',an:'Washing-up liquid on a greasy pan: bile salts break the fat into droplets small enough for the enzyme to work on.',steps:[
 ['Lingual and gastric lipases make a small start; the stomach churns fat into coarse droplets',''],
 ['Fat in the duodenum releases CCK: the gallbladder contracts and the pancreas secretes lipase',''],
 ['Bile salts emulsify the fat into tiny droplets, giving lipase a huge surface to work on',''],
 ['Pancreatic lipase, with colipase, splits triglycerides into fatty acids and monoglycerides',''],
 ['Bile salts gather these into micelles, which ferry them to the brush border','Fat-soluble vitamins and cholesterol travel in the micelles too.'],
 ['Fatty acids and monoglycerides diffuse into the enterocyte; the bile salts stay behind',''],
 ['Inside the cell they are rebuilt into triglycerides and packaged with protein as chylomicrons',''],
 ['Chylomicrons are too big for capillaries: they enter the lacteals',''],
 ['They travel in lymph through the thoracic duct into the blood at the left subclavian vein','Bypassing the liver. Short- and medium-chain fatty acids go straight into portal blood instead.'],
 ['Bile salts are reabsorbed in the terminal ileum and returned to the liver','']]},
defecation:{t:'The defecation reflex',k:'gi',sec:'gi-bowel',mn:'Mass movement, stretch, internal relaxes, external decides',steps:[
 ['A mass movement pushes stool from the sigmoid colon into the rectum','Often after a meal: the gastrocolic reflex.'],
 ['The rectal wall is stretched, giving the urge to defecate',''],
 ['A reflex through the sacral cord (S2 to S4) contracts the rectum',''],
 ['The internal anal sphincter (smooth muscle, involuntary) relaxes',''],
 ['The external anal sphincter (skeletal muscle, pudendal nerve) is held closed voluntarily',''],
 ['If it is convenient, the external sphincter and puborectalis relax, straightening the anorectal angle',''],
 ['Straining raises abdominal pressure and stool is passed',''],
 ['If not, the urge fades as the rectum relaxes, and stool moves back into the sigmoid','Ignoring the urge repeatedly leads to constipation.']]},
appendicitis:{t:'Appendicitis: why the pain moves',k:'gi',sec:'gi-bowel',mn:'Blocked, swollen, midline ache, peritoneum, right iliac fossa',steps:[
 ['The lumen of the appendix is blocked','By a hard pellet of stool (faecolith) or swollen lymphoid tissue.'],
 ['Mucus builds up behind the block; pressure rises and bacteria multiply',''],
 ['The wall of the appendix is stretched and inflamed',''],
 ['Visceral pain fibres run with the sympathetic nerves to T10, so a dull ache is felt around the umbilicus','The appendix is a midgut organ. Loss of appetite and nausea accompany it.'],
 ['Inflammation spreads through the wall to the parietal peritoneum lying over the appendix',''],
 ['Somatic nerves now localise a sharp pain to the right iliac fossa','Maximal at McBurney\'s point, two thirds of the way from the umbilicus to the anterior superior iliac spine. Worse on moving or coughing.'],
 ['Untreated, the blood supply fails and the appendix perforates',''],
 ['Peritonitis or an abscess follows','']]}
},
/* ================================================================== */
flips:[
 ['Plexus that controls gut motility','Myenteric (Auerbach\'s), between the muscle layers.'],
 ['Plexus that controls secretion','Submucosal (Meissner\'s).'],
 ['Artery of the midgut','Superior mesenteric artery.'],
 ['Where is hindgut pain felt?','Suprapubic region.'],
 ['Hormone of the migrating motor complex','Motilin.'],
 ['Chemoreceptor trigger zone','Area postrema, floor of the fourth ventricle; outside the blood–brain barrier.'],
 ['Ondansetron','5-HT₃ antagonist.'],
 ['Metoclopramide side effect in the young','Acute dystonia (oculogyric crisis).'],
 ['Parietal cell products','Hydrochloric acid and intrinsic factor.'],
 ['Chief cell product','Pepsinogen.'],
 ['Three stimulants of acid','Acetylcholine (M₃), gastrin (CCK₂), histamine (H₂).'],
 ['Omeprazole','Irreversibly inhibits the H⁺/K⁺-ATPase.'],
 ['How H. pylori survives acid','Urease makes ammonia.'],
 ['Secretin','Released by acid; stimulates pancreatic bicarbonate.'],
 ['CCK','Released by fat and protein; gallbladder contracts, pancreatic enzymes.'],
 ['Duodenal versus gastric ulcer pain','Duodenal: relieved by food. Gastric: worse with food.'],
 ['Liver zone damaged first by paracetamol','Zone 3, around the central vein.'],
 ['Cell that causes liver fibrosis','Stellate cell.'],
 ['Raised ALP and GGT','Cholestasis.'],
 ['AST more than twice ALT','Alcohol.'],
 ['Dark urine and pale stools','Obstructive (post-hepatic) jaundice.'],
 ['Gilbert\'s syndrome','Mild unconjugated jaundice when fasting or ill; harmless.'],
 ['Charcot\'s triad','Fever, jaundice, right upper quadrant pain: ascending cholangitis.'],
 ['Two main causes of acute pancreatitis','Gallstones and alcohol.'],
 ['Enzyme that activates trypsinogen','Enteropeptidase, on the duodenal brush border.'],
 ['Glucose transporter into enterocytes','SGLT1, with sodium.'],
 ['How long-chain fat leaves the gut','Chylomicrons, in lymph.'],
 ['Iron, folate, B12: where absorbed','Duodenum, jejunum, terminal ileum.'],
 ['Coeliac antibody test','Tissue transglutaminase IgA.'],
 ['Crohn\'s in three words','Patchy, transmural, granulomas.'],
 ['Ulcerative colitis in three words','Continuous, mucosal, rectum-upwards.'],
 ['Commonest cause of small bowel obstruction','Adhesions.'],
 ['McBurney\'s point','Two thirds of the way from umbilicus to right anterior superior iliac spine.'],
 ['C. difficile treatment','Oral vancomycin for 10 days.'],
 ['Fever after travel to the tropics','Malaria until proved otherwise: blood films.']
],
/* ================================================================== */
qs:[
{sec:'gi-wall',type:'sba',q:'Which nerve plexus lies between the circular and longitudinal muscle layers and controls gut motility?',
 o:['Myenteric (Auerbach\'s) plexus','Submucosal (Meissner\'s) plexus','Coeliac plexus','Superior hypogastric plexus','Cardiac plexus'],a:0,
 e:'The myenteric plexus sits between the two layers of the muscularis externa and coordinates their contraction. The submucosal plexus controls secretion and local blood flow. The coeliac and hypogastric plexuses lie outside the gut wall.'},
{sec:'gi-wall',type:'sba',q:'In the first hours of appendicitis, pain is felt around the umbilicus. Why?',
 o:['The appendix develops from the midgut, and its visceral pain fibres enter the spinal cord at about T10','The inflamed appendix is touching the umbilicus','The parietal peritoneum at the umbilicus is inflamed first','Pain fibres travel in the vagus to the skin of the umbilicus','The appendix is supplied by the inferior mesenteric artery'],a:0,
 e:'Visceral pain is felt in the midline at the level of the gut\'s embryonic origin: epigastrium for foregut, umbilicus for midgut, suprapubic for hindgut. Only when the parietal peritoneum is inflamed does pain localise to the right iliac fossa.'},
{sec:'gi-wall',type:'saq',q:'Which artery supplies the midgut?',acc:['superior mesenteric|sma'],m:'The superior mesenteric artery',
 e:'The midgut runs from the middle of the duodenum to two thirds of the way along the transverse colon. Foregut: coeliac trunk. Hindgut: inferior mesenteric artery.'},
{sec:'gi-wall',type:'sba',q:'A tumour arises 1 cm below the pectinate line of the anal canal. What type is it most likely to be, and where will it spread first?',
 o:['Squamous cell carcinoma, spreading to the superficial inguinal nodes','Adenocarcinoma, spreading to the internal iliac nodes','Squamous cell carcinoma, spreading to the internal iliac nodes','Adenocarcinoma, spreading to the superficial inguinal nodes','Adenocarcinoma, spreading to the para-aortic nodes'],a:0,
 e:'Below the pectinate line the canal is lined by squamous epithelium of ectodermal origin and drains to the superficial inguinal nodes, so a lump in the groin may be the first sign. Above the line: columnar epithelium, adenocarcinoma, internal iliac nodes.'},
{sec:'gi-wall',type:'sba',q:'A newborn has not passed meconium by 48 hours and has a swollen abdomen. A rectal biopsy shows no ganglion cells. What is the underlying problem?',
 o:['Nerve cells failed to migrate into the distal bowel, so that segment cannot relax','The pyloric muscle is thickened','The midgut has twisted on its mesentery','The vitelline duct has failed to close','Meconium is abnormally thick because of a faulty chloride channel'],a:0,
 e:'Hirschsprung\'s disease: neural crest cells that form the enteric plexuses do not reach the end of the colon. The aganglionic segment stays contracted and the bowel above it dilates. Treatment is removal of the affected segment.'},
{sec:'gi-motility',type:'sba',q:'A 40-year-old has had difficulty swallowing both solids and liquids from the outset, and brings up undigested food. A barium swallow shows a dilated oesophagus tapering to a "bird\'s beak". What is the cause?',
 o:['Loss of the myenteric neurons that relax the lower oesophageal sphincter','A stricture from long-standing acid reflux','Squamous cell carcinoma of the oesophagus','A pouch in the pharynx','Oesophageal varices'],a:0,
 e:'This is achalasia. Inhibitory neurons of the myenteric plexus are lost, so the lower oesophageal sphincter fails to relax and peristalsis is absent. Narrowing by a tumour or stricture causes difficulty with solids first, then liquids.'},
{sec:'gi-motility',type:'sba',q:'How does ondansetron prevent vomiting after chemotherapy?',
 o:['It blocks 5-HT₃ receptors on vagal afferents in the gut and in the chemoreceptor trigger zone','It blocks dopamine D₂ receptors in the basal ganglia','It blocks histamine H₁ receptors in the vestibular nuclei','It blocks muscarinic receptors in the stomach','It blocks opioid receptors in the vomiting centre'],a:0,
 e:'Chemotherapy makes enterochromaffin cells in the gut release serotonin, which stimulates 5-HT₃ receptors on vagal afferents and in the trigger zone. Ondansetron blocks these. Its side effects are constipation and QT prolongation.'},
{sec:'gi-motility',type:'sba',q:'Which class of anti-emetic is the most suitable for motion sickness on a ferry?',
 o:['An antimuscarinic such as hyoscine','A 5-HT₃ antagonist such as ondansetron','A dopamine antagonist such as domperidone','A proton pump inhibitor','An NK₁ antagonist such as aprepitant'],a:0,
 e:'Motion sickness arises in the vestibular system, which signals through muscarinic and histamine H₁ receptors. Hyoscine (or an antihistamine such as cyclizine) works; drugs aimed at the trigger zone or gut do not.'},
{sec:'gi-motility',type:'saq',q:'Which hormone drives the migrating motor complex during fasting?',acc:['motilin'],m:'Motilin',
 e:'Motilin is released from the upper small intestine every 90 minutes or so during fasting and sets off a sweeping wave of contraction. Erythromycin acts on the same receptor, which is why it speeds gastric emptying.'},
{sec:'gi-motility',type:'sba',q:'A 19-year-old woman is given metoclopramide for vomiting. An hour later her eyes are fixed looking upwards and her neck is twisted. What has caused this?',
 o:['Blockade of dopamine D₂ receptors in the basal ganglia','Blockade of 5-HT₃ receptors in the brainstem','Blockade of muscarinic receptors in the eye muscles','Release of histamine in the brain','A seizure caused by low sodium'],a:0,
 e:'Metoclopramide crosses the blood–brain barrier and blocks dopamine receptors. In young people, especially women, this can cause an acute dystonic reaction (oculogyric crisis). It is treated with an antimuscarinic such as procyclidine. Domperidone does not enter the brain.'},
{sec:'gi-motility',type:'saq',q:'In which area of the brain is the chemoreceptor trigger zone found?',acc:['area postrema|fourth ventricle|4th ventricle'],m:'The area postrema, in the floor of the fourth ventricle',
 e:'The area postrema lies outside the blood–brain barrier, so it can detect drugs and toxins in the blood. It signals to the vomiting centre in the medulla.'},
{sec:'gi-stomach',type:'sba',q:'Which cell of the stomach secretes intrinsic factor?',
 o:['Parietal cell','Chief cell','G cell','D cell','Enterochromaffin-like cell'],a:0,
 e:'Parietal cells make both hydrochloric acid and intrinsic factor. Autoimmune destruction of parietal cells (pernicious anaemia) or removal of the stomach therefore causes vitamin B12 deficiency.'},
{sec:'gi-stomach',type:'sba',q:'How does omeprazole reduce acid secretion?',
 o:['It irreversibly inhibits the H⁺/K⁺-ATPase of parietal cells','It blocks histamine H₂ receptors','It neutralises acid in the stomach lumen','It blocks gastrin receptors on G cells','It forms a raft on top of the stomach contents'],a:0,
 e:'Proton pump inhibitors bind covalently to the pump, the final common step for all three stimulants. Acid secretion returns only when new pumps are made, so the effect lasts about a day.'},
{sec:'gi-stomach',type:'sba',q:'How do NSAIDs cause peptic ulcers?',
 o:['Less prostaglandin is made, so there is less mucus and bicarbonate and poorer mucosal blood flow','They stimulate gastrin release from G cells','They stimulate histamine H₂ receptors directly','They encourage Helicobacter pylori to grow','They increase pepsinogen secretion'],a:0,
 e:'Prostaglandins (made by COX-1) maintain the mucus and bicarbonate barrier and mucosal blood flow, and restrain acid. NSAIDs remove them. People at risk are given a proton pump inhibitor alongside.'},
{sec:'gi-stomach',type:'sba',q:'A 45-year-old man has epigastric pain at night that is relieved by eating. A stool antigen test for H. pylori is positive. What is the correct treatment?',
 o:['A proton pump inhibitor with amoxicillin and clarithromycin for 7 days','Omeprazole alone for 8 weeks','Clarithromycin alone for 14 days','An H₂ blocker with an antacid','Metronidazole alone for 7 days'],a:0,
 e:'Eradication needs acid suppression plus two antibiotics (amoxicillin with clarithromycin or metronidazole) for a week. One antibiotic alone fails and breeds resistance. Eradication heals the ulcer and prevents it coming back.'},
{sec:'gi-stomach',type:'sba',q:'A man with a known duodenal ulcer vomits a large amount of fresh blood and is shocked. Endoscopy shows an ulcer on the posterior wall of the first part of the duodenum. Which artery has it eroded?',
 o:['Gastroduodenal artery','Left gastric artery','Splenic artery','Superior mesenteric artery','Right gastro-omental artery'],a:0,
 e:'The gastroduodenal artery runs directly behind the first part of the duodenum. Posterior ulcers bleed; anterior ulcers perforate into the peritoneal cavity.'},
{sec:'gi-stomach',type:'saq',q:'Which hormone is released by acid in the duodenum and stimulates the pancreas to secrete bicarbonate?',acc:['secretin'],m:'Secretin',
 e:'S cells in the duodenum release secretin when the pH falls. It makes pancreatic and bile duct cells secrete bicarbonate-rich fluid and reduces gastric acid: "nature\'s antacid".'},
{sec:'gi-stomach',type:'sba',q:'A man with many years of heartburn has a biopsy of his lower oesophagus. It shows columnar epithelium with goblet cells in place of squamous epithelium. What is this change?',
 o:['Metaplasia that raises the risk of adenocarcinoma','Metaplasia that raises the risk of squamous cell carcinoma','Hyperplasia that carries no risk of cancer','Atrophy caused by acid','A normal finding at the gastro-oesophageal junction'],a:0,
 e:'This is Barrett\'s oesophagus: one mature cell type replaced by another that withstands acid better. It can progress through dysplasia to adenocarcinoma, so it is watched with regular endoscopy.'},
{sec:'gi-liver',type:'sba',q:'A 70-year-old man has painless jaundice, dark urine, pale stools, itching and weight loss. His gallbladder can be felt. Bilirubin is mostly conjugated, ALP is 900 U/L and ALT is 80 U/L. What is the most likely cause?',
 o:['Cancer of the head of the pancreas','Haemolytic anaemia','Gilbert\'s syndrome','Viral hepatitis','Paracetamol overdose'],a:0,
 e:'Dark urine, pale stools, itching and a very high ALP mean bile is blocked after the liver. Painless obstruction with a palpable gallbladder points away from stones (a stone-filled gallbladder is scarred and cannot distend) and towards a tumour pressing on the bile duct.'},
{sec:'gi-liver',type:'sba',q:'A 22-year-old student notices yellow eyes while fasting during a bout of flu. Bilirubin is 48 µmol/L, all unconjugated. Other liver tests, blood count and reticulocytes are normal. What is the diagnosis?',
 o:['Gilbert\'s syndrome','Hepatitis A','A gallstone in the common bile duct','Haemolytic anaemia','Autoimmune hepatitis'],a:0,
 e:'Gilbert\'s syndrome affects about 1 in 20 people: slightly reduced activity of the conjugating enzyme gives mild unconjugated jaundice during fasting, illness or stress. A normal blood count and reticulocytes rule out haemolysis. It is harmless.'},
{sec:'gi-liver',type:'sba',q:'A 52-year-old man has AST 240 U/L, ALT 95 U/L, a raised GGT and an MCV of 104 fL. What is the most likely cause?',
 o:['Alcohol-related liver disease','Viral hepatitis','Bile duct obstruction','Paget\'s disease of bone','Haemochromatosis'],a:0,
 e:'An AST more than twice the ALT, with a raised GGT and large red cells, is the signature of alcohol. In viral hepatitis ALT is usually the higher of the two; obstruction raises ALP most.'},
{sec:'gi-liver',type:'sba',q:'A man with cirrhosis vomits a large volume of fresh blood. His bleeding varices have formed where which veins meet?',
 o:['The left gastric vein and the azygos system, at the lower oesophagus','The superior and inferior rectal veins','The paraumbilical and superficial epigastric veins','The splenic and left renal veins','The hepatic veins and the inferior vena cava'],a:0,
 e:'In portal hypertension, blood from the left gastric vein diverts through veins in the wall of the lower oesophagus to reach the azygos system. These thin-walled varices can bleed catastrophically. The rectal and umbilical connections also enlarge but rarely bleed so badly.'},
{sec:'gi-liver',type:'sba',q:'A woman with cirrhosis becomes confused and drowsy, with a flapping tremor of her outstretched hands. She has not opened her bowels for five days. Which treatment is aimed at the cause?',
 o:['Lactulose','Furosemide','Propranolol','Vitamin K','Spironolactone'],a:0,
 e:'Hepatic encephalopathy is caused by ammonia from the gut bypassing the failing liver. Constipation gives bacteria longer to make it. Lactulose empties the bowel and acidifies it, trapping ammonia as ammonium, which is not absorbed.'},
{sec:'gi-liver',type:'saq',q:'Name the enzyme that conjugates bilirubin in the liver.',acc:['glucuronyl|glucuronosyl|ugt'],m:'UDP-glucuronosyltransferase (UGT1A1)',
 e:'It attaches glucuronic acid to bilirubin, making it water-soluble so it can be excreted in bile. Its activity is mildly reduced in Gilbert\'s syndrome and is low in newborns, which contributes to jaundice in the first week of life.'},
{sec:'gi-liver',type:'sba',q:'Which blood test best shows how well the liver has been making proteins over the last day or two?',
 o:['Prothrombin time','ALT','ALP','GGT','Bilirubin'],a:0,
 e:'Clotting factors have short half-lives (factor VII about six hours), so the prothrombin time lengthens quickly when the liver fails. Albumin lasts about three weeks and changes slowly. ALT, ALP and GGT show damage, not function.'},
{sec:'gi-liver',type:'sba',q:'After a paracetamol overdose, which liver cells die first, and why?',
 o:['Zone 3 cells: they hold the most cytochrome P450 and receive the least oxygen','Zone 1 cells: they receive the highest dose from portal blood','Zone 2 cells: they have no glutathione','Bile duct cells: the toxic product is excreted in bile','Kupffer cells: they take up the drug'],a:0,
 e:'Cytochrome P450 turns a small part of paracetamol into a toxic product (NAPQI), normally mopped up by glutathione. In overdose glutathione runs out. Zone 3 cells, round the central vein, make the most NAPQI. Acetylcysteine restores glutathione.'},
{sec:'gi-biliary',type:'sba',q:'A 45-year-old woman has had constant pain under her right ribs for six hours. Her temperature is 38.4 °C, and she catches her breath when the doctor presses under the right costal margin as she breathes in. She is not jaundiced. What is the diagnosis?',
 o:['Acute cholecystitis','Biliary colic','Ascending cholangitis','Acute pancreatitis','Hepatitis A'],a:0,
 e:'Persistent pain with fever and a positive Murphy\'s sign is acute cholecystitis: a stone impacted in the cystic duct with an inflamed gallbladder. Biliary colic settles within hours without fever; cholangitis adds jaundice.'},
{sec:'gi-biliary',type:'sba',q:'A 68-year-old man has right upper quadrant pain, jaundice, and a fever with shaking chills. His blood pressure is 85/50 mmHg. What is the diagnosis?',
 o:['Ascending cholangitis','Acute cholecystitis','Biliary colic','Acute viral hepatitis','Cancer of the pancreas'],a:0,
 e:'Fever, jaundice and right upper quadrant pain are Charcot\'s triad: infection in an obstructed bile duct. With shock it is life-threatening. He needs fluids, IV antibiotics and urgent drainage of the duct by ERCP.'},
{sec:'gi-biliary',type:'sba',q:'Which two causes account for most cases of acute pancreatitis?',
 o:['Gallstones and alcohol','Mumps and steroids','High calcium and high triglycerides','Trauma and ERCP','Autoimmune disease and scorpion venom'],a:0,
 e:'Gallstones (blocking the shared outlet at the ampulla) and alcohol together cause about 80%. The others are real but uncommon. Every patient should have an ultrasound to look for stones.'},
{sec:'gi-biliary',type:'saq',q:'Which hormone makes the gallbladder contract and the sphincter of Oddi relax?',acc:['cholecystokinin|cck'],m:'Cholecystokinin (CCK)',
 e:'CCK is released by I cells in the duodenum when fat and protein arrive. It also stimulates pancreatic enzyme secretion and slows gastric emptying. This is why gallstone pain follows fatty meals.'},
{sec:'gi-biliary',type:'sba',q:'Which enzyme converts trypsinogen to trypsin, and where?',
 o:['Enteropeptidase, on the brush border of the duodenum','Pepsin, in the stomach','Secretin, in the pancreatic duct','Bile salts, in the bile duct','Amylase, in the acinar cell'],a:0,
 e:'Keeping proteases inactive until they reach the duodenum protects the pancreas. Enteropeptidase (enterokinase) makes the first trypsin; trypsin then activates the rest. Activation inside the gland is what happens in pancreatitis.'},
{sec:'gi-biliary',type:'sba',q:'A man who has drunk heavily for 20 years has upper abdominal pain, weight loss and pale, greasy stools that float. CT shows a shrunken, calcified pancreas. What is the cause of his stools?',
 o:['Lack of pancreatic lipase','Lack of bile salts','Loss of intestinal villi','Bacterial overgrowth','Lack of intrinsic factor'],a:0,
 e:'In chronic pancreatitis the enzyme-secreting tissue is replaced by scar. Without lipase, fat is not digested and passes out in the stool (steatorrhoea). Treatment is pancreatic enzyme capsules with every meal, and fat-soluble vitamins.'},
{sec:'gi-absorb',type:'sba',q:'A 24-year-old woman is tired and bloated and has iron deficiency anaemia and an itchy blistering rash on her elbows. Her tissue transglutaminase IgA is strongly positive. What will a duodenal biopsy show?',
 o:['Villous atrophy, crypt hyperplasia and more lymphocytes in the epithelium','Inflammation through the whole wall, with granulomas','Crypt abscesses confined to the mucosa','Yellow plaques of pseudomembrane','Normal villi that lack lactase'],a:0,
 e:'Coeliac disease. Gluten triggers an immune attack that flattens the villi, mostly in the duodenum and jejunum, where iron and folate are absorbed. The rash is dermatitis herpetiformis. A strict gluten-free diet lets the villi recover.'},
{sec:'gi-absorb',type:'sba',q:'Why does milk cause diarrhoea and wind in someone with lactose intolerance?',
 o:['Undigested lactose holds water in the gut and is fermented by bacteria in the colon','Lactose triggers an IgE-mediated allergic reaction','Lactose damages the intestinal villi','Lactose makes enterocytes secrete chloride by raising cAMP','Lactose blocks the SGLT1 transporter'],a:0,
 e:'Without lactase, lactose cannot be split and absorbed. It stays in the lumen as an osmotic load, and colonic bacteria ferment it to gas and short-chain acids. It is an enzyme deficiency, not an allergy.'},
{sec:'gi-absorb',type:'sba',q:'A woman with Crohn\'s disease has her terminal ileum removed. Which two problems should be expected?',
 o:['Vitamin B12 deficiency and bile salt diarrhoea','Iron deficiency and lactose intolerance','Folate deficiency and loss of intrinsic factor','Calcium deficiency and pancreatic failure','Vitamin C deficiency and fructose malabsorption'],a:0,
 e:'The terminal ileum is the only site that absorbs the B12–intrinsic factor complex and reabsorbs bile salts. Without it she needs B12 injections; bile salts spill into the colon and cause watery diarrhoea, and she is more likely to form gallstones.'},
{sec:'gi-absorb',type:'saq',q:'Which transporter carries glucose and galactose into the enterocyte together with sodium?',acc:['sglt1|sglt 1'],m:'SGLT1',
 e:'SGLT1 uses the sodium gradient to pull glucose and galactose in. Fructose uses GLUT5. All leave through GLUT2. Oral rehydration solution relies on SGLT1.'},
{sec:'gi-absorb',type:'sba',q:'How do the long-chain fats from a meal leave the enterocyte and reach the bloodstream?',
 o:['As chylomicrons into lacteals, reaching the blood through the thoracic duct','As free fatty acids into the portal vein','Inside micelles into the portal vein','Bound to albumin into the capillaries of the villus','As VLDL into the hepatic artery'],a:0,
 e:'Fatty acids and monoglycerides are rebuilt into triglycerides and packaged as chylomicrons, which are too large to enter capillaries. They pass into lacteals and reach the blood via the thoracic duct, bypassing the liver. Micelles only carry fat up to the cell.'},
{sec:'gi-absorb',type:'saq',q:'In which part of the gut is most dietary iron absorbed?',acc:['duoden'],m:'The duodenum (and upper jejunum)',
 e:'Iron is absorbed as Fe²⁺ in the duodenum, helped by stomach acid. Coeliac disease, which affects the upper small bowel, and operations that bypass the duodenum therefore cause iron deficiency.'},
{sec:'gi-absorb',type:'sba',q:'A woman with a long-standing blockage of her bile duct has a prolonged prothrombin time. Why?',
 o:['Vitamin K is fat-soluble and needs bile salts to be absorbed','The liver can no longer make albumin','Platelets are trapped in an enlarged spleen','Bilirubin inhibits thrombin','Factor VIII is not being made'],a:0,
 e:'Without bile salts, fat and the fat-soluble vitamins A, D, E and K are poorly absorbed. Vitamin K is needed to make clotting factors II, VII, IX and X. Giving vitamin K by injection corrects the clotting, which shows the liver itself can still make the factors.'},
{sec:'gi-bowel',type:'sba',q:'A 25-year-old has six weeks of bloody diarrhoea with mucus and urgency. Colonoscopy shows continuous inflammation from the rectum to the splenic flexure. Biopsies show crypt abscesses, with inflammation confined to the mucosa. What is the diagnosis?',
 o:['Ulcerative colitis','Crohn\'s disease','Coeliac disease','Diverticulitis','Irritable bowel syndrome'],a:0,
 e:'Continuous inflammation that starts at the rectum, involves only the mucosa and shows crypt abscesses is ulcerative colitis. Crohn\'s disease is patchy, affects the full thickness of the wall and may show granulomas.'},
{sec:'gi-bowel',type:'sba',q:'Which finding points to Crohn\'s disease and not ulcerative colitis?',
 o:['Skip lesions with inflammation through the full thickness of the bowel wall','Continuous inflammation beginning in the rectum','Inflammation limited to the mucosa','Disease that is milder in smokers','Cure after removal of the colon'],a:0,
 e:'Crohn\'s disease is patchy and transmural, which explains its complications: strictures, fistulas and abscesses. It can affect any part of the gut and comes back after surgery. Ulcerative colitis is continuous and superficial.'},
{sec:'gi-bowel',type:'sba',q:'A 68-year-old woman who had a hysterectomy 10 years ago has colicky central abdominal pain, green vomiting and a swollen abdomen. An X-ray shows dilated central loops of bowel with folds crossing their full width. What is the most likely cause?',
 o:['Adhesions from her previous operation','Cancer of the colon','Sigmoid volvulus','A diverticular stricture','A gallstone blocking the ileum'],a:0,
 e:'Central loops with folds across the whole width (valvulae conniventes) and early vomiting mean small bowel obstruction. Adhesions after abdominal or pelvic surgery are the commonest cause, followed by hernias. Large bowel obstruction is usually cancer.'},
{sec:'gi-bowel',type:'sba',q:'Which laxative works by drawing water into the bowel and is also used to treat hepatic encephalopathy?',
 o:['Lactulose','Senna','Ispaghula husk','Docusate','Loperamide'],a:0,
 e:'Lactulose is a sugar that cannot be absorbed, so it holds water in the gut (an osmotic laxative). Bacteria ferment it to acids that trap ammonia. Senna is a stimulant, ispaghula a bulking agent, docusate a softener; loperamide slows the gut.'},
{sec:'gi-bowel',type:'saq',q:'A Meckel\'s diverticulum is a remnant of which embryonic duct?',acc:['vitelline|vitello|omphalomesenteric'],m:'The vitelline (vitello-intestinal) duct',
 e:'The vitelline duct connects the midgut to the yolk sac and normally disappears. A remnant on the ileum can contain stomach lining, which secretes acid and causes painless bleeding in a young child.'},
{sec:'gi-bowel',type:'sba',q:'A 72-year-old woman has two days of pain in the left iliac fossa, a temperature of 38.2 °C and a raised white cell count. What is the most likely diagnosis?',
 o:['Acute diverticulitis','Appendicitis','Ulcerative colitis','Sigmoid volvulus','Irritable bowel syndrome'],a:0,
 e:'Diverticula are commonest in the sigmoid colon; when one becomes inflamed the picture resembles appendicitis on the left side. A volvulus causes obstruction and massive distension without fever.'},
{sec:'gi-bowel',type:'sba',q:'A 66-year-old man has had looser stools for eight weeks. Haemoglobin is 98 g/L with a low MCV and low ferritin. What should be done?',
 o:['A stool test for hidden blood and urgent referral for colonoscopy','Reassurance and loperamide','A trial of a gluten-free diet','Stool culture, with review in three months','A course of mesalazine'],a:0,
 e:'A lasting change in bowel habit with iron deficiency anaemia in an older adult is bowel cancer until proved otherwise. Cancers of the right colon often bleed slowly and silently, and anaemia may be the only sign.'},
{sec:'gi-bowel',type:'sba',q:'A newborn has loops of bowel lying outside the abdomen through a defect to the right of the umbilicus. There is no membrane covering them. What is this?',
 o:['Gastroschisis','Exomphalos (omphalocele)','An umbilical hernia','A Meckel\'s diverticulum','A patent urachus'],a:0,
 e:'In gastroschisis the bowel lies free with no covering, through a defect beside the cord; it is usually an isolated problem. In exomphalos the gut sits in the base of the cord inside a membrane, and other anomalies are common.'},
{sec:'gi-micro',type:'sba',q:'A 78-year-old woman in hospital, treated with co-amoxiclav and taking omeprazole, develops profuse watery diarrhoea and a white cell count of 22 × 10⁹/L. Stool is positive for C. difficile toxin. What is the treatment?',
 o:['Oral vancomycin for 10 days','Intravenous vancomycin','Oral ciprofloxacin','Loperamide','Continue co-amoxiclav and add a probiotic'],a:0,
 e:'Stop the antibiotic that caused it if possible and give oral vancomycin, which stays in the gut where the infection is. Intravenous vancomycin does not reach the bowel lumen. Loperamide is avoided because it may worsen toxic megacolon.'},
{sec:'gi-micro',type:'sba',q:'How does cholera toxin cause diarrhoea?',
 o:['It raises cAMP in enterocytes, opening chloride channels so that chloride and water pour into the gut','It invades and destroys the mucosa','It blocks the SGLT1 transporter','It destroys the villi','It stimulates motilin release'],a:0,
 e:'The toxin permanently switches on G<sub>s</sub>, so cAMP stays high and the CFTR chloride channel stays open. Water follows the chloride: litres of watery stool. Because glucose-linked sodium absorption still works, oral rehydration solution is effective.'},
{sec:'gi-micro',type:'sba',q:'A man develops fever, headache and muscle aches ten days after returning from Nigeria. Which test should be done first?',
 o:['Thick and thin blood films for malaria','Stool culture','Chest X-ray','Urine dipstick','Hepatitis serology'],a:0,
 e:'Fever in anyone who has been to a malarial area is malaria until proved otherwise, whatever prophylaxis was taken. Falciparum malaria can kill within days. Films are repeated if the first is negative.'},
{sec:'gi-micro',type:'saq',q:'Gut bacteria make short-chain fatty acids such as butyrate by fermenting which part of the diet?',acc:['fibre|fiber'],m:'Dietary fibre (carbohydrate we cannot digest)',
 e:'Fibre and resistant starch reach the colon undigested. Bacteria ferment them to short-chain fatty acids, the main fuel of colon cells.'},
{sec:'gi-micro',type:'sba',q:'Why must staff wash their hands with soap and water, not alcohol gel, after caring for a patient with C. difficile?',
 o:['The organism forms spores that alcohol does not kill','Alcohol gel spreads the toxin over the skin','The organism is a virus','Alcohol makes the bacteria release more toxin','Soap neutralises the toxin'],a:0,
 e:'<i>C. difficile</i> spores resist alcohol, heat and drying, and survive on surfaces for months. Washing physically removes them. Patients are isolated, and rooms are cleaned with chlorine-based disinfectant.'}
]};
})();
