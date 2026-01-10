FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Install serve for production serving
RUN npm install -g serve

COPY . .

# Build for production
RUN npm run build

# Serve the production build
CMD ["sh", "-c", "serve -s dist -l ${PORT:-5173}"]
