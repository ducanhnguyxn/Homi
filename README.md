# 🏡 Homi

**Homi** is a full-stack accommodation marketplace where users can discover, explore, and book unique places to stay. Property owners can create and manage their own listings, while guests can browse available properties, view detailed information, leave reviews, and explore locations through interactive maps.

The project was built to recreate the core experience of a modern accommodation platform while focusing on practical full-stack development, authentication, cloud services, and deployment.

## ✨ Features

* 🔐 **User Authentication**

  * User registration and login
  * Secure session-based authentication
  * Logout functionality
  * Protected routes for authenticated users

* 🏠 **Property Listings**

  * Create and publish accommodation listings
  * View detailed property information
  * Edit or remove personal listings
  * Browse available stays

* 🔎 **Search & Discovery**

  * Explore available properties
  * Filter listings by relevant information
  * View property details before booking

* 🗺️ **Interactive Maps**

  * Display property locations using Mapbox
  * Geolocation-based property exploration
  * Interactive map integration

* ⭐ **Reviews**

  * Add reviews to properties
  * View reviews from other users
  * Manage reviews associated with your account

* 🖼️ **Cloud Image Storage**

  * Upload property images
  * Store images securely using Cloudinary
  * Support multiple images for individual listings

* 👤 **User Management**

  * Manage personal listings
  * View and update account-related information
  * Access content associated with the current user

* 📱 **Responsive Interface**

  * Designed for desktop, tablet, and mobile screens
  * Bootstrap-based responsive layouts

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Frontend

* EJS
* Bootstrap 5
* CSS3
* JavaScript

### Authentication & Sessions

* Passport.js
* Passport Local Strategy
* Express Session
* MongoDB Session Store

### APIs & Cloud Services

* Mapbox API
* Cloudinary
* MongoDB Atlas

### DevOps & Deployment

* Docker
* Docker Compose
* Kubernetes
* Google Kubernetes Engine (GKE)
* GitHub Actions

## 🏗️ Architecture

Homi follows a traditional full-stack MVC architecture:

```text
Client
  │
  ▼
Express.js Server
  │
  ├── Routes
  │     ├── Users
  │     ├── Listings
  │     └── Reviews
  │
  ├── Controllers
  │
  ├── Models
  │     ├── User
  │     ├── Listing
  │     └── Review
  │
  ├── Views
  │     └── EJS Templates
  │
  └── External Services
        ├── MongoDB Atlas
        ├── Cloudinary
        └── Mapbox
```

## 📋 Prerequisites

Before running Homi locally, make sure you have:

* **Node.js** v18 or later
* **MongoDB Atlas** account
* **Cloudinary** account
* **Mapbox** account

For containerized deployment:

* Docker
* Docker Compose

For Kubernetes deployment:

* kubectl
* Minikube or a Kubernetes cluster
* Google Cloud Platform account for GKE deployment

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/homi.git
cd homi
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_token

ATLASDB_URL=your_mongodb_atlas_connection_string

SECRET=your_session_secret
```

> ⚠️ Never commit your `.env` file or expose API keys and secrets in your repository.

### 4. Start the Application

```bash
npm run dev
```

The application should now be available at:

```text
http://localhost:8080
```

## 🐳 Docker

Homi can also be run using Docker.

### Build the Image

```bash
docker build -t homi .
```

### Run with Docker Compose

```bash
docker-compose up --build
```

### Run the Container

```bash
docker run -p 8080:8080 --env-file .env homi
```

Then open:

```text
http://localhost:8080
```

## ☸️ Kubernetes Deployment

Homi includes Kubernetes configuration for container orchestration and scalable deployment.

The Kubernetes setup can include:

* **Deployment** for managing application pods
* **Service** for exposing the application
* **Horizontal Pod Autoscaler** for scaling based on resource usage
* **Secrets** for managing sensitive configuration

### Running with Minikube

Start Minikube:

```bash
minikube start
```

Create the namespace:

```bash
kubectl create namespace homi
```

Apply the Kubernetes configuration:

```bash
kubectl apply -f kubernetes/secret.yaml
kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml
kubectl apply -f kubernetes/hpa.yaml
```

Check the running resources:

```bash
kubectl get pods -n homi
kubectl get services -n homi
```

## ☁️ Google Kubernetes Engine

Homi can be deployed to **Google Kubernetes Engine (GKE)** for a cloud-based Kubernetes environment.

The deployment process involves:

1. Creating a GKE cluster
2. Configuring Google Cloud credentials
3. Connecting `kubectl` to the cluster
4. Applying the Kubernetes manifests
5. Using GitHub Actions to automate deployments

### Required GitHub Secrets

Add the following secrets to your repository:

```text
GKE_PROJECT
GKE_SA_KEY
```

Where:

* `GKE_PROJECT` is your Google Cloud project ID
* `GKE_SA_KEY` contains the required Google Cloud service account credentials

## 🔄 CI/CD

Homi uses **GitHub Actions** to automate the application delivery process.

The pipeline can:

1. Install dependencies
2. Run automated checks/tests
3. Build the Docker image
4. Push the image to Google Container Registry
5. Deploy the latest version to GKE

Deployments can be configured to run automatically when changes are pushed to the `main` branch.

## ❤️ Health Monitoring

Homi provides a health-check endpoint:

```text
GET /health
```

The endpoint can be used by Kubernetes to determine whether the application is running correctly and ready to receive traffic.

Example response:

```json
{
  "status": "OK",
  "timestamp": "2026-09-17T12:34:56.789Z",
  "uptime": 3600
}
```

This endpoint can be connected to Kubernetes:

* **Liveness Probe**: Checks whether the application is still running
* **Readiness Probe**: Checks whether the application is ready to handle requests

## 📁 Project Structure

```text
homi/
│
├── controllers/
├── models/
├── routes/
├── views/
├── public/
│   ├── css/
│   └── js/
│
├── utils/
├── middleware/
├── init/
├── kubernetes/
│
├── app.js
├── package.json
├── Dockerfile
├── docker-compose.yml
├── .env
└── README.md
```

## 🎯 What I Learned

Building Homi provided hands-on experience with:

* Building RESTful web applications with Express.js
* Designing MongoDB schemas with Mongoose
* Implementing authentication and authorization
* Working with third-party APIs
* Uploading and managing images with cloud storage
* Creating interactive map functionality
* Containerizing applications with Docker
* Deploying applications using Kubernetes
* Automating deployments with GitHub Actions
* Managing environment variables and application secrets

## 🔮 Future Improvements

Possible improvements for future versions include:

* 💳 Online payment integration
* 📅 Real-time availability and booking management
* 🔔 Booking notifications
* 💬 Guest and host messaging
* ❤️ Wishlist and saved properties
* 🔍 More advanced search and filtering
* 📊 Host analytics dashboard
* 🧪 Expanded automated testing
* 🔒 Additional security improvements

## 📄 License

This project is intended for educational and portfolio purposes.
