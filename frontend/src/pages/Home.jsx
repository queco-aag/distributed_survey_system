import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Distributed Survey System</h1>
        <p className="hero-subtitle">
          Create, manage, and analyze surveys with ease using our distributed survey platform
        </p>
        <div className="hero-buttons">
          <Button
            label="Get Started"
            icon="pi pi-arrow-right"
            size="large"
            onClick={() => navigate('/surveys')}
          />
          <Button
            label="Learn More"
            icon="pi pi-info-circle"
            size="large"
            className="p-button-outlined"
            onClick={() => navigate('/about')}
          />
        </div>
      </div>

      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <Card className="feature-card">
            <i className="pi pi-list feature-icon"></i>
            <h3>Easy Survey Creation</h3>
            <p>Create surveys with multiple question types and customize them to your needs</p>
          </Card>

          <Card className="feature-card">
            <i className="pi pi-users feature-icon"></i>
            <h3>User Management</h3>
            <p>Manage users, departments, and companies in a distributed environment</p>
          </Card>

          <Card className="feature-card">
            <i className="pi pi-chart-bar feature-icon"></i>
            <h3>Real-time Analytics</h3>
            <p>View survey responses and analyze data in real-time</p>
          </Card>

          <Card className="feature-card">
            <i className="pi pi-shield feature-icon"></i>
            <h3>Secure & Reliable</h3>
            <p>Built with security in mind using JWT authentication and encryption</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;
