const navMenu = document.getElementById('nav-menu'),
    navToggle=document.getElementById('nav-toggle'),
    navClose=document.getElementById('nav-close')
if(navToggle){
    navToggle.addEventListener('click',()=>{
        navMenu.classList.add('show-menu')
    })
}
if(navClose){
    navClose.addEventListener('click',()=>{
        navMenu.classList.remove('show-menu')
    })
}
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')

}
navLink.forEach(n => n.addEventListener('click', linkAction))
//swiper
let swiper = new Swiper(".projects__container", {
    loop: true,
    spacebetween:24,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    breakpoints: {
        1200: {
          slidesPerView: 2,
          spaceBetween: -56,
        },
    
      },
});

//swiper testimonial
let swiperTestimonial = new Swiper(".testimonial__container", {
  grabCursor:true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
//email
const contactForm=document.getElementById('contact-form'),
      contactName=document.getElementById('contact-name'),
      contactEmail=document.getElementById('contact-email'),
      contactProject=document.getElementById('contact-project'),
      contactMessage=document.getElementById('contact-message')
      
const sendEmail=(e)=>{
  if(!contactForm || !contactName || !contactEmail || !contactProject || !contactMessage) return;
  
  e.preventDefault()
  if(contactName.value ===''|| contactEmail.value === '' || contactProject.value===''){
    //add and remove color
    contactMessage.classList.remove('color-blue')
    contactMessage.classList.add('color-red')
    //write message
    contactMessage.textContent = 'write all content'
  }else{
    emailjs.sendForm('service_y6o2w8k','template_vxezlup','#contact-form','jXsjSRyJHlJHNb6U_')
    .then(()=>{
      contactMessage.classList.add('color-blue')
      contactMessage.textContent="message sent"
      setTimeout(()=>{
        contactMessage.textContent=''
      },5000)
    },(error) =>{
      alert('something went wrong', error)
    })
    contactName.value=''
    contactEmail.value=''
    contactProject.value=''
  }
}

if(contactForm) {
  contactForm.addEventListener('submit', sendEmail)
}
//scroll

const sections= document.querySelectorAll('section[id]')
const scrollActive = () =>{
  const scrollY = window.pageYOffset
  sections.forEach(current=>{
    const sectionHeight=current.offsetHeight,
    sectionTop=current.offsetTop-58,
    sectionId=current.getAttribute('id'),
    sectionClass=document.querySelector('.nav__menu a[href*="' + sectionId + '"]')
    if(sectionClass){
      if(scrollY>sectionTop && scrollY<=sectionTop+sectionHeight){
        sectionClass.classList.add('active-link')
      }else{
        sectionClass.classList.remove('active-link')
      }
    }
  })
}
window.addEventListener('scroll',scrollActive)
//scroll up
const scrollUp=()=>{
  const scrollUp=document.getElementById('scroll-up')
  this.scrollY>=350?scrollUp.classList.add('show-scroll')
                            :scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll',scrollUp)
//color change theme
const themeButton=document.getElementById('theme-button')
const darkTheme='dark-theme'
const iconTheme='ri-sun-line'

const selectedTheme=localStorage.getItem('selected-theme')
const selectedIcon=localStorage.getItem('selected-icon')

const getCurrentTheme=()=>document.body.classList.contains(darkTheme)?'dark':'light'
const getCurrentItem=()=>themeButton.classList.contains(iconTheme)?'ri-moon-line' : 'ri-sun-line'
if(selectedTheme){
  document.body.classList[selectedTheme==='dark'?'add':'remove'](darkTheme)
  themeButton.classList[selectedIcon==='ri-moon-line'?'add':'remove'](iconTheme)
}
themeButton.addEventListener('click',()=>{
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)

  localStorage.setItem('selected-theme',getCurrentTheme())
  localStorage.setItem('selected-item',getCurrentItem())
})
//change background header
const scrollHeader =() =>{
  const header = document.getElementById('header')
  this.screenY>=50?header.classList.add('bg-header')
                            :header.classList.remove('bg-header')
}
window.addEventListener('scroll',scrollHeader)
//scroll reveal animation
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
 // reset:true

})
sr.reveal(`.home__data, .projects__container, .testimonial__container, .footer__container`)
sr.reveal(`.home__info div`, {delay: 600, origin: 'bottom', interval: 100})
sr.reveal(`.skills__content:nth-child(1), .contact__content:nth-child(1)`, { origin: 'left'})
sr.reveal(`.skills__content:nth-child(2), .contact__content:nth-child(2)`, { origin: 'right'})
sr.reveal(`.qualification__content, .services__card, .box-container`, { interval: 100})

// Counter animation for home__info-number
function animateCounter() {
  const numberElements = document.querySelectorAll('.home__info-number');
  
  numberElements.forEach(element => {
    const targetValue = parseInt(element.getAttribute('data-target'));
    let currentValue = 0;
    const increment = Math.ceil(targetValue / 50); // Number of steps
    const duration = 5000; // Animation duration in milliseconds
    const stepDuration = duration / (targetValue / increment);
    
    const counter = setInterval(() => {
      if (currentValue < targetValue) {
        currentValue += increment;
        if (currentValue > targetValue) {
          currentValue = targetValue;
        }
        element.textContent = currentValue + '+';
      } else {
        clearInterval(counter);
      }
    }, stepDuration);
  });
}

// Run animation when page loads
window.addEventListener('load', animateCounter);

// Optional: Run animation again when scrolling to home section
const homeSection = document.getElementById('home');
let hasAnimated = false;

const observerOptions = {
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasAnimated) {
      animateCounter();
      hasAnimated = true;
    }
  });
}, observerOptions);

if (homeSection) {
  observer.observe(homeSection);
}
const filterButtons = document.querySelectorAll('.skills-chip');
const skillCards = document.querySelectorAll('.skill-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    // active state on buttons
    filterButtons.forEach(b => b.classList.remove('skills-chip--active'));
    btn.classList.add('skills-chip--active');

    // show/hide cards
    skillCards.forEach(card => {
      const category = card.dataset.skillCategory;

      if (filter === 'all' || category === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
const grid = document.querySelector(".skills-grid");
const cards = Array.from(document.querySelectorAll(".skill-card"));
const filterButtons1 = document.querySelectorAll(".skills-chip");
const viewMoreBtn = document.getElementById("view-more-btn");

const MAX_VISIBLE = 10; // how many to show in "All Skills" collapsed state

let expanded = false;
let currentFilter = "all"; // default

function applyFilter(filter) {
  currentFilter = filter;

  // Find cards that match the filter
  const matchingCards = cards.filter(card => {
    const category = card.dataset.skillCategory;
    if (filter === "all") return true;
    return category === filter;
  });

  // First hide everything
  cards.forEach(card => {
    card.style.display = "none";
  });

  // Now decide what to show
  if (filter === "all") {
    // All skills tab → respect expanded state & limit
    if (!expanded) {
      // show only first MAX_VISIBLE
      matchingCards.forEach((card, index) => {
        if (index < MAX_VISIBLE) {
          card.style.display = "flex";
        }
      });
    } else {
      // expanded: show all matching (which is all cards here)
      matchingCards.forEach(card => {
        card.style.display = "flex";
      });
    }

    // Show/hide View More depending on count
    if (matchingCards.length > MAX_VISIBLE) {
      viewMoreBtn.style.display = "block";
      viewMoreBtn.disabled = false;
    } else {
      viewMoreBtn.style.display = "none";
    }

  } else {
    // Specific tab (frontend, backend, etc.) → show all matching
    matchingCards.forEach(card => {
      card.style.display = "flex";
    });

    // Hide / disable View More on non-"all" tabs
    viewMoreBtn.style.display = "none";
    expanded = false;
    viewMoreBtn.textContent = "View More";
  }
}

/* --- VIEW MORE / VIEW LESS --- */
viewMoreBtn.addEventListener("click", () => {
  if (currentFilter !== "all") return; // safety

  expanded = !expanded;

  if (expanded) {
    viewMoreBtn.textContent = "View Less";
  } else {
    viewMoreBtn.textContent = "View More";
  }

  applyFilter(currentFilter);
});

/* --- FILTER BUTTONS --- */
filterButtons1.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    // Toggle active class
    filterButtons1.forEach(b => b.classList.remove("skills-chip--active"));
    btn.classList.add("skills-chip--active");

    // Reset view more state
    expanded = false;
    viewMoreBtn.textContent = "View More";

    applyFilter(filter);
  });
});

// initial state
applyFilter("all");
