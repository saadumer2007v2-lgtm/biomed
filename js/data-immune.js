/* ================= IMMUNE, BLOOD & INFECTION: in-depth pathways =================
   Same shape as PATHWAYS in data.js: k = colour kind, blk = chapter (drill filter), sec = section id,
   mn = mnemonic, an = analogy (shown in Learn mode), steps = [title, detail], foot = clinical footnote.
   Loaded after data.js: entries here add to or replace those in PATHWAYS. */
Object.assign(PATHWAYS,{

/* ---------- Blood & healing: haemostasis ---------- */
spasm:{t:'Vascular spasm',k:'blood',blk:'blood',sec:'haemostasis',mn:'Step 1 of haemostasis: squeeze the pipe',
 an:'Like pinching a hosepipe the moment it splits: it does not mend the hole, but it cuts the flow so the repair crew can work.',steps:[
 ['A vessel wall is cut, crushed or torn','The response is strongest in small arteries and arterioles.'],
 ['Direct myogenic response','Injured vascular smooth muscle contracts by itself within seconds.'],
 ['Local nerve reflex','Pain receptors and sympathetic fibres in the wall trigger brief reflex constriction.'],
 ['Damaged endothelium releases endothelin-1','A powerful vasoconstrictor. At the same time it makes less nitric oxide and prostacyclin, the usual dilators.'],
 ['Activated platelets add serotonin and thromboxane A₂','These sustain the constriction for up to about 30 minutes while the plug forms.'],
 ['Slower, lower-pressure flow helps the plug form','Platelets and clotting factors are not washed away. Spasm alone cannot stop bleeding from a large artery.']],
 foot:'A partially cut artery bleeds more than a completely cut one: the intact part of the wall holds the hole open and stops the vessel retracting and constricting.'},

platelet:{t:'Primary haemostasis: the platelet plug',k:'blood',blk:'blood',sec:'haemostasis',mn:'Adhere, activate, aggregate (the three As)',
 an:'vWF is velcro on the damaged wall that snags passing platelets. Once stuck, platelets shout for friends (ADP, TXA₂) and hold hands using fibrinogen.',steps:[
 ['Endothelium is breached and subendothelial collagen is exposed','Healthy endothelium hides collagen and actively repels platelets.'],
 ['von Willebrand factor (vWF) binds the exposed collagen','vWF comes from plasma and from endothelial Weibel–Palade bodies. High shear stress unfolds it and exposes its binding sites.'],
 ['Adhesion: platelet GPIb–IX–V grabs vWF','This tethers platelets even in fast arterial flow. GPVI and GPIa/IIa (integrin α2β1) then bind collagen directly for firm attachment.'],
 ['Activation: shape change','Smooth discs become spiky spheres with pseudopods, greatly increasing their sticky surface.'],
 ['Activation: granule release','Dense granules release ADP, serotonin and Ca²⁺. α granules release fibrinogen, vWF, factor V, PDGF and P-selectin.'],
 ['Activation: thromboxane A₂ is made','COX-1 turns arachidonic acid into TXA₂, which recruits more platelets and constricts the vessel. Aspirin blocks this step.'],
 ['A procoagulant surface appears','Phosphatidylserine flips to the outer membrane, giving clotting factor complexes a negatively charged surface to assemble on.'],
 ['Aggregation: GPIIb/IIIa switches on','ADP (through P2Y₁₂) and TXA₂ trigger inside-out signalling. Activated GPIIb/IIIa (αIIbβ3) binds fibrinogen, which bridges neighbouring platelets.'],
 ['A soft primary plug forms and stays local','Positive feedback recruits more platelets. Nearby healthy endothelium releases prostacyclin, NO and ADPase (CD39) so the plug does not spread.']],
 foot:'Broken steps: von Willebrand disease (adhesion), Bernard–Soulier syndrome (no GPIb), Glanzmann thrombasthenia (no GPIIb/IIIa). Drugs: aspirin ⊣ COX-1 (TXA₂); clopidogrel and ticagrelor ⊣ P2Y₁₂; tirofiban and eptifibatide ⊣ GPIIb/IIIa.'},

coagClassic:{t:'Coagulation: the classical (laboratory) cascade',k:'blood',blk:'blood',sec:'haemostasis',mn:'Extrinsic = PT; intrinsic = APTT; both meet at factor X',
 an:'Two different doorbells (tissue factor, or contact with a surface) both ring the same front door: factor X.',steps:[
 ['Extrinsic route: tissue factor (III) from damaged tissue binds factor VIIa','Measured by the PT / INR.'],
 ['Intrinsic route: factor XII is activated by contact with a negatively charged surface','XIIa → XIa → IXa. The APTT test starts this step with kaolin or silica in a tube.'],
 ['IXa with cofactor VIIIa (tenase) activates factor X','Needs Ca²⁺ and phospholipid. Haemophilia A (VIII) and B (IX) break this step.'],
 ['Both routes converge: X → Xa','The common pathway begins.'],
 ['Xa with cofactor Va (prothrombinase) turns prothrombin (II) into thrombin (IIa)','On a phospholipid surface with Ca²⁺.'],
 ['Thrombin cleaves fibrinogen (I) into fibrin monomers','Fibrinopeptides A and B are cut off and the monomers polymerise into strands.'],
 ['Factor XIIIa cross-links the fibrin','A stable, insoluble mesh traps red cells and platelets.']],
 foot:'The split is a laboratory convenience. In the body TF–VIIa also activates IX directly, and factor XII deficiency gives a long APTT but no bleeding.'},

coag:{t:'Coagulation in the body: the cell-based model',k:'blood',blk:'blood',sec:'haemostasis',mn:'Initiation, amplification, propagation',
 an:'Thrombin is the foreman. A little is made first; it then switches on all the machinery, and the factory finally produces a huge burst.',steps:[
 ['Initiation on tissue factor-bearing cells','Fibroblasts and smooth muscle under the endothelium carry TF, which binds factor VIIa.'],
 ['TF–VIIa activates small amounts of factor X and factor IX',''],
 ['Xa with Va makes a trace of thrombin','Not enough to clot. TFPI quickly shuts down TF–VIIa–Xa, which is why the "intrinsic" factors are needed to carry on.'],
 ['Amplification: trace thrombin primes the platelets','It activates platelets and factors V, VIII (releasing VIII from vWF) and XI on the platelet surface.'],
 ['Propagation: tenase (IXa + VIIIa) assembles on activated platelets','It makes Xa about 50 times faster than TF–VIIa can.'],
 ['Prothrombinase (Xa + Va) produces a thrombin burst','Huge amounts of thrombin, focused on the platelet plug.'],
 ['Fibrin forms and is cross-linked by XIIIa','Thrombin also activates XIII and TAFI (which protects the clot from lysis). The soft platelet plug becomes a firm secondary plug.']],
 foot:'This model explains why haemophilia causes bleeding even though the extrinsic route is intact: without VIII or IX, the propagation burst never happens.'},

anticoag:{t:'The natural brakes: keeping the clot local',k:'blood',blk:'blood',sec:'haemostasis',mn:'TFPI, antithrombin, protein C + S, plus PGI₂ and NO',
 an:'Clotting is a controlled fire. These brakes are the fire-breaks that stop it spreading beyond the wound.',steps:[
 ['Healthy endothelium is anti-thrombotic','It releases prostacyclin (PGI₂) and NO, and carries ADPase, heparan sulfate and thrombomodulin.'],
 ['TFPI blocks TF–VIIa–Xa','Switches off initiation early.'],
 ['Antithrombin inactivates thrombin, Xa and IXa','Heparan sulfate on endothelium (and heparin drugs) boost it about 1000-fold.'],
 ['Thrombin binds thrombomodulin on intact endothelium','Bound thrombin stops clotting fibrinogen and instead activates protein C (helped by the endothelial protein C receptor).'],
 ['Activated protein C, with protein S, cleaves Va and VIIIa','This shuts down tenase and prothrombinase: negative feedback started by thrombin itself.'],
 ['Fibrinolysis begins as the vessel heals','tPA from the endothelium starts breaking the clot down.']],
 foot:'Thrombophilias are broken brakes: factor V Leiden (Va resists APC), protein C or S deficiency, antithrombin deficiency. Warfarin lowers proteins C and S quickly, so it is briefly pro-thrombotic when started; heparin is overlapped when warfarin is started for a clot.'},

fibrinolysis:{t:'Fibrinolysis: dissolving the clot',k:'blood',blk:'blood',sec:'haemostasis',mn:'tPA → plasmin → fibrin → D-dimer',
 an:'Plasmin is the demolition crew. D-dimer is the rubble: proof that a cross-linked clot was built and then knocked down.',steps:[
 ['Plasminogen is built into the clot as it forms','It binds fibrin through lysine-binding sites.'],
 ['Endothelium releases tissue plasminogen activator (tPA)','tPA works far better when bound to fibrin, so lysis targets the clot rather than circulating fibrinogen. Urokinase (uPA) also acts.'],
 ['tPA converts plasminogen into plasmin',''],
 ['Plasmin cuts fibrin into fibrin degradation products','Fragments with two D domains still joined by XIIIa cross-links are D-dimers.'],
 ['Brakes keep lysis in check','PAI-1 inhibits tPA; α2-antiplasmin rapidly mops up free plasmin; TAFI removes the lysine binding sites.'],
 ['The vessel is repaired and flow is restored','']],
 foot:'Drugs: alteplase (recombinant tPA) for selected ischaemic strokes and massive PE; tranexamic acid blocks plasminogen\'s lysine-binding sites (trauma, heavy menstrual bleeding, surgery). D-dimer is sensitive but not specific: it rises after surgery and in infection, pregnancy and cancer.'},

/* ---------- Blood & healing: wound healing ---------- */
wound:{t:'Wound healing: the four phases',k:'imm',blk:'blood',sec:'wound',mn:'"Healing Is Pretty Remarkable": Haemostasis, Inflammation, Proliferation, Remodelling',
 an:'A building site. Scaffolding goes up (clot), cleaners clear the rubble (neutrophils), the site manager arrives (macrophage), builders put up quick plasterboard (type III collagen), and over months it is rebuilt in brick (type I).',steps:[
 ['Haemostasis (seconds to hours)','Vasoconstriction, platelet plug, fibrin clot. Platelets release growth factors (PDGF, TGF-β) that start the next phase.'],
 ['Inflammation (hours to about day 4)','Vasodilation and leaky vessels. Neutrophils clear bacteria first; macrophages arrive by day 2–3 and direct repair.'],
 ['Proliferation: angiogenesis (day 3 to weeks)','New capillaries bud towards the wound, driven by VEGF from macrophages and hypoxic keratinocytes.'],
 ['Proliferation: fibroplasia and granulation tissue','Fibroblasts lay down type III collagen and proteoglycans: pink, granular granulation tissue.'],
 ['Proliferation: epithelialisation and contraction','Keratinocytes migrate across a moist wound bed; myofibroblasts pull the edges together.'],
 ['Remodelling (3 weeks to 2 years)','Type III collagen is replaced by type I; vessels regress; the scar pales and strengthens to about 80% of normal.']]},

woundInflam:{t:'Wound healing: the inflammatory phase (days 0–4)',k:'imm',blk:'blood',sec:'wound',mn:'Neutrophils first, macrophages run the show',
 an:'Neutrophils are the cleaners who arrive first. Macrophages are the site managers who then hire the builders.',steps:[
 ['The clot is the first scaffold and signal source','Fibrin and fibronectin give cells a matrix to crawl on; platelet α granules release PDGF and TGF-β.'],
 ['Vasodilation and leaky vessels','Histamine, prostaglandins and complement bring fluid, proteins and cells: the wound becomes warm, red and swollen.'],
 ['Neutrophils arrive first (peak at 24–48 hours)','Drawn by C5a, IL-8 and bacterial peptides. They phagocytose bacteria and debris, then die by apoptosis.'],
 ['Monocytes enter and become macrophages (peak at about days 2–4)','Drawn by chemokines such as MCP-1 (CCL2).'],
 ['M1 macrophages clean up','They kill microbes and eat dead neutrophils (efferocytosis) and debris.'],
 ['Switch to M2 (repair) macrophages','Efferocytosis itself triggers the switch. M2 cells release TGF-β, PDGF, VEGF, FGF and IL-10, recruiting fibroblasts and new vessels.']],
 foot:'Macrophages are essential: a clean wound can heal without neutrophils, but not without macrophages. Steroids blunt this phase, which is one reason they delay healing.'},

woundProlif:{t:'Wound healing: the proliferative phase (day 3 to about week 3)',k:'imm',blk:'blood',sec:'wound',mn:'Angiogenesis, granulation, epithelialisation, contraction',
 an:'Plumbers lay pipes (capillaries), builders put up quick plasterboard (type III collagen), roofers cover the top (keratinocytes), and the walls are pulled in (myofibroblasts).',steps:[
 ['Angiogenesis','VEGF and FGF-2 from macrophages and hypoxic keratinocytes make capillaries sprout from vessels at the wound edge.'],
 ['Fibroblasts migrate in and multiply','Drawn by PDGF and TGF-β, they lay down fibronectin, hyaluronic acid and proteoglycans.'],
 ['Collagen synthesis, mostly type III at first','Needs vitamin C (to hydroxylate proline and lysine), oxygen, iron and zinc.'],
 ['Granulation tissue fills the defect','New capillaries, fibroblasts, loose matrix and macrophages: red, moist, granular and easily bleeds.'],
 ['Re-epithelialisation','Keratinocytes from the wound edges and hair follicles crawl across a moist wound bed under the scab, then stop by contact inhibition.'],
 ['Wound contraction (from about day 5–7)','Fibroblasts become myofibroblasts containing α-smooth muscle actin and pull the edges together, shrinking open wounds.']],
 foot:'Healthy granulation tissue is beefy red. Pale or grey granulation suggests poor blood supply or infection. Excess granulation ("proud flesh") stops the epithelium closing over.'},

woundRemodel:{t:'Wound healing: remodelling (3 weeks to 2 years)',k:'imm',blk:'blood',sec:'wound',mn:'III → I, cross-link, realign, regress',
 an:'The plasterboard is slowly swapped for brick, and the bricks are laid along the lines of stress.',steps:[
 ['Collagen synthesis and breakdown come into balance','Matrix metalloproteinases (MMPs, zinc-dependent) degrade collagen; TIMPs restrain them.'],
 ['Type III collagen is replaced by type I','The ratio moves towards that of normal dermis.'],
 ['Collagen is cross-linked by lysyl oxidase','Copper-dependent. Cross-linking gives tensile strength.'],
 ['Fibres realign along lines of tension','Thick, organised bundles replace a random mesh.'],
 ['Cells and vessels regress by apoptosis','Myofibroblasts and capillaries disappear: the red, raised scar becomes pale, flat and less cellular.'],
 ['Strength rises slowly but never fully returns','About 20% of normal at 3 weeks, reaching about 70–80% from 3 months on. Scars have no hair follicles or sweat glands.']],
 foot:'Too much scar: hypertrophic scars stay within the wound edges and often regress; keloids grow beyond them, rarely regress, recur after excision, and are commoner in darker skin and on the earlobes, chest and shoulders.'},

/* ---------- Immunity: lymphatics ---------- */
lymphNode:{t:'How lymphocytes find their antigen in a lymph node',k:'imm',blk:'immune',sec:'lymph',mn:'In by HEV, scan, match, expand, out by S1P',
 an:'A lymph node is a speed-dating venue. Dendritic cells bring a photo of the suspect, and millions of naive lymphocytes stream through looking for a match.',steps:[
 ['Antigen arrives in afferent lymph','Free antigen drains into the subcapsular sinus; dendritic cells carry processed antigen from the tissues, guided by CCR7.'],
 ['Naive lymphocytes enter from the blood through high endothelial venules (HEVs)','L-selectin (CD62L) and CCR7 guide them out of the blood into the paracortex.'],
 ['T cells scan dendritic cells in the paracortex','Each T cell checks hundreds of dendritic cells an hour; most find no match.'],
 ['B cells move to the follicles','Drawn by CXCL13; follicular dendritic cells display intact antigen to them.'],
 ['A match: the lymphocyte stops, is activated and multiplies','The node swells: reactive lymphadenopathy.'],
 ['Cells leave through the efferent lymphatic','Following sphingosine-1-phosphate (S1P). Unmatched cells leave too and recirculate to other nodes.']],
 foot:'Fingolimod (for multiple sclerosis) blocks S1P receptors and traps lymphocytes in the nodes.'},

/* ---------- Immunity: innate ---------- */
prr:{t:'Pattern recognition: from PAMP to cytokines',k:'imm',blk:'immune',sec:'innate',mn:'PAMP → PRR → MyD88 → NF-κB → cytokines',
 an:'PRRs are smoke detectors. They cannot tell you exactly who is in the house, only that there is smoke of a particular kind.',steps:[
 ['A microbial PAMP binds a PRR','LPS binds TLR4 (with CD14 and MD-2) on the cell surface; viral RNA binds TLR3/7/8 in endosomes or RIG-I in the cytoplasm.'],
 ['Adaptor proteins are recruited','MyD88 for most TLRs; TRIF for TLR3 and partly TLR4.'],
 ['A kinase cascade frees NF-κB','NF-κB moves into the nucleus.'],
 ['Inflammatory genes switch on','TNF-α, IL-6, pro-IL-1β, IL-8, IL-12 and adhesion molecules. Viral sensors also switch on type I interferons (through IRF3 and IRF7).'],
 ['The NLRP3 inflammasome activates caspase-1','Caspase-1 cleaves pro-IL-1β into active IL-1β and can trigger inflammatory cell death (pyroptosis).'],
 ['Cytokines act locally and systemically','Local inflammation, fever and the acute phase response; dendritic cells mature and head for the lymph node.']],
 foot:'Urate crystals in gout activate NLRP3, which is why IL-1 blockers (anakinra) help in resistant gout.'},

nk:{t:'How an NK cell decides to kill',k:'imm',blk:'immune',sec:'innate',mn:'Missing self + stressed self = kill',
 an:'An NK cell is a bouncer checking ID. A normal MHC I "ID card" calms it; no card, plus signs of trouble, and you are thrown out.',steps:[
 ['The NK cell docks on a target cell','The balance of inhibitory and activating signals decides the outcome.'],
 ['Inhibitory receptors (KIRs, CD94/NKG2A) check for MHC class I','Normal MHC I sends a "do not kill" signal.'],
 ['Activating receptors such as NKG2D detect stress molecules','Infection and cancer induce stress ligands (MICA, MICB).'],
 ['Missing MHC I removes the brake','Herpesviruses and tumours often lower MHC I to hide from CD8 T cells.'],
 ['CD16 (an IgG Fc receptor) binds antibody-coated cells','Antibody-dependent cellular cytotoxicity (ADCC).'],
 ['Perforin and granzymes trigger apoptosis','Fas ligand is a second route. NK cells also release IFN-γ, which activates macrophages.']],
 foot:'Type I interferons and IL-12 boost NK cells in the first days of a viral infection, before CD8 T cells are ready.'},

/* ---------- Immunity: inflammation ---------- */
inflam:{t:'Acute inflammation: the full sequence',k:'imm',blk:'immune',sec:'inflammation',mn:'Trigger, detect, release, dilate, leak, slow, recruit, kill, stop, outcome',
 an:'An emergency response. The alarm sounds (mast cells), roads are widened (vasodilation), barriers open (leaky vessels), ambulances pull over and the crews get out (neutrophils), the clean-up team follows (macrophages), then the sirens are switched off (resolution).',steps:[
 ['Trigger','Infection, trauma, burns, dead tissue, foreign bodies or immune reactions such as allergy.'],
 ['Detection by sentinel cells','Resident macrophages, mast cells and dendritic cells sense PAMPs and DAMPs through PRRs (TLRs, NOD-like receptors, the inflammasome).'],
 ['Mediators are released','Preformed within seconds (histamine, serotonin from mast cells); newly made over minutes to hours (prostaglandins, leukotrienes, PAF, IL-1, TNF-α, IL-6, chemokines); plasma cascades switch on (complement, kinins, clotting).'],
 ['Brief arteriolar constriction, then vasodilation','Histamine, NO and prostaglandins (PGE₂, PGI₂) relax arterioles. More blood flows in: rubor and calor.'],
 ['Increased vascular permeability','Endothelial cells in post-capillary venules contract and gaps open (histamine, bradykinin, leukotrienes C₄–E₄, C3a, C5a). Protein-rich exudate leaks out: tumor.'],
 ['Stasis and margination','Fluid loss concentrates red cells and slows the flow, pushing leukocytes to the vessel wall.'],
 ['Leukocyte recruitment (extravasation)','Rolling on selectins, integrin activation by chemokines, firm adhesion to ICAM-1, diapedesis, then chemotaxis.'],
 ['Phagocytosis and killing','Neutrophils dominate at 6–24 hours, macrophages from 24–48 hours. Opsonins (C3b, IgG, CRP) speed recognition. Bradykinin and PGE₂ sensitise nerve endings: dolor.'],
 ['Termination','Mediators have short half-lives; neutrophils apoptose and are eaten; lipoxins, resolvins, IL-10 and TGF-β switch the response off.'],
 ['Outcome','Resolution, healing by scarring, abscess formation, or progression to chronic inflammation.']],
 foot:'Exudate (inflammation): protein-rich, cell-rich, specific gravity above 1.020. Transudate (raised pressure or low albumin): protein-poor and cell-poor.'},

arach:{t:'Arachidonic acid: prostaglandins, thromboxane and leukotrienes',k:'drug',blk:'immune',sec:'inflammation',mn:'Steroids turn off the tap (PLA₂); NSAIDs block one pipe (COX)',
 an:'Phospholipase A₂ is the tap at the top; COX and LOX are two pipes leading off it. Steroids turn the tap off. NSAIDs block only the COX pipe, so more can flow down the LOX pipe, which is how aspirin can worsen asthma.',steps:[
 ['Cell injury or activation switches on phospholipase A₂','Corticosteroids inhibit it indirectly (by inducing annexin-1, also called lipocortin) and reduce COX-2 expression.'],
 ['PLA₂ releases arachidonic acid from membrane phospholipids',''],
 ['Cyclo-oxygenase (COX) turns it into PGH₂','COX-1 is always present (stomach, kidney, platelets); COX-2 is induced in inflammation. NSAIDs block both; celecoxib is COX-2 selective.'],
 ['PGH₂ becomes the prostanoids','PGE₂: vasodilation, pain, fever, gastric protection. PGI₂ (endothelium): vasodilation, inhibits platelets. TXA₂ (platelets): vasoconstriction and aggregation.'],
 ['5-lipoxygenase (5-LOX) makes leukotrienes','LTB₄: neutrophil chemotaxis. LTC₄, LTD₄, LTE₄ (cysteinyl leukotrienes): bronchoconstriction and leaky vessels.'],
 ['Lipoxins form during resolution','Anti-inflammatory: they stop neutrophil recruitment and encourage macrophages to clear dead cells.']],
 foot:'Montelukast blocks the CysLT₁ receptor (asthma). NSAID side effects follow from the prostaglandins they remove: gastric ulcers, kidney injury (less afferent arteriolar dilation) and aspirin-exacerbated respiratory disease.'},

granuloma:{t:'Chronic granulomatous inflammation',k:'imm',blk:'immune',sec:'inflammation',mn:'Macrophage → Th1 → IFN-γ → epithelioid cell → giant cell → wall',
 an:'When the clean-up crew cannot destroy something, it builds a wall around it.',steps:[
 ['A persistent agent that macrophages cannot digest','Mycobacteria, some fungi, foreign material (sutures, silica), or an unknown trigger (sarcoidosis).'],
 ['Macrophages present antigen to CD4 T cells','IL-12 from the macrophages drives Th1 cells.'],
 ['Th1 cells release IFN-γ','IFN-γ activates macrophages to kill harder.'],
 ['Activated macrophages become epithelioid cells','Large, pale, tightly packed cells that look a little like epithelium.'],
 ['Some fuse into multinucleated giant cells','Langhans giant cells, with nuclei arranged in a horseshoe, are typical of TB.'],
 ['A cuff of lymphocytes and fibroblasts walls it off','In TB the centre often undergoes caseous ("cheesy") necrosis.']],
 foot:'Caseating granulomas suggest TB; non-caseating granulomas suggest sarcoidosis or Crohn\'s disease. TNF-α holds granulomas together, so anti-TNF drugs can reactivate latent TB: screen before starting them.'},

/* ---------- Immunity: complement ---------- */
complClass:{t:'Complement: the classical pathway',k:'imm',blk:'immune',sec:'complement',mn:'C1 → C4 → C2 → C3 (numbered by discovery, not order)',
 an:'C1q looks like a bunch of six tulips. It has to grab at least two antibody tails at once before it fires, so lone antibodies floating in plasma do not set it off.',steps:[
 ['C1q binds the Fc regions of antibody stuck to antigen','Needs one IgM (pentamer) or at least two closely spaced IgG. CRP and apoptotic cells can also bind C1q.'],
 ['C1r activates C1s','C1 is C1q plus two C1r and two C1s. C1-inhibitor normally keeps this in check.'],
 ['C1s cleaves C4 into C4a and C4b','C4b sticks covalently to the microbe.'],
 ['C1s cleaves C2; the large fragment joins C4b','Forming C4b2a, the classical (and lectin) C3 convertase. Some newer texts call the large C2 fragment C2b.'],
 ['C4b2a splits many C3 into C3a and C3b','One convertase makes hundreds of C3b molecules.'],
 ['C3b joins the convertase to make the C5 convertase (C4b2a3b)','The terminal pathway follows.']]},

complLectin:{t:'Complement: the lectin pathway',k:'imm',blk:'immune',sec:'complement',mn:'MBL + MASP-2 → C4 and C2',
 an:'The same machinery as the classical pathway, but triggered by a sugar sensor instead of antibody, so it works on day 1.',steps:[
 ['Mannose-binding lectin (MBL) or ficolins bind sugar patterns on microbes','Arrays of mannose and N-acetylglucosamine are common on bacteria, fungi and some viruses but are not exposed on our cells.'],
 ['MBL-associated serine proteases (MASP-1, MASP-2) are activated','They play the part of C1r and C1s.'],
 ['MASP-2 cleaves C4 and C2',''],
 ['C4b2a (the C3 convertase) forms','Exactly as in the classical pathway.'],
 ['C3 is split and C3b opsonises the microbe',''],
 ['The C5 convertase forms and the terminal pathway follows','']],
 foot:'MBL deficiency is common and usually mild, but raises infection risk in infancy and in people with other immune problems.'},

complAlt:{t:'Complement: the alternative pathway and amplification loop',k:'imm',blk:'immune',sec:'complement',mn:'C3 tickover + factor B + factor D + properdin',
 an:'A sentry that fires paint pellets at everything that passes. Our own cells carry "friend" badges (factor H, CD55, CD46, CD59) that wipe the paint off; microbes do not.',steps:[
 ['C3 ticks over spontaneously in plasma','A little C3 is hydrolysed all the time into C3(H₂O).'],
 ['Factor B binds and factor D cleaves it','This makes a fluid-phase C3 convertase that produces a little C3b.'],
 ['C3b lands on nearby surfaces','On our cells, factor H, factor I, DAF (CD55) and MCP (CD46) inactivate it within seconds. Microbial surfaces lack these regulators.'],
 ['On a microbe, C3b binds factor B; factor D cleaves it into C3bBb','The alternative C3 convertase, stabilised by properdin (factor P).'],
 ['The amplification loop','Each C3bBb makes more C3b, which makes more C3bBb. This loop also amplifies C3b made by the classical and lectin pathways.'],
 ['C3bBb3b is the alternative C5 convertase','The terminal pathway follows.']],
 foot:'Factor H mutations let complement attack the kidney (atypical haemolytic uraemic syndrome) and the retina (age-related macular degeneration).'},

mac:{t:'Complement: the terminal pathway (membrane attack complex)',k:'imm',blk:'immune',sec:'complement',mn:'C5b-6-7-8-9: "5 to 9 kills"',
 an:'C9 molecules line up like the staves of a barrel with no ends, punching a hole the bacterium cannot plug.',steps:[
 ['The C5 convertase splits C5 into C5a and C5b','C5a is the most potent anaphylatoxin and the main complement chemoattractant for neutrophils.'],
 ['C5b binds C6, then C7','C5b-6-7 inserts into the lipid membrane.'],
 ['C8 joins and penetrates the membrane',''],
 ['10–16 C9 molecules polymerise into a ring','A pore about 10 nm wide.'],
 ['Water and ions rush in: osmotic lysis','Most effective against thin-walled Gram-negative bacteria such as Neisseria.'],
 ['CD59 (protectin) on our cells blocks C9 polymerisation','Loss of CD55 and CD59 from red cells (a GPI-anchor defect) causes paroxysmal nocturnal haemoglobinuria.']],
 foot:'Eculizumab (anti-C5) treats PNH and atypical HUS but blocks the MAC, so patients must be vaccinated against meningococcus and often take antibiotic prophylaxis.'},

/* ---------- Immunity: adaptive ---------- */
mhc1:{t:'Antigen processing for MHC class I',k:'imm',blk:'immune',sec:'adaptive',mn:'Inside → proteasome → TAP → ER → surface → CD8',
 an:'Every nucleated cell posts samples of what it is making in its front window. CD8 T cells walk past checking for anything foreign.',steps:[
 ['Proteins made inside the cell are tagged with ubiquitin','Including viral and mutated (tumour) proteins.'],
 ['The proteasome chops them into peptides of 8–10 amino acids','IFN-γ switches cells to an immunoproteasome that makes better peptides for MHC I.'],
 ['TAP transporters pump the peptides into the endoplasmic reticulum',''],
 ['Peptides are loaded onto new MHC I molecules','MHC I is a heavy chain plus β₂-microglobulin; tapasin helps loading.'],
 ['Peptide–MHC I travels to the cell surface via the Golgi',''],
 ['CD8 T cells inspect it','A foreign peptide triggers killing of that cell.']],
 foot:'Herpesviruses and CMV block TAP or remove MHC I to hide, and NK cells catch them. Cross-presentation lets dendritic cells put engulfed antigen on MHC I to prime CD8 cells.'},

mhc2:{t:'Antigen processing for MHC class II',k:'imm',blk:'immune',sec:'adaptive',mn:'Outside → endosome → CLIP swapped by HLA-DM → surface → CD4',
 an:'Professional antigen-presenting cells eat things from outside and pin the remains on a noticeboard for helper T cells, like a detective pinning up evidence.',steps:[
 ['An antigen-presenting cell engulfs extracellular material','Dendritic cells, macrophages and B cells (B cells take antigen in through their BCR).'],
 ['The endosome acidifies and proteases cut proteins into peptides of 13–25 amino acids',''],
 ['MHC II is made in the ER with the invariant chain','The invariant chain blocks the groove so ER peptides, meant for MHC I, cannot bind.'],
 ['In the endosome the invariant chain is trimmed to CLIP',''],
 ['HLA-DM swaps CLIP for an antigen peptide',''],
 ['Peptide–MHC II goes to the surface and is read by CD4 T cells','']],
 foot:'MHC II is normally found only on professional antigen-presenting cells, but IFN-γ can induce it on other cells.'},

bDev:{t:'B cell development in the bone marrow',k:'imm',blk:'immune',sec:'adaptive',mn:'Heavy chain first, then light chain, then a self test',
 an:'Each B cell shuffles a deck of gene segments to build a one-off receptor, then is tested to make sure it will not attack the body.',steps:[
 ['Stem cell → pro-B cell','Supported by marrow stromal cells and IL-7.'],
 ['Heavy chain gene rearrangement (V, D, J segments)','RAG1 and RAG2 cut and join segments; imprecise joins add more variety (junctional diversity).'],
 ['Pre-B cell displays a pre-BCR','Heavy chain plus a surrogate light chain: a check that the heavy chain works (BTK signalling is needed here).'],
 ['Light chain rearrangement (κ first, then λ)','The immature B cell displays surface IgM.'],
 ['Negative selection: central tolerance','Strongly self-reactive cells edit their receptor (receptor editing), die by apoptosis or become anergic.'],
 ['Mature naive B cells leave for the spleen and lymph nodes','They display IgM and IgD with the same specificity, made by alternative RNA splicing.']],
 foot:'RAG deficiency causes SCID (no T or B cells). X-linked agammaglobulinaemia (BTK mutation) blocks the pre-B stage, so there are almost no B cells or antibodies.'},

germinal:{t:'The germinal centre: class switching and affinity maturation',k:'imm',blk:'immune',sec:'antibodies',mn:'Divide, mutate, select, switch, graduate',
 an:'A training camp. B cells keep modifying their weapons, only the best shots are kept, and they are re-equipped for the job (IgG, IgA or IgE).',steps:[
 ['Activated B cells and follicular helper T cells enter a follicle','A germinal centre forms within about a week of infection.'],
 ['Rapid proliferation in the dark zone','Centroblasts divide every 6–12 hours.'],
 ['Somatic hypermutation','The enzyme AID introduces point mutations into the variable-region genes.'],
 ['Selection in the light zone','Follicular dendritic cells hold antigen. B cells with higher-affinity receptors capture more, present it to Tfh cells and receive survival signals; the rest die by apoptosis.'],
 ['Class switch recombination','Also needs AID plus CD40L. Cytokines choose the class: IFN-γ → IgG subclasses, IL-4 → IgE (and IgG4), TGF-β → IgA. The variable region, and so the specificity, is unchanged.'],
 ['Output: long-lived plasma cells and memory B cells','Plasma cells settle in the bone marrow and secrete antibody for years.']],
 foot:'Hyper-IgM syndrome (usually CD40L deficiency): normal or high IgM but very low IgG, IgA and IgE because B cells cannot switch class.'},

/* ---------- Immunity: how it ties together ---------- */
immuneTimeline:{t:'One infection, start to finish: how innate and adaptive link up',k:'imm',blk:'immune',sec:'together',mn:'Barriers → sentinels → neutrophils → DCs to node → T cells → B cells → memory',
 an:'A castle under siege: walls, guards, alarm bells, the militia, scouts riding to headquarters, special forces trained, guided missiles made, and veterans who remember the enemy.',steps:[
 ['0 minutes: barriers','Skin, mucus, cilia, acid, lysozyme, defensins and commensal flora. Most microbes stop here.'],
 ['Minutes: complement and sentinel cells','Alternative and lectin complement coat the microbe; resident macrophages and mast cells sense PAMPs and release cytokines and histamine.'],
 ['Hours: neutrophils flood in','Acute inflammation. Neutrophils kill by phagocytosis, the respiratory burst and NETs.'],
 ['Hours to day 1: the whole body joins in','IL-1, IL-6 and TNF-α cause fever, a rising CRP and neutrophilia. Type I interferons and NK cells tackle viruses.'],
 ['Days 1–2: dendritic cells carry antigen to the lymph node','Their PRRs have told them what kind of microbe it is; they mature on the way (more MHC and CD80/86).'],
 ['Days 3–5: naive T cells are activated and multiply','Three signals. IL-12 → Th1 (intracellular microbes), IL-4 → Th2 (worms), IL-6 + TGF-β → Th17 (extracellular bacteria, fungi). CD8 T cells are primed.'],
 ['Days 5–7: B cells get T cell help and IgM appears','C3d on the antigen binds CD21 on the B cell and lowers its activation threshold.'],
 ['Week 2: high-affinity IgG and effector T cells reach the tissues','Antibodies feed back to innate cells: they opsonise for phagocytes, activate classical complement and guide NK cells (ADCC). Th1 cells activate macrophages with IFN-γ.'],
 ['Weeks: resolution and contraction','Most effector cells die by apoptosis; Tregs, IL-10 and TGF-β calm things down; repair begins.'],
 ['Months to years: memory','Memory B and T cells and long-lived plasma cells give a faster, larger, higher-affinity secondary response.']]},

helminthFight:{t:'Worm (helminth) infection storyboard',k:'micro',blk:'immune',sec:'storyboards',mn:'Th2 → IgE + eosinophils → "weep and sweep"',
 an:'Worms are far too big to swallow, so the body switches tactic: coat them, poison them, and flush them out.',steps:[
 ['A helminth invades the gut wall, skin or blood','Too large to be phagocytosed.'],
 ['Damaged epithelium releases alarmins (IL-25, IL-33, TSLP)','These activate type 2 innate lymphoid cells (ILC2s).'],
 ['Dendritic cells drive CD4 cells to become Th2','Helped by IL-4.'],
 ['Th2 cytokines: IL-4 and IL-13 → IgE; IL-5 → eosinophils','IL-13 also increases mucus and gut contraction ("weep and sweep").'],
 ['IgE coats the worm and arms mast cells','Mast cell degranulation increases fluid secretion and peristalsis.'],
 ['Eosinophils bind antibody-coated worms','They release major basic protein and other toxic granule proteins onto the worm surface (ADCC).'],
 ['M2 macrophages repair the tissue','Eosinophilia and a raised IgE are the blood test clues.']]},

tbFight:{t:'Tuberculosis: an intracellular bacterium storyboard',k:'micro',blk:'immune',sec:'storyboards',mn:'Th1 → IFN-γ → activated macrophage → granuloma',
 an:'TB is a burglar hiding inside the security guard\'s own house. The only options are to make the guard angrier, or wall the house off.',steps:[
 ['Inhaled droplet nuclei reach the alveoli',''],
 ['Alveolar macrophages engulf M. tuberculosis','The bacterium stops the phagosome fusing with lysosomes and survives inside.'],
 ['Dendritic cells carry antigen to the hilar nodes','IL-12 drives Th1 differentiation. This takes weeks because TB grows so slowly.'],
 ['Th1 cells release IFN-γ (and TNF-α)','IFN-γ activates macrophages to fuse phagosomes with lysosomes and make nitric oxide: now they can kill.'],
 ['A granuloma forms','Epithelioid macrophages, Langhans giant cells, lymphocytes and fibrosis wall off the bacteria, often with central caseous necrosis.'],
 ['Most people contain it as latent TB','Reactivation follows loss of T cell or TNF function: HIV, anti-TNF drugs, steroids, diabetes, old age.'],
 ['T cell memory is the basis of TB tests','The Mantoux test (type IV hypersensitivity) and interferon-γ release assays (IGRA).']],
 foot:'Antibodies are of little use against bacteria hiding inside cells: cell-mediated immunity (Th1 and macrophages) does the work.'},

/* ---------- Immunity: hypersensitivity ---------- */
type2:{t:'Type II hypersensitivity (antibody against a cell or receptor)',k:'imm',blk:'immune',sec:'hypersens',mn:'Kill the cell, or block or stimulate the receptor',
 an:'Antibodies stick "wanted" posters on the body\'s own cells.',steps:[
 ['IgG or IgM binds an antigen fixed on a cell surface or matrix','A self antigen, a drug stuck to a cell, or foreign red cells.'],
 ['Complement is activated on the cell','C3b opsonises it; the MAC may lyse it (intravascular haemolysis in an ABO-incompatible transfusion).'],
 ['Phagocytes with Fc and C3b receptors destroy the coated cells','Mainly in the spleen (extravascular haemolysis).'],
 ['NK cells kill antibody-coated cells (ADCC)',''],
 ['Or the antibody changes a receptor without killing the cell','Blocking: myasthenia gravis (nicotinic ACh receptor). Stimulating: Graves\' disease (TSH receptor).'],
 ['Neutrophils recruited by C5a damage tissue','Goodpasture\'s syndrome: antibodies against type IV collagen in glomerular and alveolar basement membranes.']]},

type3:{t:'Type III hypersensitivity (immune complexes)',k:'imm',blk:'immune',sec:'hypersens',mn:'Complexes lodge where blood is filtered under pressure',
 an:'Small antigen–antibody clumps are grit in the plumbing: they lodge where blood is filtered hard, in glomeruli, joints and small vessels.',steps:[
 ['Soluble antigen and antibody form immune complexes','Especially with slight antigen excess, which makes small complexes that are cleared poorly.'],
 ['Complexes are normally cleared to the spleen','Complement coats them and red cell CR1 carries them to splenic macrophages.'],
 ['Excess complexes deposit in vessel walls, glomeruli, joints and skin',''],
 ['Deposited complexes activate classical complement','Serum C3 and C4 fall as they are used up.'],
 ['C5a recruits neutrophils, which release enzymes onto the tissue',''],
 ['Vasculitis, glomerulonephritis, arthritis and rash','SLE, post-streptococcal glomerulonephritis, serum sickness (7–10 days after foreign protein), Arthus reaction.']]},

type4:{t:'Type IV hypersensitivity (delayed, T cell-mediated)',k:'imm',blk:'immune',sec:'hypersens',mn:'No antibody; peaks at 48–72 hours',
 an:'A slow-burning grudge: memory T cells need a day or two to gather the macrophage troops.',steps:[
 ['Sensitisation','An antigen, often a hapten such as nickel bound to a self protein, is presented by dendritic cells; memory Th1 (and CD8) cells form.'],
 ['Re-exposure: the antigen is presented again in the tissue',''],
 ['Memory T cells recognise it and release cytokines over 24–48 hours','IFN-γ, TNF-α and chemokines.'],
 ['Macrophages are recruited and activated',''],
 ['CD8 T cells may kill cells directly',''],
 ['Induration and inflammation peak at 48–72 hours','Contact dermatitis, the Mantoux test, chronic transplant rejection, type 1 diabetes, granulomas.']]},

/* ---------- Infection & drugs ---------- */
betaLactam:{t:'How a β-lactam kills a bacterium',k:'drug',blk:'infect',sec:'antimicrobials',mn:'No cross-links → weak wall → osmotic lysis',
 an:'Peptidoglycan is chain-link fencing the cell keeps welding as it grows. β-lactams steal the welding torch, so the fence tears and the cell bursts like an over-filled balloon.',steps:[
 ['The bacterium grows and must keep building peptidoglycan','Glycan chains are joined by peptide cross-links.'],
 ['Transpeptidases (penicillin-binding proteins, PBPs) make the cross-links','They act on the D-Ala–D-Ala end of the peptide.'],
 ['The β-lactam ring mimics D-Ala–D-Ala and binds PBPs irreversibly','In Gram-negatives the drug must first get through outer-membrane porins.'],
 ['Cross-linking stops but autolysins keep cutting','The wall weakens as the cell grows.'],
 ['Water rushes in: osmotic lysis','Bactericidal, but only against growing cells. Killing is time-dependent: keep the level above the MIC.'],
 ['Resistance','β-lactamases open the ring (blocked by clavulanic acid, tazobactam); altered PBP2a (MRSA, mecA gene); fewer porins.']],
 foot:'Vancomycin also stops cross-linking, but by binding D-Ala–D-Ala itself. It is too large to cross the Gram-negative outer membrane.'},

aciclovir:{t:'Aciclovir: activated only in infected cells',k:'drug',blk:'infect',sec:'antimicrobials',mn:'Viral thymidine kinase → triphosphate → chain termination',
 an:'A Trojan horse that opens only inside houses that hold the virus\'s own key (thymidine kinase).',steps:[
 ['Aciclovir, a guanosine analogue, enters cells',''],
 ['Viral thymidine kinase adds the first phosphate','Only HSV- and VZV-infected cells have this enzyme, so uninfected cells barely activate the drug: high selectivity and low toxicity.'],
 ['Host kinases add two more phosphates: aciclovir triphosphate',''],
 ['It competes with dGTP for viral DNA polymerase',''],
 ['Once built into viral DNA it ends the chain','It lacks the 3′-OH needed to add the next nucleotide.'],
 ['Replication stops, but latent virus is untouched','So aciclovir treats outbreaks but cannot clear latent virus from sensory ganglia.']],
 foot:'Valaciclovir is an oral prodrug that is better absorbed. Resistance usually comes from thymidine kinase mutations. Ganciclovir (CMV) is activated by a different viral kinase (UL97) and suppresses the bone marrow.'},

azole:{t:'Ergosterol and the antifungal targets',k:'drug',blk:'infect',sec:'antimicrobials',mn:'Block the factory (terbinafine, azoles) or attack the product (polyenes)',
 an:'Ergosterol is the fungus\'s own version of cholesterol. You can block the factory that makes it, or attack the finished product in the membrane.',steps:[
 ['Fungi make squalene from acetyl-CoA',''],
 ['Squalene epoxidase moves the pathway on towards lanosterol','Blocked by terbinafine (an allylamine): toxic squalene builds up. Used for dermatophytes and nail infections.'],
 ['Lanosterol 14α-demethylase (CYP51) leads on to ergosterol','Blocked by azoles (fluconazole, itraconazole, voriconazole). Azoles also inhibit human CYP450 enzymes, causing many drug interactions.'],
 ['Ergosterol is built into the fungal cell membrane','Humans use cholesterol instead: the basis of selective toxicity.'],
 ['Polyenes bind ergosterol and punch pores','Amphotericin B (IV; kidney toxicity) and nystatin (topical or oral, not absorbed).'],
 ['Echinocandins target the cell wall instead','Caspofungin and micafungin inhibit β-1,3-glucan synthase (IV; Candida and Aspergillus).']]}
});

/* Older pathways from data.js that now live in different chapters or sections */
(function(){
  const move={blood:['erythro'],
    immune:['lymphFlow','thymus','tAct','ctl','bAct','type1','anaph','bactFight','viralFight','compl'],
    infect:['viralRep','hiv','gram','pathogenesis','specimen','pcr','elisa','sepsis6','thermoCold','fever']};
  Object.keys(move).forEach(b=>move[b].forEach(id=>{if(PATHWAYS[id]) PATHWAYS[id].blk=b;}));
  const sec={compl:'complement',extrav:'inflammation',phago:'inflammation'};
  Object.keys(sec).forEach(id=>{if(PATHWAYS[id]) PATHWAYS[id].sec=sec[id];});
  ['extrav','phago'].forEach(id=>{if(PATHWAYS[id]) PATHWAYS[id].blk='immune';});
  if(PATHWAYS.compl){PATHWAYS.compl.t='Complement: the big picture'; PATHWAYS.compl.mn='Three ways in, one way out: "C3b binds bugs, C5a calls, C5b–9 kills"';
    PATHWAYS.compl.an='Complement is a row of dominoes floating in the blood. Tip the first one on a microbe and each domino knocks over many more, ending in a hole punched in the target.';}
  const an={extrav:'Like a taxi pulling in: slow down (rolling), see the address (chemokine), brake hard (integrins), get out between the parked cars (diapedesis), then follow the smell (chemotaxis).',
    phago:'Eat, seal the bag, add bleach and acid.',
    bactFight:'Innate cells hold the line for the first week; antibodies arrive as reinforcements and then stay on as a standing army (memory).',
    viralFight:'You cannot attack a virus hiding inside a cell, so the body destroys the infected cell itself, while antibodies stop new cells being infected.',
    hiv:'HIV hijacks the conductor of the orchestra (the CD4 cell), so the whole orchestra slowly falls silent.',
    fever:'Fever is the body turning up its own thermostat; antipyretics turn it back down.',
    gram:'Purple stays in the thick sponge (Gram-positive); the thin, oily Gram-negative wall lets alcohol wash it out, so it takes up the pink.',
    thymus:'Thymic school: you must recognise the school uniform (self MHC) to pass, but you are expelled if you bully your classmates (self-peptide).',
    tAct:'A car needs a key (signal 1), a foot on the accelerator (signal 2) and a destination (signal 3). A key with no accelerator does nothing (anergy).',
    ctl:'A precision sniper: it kills one infected cell at a time without blowing up the neighbourhood.',
    bAct:'The B cell shows the helper T cell a sample of what it caught; the T cell checks the match and gives it permission (CD40L) to go into mass production.',
    type1:'Sensitisation loads the gun (IgE on mast cells); re-exposure pulls the trigger (cross-linking).',
    lymphFlow:'Storm drains for the tissues, with police checkpoints (nodes) along the way.',
    erythro:'The kidney is the oxygen meter: it orders more red cells when delivery falls.'};
  Object.keys(an).forEach(id=>{if(PATHWAYS[id]&&!PATHWAYS[id].an) PATHWAYS[id].an=an[id];});
})();

/* Extra rapid-recall cards (tag: blood, immune, infect) */
FLIPS.push(
 ['blood','Three steps of primary haemostasis','Adhesion (vWF–GPIb), activation (shape change, granules, TXA₂), aggregation (GPIIb/IIIa + fibrinogen).'],
 ['blood','What does vWF bridge?','Exposed subendothelial collagen to platelet GPIb; it also carries and protects factor VIII.'],
 ['blood','Platelet receptor blocked by clopidogrel','P2Y₁₂ (ADP receptor).'],
 ['blood','Why does TFPI make the "intrinsic" factors essential?','It shuts down TF–VIIa–Xa after a trace of thrombin, so VIII and IX must carry on the propagation burst.'],
 ['blood','Thrombin bound to thrombomodulin activates...','Protein C, which with protein S cleaves Va and VIIIa.'],
 ['blood','What is D-dimer?','A cross-linked fibrin breakdown product: proof that fibrin was formed, cross-linked by XIIIa, then lysed by plasmin.'],
 ['blood','Platelet-type vs clotting-factor-type bleeding','Platelet/vWF: immediate, mucosal, petechiae. Clotting factor: delayed, deep (joints, muscles).'],
 ['blood','PT, APTT and platelets in DIC','PT ↑, APTT ↑, platelets ↓, fibrinogen ↓, D-dimer ↑.'],
 ['blood','PT, APTT in von Willebrand disease','PT normal; APTT normal or slightly ↑ (low VIII); platelet count normal.'],
 ['blood','Peak cell in a wound at 24–48 h, and at days 2–4','Neutrophils, then macrophages.'],
 ['blood','Collagen type in granulation tissue vs mature scar','Type III, replaced by type I.'],
 ['blood','Cell that contracts a wound','Myofibroblast (α-smooth muscle actin).'],
 ['blood','Vitamin needed for collagen hydroxylation','Vitamin C (scurvy: poor healing, bleeding gums).'],
 ['blood','Keloid vs hypertrophic scar','Keloid grows beyond the wound edge and rarely regresses; hypertrophic stays within it and often regresses.'],
 ['blood','Maximum scar strength','About 70–80% of normal skin, reached from about 3 months.'],
 ['immune','Preformed vs newly made mediators','Preformed: histamine, serotonin. Newly made: prostaglandins, leukotrienes, PAF, cytokines.'],
 ['immune','Enzyme blocked (indirectly) by corticosteroids','Phospholipase A₂ (via annexin-1).'],
 ['immune','Leukotriene that attracts neutrophils','LTB₄.'],
 ['immune','Exudate vs transudate','Exudate: protein- and cell-rich (inflammation). Transudate: protein-poor (pressure or low albumin).'],
 ['immune','Cells in a granuloma','Epithelioid macrophages, multinucleated giant cells, lymphocytes, fibroblasts.'],
 ['immune','Classical C3 convertase','C4b2a.'],
 ['immune','Alternative C3 convertase and its stabiliser','C3bBb, stabilised by properdin.'],
 ['immune','Regulator that blocks MAC assembly on our cells','CD59 (protectin).'],
 ['immune','Complement deficiency → recurrent Neisseria','Terminal components C5–C9 (or properdin).'],
 ['immune','C1-inhibitor deficiency','Hereditary angioedema: bradykinin-driven swelling without urticaria.'],
 ['immune','Peptides on MHC I come from...','Proteins made inside the cell: proteasome → TAP → ER.'],
 ['immune','What does HLA-DM do?','Swaps CLIP for an antigen peptide in the MHC II groove.'],
 ['immune','Enzyme for somatic hypermutation and class switching','AID (activation-induced cytidine deaminase).'],
 ['immune','Cytokine that drives class switch to IgA','TGF-β.'],
 ['immune','Hyper-IgM syndrome is usually a defect in...','CD40 ligand on T cells: B cells cannot class switch.'],
 ['immune','Affinity vs avidity','Affinity: strength of one binding site. Avidity: total strength of all sites (IgM has low affinity but high avidity).'],
 ['immune','Antibody function that needs no Fc','Neutralisation (blocking toxins or viral entry).'],
 ['immune','-ximab, -zumab, -umab','Chimeric, humanised, fully human monoclonal antibodies.'],
 ['immune','Rituximab target','CD20 on B cells.'],
 ['immune','Lymphocytes enter lymph nodes through...','High endothelial venules (L-selectin, CCR7).'],
 ['immune','Splenic zone that makes antibody to capsules','Marginal zone B cells (T-independent responses).'],
 ['infect','Immune arm that controls TB','Th1 cells (IFN-γ) activating macrophages; granulomas.'],
 ['infect','Immune response to helminths','Th2: IgE, eosinophils, mast cells, mucus ("weep and sweep").'],
 ['infect','Why is aciclovir selective?','Viral thymidine kinase does the first phosphorylation, so it is activated only in infected cells.'],
 ['infect','Oseltamivir mechanism','Neuraminidase inhibitor: new influenza virions cannot be released.'],
 ['infect','Azole target','Lanosterol 14α-demethylase (CYP51): no ergosterol.'],
 ['infect','Echinocandin target','β-1,3-glucan synthase (fungal cell wall).'],
 ['infect','Amphotericin B mechanism and toxicity','Binds ergosterol and makes pores; nephrotoxic.'],
 ['infect','Why do aminoglycosides not work on anaerobes?','Uptake into the bacterium needs oxygen-dependent transport.'],
 ['infect','Treatment for severe falciparum malaria','IV artesunate.'],
 ['infect','Drug for threadworm','Mebendazole (plus hygiene for the whole household).']
);
