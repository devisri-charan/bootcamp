#!/bin/bash

OUTPUT_DIR=${1:-$(pwd)}

mkdir -p "$OUTPUT_DIR"

FILENAME="system_info_$(date +'%Y-%m-%d_%H-%M-%S').txt"
FILEPATH="$OUTPUT_DIR/$FILENAME"

# System information
echo "Gathering system information..."

# OS details
echo "Operating System:" > "$FILEPATH"
uname -a >> "$FILEPATH"
echo "" >> "$FILEPATH"

# CPU information
echo "CPU Information:" >> "$FILEPATH"
lscpu >> "$FILEPATH"
echo "" >> "$FILEPATH"

# Memory information
echo "Memory Information:" >> "$FILEPATH"
free -h >> "$FILEPATH"
echo "" >> "$FILEPATH"

# Disk usage
echo "Disk Usage:" >> "$FILEPATH"
df -h >> "$FILEPATH"
echo "" >> "$FILEPATH"

# Mounted filesystems
echo "Mounted Filesystems:" >> "$FILEPATH"
mount | column -t >> "$FILEPATH"
echo "" >> "$FILEPATH"

# Network configuration
echo "Network Configuration:" >> "$FILEPATH"
ip a >> "$FILEPATH"
echo "" >> "$FILEPATH"

# Routing table
echo "Routing Table:" >> "$FILEPATH"
ip route >> "$FILEPATH"
echo "" >> "$FILEPATH"

# Installed packages
if command -v dpkg &> /dev/null; then
    echo "Installed Packages:" >> "$FILEPATH"
    dpkg -l >> "$FILEPATH"
    echo "" >> "$FILEPATH"
fi

# Running processes
echo "Running Processes:" >> "$FILEPATH"
ps aux >> "$FILEPATH"
echo "" >> "$FILEPATH"

# Firewall status
if command -v ufw &> /dev/null; then
    echo "Firewall Status:" >> "$FILEPATH"
    sudo ufw status verbose >> "$FILEPATH"
    echo "" >> "$FILEPATH"
fi

echo "System information has been gathered in $FILEPATH"
