const drop = document.querySelectorAll('.drop')
const dropdown = document.getElementById('dropdown')
const menu = document.getElementById('menu')
const logos = document.getElementById('logos')



let show =false;
drop.forEach((elem)=>{
    elem.addEventListener('click',()=>{
        if (show) {
            dropdown.classList.add('hidden')
            show=false;
            
        }
        else{
            dropdown.classList.remove('hidden')
            show=true;
            dropdown.style.right='5%'
        }
    })
})

if (parseInt(getComputedStyle(document.body).width)<700) {
        menu.classList.remove('fa-2x')
        menu.classList.add('fa-3x')
        logos.classList.remove('fa-4x')
        logos.classList.add('fa-3x')
}



const gallery = document.getElementById('gallery')

let bestphoto=`
<div class="card w-2 h-1">
                <img src="https://cdn.pixabay.com/photo/2021/10/14/13/50/book-6709160__340.jpg">
                <div class="caption">
                    <p>hey how are you</p>
                    <div class="like"><span>23</span><span><i class="far fa-thumbs-up"></i></span><span>23</span><span><i class="fas fa-comments"></i></span></div>        
                </div>
            </div>
            <div class="card w-3 h-1">
                <img src="https://cdn.pixabay.com/photo/2021/10/09/23/40/people-6695318__340.jpg">
                <div class="caption">
                    <p>hey  red  go</p>
                    <div class="like"><span>23</span><span><i class="far fa-thumbs-up"></i></span><span>23</span><span><i class="fas fa-comments"></i></span></div>
                </div>
            </div>
            <div class="card w-2 h-2">
                <img src="https://cdn.pixabay.com/photo/2021/03/30/19/22/orange-breasted-sunbird-6137612__340.jpg">
                <div class="caption">
                    <p>hey</p>
                    <div class="like"><span>23</span><span><i class="far fa-thumbs-up"></i></span><span>23</span><span><i class="fas fa-comments"></i></span></div>
                </div>
            </div>
            <div class="card  ">
                <img src="https://cdn.pixabay.com/photo/2021/08/07/08/50/staircase-6528080__340.jpg">
                <div class="caption">
                    <p>hey</p>
                    <div class="like"><span>23</span><span><i class="far fa-thumbs-up"></i></span><span>23</span><span><i class="fas fa-comments"></i></span></div>
                </div>
            </div>
            <div class="card">
                <img src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg">
                <div class="caption">
                    <p>hey</p>
                    <div class="like"><span>23</span><span><i class="far fa-thumbs-up"></i></span><span>23</span><span><i class="fas fa-comments"></i></span></div>
                </div>
            </div>
`;
gallery.innerHTML=bestphoto;


const input =document.getElementById('input')
const statue =document.getElementById('statue')
const icon =document.getElementById('searchicon')
const modalimg =document.getElementById('modal-img')
const modal =document.getElementById('modal')
let lastvalue,ready=true;
let i=1;


icon.addEventListener('click',req)

async function req() {
    
    lastvalue=input.value;
    let find = encodeURIComponent(input.value)  
    if (find.length) {
        statue.textContent=`you are searching for "${find}"`

    let response =await fetch(`https://pixabay.com/api/?key=23676200-6508963c3a3d198c31689fd21&q=${find}&image_type=photo&page=1&per_page=20`);
     i=1;   
    let images = await response.json();
    console.log(lastvalue);
    console.log(images.hits);
    gallery.innerHTML='';
        if (images.hits.length) {
            for (let item of images.hits){
        let randomx = Math.floor((Math.random()*2)+1)
        let randomy = Math.floor((Math.random()*2)+1)
        gallery.innerHTML+=`
        <div class="card w-${randomx} h-${randomy}">
                <img src=${item.largeImageURL}>
                <div class="caption">
                    <p>${item.tags}</p>
                    <div class="like"><span>${item.likes}</span><span><i class="far fa-thumbs-up"></i></span><span>${item.comments}</span><span><i class="fas fa-comments"></i></span></div>        
                </div>
            </div>
        `
    }

    const card = document.querySelectorAll('.card img');
         card.forEach((elem)=>{
             elem.addEventListener('click',(e)=>{
                let l = e.target;
                modalimg.setAttribute('src',l.getAttribute('src'));
                modal.classList.remove('hidden')

             })
         })
        }
        else{
            gallery.innerHTML=`<h1 id='nothing'>nothing found....</h1>`;
            
        }

    
    }
    else{
        statue.textContent='best photo of week';
        gallery.innerHTML=bestphoto;
    }

}


window.addEventListener('scroll',scrollreq)

    


async function scrollreq() {
        const elem =document.documentElement;
        let find=input.value;
        
       if(find.length){ 
           if (elem.scrollTop+elem.clientHeight>=elem.scrollHeight) {
             if (i<10) {
                 i++;
          let response =await fetch(`https://pixabay.com/api/?key=23676200-6508963c3a3d198c31689fd21&q=${find}&image_type=photo&page=${i}`); 
         let images = await response.json();
         console.log(images.hits);
             if (images.hits.length) {
                 for (let item of images.hits){
             let randomx = Math.floor((Math.random()*2)+1)
             let randomy = Math.floor((Math.random()*2)+1)
             gallery.innerHTML+=`
             <div class="card w-${randomx} h-${randomy}">
                     <img src=${item.largeImageURL}>
                     <div class="caption">
                         <p>${item.tags}</p>
                         <div class="like"><span>${item.likes}</span><span><i class="far fa-thumbs-up"></i></span><span>${item.comments}</span><span><i class="fas fa-comments"></i></span></div>        
                     </div>
                 </div>
             `
         }
         const card = document.querySelectorAll('.card img');
         card.forEach((elem)=>{
             elem.addEventListener('click',(e)=>{
                let l = e.target;
                modalimg.setAttribute('src',l.getAttribute('src'));
                modal.classList.remove('hidden')

             })
         })
         
             }
             else{
                gallery.innerHTML+=`<h1 id='nothing'>no more found....</h1>`;
                i=11;
                
            }
            
                 
             }
     }}
}

modal.addEventListener('click',(e)=>{
    if (e.target!=modalimg) {
        modal.classList.add('hidden') 
    }
    
})
const button = document.getElementById('button')
const searchbox = document.getElementById('searchbox')

button.addEventListener('click',()=>{
    window.scrollTo({
        top:searchbox.getBoundingClientRect().top+window.scrollY,
        left:0,
    })

})