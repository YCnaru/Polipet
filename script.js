// Inicializar menú lateral según el rol por defecto (Cliente)
document.addEventListener("DOMContentLoaded", () => {
  switchRole('cliente');
});

// Función para alternar dinámicamente el menú según el rol seleccionado
function switchRole(role) {
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = '';

  if (role === 'cliente') {
    nav.innerHTML = `
      <button class="nav-item active" onclick="showPage('planes')">
        <i class="fa-solid fa-house"></i> <span>Catálogo de Planes</span>
      </button>
      <button class="nav-item" onclick="showPage('mascotas')">
        <i class="fa-solid fa-paw"></i> <span>Mis Mascotas</span>
      </button>
      <button class="nav-item" onclick="showPage('agenda')">
        <i class="fa-solid fa-calendar-days"></i> <span>Agendar Cita</span>
      </button>
    `;
    showPage('planes');
  } else {
    nav.innerHTML = `
      <button class="nav-item active" onclick="showPage('historial')">
        <i class="fa-solid fa-notes-medical"></i> <span>Historial Clínico</span>
      </button>
      <button class="nav-item" onclick="showPage('equipo')">
        <i class="fa-solid fa-users-gear"></i> <span>Gestión de Personal</span>
      </button>
    `;
    showPage('historial');
  }
}

// Función para cambiar de pestaña activa
function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  const selectedPage = document.getElementById(`page-${pageId}`);
  if (selectedPage) {
    selectedPage.classList.add('active');
  }

  // Marcar como activo el botón clickeado
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }

  if (window.innerWidth <= 900) {
    toggleSidebar();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Función para abrir/cerrar el menú lateral en móvil
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  
  sidebar.classList.toggle('open');
  backdrop.classList.toggle('show');
}

// Función para agregar otra mascota dinámicamente
function addPetForm() {
  const petList = document.getElementById('pet-list');

  const newPetRow = document.createElement('div');
  newPetRow.className = 'pet-profile-row';
  newPetRow.style.borderTop = '1px dashed var(--line)';
  newPetRow.style.marginTop = '16px';
  newPetRow.style.paddingTop = '16px';

  newPetRow.innerHTML = `
    <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300" alt="Nueva mascota" class="pet-avatar">
    <div class="grid-2 full-width">
      <label class="field"><span>Nombre de la mascota</span><input type="text" placeholder="Ej. Milo"></label>
      <label class="field"><span>Especie</span><select><option>Perro</option><option selected>Gato</option></select></label>
      <label class="field"><span>Raza</span><input type="text" placeholder="Ej. Criollo"></label>
      <label class="field"><span>Edad</span><input type="text" placeholder="Ej. 2 años"></label>
      <label class="field"><span>Sexo</span><select><option>Macho</option><option selected>Hembra</option></select></label>
      <label class="field full"><span>Observaciones médicas / Alergias</span><textarea rows="2" placeholder="Describa alergias o condiciones previas..."></textarea></label>
    </div>
  `;

  petList.appendChild(newPetRow);
  showToast('Nuevo formulario de mascota agregado');
}

// Mensajes Toast
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}
// Función para alternar dinámicamente el menú y las ayudas según el rol seleccionado
function switchRole(role) {
  const nav = document.getElementById('sidebar-nav');
  const helpCard = document.getElementById('help-card');
  nav.innerHTML = '';

  if (role === 'cliente') {
    // Menú para Cliente
    nav.innerHTML = `
      <button class="nav-item active" onclick="showPage('planes')">
        <i class="fa-solid fa-house"></i> <span>Catálogo de Planes</span>
      </button>
      <button class="nav-item" onclick="showPage('mascotas')">
        <i class="fa-solid fa-paw"></i> <span>Mis Mascotas</span>
      </button>
      <button class="nav-item" onclick="showPage('agenda')">
        <i class="fa-solid fa-calendar-days"></i> <span>Agendar Cita</span>
      </button>
    `;

    // Mostrar tarjeta de ayuda personalizada para Cliente
    if (helpCard) {
      helpCard.style.display = 'block';
      helpCard.innerHTML = `
        <strong>¿Necesitas ayuda?</strong>
        <p>Estamos para cuidar a tu peludo.</p>
        <button onclick="showToast('Te conectaremos con un asesor en breve...')">Hablar con un asesor</button>
      `;
    }

    showPage('planes');

  } else {
    // Menú para Veterinaria / Gestor
    nav.innerHTML = `
      <button class="nav-item active" onclick="showPage('historial')">
        <i class="fa-solid fa-notes-medical"></i> <span>Historial Clínico</span>
      </button>
      <button class="nav-item" onclick="showPage('equipo')">
        <i class="fa-solid fa-users-gear"></i> <span>Gestión de Personal</span>
      </button>
    `;

    // Ocultar tarjeta de ayuda en la vista administrativa
    if (helpCard) {
      helpCard.style.display = 'none';
    }

    showPage('historial');
  }
}