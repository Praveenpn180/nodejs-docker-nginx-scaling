# Node.js Docker Nginx Scaling

This project demonstrates how to use Docker and Nginx to scale a simple Node.js application. The application consists of multiple Node.js servers behind an Nginx load balancer. Docker Compose is used to manage the services.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup and Usage](#setup-and-usage)
- [Scaling Services](#scaling-services)
- [License](#license)

## Prerequisites

- Docker
- Docker Compose

## Project Structure

```plaintext
nodejs-docker-nginx-scaling/
├── Dockerfile
├── app.js
├── docker-compose.yml
├── nginx.conf
├── package.json
└── README.md


- **`Dockerfile`**: Docker configuration for building the Node.js application image.
- **`app.js`**: Simple Express application that returns the server name.
- **`docker-compose.yml`**: Docker Compose configuration to manage the services.
- **`nginx.conf`**: Nginx configuration for load balancing.
- **`package.json`**: Project dependencies and metadata.
- **`README.md`**: Project documentation.

## Setup and Usage

1. **Clone the repository**:

    ```sh
    git clone https://github.com/Praveenpn180/nodejs-docker-nginx-scaling.git
    cd nodejs-docker-nginx-scaling
    ```

2. **Build and start the services**:

    ```sh
    docker-compose up --build -d
    ```

3. **Verify the setup**:

    Open your browser and navigate to `http://localhost`. You should see responses from different server instances.

## Scaling Services

To add new server instances, update the `docker-compose.yml` file and the `nginx.conf` file.

1. **Update `docker-compose.yml`**:

    ```yaml
    version: '3'
    services:
      server1:
        build: .
        ports:
          - "3001:3000"
        environment:
          - PORT=3000
          - SERVER_NAME=server1
      server2:
        build: .
        ports:
          - "3002:3000"
        environment:
          - PORT=3000
          - SERVER_NAME=server2
      server3:
        build: .
        ports:
          - "3003:3000"
        environment:
          - PORT=3000
          - SERVER_NAME=server3
      # Add more servers as needed
      nginx:
        image: nginx:latest
        ports:
          - "80:80"
        volumes:
          - ./nginx.conf:/etc/nginx/nginx.conf
        depends_on:
          - server1
          - server2
          - server3
          # Add more servers as needed
    ```

2. **Update `nginx.conf`**:

    ```conf
    events {}

    http {
        upstream myapp {
            server server1:3000;
            server server2:3000;
            server server3:3000;
            # Add more servers as needed
        }

        server {
            listen 80;

            location / {
                proxy_pass http://myapp;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
            }
        }
    }
    ```

3. **Rebuild and restart the services**:

    ```sh
    docker-compose up --build -d
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
