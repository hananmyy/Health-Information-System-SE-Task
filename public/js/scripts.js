document.addEventListener('DOMContentLoaded', function() {
    const successMessage = document.querySelector('.flash-success');
    const errorMessage = document.querySelector('.flash-error');
  
    if (successMessage && successMessage.textContent.trim()) {
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 1500);
    }
    
    if (errorMessage && errorMessage.textContent.trim()) {
      setTimeout(() => {
        errorMessage.style.display = 'none';
      }, 1500);
    }
  
    if (successMessage && errorMessage) {
      if (successMessage.textContent.trim()) {
        errorMessage.style.display = 'none';
      } else if (errorMessage.textContent.trim()) {
        successMessage.style.display = 'none';
      }
    }
  });
  
  
  // TOGGLE BUTTON
  const navMenu = document.getElementById("nav-menu")
  const navLink = document.querySelectorAll(".nav-link")
  const hamburger = document.getElementById("hamburger")
  
  hamburger.addEventListener("click", () =>{
      navMenu.classList.toggle("left-[0]")
      hamburger.classList.toggle('ri-close-large-line')
  })
  
  navLink.forEach(link =>{
      link.addEventListener("click", () =>{
          navMenu.classList.toggle("left-[0]")
          hamburger.classList.toggle('ri-close-large-line')
      })
  })
  