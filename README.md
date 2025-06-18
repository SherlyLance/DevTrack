# DevTrack - Project Management Dashboard

A modern, feature-rich project management dashboard built with React, Node.js, and MongoDB. DevTrack provides comprehensive project and issue tracking capabilities with real-time collaboration features.


## 🚀 Features

### 📊 Dashboard
- **Quick Stats Overview**: Total projects, issues, open issues, and assigned tasks
- **Interactive Charts**: Visual representation of issue distribution by status and priority
- **Activity Feed**: Real-time updates on project activities
- **My Tasks**: Personalized task management with priority and due date tracking

### 📋 Project Management
- **Project Creation**: Easy project setup with detailed information
- **Project Details**: Comprehensive project overview with team management
- **Role-based Access**: Admin, Developer roles with different permissions
- **Team Collaboration**: Invite team members and assign roles
- **Project Analytics**: Track project progress and performance metrics

### 🎯 Issue Tracking
- **Kanban Board**: Drag-and-drop issue management with visual workflow
- **Advanced Filtering**: Filter by status, priority, assignee, and project
- **Search Functionality**: Quick issue discovery across all projects
- **Issue Creation**: Detailed issue forms with attachments and descriptions
- **Status Management**: Track issues through To Do, In Progress, and Done states

### 📈 Reports & Analytics
- **Issue Reports**: Comprehensive reporting on issue distribution and trends
- **Project Performance**: Track project completion rates and team productivity
- **Custom Date Ranges**: Generate reports for specific time periods
- **Export Capabilities**: Download reports in various formats

### 🔐 Authentication & Security
- **JWT Authentication**: Secure user authentication with token-based sessions
- **Role-based Permissions**: Granular access control based on user roles
- **Protected Routes**: Secure access to sensitive project data
- **Password Security**: Bcrypt hashing for secure password storage

### 💬 Real-time Features
- **Live Updates**: Real-time notifications for project changes
- **Socket.io Integration**: Instant communication between team members
- **Activity Notifications**: Get notified of important project events

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1**: Modern React with hooks and functional components
- **React Router DOM 7.6.2**: Client-side routing and navigation
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Heroicons**: Beautiful SVG icons from the Heroicons library
- **Chart.js & React-Chartjs-2**: Interactive charts and data visualization
- **Formik & Yup**: Form handling and validation
- **React Beautiful DnD**: Drag-and-drop functionality for Kanban boards
- **React Toastify**: Toast notifications for user feedback
- **Axios**: HTTP client for API communication
- **Socket.io Client**: Real-time communication

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Tokens for authentication
- **Bcryptjs**: Password hashing and security
- **Socket.io**: Real-time bidirectional communication
- **CORS**: Cross-origin resource sharing
- **Dotenv**: Environment variable management

## 📁 Project Structure

```
DevTrack/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React context providers
│   │   ├── layouts/         # Layout components
│   │   ├── pages/           # Page components
│   │   └── App.jsx          # Main application component
│   ├── package.json         # Frontend dependencies
│   └── tailwind.config.js   # Tailwind CSS configuration
├── backend/                  # Node.js backend API
│   ├── models/              # MongoDB models
│   ├── routes/              # API route handlers
│   ├── middleware/          # Custom middleware
│   ├── server.js            # Express server setup
│   └── package.json         # Backend dependencies
└── README.md                # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DevTrack
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```env
   

5. **Start the development servers**

   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm start
   ```

6. **Access the application**
   - Frontend: https://devtrack-project-management.netlify.app
   - Backend: https://devtrack-backend-7xxu.onrender.com

## 📱 Available Scripts

### Frontend
- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run test suite
- `npm eject`: Eject from Create React App

### Backend
- `npm start`: Start production server
- `npm run dev`: Start development server with nodemon
- `npm test`: Run test suite

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Interface**: Clean, professional design with consistent styling
- **Interactive Elements**: Hover effects, transitions, and smooth animations
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Dark Mode Ready**: Prepared for future dark theme implementation

## 🔧 Key Components

### Dashboard Components
- **Quick Stats Cards**: Overview metrics with color-coded indicators
- **Chart Widgets**: Interactive pie and bar charts for data visualization
- **Activity Feed**: Real-time project activity updates
- **Task Management**: Personal task tracking with priority levels

### Project Management
- **Project Cards**: Visual project overview with key metrics
- **Project Details**: Comprehensive project information and team management
- **Role Management**: Modal-based team member invitation and role assignment
- **Project Analytics**: Performance tracking and progress visualization

### Issue Tracking
- **Kanban Board**: Drag-and-drop issue management
- **Issue Cards**: Detailed issue information with status indicators
- **Filter System**: Advanced filtering and search capabilities
- **Issue Forms**: Comprehensive issue creation and editing

## 🔐 Authentication Flow

1. **Registration**: User creates account with email and password
2. **Login**: JWT token generation and storage
3. **Protected Routes**: Route guards based on authentication status
4. **Role-based Access**: Permission checks for different user roles
5. **Token Refresh**: Automatic token renewal for seamless experience

## 📊 Data Models

### User
- Authentication information
- Profile details
- Role assignments
- Project memberships

### Project
- Project metadata
- Team members and roles
- Issue collections
- Performance metrics

### Issue
- Issue details and descriptions
- Status and priority tracking
- Assignee and reporter information
- Comments and attachments

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the build folder to your hosting service
```

### Backend Deployment
```bash
cd backend
npm start
# Deploy to your Node.js hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Team

- **Mrunal** - Full Stack Developer
- Additional team members and contributors

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

---

**DevTrack** - Streamlining project management with modern technology and intuitive design.

## 📸 Screenshots

### Dashboard Overview
![Dashboard Overview](https://github.com/Mrunalgaikwad002/DevTrack/blob/main/dashboard%20overview.png?raw=true)
*Comprehensive dashboard with quick stats, charts, and activity feed*

### Create New Project
![Create New Project](https://github.com/Mrunalgaikwad002/DevTrack/blob/main/create%20new%20project.png?raw=true)
*Project creation form for adding new projects*

### Create New Issue
![Create New Issue](https://github.com/Mrunalgaikwad002/DevTrack/blob/main/create%20new%20issue.png?raw=true)
*Form for submitting a new issue or ticket*

### Issue Section
![Issue Section](https://github.com/Mrunalgaikwad002/DevTrack/blob/main/issue%20section.png?raw=true)
*Detailed view of issues with filtering and search*

### Kanban Board
![Kanban Board](https://github.com/Mrunalgaikwad002/DevTrack/blob/main/kanban%20board.png?raw=true)
*Drag-and-drop issue management with visual workflow*

### Landing Page
![Landing Page](https://github.com/Mrunalgaikwad002/DevTrack/blob/main/landing%20page.png?raw=true)
*Welcome page for DevTrack with branding and call to action*

### Project Details
![Project Details](https://github.com/Mrunalgaikwad002/DevTrack/blob/main/projects%20detail.png?raw=true)
*Comprehensive project information and team management*

### Projects Section
![Projects Section](https://github.com/Mrunalgaikwad002/DevTrack/blob/main/projects%20section.png?raw=true)
*Overview of all projects with key metrics*

### Reports
![Reports](https://github.com/Mrunalgaikwad002/DevTrack/blob/main/reports.png?raw=true)
*Analytics and reporting features for project insights*

### Comments Feature
![Comments Section](https://github.com/Mrunalgaikwad002/DevTrack/blob/main/comments.png?raw=true)
*Collaborative comments section for tickets and issues*
