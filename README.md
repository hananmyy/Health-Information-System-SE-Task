# MedixSys – Health Information Management System

MedixSys is a full-stack health information system designed to help doctors manage clients and health programs efficiently. The system streamlines client registration, program enrollment, and provides a robust structure for maintaining healthcare records. It also exposes critical client profile information via API endpoints for seamless integration with other systems.

---

## 🚀 Project Features

- **Doctor Authentication**

  - Doctor registration and secure login system using hashed passwords.
  - Session-based authentication using `express-session`.

- **Program Management**

  - Create and manage health programs (e.g., TB, Malaria, HIV).
  - View available programs created by the logged-in doctor.
  - Ability to delete programs.

- **Client Management**

  - Register new clients with essential health and contact details.
  - View a full list of registered clients.
  - Manage and update client profiles.

- **Client Enrollment**

  - Enroll clients in one or more health programs.
  - View a client’s enrolled programs on their profile.

- **API Endpoint Exposure**

  - Expose client profile data through a RESTful API, enabling integration with external systems.

- **Responsive Frontend**

  - Built using **Tailwind CSS** for a modern, responsive, and mobile-friendly UI.

---

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript Templates), Tailwind CSS
- **Database**: MySQL (Managed using Sequelize ORM)
- **Authentication**: express-session, bcrypt

---

## 💂️ Project Structure

```
MedixSys/
├── config/             # Sequelize database configurations (config.js)
├── controllers/        # Route controllers for handling logic
├── migrations/         # Sequelize migration files
├── models/             # Sequelize models
├── public/             # Static assets (CSS, images, JS)
├── seeders/            # Sequelize seed files
├── views/              # EJS templates (frontend)
├── tailwind.config.js  # Tailwind CSS configuration file
├── package.json        # Project manifest file
├── index.js            # Main entry point (routes are handled inside this file)
└── README.md           # Project documentation
```

---

## ⚙️ Installation and Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/hananmyy/MedixSys-SE-Task.git
   cd MedixSys-SE-Task
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup database**

   - Ensure MySQL is installed and running.
   - Create a database called `medixsys_db`.
   - Update `config/config.js` with your MySQL credentials.

4. **Run Sequelize migrations**

   ```bash
   npx sequelize-cli db:migrate
   ```

5. **(Optional) Run seeders to insert sample data**

   ```bash
   npx sequelize-cli db:seed:all
   ```

6. **Start the development server**

   ```bash
   npm start
   ```

7. **Start Tailwind CSS watcher**

   ```bash
   npm run dev:watch
   ```

8. **Access the application**

   - Visit `http://localhost:3100` in your browser.

---

## 💊 API Endpoint Overview

| Method | Endpoint             | Description                          |
| ------ | -------------------- | ------------------------------------ |
| GET    | `/api/client/:id`    | Get client profile information by ID |
| POST   | `/client/:id/enroll` | Enroll client into selected programs |

*More endpoints available inside controller files.*

---

## 📸 Screenshots

![Home Page - Large screens](<Screenshot 2025-04-26 234515.png>)
![Doctor Login Page - Small screens](<Screenshot 2025-04-27 000814.png>)
![Contact Page - Large screens](<Screenshot 2025-04-27 001539.png>)
![Client List Page - Medium screens](<Screenshot 2025-04-27 001713.png>)

---

## 📚 Future Improvements
- Add JWT-based API authentication.
- Build an admin dashboard for system-wide management.
- Improve error handling and validation on the frontend.
- Fix profile picture uploads for clients and doctors
- Integrate notifications/reminders for enrolled clients


---

## 👨‍💻 Author

- **Hanan Mohamud Yusuf**
- [GitHub Profile](https://github.com/hananmyy)
- [LinkedIn Profile](https://www.linkedin.com/in/hananmyusuf/)


---

## 📌 License

This project is licensed for educational and portfolio purposes.

