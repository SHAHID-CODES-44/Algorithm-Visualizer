# ---- Build stage ----
# App lives at the repo root (Lovable layout), so the build context is the root,
# NOT a ./public subfolder.
FROM node:22-alpine AS build

WORKDIR /app

# Install dependencies first for better layer caching.
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the source and build the standalone Node server.
COPY . .
RUN npm run build

# ---- Production stage ----
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy the built application from the build stage.
COPY --from=build /app .

EXPOSE 3000

# Run the built TanStack Start (Nitro node-server) entry directly.
CMD ["node", ".output/server/index.mjs"]