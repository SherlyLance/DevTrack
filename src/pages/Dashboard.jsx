import React from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { PlusIcon, ChartBarIcon, ListBulletIcon } from '@heroicons/react/24/outline';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  // Placeholder Data
  const projects = [
    { id: 1, name: 'DevTrack Backend', totalTickets: 50, bugs: 10, features: 20, tasks: 20, todo: 15, inProgress: 20, done: 15, members: 5, lastUpdated: '2023-04-20 10:00' },
    { id: 2, name: 'DevTrack Frontend', totalTickets: 40, bugs: 5, features: 15, tasks: 20, todo: 10, inProgress: 15, done: 15, members: 3, lastUpdated: '2023-04-19 14:30' },
  ];

  const recentActivities = [
    { id: 1, description: 'Mrunal created a ticket: Login Bug', timestamp: '2 hours ago' },
    { id: 2, description: 'Status changed to In Progress for #DEV-101', timestamp: '5 hours ago' },
    { id: 3, description: 'Ravi was assigned a bug #DEV-102', timestamp: '1 day ago' },
  ];

  const myTasks = [
    { id: 1, title: 'Fix login validation', priority: 'High', status: 'To Do', dueDate: '2023-04-25' },
    { id: 2, title: 'Refactor component styling', priority: 'Medium', status: 'In Progress', dueDate: '2023-04-28' },
  ];

  // Aggregate data for overview
  const totalProjects = projects.length;
  const totalIssues = projects.reduce((sum, p) => sum + p.totalTickets, 0);
  const todoIssues = projects.reduce((sum, p) => sum + p.todo, 0);
  const inProgressIssues = projects.reduce((sum, p) => sum + p.inProgress, 0);
  const doneIssues = projects.reduce((sum, p) => sum + p.done, 0);
  const assignedToMe = myTasks.length;

  // Chart Data Examples
  const chartColors = {
    toDo: '#F87171',
    inProgress: '#60A5FA',
    done: '#4ADE80',
    high: '#FB923C',
    medium: '#A78BFA',
    low: '#FCD34D',
  };

  const ticketStatusData = {
    labels: ['To Do', 'In Progress', 'Done'],
    datasets: [
      {
        label: 'Tickets by Status',
        data: [todoIssues, inProgressIssues, doneIssues],
        backgroundColor: [
          chartColors.toDo,
          chartColors.inProgress,
          chartColors.done,
        ],
        borderColor: [
          chartColors.toDo,
          chartColors.inProgress,
          chartColors.done,
        ],
        borderWidth: 1,
      },
    ],
  };

  const ticketPriorityData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Tickets by Priority',
        data: [20, 40, 30], // Placeholder, ideally calculated from actual issues
        backgroundColor: [
          chartColors.high,
          chartColors.medium,
          chartColors.low,
        ],
        borderColor: [
          chartColors.high,
          chartColors.medium,
          chartColors.low,
        ],
        borderWidth: 1,
      },
    ],
  };

  const weeklyProgressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Tickets Created',
        data: [10, 15, 12, 18],
        backgroundColor: chartColors.toDo,
        borderColor: chartColors.toDo,
        borderWidth: 1,
      },
      {
        label: 'Tickets Closed',
        data: [8, 12, 10, 15],
        backgroundColor: chartColors.done,
        borderColor: chartColors.done,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto px-6 py-8 bg-[#f9fafb]">
      <h3 className="text-[#111827] text-3xl font-medium mb-8">Dashboard Overview</h3>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <Link to="/create-project" className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center text-accent-[#3b82f6] hover:bg-gray-50 transition duration-300">
          <PlusIcon className="h-6 w-6 mr-2" />
          <span className="text-lg font-medium">Create Project</span>
        </Link>
        <Link
          to="/issues"
          className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center text-accent-[#3b82f6] hover:bg-gray-50 transition duration-300"
        >
          <ListBulletIcon className="h-6 w-6 mr-2" />
          <span className="text-lg font-medium">View All Issues</span>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-lg font-semibold text-[#111827] mb-2">Total Projects</h4>
          <p className="text-4xl font-bold text-purple-500">{totalProjects}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-lg font-semibold text-[#111827] mb-2">Total Issues</h4>
          <p className="text-4xl font-bold text-accent-[#3b82f6]">{totalIssues}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-lg font-semibold text-[#111827] mb-2">Open Issues</h4>
          <p className="text-4xl font-bold text-amber-500">{todoIssues + inProgressIssues}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-lg font-semibold text-[#111827] mb-2">My Assigned Tasks</h4>
          <p className="text-4xl font-bold text-green-500">{assignedToMe}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h4 className="text-xl font-semibold text-[#111827] mb-4">Issue Distribution by Status</h4>
          <div className="h-64 flex items-center justify-center">
            <Pie data={ticketStatusData} options={{ maintainAspectRatio: false, responsive: true }} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h4 className="text-xl font-semibold text-[#111827] mb-4">Issue Priority Breakdown</h4>
          <div className="h-64 flex items-center justify-center">
            <Bar data={ticketPriorityData} options={{ maintainAspectRatio: false, responsive: true, scales: { y: { beginAtZero: true } } }} />
          </div>
        </div>
      </div>

      {/* My Tasks & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h4 className="text-xl font-semibold text-[#111827] mb-4">My Tasks</h4>
          <ul className="divide-y divide-gray-200">
            {myTasks.map((task) => (
              <li key={task.id} className="py-3">
                <h5 className="text-lg font-medium text-gray-900">{task.title}</h5>
                <p className="text-sm text-gray-600">Priority: {task.priority} | Status: {task.status}</p>
                <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h4 className="text-xl font-semibold text-[#111827] mb-4">Recent Activity</h4>
          <ul className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="py-3">
                <p className="text-gray-800">{activity.description}</p>
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

