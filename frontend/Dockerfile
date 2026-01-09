FROM oven/bun:1.3.5

# --- Install Dependencies ---
RUN echo "➡️ Running apt-get update and install openssl/libssl-dev"
RUN apt-get update -y && apt-get install -y openssl libssl-dev
RUN echo "✅ Openssl dependencies installed."

WORKDIR /app
RUN echo "➡️ Setting working directory to /app"

COPY package.json bun.lock ./
RUN echo "➡️ Copied package files"

RUN echo "➡️ Running bun install"
RUN bun install
RUN echo "✅ Dependencies installed with bun"

COPY . .
RUN echo "➡️ Copied remaining source code"

EXPOSE 5173

CMD ["bun", "run", "dev", "--host"]
