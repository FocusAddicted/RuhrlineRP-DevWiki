window.RL_CATALOG={
version:'GTA V v3717.0 / Online 1.72 · mp2025_02_g9ec',
base:'https://raw.githubusercontent.com/DurtyFree/gta-v-data-dumps/master/',
groups:[
 {title:'Core Creator Data',items:[
  {id:'peds',icon:'🧍',label:'Peds',count:'1,109',file:'peds.json',kind:'peds',preview:'ped'},
  {id:'vehicles',icon:'🚗',label:'Vehicles',count:'921',file:'vehicles.json',kind:'vehicles',preview:'vehicle'},
  {id:'objects',icon:'📦',label:'Props & Objects',count:'21,631',file:'ObjectList.ini',kind:'objects'},
  {id:'scenarios',icon:'🎭',label:'Ped Scenarios',count:'247',file:'scenariosCompact.json',kind:'scenarios'},
  {id:'weapons',icon:'🔫',label:'Weapons',count:'184',file:'weapons.json',kind:'weapons'},
  {id:'animations',icon:'🎬',label:'Animations',count:'269,414',file:'animDictsCompact.json',kind:'animations',heavy:true},
  {id:'clipsets',icon:'🚶',label:'Movement Clipsets',count:'557',file:'movementClipsetsCompact.json',kind:'clipsets'}
 ]},
 {title:'World & Mapping',items:[
  {id:'ipls',icon:'🏙️',label:'IPLs',count:'895',file:'ipls.json',kind:'generic'},
  {id:'interiors',icon:'🏢',label:'MLO / Interiors',count:'385',file:'mloInteriors.json',kind:'generic'},
  {id:'zones',icon:'🗺️',label:'Zones',count:'97',file:'zones.json',kind:'generic'},
  {id:'pickups',icon:'🎁',label:'Pickups',count:'175',file:'pickupTypes.json',kind:'generic'},
  {id:'particles',icon:'✨',label:'Particle FX',count:'2,907',file:'particleEffectsCompact.json',kind:'particles'},
  {id:'timecycles',icon:'🌗',label:'Timecycle Mods',count:'1,088',file:'timecycleModifiers.json',kind:'generic'}
 ]},
 {title:'Ped & Character',items:[
  {id:'clothing',icon:'🧥',label:'Ped Components',count:'33,558+',file:'pedComponentVariations.json',kind:'generic',heavy:true},
  {id:'tattoos',icon:'🖋️',label:'Tattoos / Overlays',count:'3,373',file:'pedOverlayCollections.json',kind:'generic'},
  {id:'damagepacks',icon:'🩸',label:'Damage Packs',count:'72',file:'pedDamagePacks.json',kind:'generic'},
  {id:'apparel-tags',icon:'🏷️',label:'Apparel Restrictions',count:'476',file:'pedApparelRestrictionTags.json',kind:'generic'}
 ]},
 {title:'Vehicle Data',items:[
  {id:'vehiclecolors',icon:'🎨',label:'Vehicle Colors',count:'All',file:'vehicleColors.json',kind:'generic'},
  {id:'vehiclemods',icon:'🔧',label:'Vehicle Mod Kits',count:'36,282',file:'vehicleModKits.json',kind:'generic',heavy:true},
  {id:'handling',icon:'⚙️',label:'Vehicle Handlings',count:'838',file:'vehicleHandlings.json',kind:'generic'}
 ]},
 {title:'Audio & Effects',items:[
  {id:'sounds',icon:'🔊',label:'Sound Names',count:'43,428',file:'soundNames.json',kind:'generic',heavy:true},
  {id:'audio-scenes',icon:'🎚️',label:'Audio Scenes',count:'3,645',file:'audioSceneNames.json',kind:'generic'},
  {id:'radio',icon:'📻',label:'Radio Stations',count:'86',file:'radioStations.json',kind:'generic'},
  {id:'explosions',icon:'💥',label:'Explosion Types',count:'88',file:'explosionTypesCompact.json',kind:'generic'},
  {id:'camshakes',icon:'📹',label:'Cam Shakes',count:'23',file:'camShakeTypesCompact.json',kind:'generic'}
 ]},
 {title:'FiveM References',items:[
  {id:'blips',icon:'📍',label:'Blips / Sprites',count:'Reference',external:'https://docs.fivem.net/docs/game-references/blips/'},
  {id:'markers',icon:'🔶',label:'Markers',count:'Reference',external:'https://docs.fivem.net/docs/game-references/markers/'}
 ]}
],
counts:[['Peds','1,109','peds'],['Vehicles','921','vehicles'],['Objects','21,631','objects'],['Scenarios','247','scenarios'],['Weapons','184','weapons'],['Animations','269,414','animations'],['IPLs','895','ipls'],['MLO Interiors','385','interiors']],
scenarioDescription(name){
 const exact={
 'Standing':'Einfaches Stehen / neutrales Idle.','Walk':'Allgemeines Gehen.','Walk_Facility':'Facility-spezifische Gehbewegung.','DRIVE':'Grundlegendes Fahren eines Fahrzeugs.','PARK_VEHICLE':'Fahrzeug wird geparkt.','WORLD_LOOKAT_POINT':'Ped richtet Blick und Kopf auf einen definierten Weltpunkt.','EAR_TO_TEXT':'Handy-Übergang vom Telefonieren am Ohr zum Tippen/Texten.','EAR_TO_TEXT_FAT':'Handy-Übergang zum Texten für kräftigere Ped-Rigs.','CHAINING_ENTRY':'Interner Einstieg in eine verkettete Scenario-Sequenz.','CHAINING_EXIT':'Interner Ausstieg aus einer verketteten Scenario-Sequenz.'};
 if(exact[name])return exact[name];
 const rules=[
  ['AA_COFFEE','Steht herum und trinkt Kaffee.'],['AA_SMOKE','Steht und raucht eine Zigarette.'],['BINOCULARS','Benutzt ein Fernglas.'],['CHEERING','Jubelt, klatscht und feuert etwas an.'],['CLIPBOARD','Benutzt ein Klemmbrett.'],['CONST_DRILL','Arbeitet mit Pressluft- bzw. Bohrhammer.'],['COP_IDLES','Typische Polizei-Stand-Idles.'],['DRINKING','Steht bzw. sitzt und trinkt.'],['DRUG_DEALER','Straßen-Dealer-Idle.'],['LEAF_BLOWER','Benutzt einen Laubbläser.'],['GARDENER_PLANT','Arbeitet an Pflanzen bzw. im Beet.'],['GOLF_PLAYER','Golfspieler-Idle mit Schläger.'],['GUARD_PATROL','Wachmann auf Patrouille.'],['GUARD_STAND','Wachmann steht aufmerksam auf seinem Posten.'],['HAMMERING','Arbeitet mit einem Hammer.'],['HANG_OUT_STREET','Lockeres Abhängen auf der Straße.'],['HIKER','Wanderer-Scenario.'],['HUMAN_STATUE','Straßenkünstler verharrt als lebende Statue.'],['INSPECT_CROUCH','Untersucht etwas in der Hocke.'],['INSPECT_STAND','Untersucht etwas im Stehen.'],['JANITOR','Hausmeister bzw. Reinigungskraft fegt.'],['JOG','Jogging-Scenario.'],['LEANING','Lehnt entspannt an einer Oberfläche.'],['MAID_CLEAN','Reinigungskraft putzt Oberflächen.'],['MUSCLE_FLEX','Posiert und spannt Muskeln an.'],['FREE_WEIGHTS','Trainiert mit freien Gewichten.'],['MUSICIAN','Straßenmusiker spielt Musik.'],['PAPARAZZI','Fotografiert mit einer Kamera.'],['PARTYING','Feiert und tanzt.'],['PICNIC','Sitzt entspannt beim Picknick.'],['POWER_WALKER','Schnelles sportliches Gehen.'],['PUSH_UPS','Macht Liegestütze.'],['SIT_UPS','Macht Sit-ups.'],['SMOKING_POT','Raucht Cannabis / einen Joint.'],['SMOKING','Raucht eine Zigarette.'],['STAND_FIRE','Steht an einem Feuer und wärmt sich.'],['FISHING','Angelt mit einer Angelrute.'],['IMPATIENT','Wartet ungeduldig.'],['STAND_MOBILE','Benutzt ein Smartphone im Stehen.'],['STRIP_WATCH','Schaut einer Stripshow zu.'],['STUPOR','Wirkt stark betrunken bzw. benommen.'],['SUNBATHE_BACK','Sonnenbaden auf dem Rücken.'],['SUNBATHE','Sonnenbaden.'],['SWIMMING','Schwimmt.'],['TOURIST_MAP','Tourist betrachtet eine Karte.'],['TOURIST_MOBILE','Tourist benutzt bzw. fotografiert mit dem Handy.'],['VALET','Valet / Fahrzeugannahme.'],['VEHICLE_MECHANIC','Mechaniker arbeitet an einem Fahrzeug.'],['WELDING','Schweißt mit einem Schweißgerät.'],['WINDOW_SHOP','Betrachtet Waren bzw. ein Schaufenster.'],['YOGA','Führt Yogaübungen aus.'],
  ['GRAZING','Tier grast bzw. frisst am Boden.'],['SLEEPING_GROUND','Tier schläft auf dem Boden.'],['SLEEPING_LEDGE','Tier schläft auf einer erhöhten Kante.'],['HOWL','Tier heult.'],['REST','Tier ruht.'],['WANDER','Tier streift umher.'],['BARKING','Hund bellt.'],['SITTING','Tier sitzt ruhig.'],['FEEDING','Tier frisst bzw. pickt.'],['PECKING','Tier pickt am Boden.'],['FLEE','Tier flieht.'],['SWIM','Wassertier schwimmt.'],
  ['VEHICLE_AMBULANCE','Krankenwagen-/Rettungsdienst-Ambient-Scenario.'],['VEHICLE_FIRE_TRUCK','Feuerwehrfahrzeug-Ambient-Scenario.'],['VEHICLE_POLICE','Polizei-Fahrzeug-/Officer-Ambient-Scenario.'],['BICYCLE','Fahrrad-Ambient-Scenario.'],['BIKER','Motorrad-/Biker-Ambient-Scenario.'],['BOAT_IDLE','Boot im Ambient-Idle.'],['BROKEN_DOWN','Fahrzeugpanne / Pannenfahrzeug.'],['CONSTRUCTION','Baustellenfahrzeug-Ambient-Scenario.'],['DRIVE_PASSENGERS','Ambientfahrt mit Passagieren.'],['DRIVE_SOLO','Ambientfahrt nur mit Fahrer.'],['FARM_WORKER','Landwirtschaftliches Fahrzeug-Scenario.'],['MILITARY_PLANES','Militärflugzeug-Ambient-Scenario.'],['PARK_PARALLEL','Fahrzeug parkt parallel ein.'],['PARK_PERPENDICULAR','Fahrzeug parkt rechtwinklig ein.'],['PASSENGER_EXIT','Passagier steigt aus einem Fahrzeug aus.'],['STREETRACE','Straßenrennen-Ambient-Scenario.'],['TOURBUS','Touristenbus-Ambient-Scenario.'],['TRACTOR','Traktor-Ambient-Scenario.'],['TRUCK','LKW-Ambient-Scenario.'],
  ['PROP_HUMAN_ATM','Ped benutzt einen Geldautomaten.'],['PROP_HUMAN_BBQ','Ped steht am Grill und grillt.'],['BUM_BIN','Obdachloser durchsucht einen Mülleimer.'],['SHOPPING_CART','Obdachloser mit Einkaufswagen.'],['CHIN_UPS','Macht Klimmzüge.'],['PARKING_METER','Benutzt bzw. bezahlt eine Parkuhr.'],['SEAT_ARMCHAIR','Sitzt in einem Sessel.'],['SEAT_BAR','Sitzt an einer Bar bzw. auf einem Barhocker.'],['SEAT_BENCH','Sitzt auf einer Bank.'],['BUS_STOP_WAIT','Sitzt wartend an einer Bushaltestelle.'],['SEAT_CHAIR','Sitzt auf einem Stuhl.'],['SEAT_COMPUTER','Sitzt am Computer und benutzt ihn.'],['SEAT_DECKCHAIR','Sitzt bzw. liegt in einem Liegestuhl.'],['BENCH_PRESS','Trainiert Bankdrücken.'],['SEAT_SEWING','Sitzt an einer Nähmaschine und näht.'],['SEAT_SUNLOUNGER','Liegt bzw. sitzt auf einer Sonnenliege.'],
  ['CODE_HUMAN_COWER','Ped kauert sich verängstigt zusammen.'],['CROSS_ROAD_WAIT','Fußgänger wartet vor dem Überqueren einer Straße.'],['CODE_HUMAN_PARK_CAR','Programmgesteuerter Parkvorgang.'],['MEDIC_KNEEL','Sanitäter / Medic kniet am Boden.'],['MEDIC_TEND_TO_DEAD','Medic untersucht bzw. versorgt eine reglose Person.'],['MEDIC_TIME_OF_DEATH','Medic untersucht einen Toten bzw. dokumentiert den Todeszeitpunkt.'],['POLICE_CROWD_CONTROL','Polizist betreibt Crowd-Control.'],['POLICE_INVESTIGATE','Polizist untersucht Tatort oder Umgebung.'],['STAND_COWER','Verängstigtes Stehen / Schützen.']
 ];
 for(const [k,v] of rules)if(name.includes(k))return v;
 return 'GTA-V-Scenario. Verhalten ist abhängig von Ped-Modell, World-Scenario-Point und Kontext.';
},
scenarioCategory(n){if(n.startsWith('WORLD_VEHICLE')||n==='DRIVE'||n==='PARK_VEHICLE')return'Fahrzeug';if(n.startsWith('PROP_'))return'Prop / Objekt';if(n.startsWith('CODE_')||n.startsWith('CHAINING')||n.startsWith('EAR_')||n==='WORLD_LOOKAT_POINT')return'Code / Intern';if(/WORLD_(BOAR|CAT|COW|COYOTE|CHICKENHAWK|CORMORANT|CROW|DEER|DOG|DOLPHIN|FISH|GULL|HEN|MOUNTAIN_LION|ORCA|PIG|PIGEON|RABBIT|RATS|SHARK|STINGRAY|WHALE)/.test(n))return'Tier';return'Mensch';}
};
