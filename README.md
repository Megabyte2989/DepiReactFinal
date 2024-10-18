# 🚗 Drifter - Car Rental System  

**Drifter** is a modern web-based car rental management system that streamlines rental operations and enhances user experience. Designed with flexibility and scalability in mind, it helps businesses like **Ramy Rent** shift from manual paperwork to efficient digital workflows.  

---

## 📖 Overview  

Built on the **MERN stack** (MongoDB, Express, React, Node.js), Drifter offers a robust platform for administrators and customers alike:  

- **Admins**: Manage car inventory, rentals, and maintenance records.  
- **Clients**: Search, browse, and book vehicles effortlessly.  

The system supports **customization** and **expandability**, making it adaptable for future enhancements or other businesses.  

---

## 🎯 Project Goals  

- Digitize operations for **Ramy Rent**, reducing manual errors and paperwork.  
- Provide a **seamless booking experience** for customers.  
- Enable **data export** in multiple formats for administrative use.  

---

## 🚀 Features  

### 🎨 Frontend  

- **React.js** for reusable, responsive UI components  
- **Redux** for state management, with key slices:  
  - `carSlice` | `rentSlice` | `maintainSlice`  
- **Axios** for efficient API communication  
- **React Router** for smooth page navigation  
- **SweetAlert2** for interactive alerts  
- **Font Awesome** icons for improved UI visuals  

### 🛠️ Backend  

- **Express.js** for building APIs and routing  
- **MongoDB** with **Mongoose ODM** for data storage and modeling  
- **JSON Web Tokens (JWT)** for secure user authentication  
- **Bcrypt** for password encryption  
- **Multer** for file uploads (e.g., car images)  
- **CORS** to manage secure cross-origin requests  

---

## 📊 Key Functionalities  

- **Admin Dashboard**: View and manage rentals, income, outcomes, and cars  
- **Car Management**: Add, update, and remove vehicles  
- **Booking Flow**: Secure customer bookings with automated emails and booking history  
- **Maintenance Records**: Log and track car maintenance details  

---

## 💻 Technologies Used  

**Frontend**: React.js, Redux, Axios, React Router  
**Backend**: Express.js, Node.js, MongoDB, Mongoose  
**Testing**: Jest, Redux-mock-store  
**UI Tools**: Font Awesome, SweetAlert2  
**Deployment**: Vercel, MongoDB Atlas  
**Environment Management**: Dotenv  
**Version Control**: GitHub  
**Image Storage** : Cloudinary
---

## 📦 Installation and Setup  

### Prerequisites  

- **Node.js** installed  
- **MongoDB Atlas** account setup + cluster + DataBase
- **Git** installed  
- **React** installed
- **Redux** installed
- **Vercel** account setup + configs
- **Cloudinary** account setup + configs
### Clone the Repository  

```bash
git clone https://github.com/Blaxinoss/DepiReactFinal.git  
cd DepiReactFinal  
```

### Install Dependencies  

for backend 

```bash
cd server
npm install  
```

for Frontend
```bash
cd my-app
npm install  
```

### Set up Environment Variables  

Create a `.env` file in the root directory:  

```bash
MONGODB_URI=your_mongoDB_url  
JWT_SECRET=your_secret_key  
# for Cloudinary
CLOUD_NAME = cloudname
api_key  = your_api_key
api_secret = your_api_secret_key
```

### Start the Development Server  

```bash
npm start  
```

The app will run at [http://localhost:3000/](http://localhost:3000/).  

### Run the Backend Server  

```bash
nodemon server.js  

The app will run at [http://localhost:5000/](http://localhost:5000/). 
```

---

## 🧪 Testing  

Run the Jest tests:  

```bash
npm test  
```

---

## 🛠️ Deployment  

- Frontend and Backend deployed on **Vercel**  
- Continuous integration with **GitHub** for seamless updates  
- DataBase with MongoDB Atlas 
- Images storage cloud with **Cloudinary**
---

## 📑 Documentation  

- **API Documentation**: Refer to the backend API routes [here](https://depi-react-final-83rt.vercel.app/swagger-ui.html)  

---

## 🤝 Contributing  

Contributions are welcome! Please open an issue or submit a pull request.  

---

## 📞 Contact  

For any inquiries, feel free to contact us 

---
