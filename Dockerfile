# ── Stage 1: Dependencies ─────────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --prefer-offline

# ── Stage 2: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# DATA_ROOT is set at runtime via docker-compose — this is just a build placeholder
ENV DATA_ROOT=/data
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ── Stage 3: Production runner ────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Override this in docker-compose.yml to match your VM's data path
ENV DATA_ROOT=/data
ENV PORT=3030

# Only copy what's needed to run
COPY --from=builder /app/public*        ./public/
COPY --from=builder /app/.next/standalone  ./
COPY --from=builder /app/.next/static   ./.next/static

EXPOSE 3030

CMD ["node", "server.js"]
