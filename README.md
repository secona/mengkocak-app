# Mengkocak App

## Run Using Docker Compose

#### 1) Clone the Repository
First, clone the repository to your local machine:
```sh
git clone https://github.com/secona/mengkocak-app.git
```

#### 2) Navigate to the Project Directory
Change your working directory to the cloned repository:
```sh
cd mengkocak-app
```

#### 3) Execute Docker Compose
Build and run the application using Docker Compose with the following command:
```sh
docker compose -f compose.yaml up -d --build
```

###### Additional Information
- The `-d` flag runs the containers in detached mode.
- The `--build` flag ensures that the images are rebuilt before starting the containers.
- Access the frontend service in your browser at http://localhost:3000.

## Run Without Docker Compose

#### 1) Clone the Repository
First, clone the repository to your local machine.
```sh
git clone https://github.com/secona/mengkocak-app.git
```

#### 2) Navigate to the Project Directory
Change your working directory to the cloned repository:
```sh
cd mengkocak-app
```

#### 3) Provision a New PostgreSQL Database
Set up a new PostgreSQL database. Ensure you note down the database URL as you will need it in the next step.

#### 4) Create a `.env` File in the `backend` Subdirectory
Navigate to the `backend` subdirectory:
```sh
cd backend
```

Create a `.env` file with the following content:
```
DATABASE_URL=<YOUR_DATABASE_URL>
JWT_TOKEN=<YOUR_JWT_TOKEN>
```
Replace `<YOUR_DATABASE_URL>` with the URL of your PostgreSQL database and `<YOUR_JWT_TOKEN>` with your desired token for JWT.

#### 5) Create a `.env` File in the `frontend` Subdirectory
Navigate to the `frontend` subdirectory:
```sh
cd ../frontend
```

Create a `.env` file with the following content:
```
API_URL=http://localhost:3000
```

#### 6) Install Dependencies
Navigate back to the project root directory and install dependencies for both frontend and backend:

```sh
cd ..
npm install --prefix backend
npm install --prefix frontend
```

#### 7) Run the Backend Service
Navigate to the backend subdirectory:
```sh
cd backend
```

Start the backend service:
```sh
npm run start:dev
```

#### 8) Run the Frontend Service
Open a new terminal window, navigate to the frontend subdirectory:
```sh
cd frontend
```

Start the frontend service:
```sh
npm run dev
```

###### Additional Information
- Ensure both services are running simultaneously.
- Access the frontend service in your browser at http://localhost:3000.
