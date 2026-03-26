#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# AI Dashboard — Deploy Script
# Run this on the VM after git pull to rebuild and restart the container.
#
# Usage:
#   chmod +x deploy.sh
#   ./deploy.sh
# ─────────────────────────────────────────────────────────────────────────────

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  AI Dashboard — Deploy"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Pull latest code
echo "▶ git pull..."
git pull origin main

# Build new image
echo "▶ Building Docker image..."
docker compose build --no-cache

# Restart container (zero-downtime swap)
echo "▶ Restarting container..."
docker compose up -d --remove-orphans

# Show status
echo ""
echo "▶ Container status:"
docker compose ps

echo ""
echo "✓ Deploy complete — http://$(hostname -I | awk '{print $1}'):3030"
