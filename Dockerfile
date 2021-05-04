# syntax=docker/dockerfile:1

FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /app

COPY package* ./
# Install the npm packages
RUN npm install && npm update

COPY . .

# Run the image as a non-root user
RUN adduser -D myuser
USER myuser

EXPOSE 5000

CMD ["npm", "run", "start"]
