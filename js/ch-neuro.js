/* Nervous system biomed. Data-driven chapter: see "DATA-DRIVEN CHAPTERS" in app.js for the block types. */
window.CHAPTERS=window.CHAPTERS||{};
CHAPTERS.neuro={
short:'Nervous',eyebrow:'Nervous system biomed',h1:'Signals, pathways and pressure',
blurb:'Action potentials, synapses, tracts and lesions, autonomic control, pain, hearing, intracranial pressure.',
lede:'A neuron turns ion gradients into a signal, passes it across a synapse, and sends it along a tract that crosses the midline at a predictable place. Learn the signal, the wiring and where each tract crosses, and you can localise a lesion from the pattern of weakness and numbness. The chapter ends with the autonomic system, pain, hearing and balance, and what happens when pressure rises inside the skull.',
secs:[
/* ------------------------------------------------------------------ */
{id:'neuro-cells',eb:'Cells',h:'Neurons, glia and myelin',p:'Neurons signal; glia support, insulate and defend them. Where the cell bodies sit, and what wraps the axon, explains a lot of clinical neurology.',b:[
 ['think','A neuron is a telephone wire with a battery. The cell body is the exchange, the axon is the cable, myelin is the plastic insulation, and the synapse is the handset at the other end. Strip the insulation (demyelination) and the signal slows, leaks or fails.'],
 ['table',['Part','What it does','Clinical or exam point'],[
  ['Dendrites','Receive input and carry graded potentials towards the cell body',''],
  ['Cell body (soma)','Nucleus and protein synthesis (Nissl substance = rough ER)','Neurons are post-mitotic: lost neurons are not replaced'],
  ['Axon hillock','Highest density of voltage-gated Na⁺ channels: where the action potential starts','Sums all the inputs: fires only if threshold is reached'],
  ['Axon','Carries the action potential away from the cell body','Microtubules are the tracks for axonal transport'],
  ['Axon terminal','Stores neurotransmitter in vesicles; releases it when Ca²⁺ enters','Target of botulinum and tetanus toxins'],
  ['Neurofilaments and microtubules','Give the axon its shape; microtubules carry cargo','<b>Kinesin</b> moves cargo away from the cell body (anterograde); <b>dynein</b> moves it back (retrograde). Herpes and rabies viruses and tetanus toxin travel retrogradely']]],
 ['fix','Nervous System deck · axonal transport','The slide says neurotubules "transport kinesin" to the terminal and "transport dynein" back. Kinesin and dynein are the <b>motor proteins</b>, not the cargo: kinesin carries vesicles and mitochondria towards the terminal, dynein carries material back to the cell body.'],
 ['h','Where things are'],
 ['table',['','Central nervous system','Peripheral nervous system'],[
  ['Made of','Brain and spinal cord','Cranial and spinal nerves, ganglia, autonomic nerves'],
  ['Collections of cell bodies','<b>Nuclei</b> (grey matter)','<b>Ganglia</b> (e.g. dorsal root ganglion)'],
  ['Bundles of axons','<b>Tracts</b> (white matter)','<b>Nerves</b>: mixed motor, sensory and autonomic fibres'],
  ['Grey and white matter','Brain: grey outside (cortex), white inside. Spinal cord: grey inside (the butterfly), white outside',''],
  ['Myelinating cell','<b>Oligodendrocyte</b>: one cell sends arms to wrap many axons','<b>Schwann cell</b>: one whole cell wraps one segment of one axon'],
  ['Regeneration','Poor (inhibitory environment, glial scar)','Possible: Schwann cells guide regrowth at about 1 mm a day'],
  ['Demyelinating disease','Multiple sclerosis','Guillain–Barré syndrome']]],
 ['cards',[
  ['Glia: the support cells',['<b>Astrocytes:</b> form the blood–brain barrier with endothelium, mop up K⁺ and glutamate, form glial scars.','<b>Oligodendrocytes</b> (CNS) and <b>Schwann cells</b> (PNS): myelin.','<b>Microglia:</b> the resident macrophages of the CNS (from yolk sac, not neural tube).','<b>Ependymal cells:</b> line the ventricles; in the choroid plexus they make CSF.','<b>Satellite cells:</b> support cell bodies in ganglia.']],
  ['Classifying nerve fibres',['<b>Afferent</b> (sensory) fibres Arrive at the CNS; <b>efferent</b> (motor, autonomic) fibres Exit it.','Faster conduction comes from a <b>larger diameter</b> (less internal resistance) and <b>myelin</b> (saltatory conduction).','Pressure blocks large fibres first; local anaesthetic blocks small fibres first (pain goes before touch and movement).'],'Mnemonic: SAME. Sensory Afferent, Motor Efferent.']]],
 ['table',['Fibre','Carries','Myelin','Speed (m/s)'],[
  ['Aα','Motor to skeletal muscle; muscle spindle afferents (proprioception)','Thick','70–120'],
  ['Aβ','Touch, pressure, vibration','Yes','30–70'],
  ['Aγ','Motor to muscle spindles','Yes','15–30'],
  ['Aδ','Fast, sharp pain; cold','Thin','5–30'],
  ['B','Preganglionic autonomic','Thin','3–15'],
  ['C','Slow, dull, burning pain; warmth; postganglionic autonomic','None','0.5–2']]],
 ['notes',
  ['clin','Guillain–Barré syndrome',`An acute autoimmune <b>demyelination of peripheral nerves</b>, typically 1–3 weeks after an infection (classically <i>Campylobacter jejuni</i> gastroenteritis) by molecular mimicry. <b>Ascending, symmetrical weakness</b> starting in the legs, <b>loss of reflexes</b> (a lower motor neuron picture), glove-and-stocking tingling and pain, sometimes autonomic instability. The danger is respiratory muscle weakness, so <b>monitor FVC</b>. Tests: nerve conduction studies (slowed), lumbar puncture at L3/4 showing <b>high protein with a normal cell count</b>. Treatment: IV immunoglobulin or plasma exchange.`],
  ['clin','Multiple sclerosis and Charcot–Marie–Tooth',`<b>MS:</b> T cell-mediated demyelination of the CNS, with lesions separated in time and place: optic neuritis, sensory symptoms, weakness with upper motor neuron signs. MRI shows white matter plaques; CSF shows oligoclonal bands. <b>Charcot–Marie–Tooth:</b> inherited peripheral neuropathy (one form is a mutation in connexin 32, a gap junction protein in Schwann cells): distal weakness and wasting, high-arched feet, foot drop.`]],
 ['pw','neurulation']
]},
/* ------------------------------------------------------------------ */
{id:'neuro-ap',eb:'Excitable cells',h:'Resting and action potentials',p:'The resting potential is a battery charged by the Na⁺/K⁺ pump and set mainly by potassium leaking out. The action potential is a brief, all-or-nothing reversal of that battery that travels along the axon.',b:[
 ['think','Think of a row of spring-loaded mousetraps. Setting the traps takes energy (the pump building the gradients). Trip one and it trips the next (voltage-gated sodium channels opening in turn). Each trap must be reset before it can fire again (the refractory period), which is why the wave only travels forwards.'],
 ['explore','dg-ap','The action potential','Tap each phase. Voltage is measured inside the cell relative to outside.',640,
  `<svg viewBox="0 0 760 348" role="img" aria-label="Action potential graph">
   <path class="ax" d="M80,34 V290 H700"/>
   <g class="sm" text-anchor="end"><text x="72" y="62">+30</text><text x="72" y="118">0</text><text x="72" y="219">−55</text><text x="72" y="247">−70</text><text x="72" y="284">−90</text></g>
   <g class="sm" text-anchor="middle"><text x="80" y="306">0</text><text x="200" y="306">1</text><text x="320" y="306">2</text><text x="440" y="306">3</text><text x="560" y="306">4</text><text x="680" y="306">5 ms</text></g>
   <text x="24" y="165" class="sm" text-anchor="middle" transform="rotate(-90 24 165)">membrane potential (mV)</text>
   <path class="grid" d="M80,215 H700 M80,243 H700"/>
   <text x="696" y="209" class="sm lab" text-anchor="end">threshold −55 mV</text>
   <g data-k="rest"><rect class="hit" x="80" y="40" width="120" height="250"/><text x="140" y="232" class="sm lab b" text-anchor="middle">1 Resting −70 mV</text></g>
   <g data-k="depol"><rect class="hit" x="200" y="40" width="84" height="250"/><text x="228" y="120" class="sm lab b" text-anchor="end">2 Depolarisation</text><text x="228" y="136" class="sm" text-anchor="end">Na⁺ rushes in</text></g>
   <g data-k="repol"><rect class="hit" x="284" y="40" width="96" height="250"/><text x="350" y="120" class="sm lab b">3 Repolarisation</text><text x="350" y="136" class="sm">K⁺ flows out</text></g>
   <g data-k="hyper"><rect class="hit" x="380" y="40" width="220" height="250"/><text x="470" y="228" class="sm lab b">4 After-hyperpolarisation</text></g>
   <text x="284" y="46" class="sm" text-anchor="middle">peak about +30 mV</text>
   <path class="c1" style="pointer-events:none" d="M80,243 H200 C215,243 226,232 236,215 C250,180 268,58 284,58 C304,58 330,200 380,243 C400,258 420,262 440,262 C480,262 540,243 584,243 H690"/>
   <g data-k="arp"><rect x="236" y="318" width="164" height="18" rx="5" class="n-blood"/><text x="318" y="331" class="sm lab" text-anchor="middle">absolute refractory</text></g>
   <g data-k="rrp"><rect x="404" y="318" width="180" height="18" rx="5" class="n-nerve"/><text x="494" y="331" class="sm lab" text-anchor="middle">relative refractory</text></g>
  </svg>`,
  {rest:['1 · Resting potential (−70 mV)','K⁺ leak channels are open, so K⁺ drifts out down its concentration gradient and leaves the inside negative. Voltage-gated Na⁺ and K⁺ channels are closed. The Na⁺/K⁺ ATPase (3 Na⁺ out, 2 K⁺ in) maintains the gradients.'],
   depol:['2 · Depolarisation','A stimulus brings the membrane to threshold (about −55 mV). Voltage-gated Na⁺ channels open, Na⁺ floods in, and that opens more channels: positive feedback, so the response is all-or-nothing. The potential shoots towards the sodium equilibrium potential (+60 mV) but only reaches about +30 mV.'],
   repol:['3 · Repolarisation','Na⁺ channels inactivate (the inactivation gate plugs the pore) within about 1 ms. Slower voltage-gated K⁺ channels are now open, and K⁺ leaves the cell, bringing the potential back down.'],
   hyper:['4 · After-hyperpolarisation','K⁺ channels are slow to close, so the membrane briefly overshoots towards the potassium equilibrium potential (about −90 mV) before settling back to −70 mV. Very few ions actually move in one action potential, so the pump is not what repolarises the cell.'],
   arp:['Absolute refractory period','Na⁺ channels are open or inactivated, so no stimulus, however strong, can start another action potential. This sets the maximum firing rate and makes the impulse travel in one direction only.'],
   rrp:['Relative refractory period','Some Na⁺ channels have recovered but K⁺ channels are still open and the cell is hyperpolarised. A larger than normal stimulus can fire the cell. Stimulus strength is therefore coded as firing <b>frequency</b>, not size.']}],
 ['pw','rmp','actpot'],
 ['cards',[
  ['Why −70 mV?',['The resting membrane is about 40 times more permeable to K⁺ than Na⁺, so it sits near the K⁺ equilibrium potential (−90 mV), nudged up by a small Na⁺ leak.','The Na⁺/K⁺ pump contributes only a few mV directly; its real job is keeping the gradients.','<b>Extracellular K⁺ sets excitability:</b> high K⁺ depolarises cells (then inactivates Na⁺ channels: weakness, arrhythmia); low K⁺ hyperpolarises them (weakness, cramps).','<b>Low Ca²⁺</b> makes Na⁺ channels open more easily: tingling and tetany.']],
  ['Conduction along the axon',['<b>Unmyelinated:</b> continuous conduction, each patch depolarises the next (slow).','<b>Myelinated:</b> current jumps between <b>nodes of Ranvier</b>, where the Na⁺ channels are clustered: <b>saltatory conduction</b>, up to 100 times faster and cheaper in ATP.','Speed rises with axon diameter and myelination, and falls with cold and demyelination.','Graded potentials (in dendrites) fade with distance and can add up; action potentials do not fade.']]]],
 ['notes',
  ['clin','Local anaesthetics',`Lidocaine and bupivacaine cross the membrane in their uncharged form, then <b>block voltage-gated Na⁺ channels from the inside</b>, so no action potential can be generated. Small pain fibres (Aδ, C) are blocked before large motor fibres. They work poorly in infected tissue because the acidic pH keeps more drug charged, so less gets in. Adrenaline is added to prolong the effect (not in fingers, toes, nose, ears or penis). Toxicity: tingling round the mouth, seizures, arrhythmia.`],
  ['fix','Nervous System deck · refractory period','The slide says the resting potential "must be restored via the sodium–potassium pump" before the neuron can fire again. Repolarisation is done by K⁺ leaving through voltage-gated channels; the refractory period is due to <b>Na⁺ channel inactivation</b>. The pump only tidies up the small ion shifts over time.']]
]},
/* ------------------------------------------------------------------ */
{id:'neuro-synapse',eb:'Synapses',h:'Synapses and neurotransmitters',p:'At a chemical synapse the electrical signal becomes a chemical one and back again. This is the slowest, most adjustable and most drug-sensitive step in the nervous system.',b:[
 ['pwside','synapse',
  ['card','Excitation, inhibition and summation',['<b>EPSP:</b> the transmitter opens Na⁺ (or Ca²⁺) channels: a small depolarisation (glutamate).','<b>IPSP:</b> opens Cl⁻ or K⁺ channels: a small hyperpolarisation (GABA, glycine).','<b>Temporal summation:</b> one synapse firing rapidly. <b>Spatial summation:</b> many synapses firing together.','The axon hillock adds everything up; if threshold is reached, the neuron fires.','<b>Ionotropic</b> receptors are ion channels (fast, milliseconds). <b>Metabotropic</b> receptors are G protein-coupled (slower, longer lasting).']],
  ['clin','Switching the signal off','Transmitter is removed by <b>enzymes</b> (acetylcholinesterase), <b>reuptake</b> into the terminal (serotonin, noradrenaline, dopamine) or <b>uptake by astrocytes</b> (glutamate). Many drugs act here: SSRIs block serotonin reuptake; neostigmine and donepezil block acetylcholinesterase; cocaine blocks dopamine and noradrenaline reuptake.']],
 ['table',['Transmitter','Main roles','Receptors','Clinical and drug links'],[
  ['Glutamate','Main <b>excitatory</b> transmitter in the CNS; learning and memory','AMPA, NMDA (ion channels)','Excess causes excitotoxicity after stroke; ketamine and memantine block NMDA receptors'],
  ['GABA','Main <b>inhibitory</b> transmitter in the brain','GABA<sub>A</sub> (Cl⁻ channel), GABA<sub>B</sub>','Benzodiazepines, alcohol and many anaesthetics enhance GABA<sub>A</sub>; loss of inhibition contributes to seizures'],
  ['Glycine','Main inhibitory transmitter in the <b>spinal cord</b>','Cl⁻ channel','Tetanus toxin blocks its release (spasms); strychnine blocks the receptor'],
  ['Acetylcholine','Neuromuscular junction; all autonomic ganglia; parasympathetic effects; memory and arousal','Nicotinic (ion channel), muscarinic (GPCR)','Lost in Alzheimer\'s disease (donepezil); myasthenia gravis; atropine blocks muscarinic receptors'],
  ['Dopamine','Movement (basal ganglia), reward and motivation, inhibits prolactin','D1–D5 (GPCR)','<b>Parkinson\'s:</b> loss of dopaminergic neurons in the substantia nigra (levodopa). Antipsychotics block D2: parkinsonism and raised prolactin'],
  ['Noradrenaline','Arousal, attention, mood; sympathetic postganglionic transmitter','α and β (GPCR)','SNRIs and tricyclics raise it; involved in descending pain inhibition'],
  ['Serotonin (5-HT)','Mood, sleep, appetite, gut motility, pain inhibition','Mostly GPCR; 5-HT₃ is an ion channel','SSRIs for depression and anxiety; ondansetron (5-HT₃ blocker) for vomiting; triptans for migraine'],
  ['Endorphins and enkephalins','The body\'s own opioids: inhibit pain transmission in the dorsal horn; euphoria','μ, δ, κ (GPCR)','Morphine and other opioids mimic them'],
  ['Substance P','Amplifies pain transmission in the dorsal horn','NK1','Capsaicin depletes it; aprepitant (NK1 blocker) is an anti-emetic']]],
 ['clin','Parkinson\'s disease in one line','Dopamine and acetylcholine balance each other in the basal ganglia. Lose dopamine and you get <b>tremor at rest, rigidity, bradykinesia and postural instability</b>. Treatment restores dopamine (levodopa with a peripheral decarboxylase inhibitor, dopamine agonists, MAO-B inhibitors).']
]},
/* ------------------------------------------------------------------ */
{id:'neuro-tracts',eb:'Wiring',h:'Spinal cord, tracts and lesions',p:'Three tracts explain most lesion questions. For each, know what it carries, where it travels in the cord, and where it crosses. Everything else is deduction.',b:[
 ['think','Each tract is a motorway with one flyover where it changes sides. If you know where the flyover is, you know whether damage at a given point affects the same side or the opposite side of the body.'],
 ['explore','dg-tracts','Where the three big tracts cross','Left of the dashed line is the left side of the nervous system. Tap a tract.',660,
  `<svg viewBox="0 0 780 350" role="img" aria-label="Decussation of the main spinal tracts">
   <path class="grid" d="M20,70 H760 M20,140 H760 M20,210 H760 M20,280 H760"/>
   <path d="M400,14 V336" stroke="var(--ink-2)" stroke-width="1.4" stroke-dasharray="7 5"/><text x="400" y="346" class="hd" text-anchor="middle">MIDLINE</text>
   <g class="hd"><text x="10" y="58">CORTEX</text><text x="10" y="128">THALAMUS</text><text x="10" y="198">MEDULLA</text><text x="10" y="268">SPINAL CORD</text><text x="10" y="330">BODY</text></g>
   <g data-k="cst"><path class="c1" d="M110,40 V176 C110,204 640,186 690,216 V320"/><circle cx="690" cy="252" r="6" style="fill:var(--artery)"/><text x="110" y="26" class="sm lab b" text-anchor="middle">Corticospinal</text><text x="700" y="326" class="sm">muscle</text><text x="700" y="256" class="sm">LMN</text></g>
   <g data-k="stt"><path class="c4" d="M620,320 V250 C620,230 250,246 190,224 V40"/><circle cx="620" cy="250" r="6" style="fill:var(--nerve)"/><circle cx="190" cy="104" r="6" style="fill:var(--nerve)"/><text x="206" y="26" class="sm lab b" text-anchor="middle">Spinothalamic</text></g>
   <g data-k="dcml"><path class="c2" d="M560,320 V178 C560,150 330,162 290,140 V40"/><circle cx="560" cy="178" r="6" style="fill:var(--vein)"/><circle cx="290" cy="104" r="6" style="fill:var(--vein)"/><text x="296" y="26" class="sm lab b" text-anchor="middle">DCML</text></g>
   <text x="590" y="340" class="sm" text-anchor="middle">skin, joints</text>
   <text x="470" y="300" class="sm">right side of body</text>
  </svg>`,
  {dcml:['Dorsal column–medial lemniscus (DCML)','<b>Carries:</b> fine touch, vibration, conscious proprioception, two-point discrimination.<br><b>Route:</b> first neuron (cell body in the dorsal root ganglion) enters and climbs the <b>same side</b> in the dorsal column (gracile fasciculus for the legs, cuneate for the arms) to the medulla. Second neuron <b>crosses in the medulla</b> and climbs as the medial lemniscus to the thalamus (VPL). Third neuron goes to the sensory cortex.<br><b>So:</b> a cord lesion gives loss on the <b>same side</b> below it.'],
   stt:['Spinothalamic tract','<b>Carries:</b> pain and temperature (lateral part), crude touch and pressure (anterior part).<br><b>Route:</b> first neuron synapses in the dorsal horn. Second neuron <b>crosses within one or two segments</b> through the anterior white commissure, then climbs on the opposite side to the thalamus. Third neuron goes to the sensory cortex.<br><b>So:</b> a cord lesion gives loss on the <b>opposite side</b>, starting a segment or two below it.'],
   cst:['Corticospinal (pyramidal) tract','<b>Carries:</b> voluntary movement.<br><b>Route:</b> upper motor neurons from the motor cortex (precentral gyrus) descend through the <b>internal capsule</b> and brainstem. About 85–90% <b>cross at the pyramids of the medulla</b> and descend as the lateral corticospinal tract (limbs); the rest descend uncrossed as the anterior tract (trunk) and cross at their segment. They synapse on lower motor neurons in the ventral horn.<br><b>So:</b> a lesion above the medulla (stroke) gives weakness on the opposite side; a cord lesion gives weakness on the same side.']}],
 ['pw','dcml','stt','cst'],
 ['table',['Tract','Direction','Carries','Crosses at','Cord lesion gives loss on...'],[
  ['Dorsal column (DCML)','Ascending','Fine touch, vibration, proprioception','Medulla','Same side'],
  ['Spinothalamic','Ascending','Pain, temperature, crude touch','Spinal cord (within 1–2 segments)','Opposite side'],
  ['Spinocerebellar','Ascending','Unconscious proprioception to the cerebellum','Mostly does not cross (ends on the same side)','Same side (ataxia)'],
  ['Lateral corticospinal','Descending','Voluntary movement of limbs','Medulla (pyramids)','Same side'],
  ['Anterior corticospinal','Descending','Trunk and proximal muscles','At the spinal segment','Little deficit (bilateral supply)']]],
 ['fix','All Biomed deck · decussation table','The slide labels the lateral spinothalamic tract as "(ipsilateral)". It crosses in the cord, so it carries sensation from the <b>opposite</b> side of the body. The dorsal column nuclei are the <b>gracile</b> nucleus (legs) and <b>cuneate</b> nucleus (arms), not "nucleus fasciculus".'],
 ['h','Lesions of the cord'],
 ['sw','dg-cord','Cord syndromes','Cross-section of the spinal cord with the back (dorsal) at the top. Red shading shows the damaged area.',640,
  `<svg viewBox="0 0 780 334" role="img" aria-label="Spinal cord cross-section and lesion patterns">
   <text x="250" y="14" class="hd" text-anchor="middle">POSTERIOR (DORSAL)</text><text x="250" y="330" class="hd" text-anchor="middle">ANTERIOR (VENTRAL)</text>
   <ellipse cx="250" cy="168" rx="190" ry="140" style="fill:var(--paper);stroke:var(--line-2);stroke-width:2"/>
   <path d="M235,152 C215,122 195,92 178,54 C172,62 176,102 200,142 C170,152 150,202 150,237 C160,267 200,264 215,242 C228,217 235,192 250,187 C265,192 272,217 285,242 C300,264 340,267 350,237 C350,202 330,152 300,142 C324,102 328,62 322,54 C305,92 285,122 265,152 Z" style="fill:var(--sunk);stroke:var(--line-2);stroke-width:1.5"/>
   <circle cx="250" cy="170" r="5" style="fill:var(--paper);stroke:var(--ink-2)"/>
   <g style="fill:var(--vein-tint);stroke:var(--vein);stroke-width:1.5"><ellipse cx="226" cy="76" rx="20" ry="38"/><ellipse cx="274" cy="76" rx="20" ry="38"/></g>
   <g style="fill:var(--artery-tint);stroke:var(--artery);stroke-width:1.5"><ellipse cx="128" cy="132" rx="30" ry="25"/><ellipse cx="372" cy="132" rx="30" ry="25"/><ellipse cx="232" cy="278" rx="11" ry="17"/><ellipse cx="268" cy="278" rx="11" ry="17"/></g>
   <g style="fill:var(--nerve-tint);stroke:var(--nerve);stroke-width:1.5"><ellipse cx="124" cy="226" rx="28" ry="21"/><ellipse cx="376" cy="226" rx="28" ry="21"/></g>
   <g style="fill:var(--lymph-tint);stroke:var(--lymph);stroke-width:1.5"><ellipse cx="76" cy="172" rx="11" ry="38"/><ellipse cx="424" cy="172" rx="11" ry="38"/></g>
   <g stroke="var(--line-2)" fill="none"><path d="M294,64 L474,58"/><path d="M402,130 L474,118"/><path d="M436,172 L474,178"/><path d="M404,228 L474,238"/><path d="M280,284 L474,298"/></g>
   <g><text x="480" y="56" class="sm lab b">Dorsal columns</text><text x="480" y="72" class="sm">fine touch, vibration, proprioception</text>
   <text x="480" y="116" class="sm lab b">Lateral corticospinal</text><text x="480" y="132" class="sm">voluntary movement</text>
   <text x="480" y="176" class="sm lab b">Spinocerebellar</text><text x="480" y="192" class="sm">unconscious proprioception</text>
   <text x="480" y="236" class="sm lab b">Spinothalamic</text><text x="480" y="252" class="sm">pain, temperature, crude touch</text>
   <text x="480" y="296" class="sm lab b">Anterior corticospinal</text><text x="480" y="312" class="sm">trunk muscles</text></g>
   <g style="fill:var(--artery);fill-opacity:.3;stroke:var(--artery);stroke-width:2;stroke-dasharray:6 4">
    <path data-v="brown" d="M250,28 A190,140 0 0 1 440,168 A190,140 0 0 1 250,308 Z"/>
    <path data-v="anterior" d="M72.5,118 L427.5,118 A190,140 0 1 1 72.5,118 Z"/>
    <circle data-v="syrinx" cx="250" cy="172" r="46"/>
    <ellipse data-v="posterior" cx="250" cy="78" rx="62" ry="50"/>
   </g>
  </svg>`,
  [['normal','Normal','<b>Normal cord.</b> Sensory tracts sit at the back and side; the corticospinal tract sits posterolaterally. The dorsal horns receive sensory input; the ventral horns hold the lower motor neuron cell bodies.'],
   ['brown','Brown-Séquard (hemisection)','<b>One half of the cord is cut</b> (stab wound, tumour). Below the lesion: <b>same side</b> weakness with upper motor neuron signs (corticospinal) and <b>same side</b> loss of fine touch, vibration and proprioception (dorsal column); <b>opposite side</b> loss of pain and temperature (spinothalamic, which has already crossed).'],
   ['anterior','Anterior cord syndrome','<b>Anterior spinal artery occlusion</b> (aortic surgery, hypotension) damages the anterior two-thirds. <b>Both sides:</b> paralysis below the lesion and loss of pain and temperature. <b>Fine touch, vibration and proprioception are spared</b> because the dorsal columns are supplied by the posterior spinal arteries.'],
   ['syrinx','Syringomyelia (central cord)','<b>A fluid-filled cavity around the central canal</b>, usually cervical. It first destroys the spinothalamic fibres as they cross: <b>loss of pain and temperature on both sides in a cape distribution</b> (shoulders and arms) with preserved fine touch (dissociated sensory loss). Patients burn their hands without noticing. As it expands it reaches the ventral horns: wasting of the hand muscles.'],
   ['posterior','Dorsal column disease','<b>Loss of vibration and proprioception</b> with a positive Romberg test and sensory ataxia. Causes: <b>vitamin B12 deficiency</b> (subacute combined degeneration, which also affects the corticospinal tracts), tabes dorsalis (tertiary syphilis), multiple sclerosis.']]],
 ['fix','Nervous System deck · cord damage','For syringomyelia the slide says loss of temperature sensation on the "opposite side". Because the cavity cuts the fibres from <b>both</b> sides as they cross, the loss is <b>bilateral</b>, in a cape distribution at the level of the lesion.'],
 ['h','Upper and lower motor neuron lesions'],
 ['table',['Sign','Upper motor neuron (cortex to ventral horn)','Lower motor neuron (ventral horn to muscle)'],[
  ['Tone','Increased: <b>spasticity</b> (clasp-knife)','Decreased: <b>flaccid</b>'],
  ['Reflexes','<b>Brisk</b>, clonus','<b>Reduced or absent</b>'],
  ['Plantar response','<b>Upgoing</b> (Babinski positive)','Downgoing or absent'],
  ['Muscle bulk','Preserved at first (disuse atrophy later)','<b>Wasting</b> within weeks'],
  ['Fasciculations','Absent','<b>Present</b>'],
  ['Weakness pattern','Pyramidal: arm extensors and leg flexors weakest','In the distribution of the root or nerve'],
  ['Examples','Stroke, multiple sclerosis, cord compression, cerebral palsy','Peripheral nerve injury, Guillain–Barré, polio, cauda equina syndrome'],
  ['Both together','Motor neuron disease (ALS): mixed upper and lower motor neuron signs with <b>no sensory loss</b>','']]],
 ['pwside','stretch',
  ['clin','Why UMN lesions make reflexes brisk','The reflex arc itself lives in the cord and needs no brain. Descending upper motor neurons normally <b>dampen</b> it. Cut them and the arc is released: brisk reflexes, spasticity, clonus. Cut the arc itself (lower motor neuron or sensory limb) and the reflex disappears. Immediately after an acute cord injury there is a period of <b>spinal shock</b> with flaccid areflexia before spasticity develops.'],
  ['clin','Cord level and the cauda equina','The cord ends at about <b>L1–L2</b> in adults (the conus medullaris), so a lumbar puncture is done at <b>L3/4 or L4/5</b>, level with the iliac crests. Below the conus are only nerve roots (the cauda equina), so damage there is <b>lower motor neuron</b>. <b>Cauda equina syndrome</b> (usually a central disc prolapse) is an emergency: saddle anaesthesia, urinary retention or incontinence, loss of anal tone, bilateral leg weakness. Urgent MRI and decompression.']]
]},
/* ------------------------------------------------------------------ */
{id:'neuro-ans',eb:'Autonomic',h:'The autonomic nervous system',p:'Involuntary control of the heart, smooth muscle and glands. Two neurons in a chain, two divisions that usually oppose each other, and a short list of receptors that explains a long list of drugs.',b:[
 ['fig','dg-ans','Somatic and autonomic outputs compared','All preganglionic neurons release acetylcholine onto nicotinic receptors. The postganglionic transmitter is what differs.',660,
  `<svg viewBox="0 0 780 326" role="img" aria-label="Somatic, sympathetic and parasympathetic pathways">
   <rect x="16" y="26" width="96" height="290" rx="14" class="n-nerve"/><text x="64" y="52" class="b" text-anchor="middle">CNS</text>
   <text x="126" y="48" class="sm b">Somatic motor: one neuron</text>
   <path d="M112,66 H636" class="a-plain"/><text x="470" y="58" class="sm lab" text-anchor="middle">ACh → nicotinic (muscle type)</text>
   <rect x="640" y="50" width="126" height="32" rx="8" class="n-musc"/><text x="703" y="71" class="sm b" text-anchor="middle">Skeletal muscle</text>
   <text x="126" y="112" class="sm b">Sympathetic: T1–L2, short then long</text>
   <path d="M112,130 H258" class="a-plain"/><circle cx="268" cy="130" r="9" style="fill:var(--nerve-tint);stroke:var(--nerve-ink);stroke-width:1.6"/><path d="M277,130 H636" class="a-plain"/>
   <text x="186" y="148" class="sm lab" text-anchor="middle">ACh → nicotinic</text><text x="470" y="122" class="sm lab" text-anchor="middle">noradrenaline → α and β receptors</text>
   <rect x="640" y="114" width="126" height="32" rx="8" class="n-blood"/><text x="703" y="135" class="sm b" text-anchor="middle">Heart, vessels, gut</text>
   <path d="M112,192 H396" class="a-plain"/><text x="250" y="184" class="sm lab" text-anchor="middle">ACh → nicotinic</text>
   <rect x="400" y="176" width="124" height="32" rx="8" class="n-org"/><text x="462" y="197" class="sm b" text-anchor="middle">Adrenal medulla</text>
   <path d="M524,192 H560" class="a-plain"/><text x="566" y="188" class="sm lab">adrenaline (80%) and</text><text x="566" y="204" class="sm">noradrenaline into blood</text>
   <text x="126" y="228" class="sm">Exception: sympathetic fibres to sweat glands release ACh onto muscarinic receptors</text>
   <text x="126" y="262" class="sm b">Parasympathetic: CN III, VII, IX, X and S2–S4, long then short</text>
   <path d="M112,282 H556" class="a-plain"/><circle cx="566" cy="282" r="9" style="fill:var(--nerve-tint);stroke:var(--nerve-ink);stroke-width:1.6"/><path d="M575,282 H636" class="a-plain"/>
   <text x="330" y="300" class="sm lab" text-anchor="middle">ACh → nicotinic</text><text x="596" y="306" class="sm lab" text-anchor="middle">ACh → muscarinic</text>
   <rect x="640" y="266" width="126" height="32" rx="8" class="n-imm"/><text x="703" y="287" class="sm b" text-anchor="middle">Heart, glands, gut</text>
  </svg>`],
 ['table',['','Sympathetic ("fight or flight")','Parasympathetic ("rest and digest")'],[
  ['Outflow','Thoracolumbar: <b>T1–L2</b> (lateral horn)','Craniosacral: <b>CN III, VII, IX, X</b> and <b>S2–S4</b>'],
  ['Ganglia','Close to the cord: sympathetic chain and prevertebral ganglia','In or near the target organ'],
  ['Preganglionic fibre','Short; ACh → nicotinic','Long; ACh → nicotinic'],
  ['Postganglionic fibre','Long; <b>noradrenaline</b> → α, β (ACh for sweat glands)','Short; <b>ACh</b> → muscarinic'],
  ['Pupil','Dilates (α₁, radial muscle): mydriasis','Constricts (M₃, sphincter pupillae): miosis; accommodation'],
  ['Heart','↑ rate and contractility (β₁)','↓ rate (M₂, vagus); little effect on contractility'],
  ['Bronchi','Dilate (β₂)','Constrict, more mucus (M₃)'],
  ['Blood vessels','Constrict in skin and gut (α₁); dilate in muscle (β₂)','Little direct supply'],
  ['Gut and bladder','↓ motility, sphincters contract (α₁); detrusor relaxes (β₃)','↑ motility and secretion, sphincters relax; detrusor contracts (M₃): "pee and poo"'],
  ['Glands','Thick saliva; sweating (M₃, via ACh)','Watery saliva, tears, gastric acid'],
  ['Metabolism','Glycogenolysis, lipolysis (β₂, β₃); renin release (β₁)','Insulin release'],
  ['Sexual function','Ejaculation ("shoot")','Erection ("point")']]],
 ['table',['Receptor','G protein and second messenger','Main sites and effects','Drugs that act on it'],[
  ['α₁','G<sub>q</sub>: ↑ IP₃, Ca²⁺','Vasoconstriction, pupil dilation, sphincter contraction','Phenylephrine (agonist); doxazosin, tamsulosin (blockers: hypertension, prostate)'],
  ['α₂','G<sub>i</sub>: ↓ cAMP','Presynaptic brake on noradrenaline release','Clonidine (agonist)'],
  ['β₁','G<sub>s</sub>: ↑ cAMP','Heart: ↑ rate and force; kidney: renin release','Bisoprolol, atenolol (blockers); dobutamine (agonist)'],
  ['β₂','G<sub>s</sub>: ↑ cAMP','Bronchodilation, vasodilation in muscle, uterine relaxation, tremor','Salbutamol, salmeterol (agonists); propranolol blocks β₁ and β₂ (avoid in asthma)'],
  ['β₃','G<sub>s</sub>: ↑ cAMP','Lipolysis; relaxes bladder detrusor','Mirabegron (overactive bladder)'],
  ['M₁','G<sub>q</sub>','CNS, gastric parietal cells',''],
  ['M₂','G<sub>i</sub>: ↓ cAMP, opens K⁺ channels','Heart: slows the SA and AV nodes','Atropine (blocker) treats bradycardia'],
  ['M₃','G<sub>q</sub>: ↑ IP₃, Ca²⁺','Smooth muscle contraction (bronchi, gut, bladder), glands, pupil constriction','Ipratropium, tiotropium (bronchodilators); oxybutynin (bladder); pilocarpine (agonist, glaucoma)'],
  ['Nicotinic (N<sub>N</sub>, N<sub>M</sub>)','Ligand-gated Na⁺/K⁺ channel','Autonomic ganglia and adrenal medulla; neuromuscular junction','Suxamethonium, rocuronium (muscle relaxants)']]],
 ['p','A quick way to remember the G proteins: <b>"QISS and QIQ"</b>. α₁ q, α₂ i, β₁ s, β₂ s; M₁ q, M₂ i, M₃ q. G<sub>q</sub> receptors make smooth muscle contract; G<sub>s</sub> relaxes smooth muscle but stimulates the heart; G<sub>i</sub> is a brake.'],
 ['notes',
  ['clin','Horner\'s syndrome',`Loss of sympathetic supply to one side of the face: <b>ptosis</b> (weak superior tarsal muscle), <b>miosis</b> (unopposed pupil constriction) and <b>anhidrosis</b> (no sweating), sometimes with the eye appearing sunken. The pathway runs from the hypothalamus down to T1, out over the <b>apex of the lung</b>, and up the carotid artery, so causes include a <b>Pancoast tumour</b> at the lung apex, carotid artery dissection (painful) and brainstem stroke.`],
  ['clin','Too much or too little acetylcholine',`<b>Cholinergic excess</b> (organophosphate poisoning, too much neostigmine): "SLUDGE": salivation, lacrimation, urination, diarrhoea, GI cramps, emesis, plus small pupils, bradycardia, bronchospasm. <b>Antimuscarinic effects</b> (atropine, tricyclics, oxybutynin, hyoscine): dry mouth, blurred vision and large pupils, fast heart rate, constipation, urinary retention, confusion in older people: "dry as a bone, blind as a bat, mad as a hatter, hot as a hare".`]],
 ['fix','Nervous System deck · Horner\'s syndrome','The slide lists a dry eye "due to no innervation of the lacrimal gland". Tear secretion is <b>parasympathetic</b> (facial nerve, CN VII), so it is not part of Horner\'s. The triad is ptosis, miosis and anhidrosis.']
]},
/* ------------------------------------------------------------------ */
{id:'neuro-pain',eb:'Sensation',h:'Sensory receptors, touch and pain',p:'Receptors turn a stimulus into action potentials. Which receptor, which fibre and which tract decide what you feel. Pain has its own fibres, its own gate in the dorsal horn, and its own descending brakes, which is where analgesics act.',b:[
 ['table',['Receptor','Type','Adapts','Detects','Where'],[
  ['Meissner\'s corpuscle','Encapsulated','Rapidly','Light touch, flutter','Hairless skin: fingertips, lips'],
  ['Pacinian corpuscle','Encapsulated (onion-like)','Rapidly','Vibration, deep pressure','Deep dermis, joints'],
  ['Merkel disc','Unencapsulated','Slowly','Sustained fine touch, shape and edges','Fingertips, base of epidermis'],
  ['Ruffini ending','Encapsulated','Slowly','Skin stretch','Deep dermis'],
  ['Hair follicle plexus','Free endings','Rapidly','Hair movement','Hairy skin'],
  ['Free nerve endings','Free','Slowly or not at all','<b>Pain</b> (nociceptors), <b>temperature</b>, itch','Everywhere except the brain itself'],
  ['Muscle spindle','Encapsulated','Slowly','Muscle <b>length</b> and rate of stretch','In parallel with muscle fibres'],
  ['Golgi tendon organ','Encapsulated','Slowly','Muscle <b>tension</b>','In series, at the tendon']]],
 ['cards',[
  ['How well you can feel depends on...',['<b>Receptor density</b> and small <b>receptive fields</b>: highest in fingertips, lips and tongue (best two-point discrimination).','<b>Adaptation:</b> rapidly adapting receptors signal change (you stop feeling your clothes); slowly adapting ones signal as long as the stimulus lasts. Nociceptors barely adapt.','<b>Cortical representation:</b> the sensory homunculus gives the hands and face the most cortex.']],
  ['Two kinds of pain fibre',['<b>Aδ fibres:</b> thinly myelinated, fast. <b>First pain:</b> sharp, well localised, makes you withdraw.','<b>C fibres:</b> unmyelinated, slow, polymodal (heat, chemicals, pressure). <b>Second pain:</b> dull, burning, poorly localised, long lasting. About 70% of nociceptive input.','Cold travels in Aδ fibres, warmth in C fibres.','Ordinary touch travels in Aβ fibres, which can close the pain gate.']]]],
 ['pwside','painpath',
  ['card','Turning pain up and down',['<b>Peripheral sensitisation:</b> prostaglandins and bradykinin from injured tissue lower the nociceptor threshold (NSAIDs act here).','<b>Gate control:</b> Aβ touch fibres excite inhibitory interneurons in the dorsal horn, so rubbing a bumped knee and TENS machines reduce pain.','<b>Descending inhibition:</b> the periaqueductal grey and brainstem send serotonin and noradrenaline fibres down to the dorsal horn, releasing enkephalins that block transmission (opioids, tricyclics and SNRIs act here).','<b>Central sensitisation:</b> repeated input makes dorsal horn neurons over-respond (NMDA receptors): allodynia and chronic pain.']],
  ['clin','Referred pain','Visceral and somatic afferents converge on the same dorsal horn neurons, so the brain blames the skin: heart → left arm and jaw (T1–T4), diaphragm → shoulder tip (C3–C5), appendix → umbilicus first (T10), kidney → loin to groin (T10–L1).']],
 ['table',['Analgesic','Mechanism','Good for','Main problems'],[
  ['Paracetamol','Inhibits COX mainly in the CNS','Mild pain, fever','Liver failure in overdose (toxic metabolite NAPQI; treat with acetylcysteine)'],
  ['NSAIDs (ibuprofen, naproxen, diclofenac)','Inhibit COX-1 and COX-2: fewer prostaglandins, less peripheral sensitisation','Inflammatory and musculoskeletal pain, renal colic','Peptic ulcers, kidney injury, asthma, raised cardiovascular risk'],
  ['Weak opioids (codeine, tramadol)','μ-opioid receptor agonists; codeine is a prodrug converted to morphine by CYP2D6','Moderate pain','Constipation, nausea; codeine does not work in poor metabolisers and is dangerous in ultra-rapid ones'],
  ['Strong opioids (morphine, oxycodone, fentanyl)','μ receptors (G<sub>i</sub>): fewer transmitter vesicles released presynaptically, hyperpolarisation postsynaptically','Severe acute pain, cancer pain','<b>Respiratory depression</b>, sedation, constipation, nausea, pinpoint pupils, tolerance and dependence. Antidote: <b>naloxone</b>'],
  ['Local anaesthetics','Block voltage-gated Na⁺ channels','Procedures, nerve blocks, epidurals','Toxicity: seizures, arrhythmia'],
  ['Amitriptyline, duloxetine','Boost descending noradrenaline and serotonin inhibition','<b>Neuropathic</b> pain','Antimuscarinic effects, sedation'],
  ['Gabapentin, pregabalin','Bind the α₂δ subunit of presynaptic Ca²⁺ channels: less transmitter release','Neuropathic pain','Dizziness, sedation, misuse potential']]],
 ['notes',
  ['clin','Nociceptive vs neuropathic pain','<b>Nociceptive:</b> normal nerves reporting tissue damage (fracture, appendicitis): aching or sharp, responds to the WHO ladder (paracetamol → weak opioid → strong opioid, with NSAIDs and adjuvants). <b>Neuropathic:</b> the nerves themselves are damaged (diabetic neuropathy, shingles, sciatica): burning, shooting, electric, with allodynia; responds poorly to opioids, better to amitriptyline, duloxetine, gabapentin or pregabalin.'],
  ['fix','Nervous System deck · fentanyl','Fentanyl is about <b>50–100 times</b> more potent than morphine (the slide says 10). It is highly lipid-soluble, so it acts fast and can be given as a skin patch.']]
]},
/* ------------------------------------------------------------------ */
{id:'neuro-senses',eb:'Special senses',h:'Hearing and balance',p:'Both use hair cells bathed in potassium-rich endolymph. Bend the hairs one way and potassium flows in; the cell depolarises and the vestibulocochlear nerve (CN VIII) fires.',b:[
 ['pw','hearing','balance'],
 ['cards',[
  ['Coding sound',['<b>Pitch</b> is coded by <b>place</b> on the basilar membrane (tonotopy): high frequencies at the stiff, narrow <b>base</b> near the oval window; low frequencies at the floppy <b>apex</b> (helicotrema). Age-related loss starts at the base, so high tones go first.','<b>Loudness</b> is coded by the amplitude of vibration and the firing rate.','<b>Fluids:</b> scala vestibuli and scala tympani hold <b>perilymph</b> (like extracellular fluid, high Na⁺); the scala media holds <b>endolymph</b> (high K⁺), made by the stria vascularis.','<b>Protection:</b> the acoustic reflex. Stapedius (CN VII) and tensor tympani (CN V₃) stiffen the ossicles in loud noise. A facial nerve palsy can cause hyperacusis.']],
  ['The vestibular system',['<b>Semicircular canals</b> (three, at right angles): detect <b>rotation</b> (angular acceleration). Endolymph lags behind and bends the cupula in the ampulla.','<b>Utricle and saccule</b> (otolith organs): detect <b>linear acceleration and gravity</b>. Calcium carbonate crystals (otoliths) drag on the hair cells.','Balance combines vestibular input with <b>vision</b> and <b>proprioception</b>; lose one and you cope, lose two and you fall (the basis of Romberg\'s test).','The <b>vestibulo-ocular reflex</b> keeps the eyes fixed on a target while the head moves.']]]],
 ['table',['','Rinne\'s test (fork by the ear, then on the mastoid)','Weber\'s test (fork on the forehead)'],[
  ['Normal hearing','Air conduction louder than bone (Rinne positive)','Heard equally in both ears'],
  ['Conductive loss','<b>Bone louder than air</b> in the affected ear (Rinne negative)','Louder in the <b>affected</b> ear'],
  ['Sensorineural loss','Air louder than bone, but both reduced (Rinne positive)','Louder in the <b>good</b> ear']]],
 ['notes',
  ['clin','Conductive vs sensorineural hearing loss','<b>Conductive</b> (sound cannot reach the cochlea): wax, otitis externa, glue ear (otitis media with effusion, common in children), perforated eardrum, otosclerosis. <b>Sensorineural</b> (cochlea or nerve): age (presbycusis), noise, gentamicin and other ototoxic drugs, Ménière\'s disease, acoustic neuroma (a one-sided loss needs an MRI), meningitis.'],
  ['clin','Vertigo','An illusion of movement, usually spinning. <b>BPPV:</b> loose otoliths in a semicircular canal; seconds of vertigo on turning the head; diagnosed with the Dix–Hallpike test, treated with the Epley manoeuvre. <b>Vestibular neuronitis:</b> days of vertigo after a viral illness, hearing normal. <b>Ménière\'s:</b> vertigo with tinnitus, hearing loss and ear fullness, lasting hours.']],
 ['fix','Nervous System deck · balance','The slide places balance in the "scala media". The scala media is part of the cochlea (hearing); rotation is sensed by endolymph in the <b>semicircular canals</b>, and gravity by the utricle and saccule.']
]},
/* ------------------------------------------------------------------ */
{id:'neuro-icp',eb:'Pressure and flow',h:'CSF, intracranial pressure and cerebral blood flow',p:'The skull is a closed box containing brain, blood and CSF. Add volume to one and another must leave, or the pressure rises and blood can no longer get in.',b:[
 ['think','A full suitcase. You can squeeze in one more jumper by pushing some air out (CSF and venous blood leave the skull). After that, every extra sock makes it much harder to close, and eventually something bursts out of the opening at the bottom (the foramen magnum).'],
 ['fig','dg-icp','The pressure–volume curve (Monro–Kellie doctrine)','Brain about 80%, blood about 10%, CSF about 10% of the contents of the skull.',600,
  `<svg viewBox="0 0 760 290" role="img" aria-label="Intracranial pressure-volume curve">
   <path class="ax" d="M80,24 V246 H720"/>
   <text x="26" y="140" class="sm" text-anchor="middle" transform="rotate(-90 26 140)">intracranial pressure (mmHg)</text><text x="400" y="278" class="sm" text-anchor="middle">added volume (tumour, blood, swelling, CSF)</text>
   <g class="sm" text-anchor="end"><text x="72" y="232">10</text><text x="72" y="176">20</text><text x="72" y="64">60</text></g>
   <path class="grid" d="M80,172 H720"/><text x="716" y="166" class="sm lab" text-anchor="end">above about 20–25 mmHg: treat</text>
   <path class="c1" d="M80,230 C300,226 430,214 510,150 C570,104 610,66 650,30"/>
   <text x="100" y="206" class="sm lab b">Compensation</text><text x="100" y="188" class="sm">CSF moves to the spinal canal;</text><text x="100" y="172" class="sm">venous blood is squeezed out</text>
   <text x="486" y="92" class="sm lab b" text-anchor="end">Decompensation</text><text x="486" y="108" class="sm" text-anchor="end">a small extra volume now causes</text><text x="486" y="124" class="sm" text-anchor="end">a large rise in pressure</text>
   <text x="664" y="46" class="sm lab b">Herniation</text><text x="664" y="62" class="sm">(coning)</text>
  </svg>`],
 ['pw','csf','coning'],
 ['cards',[
  ['Numbers worth knowing',['<b>CSF:</b> about 150 mL in total; about 500 mL made each day by the <b>choroid plexus</b>; reabsorbed through arachnoid granulations into the venous sinuses.','<b>Normal ICP:</b> about 7–15 mmHg lying down in adults.','<b>Cerebral perfusion pressure: CPP = MAP − ICP.</b> Aim to keep it above about 60 mmHg.','<b>Cerebral blood flow:</b> about 50 mL per 100 g per minute, 750 mL/min, <b>15% of cardiac output</b> for 2% of body weight.']],
  ['How the brain controls its own blood flow',['<b>Autoregulation:</b> arterioles constrict or dilate (myogenic response) to keep flow constant across a mean arterial pressure of about 60–160 mmHg.','<b>Carbon dioxide</b> is the strongest chemical control: <b>high CO₂ dilates</b> cerebral vessels (more blood volume, higher ICP); <b>low CO₂ constricts</b> them.','<b>Oxygen:</b> only severe hypoxia (PaO₂ below about 8 kPa) causes vasodilation.','<b>Metabolic coupling:</b> active brain regions release metabolites that increase their own flow (the basis of functional MRI).','The <b>blood–brain barrier</b>: tight junctions between endothelial cells, wrapped by astrocyte end-feet. Lipid-soluble drugs cross; most others do not.']]]],
 ['table',['Raised intracranial pressure','Details'],[
  ['Causes','Tumour, haemorrhage (extradural, subdural, subarachnoid, intracerebral), cerebral oedema (trauma, stroke, hyponatraemia), abscess, hydrocephalus, venous sinus thrombosis, idiopathic intracranial hypertension'],
  ['Symptoms','Headache worse in the <b>morning</b>, on lying down, coughing or straining; vomiting; visual blurring; drowsiness'],
  ['Signs','<b>Papilloedema</b>; falling GCS; a <b>fixed dilated pupil</b> (CN III compressed by the uncus); sixth nerve palsy'],
  ['Cushing\'s reflex (late, pre-terminal)','<b>Hypertension, bradycardia and irregular breathing</b>. The brainstem becomes ischaemic and drives blood pressure up to restore perfusion; baroreceptors then slow the heart'],
  ['Herniation','Subfalcine; <b>uncal</b> (transtentorial); <b>tonsillar</b> ("coning": cerebellar tonsils through the foramen magnum compress the medulla, stopping breathing)'],
  ['Management','Nurse head-up at 30°; avoid hypoxia, hypotension and high CO₂; osmotic therapy (<b>mannitol or hypertonic saline</b>); short-term hyperventilation; treat the cause (dexamethasone for tumour oedema, surgery, a shunt or drain). <b>Do not do a lumbar puncture</b> if raised ICP from a mass is suspected: it can cause coning']]],
 ['notes',
  ['clin','Hydrocephalus','Too much CSF in the ventricles. <b>Obstructive (non-communicating):</b> a block inside the ventricular system, e.g. aqueduct stenosis or a tumour near the fourth ventricle. <b>Communicating:</b> failure of reabsorption at the arachnoid granulations, e.g. after meningitis or subarachnoid haemorrhage. In babies the skull sutures are open, so the head enlarges with a bulging fontanelle and "sunsetting" eyes. Treated with a ventriculoperitoneal shunt. <b>Normal pressure hydrocephalus</b> in older people: "wet, wobbly and wacky" (incontinence, gait apraxia, dementia).'],
  ['fix','Nervous System deck · cerebral blood flow','One line reads "Increased CO₂ = vasoconstriction". It is <b>decreased</b> CO₂ that constricts cerebral vessels; increased CO₂ dilates them. The slide\'s normal ICP of 5–10 mmHg is at the low end: 7–15 mmHg is the usual adult range.']]
]}
],
/* ====================== pathways ====================== */
pw:{
neurulation:{t:'Building the nervous system (neurulation)',k:'neuro',sec:'neuro-cells',mn:'Plate → groove → tube → vesicles',an:'A flat sheet of pastry rolled up into a tube; if either end fails to seal, the filling is exposed.',steps:[
 ['Week 3: the notochord induces the ectoderm above it','The ectoderm thickens into the neural plate.'],
 ['The plate folds into a neural groove with raised neural folds',''],
 ['The folds meet and fuse to form the neural tube','Fusion starts in the middle and zips towards both ends.'],
 ['Neural crest cells pinch off from the edges of the folds','They migrate to form the dorsal root and autonomic ganglia, Schwann cells, the adrenal medulla, melanocytes and parts of the face and heart.'],
 ['The cranial opening (neuropore) closes at about day 25, the caudal one at about day 27','Failure to close cranially causes anencephaly; caudally, spina bifida.'],
 ['The cranial end swells into three primary brain vesicles','Forebrain (prosencephalon), midbrain (mesencephalon), hindbrain (rhombencephalon); these become five secondary vesicles.'],
 ['The rest of the tube becomes the spinal cord; its cavity becomes the ventricles and central canal','']],
 foot:'Folic acid (400 micrograms daily before conception and for the first 12 weeks; 5 mg if high risk) reduces neural tube defects. Raised maternal AFP and the 20-week scan detect them.'},
rmp:{t:'Setting up the resting membrane potential',k:'neuro',sec:'neuro-ap',mn:'Pump builds the gradients; potassium leak sets the voltage',an:'The pump charges the battery; the potassium leak decides the voltage on the label.',steps:[
 ['The Na⁺/K⁺ ATPase pumps 3 Na⁺ out and 2 K⁺ in','Uses ATP; creates high K⁺ inside and high Na⁺ outside.'],
 ['K⁺ leak channels are open at rest','The membrane is far more permeable to K⁺ than to Na⁺.'],
 ['K⁺ diffuses out down its concentration gradient','It leaves behind negatively charged proteins and phosphates.'],
 ['The inside becomes negative','This electrical gradient starts to pull K⁺ back in.'],
 ['Chemical and electrical forces on K⁺ balance','If only K⁺ moved, the cell would sit at the K⁺ equilibrium potential, about −90 mV.'],
 ['A small inward Na⁺ leak makes it slightly less negative','The resting potential settles at about −70 mV.']],
 foot:'Clinical: plasma potassium matters because it sets the resting potential of nerve, muscle and heart cells.'},
actpot:{t:'The action potential',k:'neuro',sec:'neuro-ap',mn:'Threshold, sodium in, sodium inactivates, potassium out, overshoot, reset',steps:[
 ['A stimulus depolarises the membrane to threshold (about −55 mV)',''],
 ['Voltage-gated Na⁺ channels open','Na⁺ enters and depolarises the membrane further, opening more channels: positive feedback.'],
 ['The membrane potential rises to about +30 mV','The rising phase takes less than a millisecond.'],
 ['Na⁺ channels inactivate','The inactivation gate blocks the pore; the absolute refractory period begins.'],
 ['Voltage-gated K⁺ channels open','K⁺ leaves the cell: repolarisation.'],
 ['K⁺ channels close slowly: hyperpolarisation','The membrane briefly dips below resting potential (relative refractory period).'],
 ['Resting potential is restored and Na⁺ channels reset','The pump and leak channels restore the small ion shifts.'],
 ['Local currents depolarise the next patch of membrane','The refractory patch behind ensures one-way travel; in myelinated axons the impulse jumps between nodes.']],
 foot:'Drugs: local anaesthetics and some anti-epileptics (phenytoin, carbamazepine, lamotrigine) block voltage-gated Na⁺ channels. Tetrodotoxin (puffer fish) does the same from outside.'},
synapse:{t:'Transmission at a chemical synapse',k:'neuro',sec:'neuro-synapse',mn:'Arrive, calcium in, release, bind, respond, clear',an:'A relay race where the baton is thrown across a gap: fast, but the place where it is easiest to interfere.',steps:[
 ['An action potential reaches the axon terminal',''],
 ['Voltage-gated Ca²⁺ channels open and Ca²⁺ enters','Blocked by gabapentinoids, and by antibodies in Lambert–Eaton syndrome.'],
 ['Ca²⁺ triggers vesicles to fuse with the presynaptic membrane','SNARE proteins do the docking; botulinum and tetanus toxins cut them.'],
 ['Neurotransmitter is released into the synaptic cleft by exocytosis',''],
 ['It diffuses across and binds receptors on the postsynaptic membrane','Ionotropic (fast) or metabotropic (slow).'],
 ['Ion channels open: an EPSP or IPSP','EPSPs and IPSPs are summed at the axon hillock.'],
 ['The signal is ended','Enzymatic breakdown, reuptake into the terminal, or uptake by glia.']],
 foot:'One-way transmission, a delay of about 0.5 ms, and fatigue with repeated use are all properties of chemical synapses. Electrical synapses (gap junctions) are faster and two-way.'},
dcml:{t:'Fine touch pathway (DCML)',k:'neuro',sec:'neuro-tracts',mn:'Same side up the cord, cross in the medulla',steps:[
 ['A mechanoreceptor or proprioceptor is stimulated','Fine touch, vibration, joint position.'],
 ['First-order neuron (cell body in the dorsal root ganglion) enters by the dorsal root','Large, fast Aβ fibres.'],
 ['It ascends in the dorsal column on the same side','Gracile fasciculus (legs, medial); cuneate fasciculus (arms, lateral).'],
 ['It synapses in the gracile or cuneate nucleus of the medulla',''],
 ['Second-order neuron crosses the midline in the medulla','Then ascends as the medial lemniscus.'],
 ['It synapses in the thalamus (VPL nucleus)',''],
 ['Third-order neuron passes through the internal capsule to the primary somatosensory cortex','Postcentral gyrus, parietal lobe.']],
 foot:'Tested with a 128 Hz tuning fork, joint position sense and Romberg\'s test.'},
stt:{t:'Pain and temperature pathway (spinothalamic)',k:'neuro',sec:'neuro-tracts',mn:'Synapse, cross straight away, then climb',steps:[
 ['A nociceptor or thermoreceptor (free nerve ending) is stimulated',''],
 ['First-order neuron (Aδ or C fibre, cell body in the dorsal root ganglion) enters the dorsal horn','It may travel up or down one or two segments in Lissauer\'s tract first.'],
 ['It synapses in the dorsal horn','Substance P and glutamate are the transmitters; this is the "gate".'],
 ['Second-order neuron crosses through the anterior white commissure','Within one or two segments of entry.'],
 ['It ascends in the anterolateral cord on the opposite side','Pain and temperature laterally; crude touch anteriorly.'],
 ['It synapses in the thalamus (VPL nucleus)',''],
 ['Third-order neuron projects to the somatosensory cortex','Branches to the limbic system give pain its unpleasant emotional quality.']],
 foot:'Tested with a neurological pin and with cold. Syringomyelia damages the crossing fibres on both sides.'},
cst:{t:'Voluntary movement pathway (corticospinal)',k:'neuro',sec:'neuro-tracts',mn:'Cortex, capsule, brainstem, cross at the pyramids, ventral horn, muscle',steps:[
 ['Upper motor neurons arise in the primary motor cortex','Precentral gyrus of the frontal lobe, with input from premotor and supplementary motor areas.'],
 ['Their axons converge through the internal capsule','A small stroke here causes a dense weakness of the opposite face, arm and leg.'],
 ['They descend through the cerebral peduncles, pons and medulla',''],
 ['About 85–90% cross at the pyramidal decussation of the medulla',''],
 ['They descend in the lateral corticospinal tract','The uncrossed fibres form the anterior corticospinal tract.'],
 ['They synapse on lower motor neurons in the ventral horn','Directly or through interneurons.'],
 ['The lower motor neuron leaves by the ventral root and travels in a peripheral nerve',''],
 ['It releases acetylcholine at the neuromuscular junction and the muscle contracts','']],
 foot:'Smooth movement also needs the cerebellum (coordination, on the same side) and basal ganglia (starting and scaling movement).'},
stretch:{t:'The stretch (knee jerk) reflex',k:'neuro',sec:'neuro-tracts',mn:'Spindle, Ia afferent, one synapse, alpha motor neuron',an:'A thermostat for muscle length: stretch the muscle and it automatically contracts to restore its length.',steps:[
 ['The tendon hammer stretches the quadriceps',''],
 ['Muscle spindles inside the muscle are stretched',''],
 ['Ia afferent fibres fire and enter the cord through the dorsal root','Knee jerk: L3–L4.'],
 ['They synapse directly on alpha motor neurons of the same muscle','A monosynaptic reflex: the only one in the body.'],
 ['The alpha motor neurons fire and the quadriceps contracts','The leg kicks.'],
 ['At the same time an inhibitory interneuron switches off the hamstrings','Reciprocal inhibition.']],
 foot:'Reflex roots: ankle S1–S2, knee L3–L4, biceps C5–C6, triceps C7–C8 ("1, 2, 3, 4, 5, 6, 7, 8").'},
painpath:{t:'From injury to feeling pain',k:'neuro',sec:'neuro-pain',mn:'Transduction, transmission, modulation, perception',steps:[
 ['Transduction: tissue damage activates nociceptors','Heat, pressure and chemicals (bradykinin, H⁺, ATP); prostaglandins sensitise them.'],
 ['Transmission: Aδ fibres carry fast sharp pain, C fibres slow dull pain','Cell bodies in the dorsal root ganglion.'],
 ['First synapse in the dorsal horn','Glutamate and substance P are released.'],
 ['Modulation in the dorsal horn','Touch fibres (Aβ) and descending pathways from the brainstem inhibit transmission through enkephalin interneurons.'],
 ['The second neuron crosses and ascends in the spinothalamic tract',''],
 ['Relay in the thalamus',''],
 ['Perception in the cortex','Somatosensory cortex localises it; limbic system and insula make it unpleasant.']],
 foot:'Where analgesics act: NSAIDs at the nociceptor; local anaesthetics on the nerve; opioids and gabapentinoids in the dorsal horn; opioids, tricyclics and paracetamol centrally.'},
hearing:{t:'How sound becomes a nerve signal',k:'neuro',sec:'neuro-senses',mn:'Air, drum, ossicles, fluid, basilar membrane, hair cells, CN VIII',steps:[
 ['Sound waves travel down the external auditory canal',''],
 ['The tympanic membrane vibrates',''],
 ['The ossicles (malleus, incus, stapes) amplify the vibration','They match air to fluid: about a 20-fold pressure gain.'],
 ['The stapes footplate pushes on the oval window','A pressure wave travels through the perilymph of the scala vestibuli; the round window bulges to allow it.'],
 ['The basilar membrane vibrates at a place that depends on frequency','High frequencies at the base, low at the apex.'],
 ['Hair cells of the organ of Corti are bent against the tectorial membrane','Tip links pull open mechanically gated channels.'],
 ['K⁺ flows in from the endolymph and the hair cell depolarises','Ca²⁺ enters and glutamate is released.'],
 ['The cochlear nerve (CN VIII) fires','Cell bodies in the spiral ganglion; first synapse in the cochlear nuclei of the brainstem.'],
 ['Signals reach the auditory cortex in the temporal lobe','Via the inferior colliculus and medial geniculate body, with input from both ears on each side.']],
 foot:'Because each cortex hears both ears, a one-sided cortical lesion does not cause deafness in one ear.'},
balance:{t:'How head rotation is detected',k:'neuro',sec:'neuro-senses',mn:'Head turns, endolymph lags, cupula bends, hair cells fire',steps:[
 ['The head rotates','The semicircular canal in that plane rotates with it.'],
 ['Endolymph inside the canal lags behind because of inertia',''],
 ['The lagging fluid pushes on the cupula in the ampulla',''],
 ['The stereocilia of the hair cells bend','Towards the kinocilium: tip links stretch.'],
 ['Mechanically gated channels open and K⁺ enters from the endolymph','The hair cell depolarises.'],
 ['The vestibular nerve (CN VIII) increases its firing','The opposite ear decreases its firing; the brain reads the difference.'],
 ['The vestibular nuclei drive eye and postural reflexes','The vestibulo-ocular reflex moves the eyes opposite to the head.']],
 foot:'Otoliths in the utricle and saccule use the same hair cells to detect gravity and linear acceleration.'},
csf:{t:'The path of cerebrospinal fluid',k:'neuro',sec:'neuro-icp',mn:'Lateral, Monro, third, aqueduct, fourth, Luschka and Magendie, subarachnoid, granulations',an:'A slow river that rises in the lateral ventricles, flows through narrow gorges, and drains into the venous sinuses.',steps:[
 ['The choroid plexus makes CSF','In the lateral, third and fourth ventricles; about 500 mL a day.'],
 ['Lateral ventricles',''],
 ['Interventricular foramina (of Monro)',''],
 ['Third ventricle',''],
 ['Cerebral aqueduct (of Sylvius)','The narrowest point: a common site of obstruction.'],
 ['Fourth ventricle',''],
 ['Median aperture (Magendie) and two lateral apertures (Luschka)',''],
 ['Subarachnoid space around the brain and spinal cord','Where a lumbar puncture samples it.'],
 ['Arachnoid granulations','One-way valves into the superior sagittal sinus.'],
 ['Venous blood','']],
 foot:'CSF cushions the brain, removes waste and keeps a stable chemical environment. Normal CSF is clear, with fewer than 5 white cells per microlitre, protein 0.15–0.45 g/L and glucose about two-thirds of blood glucose.'},
coning:{t:'What happens as intracranial pressure rises',k:'neuro',sec:'neuro-icp',mn:'Compensate, decompensate, lose perfusion, Cushing, cone',steps:[
 ['A mass, blood or swelling adds volume inside the skull',''],
 ['Compensation: CSF shifts to the spinal canal and venous blood is squeezed out','ICP stays normal at first.'],
 ['Compensation is exhausted and ICP climbs steeply',''],
 ['Cerebral perfusion pressure falls (CPP = MAP − ICP)','The brain becomes ischaemic, which causes more swelling.'],
 ['Cushing\'s reflex','Brainstem ischaemia triggers a surge in blood pressure; baroreceptors slow the heart; breathing becomes irregular.'],
 ['Brain tissue herniates','The uncus compresses CN III: a fixed dilated pupil on that side.'],
 ['The cerebellar tonsils are forced through the foramen magnum (coning)','The medulla is compressed: breathing stops.']],
 foot:'Hypertension with bradycardia in a head-injured patient is a late, pre-terminal sign.'}
},
/* ====================== flashcards ====================== */
flips:[
 ['Resting membrane potential, and the ion mainly responsible','About −70 mV; K⁺ leaking out through leak channels.'],
 ['Na⁺/K⁺ ATPase stoichiometry','3 Na⁺ out, 2 K⁺ in, per ATP.'],
 ['Cause of the absolute refractory period','Voltage-gated Na⁺ channels are inactivated.'],
 ['Myelinating cells of CNS and PNS','Oligodendrocytes (many axons each); Schwann cells (one segment of one axon).'],
 ['Anterograde and retrograde motor proteins','Kinesin (towards the terminal); dynein (back to the cell body).'],
 ['Main excitatory and inhibitory transmitters','Glutamate; GABA in the brain, glycine in the cord.'],
 ['Where does the DCML cross?','In the medulla.'],
 ['Where does the spinothalamic tract cross?','In the spinal cord, within 1–2 segments, through the anterior white commissure.'],
 ['Where does the corticospinal tract cross?','At the pyramids of the medulla (85–90%).'],
 ['Brown-Séquard syndrome','Same side: weakness and loss of vibration and proprioception. Opposite side: loss of pain and temperature.'],
 ['UMN lesion signs','Spasticity, brisk reflexes, clonus, upgoing plantar; no early wasting or fasciculation.'],
 ['Sympathetic and parasympathetic outflow','Sympathetic T1–L2; parasympathetic CN III, VII, IX, X and S2–S4.'],
 ['Horner\'s triad','Ptosis, miosis, anhidrosis (think Pancoast tumour).'],
 ['First pain vs second pain fibres','Aδ (fast, sharp); C (slow, dull, burning).'],
 ['Opioid receptor for analgesia and the antidote','μ receptor; naloxone.'],
 ['Rinne negative means...','Bone conduction better than air: conductive loss in that ear.'],
 ['Weber lateralises to which ear?','The affected ear in conductive loss; the good ear in sensorineural loss.'],
 ['Cerebral perfusion pressure','CPP = MAP − ICP.'],
 ['Cushing\'s triad','Hypertension, bradycardia, irregular breathing: raised ICP about to cone.'],
 ['Where is CSF made and reabsorbed?','Choroid plexus; arachnoid granulations into the venous sinuses.'],
 ['Guillain–Barré CSF','High protein with a normal white cell count.'],
 ['Level for a lumbar puncture, and why','L3/4 or L4/5: the cord ends at L1–L2.']
],
/* ====================== questions ====================== */
qs:[
{sec:'neuro-ap',type:'sba',q:'A 30-year-old has a dental extraction under lidocaine. Which best describes how lidocaine prevents pain?',
 o:['It blocks voltage-gated Na⁺ channels from inside the axon, so action potentials cannot start','It opens K⁺ channels and hyperpolarises the nerve','It blocks acetylcholine release at the nerve ending','It inhibits cyclo-oxygenase in the gum','It activates μ-opioid receptors on the nerve'],a:0,
 e:'Local anaesthetics cross the membrane uncharged, become charged inside, and block voltage-gated Na⁺ channels, so the depolarising phase cannot occur. Small pain fibres are blocked first. Inflamed (acidic) tissue traps the drug in its charged form outside the nerve, so it works less well.'},
{sec:'neuro-ap',type:'sba',q:'During the absolute refractory period a second action potential cannot be generated however strong the stimulus. Why?',
 o:['Voltage-gated Na⁺ channels are inactivated','The Na⁺/K⁺ pump has not yet restored the gradients','K⁺ leak channels are closed','The membrane is hyperpolarised','Calcium has not yet been pumped out of the terminal'],a:0,
 e:'After opening, Na⁺ channels enter an inactivated state and cannot reopen until the membrane has repolarised. Hyperpolarisation explains the relative refractory period, when a stronger stimulus can still fire the cell. The pump plays no part in a single action potential: very few ions move.'},
{sec:'neuro-ap',type:'sba',q:'A patient with kidney failure has a plasma potassium of 7.1 mmol/L and muscle weakness. What is the effect of the raised extracellular potassium on resting membrane potential?',
 o:['It becomes less negative (depolarised), and Na⁺ channels then inactivate','It becomes more negative (hyperpolarised)','It is unchanged because the pump compensates','It reverses to become positive','It becomes equal to the sodium equilibrium potential'],a:0,
 e:'The resting potential depends on the K⁺ gradient. With more K⁺ outside, less leaks out, so the cell depolarises. Sustained depolarisation inactivates Na⁺ channels, so nerve and muscle become less excitable (weakness) and the heart is at risk of arrhythmia. Low potassium hyperpolarises cells instead.'},
{sec:'neuro-cells',type:'sba',q:'A 26-year-old develops tingling in her feet and then weakness climbing up both legs over five days, two weeks after a diarrhoeal illness. Reflexes are absent. Which investigation result is most typical?',
 o:['CSF with raised protein and a normal white cell count','CSF with many neutrophils and low glucose','MRI brain showing periventricular white matter plaques','Antibodies to the acetylcholine receptor','A very high creatine kinase'],a:0,
 e:'Guillain–Barré syndrome: immune attack on peripheral nerve myelin after infection (classically Campylobacter jejuni). Ascending weakness with areflexia is a lower motor neuron pattern. CSF shows albuminocytological dissociation (high protein, normal cells). Monitor forced vital capacity; treat with IV immunoglobulin or plasma exchange.'},
{sec:'neuro-cells',type:'saq',q:'Which glial cell myelinates axons in the central nervous system and is the target in multiple sclerosis?',acc:['oligodendro'],m:'Oligodendrocyte',
 e:'One oligodendrocyte myelinates segments of many CNS axons. Schwann cells do the job in the peripheral nervous system, one segment per cell, and are the target in Guillain–Barré syndrome.'},
{sec:'neuro-synapse',type:'sba',q:'A patient taking an antipsychotic develops a tremor, stiffness, slow movements and milky nipple discharge. Blockade of which receptor explains all of these?',
 o:['Dopamine D2 receptors','Muscarinic M3 receptors','GABA-A receptors','Serotonin 5-HT3 receptors','Nicotinic receptors'],a:0,
 e:'Dopamine from the substantia nigra is needed for normal movement, so D2 blockade causes drug-induced parkinsonism. Dopamine from the hypothalamus also inhibits prolactin release, so blocking it raises prolactin (galactorrhoea, amenorrhoea).'},
{sec:'neuro-synapse',type:'saq',q:'What is the main inhibitory neurotransmitter in the brain, whose action is enhanced by benzodiazepines?',acc:['gaba|aminobutyric'],m:'GABA (gamma-aminobutyric acid)',
 e:'GABA opens chloride channels (GABA-A), hyperpolarising the neuron. Benzodiazepines increase how often the channel opens. Glycine is the main inhibitory transmitter in the spinal cord.'},
{sec:'neuro-tracts',type:'sba',q:'A 24-year-old is stabbed in the back, cutting the right half of the spinal cord at T10. Which pattern will be found below the lesion?',
 o:['Right leg weakness and loss of vibration sense; loss of pain and temperature in the left leg','Left leg weakness and loss of vibration sense; loss of pain and temperature in the right leg','Weakness and loss of all sensation in the right leg only','Weakness of both legs with preserved vibration sense','Loss of pain and temperature in both legs with normal power'],a:0,
 e:'Brown-Séquard syndrome. The corticospinal tract (already crossed in the medulla) and dorsal columns (not yet crossed) serve the same side, so weakness and loss of vibration and proprioception are on the right. Spinothalamic fibres cross within a segment or two of entering the cord, so pain and temperature are lost on the left.'},
{sec:'neuro-tracts',type:'sba',q:'A 35-year-old has burnt her hands several times without noticing. She cannot feel pain or temperature across both shoulders and arms, but light touch and joint position sense are normal. What is the most likely diagnosis?',
 o:['Syringomyelia','Vitamin B12 deficiency','Anterior spinal artery occlusion','Brown-Séquard syndrome','Guillain–Barré syndrome'],a:0,
 e:'A central cavity (syrinx) in the cervical cord destroys spinothalamic fibres from both sides as they cross in the anterior commissure: a cape-like loss of pain and temperature with preserved dorsal column function (dissociated sensory loss). B12 deficiency affects the dorsal columns instead.'},
{sec:'neuro-tracts',type:'sba',q:'Three months after a stroke, a man\'s right arm is stiff, with brisk reflexes and an upgoing plantar response. There is no wasting. Where is the lesion?',
 o:['Upper motor neurons of the left corticospinal tract','Lower motor neurons in the right ventral horn','The right brachial plexus','The neuromuscular junction','The right cerebellar hemisphere'],a:0,
 e:'Spasticity, hyperreflexia and an extensor plantar are upper motor neuron signs. The corticospinal tract crosses in the medulla, so a left hemisphere stroke affects the right side. Lower motor neuron lesions cause flaccid weakness, wasting, fasciculation and lost reflexes.'},
{sec:'neuro-tracts',type:'saq',q:'At what vertebral level does the adult spinal cord usually end?',acc:['l1|l2'],m:'L1–L2',
 e:'The conus medullaris lies at about L1–L2, so lumbar puncture is performed at L3/4 or L4/5, where only the mobile roots of the cauda equina lie in the CSF.'},
{sec:'neuro-ans',type:'sba',q:'A 61-year-old smoker has a drooping right eyelid, a small right pupil and no sweating on the right side of his face. He also has pain down the inner right arm. Where is the lesion most likely to be?',
 o:['A tumour at the apex of the right lung','The right oculomotor nerve','The right facial nerve','The left motor cortex','The right optic nerve'],a:0,
 e:'Ptosis, miosis and anhidrosis are Horner\'s syndrome: loss of sympathetic supply. The fibres leave the cord at T1 and pass over the lung apex, where a Pancoast tumour can invade them and the lower brachial plexus (arm pain, hand weakness). A third nerve palsy gives ptosis with a large pupil.'},
{sec:'neuro-ans',type:'sba',q:'An older man starts amitriptyline and develops a dry mouth, blurred vision, constipation and difficulty passing urine. Which receptors are being blocked?',
 o:['Muscarinic acetylcholine receptors','Nicotinic acetylcholine receptors','α₁-adrenoceptors','β₂-adrenoceptors','Dopamine D2 receptors'],a:0,
 e:'These are antimuscarinic (anticholinergic) effects: parasympathetic actions on salivary glands, ciliary muscle, gut and bladder detrusor (all M₃) are lost. Tricyclics, oxybutynin, hyoscine and older antihistamines all do this, and can cause confusion and urinary retention in older people.'},
{sec:'neuro-ans',type:'saq',q:'Which neurotransmitter is released by all preganglionic autonomic neurons, sympathetic and parasympathetic?',acc:['acetylcholine|ach'],m:'Acetylcholine (acting on nicotinic receptors)',
 e:'Every preganglionic neuron releases ACh onto nicotinic receptors in the ganglion (or the adrenal medulla). Postganglionic sympathetic neurons mostly release noradrenaline; postganglionic parasympathetic neurons release ACh onto muscarinic receptors.'},
{sec:'neuro-pain',type:'sba',q:'A man found drowsy has a respiratory rate of 6 per minute and pinpoint pupils. What should be given?',
 o:['Naloxone','Flumazenil','Atropine','Acetylcysteine','Adrenaline'],a:0,
 e:'Respiratory depression with pinpoint pupils is opioid toxicity. Naloxone is a competitive μ-receptor antagonist. Its half-life is shorter than that of most opioids, so repeat doses or an infusion may be needed. Flumazenil reverses benzodiazepines; acetylcysteine treats paracetamol overdose.'},
{sec:'neuro-pain',type:'sba',q:'A woman with diabetes has burning, shooting pain in both feet that is worse at night; even the bedsheets hurt. Which drug is most appropriate first-line?',
 o:['Duloxetine','Ibuprofen','Paracetamol','Codeine','Morphine'],a:0,
 e:'This is neuropathic pain (burning, shooting, with allodynia). NICE recommends amitriptyline, duloxetine, gabapentin or pregabalin first-line. They enhance descending inhibition or reduce transmitter release in the dorsal horn. Simple analgesics and opioids work poorly.'},
{sec:'neuro-senses',type:'sba',q:'A 40-year-old has reduced hearing in the left ear. With the tuning fork on the forehead, the sound is louder in the left ear. On the left, bone conduction is louder than air conduction. What type of hearing loss is this?',
 o:['Left conductive hearing loss','Left sensorineural hearing loss','Right conductive hearing loss','Right sensorineural hearing loss','Normal hearing'],a:0,
 e:'Weber lateralises to the affected ear in conductive loss (the blocked ear masks less background noise) and Rinne is negative on that side (bone better than air). In sensorineural loss Weber lateralises to the good ear and Rinne stays positive. Causes of conductive loss include wax, effusion and perforation.'},
{sec:'neuro-senses',type:'saq',q:'Which ion enters cochlear hair cells from the endolymph to depolarise them when their stereocilia are bent?',acc:['potassium|k+|k ion'],no:['calcium only'],m:'Potassium (K⁺)',
 e:'Endolymph is unusual: it is rich in K⁺ and strongly positive, so opening the mechanically gated channels lets K⁺ flow in. Calcium then enters through voltage-gated channels and triggers glutamate release.'},
{sec:'neuro-icp',type:'sba',q:'A 22-year-old with a head injury has a blood pressure of 190/100, a heart rate of 44 and irregular breathing. What does this indicate?',
 o:['Critically raised intracranial pressure with impending brainstem herniation','Hypovolaemic shock','Spinal (neurogenic) shock','Alcohol withdrawal','A normal response to pain'],a:0,
 e:'Cushing\'s triad: hypertension, bradycardia and irregular respiration. As ICP approaches arterial pressure, the ischaemic brainstem drives blood pressure up to maintain perfusion; baroreceptors respond with bradycardia. It is a late sign needing immediate treatment (head up, osmotherapy, neurosurgery).'},
{sec:'neuro-icp',type:'sba',q:'A patient has a mean arterial pressure of 80 mmHg and an intracranial pressure of 30 mmHg. What is the cerebral perfusion pressure, and is it adequate?',
 o:['50 mmHg: too low','110 mmHg: too high','50 mmHg: normal','80 mmHg: normal','30 mmHg: too low'],a:0,fixed:true,
 e:'CPP = MAP − ICP = 80 − 30 = 50 mmHg. A CPP of at least about 60 mmHg is needed, so this brain is under-perfused. Treatment aims to lower ICP and support blood pressure.'},
{sec:'neuro-icp',type:'sba',q:'An intubated patient with a severe head injury is briefly hyperventilated to lower intracranial pressure. How does this work?',
 o:['Lower arterial CO₂ constricts cerebral arterioles, reducing cerebral blood volume','Higher arterial oxygen dilates cerebral vessels','Lower CO₂ increases CSF reabsorption','Hyperventilation lowers mean arterial pressure','It reduces brain metabolism directly'],a:0,
 e:'Cerebral vessels are very sensitive to CO₂: hypocapnia causes vasoconstriction, so less blood sits in the skull and ICP falls. It is used only briefly because the same vasoconstriction can cause ischaemia.'},
{sec:'neuro-icp',type:'saq',q:'Which structure produces cerebrospinal fluid?',acc:['choroid'],m:'The choroid plexus',
 e:'Modified ependymal cells of the choroid plexus in the lateral, third and fourth ventricles secrete about 500 mL a day. It is reabsorbed by the arachnoid granulations into the dural venous sinuses.'}
]};
