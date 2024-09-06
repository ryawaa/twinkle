# Step 1: Build Stage
FROM node:22

# Set working directory
WORKDIR /app

# git repo to ./
COPY . .    

# Install dependencies
RUN npm install

# Build the application
RUN npm run build
ENV TZ="Asia/Singapore"
# Start the application
CMD ["npm", "start"]