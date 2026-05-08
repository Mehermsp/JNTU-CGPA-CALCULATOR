FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE https://jntu-cgpa-calculator.onrender.com
CMD ["npm", "start"]
