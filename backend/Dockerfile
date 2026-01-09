FROM oven/bun:1.3.5

# --- Install Dependencies ---
RUN echo "➡️ Running apt-get update and install openssl/libssl-dev"
RUN apt-get update -y && apt-get install -y openssl libssl-dev
RUN echo "✅ Openssl dependencies installed."

WORKDIR /app
RUN echo "➡️ Setting working directory to /app"

# Install deps
COPY package.json bun.lock ./
RUN echo "➡️ Copied package files"

RUN echo "➡️ Running bun install"
RUN bun install
RUN echo "✅ Dependencies installed with bun"

# Copy source
COPY . .
RUN echo "➡️ Copied remaining source code"

# Generate Prisma client
RUN echo "➡️ Removing old generated prisma directory"
RUN rm -rf ./src/generated/prisma

RUN echo "➡️ Running bun prisma generate"
RUN bun prisma generate
RUN echo "✅ Prisma client generated"

EXPOSE 4000

CMD ["bun", "src/index.ts"]
