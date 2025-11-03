# Artikelbeheer Applicatie

Een full-stack applicatie voor het beheren van artikelen, gebouwd met **Laravel** (backend) en **React + Vite + TailwindCSS** (frontend).  
Functionaliteiten: login, artikelen beheer, API calls voor artikelen (CRUD).

---

## Features
- User login / logout via Laravel Sanctum
- CRUD operaties op artikelen
- Afbeelding uploaden en previewen
- Zoekfunctie op artikel titel
- Notificaties via toast-component
- Responsive design met TailwindCSS
- Veilige API requests met Bearer token / CSRF bescherming

---

## Technologieën
- **Backend**: Laravel, Sanctum, MySQL, PHP
- **Frontend**: React, Vite, TailwindCSS
- **Tools**: DDEV, Docker, Postman, Git

---

## Setup
### Backend
1. Clone de repository
```bash
git clone https://github.com/JohnnyMooijer/uncinc_assessment.git
```
2. Start het project:
```bash
ddev start
```

3. Installeer dependencies:
```bash
ddev composer i
ddev npm i
```

4. Configureer sanctum settings:
```bash
ddev artisan key:generate
```

5. Run migrations & seeders:
```bash
ddev artisan migrate
ddev artisan db:seed
```

6. Link storage voor afbeeldingen:
```bash
ddev artisan storage:link
```

7. Build de frontend
```bash
ddev npm run dev
```
8. Login met de onderstaande gegevens
```bash
admin@test.nl
Test123!
```
