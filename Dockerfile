# ============================
# 1️⃣ Build Stage
# ============================
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Build the production version
RUN npm run build


# ============================
# 2️⃣ Production Stage (Nginx)
# ============================
FROM nginx:stable-alpine

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy built React dist files to Nginx public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom nginx config (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
