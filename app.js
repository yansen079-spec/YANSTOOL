const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const root=document.documentElement;
const saved=localStorage.getItem('theme'); if(saved) root.dataset.theme=saved;
$('#themeToggle').textContent=root.dataset.theme==='dark'?'☀️':'🌙';
$('#themeToggle').onclick=()=>{const d=root.dataset.theme==='dark'; root.dataset.theme=d?'light':'dark';localStorage.setItem('theme',root.dataset.theme);$('#themeToggle').textContent=d?'🌙':'☀️'};
$('#year').textContent=new Date().getFullYear();

$('#searchInput').addEventListener('input',e=>{const q=e.target.value.toLowerCase();$$('.card').forEach(c=>c.style.display=c.dataset.name.includes(q)?'block':'none')});
$$('.filter').forEach(b=>b.onclick=()=>{$$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');const f=b.dataset.filter;$$('.card').forEach(c=>c.style.display=(f==='all'||c.dataset.cat===f)?'block':'none')});

const dlg=$('#toolDialog'), body=$('#toolBody'), title=$('#dialogTitle'); $('#closeDialog').onclick=()=>dlg.close();
const money=n=>new Intl.NumberFormat('id-ID').format(Number(n||0));
function show(name,html,setup){title.textContent=name;body.innerHTML=html;dlg.showModal(); if(setup) setup();}

const tools={
 gpa(){show('IPK Calculator',`<div id="courses"><div class="row"><div class="field"><label>SKS</label><input class="sks" type="number" value="3"></div><div class="field"><label>Nilai (0-4)</label><input class="grade" type="number" step="0.01" value="4"></div></div></div><button id="addCourse" class="btn ghost">+ Mata Kuliah</button> <button id="calcGpa" class="btn primary">Hitung</button><div id="gpaRes" class="result-box">IP: -</div>`,()=>{$('#addCourse').onclick=()=>$('#courses').insertAdjacentHTML('beforeend',`<div class="row"><div class="field"><label>SKS</label><input class="sks" type="number" value="3"></div><div class="field"><label>Nilai (0-4)</label><input class="grade" type="number" step="0.01" value="3.5"></div></div>`);$('#calcGpa').onclick=()=>{let pts=0,sks=0;$$('.sks').forEach((x,i)=>{let s=+x.value||0,g=+$$('.grade')[i].value||0;sks+=s;pts+=s*g});$('#gpaRes').textContent='IP: '+(sks?pts/sks:0).toFixed(2)}})},
 percentage(){show('Percentage Calculator',`<div class="row"><div class="field"><label>Nilai</label><input id="pA" type="number"></div><div class="field"><label>Dari</label><input id="pB" type="number"></div></div><button id="pCalc" class="btn primary">Hitung</button><div id="pRes" class="result-box">Hasil: -</div>`,()=>$('#pCalc').onclick=()=>$('#pRes').textContent='Hasil: '+((+$('#pA').value/(+$('#pB').value||1))*100).toFixed(2)+'%')},
 discount(){show('Discount Calculator',`<div class="field"><label>Harga awal</label><input id="dPrice" type="number"></div><div class="field"><label>Diskon (%)</label><input id="dPct" type="number"></div><button id="dCalc" class="btn primary">Hitung</button><div id="dRes" class="result-box">Harga akhir: -</div>`,()=>$('#dCalc').onclick=()=>{let p=+$('#dPrice').value||0,d=+$('#dPct').value||0;$('#dRes').textContent='Harga akhir: Rp'+money(p*(1-d/100))})},
 wordcount(){show('Word Counter',`<div class="field"><label>Teks</label><textarea id="wText" rows="8"></textarea></div><div id="wRes" class="result-box">Kata: 0 • Karakter: 0 • Kalimat: 0</div>`,()=>$('#wText').oninput=e=>{let t=e.target.value.trim(),w=t?t.split(/\s+/).length:0,s=t?(t.match(/[.!?]+/g)||[]).length:0;$('#wRes').textContent=`Kata: ${w} • Karakter: ${e.target.value.length} • Kalimat: ${s} • Baca: ~${Math.max(1,Math.ceil(w/200))} menit`})},
 case(){show('Case Converter',`<div class="field"><textarea id="cText" rows="7" placeholder="Masukkan teks"></textarea></div><div class="row"><button id="upper" class="btn ghost">UPPERCASE</button><button id="lower" class="btn ghost">lowercase</button><button id="titlecase" class="btn primary">Title Case</button></div>`,()=>{$('#upper').onclick=()=>$('#cText').value=$('#cText').value.toUpperCase();$('#lower').onclick=()=>$('#cText').value=$('#cText').value.toLowerCase();$('#titlecase').onclick=()=>$('#cText').value=$('#cText').value.toLowerCase().replace(/\b\w/g,m=>m.toUpperCase())})},
 random(){show('Random Name Picker',`<div class="field"><label>Satu nama per baris</label><textarea id="rNames" rows="7"></textarea></div><button id="rPick" class="btn primary">Pilih Acak 🎲</button><div id="rRes" class="result-box">Pemenang: -</div>`,()=>$('#rPick').onclick=()=>{let a=$('#rNames').value.split('\n').map(x=>x.trim()).filter(Boolean);$('#rRes').textContent='Pemenang: '+(a.length?a[Math.floor(Math.random()*a.length)]:'-')})},
 password(){show('Password Generator',`<div class="field"><label>Panjang</label><input id="pwLen" type="number" min="6" max="64" value="16"></div><button id="pwGen" class="btn primary">Generate</button><div id="pwRes" class="result-box">-</div>`,()=>$('#pwGen').onclick=()=>{let chars='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*';let n=Math.min(64,Math.max(6,+$('#pwLen').value||16)),o='';crypto.getRandomValues(new Uint32Array(n)).forEach(v=>o+=chars[v%chars.length]);$('#pwRes').textContent=o})},
 storage(){show('Storage Converter',`<div class="row"><div class="field"><label>Nilai</label><input id="sVal" type="number"></div><div class="field"><label>Dari</label><select id="sFrom"><option>KB</option><option>MB</option><option>GB</option><option>TB</option></select></div></div><div class="field"><label>Ke</label><select id="sTo"><option>MB</option><option>KB</option><option>GB</option><option>TB</option></select></div><button id="sCalc" class="btn primary">Konversi</button><div id="sRes" class="result-box">Hasil: -</div>`,()=>$('#sCalc').onclick=()=>{let m={KB:1,MB:1024,GB:1024**2,TB:1024**3};let v=+$('#sVal').value||0;$('#sRes').textContent='Hasil: '+(v*m[$('#sFrom').value]/m[$('#sTo').value]).toLocaleString('id-ID',{maximumFractionDigits:8})+' '+$('#sTo').value})}
};
$$('.open-tool').forEach(b=>b.onclick=()=>tools[b.dataset.tool]());

$('#aiRun').onclick=async()=>{
  const input=$('#aiInput').value.trim(); if(!input){$('#aiResult').textContent='Masukkan teks dulu.';return}
  $('#aiResult').textContent='Memproses...';
  try{
    const r=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode:$('#aiMode').value,input})});
    if(!r.ok) throw new Error('AI belum terhubung');
    const data=await r.json(); $('#aiResult').textContent=data.output||'Tidak ada hasil.';
  }catch(e){$('#aiResult').textContent='Yan AI belum disambungkan ke provider. Tools biasa tetap bisa digunakan sepenuhnya.'}
};