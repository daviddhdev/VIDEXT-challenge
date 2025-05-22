# Stage 1: Building the app
FROM node:20-alpine AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV DATABASE_URL="file:/app/db.sqlite"
RUN corepack enable

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json pnpm-lock.yaml ./

FROM builder AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM builder AS build
COPY --from=prod-deps /app/node_modules ./node_modules
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run db:push && pnpm run build

# Stage 2: Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Set next telemetry disabled
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only the necessary files from builder
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/db.sqlite ./db.sqlite

# Set proper permissions for the database file
RUN chown nextjs:nodejs /app/db.sqlite && \
    chmod 644 /app/db.sqlite

# Switch to non-root user
USER nextjs

# Expose the port
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the server using the standalone build
CMD ["node", "server.js"]