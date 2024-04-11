# Item Catalogue SPA

This project is a simple yet feature-rich Single Page Application (SPA) that displays an item catalogue. The frontend is developed using Angular, while the backend is implemented with .NET Core. This README.md provides instructions on how to set up, build, and run the application, as well as details on API usage.
![image](https://github.com/simjbnathan/MinimalCatalogApi/assets/55340453/63bc4756-0c61-4ece-8b38-fc328ee26b1f)

## Setup

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js and npm (https://nodejs.org/)
- Angular CLI (https://cli.angular.io/)
- .NET Core SDK (https://dotnet.microsoft.com/download)

### Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/simjbnathan/MinimalCatalogApi.git
```

### Backend Setup

1. Navigate to the `MinimalCatalogApi` directory:

```bash
cd MinimalCatalogApi
```

2. Restore the NuGet packages:

```bash
dotnet restore
```

3. Run the backend server:

```bash
dotnet run
```

The backend server should now be running on `https://localhost:7278`.

### Frontend Setup

1. Navigate to the `MinimalCatalogApi.UI` directory:

```bash
cd MinimalCatalogApi.UI
```

2. Install the dependencies:

```bash
npm install
```

3. Start the Angular development server:

```bash
ng serve
```

The frontend server should now be running on `https://localhost:4200`.

## Running the Application
The application can be run both project.

Click Start to run both projects and will automatically add dependencies.


## API Usage

The backend API provides the following endpoints:

- GET /api/items: Retrieves all items.
- GET /api/items/{id}: Retrieves an item by ID.
- POST /api/items: Creates a new item.
- PUT/PATCH /api/items/{id}: Updates an item by ID.
- DELETE /api/items/{id}: Deletes an item by ID.

### Authentication

If API key authentication is implemented, dont need to configure any API key. It will automatically authenticate.
API key is implemented both in UI and API.

## Docker Setup (Optional)

Docker not implemented in this project. My machine is not supporting Docker.

## Evaluation

The solution will be evaluated based on the following criteria:

- Functionality: Does the SPA fulfill the core requirements and optional enhancements? Yes
- Code Quality: Is the code clean, well-structured, and maintainable? Yes
- Security: Is API key authentication correctly implemented (if attempted)? Yes
- User Experience: Is the SPA intuitive and easy to navigate? Yes
- Documentation: Are the setup, build, and usage instructions clear and helpful? yes
- Containerization: If Docker setup is provided, does it work smoothly for setup and execution? No

