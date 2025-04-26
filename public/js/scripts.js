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
  

  // SEARCH SCRIPT
  document.getElementById("searchInput").addEventListener("keyup", function() {
    let filter = this.value.toLowerCase();
    let clients = document.querySelectorAll("#clientList li");

    clients.forEach(client => {
      let clientName = client.querySelector("a").innerText.toLowerCase();
      if (clientName.includes(filter)) {
        client.style.display = "";
      } else {
        client.style.display = "none";
      }
    });
  });

// DISPLAYING PROGRAMS

function deleteProgram(programId) {
  fetch(`/program/delete/${programId}`, { method: "POST" })
    .then(response => response.json())
    .then(() => location.reload()) // Reload the page after deletion
    .catch(error => console.error("Error deleting program:", error));
}

function loadPrograms() {
  fetch('/programs')
    .then(response => response.text())
    .then(html => {
      document.getElementById('program-container').innerHTML = html;
    })
    .catch(error => console.error('Error loading programs:', error));
}

document.addEventListener("DOMContentLoaded", loadPrograms);



function loadProgramDropdown() {
  fetch('/programs/data')
    .then(response => response.json())
    .then(programs => {
      const dropdown = document.getElementById('programDropdown');
      dropdown.innerHTML = ''; // Clear existing options

      programs.forEach(program => {
        let option = document.createElement('option');
        option.value = program.id;
        option.textContent = program.name;
        dropdown.appendChild(option);
      });
    })
    .catch(error => console.error("Error loading programs:", error));
}

document.addEventListener("DOMContentLoaded", loadProgramDropdown);

