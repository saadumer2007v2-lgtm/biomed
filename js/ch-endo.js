/* Endocrine and reproductive biomed. Data-driven chapter: see "DATA-DRIVEN CHAPTERS" in app.js for the block types. */
window.CHAPTERS=window.CHAPTERS||{};
CHAPTERS.endo={
short:'Endocrine',eyebrow:'Endocrine and reproductive biomed',h1:'Hormone axes, glucose and making a baby',
blurb:'Pituitary axes, adrenal, thyroid, glucose and diabetes, the menstrual cycle, embryology, pregnancy and birth.',
lede:'Almost every endocrine question is a feedback loop: a gland higher up drives a gland lower down, and the final hormone switches the drive off. Know the loop and you can predict the blood tests in any disease. The second half follows reproduction from gametes and the menstrual cycle through fertilisation, the embryo, pregnancy, labour and the baby\'s first breath.',
secs:[
/* ------------------------------------------------------------------ */
{id:'endo-axes',eb:'Principles',h:'Hormones and the hypothalamic–pituitary axis',p:'The hypothalamus is the link between brain and glands. It controls the anterior pituitary with releasing hormones sent down a private portal blood supply, and it makes the two posterior pituitary hormones itself.',b:[
 ['think','A central heating system. The thermostat (hypothalamus) tells the boiler controller (pituitary) to fire the boiler (target gland). The heat produced (the final hormone) is what switches the thermostat off. If the boiler breaks, the thermostat keeps calling for heat: the controlling hormone is high and the final hormone is low. That one idea decodes most endocrine blood tests.'],
 ['table',['Hormone class','Examples','Travels and is stored','Receptor','Speed'],[
  ['Peptide and protein','Insulin, glucagon, GH, ACTH, TSH, LH, FSH, ADH, oxytocin, PTH','Water-soluble; free in plasma; stored in vesicles ready for release','On the cell surface (GPCR or tyrosine kinase) → second messengers','Seconds to minutes; short half-life'],
  ['Steroid','Cortisol, aldosterone, oestrogen, progesterone, testosterone, calcitriol','Lipid-soluble; carried on binding proteins; made on demand from cholesterol','Inside the cell (nuclear receptor) → changes gene transcription','Hours to days; long-lasting'],
  ['Amine (from tyrosine)','Adrenaline, noradrenaline, dopamine; thyroid hormones','Catecholamines behave like peptides; thyroid hormones behave like steroids (carried on TBG)','Catecholamines: surface GPCRs. Thyroid hormones: nuclear receptors','Catecholamines: seconds. Thyroid: days']]],
 ['table',['Hypothalamus releases','Anterior pituitary releases','Target','End hormone and main effect'],[
  ['CRH','<b>ACTH</b>','Adrenal cortex','Cortisol: stress response, raises glucose'],
  ['TRH','<b>TSH</b>','Thyroid','T4 and T3: set metabolic rate'],
  ['GnRH (in pulses)','<b>LH and FSH</b>','Ovaries or testes','Sex steroids and gametes'],
  ['GHRH (+), somatostatin (−)','<b>Growth hormone</b>','Liver and tissues','IGF-1: growth; GH itself raises glucose and breaks down fat'],
  ['Dopamine (−)','<b>Prolactin</b>','Breast','Milk production; suppresses GnRH'],
  'Posterior pituitary: hormones are made in hypothalamic neurons (supraoptic and paraventricular nuclei) and released from their axon endings',
  ['(made in the hypothalamus)','<b>ADH (vasopressin)</b>','Kidney collecting duct (V2), vessels (V1)','Water reabsorption through aquaporin-2; vasoconstriction'],
  ['(made in the hypothalamus)','<b>Oxytocin</b>','Uterus, breast','Contractions in labour; milk ejection']]],
 ['p','Anterior pituitary hormones are remembered as <b>FLAT PeG</b>: FSH, LH, ACTH, TSH, Prolactin, GH. Prolactin is the odd one out: it is controlled mainly by <b>inhibition</b> (dopamine), so anything that cuts the pituitary stalk or blocks dopamine <b>raises</b> prolactin while the other hormones fall.'],
 ['widget','hormone'],
 ['two',
  ['axis','dg-gh','Growth hormone axis','GH is released in pulses, mostly during deep sleep.',{label:'Growth hormone axis',nodes:[{t:'Hypothalamus',s:'GHRH (+) and somatostatin (−)',c:'n-nerve'},{t:'Anterior pituitary',s:'somatotrophs',c:'n-org'},{t:'Liver',s:'and other tissues',c:'n-box'},{t:'Bone, cartilage, muscle',s:'growth',c:'n-bone'}],links:['GHRH','GH','IGF-1'],fb:[[2,0,'-','IGF-1'],[2,1,'-']],side:[[1,['octreotide ⊣','(somatostatin analogue)']],[2,['GH also: lipolysis,','raises blood glucose'],'sm']]}],
  ['card','Too much and too little growth hormone',['<b>Gigantism:</b> excess GH in childhood, <b>before</b> the growth plates fuse: very tall stature.','<b>Acromegaly:</b> excess GH in adults, <b>after</b> fusion, almost always a pituitary adenoma: large hands and feet (rings and shoes no longer fit), coarse face with prominent jaw and brow, large tongue, sweating, sleep apnoea, carpal tunnel syndrome, diabetes and hypertension.','<b>Tests:</b> raised IGF-1 (GH itself is pulsatile, so a random level is useless); GH fails to suppress in an oral glucose tolerance test; pituitary MRI.','<b>Treatment:</b> trans-sphenoidal surgery; somatostatin analogues (octreotide); pegvisomant (GH receptor blocker).','<b>GH deficiency</b> in children: short stature with a normal body shape; treated with recombinant GH.']]],
 ['notes',
  ['clin','Pituitary tumours','A pituitary adenoma causes problems in three ways. <b>Pressure:</b> on the optic chiasm above it, giving <b>bitemporal hemianopia</b> (loss of the outer half of each visual field), and headaches. <b>Too much hormone:</b> prolactinoma (commonest), acromegaly, Cushing\'s disease. <b>Too little:</b> the normal gland is squashed, so GH, LH and FSH fall first, then TSH and ACTH.'],
  ['clin','Prolactinoma','High prolactin suppresses GnRH: <b>amenorrhoea, infertility, loss of libido, erectile dysfunction</b>, plus galactorrhoea. Other causes of raised prolactin: pregnancy and breastfeeding, dopamine-blocking drugs (antipsychotics, metoclopramide), hypothyroidism (TRH stimulates prolactin), stalk compression. Treated with <b>dopamine agonists</b> (cabergoline, bromocriptine), which shrink the tumour.'],
  ['clin','Body clocks','The <b>suprachiasmatic nucleus</b> of the hypothalamus is the master clock, reset each day by light through the retinohypothalamic tract. Clock genes run a 24-hour feedback loop: CLOCK and BMAL1 switch on PER and CRY, whose proteins then switch CLOCK–BMAL1 off. The pineal gland releases <b>melatonin</b> in darkness. <b>Cortisol peaks at about 8–9 am</b> and is lowest around midnight, which is why cortisol is measured at 9 am and steroid tablets are taken in the morning.']]
]},
/* ------------------------------------------------------------------ */
{id:'endo-adrenal',eb:'Adrenal',h:'The adrenal glands',p:'Two glands in one. The cortex makes steroids in three layers: salt, sugar, sex. The medulla is a modified sympathetic ganglion that releases adrenaline into the blood.',b:[
 ['explore','dg-adrenal','Layers of the adrenal gland','"GFR: salt, sugar, sex. The deeper you go, the sweeter it gets." Tap a layer.',600,
  `<svg viewBox="0 0 760 292" role="img" aria-label="Adrenal gland layers">
   <g class="hd"><text x="200" y="18" text-anchor="middle">LAYER</text><text x="392" y="18">MAKES</text><text x="590" y="18">SWITCHED ON BY</text></g>
   <rect x="40" y="26" width="320" height="16" rx="6" class="n-box"/><text x="200" y="38" class="sm" text-anchor="middle">capsule</text>
   <g data-k="zg"><rect x="40" y="44" width="320" height="52" class="n-nerve"/><text x="200" y="75" class="b lab" text-anchor="middle">Zona glomerulosa</text><text x="392" y="66" class="b lab">Aldosterone</text><text x="392" y="82" class="sm">mineralocorticoid: "salt"</text><text x="590" y="66" class="sm lab">angiotensin II,</text><text x="590" y="82" class="sm">high plasma K⁺</text></g>
   <g data-k="zf"><rect x="40" y="98" width="320" height="86" class="n-org"/><text x="200" y="146" class="b lab" text-anchor="middle">Zona fasciculata</text><text x="392" y="136" class="b lab">Cortisol</text><text x="392" y="152" class="sm">glucocorticoid: "sugar"</text><text x="590" y="144" class="sm lab">ACTH</text></g>
   <g data-k="zr"><rect x="40" y="186" width="320" height="42" class="n-musc"/><text x="200" y="212" class="b lab" text-anchor="middle">Zona reticularis</text><text x="392" y="204" class="b lab">Androgens (DHEA)</text><text x="392" y="220" class="sm">"sex"</text><text x="590" y="212" class="sm lab">ACTH</text></g>
   <g data-k="med"><rect x="40" y="230" width="320" height="50" rx="6" class="n-blood"/><text x="200" y="260" class="b lab" text-anchor="middle">Medulla</text><text x="392" y="252" class="b lab">Adrenaline, noradrenaline</text><text x="392" y="268" class="sm">catecholamines</text><text x="590" y="252" class="sm lab">sympathetic nerves</text><text x="590" y="268" class="sm">(preganglionic, ACh)</text></g>
  </svg>`,
  {zg:['Zona glomerulosa → aldosterone','Acts on principal cells of the distal nephron: more ENaC and Na⁺/K⁺ ATPase, so <b>sodium and water are kept, potassium and H⁺ are lost</b>. Controlled by the renin–angiotensin system and plasma potassium, <b>not</b> mainly by ACTH, which is why aldosterone is spared when the pituitary fails.'],
   zf:['Zona fasciculata → cortisol','The stress hormone. Raises blood glucose (gluconeogenesis, insulin resistance), breaks down protein and fat, suppresses inflammation and immunity, reduces bone formation, keeps blood pressure up by letting catecholamines work. Controlled by ACTH, with a daily rhythm.'],
   zr:['Zona reticularis → adrenal androgens','DHEA and androstenedione, weak androgens converted to testosterone in tissues. They drive adrenarche (pubic and axillary hair) and are the main androgen source in women. In congenital adrenal hyperplasia (21-hydroxylase deficiency), blocked cortisol synthesis shunts precursors here: virilisation with salt-wasting.'],
   med:['Medulla → catecholamines','Chromaffin cells are postganglionic sympathetic neurons without axons, from the neural crest. They release about 80% adrenaline and 20% noradrenaline into the blood for "fight or flight". A <b>phaeochromocytoma</b> is a tumour of these cells.']}],
 ['two',
  ['axis','dg-hpa','The HPA axis','Stress, low glucose and the body clock all drive CRH.',{label:'Hypothalamic pituitary adrenal axis',nodes:[{t:'Hypothalamus',s:'paraventricular nucleus',c:'n-nerve'},{t:'Anterior pituitary',s:'corticotrophs',c:'n-org'},{t:'Adrenal cortex',s:'zona fasciculata',c:'n-box'}],links:['CRH','ACTH','cortisol'],fb:[[2,0,'-','cortisol'],[2,1,'-']],fx:['Cortisol','raises glucose · breaks down protein and fat','suppresses immunity · maintains blood pressure']}],
  ['card','What cortisol does',['<b>Metabolism:</b> gluconeogenesis, protein breakdown (thin skin, muscle wasting), fat redistribution to face and trunk.','<b>Immune:</b> fewer lymphocytes and eosinophils, less cytokine and prostaglandin production.','<b>Circulation:</b> needed for catecholamines to maintain vascular tone; at high levels it also acts on aldosterone receptors (sodium retention, low potassium).','<b>Bone:</b> fewer osteoblasts, less calcium absorption: osteoporosis.','<b>Brain:</b> alertness; in excess, low mood, insomnia or psychosis.'],'Every side effect of long-term prednisolone is one of these actions turned up.']],
 ['table',['','Addison\'s disease','Cushing\'s syndrome','Conn\'s syndrome','Phaeochromocytoma'],[
  ['Problem','Too little cortisol and aldosterone (primary adrenal failure)','Too much cortisol','Too much aldosterone','Too much adrenaline and noradrenaline'],
  ['Causes','Autoimmune (UK); TB (worldwide); metastases; haemorrhage','<b>Steroid tablets</b> (commonest); pituitary adenoma (Cushing\'s <i>disease</i>); adrenal adenoma; ectopic ACTH (small cell lung cancer)','Bilateral adrenal hyperplasia; adrenal adenoma','Tumour of the adrenal medulla'],
  ['Features','Tiredness, weight loss, dizziness on standing, <b>pigmentation</b> (palmar creases, mouth), salt craving, vomiting','Central obesity, moon face, buffalo hump, <b>purple striae</b>, thin skin and bruising, proximal weakness, hypertension, diabetes, osteoporosis','<b>Hypertension</b> (often resistant) with <b>low potassium</b>: weakness, cramps, polyuria','<b>Episodes</b> of headache, sweating and palpitations with very high blood pressure'],
  ['Bloods','<b>Low Na⁺, high K⁺</b>, low glucose','High glucose, low K⁺ if severe','Low K⁺, metabolic alkalosis; <b>high aldosterone with low renin</b>','Raised plasma or urinary metanephrines'],
  ['Key test','9 am cortisol, then <b>short Synacthen test</b>: cortisol fails to rise','<b>Dexamethasone suppression test</b>: cortisol fails to fall; then ACTH to find the source','Aldosterone : renin ratio','Metanephrines, then imaging'],
  ['Treatment','Hydrocortisone + fludrocortisone for life; double the dose when ill','Remove the cause (surgery); reduce steroid dose slowly','Spironolactone; adrenalectomy for an adenoma','<b>Alpha-blocker first</b>, then beta-blocker, then surgery']]],
 ['notes',
  ['clin','Addisonian (adrenal) crisis','Illness, surgery or a missed dose in someone who cannot make cortisol: <b>collapse with low blood pressure, low sodium, high potassium and low glucose</b>. Give <b>IV hydrocortisone 100 mg</b> and IV saline (with glucose) immediately, before waiting for results. The same crisis happens if long-term steroids are stopped suddenly, because the patient\'s own axis is suppressed.'],
  ['clin','Why Addison\'s causes pigmentation','ACTH is cut from a larger precursor, POMC, which also yields melanocyte-stimulating hormone. With no cortisol feedback, the pituitary makes more POMC, so both ACTH and MSH rise and the skin darkens. In <b>secondary</b> adrenal failure (pituitary disease) ACTH is low, so there is no pigmentation, and potassium is normal because aldosterone still works.']]
]},
/* ------------------------------------------------------------------ */
{id:'endo-thyroid',eb:'Thyroid',h:'The thyroid',p:'A butterfly-shaped gland in front of the trachea (C5–T1) that sets the body\'s metabolic rate. Its follicles store hormone as thyroglobulin in colloid, enough for weeks.',b:[
 ['pwside','thyroidsyn',
  ['axis','dg-hpt','The HPT axis','TSH is the most sensitive single test of thyroid function.',{label:'Hypothalamic pituitary thyroid axis',step:86,nodes:[{t:'Hypothalamus',c:'n-nerve'},{t:'Anterior pituitary',s:'thyrotrophs',c:'n-org'},{t:'Thyroid follicles',c:'n-box'},{t:'Tissues',s:'T4 → T3 (active)',c:'n-imm'}],links:['TRH','TSH','T4 (and some T3)'],fb:[[3,0,'-','T3, T4'],[3,1,'-']],side:[[2,['carbimazole ⊣ TPO']]]}]],
 ['cards',[
  ['What thyroid hormone does',['<b>Raises basal metabolic rate</b> and heat production (more Na⁺/K⁺ ATPase and mitochondria).','<b>Sensitises the body to catecholamines</b> (more β-receptors): fast heart rate, tremor, anxiety.','Essential for <b>brain development and growth</b> in the fetus and child: congenital hypothyroidism is screened for on the newborn heel-prick test.','Speeds gut motility, bone turnover and reflexes.','<b>T4</b> is the main product and a prohormone (half-life about a week); tissues convert it to <b>T3</b>, the active form. Over 99% of both is bound to thyroxine-binding globulin; only the free fraction is active.']],
  ['Structure and surgical risks',['Two lobes joined by an isthmus over the 2nd–4th tracheal rings; moves up on swallowing.','<b>Blood supply:</b> superior thyroid artery (from the external carotid) and inferior thyroid artery (from the thyrocervical trunk of the subclavian).','<b>Follicular cells</b> make T4 and T3; <b>parafollicular C cells</b> make calcitonin.','<b>At thyroidectomy:</b> the <b>recurrent laryngeal nerve</b> runs behind the gland (damage causes a hoarse voice), and the <b>parathyroids</b> may be removed or bruised (low calcium, tingling and tetany).']]]],
 ['table',['','Hyperthyroidism (thyrotoxicosis)','Hypothyroidism'],[
  ['Causes','<b>Graves\' disease</b> (commonest), toxic multinodular goitre, toxic adenoma, thyroiditis, amiodarone, too much levothyroxine','<b>Hashimoto\'s thyroiditis</b> (commonest in the UK), iodine deficiency (commonest worldwide), after thyroidectomy or radioiodine, lithium, amiodarone'],
  ['Weight and appetite','Weight <b>loss</b> despite a big appetite','Weight <b>gain</b>, poor appetite'],
  ['Temperature','Heat intolerance, sweating','Cold intolerance'],
  ['Heart','Palpitations, tachycardia, <b>atrial fibrillation</b>','Bradycardia'],
  ['Gut','Diarrhoea','Constipation'],
  ['Nervous system','Anxiety, tremor, insomnia, brisk reflexes','Tiredness, low mood, slow thinking, <b>slow-relaxing reflexes</b>'],
  ['Skin and hair','Warm moist skin, fine hair','Dry skin, coarse thinning hair, loss of outer eyebrows, puffy face'],
  ['Periods','Light or absent','Heavy'],
  ['Bloods','<b>TSH low</b>, T4 and T3 high','<b>TSH high</b>, T4 low'],
  ['Treatment','<b>Carbimazole</b> (blocks TPO; warn about sore throat: agranulocytosis), propranolol for symptoms, radioiodine, surgery','<b>Levothyroxine</b>, dose adjusted to TSH']]],
 ['fix','Repro and Endocrine deck · hyper vs hypothyroidism','The causes are printed under the wrong headings. <b>Graves\' disease</b>, toxic adenomas and TSH-secreting tumours cause <b>hyper</b>thyroidism; pituitary or hypothalamic damage, thyroid destruction and <b>iodine deficiency</b> cause <b>hypo</b>thyroidism.'],
 ['table',['Pattern','TSH','Free T4','Think of'],[
  ['Primary hypothyroidism','<span class="up">↑</span>','<span class="down">↓</span>','Hashimoto\'s, iodine deficiency, after treatment'],
  ['Subclinical hypothyroidism','<span class="up">↑</span>','normal','Early failure; treat if TSH above 10 or symptomatic'],
  ['Secondary hypothyroidism','<span class="down">↓</span> or normal','<span class="down">↓</span>','Pituitary disease: check the other axes'],
  ['Primary hyperthyroidism','<span class="down">↓</span>','<span class="up">↑</span>','Graves\', toxic nodules, thyroiditis'],
  ['TSH-secreting adenoma','<span class="up">↑</span> or normal','<span class="up">↑</span>','Rare'],
  ['Sick euthyroid','normal or <span class="down">↓</span>','low T3, sometimes low T4','Any severe illness: repeat after recovery']]],
 ['notes',
  ['clin','Graves\' disease','Type II hypersensitivity: <b>IgG antibodies stimulate the TSH receptor</b>, so the whole gland overworks and enlarges (smooth goitre, sometimes with a bruit). Features specific to Graves\': <b>eye disease</b> (exophthalmos, from T cells and fibroblasts laying down water-holding glycosaminoglycans behind the eye; worse in smokers), <b>pretibial myxoedema</b> and thyroid acropachy. The antibodies cross the placenta and can cause neonatal thyrotoxicosis.'],
  ['clin','Hashimoto\'s thyroiditis','Autoimmune destruction of the gland by cytotoxic T cells, with <b>anti-thyroid peroxidase (anti-TPO)</b> and anti-thyroglobulin antibodies. A firm goitre at first, then atrophy. Commoner in women and with other autoimmune diseases (type 1 diabetes, coeliac disease, vitiligo, Addison\'s); small risk of thyroid lymphoma.'],
  ['clin','Thyroid cancers','<b>Papillary</b> (most common, young adults, spreads to lymph nodes, excellent outlook). <b>Follicular</b> (spreads by blood to bone and lung). <b>Medullary</b> (from C cells; calcitonin is the tumour marker; part of MEN2). <b>Anaplastic</b> (older people, very aggressive). A thyroid lump is assessed with TFTs, ultrasound and fine needle aspiration.']]
]},
/* ------------------------------------------------------------------ */
{id:'endo-glucose',eb:'Pancreas',h:'Glucose control and diabetes',p:'Blood glucose is held between about 4 and 7 mmol/L. Insulin is the only hormone that lowers it; glucagon, adrenaline, cortisol and growth hormone all raise it.',b:[
 ['think','Insulin is the key that lets glucose into muscle and fat, and the signal that says "we have just eaten: store". In type 1 diabetes there is no key. In type 2 the locks are stiff (insulin resistance) and the key-cutter slowly wears out.'],
 ['fig','dg-beta','How a β-cell senses glucose and releases insulin','The more glucose that enters, the more ATP is made, and the more insulin is released.',620,
  `<svg viewBox="0 0 760 300" role="img" aria-label="Insulin secretion by the beta cell">
   <rect x="150" y="50" width="440" height="200" rx="40" class="n-org"/>
   <path d="M40,110 H140" class="a-stim"/><text x="44" y="100" class="sm lab b">1 Glucose</text>
   <rect x="142" y="96" width="16" height="28" rx="4" class="n-nerve"/><text x="150" y="142" class="sm lab" text-anchor="middle">GLUT2</text>
   <text x="186" y="108" class="sm">2 Glucokinase, glycolysis:</text><text x="186" y="126" class="sm lab b">ATP rises</text>
   <path d="M262,122 C310,112 350,92 368,74" class="a-stim"/>
   <rect x="372" y="42" width="16" height="28" rx="4" class="n-blood"/><text x="380" y="30" class="sm lab b" text-anchor="middle">3 ATP closes the K⁺ channel</text><text x="398" y="88" class="sm">K⁺ can no longer leave</text>
   <text x="440" y="128" class="sm lab b">4 Membrane depolarises</text>
   <rect x="582" y="136" width="16" height="28" rx="4" class="n-blood"/><path d="M704,150 H604" class="a-stim"/><text x="654" y="132" class="sm lab b" text-anchor="middle">5 Ca²⁺ channel opens</text><text x="654" y="170" class="sm" text-anchor="middle">Ca²⁺ flows in</text>
   <g style="fill:var(--clin-tint);stroke:var(--clin);stroke-width:1.5"><circle cx="400" cy="196" r="9"/><circle cx="430" cy="212" r="9"/><circle cx="370" cy="212" r="9"/><circle cx="400" cy="226" r="9"/></g>
   <path d="M400,240 V284" class="a-stim"/><text x="414" y="280" class="sm lab b">6 Insulin and C-peptide released</text>
   <rect x="476" y="2" width="230" height="34" rx="8" class="n-drug"/><text x="591" y="23" class="sm t-drug" text-anchor="middle">Sulfonylureas close this channel</text>
   <path d="M476,22 C446,28 414,36 394,46" class="a-drug"/>
   <text x="160" y="280" class="sm">GLP-1 from the gut amplifies release</text>
  </svg>`],
 ['pw','insulinsec','dka'],
 ['table',['','Insulin (β cells): the fed state','Glucagon (α cells): the fasting state'],[
  ['Released when','Glucose rises; also amino acids, GLP-1 and GIP (incretins), vagus','Glucose falls; also amino acids, adrenaline'],
  ['Liver','Glycogen synthesis; stops gluconeogenesis and ketone production','Glycogen breakdown, gluconeogenesis, ketone production'],
  ['Muscle','GLUT4 moves to the membrane: glucose uptake; glycogen and protein synthesis','No receptors (muscle responds to adrenaline instead)'],
  ['Fat','Glucose uptake and fat storage; stops lipolysis','Lipolysis'],
  ['Potassium','Drives K⁺ into cells (used to treat hyperkalaemia)','—'],
  ['Net effect','<b>Lowers</b> blood glucose; an anabolic, storage hormone','<b>Raises</b> blood glucose']]],
 ['table',['Transporter','Where','Feature'],[
  ['GLUT1','Red cells, blood–brain barrier, most cells','Basal uptake, insulin-independent'],
  ['GLUT2','β cells, liver, kidney, gut (basolateral)','Low affinity, high capacity: lets the β cell and liver "sense" glucose'],
  ['GLUT3','Neurons','High affinity: the brain takes glucose even when levels are low'],
  ['GLUT4','Skeletal muscle and fat','<b>Insulin-dependent</b>; also moved to the membrane by exercise'],
  ['GLUT5','Small intestine','Fructose'],
  ['SGLT1 / SGLT2','Gut / kidney proximal tubule','Sodium-coupled active uptake; SGLT2 inhibitors make the kidney lose glucose']]],
 ['table',['','Type 1 diabetes','Type 2 diabetes'],[
  ['Cause','Autoimmune destruction of β cells (T cells; anti-GAD and islet antibodies): <b>absolute insulin deficiency</b>','<b>Insulin resistance</b> plus gradual β-cell failure; strong link with obesity and family history'],
  ['Typical patient','Child or young adult, lean','Older, overweight; increasingly younger'],
  ['Onset','Days to weeks: thirst, polyuria, weight loss; may present in DKA','Slow; often found on screening or with complications'],
  ['Ketones','Prone to ketoacidosis','Rare; instead hyperosmolar hyperglycaemic state'],
  ['C-peptide','Low or absent','Normal or high early on'],
  ['Treatment','<b>Insulin</b> for life (basal–bolus or pump), carbohydrate counting','Lifestyle and weight loss; <b>metformin</b>; SGLT2 inhibitor, GLP-1 agonist, DPP-4 inhibitor, sulfonylurea; insulin later']]],
 ['cards',[
  ['Diagnosing diabetes',['With symptoms, <b>one</b> abnormal result; without symptoms, <b>two</b> on separate days.','Fasting glucose <b>≥ 7.0 mmol/L</b>.','Random glucose or 2-hour OGTT <b>≥ 11.1 mmol/L</b>.','<b>HbA1c ≥ 48 mmol/mol</b> (6.5%). HbA1c 42–47 is "pre-diabetes".','HbA1c reflects the last 2–3 months, so it is not used for suspected type 1, in children, in pregnancy, or when red cell lifespan is abnormal.']],
  ['Hypoglycaemia',['Glucose below <b>4.0 mmol/L</b> ("four is the floor"), usually from insulin or a sulfonylurea.','<b>Autonomic:</b> sweating, tremor, palpitations, hunger. <b>Brain starved of glucose:</b> confusion, slurred speech, drowsiness, seizures, coma.','Conscious: 15–20 g of fast-acting carbohydrate, then a longer-acting snack.','Unconscious: <b>IM glucagon 1 mg</b> or IV 10–20% glucose.']],
  ['Complications of diabetes',['<b>Microvascular:</b> retinopathy, nephropathy (first sign: raised urine albumin:creatinine ratio), neuropathy (glove-and-stocking, autonomic).','<b>Macrovascular:</b> heart attack, stroke, peripheral arterial disease.','<b>Feet:</b> neuropathy plus ischaemia plus infection: ulcers and amputation.','High glucose glycates proteins and damages endothelium; good control of glucose, blood pressure and lipids prevents most of it.']]]],
 ['table',['Drug','How it works','Main points'],[
  ['Metformin','Reduces liver glucose output and improves insulin sensitivity (activates AMPK)','First line; no hypoglycaemia, no weight gain; GI upset; stop if eGFR below 30 (lactic acidosis)'],
  ['SGLT2 inhibitors (dapagliflozin, empagliflozin)','Block glucose reabsorption in the proximal tubule: glucose is lost in urine','Protect heart and kidneys; genital thrush, urinary infection, ketoacidosis with near-normal glucose'],
  ['GLP-1 receptor agonists (semaglutide, liraglutide)','Mimic incretin: more insulin when glucose is high, slower stomach emptying, less appetite','Weight loss; nausea; injections'],
  ['DPP-4 inhibitors (sitagliptin)','Stop breakdown of the body\'s own incretins','Well tolerated, modest effect'],
  ['Sulfonylureas (gliclazide)','Close the K⁺<sub>ATP</sub> channel on β cells: insulin release whatever the glucose','<b>Hypoglycaemia</b>, weight gain'],
  ['Insulin','Replaces the hormone; rapid-acting with meals, long-acting as background','Hypoglycaemia, weight gain, lumps at injection sites']]],
 ['clin','Diabetic ketoacidosis','<b>Diagnosis needs all three:</b> glucose above 11 mmol/L (or known diabetes), blood ketones 3 mmol/L or more, and pH below 7.3 or bicarbonate below 15. Features: thirst and polyuria, vomiting, abdominal pain, deep sighing (Kussmaul) breathing, ketotic breath, drowsiness. <b>Treatment order:</b> IV 0.9% saline first, then fixed-rate IV insulin (0.1 units/kg/hour), with potassium added to the fluids because insulin drives potassium into cells. Add glucose once blood glucose is below 14, and keep the insulin going until the ketones clear.']
]},
/* ------------------------------------------------------------------ */
{id:'repro-axis',eb:'Reproduction',h:'The gonadal axis, gametes and puberty',p:'GnRH pulses drive LH and FSH in both sexes. In the testis the feedback is simple and negative. In the ovary it flips from negative to positive once a month, and that flip causes ovulation.',b:[
 ['two',
  ['axis','dg-hpgm','Male gonadal axis','LH for Leydig cells; FSH for Sertoli cells.',{label:'Male gonadal axis',nodes:[{t:'Hypothalamus',s:'GnRH in pulses',c:'n-nerve'},{t:'Anterior pituitary',c:'n-org'},{t:'Testis',s:'Leydig and Sertoli cells',c:'n-box'}],links:['GnRH','LH and FSH','testosterone, inhibin'],fb:[[2,0,'-','testosterone'],[2,1,'-','inhibin (FSH)']],fx:['Testosterone','sperm production · libido · muscle and bone','male secondary sexual characteristics']}],
  ['card','The two cells of the testis',['<b>Leydig cells</b> (between the tubules) respond to <b>LH</b> and make <b>testosterone</b>. Some is converted to the more potent DHT by 5α-reductase (external genitalia, prostate, male-pattern hair) and some to oestradiol by aromatase.','<b>Sertoli cells</b> (inside the tubules) respond to <b>FSH</b> and testosterone: they nurse developing sperm, make androgen-binding protein and <b>inhibin</b> (which switches off FSH), and in the fetus make anti-Müllerian hormone.','Tight junctions between Sertoli cells form the <b>blood–testis barrier</b>, hiding the new haploid cells from the immune system.','Sperm production needs a temperature 2–3 °C below core, hence the scrotum.'],'Route of sperm, "SEVEN UP": Seminiferous tubules, Epididymis, Vas deferens, Ejaculatory duct, (Nothing), Urethra, Penis.']],
 ['pw','spermato','oogenesis'],
 ['table',['','Sperm production','Egg production'],[
  ['Starts','At puberty, continues for life','In the <b>fetus</b>; no new oocytes after birth'],
  ['Numbers','About 100 million a day','About 7 million at 20 weeks of fetal life, 1–2 million at birth, 400,000 at puberty; about 400 are ever ovulated'],
  ['Time taken','About 70 days','Decades: arrested in prophase I from before birth until the cycle in which the egg is ovulated'],
  ['Cells from one meiosis','Four equal sperm','One large egg and polar bodies (the cytoplasm is not shared out)'],
  ['Second arrest','None','Metaphase II, until a sperm enters'],
  ['Clinical','Long exposure to heat, drugs or illness shows in the semen about 3 months later','The long arrest explains why chromosome errors (e.g. trisomy 21) rise with maternal age']]],
 ['cards',[
  ['Puberty',['<b>Adrenarche</b> (about 6–8 years): the zona reticularis starts making androgens: pubic and axillary hair, body odour. Independent of GnRH.','<b>Gonadarche:</b> the hypothalamus starts releasing GnRH in pulses (first at night).','<b>Girls (8–13):</b> breast buds first, then pubic hair, growth spurt, and menarche about 2 years after breast buds (average 12–13).','<b>Boys (9–14):</b> testes enlarge first (4 mL or more), then penis and pubic hair, a later and bigger growth spurt, voice change.','Staged with <b>Tanner stages</b> 1–5.']],
  ['Too early, too late',['<b>Precocious puberty:</b> breast development before 8 in girls; testicular enlargement before 9 in boys. Needs investigation, especially in boys.','<b>Delayed puberty:</b> no breast development by 13 (or no periods by 15) in girls; no testicular enlargement by 14 in boys. Most often constitutional delay.','<b>Primary amenorrhoea:</b> no periods by 15. <b>Secondary amenorrhoea:</b> periods stop for 3 months or more: think pregnancy first, then PCOS, low weight or stress, high prolactin, thyroid disease, early menopause.']]]],
 ['table',['Hypogonadism','LH and FSH','Sex hormones','Examples'],[
  ['Primary (the gonad has failed): <b>hypergonadotropic</b>','<span class="up">↑</span>','<span class="down">↓</span>','Klinefelter syndrome (47,XXY), Turner syndrome (45,X), menopause and premature ovarian insufficiency, chemotherapy, mumps orchitis'],
  ['Secondary (no drive from above): <b>hypogonadotropic</b>','<span class="down">↓</span>','<span class="down">↓</span>','Kallmann syndrome (with no sense of smell), pituitary tumours, prolactinoma, anorexia, heavy exercise, opioids, anabolic steroids']]],
 ['fix','Repro and Endocrine deck · infertility','The slide names the two types "hypertrophic" and "hypotrophic" hypogonadism. The correct terms are <b>hypergonadotropic</b> (primary: high FSH and LH) and <b>hypogonadotropic</b> (secondary: low FSH and LH).']
]},
/* ------------------------------------------------------------------ */
{id:'repro-cycle',eb:'Reproduction',h:'The menstrual cycle',p:'Day 1 is the first day of bleeding. The first half grows a follicle and rebuilds the lining under oestrogen; the LH surge releases the egg; the second half prepares the lining for implantation under progesterone. The luteal phase is always about 14 days; a longer or shorter cycle means a longer or shorter follicular phase.',b:[
 ['explore','dg-cycle','Hormones across a 28-day cycle','Top: pituitary hormones. Bottom: ovarian hormones. Tap a phase.',640,
  `<svg viewBox="0 0 760 404" role="img" aria-label="Menstrual cycle hormone graph">
   <path class="ax" d="M70,34 V150 H712"/><path class="ax" d="M70,196 V312 H712"/>
   <text x="24" y="96" class="sm" text-anchor="middle" transform="rotate(-90 24 96)">pituitary</text><text x="24" y="256" class="sm" text-anchor="middle" transform="rotate(-90 24 256)">ovary</text>
   <g data-k="menses"><rect class="hit" x="70" y="30" width="95" height="350"/><rect x="70" y="330" width="95" height="20" rx="5" class="n-blood"/><text x="117" y="344" class="sm lab" text-anchor="middle">menses</text></g>
   <g data-k="foll"><rect class="hit" x="165" y="30" width="200" height="350"/><rect x="167" y="330" width="209" height="20" rx="5" class="n-org"/><text x="270" y="344" class="sm lab" text-anchor="middle">proliferative lining</text><text x="296" y="236" class="sm lab b" text-anchor="end" style="fill:var(--artery)">oestradiol</text><text x="118" y="112" class="sm lab b" style="fill:var(--vein)">FSH</text></g>
   <g data-k="ov"><rect class="hit" x="365" y="30" width="28" height="350"/><path d="M378,36 V376" stroke="var(--ink-2)" stroke-width="1.4" stroke-dasharray="5 4"/><text x="398" y="50" class="sm lab b" style="fill:var(--pw-micro)">LH surge</text><text x="378" y="26" class="sm lab b" text-anchor="middle">ovulation, day 14</text></g>
   <g data-k="lut"><rect class="hit" x="393" y="30" width="319" height="350"/><rect x="380" y="330" width="330" height="20" rx="5" class="n-imm"/><text x="545" y="344" class="sm lab" text-anchor="middle">secretory lining</text><text x="556" y="200" class="sm lab b" style="fill:var(--lymph)">progesterone</text></g>
   <rect x="70" y="356" width="306" height="20" rx="5" class="n-box"/><text x="223" y="370" class="sm" text-anchor="middle">ovary: follicular phase</text>
   <rect x="380" y="356" width="330" height="20" rx="5" class="n-box"/><text x="545" y="370" class="sm" text-anchor="middle">ovary: luteal phase (corpus luteum)</text>
   <g style="pointer-events:none">
    <path class="c5" d="M70,138 C200,138 320,136 350,128 C366,120 372,50 378,46 C386,50 392,122 410,132 C480,140 600,140 710,140"/>
    <path class="c2" d="M70,128 C110,116 150,118 190,126 C260,136 330,134 356,126 C368,116 374,96 378,94 C384,96 392,124 410,134 C500,142 600,142 660,138 C690,134 700,130 710,128"/>
    <path class="c1" d="M70,300 C150,298 230,290 290,262 C320,244 340,214 352,212 C364,214 372,250 386,266 C410,280 440,262 500,256 C560,252 620,280 710,300"/>
    <path class="c3" d="M70,304 C200,304 340,304 378,300 C420,290 480,214 544,210 C600,208 650,270 710,302"/>
   </g>
   <g class="sm" text-anchor="middle"><text x="70" y="396">day 1</text><text x="212" y="396">7</text><text x="378" y="396">14</text><text x="544" y="396">21</text><text x="710" y="396">28</text></g>
  </svg>`,
  {menses:['Days 1–5 · menstruation','No pregnancy, so the corpus luteum has died and <b>progesterone and oestrogen have fallen</b>. The spiral arteries constrict and the <b>functional layer</b> of the endometrium is shed (the basal layer stays to rebuild it). With no negative feedback, <b>FSH rises</b> and recruits a new group of follicles.'],
   foll:['Days 1–13 · follicular (proliferative) phase','FSH grows the follicles. LH makes theca cells produce androgens; FSH makes granulosa cells convert them to <b>oestradiol</b>. One dominant follicle emerges; the others die as rising oestrogen and inhibin lower FSH. Oestrogen thickens the endometrium and makes cervical mucus thin and stretchy for sperm.'],
   ov:['Day 14 · ovulation','Once oestradiol has been high for about two days, feedback <b>flips from negative to positive</b>: a surge of LH. The oocyte completes meiosis I, and about 36 hours after the surge begins the follicle ruptures and releases a secondary oocyte (arrested in metaphase II) into the uterine tube.'],
   lut:['Days 15–28 · luteal (secretory) phase','The empty follicle becomes the <b>corpus luteum</b>, which makes <b>progesterone</b> (and oestrogen). Progesterone makes the lining secretory and ready for implantation, thickens cervical mucus, raises body temperature by about 0.5 °C, and suppresses LH and FSH. Without hCG from an embryo, the corpus luteum dies after about 10–12 days.']}],
 ['pwside','cycle',
  ['axis','dg-hpgf','Female gonadal axis','Feedback depends on the time of the month.',{label:'Female gonadal axis',nodes:[{t:'Hypothalamus',s:'GnRH in pulses',c:'n-nerve'},{t:'Anterior pituitary',c:'n-org'},{t:'Ovary',s:'theca and granulosa cells',c:'n-box'}],links:['GnRH','LH and FSH','oestrogen, progesterone, inhibin'],fb:[[2,0,'-','most of cycle'],[2,1,'+','high oestrogen']],fx:['Two cells, two hormones','LH → theca cells → androgens','FSH → granulosa cells (aromatase) → oestradiol']}],
  ['clin','Using the cycle','<b>Combined pill:</b> steady oestrogen and progestogen give constant negative feedback, so there is no FSH rise, no dominant follicle and no LH surge. <b>Ovulation tests</b> detect the LH surge in urine. <b>Day-21 progesterone</b> confirms that ovulation happened. <b>Menopause</b> (average age 51): no follicles left, so oestrogen is low and <b>FSH is high</b>; hot flushes, vaginal dryness and faster bone loss.']],
 ['fix','Repro and Endocrine deck · luteal phase','The slide says thick cervical mucus "prevents polyspermy". Thick mucus stops further sperm and bacteria entering the uterus; the block to <b>polyspermy</b> is the cortical reaction of the egg at fertilisation. Only the <b>functional layer</b> of the endometrium is shed, not the whole lining.']
]},
/* ------------------------------------------------------------------ */
{id:'repro-embryo',eb:'Embryology',h:'Fertilisation and the early embryo',p:'Week 1: one cell becomes a blastocyst and implants. Week 2: two layers. Week 3: three layers. Weeks 3–8: every organ is laid down, which is when drugs and infections do the most damage.',b:[
 ['pw','fertilisation','embryo3'],
 ['table',['When','What forms','Remember'],[
  ['Day 0','Fertilisation in the <b>ampulla</b> of the uterine tube: zygote','Ectopic pregnancies are commonest in the ampulla'],
  ['Days 1–4','Cleavage divisions → <b>morula</b> (16 cells)','Cells are still totipotent'],
  ['Day 5','<b>Blastocyst</b>: inner cell mass (embryoblast) + outer trophoblast + fluid cavity','Inner cell mass → embryo; trophoblast → placenta'],
  ['Days 6–10','<b>Implantation</b> into the endometrium','hCG becomes detectable'],
  ['Week 2','<b>Bilaminar disc</b>: epiblast and hypoblast. Trophoblast splits into cytotrophoblast and syncytiotrophoblast. Amniotic cavity and yolk sac','"Rule of twos"'],
  ['Week 3','<b>Gastrulation</b>: the primitive streak forms and epiblast cells migrate through it to make <b>ectoderm, mesoderm and endoderm</b>. Notochord; neurulation begins','"Rule of threes"'],
  ['Weeks 3–8','<b>Embryonic period:</b> organogenesis; the embryo folds into a 3D body','Most sensitive to teratogens'],
  ['Week 9 to birth','<b>Fetal period:</b> growth and maturation','']]],
 ['table',['Germ layer','Becomes'],[
  ['Ectoderm','Epidermis, hair and nails; <b>brain, spinal cord and nerves</b> (neuroectoderm); neural crest (ganglia, Schwann cells, adrenal medulla, melanocytes); lens; tooth enamel'],
  ['Mesoderm','<b>Muscle, bone, cartilage</b>, connective tissue, dermis; <b>heart, vessels and blood</b>; <b>kidneys and gonads</b>; spleen; adrenal cortex'],
  ['Endoderm','<b>Lining of the gut and airways</b>; liver, pancreas; thyroid, parathyroids, thymus; lining of the bladder'],
  ['Mesoderm subdivisions','<b>Paraxial</b> → somites (vertebrae and ribs, skeletal muscle, dermis). <b>Intermediate</b> → kidneys, gonads and their ducts. <b>Lateral plate</b> → body wall and limb bones (somatic layer); heart, vessels and gut wall (splanchnic layer)']]],
 ['pwside','sexdiff',
  ['table',['Starting structure','In a male (testosterone, DHT, AMH)','In a female (no SRY)'],[
   ['Gonad','Testis (SRY gene on Y)','Ovary'],
   ['Mesonephric (Wolffian) duct','<b>S</b>eminal vesicle, <b>E</b>pididymis, <b>E</b>jaculatory duct, <b>D</b>uctus deferens','Regresses'],
   ['Paramesonephric (Müllerian) duct','Regresses (anti-Müllerian hormone)','Uterine tubes, uterus, cervix, upper vagina'],
   ['Genital tubercle','Glans and shaft of penis','Clitoris'],
   ['Urethral folds','Fuse → penile urethra','Stay open → labia minora'],
   ['Labioscrotal swellings','Fuse → scrotum','Labia majora']]],
  ['clin','When ducts go wrong','Failure of the two Müllerian ducts to fuse gives a <b>double or bicornuate uterus</b>, often with kidney abnormalities because the ducts develop alongside the urinary system. Incomplete fusion of the urethral folds gives <b>hypospadias</b>. In <b>androgen insensitivity syndrome</b> a 46,XY person has testes and AMH (so no uterus) but cannot respond to testosterone, so the external appearance is female.']],
 ['table',['Condition','Karyotype','Features'],[
  ['Down syndrome','Trisomy 21','Upslanting eyes with epicanthic folds, flat nasal bridge, single palmar crease, hypotonia, learning disability, <b>atrioventricular septal defect</b>, duodenal atresia; later hypothyroidism, leukaemia, early Alzheimer\'s'],
  ['Edwards syndrome','Trisomy 18','Small jaw, low-set ears, <b>clenched hands with overlapping fingers, rocker-bottom feet</b>, severe heart defects; most die before or soon after birth'],
  ['Patau syndrome','Trisomy 13','<b>Cleft lip and palate, small eyes, extra fingers</b>, brain and heart defects'],
  ['Turner syndrome','45,X','Short stature, webbed neck, streak ovaries with primary amenorrhoea, coarctation of the aorta'],
  ['Klinefelter syndrome','47,XXY','Tall, small firm testes, gynaecomastia, infertility, low testosterone with high LH and FSH']]],
 ['cards',[
  ['Antenatal screening in the UK',['<b>Combined test (11–14 weeks):</b> nuchal translucency on ultrasound + blood hCG and PAPP-A + maternal age. Down syndrome: thick nuchal fold, <b>high hCG, low PAPP-A</b>. Trisomy 18 and 13: both low.','<b>NIPT:</b> fetal DNA in the mother\'s blood; very accurate, offered when the chance is higher than 1 in 150. Still a screening test.','<b>Diagnostic tests:</b> chorionic villus sampling (11–14 weeks) or amniocentesis (from 15 weeks): small miscarriage risk.','<b>Anomaly scan (18–21 weeks):</b> looks for 11 structural conditions and checks where the placenta lies.']],
  ['Early pregnancy and twins on ultrasound',['Normal order of appearance: gestational sac → yolk sac → fetal pole with a heartbeat (about 6 weeks).','<b>Miscarriage:</b> crown–rump length 7 mm or more with no heartbeat, or an empty sac of 25 mm or more.','<b>Ectopic pregnancy:</b> positive test, empty uterus; pain and bleeding at 6–8 weeks; rupture is an emergency.','<b>Twins:</b> the <b>lambda sign</b> means two placentas (dichorionic); the <b>T sign</b> means one shared placenta (monochorionic), which carries more risk (twin-to-twin transfusion).']]]],
 ['fix','Repro and Endocrine deck · twins and hCG','The slide has the twin signs reversed: <b>lambda sign = dichorionic</b> (separate placentas), <b>T sign = monochorionic</b> (shared placenta). hCG peaks at about 10 weeks and then falls to a plateau, but a pregnancy test stays <b>positive throughout pregnancy</b>.']
]},
/* ------------------------------------------------------------------ */
{id:'repro-pregnancy',eb:'Pregnancy',h:'Pregnancy, labour and the newborn',p:'The placenta takes over as an endocrine organ, the mother\'s physiology is reset to supply the fetus, labour is a positive feedback loop, and at the first breath the baby\'s circulation re-plumbs itself in minutes.',b:[
 ['table',['Hormone','Made by','What it does'],[
  ['hCG','Syncytiotrophoblast','Acts like LH to <b>keep the corpus luteum alive</b> until the placenta makes enough progesterone (by about 10–12 weeks). Basis of the pregnancy test. Linked to morning sickness'],
  ['Progesterone','Corpus luteum, then placenta','<b>Keeps the uterus quiet</b> (relaxes smooth muscle), maintains the lining, forms the cervical mucus plug, increases breathing, develops milk glands. Also relaxes gut and ureters: reflux, constipation, urinary infection'],
  ['Oestrogen (oestriol)','Placenta, using precursors from the fetal adrenal','Grows the uterus and breast ducts; near term increases oxytocin receptors and softens the cervix'],
  ['Human placental lactogen','Syncytiotrophoblast','Makes the mother <b>insulin resistant</b> and breaks down her fat, sparing glucose for the fetus: the cause of gestational diabetes'],
  ['Relaxin','Corpus luteum, placenta','Softens the cervix and pelvic ligaments'],
  ['Prolactin','Anterior pituitary','Prepares the breast; <b>milk production</b> starts after delivery, when oestrogen and progesterone fall'],
  ['Oxytocin','Hypothalamus → posterior pituitary','<b>Contractions</b> in labour; <b>milk ejection</b> (let-down)']]],
 ['fix','Repro and Endocrine deck · progesterone','The slide lists "smooth muscle contraction" as an action of progesterone in the uterus. Progesterone <b>relaxes</b> uterine smooth muscle and keeps the pregnancy quiet; it is the fall in its influence, with rising oestrogen and oxytocin receptors, that allows labour.'],
 ['table',['System','Change in pregnancy','Why it matters'],[
  ['Blood volume','Plasma up 40–50%; red cells up only 20–30%','<b>Dilutional anaemia</b> is normal'],
  ['Heart and vessels','Cardiac output up 30–50% (heart rate and stroke volume); vascular resistance falls, so <b>blood pressure dips mid-pregnancy</b>','Lying flat late in pregnancy lets the uterus compress the vena cava: nurse on the left side'],
  ['Clotting','More fibrinogen and clotting factors, less fibrinolysis','Reduces bleeding at delivery, but raises the risk of <b>DVT and PE</b>'],
  ['Breathing','Tidal volume up; progesterone makes the brain more sensitive to CO₂','Mild breathlessness; low PaCO₂ helps CO₂ leave the fetus'],
  ['Kidneys','GFR up 50%; ureters dilate','Creatinine and urea fall; glucose may appear in urine; more pyelonephritis'],
  ['Metabolism','Insulin resistance; weight gain of about 11–16 kg','Gestational diabetes screening'],
  ['Thyroid','More thyroxine-binding globulin','Total T4 rises; free T4 is what counts']]],
 ['table',['Complication','What it is','Recognise it','Management'],[
  ['Pre-eclampsia','New hypertension after 20 weeks with protein in the urine or organ damage; the placenta\'s arteries failed to remodel','Headache, flashing lights, upper abdominal pain, swelling; found on routine blood pressure and urine checks','Labetalol; aspirin from 12 weeks to prevent it in high-risk women; magnesium sulfate for seizures (eclampsia); the cure is delivery'],
  ['Placental abruption','The placenta separates early','<b>Painful</b> bleeding (may be hidden), hard "woody" uterus, fetal distress','Emergency: resuscitate and deliver'],
  ['Placenta praevia','The placenta lies over the cervix','<b>Painless</b> bright red bleeding; seen on the 20-week scan','No vaginal examination; caesarean section'],
  ['Gestational diabetes','Insulin resistance from placental hormones','Glucose tolerance test at 24–28 weeks','Diet, metformin, insulin; risk of a large baby and neonatal hypoglycaemia'],
  ['Postpartum haemorrhage','Over 500 mL blood loss after delivery','The four Ts: <b>Tone</b> (uterus fails to contract, commonest), Trauma, Tissue (retained placenta), Thrombin','Rub up a contraction, oxytocin, tranexamic acid; check the placenta is complete']]],
 ['pwside','labour',
  ['card','Stages of labour',['<b>First stage:</b> from regular painful contractions to full dilation (10 cm). Latent phase to about 4 cm; active phase 4–10 cm.','<b>Second stage:</b> from full dilation to delivery of the baby.','<b>Third stage:</b> from delivery of the baby to delivery of the placenta (with an oxytocin injection, within 30 minutes).','<b>Induction:</b> membrane sweep, vaginal prostaglandin (PGE₂), breaking the waters, oxytocin infusion.','<b>Caesarean section layers:</b> skin, fatty and membranous superficial fascia, rectus sheath, rectus muscle (separated), peritoneum, uterus.']],
  ['clin','Breastfeeding','Suckling sends signals to the hypothalamus. <b>Prolactin</b> (dopamine switched off) makes milk for the next feed; <b>oxytocin</b> squeezes the myoepithelial cells to eject milk now. High prolactin suppresses GnRH, so periods and ovulation are delayed. Breast milk carries secretory IgA.']],
 ['pw','fetalcirc','birth'],
 ['table',['Fetal structure','Job before birth','Remnant after birth'],[
  ['Umbilical vein (one)','Carries oxygenated blood from the placenta','Ligamentum teres (round ligament of the liver)'],
  ['Ductus venosus','Lets that blood bypass the liver into the IVC','Ligamentum venosum'],
  ['Foramen ovale','Right atrium to left atrium, bypassing the lungs','Fossa ovalis'],
  ['Ductus arteriosus','Pulmonary trunk to aorta, bypassing the lungs','Ligamentum arteriosum'],
  ['Umbilical arteries (two)','Carry deoxygenated blood back to the placenta','Medial umbilical ligaments']]],
 ['notes',
  ['clin','When the shunts stay open','<b>Patent ductus arteriosus:</b> a continuous "machinery" murmur; commoner in preterm babies. Prostaglandin E₂ keeps the duct open, so an <b>NSAID</b> (ibuprofen, indomethacin) closes it, and a <b>prostaglandin infusion</b> keeps it open in babies whose heart defect depends on it. <b>Patent foramen ovale:</b> present in about a quarter of adults and usually harmless; it can let a venous clot cross to the brain. It is not the same as an atrial septal defect.'],
  ['clin','Surfactant and preterm babies','Type II pneumocytes make surfactant from about 24 weeks, with enough by about 34. Without it the alveoli collapse at each breath: <b>respiratory distress syndrome</b>. Giving the mother <b>corticosteroids</b> before a preterm birth speeds surfactant production; the baby can be given surfactant down the endotracheal tube.'],
  ['clin','Rhesus disease','A RhD-negative mother carrying a RhD-positive baby can be sensitised when <b>fetal red cells</b> leak into her blood (delivery, bleeding, procedures). She makes IgG anti-D, which crosses the placenta in the <b>next</b> pregnancy and destroys fetal red cells. Prevented with <b>anti-D immunoglobulin</b> at 28 weeks, after any sensitising event, and after delivery of a RhD-positive baby.']],
 ['table',['Blood group','Antigen on red cells','Antibody in plasma','Can receive red cells from'],[
  ['A','A','Anti-B','A, O'],
  ['B','B','Anti-A','B, O'],
  ['AB','A and B','None','Anyone (universal recipient)'],
  ['O','None','Anti-A and anti-B','O only; O negative is the universal donor']]],
 ['table',['Infection in pregnancy','Risk to the baby','Prevention or treatment'],[
  ['Rubella','Congenital rubella syndrome (deafness, cataracts, heart defects), worst before 10 weeks','MMR <b>before</b> pregnancy (live vaccine, not during)'],
  ['Cytomegalovirus','Commonest congenital infection: deafness, small head','Hygiene with young children\'s saliva and urine; valaciclovir'],
  ['Toxoplasma','Eye and brain damage (cat litter, undercooked meat)','Avoidance; spiramycin'],
  ['Varicella zoster','Congenital varicella syndrome before 20 weeks; severe neonatal chickenpox around delivery','Immunoglobulin or aciclovir after exposure if not immune'],
  ['Herpes simplex','Neonatal herpes caught at birth','Aciclovir; caesarean if first infection is in the last 6 weeks'],
  ['Group B streptococcus','Neonatal sepsis, pneumonia, meningitis','IV benzylpenicillin in labour'],
  ['Listeria','Miscarriage, stillbirth, neonatal sepsis','Avoid soft cheese and pâté; amoxicillin with gentamicin'],
  ['Syphilis','Congenital syphilis','Screening; benzathine penicillin'],
  ['HIV','Transmission in pregnancy, birth and breastfeeding','Antiretrovirals to an undetectable viral load; caesarean if the load is detectable near term; treat the baby; formula feeding advised'],
  ['Hepatitis B','Chronic infection in the baby','Vaccinate the baby at birth, with immunoglobulin if the mother is highly infectious'],
  ['Chlamydia','Neonatal conjunctivitis and pneumonitis','Azithromycin for the mother']]]
]}
],
/* ====================== pathways ====================== */
pw:{
thyroidsyn:{t:'Making thyroid hormone',k:'endo',sec:'endo-thyroid',mn:'Trap, oxidise, attach, couple, store, release, convert',an:'A factory that bolts iodine onto a protein scaffold in a warehouse (the colloid), then cuts the finished hormone off when an order (TSH) comes in.',steps:[
 ['Iodide is trapped','The Na⁺/I⁻ symporter pumps iodide from blood into the follicular cell; TSH speeds this up.'],
 ['Iodide passes into the colloid','Through pendrin on the apical membrane.'],
 ['Thyroglobulin is made and secreted into the colloid','A large protein rich in tyrosine.'],
 ['Thyroid peroxidase (TPO) oxidises iodide to iodine',''],
 ['Organification: iodine is attached to tyrosines on thyroglobulin','Making MIT (one iodine) and DIT (two).'],
 ['Coupling','DIT + DIT → T4; MIT + DIT → T3, still attached to thyroglobulin. Also done by TPO.'],
 ['On TSH stimulation, colloid is taken back in by endocytosis','Lysosomes cut T4 and T3 free.'],
 ['T4 and T3 enter the blood','Over 99% bound to thyroxine-binding globulin.'],
 ['Tissues convert T4 to active T3','By deiodinase enzymes.']],
 foot:'Carbimazole and propylthiouracil inhibit TPO (steps 4–6). Anti-TPO antibodies mark Hashimoto\'s. Iodine deficiency starves step 1: TSH rises and the gland enlarges (goitre).'},
insulinsec:{t:'Insulin release from the β cell',k:'endo',sec:'endo-glucose',mn:'Glucose in, ATP up, potassium channel shut, depolarise, calcium in, insulin out',steps:[
 ['Blood glucose rises after a meal',''],
 ['Glucose enters the β cell through GLUT2','No insulin needed for this transporter.'],
 ['Glucokinase traps it and glycolysis makes ATP','Glucokinase is the glucose sensor; mutations cause a form of MODY.'],
 ['The rise in ATP closes ATP-sensitive K⁺ channels',''],
 ['K⁺ can no longer leak out, so the membrane depolarises',''],
 ['Voltage-gated Ca²⁺ channels open and Ca²⁺ enters',''],
 ['Insulin granules fuse with the membrane','Insulin and C-peptide are released in equal amounts.'],
 ['Insulin travels in the portal vein to the liver, then to muscle and fat','It binds a tyrosine kinase receptor; GLUT4 moves to the cell surface.']],
 foot:'Sulfonylureas close the K⁺ channel directly. C-peptide shows the body\'s own insulin production: it is absent from injected insulin.'},
dka:{t:'How diabetic ketoacidosis develops',k:'endo',sec:'endo-glucose',mn:'No insulin → fat breakdown → ketones → acidosis; high glucose → diuresis → dehydration',an:'The body is starving in the midst of plenty: glucose is everywhere but cannot get into cells, so it burns fat instead and floods the blood with acid.',steps:[
 ['Insulin is absent (new type 1 diabetes, missed doses, infection)','Stress hormones (glucagon, cortisol, adrenaline) rise.'],
 ['Cells cannot take up glucose and the liver keeps making more','Blood glucose climbs.'],
 ['Glucose spills into the urine and drags water with it','Osmotic diuresis: polyuria, thirst, dehydration, loss of sodium and potassium.'],
 ['Fat is broken down without restraint','Free fatty acids flood the liver.'],
 ['The liver converts fatty acids to ketone bodies','Acetoacetate and β-hydroxybutyrate.'],
 ['Ketones are acids: metabolic acidosis with a raised anion gap','Bicarbonate falls.'],
 ['The lungs compensate','Deep, sighing Kussmaul breathing blows off CO₂; the breath smells of pear drops.'],
 ['Potassium shifts out of cells','Plasma K⁺ looks normal or high although the body is depleted; it falls quickly once insulin is given.']],
 foot:'Treat with fluids first, then insulin, with potassium replacement.'},
spermato:{t:'Spermatogenesis',k:'repro',sec:'repro-axis',mn:'Gonium, primary, secondary, spermatid, sperm',steps:[
 ['Spermatogonia (diploid stem cells) divide by mitosis','One daughter stays as a stem cell; the other is committed.'],
 ['Committed cells become primary spermatocytes','Diploid, with DNA replicated.'],
 ['Meiosis I','Each primary spermatocyte gives two haploid secondary spermatocytes.'],
 ['Meiosis II','Each gives two spermatids: four from the original cell.'],
 ['Spermiogenesis','Round spermatids are reshaped: acrosome forms, DNA condenses, flagellum and mitochondrial midpiece develop.'],
 ['Spermiation','Sperm are released from Sertoli cells into the tubule lumen.'],
 ['Maturation in the epididymis','They gain the ability to swim; stored here.'],
 ['Capacitation in the female tract','The final step before a sperm can fertilise.']],
 foot:'Spermatogenesis is the whole process; spermiogenesis is only the reshaping of spermatids into sperm. It takes about 70 days.'},
oogenesis:{t:'Oogenesis',k:'repro',sec:'repro-axis',mn:'Two arrests: prophase I until ovulation, metaphase II until fertilisation',steps:[
 ['In the fetus, oogonia multiply by mitosis','Numbers peak at about 7 million at 20 weeks.'],
 ['They become primary oocytes and start meiosis I',''],
 ['First arrest: prophase I','Each sits in a primordial follicle from before birth, for up to 50 years.'],
 ['From puberty, a group of follicles is recruited each cycle','Primary → secondary → antral follicle under FSH.'],
 ['The LH surge makes the dominant oocyte complete meiosis I','Producing a secondary oocyte and the first polar body.'],
 ['Second arrest: metaphase II','This is the cell released at ovulation.'],
 ['If a sperm enters, meiosis II is completed','Giving the ovum and a second polar body.'],
 ['If not fertilised, the oocyte degenerates within about 24 hours','']],
 foot:'The follicle left behind becomes the corpus luteum, then the corpus albicans.'},
cycle:{t:'One menstrual cycle',k:'repro',sec:'repro-cycle',mn:'FSH grows it, oestrogen builds, LH releases, progesterone prepares, withdrawal sheds',steps:[
 ['Progesterone and oestrogen fall: the lining is shed (day 1)','Loss of negative feedback lets FSH rise.'],
 ['FSH recruits a group of follicles',''],
 ['Granulosa cells make oestradiol; theca cells supply the androgen','Under FSH and LH respectively.'],
 ['Oestradiol rebuilds the endometrium and lowers FSH','Only the dominant follicle survives.'],
 ['High oestradiol for about two days flips feedback to positive',''],
 ['LH surge','Triggers completion of meiosis I and, about 36 hours later, ovulation.'],
 ['The follicle becomes the corpus luteum and makes progesterone','The lining becomes secretory; LH and FSH are suppressed.'],
 ['No hCG: the corpus luteum dies after 10–12 days','If an embryo implants, its hCG rescues the corpus luteum instead.'],
 ['Hormone withdrawal: spiral arteries constrict and menstruation begins','']]},
fertilisation:{t:'Fertilisation',k:'repro',sec:'repro-embryo',mn:'Capacitate, penetrate, bind, acrosome, fuse, block, finish meiosis',steps:[
 ['Capacitation','In the female tract the sperm head loses its coating and becomes hyperactive.'],
 ['The sperm pushes through the corona radiata','Helped by hyaluronidase on its surface.'],
 ['It binds the zona pellucida (ZP3)','Species-specific binding.'],
 ['Acrosome reaction','Enzymes released from the acrosome digest a path through the zona.'],
 ['Sperm and oocyte membranes fuse','The sperm nucleus enters.'],
 ['Cortical reaction','A wave of Ca²⁺ makes cortical granules harden the zona: the block to polyspermy.'],
 ['The oocyte completes meiosis II','Releasing the second polar body.'],
 ['Male and female pronuclei fuse: a diploid zygote','']],
 foot:'Happens in the ampulla of the uterine tube, within about 24 hours of ovulation.'},
embryo3:{t:'The first three weeks',k:'repro',sec:'repro-embryo',mn:'Zygote, morula, blastocyst, implant, two layers, three layers',steps:[
 ['Zygote','Day 0, in the uterine tube.'],
 ['Cleavage to a morula','About 16 cells by day 3–4, still inside the zona pellucida.'],
 ['Blastocyst','Day 5: inner cell mass, trophoblast and a fluid cavity; it reaches the uterus and hatches.'],
 ['Implantation','Days 6–10: the syncytiotrophoblast invades the endometrium and starts making hCG.'],
 ['Bilaminar disc','Week 2: the inner cell mass becomes epiblast and hypoblast; amniotic cavity and yolk sac form.'],
 ['Primitive streak appears on the epiblast','Start of week 3.'],
 ['Gastrulation','Epiblast cells migrate through the streak to form endoderm and mesoderm; those remaining are ectoderm.'],
 ['Notochord forms and induces the neural plate','Neurulation begins; the heart tube starts to beat by about day 22.']]},
sexdiff:{t:'Becoming male: sexual differentiation',k:'repro',sec:'repro-embryo',mn:'SRY → testis → AMH and testosterone → DHT',an:'The default setting is female. The Y chromosome carries one switch (SRY) that starts a cascade of three hormones, each with its own job.',steps:[
 ['Until week 6–7 the gonads and ducts are the same in both sexes','Both Wolffian and Müllerian ducts are present.'],
 ['The SRY gene on the Y chromosome is switched on','The gonad becomes a testis.'],
 ['Sertoli cells make anti-Müllerian hormone','The Müllerian (paramesonephric) ducts regress.'],
 ['Leydig cells make testosterone','Driven first by placental hCG.'],
 ['Testosterone preserves the Wolffian (mesonephric) ducts','They become epididymis, vas deferens, seminal vesicles and ejaculatory ducts.'],
 ['5α-reductase converts testosterone to DHT in the external tissues',''],
 ['DHT shapes the penis, scrotum and prostate','The urethral folds and labioscrotal swellings fuse.'],
 ['The testes descend into the scrotum','Usually by birth.']],
 foot:'With no SRY: ovaries form, the Müllerian ducts become tubes, uterus and upper vagina, and the Wolffian ducts regress.'},
labour:{t:'How labour starts and sustains itself',k:'repro',sec:'repro-pregnancy',mn:'Stretch → oxytocin → contraction → more stretch (positive feedback)',an:'A snowball rolling downhill: each contraction causes the signal for the next, stronger one, until the baby is out.',steps:[
 ['Near term, oestrogen rises relative to progesterone','The uterus makes more oxytocin receptors and gap junctions.'],
 ['Prostaglandins soften and thin the cervix','PGE₂ ripens the cervix; PGF₂α contracts the uterus.'],
 ['The baby\'s head presses on the cervix',''],
 ['Stretch receptors signal to the hypothalamus','The Ferguson reflex.'],
 ['The posterior pituitary releases oxytocin',''],
 ['Oxytocin makes the uterus contract and release more prostaglandins',''],
 ['Contractions push the head harder against the cervix','More stretch, more oxytocin: positive feedback.'],
 ['Delivery of the baby ends the stretch and breaks the loop','Oxytocin then contracts the uterus to deliver the placenta and limit bleeding.']],
 foot:'One of the few positive feedback loops in the body (others: the LH surge, blood clotting, the action potential upstroke).'},
fetalcirc:{t:'The route of oxygenated blood in the fetus',k:'repro',sec:'repro-pregnancy',mn:'Three shunts: venosus, ovale, arteriosus',steps:[
 ['Placenta','Gas exchange happens here, not in the lungs.'],
 ['Umbilical vein','Carries the most oxygenated blood (about 80% saturated).'],
 ['Ductus venosus','About half the blood bypasses the liver.'],
 ['Inferior vena cava → right atrium',''],
 ['Foramen ovale → left atrium','Right atrial pressure is higher than left, so the flap is held open.'],
 ['Left ventricle → ascending aorta','The best blood goes to the heart and brain.'],
 ['Blood returning from the head enters the right ventricle and pulmonary trunk',''],
 ['Ductus arteriosus → descending aorta','The fluid-filled lungs have high resistance, so most blood bypasses them.'],
 ['Two umbilical arteries carry blood back to the placenta','They arise from the internal iliac arteries.']]},
birth:{t:'Changes in the circulation at birth',k:'repro',sec:'repro-pregnancy',mn:'Breath opens the lungs; clamp removes the placenta; pressures reverse; shunts close',steps:[
 ['First breath: the lungs fill with air','Surfactant keeps the alveoli open.'],
 ['Oxygen rises and the pulmonary vessels dilate','Pulmonary vascular resistance falls steeply.'],
 ['Blood flows through the lungs and returns to the left atrium','Left atrial pressure rises.'],
 ['The cord is clamped','The low-resistance placenta is removed: systemic resistance rises and flow to the right atrium falls.'],
 ['Left atrial pressure now exceeds right','The flap of the foramen ovale is pushed shut.'],
 ['High oxygen and falling prostaglandin E₂ constrict the ductus arteriosus','Functionally closed within 1–3 days.'],
 ['The ductus venosus and umbilical vessels close','They become ligaments.']]}
},
/* ====================== flashcards ====================== */
flips:[
 ['Anterior pituitary hormones','FLAT PeG: FSH, LH, ACTH, TSH, Prolactin, GH.'],
 ['Which pituitary hormone is controlled mainly by inhibition?','Prolactin, inhibited by dopamine.'],
 ['Visual field defect from a pituitary tumour','Bitemporal hemianopia (pressure on the optic chiasm).'],
 ['Adrenal layers and products','Glomerulosa: aldosterone. Fasciculata: cortisol. Reticularis: androgens. Medulla: catecholamines.'],
 ['Addison\'s: sodium and potassium','Low sodium, high potassium (and low glucose).'],
 ['Test for Addison\'s disease','Short Synacthen test: cortisol fails to rise.'],
 ['Conn\'s syndrome bloods','Hypertension, low potassium, high aldosterone with low renin.'],
 ['Phaeochromocytoma: which blocker first?','Alpha-blocker before beta-blocker.'],
 ['Enzyme blocked by carbimazole','Thyroid peroxidase (TPO). Warn about sore throat (agranulocytosis).'],
 ['Graves\' antibody','Stimulates the TSH receptor (type II hypersensitivity).'],
 ['TSH and T4 in primary hypothyroidism','TSH high, T4 low.'],
 ['What closes the β-cell K⁺ channel?','ATP (from glucose); sulfonylureas do the same.'],
 ['Insulin-dependent glucose transporter','GLUT4 (muscle and fat).'],
 ['HbA1c that diagnoses diabetes','48 mmol/mol (6.5%) or more.'],
 ['DKA: three criteria','Glucose over 11, ketones 3 or more, pH below 7.3 (or bicarbonate below 15).'],
 ['LH acts on... FSH acts on... (male)','LH: Leydig cells (testosterone). FSH: Sertoli cells (sperm support, inhibin).'],
 ['Two-cell theory in the ovary','LH: theca cells make androgens. FSH: granulosa cells convert them to oestradiol.'],
 ['What triggers ovulation?','The LH surge, caused by positive feedback from sustained high oestradiol.'],
 ['Where is the oocyte arrested at ovulation?','Metaphase II (until fertilisation).'],
 ['Hormone that maintains the corpus luteum in early pregnancy','hCG from the syncytiotrophoblast.'],
 ['Gastrulation','Week 3: the bilaminar disc becomes three germ layers via the primitive streak.'],
 ['Wolffian duct derivatives','SEED: seminal vesicle, epididymis, ejaculatory duct, ductus deferens.'],
 ['Combined test result in Down syndrome','Thick nuchal translucency, high hCG, low PAPP-A.'],
 ['Three fetal shunts','Ductus venosus (liver), foramen ovale (atria), ductus arteriosus (pulmonary trunk to aorta).'],
 ['Drug that closes a patent ductus','An NSAID (ibuprofen or indomethacin); prostaglandin keeps it open.'],
 ['Painful vs painless bleeding in late pregnancy','Painful: placental abruption. Painless: placenta praevia.']
],
/* ====================== questions ====================== */
qs:[
{sec:'endo-axes',type:'sba',q:'A 34-year-old woman has had no periods for 8 months, milky nipple discharge and headaches. On testing, she cannot see objects at the outer edges of her vision on either side. Which drug is the most appropriate first treatment?',
 o:['Cabergoline','Octreotide','Levothyroxine','Hydrocortisone','Carbimazole'],a:0,
 e:'Amenorrhoea and galactorrhoea with bitemporal hemianopia indicate a prolactin-secreting pituitary macroadenoma pressing on the optic chiasm. Prolactin is under inhibitory control by dopamine, so a dopamine agonist (cabergoline) lowers prolactin and shrinks the tumour. Octreotide is used in acromegaly.'},
{sec:'endo-axes',type:'sba',q:'A 45-year-old man notices that his wedding ring and shoes no longer fit. He sweats heavily and has developed diabetes. Which is the best screening blood test?',
 o:['IGF-1','Random growth hormone','9 am cortisol','TSH','Prolactin'],a:0,
 e:'This is acromegaly. Growth hormone is released in pulses, so a single level is unreliable; IGF-1, made by the liver in response to GH, is stable and reflects average GH. The diagnosis is confirmed when GH fails to suppress during an oral glucose tolerance test.'},
{sec:'endo-adrenal',type:'sba',q:'A 29-year-old woman has months of tiredness, weight loss and dizziness on standing. She has darkened palmar creases. Sodium 128 mmol/L, potassium 5.9 mmol/L. Which test will confirm the diagnosis?',
 o:['Short Synacthen test','Overnight dexamethasone suppression test','Aldosterone : renin ratio','Plasma metanephrines','Oral glucose tolerance test'],a:0,
 e:'Addison\'s disease: lack of cortisol and aldosterone gives low sodium, high potassium and postural hypotension; high ACTH (with MSH) causes pigmentation. Synthetic ACTH fails to raise cortisol because the cortex is destroyed. Dexamethasone suppression tests for cortisol excess.'},
{sec:'endo-adrenal',type:'sba',q:'A 52-year-old man takes prednisolone 20 mg daily for 9 months for polymyalgia. He stops it abruptly and two days later collapses with a blood pressure of 78/40 during a chest infection. What explains this?',
 o:['His own ACTH and cortisol production has been suppressed by the steroid','The steroid has destroyed his adrenal cortex by autoimmunity','Prednisolone withdrawal causes excess aldosterone','He has developed a phaeochromocytoma','Prednisolone blocked his thyroid hormone production'],a:0,
 e:'Exogenous glucocorticoid feeds back on the hypothalamus and pituitary, so CRH and ACTH fall and the adrenal cortex shrinks. It takes weeks to months to recover, so stopping suddenly, especially during illness, leaves no cortisol: an adrenal crisis. Treat with IV hydrocortisone and fluids. Steroids must be tapered, and doses increased during illness.'},
{sec:'endo-adrenal',type:'saq',q:'A 40-year-old has hypertension resistant to three drugs, with potassium 2.9 mmol/L and a high aldosterone with suppressed renin. Name the syndrome.',acc:['conn|hyperaldosteron'],m:'Conn\'s syndrome (primary hyperaldosteronism)',
 e:'Autonomous aldosterone production causes sodium and water retention (hypertension) and potassium and hydrogen ion loss (hypokalaemia, alkalosis). The high blood pressure suppresses renin, which separates it from secondary causes such as renal artery stenosis, where renin is high. Treated with spironolactone or adrenalectomy.'},
{sec:'endo-thyroid',type:'sba',q:'A 30-year-old woman has weight loss, palpitations and heat intolerance. Her eyes are prominent and she has a smooth goitre. TSH is undetectable and free T4 is high. What is the mechanism?',
 o:['IgG antibodies that stimulate the TSH receptor','Antibodies against thyroid peroxidase that destroy the gland','A TSH-secreting pituitary adenoma','Viral inflammation releasing stored hormone','Excess iodine intake'],a:0,
 e:'Graves\' disease: stimulating TSH receptor antibodies drive hormone production regardless of feedback, so TSH is suppressed. Eye disease is specific to Graves\'. A TSH-secreting adenoma would give a high or normal TSH. Anti-TPO antibodies are the marker of Hashimoto\'s thyroiditis.'},
{sec:'endo-thyroid',type:'sba',q:'A woman taking carbimazole for 3 weeks develops a fever and a very sore throat. What is the most important next step?',
 o:['Urgent full blood count','Throat swab and reassurance','Increase the carbimazole dose','Start levothyroxine','Check anti-TPO antibodies'],a:0,
 e:'Carbimazole can cause agranulocytosis (a dangerously low neutrophil count), usually in the first three months. Patients are told to stop the drug and have an urgent blood count if they develop a sore throat, mouth ulcers or fever.'},
{sec:'endo-thyroid',type:'sba',q:'A 58-year-old with a pituitary tumour is tired and feels the cold. Which thyroid function result is expected?',
 o:['Low free T4 with a low or normal TSH','Low free T4 with a high TSH','High free T4 with a low TSH','Normal free T4 with a high TSH','High free T4 with a high TSH'],a:0,
 e:'Secondary hypothyroidism: the pituitary cannot make enough TSH, so the thyroid is under-stimulated. T4 is low and TSH is low or inappropriately normal. In primary hypothyroidism the pituitary is healthy and responds with a high TSH.'},
{sec:'endo-thyroid',type:'saq',q:'Which enzyme, the target of carbimazole, oxidises iodide and attaches it to thyroglobulin?',acc:['peroxidase|tpo'],m:'Thyroid peroxidase (TPO)',
 e:'TPO oxidises iodide, attaches it to tyrosine residues (organification) and couples the iodotyrosines to form T3 and T4. Antibodies against it are found in Hashimoto\'s thyroiditis.'},
{sec:'endo-glucose',type:'sba',q:'A 16-year-old has 2 weeks of thirst and weight loss, then vomiting and abdominal pain. He is breathing deeply. Glucose 28 mmol/L, ketones 5.8 mmol/L, pH 7.08, potassium 5.6 mmol/L. After starting IV saline and insulin, which change must be anticipated?',
 o:['Plasma potassium will fall, so it must be replaced','Plasma potassium will rise further','Plasma sodium will fall sharply because of insulin','Blood glucose will rise before it falls','The acidosis will worsen as ketones clear'],a:0,
 e:'Diabetic ketoacidosis. Acidosis and lack of insulin move potassium out of cells, so the plasma level looks high while total body potassium is depleted by the osmotic diuresis. Insulin drives potassium back into cells and the level can fall dangerously, so potassium is added to the fluids once it is below 5.5 mmol/L.'},
{sec:'endo-glucose',type:'sba',q:'A woman with type 2 diabetes takes gliclazide. She becomes sweaty, shaky and confused before lunch. How does gliclazide cause this?',
 o:['It closes ATP-sensitive K⁺ channels on β cells, releasing insulin whatever the glucose level','It blocks glucose reabsorption in the kidney','It reduces glucose production by the liver','It mimics GLP-1','It moves GLUT4 to the membrane directly'],a:0,
 e:'Sulfonylureas bind the K⁺(ATP) channel and close it, depolarising the β cell and releasing insulin even when glucose is low, so hypoglycaemia is the main risk. Metformin, SGLT2 inhibitors and GLP-1 agonists rarely cause hypoglycaemia on their own.'},
{sec:'endo-glucose',type:'sba',q:'Which finding best distinguishes type 1 from type 2 diabetes in a newly diagnosed adult?',
 o:['Low C-peptide with positive anti-GAD antibodies','A fasting glucose of 9 mmol/L','An HbA1c of 60 mmol/mol','Glucose in the urine','A family history of diabetes'],a:0,
 e:'Type 1 diabetes is autoimmune β-cell destruction, so the body\'s own insulin (and the C-peptide released with it) is low and islet autoantibodies are present. Glucose and HbA1c are raised in both types.'},
{sec:'endo-glucose',type:'saq',q:'Which glucose transporter is moved to the cell membrane of muscle and fat cells by insulin?',acc:['glut4|glut-4|glut 4'],m:'GLUT4',
 e:'Insulin binding to its tyrosine kinase receptor moves vesicles containing GLUT4 to the surface, increasing glucose uptake. Exercise does the same independently of insulin, which is one reason activity helps in type 2 diabetes.'},
{sec:'repro-axis',type:'sba',q:'A 24-year-old bodybuilder who injects testosterone is found to have small testes and a very low sperm count. What is the mechanism?',
 o:['Exogenous testosterone suppresses LH and FSH, so the testes stop making testosterone and sperm','Testosterone is directly toxic to Sertoli cells','Testosterone raises FSH, exhausting the germ cells','Testosterone blocks the vas deferens','Testosterone converts to prolactin'],a:0,
 e:'Negative feedback on the hypothalamus and pituitary lowers GnRH, LH and FSH. Without LH, Leydig cells stop producing the very high local testosterone that spermatogenesis needs; without FSH, Sertoli cells stop supporting it. Blood testosterone is high, but the testes shrink.'},
{sec:'repro-axis',type:'sba',q:'A 17-year-old girl has never had a period. She is short with a webbed neck and widely spaced nipples. FSH and LH are high. What is the most likely karyotype?',
 o:['45,X','47,XXY','46,XY','47,XXX','Trisomy 21'],a:0,
 e:'Turner syndrome. The ovaries are replaced by fibrous streaks, so oestrogen is low and, without feedback, FSH and LH are high (hypergonadotropic hypogonadism). Associated with coarctation of the aorta and a bicuspid aortic valve. Klinefelter syndrome (47,XXY) affects males.'},
{sec:'repro-axis',type:'saq',q:'At which stage of meiosis is the oocyte arrested when it is released at ovulation?',acc:['metaphase'],m:'Metaphase II',
 e:'Primary oocytes arrest in prophase I before birth. The LH surge completes meiosis I, producing a secondary oocyte that arrests again in metaphase II and only completes meiosis II if a sperm enters.'},
{sec:'repro-cycle',type:'sba',q:'What directly triggers the LH surge in the middle of the menstrual cycle?',
 o:['Sustained high oestradiol switching feedback from negative to positive','A fall in progesterone','A rise in inhibin','A surge of FSH from the corpus luteum','hCG from the follicle'],a:0,
 e:'For most of the cycle oestrogen inhibits LH and FSH. Once the dominant follicle keeps oestradiol high for about two days, the feedback becomes positive at the pituitary and hypothalamus, producing the LH surge. Ovulation follows about 36 hours after the surge begins.'},
{sec:'repro-cycle',type:'sba',q:'A woman has regular 35-day cycles. On which day is she most likely to ovulate?',
 o:['Day 21','Day 14','Day 17','Day 28','Day 7'],a:0,fixed:true,
 e:'The luteal phase is fixed at about 14 days because the corpus luteum has a set lifespan. Cycle length varies through the follicular phase, so ovulation is about 14 days before the next period: 35 − 14 = day 21.'},
{sec:'repro-cycle',type:'saq',q:'Which hormone, made by the corpus luteum, converts the endometrium to a secretory lining and raises body temperature after ovulation?',acc:['progesterone'],m:'Progesterone',
 e:'Progesterone dominates the luteal phase. Its fall, when the corpus luteum dies, triggers menstruation. A blood level taken 7 days before the expected period (day 21 of a 28-day cycle) confirms ovulation.'},
{sec:'repro-embryo',type:'sba',q:'A baby is born with a female appearance. Scans show no uterus and testes in the groin; the karyotype is 46,XY. Testosterone is high. What is the cause?',
 o:['Androgen receptors that do not respond to testosterone','Absence of the SRY gene','Deficiency of anti-Müllerian hormone','Turner syndrome','Congenital adrenal hyperplasia'],a:0,
 e:'Complete androgen insensitivity syndrome. SRY makes testes; Sertoli cells make AMH, so the Müllerian ducts (uterus, tubes) regress. But tissues cannot respond to testosterone or DHT, so the Wolffian ducts regress too and the external genitalia develop along the female line.'},
{sec:'repro-embryo',type:'sba',q:'During which period is a developing baby most vulnerable to structural birth defects from drugs such as isotretinoin?',
 o:['Weeks 3 to 8 after fertilisation','The first 2 weeks','Weeks 13 to 20','Weeks 28 to 36','The final week before birth'],a:0,
 e:'Organs form during the embryonic period (weeks 3–8), so teratogens cause major structural malformations then. In the first two weeks damage tends to be all-or-nothing (loss of the pregnancy or no effect). In the fetal period exposure mainly affects growth and function.'},
{sec:'repro-embryo',type:'saq',q:'What is the name of the process in week 3 that converts the two-layered embryonic disc into three germ layers?',acc:['gastrulation'],m:'Gastrulation',
 e:'Epiblast cells migrate through the primitive streak to form endoderm and mesoderm; the cells left behind form ectoderm. A remnant of the primitive streak can give rise to a sacrococcygeal teratoma.'},
{sec:'repro-pregnancy',type:'sba',q:'A woman who is 34 weeks pregnant has sudden constant abdominal pain and a small amount of dark vaginal bleeding. Her uterus is hard and tender. What is the most likely diagnosis?',
 o:['Placental abruption','Placenta praevia','A normal "show"','Urinary tract infection','Braxton Hicks contractions'],a:0,
 e:'Abruption is separation of the placenta from the uterine wall: painful, with a tense "woody" uterus, and the visible bleeding may be much less than the real loss. Placenta praevia causes painless bright red bleeding with a soft uterus.'},
{sec:'repro-pregnancy',type:'sba',q:'A preterm baby has a continuous "machinery" murmur below the left clavicle. Which drug is used to close the vessel responsible?',
 o:['Ibuprofen','Prostaglandin E₁','Adrenaline','Digoxin','Salbutamol'],a:0,
 e:'A patent ductus arteriosus is kept open by prostaglandin E₂. An NSAID (ibuprofen or indomethacin) inhibits cyclo-oxygenase, lowers prostaglandin and lets the duct close. A prostaglandin infusion does the opposite and is used to keep the duct open in duct-dependent congenital heart disease.'},
{sec:'repro-pregnancy',type:'sba',q:'Why does the foramen ovale close in the minutes after birth?',
 o:['Left atrial pressure rises above right atrial pressure','Oxygen causes its muscle to constrict','Prostaglandin levels rise','The umbilical vein collapses onto it','Blood clots across the opening'],a:0,
 e:'With the first breaths pulmonary resistance falls, so more blood returns from the lungs to the left atrium. Clamping the cord removes placental return to the right atrium. The pressure difference reverses and pushes the flap-like septum primum against the septum secundum. The ductus arteriosus, by contrast, closes by muscular constriction.'},
{sec:'repro-pregnancy',type:'saq',q:'Which hormone, detected by a pregnancy test, keeps the corpus luteum making progesterone in early pregnancy?',acc:['hcg|chorionic gonadotrop'],m:'Human chorionic gonadotropin (hCG)',
 e:'hCG is made by the syncytiotrophoblast from implantation. It acts on LH receptors to rescue the corpus luteum until the placenta takes over progesterone production at about 10–12 weeks. Tests detect its β subunit.'}
]};
