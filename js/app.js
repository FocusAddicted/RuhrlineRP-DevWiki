(()=>{
const C=window.RL_CATALOG, $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const state={category:null,items:[],filtered:[],limit:120,view:'grid',filter:'Alle',cache:new Map(),favorites:new Set(JSON.parse(localStorage.getItem('rl_favorites')||'[]')),basket:JSON.parse(localStorage.getItem('rl_creator')||'[]')};
const allItems=C.groups.flatMap(g=>g.items);const byId=id=>allItems.find(x=>x.id===id);
function esc(v=''){return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function joaat(s){s=String(s).toLowerCase();let h=0;for(let i=0;i<s.length;i++){h+=(s.charCodeAt(i));h+=(h<<10);h^=(h>>>6)}h+=(h<<3);h^=(h>>>11);h+=(h<<15);return h>>>0}
function hex(n){if(n===undefined||n===null||n==='')return'';let x=Number(n);if(!Number.isFinite(x))return String(n);return '0x'+(x>>>0).toString(16).toUpperCase().padStart(8,'0')}
function copy(v){navigator.clipboard.writeText(String(v)).then(()=>toast('Kopiert: '+String(v).slice(0,56))).catch(()=>toast('Kopieren nicht möglich'))}
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('show'),1500)}
function save(){localStorage.setItem('rl_favorites',JSON.stringify([...state.favorites]));localStorage.setItem('rl_creator',JSON.stringify(state.basket));$('#basketCount').textContent=state.basket.length}
function renderNav(){const nav=$('#nav');nav.innerHTML=`<button class="nav-item active" data-home><span class="ico">⌂</span>Dashboard</button>`+C.groups.map(g=>`<div class="nav-group">${esc(g.title)}</div>`+g.items.map(i=>`<button class="nav-item" data-cat="${i.id}" ${i.external?`data-external="${i.external}"`:''}><span class="ico">${i.icon}</span>${esc(i.label)}<span class="count">${esc(i.count)}</span></button>`).join('')).join('')}
function dashboard(){state.category=null;$('#browser').classList.add('hidden');$('#dashboard').classList.remove('hidden');$('#pageTitle').textContent='Ruhrline GTA Data Explorer';$('#pageSubtitle').textContent='Alles, was man beim FiveM-Scripten ständig googeln muss, sauber sortiert an einem Ort.';$$('.nav-item').forEach(x=>x.classList.toggle('active',x.hasAttribute('data-home')));$('#dashboard').innerHTML=`<div class="stats-grid">${C.counts.map(([l,n,id])=>`<article class="stat-card" data-open="${id}"><div class="kicker">${esc(l)}</div><strong>${esc(n)}</strong><span class="orange">Browse & Copy →</span></article>`).join('')}</div><div class="dash-panel"><h3>Creator-first statt Wiki-Wüste.</h3><p>Datensätze werden erst beim Öffnen direkt aus dem aktuellen DurtyFree GTA-V-Dump geladen. Dadurch bleibt der Explorer schnell und die Daten lassen sich aktualisieren, ohne das Frontend anzufassen.</p><div class="quick-actions"><button data-open="peds">🧍 Peds</button><button data-open="vehicles">🚗 Vehicles</button><button data-open="objects">📦 Props</button><button data-open="scenarios">🎭 Scenarios</button><button data-action="show-creator">⌘ Creator Basket</button></div></div><div class="dash-panel"><h3>Datenstand</h3><p>${esc(C.version)}. Kerninformationen stammen aus dem öffentlichen DurtyFree GTA V Data Dumps Repository; Ped- und Vehicle-Previews verwenden das FiveM Documentation CDN, sofern dort ein Bild für das Modell vorhanden ist.</p></div>`}
async function openCategory(id){const cfg=byId(id);if(!cfg)return;if(cfg.external){window.open(cfg.external,'_blank','noopener');return}state.category=cfg;state.filter='Alle';state.limit=120;$('#dashboard').classList.add('hidden');$('#browser').classList.remove('hidden');$('#pageTitle').textContent=cfg.icon+' '+cfg.label;$('#pageSubtitle').textContent=cfg.heavy?'Großer Datensatz · wird lazy geladen und clientseitig gefiltert.':'Durchsuchen, filtern, Details öffnen und Werte mit einem Klick kopieren.';$$('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.cat===id));$('#cards').innerHTML='<div class="empty">Daten werden geladen …</div>';$('#loadNotice').classList.toggle('hidden',!cfg.heavy);if(cfg.heavy){$('#loadNotice').textContent='Dieser Datensatz ist groß. Der erste Abruf kann einige Sekunden dauern; danach liegt er im Browser-Cache.'}try{state.items=await load(cfg);applyFilters()}catch(e){console.error(e);$('#cards').innerHTML=`<div class="empty">Datensatz konnte nicht geladen werden.<br><small>${esc(e.message)}</small><br><br>Für GitHub Pages ist eine Internetverbindung zum Daten-Repository erforderlich.</div>`}}
async function load(cfg){
 if(state.cache.has(cfg.id))return state.cache.get(cfg.id);
 let list;
 if(cfg.kind==='fivem-markers'){
  list=(window.RL_FIVEM_UI?.markers||[]).map(x=>({
   id:String(x.id),name:x.name,model:String(x.id),hash:x.id,category:'Marker',
   tags:['Marker','DrawMarker'],
   preview:`assets/fivem/markers/${x.id}.png`,
   remotePreview:`https://docs-backend.fivem.net/markers/${x.id}.png`,
   assetPath:`assets/fivem/markers/${x.id}.png`,
   raw:{MarkerType:x.id,Name:x.name,Native:'DRAW_MARKER'}
  }));
 }else if(cfg.kind==='blip-colors'){
  list=(window.RL_FIVEM_UI?.blipColors||[]).map(x=>({
   id:String(x.id),name:x.name,model:String(x.id),hash:x.id,category:'Blip Color',
   tags:['Blip','Color'],color:x.hex,
   raw:{ColorID:x.id,Name:x.name,Hex:x.hex,Native:'SET_BLIP_COLOUR'}
  }));
 }else if(cfg.kind==='fivem-checkpoints'){
  const std=(window.RL_FIVEM_UI?.checkpoints||[]).map(x=>({
   id:String(x.id),name:x.name,model:String(x.id),hash:x.id,category:'Checkpoint',
   tags:x.tags||['Checkpoint'],description:x.note||'',
   preview:`assets/fivem/checkpoints/${x.asset}`,
   remotePreview:`https://docs-backend.fivem.net/checkpoints/${x.asset}`,
   assetPath:`assets/fivem/checkpoints/${x.asset}`,
   raw:{CheckpointType:x.id,Name:x.name,Asset:x.asset,Native:'CREATE_CHECKPOINT',Note:x.note||''}
  }));
  const variants=(window.RL_FIVEM_UI?.checkpointVariants||[]).map(x=>({
   id:`44-${x.id}`,name:x.name,model:String(x.id),hash:x.id,category:'Checkpoint 44-46 Variant',
   tags:x.tags||['Checkpoint','Reserved'],
   preview:`assets/fivem/checkpoints/${x.asset}`,
   remotePreview:`https://docs-backend.fivem.net/checkpoints/${x.asset}`,
   assetPath:`assets/fivem/checkpoints/${x.asset}`,
   raw:{CheckpointType:'44-46',Reserved:x.id,Asset:x.asset,Native:'CREATE_CHECKPOINT'}
  }));
  list=[...std,...variants];
 }else if(cfg.kind==='fivem-blips'){
  const r=await fetch(cfg.file,{cache:'force-cache'});
  if(!r.ok)throw new Error('HTTP '+r.status+' · '+cfg.file);
  const md=await r.text();
  const rx=/<img src="\/blips\/([^"]+)" alt="([^"]+)"[^>]*>[\s\S]*?<strong>(\d+)<\/strong>/g;
  let m; list=[]; const seen=new Set();
  while((m=rx.exec(md))){
   const file=m[1],name=m[2],id=Number(m[3]);
   if(seen.has(id))continue;seen.add(id);
   list.push({
    id:String(id),name,model:String(id),hash:id,category:'Blip Sprite',
    tags:['Blip','Sprite'],
    preview:`assets/fivem/blips/${file}`,
    remotePreview:`https://docs-backend.fivem.net/blips/${file}`,
    assetPath:`assets/fivem/blips/${file}`,
    raw:{SpriteID:id,SpriteName:name,Asset:file,Native:'SET_BLIP_SPRITE'}
   })
  }
 }else if(cfg.kind==='fivem-doc-table'){
  list=await loadOfficialDoc(cfg.doc);
 }else if(cfg.kind==='asset-library'){
  list=await buildAssetLibrary();
 }else{
  const url=C.base+cfg.file;
  const r=await fetch(url,{cache:'force-cache'});
  if(!r.ok)throw new Error('HTTP '+r.status+' · '+url);
  const raw=cfg.kind==='objects'?await r.text():await r.json();
  list=normalize(raw,cfg);
 }
 state.cache.set(cfg.id,list);return list
}

async function fetchOfficialMd(slug){
 const url=`https://raw.githubusercontent.com/citizenfx/fivem-docs/master/content/docs/game-references/${slug}.md`;
 const r=await fetch(url,{cache:'force-cache'});
 if(!r.ok)throw new Error('HTTP '+r.status+' · '+url);
 return r.text();
}

function cleanMd(s){return String(s||'').replace(/`/g,'').replace(/\*\*/g,'').replace(/\{\{[^}]+\}\}/g,'').trim()}

async function loadOfficialDoc(slug){
 const md=await fetchOfficialMd(slug);
 let list=[];
 if(slug==='controls'){
  const lines=md.split(/\r?\n/).filter(l=>/^\|\s*\d+\s*\|/.test(l));
  list=lines.map((l,n)=>{
   const c=l.split('|').slice(1,-1).map(cleanMd);
   const id=Number(c[0]);
   const name=c[1]||`Control ${id}`;
   return {id:String(id),name,model:String(id),hash:id,category:'Control',tags:['Input','Control'],
    raw:{ControlID:id,Name:name,Keyboard:c[2]||'',Controller:c[3]||''}};
  });
 }else if(slug==='hud-colors'){
  const rx=/\|\s*(\d+)\s*\|\s*([A-Z0-9_]+)\s*\|\s*(?:rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)\s*\((#[0-9a-fA-F]{6})\)|([A-Z0-9_]+))/g;
  let m;
  while((m=rx.exec(md))){
   const id=Number(m[1]),name=m[2],hex=m[7]||null,alias=m[8]||null;
   list.push({id:String(id),name,model:String(id),hash:id,category:'HUD Color',tags:['HUD','Color'],
    color:hex,raw:{Index:id,Name:name,RGBA:hex?`rgba(${m[3]}, ${m[4]}, ${m[5]}, ${m[6]})`:'Alias',Hex:hex||'',Alias:alias||''}});
  }
 }else if(slug==='pickup-hashes'){
  const rx=/([A-Z0-9_]+)\s*=\s*(-?\d+)/g; let m; const seen=new Set();
  while((m=rx.exec(md))){
   const name=m[1],hash=m[2]; if(!name.startsWith('PICKUP_')||seen.has(name))continue;seen.add(name);
   list.push({id:name,name,model:name,hash,category:'Pickup',tags:['Pickup','Hash'],
    raw:{Name:name,Hash:hash,Native:'CREATE_PICKUP / CREATE_AMBIENT_PICKUP'}});
  }
 }else if(slug==='weapon-models'){
  const blocks=md.split(/\n(?=Name:)/);
  for(const b of blocks){
   const name=(b.match(/Name:\s*([^\n]+)/)||[])[1];
   const hash=(b.match(/Hash:\s*([^\n]+)/)||[])[1];
   const model=(b.match(/Model Hash Key:\s*([^\n]+)/)||[])[1];
   const dlc=(b.match(/DLC:\s*([^\n]+)/)||[])[1];
   if(!name||!hash)continue;
   const slugModel=cleanMd(model||hash).toLowerCase();
   list.push({id:cleanMd(hash),name:cleanMd(name),model:cleanMd(model||hash),hash:cleanMd(hash),
    category:'Weapon Model',tags:['Weapon','Model'],preview:`assets/previews/weapons/${slugModel}.webp`,
    raw:{Name:cleanMd(name),WeaponHash:cleanMd(hash),ModelHashKey:cleanMd(model||''),DLC:cleanMd(dlc||'')}});
  }
 }
 return list;
}

async function buildAssetLibrary(){
 const out=[];
 // Always include known local/remote visual assets.
 try{
  const blips=await load({id:'blips',kind:'fivem-blips',file:'https://raw.githubusercontent.com/citizenfx/fivem-docs/master/content/docs/game-references/blips.md'});
  for(const x of blips) out.push({...x,id:'asset-blip-'+x.id,category:'Asset · Blip',tags:['Asset','Blip'],raw:{...x.raw,LocalPath:x.assetPath||x.preview}});
 }catch(e){}
 for(const x of (window.RL_FIVEM_UI?.markers||[])) out.push({
  id:'asset-marker-'+x.id,name:`Marker ${x.id} · ${x.name}`,model:String(x.id),hash:x.id,category:'Asset · Marker',tags:['Asset','Marker'],
  preview:`assets/fivem/markers/${x.id}.png`,remotePreview:`https://docs-backend.fivem.net/markers/${x.id}.png`,
  assetPath:`assets/fivem/markers/${x.id}.png`,raw:{Type:'Marker Preview',ID:x.id,Name:x.name,LocalPath:`assets/fivem/markers/${x.id}.png`}
 });
 for(const x of (window.RL_FIVEM_UI?.checkpoints||[])) out.push({
  id:'asset-checkpoint-'+x.id,name:`Checkpoint ${x.id}`,model:String(x.id),hash:x.id,category:'Asset · Checkpoint',tags:['Asset','Checkpoint'],
  preview:`assets/fivem/checkpoints/${x.asset}`,remotePreview:`https://docs-backend.fivem.net/checkpoints/${x.asset}`,
  assetPath:`assets/fivem/checkpoints/${x.asset}`,raw:{Type:'Checkpoint Preview',ID:x.id,LocalPath:`assets/fivem/checkpoints/${x.asset}`}
 });
 // Explicit library roots for generated GTA previews.
 for(const [kind,path] of [['Ped previews','assets/previews/peds/'],['Vehicle previews','assets/previews/vehicles/'],['Object previews','assets/previews/objects/'],['Weapon previews','assets/previews/weapons/']]){
  out.push({id:'library-'+kind,name:kind,model:path,category:'Asset Folder',tags:['Asset','Folder'],raw:{Folder:path,GeneratedBy:'rl-preview-generator'}});
 }
 return out;
}
function normalize(raw,cfg){switch(cfg.kind){
case'peds':return (Array.isArray(raw)?raw:Object.values(raw)).map((x,i)=>({id:x.Name||x.name||x.ModelName||i,name:x.TranslatedLabel?.German||x.TranslatedLabel?.English||x.DisplayName||x.Name||x.name||'Ped',model:x.Name||x.ModelName||x.name,hash:x.Hash??x.hash??(x.Name?joaat(x.Name):null),category:x.PedType||x.Type||x.DlcName||'Ped',tags:[x.PedType,x.Gender,x.DlcName].filter(Boolean),raw:x,preview:x.Name?`https://docs-backend.fivem.net/peds/${x.Name}.webp`:null}));
case'vehicles':return (Array.isArray(raw)?raw:Object.values(raw)).map((x,i)=>({id:x.Name||x.ModelName||i,name:x.TranslatedLabel?.German||x.TranslatedLabel?.English||x.DisplayName||x.Name||x.ModelName||'Vehicle',model:x.Name||x.ModelName||x.name,hash:x.Hash??x.hash??((x.Name||x.ModelName)?joaat(x.Name||x.ModelName):null),category:x.Class||x.VehicleClass||x.Type||x.DlcName||'Vehicle',tags:[x.Class,x.Type,x.Manufacturer,x.DlcName].filter(Boolean),raw:x,preview:(x.Name||x.ModelName)?`https://docs-backend.fivem.net/vehicles/${x.Name||x.ModelName}.webp`:null}));
case'objects':{let lines=raw.split(/\r?\n/).map(s=>s.trim()).filter(s=>s&&!s.startsWith(';')&&!s.startsWith('['));return lines.map((line,i)=>{let model=line.split(/[=,\s]/).filter(Boolean).pop();return{id:model||i,name:model,model,hash:joaat(model),category:'Object',tags:['Prop','Object'],raw:{Model:model,Hash:joaat(model)}}})}
case'scenarios':return raw.map((n,i)=>({id:n,name:n,model:n,category:C.scenarioCategory(n),tags:[C.scenarioCategory(n)],description:C.scenarioDescription(n),raw:{Scenario:n,Kategorie:C.scenarioCategory(n),Beschreibung:C.scenarioDescription(n)}}));
case'weapons':return raw.map((x,i)=>({id:x.Name||i,name:x.TranslatedLabel?.German||x.TranslatedLabel?.English||x.Name,model:x.Name,hash:x.Hash,category:x.Category||x.DamageType||'Weapon',tags:[x.Category,x.DamageType,x.DlcName].filter(Boolean),raw:x}));
case'animations':{let out=[];raw.forEach(d=>{let dict=d.Name||d.DictionaryName||d.Dict||'';let clips=d.Animations||d.Clips||d.Anims||[];(Array.isArray(clips)?clips:[]).forEach(a=>{let an=typeof a==='string'?a:(a.Name||a.AnimationName||JSON.stringify(a));out.push({id:dict+'|'+an,name:an,model:dict,category:'Animation',tags:['Animation'],raw:{Dictionary:dict,Animation:an}})});if(!clips.length)out.push({id:dict,name:dict,model:dict,category:'Animation Dictionary',raw:d})});return out}
case'clipsets':return raw.map((x,i)=>({id:x.Name||i,name:x.Name||String(x),model:x.Name||String(x),category:'Movement Clipset',tags:['Movement'],raw:x}));
case'particles':{let out=[];raw.forEach(d=>{const dict=d.Name||d.Dictionary||d.AssetName||'';const arr=d.Effects||d.ParticleEffects||d.Names||[];if(Array.isArray(arr)&&arr.length)arr.forEach(e=>out.push({id:dict+'|'+(e.Name||e),name:e.Name||String(e),model:dict,category:'Particle FX',raw:{Dictionary:dict,Effect:e.Name||e}}));else out.push(genericOne(d,dict||'Particle'))});return out}
default:return flattenGeneric(raw)} }
function genericOne(x,fallback){if(typeof x!=='object'||x===null)return{id:String(x),name:String(x),model:String(x),category:'Data',raw:{Value:x}};const name=x.Name||x.name||x.ModelName||x.Label||x.Type||x.Hash||fallback||'Entry';return{id:String(name),name:String(name),model:x.ModelName||x.Name||x.name||'',hash:x.Hash??x.hash,category:x.Category||x.Type||state.category?.label||'Data',tags:[x.Category,x.Type,x.DlcName].filter(Boolean),raw:x}}
function flattenGeneric(raw){if(Array.isArray(raw))return raw.flatMap((x,i)=>{if(typeof x==='object'&&x&&Object.keys(x).length===1){const k=Object.keys(x)[0];if(Array.isArray(x[k]))return x[k].map(v=>genericOne(v,k))}return[genericOne(x,i)]});if(raw&&typeof raw==='object')return Object.entries(raw).flatMap(([k,v])=>Array.isArray(v)?v.map(x=>genericOne(x,k)):[genericOne(typeof v==='object'?v:{Name:k,Value:v},k)]);return[genericOne(raw)]}
function filterOptions(){const cats=[...new Set(state.items.map(x=>x.category).filter(Boolean))].slice(0,18);$('#chips').innerHTML=['Alle',...cats].map(c=>`<button class="chip ${state.filter===c?'active':''}" data-filter="${esc(c)}">${esc(c)}</button>`).join('')}
function applyFilters(){const q=$('#search').value.trim().toLowerCase();let arr=state.items.filter(x=>{if(state.filter!=='Alle'&&x.category!==state.filter)return false;if(!q)return true;return searchText(x).includes(q)});const sort=$('#sortSelect').value;arr.sort((a,b)=>sort==='name-desc'?String(b.name).localeCompare(String(a.name)):sort==='hash'?(Number(a.hash)||0)-(Number(b.hash)||0):String(a.name).localeCompare(String(b.name)));state.filtered=arr;filterOptions();renderCards()}
function searchText(x){return [x.name,x.model,x.hash,x.category,x.description,...(x.tags||[]),safeStringify(x.raw)].join(' ').toLowerCase()}
function safeStringify(o){try{return JSON.stringify(o)}catch{return''}}
function initials(s){return String(s||'?').split(/[_\s-]+/).map(x=>x[0]).join('').slice(0,3).toUpperCase()}
function localPreviewFor(x){
 const id=state.category?.id; const model=String(x.model||x.name||'').toLowerCase().replace(/[^a-z0-9_.-]/g,'_');
 if(!model)return null;
 if(id==='peds')return `assets/previews/peds/${model}.webp`;
 if(id==='vehicles')return `assets/previews/vehicles/${model}.webp`;
 if(id==='objects')return `assets/previews/objects/${model}.webp`;
 if(id==='weapons')return `assets/previews/weapons/${model}.webp`;
 if(['blips','markers','checkpoints','assetlibrary','weaponmodels'].includes(id))return x.preview||x.remotePreview||null;
 return null;
}
function card(x){const fav=state.favorites.has(keyOf(x));const preview=localPreviewFor(x);let visual='';if(['blipcolors','hudcolors'].includes(state.category?.id))visual=`<div class="color-preview" style="background:${esc(x.color||'#fff')}"><span>${esc(x.color||'')}</span></div>`;else if(preview){const fb=x.remotePreview&&preview!==x.remotePreview?`this.onerror=null;this.src='${esc(x.remotePreview)}'`:"this.closest('.preview').classList.add('no-image');this.remove()";visual=`<img loading="lazy" src="${esc(preview)}" alt="${esc(x.name)}" onerror="${fb}">`}const sub=state.category?.id==='blips'?`Sprite ${x.id}`:state.category?.id==='markers'?`Type ${x.id}`:['blipcolors','hudcolors'].includes(state.category?.id)?`Color ${x.id} · ${x.color||''}`:(x.model||hex(x.hash)||x.id);return`<article class="card" data-key="${esc(x.id)}"><div class="preview">${visual}</div><button class="copy-mini" data-copy="${esc(x.model||x.name)}" title="Copy">⧉</button><div class="card-body"><div class="card-title">${fav?'★ ':''}${esc(x.name)}</div><div class="card-sub">${esc(sub)}</div><div class="badges"><span class="badge">${esc(x.category||'Data')}</span>${(x.tags||[]).slice(0,2).map(t=>`<span class="badge">${esc(t)}</span>`).join('')}</div><div class="card-actions"><button data-detail="${esc(x.id)}">Details</button><button data-copy="${esc(x.model||x.id)}">Copy</button></div></div></article>`}
function renderCards(){const visible=state.filtered.slice(0,state.limit);$('#cards').className='cards'+(state.view==='list'?' list':'');$('#cards').innerHTML=visible.length?visible.map(card).join(''):`<div class="empty">Keine Treffer für diese Suche.</div>`;$('#resultCount').textContent=`${state.filtered.length.toLocaleString('de-DE')} Treffer`;$('#moreBtn').classList.toggle('hidden',state.limit>=state.filtered.length)}
function keyOf(x){return `${state.category?.id||'x'}:${x.id}`}
function itemById(id){return state.items.find(x=>String(x.id)===String(id))}
function details(x){const fields=interestingFields(x.raw);const localPreview=localPreviewFor(x);let preview='';if(['blipcolors','hudcolors'].includes(state.category?.id))preview=`<div class="detail-hero color-hero" style="background:${esc(x.color||'#fff')}"><strong>${esc(x.color||'')}</strong></div>`;else if(localPreview){const fb=x.remotePreview&&localPreview!==x.remotePreview?`this.onerror=null;this.src='${esc(x.remotePreview)}'`:'this.parentElement.remove()';preview=`<div class="detail-hero"><img src="${esc(localPreview)}" onerror="${fb}"></div>`;}const code=codeFor(x);$('#drawerBody').innerHTML=`${preview}<div class="detail-content"><h2>${esc(x.name)}</h2><div class="detail-model">${esc(x.model||x.id)}</div>${x.description?`<p class="muted">${esc(x.description)}</p>`:''}<div class="detail-actions"><button class="primary" data-basket="${esc(x.id)}">+ Creator</button><button data-fav="${esc(x.id)}">${state.favorites.has(keyOf(x))?'★ Entfernen':'☆ Favorit'}</button><button data-copy="${esc(x.model||x.name)}">⧉ Model</button></div>${fields.map(([k,v])=>`<div class="field"><label>${esc(k)}</label><code>${esc(formatValue(v))}</code><button data-copy="${esc(formatValue(v))}">⧉</button></div>`).join('')}${code?`<h3>Quick Code</h3><div class="codebox"><button class="ghost" data-copy="${esc(code)}">Copy</button><pre>${esc(code)}</pre></div>`:''}</div>`;openDrawer()}
function interestingFields(raw){if(!raw||typeof raw!=='object')return[['Value',raw]];let out=[];for(const [k,v] of Object.entries(raw)){if(v===null||v===undefined||v===''||(Array.isArray(v)&&!v.length))continue;if(typeof v==='object'&& !Array.isArray(v)){const g=v.German||v.English||v.Name;if(g)out.push([k,g]);continue}if(Array.isArray(v)){if(v.length<=12&&v.every(z=>typeof z!=='object'))out.push([k,v.join(', ')]);continue}out.push([k,v]);if(out.length>=18)break}return out}
function formatValue(v){if(typeof v==='number'&&v>100000&&Number.isInteger(v))return `${v} · ${hex(v)}`;return String(v)}
function codeFor(x){const id=state.category?.id;if(id==='peds')return`local model = \`${x.model}\`\nRequestModel(model)\nwhile not HasModelLoaded(model) do Wait(0) end\n\nlocal ped = CreatePed(4, model, coords.x, coords.y, coords.z, heading, false, true)`;if(id==='vehicles')return`local model = \`${x.model}\`\nRequestModel(model)\nwhile not HasModelLoaded(model) do Wait(0) end\n\nlocal vehicle = CreateVehicle(model, coords.x, coords.y, coords.z, heading, true, false)`;if(id==='objects')return`local model = \`${x.model}\`\nRequestModel(model)\nwhile not HasModelLoaded(model) do Wait(0) end\n\nlocal object = CreateObject(model, coords.x, coords.y, coords.z, true, true, false)`;if(id==='scenarios')return`TaskStartScenarioInPlace(ped, "${x.name}", 0, true)`;if(id==='weapons')return`GiveWeaponToPed(ped, \`${x.model}\`, 120, false, true)`;if(id==='animations'&&x.raw.Dictionary&&x.raw.Animation)return`RequestAnimDict("${x.raw.Dictionary}")\nwhile not HasAnimDictLoaded("${x.raw.Dictionary}") do Wait(0) end\nTaskPlayAnim(ped, "${x.raw.Dictionary}", "${x.raw.Animation}", 8.0, -8.0, -1, 1, 0.0, false, false, false)`;if(id==='blips')return`local blip = AddBlipForCoord(coords.x, coords.y, coords.z)\nSetBlipSprite(blip, ${x.id})\nSetBlipColour(blip, 17)\nSetBlipScale(blip, 0.85)`;if(id==='blipcolors')return`SetBlipColour(blip, ${x.id}) -- ${x.name}`;if(id==='markers')return`DrawMarker(${x.id}, coords.x, coords.y, coords.z, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 255, 122, 0, 180, false, true, 2, false, nil, nil, false)`;if(id==='checkpoints')return`local checkpoint = CreateCheckpoint(${String(x.id).startsWith('44-')?'44':x.id}, coords.x, coords.y, coords.z, nextCoords.x, nextCoords.y, nextCoords.z, 2.0, 255, 122, 0, 180, ${String(x.id).startsWith('44-')?String(x.id).split('-')[1]:'0'})`;if(id==='hudcolors')return`local r, g, b, a = GetHudColour(${x.id}) -- ${x.name}`;if(id==='controls')return`if IsControlJustPressed(0, ${x.id}) then\n    -- ${x.name}\nend`;if(id==='pickups')return`local pickupHash = GetHashKey('${x.name}') -- ${x.hash}`;if(id==='weaponmodels')return`local weapon = GetHashKey('${x.hash||x.name}') -- ${x.name}`;if(id==='assetlibrary')return`${x.assetPath||x.model||x.name}`;if(id==='clipsets')return`RequestAnimSet("${x.model}")\nwhile not HasAnimSetLoaded("${x.model}") do Wait(0) end\nSetPedMovementClipset(ped, "${x.model}", 0.25)`;return''}
function openDrawer(){ $('#drawer').classList.add('open');$('#backdrop').classList.add('open') }function closeDrawer(){ $('#drawer').classList.remove('open');$('#backdrop').classList.remove('open') }
function addBasket(x){const type=state.category?.id||'data';const k=type+':'+x.id;if(state.basket.some(z=>z.key===k)){toast('Bereits im Creator Basket');return}state.basket.push({key:k,type,name:x.name,model:x.model,hash:x.hash});save();toast('Zum Creator Basket hinzugefügt')}
function showCreator(){const rows=state.basket.map((x,i)=>`<div class="field"><label>${esc(x.type)}</label><code>${esc(x.model||x.name)}</code><button data-remove-basket="${i}">×</button></div>`).join('')||'<p class="muted">Noch nichts gesammelt. Öffne einen Datensatz und klicke „+ Creator“.</p>';const lua=creatorCode();$('#drawerBody').innerHTML=`<div class="detail-content"><div class="eyebrow">CREATOR MODE</div><h2>Creator Basket</h2><p class="muted">Sammle Ped, Vehicle, Prop, Scenario und Weapon und generiere daraus Copy-Paste-Code.</p>${rows}<div class="detail-actions"><button data-clear-basket>Leeren</button></div>${lua?`<h3>Generated Lua</h3><div class="codebox"><button class="ghost" data-copy="${esc(lua)}">Copy</button><pre>${esc(lua)}</pre></div>`:''}</div>`;openDrawer()}
function creatorCode(){const find=t=>state.basket.find(x=>x.type===t);const p=find('peds'),v=find('vehicles'),o=find('objects'),s=find('scenarios'),w=find('weapons');let a=['-- Ruhrline GTA Data Explorer · Creator output'];if(p){a.push(`local pedModel = \`${p.model}\``,`RequestModel(pedModel)`,`while not HasModelLoaded(pedModel) do Wait(0) end`,`local ped = CreatePed(4, pedModel, coords.x, coords.y, coords.z, heading, false, true)`)}if(s)a.push(`TaskStartScenarioInPlace(ped, "${s.model||s.name}", 0, true)`);if(w)a.push(`GiveWeaponToPed(ped, \`${w.model}\`, 120, false, true)`);if(v)a.push(`local vehicle = CreateVehicle(\`${v.model}\`, coords.x, coords.y, coords.z, heading, true, false)`);if(o)a.push(`local object = CreateObject(\`${o.model}\`, coords.x, coords.y, coords.z, true, true, false)`);return a.length>1?a.join('\n'):''}
function showFavorites(){const favs=[];for(const [cat,items] of state.cache.entries())for(const x of items)if(state.favorites.has(`${cat}:${x.id}`))favs.push({cat,x});$('#drawerBody').innerHTML=`<div class="detail-content"><div class="eyebrow">LOCAL STORAGE</div><h2>★ Favoriten</h2><p class="muted">Bleiben lokal in diesem Browser gespeichert.</p>${favs.length?favs.map(({cat,x})=>`<div class="field"><label>${esc(cat)}</label><code>${esc(x.model||x.name)}</code><button data-copy="${esc(x.model||x.name)}">⧉</button></div>`).join(''):'<p class="muted">Noch keine Favoriten in bereits geladenen Kategorien.</p>'}</div>`;openDrawer()}
document.addEventListener('click',e=>{const t=e.target.closest('button,[data-open]');if(!t)return;if(t.dataset.home!==undefined){dashboard();return}if(t.dataset.cat){openCategory(t.dataset.cat);if(innerWidth<760)$('#sidebar').classList.remove('open');return}if(t.dataset.open){openCategory(t.dataset.open);return}if(t.dataset.copy!==undefined){e.stopPropagation();copy(t.dataset.copy);return}if(t.dataset.detail){const x=itemById(t.dataset.detail);if(x)details(x);return}if(t.dataset.filter){state.filter=t.dataset.filter;applyFilters();return}if(t.dataset.basket){const x=itemById(t.dataset.basket);if(x)addBasket(x);return}if(t.dataset.fav){const x=itemById(t.dataset.fav);if(x){const k=keyOf(x);state.favorites.has(k)?state.favorites.delete(k):state.favorites.add(k);save();details(x)}return}if(t.dataset.removeBasket!==undefined){state.basket.splice(Number(t.dataset.removeBasket),1);save();showCreator();return}if(t.hasAttribute('data-clear-basket')){state.basket=[];save();showCreator();return}if(t.dataset.action==='show-creator'){showCreator();return}if(t.dataset.action==='show-favorites'){showFavorites();return}})
$('#search').addEventListener('input',()=>state.category&&applyFilters());$('#sortSelect').addEventListener('change',applyFilters);$('#moreBtn').addEventListener('click',()=>{state.limit+=120;renderCards()});$('#viewBtn').addEventListener('click',()=>{state.view=state.view==='grid'?'list':'grid';renderCards()});$('#drawerClose').onclick=closeDrawer;$('#backdrop').onclick=closeDrawer;$('#menuBtn').onclick=()=>$('#sidebar').classList.toggle('open');document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#search').focus()}if(e.key==='Escape')closeDrawer()});
renderNav();dashboard();save();
})();
