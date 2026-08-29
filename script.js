const products=[
 {title:'사랑에 대하여',type:'모카번',flavor:'커스터드맛',price:'3,700원',drink:'아메리카노',quote:'사랑은 설명하는 것이 아니라, 한 번 더 꺼내 보는 것.',color:'mocha',image:'https://blog.kakaocdn.net/dna/bcdGAs/dJMcabMeU4u/AAAAAAAAAAAAAAAAAAAAADcIb9_tCboWpu6YgynfLWiyekemtis9aQ7HkX_MbMPn/img.jpg?allow_ip=&allow_referer=&credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1788188399&signature=Mcilu9mWQyZv2%2Bv0W%2BH2x4od9g%3D'},
 {title:'늑대처럼 싱싱하게 울고 싶었다',type:'깨찰빵',flavor:'솔티밀크맛',price:'2,700원',drink:'차가운 우유',quote:'싱싱하게 울고 싶은 날엔, 짭조름한 한 입이면 충분하니까.',color:'',image:'https://blog.kakaocdn.net/dna/dnOLzI/dJMcagmkiWU/AAAAAAAAAAAAAAAAAAAAAGe9WEKt5Uh7szjgfm4STZbTNZaNeBhJd4qvYX0CtHdC/img.jpg?allow_ip=&allow_referer=&credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1788188399&signature=iQynTLJYpG6gxAvZj7iyTwIJ8L8%3D'},
 {title:'오만과 편견',type:'모카번',flavor:'우유크림맛',price:'3,700원',drink:'라떼',quote:'첫인상은 달콤하고, 마지막은 생각보다 오래 남습니다.',color:'mocha',image:'https://blog.kakaocdn.net/dna/bcdGAs/dJMcabMeU4u/AAAAAAAAAAAAAAAAAAAAADcIb9_tCboWpu6YgynfLWiyekemtis9aQ7HkX_MbMPn/img.jpg?allow_ip=&allow_referer=&credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1788188399&signature=Mcilu9mWQyZv2%2Bv0W%2BH2x4od9g%3D'},
 {title:'나쁜 소년이 서 있다',type:'깨찰빵',flavor:'커스터드맛',price:'2,700원',drink:'콜드브루',quote:'조금 삐딱한 오후에도, 부드러운 크림은 필요하니까.',color:'',image:'https://blog.kakaocdn.net/dna/dnOLzI/dJMcagmkiWU/AAAAAAAAAAAAAAAAAAAAAGe9WEKt5Uh7szjgfm4STZbTNZaNeBhJd4qvYX0CtHdC/img.jpg?allow_ip=&allow_referer=&credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1788188399&signature=iQynTLJYpG6gxAvZj7iyTwIJ8L8%3D'}
];
products[0].image='bread-custard-mocha.png';
products[1].image='bread-solti-milk.png';
products[2].image='bread-milk-mocha.png';
products[3].image='bread-custard-chechal.png';
const grid=document.querySelector('#product-grid'),panel=document.querySelector('#detail-panel'),quote=document.querySelector('#detail-quote'),meta=document.querySelector('#detail-meta');
products.forEach((product,i)=>{const card=document.createElement('article');card.className='product-card';card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-label',`${product.title} 상세 보기`);card.innerHTML=`<div class="product-visual"><span class="product-index">0${i+1}</span><img class="product-photo" src="${product.image}" alt="${product.title} ${product.type} ${product.flavor} 제품 사진" loading="lazy" /><div class="photo-credit">GS25 / MINUMSA</div></div><div><div class="product-type">${product.type} / ${product.flavor}</div><h3>${product.title}</h3><div class="product-flavor">추천 음료 · ${product.drink}</div></div><div class="product-price">${product.price}</div>`;const select=()=>{document.querySelectorAll('.product-card').forEach(c=>c.classList.remove('active'));card.classList.add('active');quote.textContent=`“${product.quote}”`;meta.textContent=`${product.title}  ·  ${product.type} ${product.flavor}  ·  ${product.price}  ·  ${product.drink}와 함께`;panel.scrollIntoView({behavior:'smooth',block:'nearest'});};card.addEventListener('click',select);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select()}});grid.appendChild(card)});
document.querySelector('#close-detail').addEventListener('click',()=>{document.querySelectorAll('.product-card').forEach(c=>c.classList.remove('active'));quote.textContent='제품 카드를 선택하면 오늘의 문장이 나타납니다.';meta.textContent=''});

const stores=[
 {name:'GS25 문학로점',address:'서울 종로구 문학로 25',lat:37.581,lon:126.982,stock:[2,0,1,3]},
 {name:'GS25 북촌마루점',address:'서울 종로구 북촌로 18',lat:37.5828,lon:126.985,stock:[0,1,0,2]},
 {name:'GS25 서촌책방점',address:'서울 종로구 자하문로 41',lat:37.578,lon:126.968,stock:[1,2,0,0]},
 {name:'GS25 청계문고점',address:'서울 종로구 청계천로 77',lat:37.569,lon:126.979,stock:[3,1,2,1]}
];
const mapEl=document.querySelector('#store-map'),storeList=document.querySelector('#store-list'),searchInput=document.querySelector('#store-search');
const productShort=['사랑에 대하여','늑대처럼 싱싱하게','오만과 편견','나쁜 소년이 서 있다'];
function stockLabel(count){return count?`재고 ${count}개`:'품절'}
function renderStores(keyword=''){const filtered=stores.filter(s=>(s.name+s.address).includes(keyword));document.querySelector('#store-count').textContent=`주변 매장 ${filtered.length}곳`;storeList.innerHTML=filtered.map((s,i)=>`<button class="store-item" data-index="${stores.indexOf(s)}"><span class="store-pin">${i+1}</span><span class="store-info"><strong>${s.name}</strong><small>${s.address}</small><span class="stock-row">${s.stock.map((n,j)=>`<em class="${n?'in-stock':'sold-out'}">${productShort[j]} · ${stockLabel(n)}</em>`).join('')}</span></span><span class="store-arrow">›</span></button>`).join('')||'<p class="empty-stores">검색 결과가 없습니다.</p>';document.querySelectorAll('.store-item').forEach(item=>item.addEventListener('click',()=>{const s=stores[Number(item.dataset.index)];map.setView([s.lat,s.lon],16);markers[Number(item.dataset.index)].openPopup()}))}
let map,markers=[];
if(window.L&&mapEl){map=L.map(mapEl,{zoomControl:false}).setView([37.576,126.979],14);L.control.zoom({position:'bottomright'}).addTo(map);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors'}).addTo(map);markers=stores.map((s,i)=>L.marker([s.lat,s.lon],{icon:L.divIcon({className:'custom-pin',html:`<span>${i+1}</span>`,iconSize:[30,30],iconAnchor:[15,30]})}).addTo(map).bindPopup(`<strong>${s.name}</strong><br /><small>${s.address}</small><br /><b>문학빵 ${s.stock.reduce((a,b)=>a+b,0)}개</b>`));}
renderStores();
searchInput?.addEventListener('input',e=>renderStores(e.target.value.trim()));
document.querySelector('#locate-me')?.addEventListener('click',()=>{if(!navigator.geolocation){alert('이 브라우저에서는 위치 기능을 사용할 수 없습니다.');return}navigator.geolocation.getCurrentPosition(pos=>{if(map)map.setView([pos.coords.latitude,pos.coords.longitude],14)},()=>alert('현재 위치를 확인할 수 없습니다. 브라우저 위치 권한을 허용해 주세요.'))});
const conceptImage='bookmark-concept.png';
const heroImage=document.querySelector('.hero-art img');
if(heroImage){heroImage.src=conceptImage;heroImage.alt='민음사 문학빵과 랜덤 책갈피 컨셉 이미지'}
const bookmarkVisual=document.querySelector('.bookmark-visual');
if(bookmarkVisual){bookmarkVisual.innerHTML=`<img class="bookmark-photo" src="${conceptImage}" alt="문학빵 랜덤 책갈피 이미지" />`}
