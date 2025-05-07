---
title: DevCon 2025 Troubleshooting
---

# NGIAB-CloudInfra – DevCon 2025 Workshop Setup Guide

Welcome to the NGIAB Workshop!  
This guide will help you troubleshoot problems — **no technical background required**.

> NGIAB stands for **NextGen In A Box** – a simplified way to run the NextGen National Water Model on your local computer using Docker.

Organized and supported by **Arpita Patel** and the NGIAB team.

----------

## Pre-Setup Requirements

> **Note:** You will be provided with a cloud instance (Jetstream or 2i2c) that already includes all the required tools (Docker, WSL, libraries). You do **not** need to install anything on your personal computer.

We will provide:

-   Pre-configured **Jetstream** and **2i2c** instances
    
-   Docker and required dependencies already installed
    

You will only need to connect and log in. Instructions for that are below.

----------

## Wi-Fi Access @ University

_Instructions for connecting to university Wi-Fi will be added here._

----------

## Login Instructions

_Login instructions for accessing Jetstream instances will be added here._

----------

## Troubleshooting Checklist

If you didn’t get the expected output, check these:

### Are You on the Cloud Instance or Local Machine?

Sometimes people accidentally run commands on their local machine instead of the cloud instance. Here's how to check:

```bash
whoami
```

✅ If you're on the ** Jetstream cloud instance**, you’ll see this:

```
exouser
```

❌ If it says something like `DESKTOP-ABC123`, `MacBook-Pro.local`, or anything else personal — **you're on your own computer**.

**Fix:** Go back and follow the login instructions provided earlier to connect to your assigned instance before proceeding.

### Are You in the Right Directory?

Before running any script, always check your current folder:

```bash
pwd
```

You **should see something like**:

```
/home/exouser/NGIAB-CloudInfra
```

If not, move into the folder:

```bash
cd ~/NGIAB-CloudInfra
```

----------

## Need Help?

-   Ask a facilitator during the session
