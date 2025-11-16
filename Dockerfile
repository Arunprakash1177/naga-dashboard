# ===========================
# 1️⃣ BUILD STAGE (Node)
# ===========================
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json first (better cache)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy everything
COPY . .

# Build the app
RUN npm run build


# ===========================
# 2️⃣ RUN STAGE (Nginx)
# ===========================
FROM nginx:1.25-alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from Node stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional, if you add one)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
