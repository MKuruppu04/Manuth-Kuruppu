import { ContactInfo, Project, SoftwareSkill, VolunteeringRole } from './types';

export const PERSONAL_INFO: ContactInfo = {
  name: 'Kuruppu K A M T',
  formalName: 'Kuruppu Arachchige Manuth Thejaka',
  preferredName: 'Manuth Kuruppu',
  title: 'Biomedical Engineering Undergraduate',
  cohort: '2nd Year (24th Batch)',
  institution: 'University of Moratuwa, Sri Lanka',
  email: 'manuthkuruppu@gmail.com',
  phone: '+94 77 171 2701',
  github: 'https://github.com/MKuruppu04',
  linkedin: 'https://www.linkedin.com/in/manuth-kuruppu-ab34472a5/',
  location: 'Colombo / Moratuwa, Sri Lanka',
};

export const HERO_IMAGE = '/src/assets/images/bme_hero_workspace_1790301558874.jpg';

export const PROJECTS: Project[] = [
  {
    id: 'iv-drop-monitor',
    title: 'Autonomous IV Drop Monitoring System',
    subtitle: 'Optical droplet tracking & telemetry alerting for clinical infusion safety',
    category: 'Biomedical Devices',
    overview: 'An automated clinical hardware system designed to continuously monitor intravenous fluid administration rate, detect chamber occlusions, and wirelessly trigger nurse station alerts prior to air embolism hazards.',
    fullDescription: 'Intravenous infusion is one of the most routine yet critical clinical therapies. Irregular flow rates, needle occlusions, or depleted infusion bags can lead to phlebitis, fluid overload, or dangerous air embolisms. The Autonomous IV Drop Monitoring System clamps non-invasively onto standard drip chambers, utilizing custom infrared optical transceiver arrays to compute instantaneous drop rate (gtt/min) and total volume infused. The unit runs on an energy-efficient microcontroller architecture with threshold alerts, liquid crystal telemetry, and wireless telemetry.',
    image: '/src/assets/images/iv_drop_monitor_1790301571073.jpg',
    keyFeatures: [
      'Non-invasive optical IR barrier sensing with ambient light rejection',
      'Real-time gtt/min calculation and flow rate anomaly detection',
      'Automated visual and acoustic alarm triggers for line blockages and empty bags',
      'Modular clip-on ergonomic housing adaptable to standard IV tubing sets',
      'Low-power microcontroller firmware with telemetry telemetry support'
    ],
    toolsUsed: ['Altium Designer', 'LTspice', 'MATLAB', 'C / Embedded C', 'Logisim'],
    role: 'Lead Hardware & Analog Circuit Designer',
    status: 'Functional Prototype & Lab Bench Tested',
    engineeringDetails: {
      circuitry: 'Designed analog comparator stages with Schmitt trigger hysteresis to eliminate droplet bounce. Implemented transimpedance amplification for high-speed photodiode signal capture.',
      sensorsAndHardware: 'Modulated 940nm infrared emitter and matched phototransistor pair in optocoupled slot geometry. Microcontroller with interrupt-driven timer counters.',
      simulationAndModeling: 'LTspice transient analysis of the photodiode conditioning circuit to verify bandwidth and drop edge detection down to 2ms pulse durations.',
      clinicalApplication: 'Hospital wards, neonatal intensive care units (NICU), and post-operative recovery rooms where nursing staff require centralized infusion surveillance.'
    },
    simulationType: 'iv_drip'
  },
  {
    id: 'heart-sound-amplifier',
    title: 'Multi-Listener Heart Sound Amplifier',
    subtitle: 'Low-noise phonocardiogram analog amplifier & clinical teaching hub',
    category: 'Analog & Sensors',
    overview: 'A clinical-grade phonocardiography unit featuring high-gain active analog filtration and a multi-headphone audio distribution network designed for bedside medical education and synchronous cardiac auscultation.',
    fullDescription: 'Auscultation is a cornerstone of cardiology, yet subtle heart murmurs, S3/S4 gallops, and regurgitant clicks are difficult to demonstrate to multiple medical students simultaneously. The Multi-Listener Heart Sound Amplifier couples a sensitive acoustic bell diaphragm with an ultra-low-noise preamplifier, tunable bandpass filtering (20 Hz - 2000 Hz) to isolate cardiac harmonics from respiratory noise, and an active audio distribution bus powering up to 4 synchronized listener channels without signal degradation.',
    image: '/src/assets/images/heart_sound_amplifier_1790301582517.jpg',
    keyFeatures: [
      'Ultra-low-noise acoustic sensor interface with high Common-Mode Rejection Ratio (CMRR)',
      'Multi-stage active analog bandpass filter tuned for primary S1, S2, S3, and murmur frequencies',
      'Isolated multi-channel headphone driver matrix for synchronous clinical teaching',
      'Analog-to-digital line-out port for real-time oscilloscope or phonocardiogram PC visualization',
      'Shielded enclosure preventing 50Hz mains power interference and electromagnetic noise'
    ],
    toolsUsed: ['LTspice', 'Altium Designer', 'MATLAB', 'Audio Electronics', 'Logisim'],
    role: 'Analog Filter & PCB Design Engineer',
    status: 'Hardware Design & Simulation Complete',
    engineeringDetails: {
      circuitry: 'Precision instrumentation front-end utilizing ultra-low noise op-amps with multiple Sallen-Key 4th-order active Butterworth bandpass filter topologies.',
      sensorsAndHardware: 'Acoustically tuned condenser transducer element mated to a medical-grade chest piece. High-current output buffer ICs for multi-impedance headphone loads.',
      simulationAndModeling: 'Extensive LTspice AC frequency sweeps, Monte Carlo tolerance simulations, and FFT harmonic distortion analysis to verify >80dB CMRR.',
      clinicalApplication: 'Medical universities, teaching hospitals, and clinical rounds allowing attending physicians and medical students to simultaneously hear and diagnose heart murmurs.'
    },
    simulationType: 'phonocardiogram'
  },
  {
    id: 'blood-flow-detector',
    title: 'Autonomous Blood Flow Detector',
    subtitle: 'Non-invasive microvascular perfusion & hemodynamics detection module',
    category: 'Biomedical Devices',
    overview: 'An embedded diagnostic module utilizing optical reflectance and Doppler principles to measure peripheral vascular blood flow velocity, pulsatile indices, and tissue perfusion in real time.',
    fullDescription: 'Evaluating peripheral microcirculation and tissue perfusion is vital in trauma assessment, diabetic limb preservation, and vascular reconstructive surgery. This autonomous instrument combines dual-wavelength optical sensing with high-speed analog signal acquisition to isolate the AC pulsatile component of microvascular blood flow. Onboard digital filtering algorithmically calculates pulse transit dynamics, relative perfusion index, and automated flow stagnation alerts.',
    image: '/src/assets/images/blood_flow_detector_1790301606092.jpg',
    keyFeatures: [
      'Dual-wavelength optical reflectance sensor array for differential absorption analysis',
      'High-dynamic-range analog front-end isolating weak microvascular pulsatile waveforms',
      'Autonomous baseline auto-zeroing to compensate for variations in tissue pigment and probe pressure',
      'Real-time arterial pulsatile waveform extraction and perfusion index estimation',
      'Compact handheld form factor with low-power battery management'
    ],
    toolsUsed: ['Altium Designer', 'LTspice', 'MATLAB', 'Microcontroller C', 'Vivado'],
    role: 'Biomedical Instrumentation & Algorithm Developer',
    status: 'Algorithm Prototyping & Sensor Validation',
    engineeringDetails: {
      circuitry: 'Differential transimpedance amplifier with active DC cancellation feedback loop to prevent optical ambient saturation of the photodetector.',
      sensorsAndHardware: 'Surface-mount optical emitter-detector pair with matched spectral response, 16-bit analog-to-digital converter, and Cortex-M microcontroller core.',
      simulationAndModeling: 'MATLAB digital signal processing scripts for wavelet de-noising, peak detection, and time-frequency Doppler shift spectral analysis.',
      clinicalApplication: 'Post-surgical flap viability monitoring, peripheral artery disease (PAD) triage, and emergency response microcirculation assessment.'
    },
    simulationType: 'blood_flow'
  },
  {
    id: '3d-clinostat',
    title: '3D Clinostat Microgravity Simulator',
    subtitle: 'Multi-axis rotational apparatus for gravitational biology & space medicine',
    category: 'Microgravity & Research',
    overview: 'A dual-axis continuous rotational clinostat engineered to average Earth’s gravity vector to near-zero, enabling microgravity simulation for biological cell cultures and plant gravitropism experiments.',
    fullDescription: 'Conducting gravitational biology experiments in low Earth orbit or aboard the ISS is prohibitively expensive. A 3D clinostat provides simulated functional weightlessness on the ground by rotating an inner sample chamber along two independent orthogonal axes with variable angular velocities. By continuously shifting the gravitational direction before the biological specimen can polarize its sedimentation or mechanosensitive ion channels, the net time-averaged gravity vector approaches zero (10^-2 g to 10^-3 g equivalent).',
    image: '/src/assets/images/clinostat_3d_1790301593722.jpg',
    keyFeatures: [
      'Concentric orthogonal dual-gimbal rings with precision balanced rotational axes',
      'Microstepping motor drivers delivering jitter-free continuous motion at 1 - 10 RPM',
      'Autonomous trajectory generator preventing periodic vector repetition and centrifugal artifacts',
      'Enclosed slip-ring electrical feedthrough supplying continuous power to internal incubation sensors',
      'Real-time telemetry logging rotational velocity, acceleration vectors, and ambient environmental conditions'
    ],
    toolsUsed: ['MATLAB', 'Altium Designer', 'LTspice', 'Logisim', 'Quartus Prime'],
    role: 'Systems Architecture & Motor Control Lead',
    status: 'Kinematic Modeling & Control Hardware Assembly',
    engineeringDetails: {
      circuitry: 'Dedicated motor controller PCB with isolated H-bridge drivers, current sensing feedback, and slip-ring power conditioning modules.',
      sensorsAndHardware: 'Precision NEMA stepper motors, optical rotary encoders, dual 3-axis MEMS accelerometers mounted at the gimbal center to evaluate residual g-jitter.',
      simulationAndModeling: 'MATLAB kinematic coordinate transformation modeling and gravity vector time-averaging simulations to optimize rotational trajectory algorithms.',
      clinicalApplication: 'Space medicine and cell biology research investigating stem cell differentiation, bone mineral density loss mechanisms, and bacterial virulence under simulated microgravity.'
    },
    simulationType: 'clinostat'
  }
];

export const VOLUNTEERING_ROLES: VolunteeringRole[] = [
  {
    id: 'ieee-embs-scholarverse',
    organization: 'IEEE EMBS Student Chapter',
    initiative: 'Scholarverse',
    role: 'Co-chair',
    period: '2025 – Present',
    category: 'IEEE',
    description: 'Leading the IEEE Engineering in Medicine and Biology Society (EMBS) flagship initiative connecting undergraduates and researchers with global biomedical academia, research grants, and peer mentoring.',
    highlights: [
      'Spearheading program architecture, keynote speaker outreach, and executive team coordination',
      'Facilitating technical mentorship sessions on biomedical research methodologies and literature appraisal',
      'Collaborating across international student chapters to expand student engagement in medical engineering'
    ]
  },
  {
    id: 'medex-brainstorm-2026',
    organization: 'IEEE EMBS / Biomedical Community',
    initiative: 'MedEx 2026 & Brainstorm 2026',
    role: 'Public Relations (PR)',
    period: '2025 – 2026',
    category: 'IEEE',
    description: 'Driving high-impact media outreach, strategic communications, and audience engagement for premier national biomedical exhibitions and biomedical ideathon competitions.',
    highlights: [
      'Architecting multi-channel promotional campaigns across academia, medical professionals, and student innovators',
      'Drafting official press statements, delegate brochures, and sponsorship pitch documents',
      'Managing live event digital coverage and inter-institutional participant coordination'
    ]
  },
  {
    id: 'spectra-2026',
    organization: 'Department of Electronic & Telecommunication Engineering',
    initiative: 'Spectra 2026',
    role: 'Public Relations Head (PR Head)',
    period: '2025 – 2026',
    category: 'Department',
    description: 'Heading the public relations committee for Spectra 2026, the premier departmental celebration showcasing student innovation, technological talent, and industrial collaborations.',
    highlights: [
      'Managing a dedicated PR sub-committee, delegating media production, and approving public releases',
      'Coordinating promotional rollouts with major university societies and external industrial partners',
      'Overseeing digital marketing funnels resulting in peak audience turnout and sponsor engagement'
    ]
  },
  {
    id: 'ieee-mtts-pr',
    organization: 'IEEE MTTS Student Chapter',
    initiative: 'Public Relations Branch',
    role: 'PR Branch Member',
    period: '2024 – Present',
    category: 'IEEE',
    description: 'Contributing to the Microwave Theory and Technology Society (MTTS) outreach, developing educational collateral, and elevating member engagement in RF/microwave technology.',
    highlights: [
      'Creating technical summaries, informational infographics, and event flyers for workshops',
      'Assisting in the execution of technical seminars on high-frequency electronics and RF engineering',
      'Strengthening chapter visibility across university faculty and international IEEE networks'
    ]
  },
  {
    id: 'e-club-committee',
    organization: 'Electronic Club (E-Club)',
    initiative: 'Main Branch Executive Body',
    role: 'Committee Member',
    period: '2024 – Present',
    category: 'Department',
    description: 'Serving on the governing committee of the Department of Electronic & Telecommunication and Biomedical Engineering student club, organizing flagship hardware hackathons and student welfare events.',
    highlights: [
      'Co-organizing Department orientation programs and technical hands-on electronics bootcamps',
      'Bridging communication between academic staff, senior researchers, and 24th batch undergraduates',
      'Facilitating industry tech talks and hardware equipment provisioning for departmental teams'
    ]
  },
  {
    id: 'sasnaka-sansada',
    organization: 'Sasnaka Sansada',
    initiative: 'Database Management Project',
    role: 'Database Management Project Coordinator',
    period: '2025 – 2026',
    category: 'Community & Database',
    description: 'Coordinating database architecture, record tracking, and operational automation for one of Sri Lanka’s prominent voluntary educational development organizations.',
    highlights: [
      'Directing data schema structuring and user access controls for nationwide student and volunteer records',
      'Streamlining logistical data workflows across multiple provincial educational seminars and exams',
      'Ensuring data integrity, regular cloud backups, and reporting dashboards for executive decisions'
    ]
  }
];

export const SOFTWARE_SKILLS: SoftwareSkill[] = [
  {
    name: 'Altium Designer',
    category: 'Engineering & EDA',
    level: 'Skilled',
    focus: 'Schematic capture, multi-layer PCB layout, signal routing, footprint creation, and fabrication Gerber generation for biomedical circuits.',
    tags: ['PCB Layout', 'Design Rule Check', 'Schematic Capture', 'SMD Prototyping']
  },
  {
    name: 'LTspice',
    category: 'Engineering & EDA',
    level: 'Skilled',
    focus: 'Analog circuit modeling, AC frequency analysis, active filter synthesis (Butterworth/Chebyshev), transient simulation, and noise analysis.',
    tags: ['Filter Design', 'Op-Amp Modeling', 'AC Analysis', 'Transient Response']
  },
  {
    name: 'MATLAB',
    category: 'Simulation & Computing',
    level: 'Skilled',
    focus: 'Biomedical signal processing (ECG/PPG/PCG filtering), algorithmic modeling, statistical analysis, and kinematic simulation of rotation vectors.',
    tags: ['Signal Processing', 'Wavelet Transform', 'FFT Analysis', 'Kinematic Modeling']
  },
  {
    name: 'Logisim',
    category: 'Simulation & Computing',
    level: 'Skilled',
    focus: 'Digital logic design, combinational and sequential circuit simulation, register-transfer level (RTL) architecture modeling.',
    tags: ['Digital Logic', 'State Machines', 'ALU Design', 'Gate-Level Simulation']
  },
  {
    name: 'Vivado',
    category: 'Engineering & EDA',
    level: 'Limited / Foundational',
    focus: 'FPGA hardware description and digital synthesis workflow using Vivado design suite for digital logic verification.',
    tags: ['FPGA', 'Verilog / VHDL', 'Logic Synthesis', 'Xilinx Architecture']
  },
  {
    name: 'Quartus Prime',
    category: 'Engineering & EDA',
    level: 'Limited / Foundational',
    focus: 'Intel FPGA/CPLD synthesis, pin assignment, RTL simulation, and compilation for digital hardware prototyping.',
    tags: ['Intel FPGA', 'RTL Viewer', 'Pin Mapping', 'Logic Analyzer']
  },
  {
    name: 'Adobe Premiere Pro',
    category: 'Media & PR Tools',
    level: 'Skilled',
    focus: 'Non-linear video editing, technical demonstration reels, event promotional teasers, audio synchronization, and color grading.',
    tags: ['Video Editing', 'Audio Sync', 'PR Campaigns', 'Storyboarding']
  },
  {
    name: 'Adobe After Effects',
    category: 'Media & PR Tools',
    level: 'Limited / Foundational',
    focus: 'Motion typography, animated lower-thirds, graphic title reveals, and kinetic promotional teasers for engineering societies.',
    tags: ['Motion Graphics', 'Visual PR', 'Kinetic Titles', 'Keyframe Animation']
  },
  {
    name: 'Canva',
    category: 'Media & PR Tools',
    level: 'Skilled',
    focus: 'Strategic social media visual campaigns, PR flyer aesthetics, branding guidelines, delegate passes, and event program collaterals.',
    tags: ['Branding', 'Social PR', 'Brochures', 'Visual Design']
  }
];

export const BIOMEDICAL_AREAS = [
  {
    title: 'Biomedical Instrumentation',
    description: 'Front-end biosignal amplification, isolation amplifiers, optical transimpedance circuitry, and clinical device reliability.'
  },
  {
    title: 'Analog Filter Design & DSP',
    description: 'Active op-amp filter networks, high CMRR instrumentation topologies, baseline drift removal, and Fourier signal analysis.'
  },
  {
    title: 'Microgravity Bio-Mechanisms',
    description: 'Multi-axis clinostat simulation, time-averaged gravitational neutralization, and mechanical apparatus design for cell biology.'
  },
  {
    title: 'Technical PR & Leadership',
    description: 'Cross-functional engineering leadership, media campaign direction for IEEE EMBS / MTTS, and database system coordination.'
  }
];
