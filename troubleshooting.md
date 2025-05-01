---
title: DevCon 2025 Troubleshooting
---

# 💧 NGIAB-CloudInfra – DevCon 2025 Workshop Setup Guide

Welcome to the NGIAB Workshop!  
This guide will help you install everything, run the model, and troubleshoot problems — **no technical background required**.

> 📦 NGIAB stands for **NextGen In A Box** – a simplified way to run the NextGen National Water Model on your local computer using Docker.

Organized and supported by **Arpita Patel** and the NGIAB team.

----------

## 💻 1. Pre-Setup Requirements

> ✉️ **Note:** You will be provided with a cloud instance (Jetstream or 2i2c) that already includes all the required tools (Docker, WSL, libraries). You do **not** need to install anything on your personal computer.

We will provide:

-   Pre-configured **Jetstream** and **2i2c** instances
    
-   Docker and required dependencies already installed
    

You will only need to connect and log in. Instructions for that are below.

----------

## 🌐 Wi-Fi Access @ University

_Instructions for connecting to university Wi-Fi will be added here._

----------

## 🔑 Login Instructions

_Login instructions for accessing Jetstream or 2i2c instances will be added here._

----------

## 📂 2. Set Up Project Folder

Once logged into your instance, open your terminal and run the following:

```
mkdir -p ~/NextGen/ngen-data
cd ~/NextGen/ngen-data
```

----------

## 🌐 3. Download Input Data

Pick **one** dataset to work with.

### Option 1: Provo River (Recommended)

```
wget https://ciroh-ua-ngen-data.s3.us-east-2.amazonaws.com/AWI-009/AWI_16_10154200_009.tar.gz
tar -xf AWI_16_10154200_009.tar.gz
```


----------

## 🧱 4. Clone NGIAB and Run

Now go **up one folder** and clone the repo:

```
cd ~/NextGen
git clone https://github.com/CIROH-UA/NGIAB-CloudInfra.git
cd NGIAB-CloudInfra
```

Then, make the script executable and run it:

```
chmod +x guide.sh
./guide.sh
```

----------

## 🗂 Expected Output Structure

After running, you’ll have:

```
ngen-run/
├── config/
├── forcings/
├── outputs/
├── lakeout/
├── metadata/
├── restart/
```

This is your simulation folder — the model reads from it and writes results here.

----------

## 👀 (Optional) Visualize the Output

```
chmod +x viewOnTethys.sh
./viewOnTethys.sh
```

This will launch a web-based interface to explore the output.

----------

## ⚡ Only If You're Stuck: Troubleshooting Checklist

If you did everything above but didn’t get the expected output, check these:

### 🧭 Are You on the Cloud Instance or Local Machine?

Sometimes people accidentally run commands on their local machine instead of the cloud instance. Here's how to check:

```
whoami
```

✅ If you're on the ** 2i2c cloud instance**, you’ll see something like:

```
jovyan 
```

❌ If it says something like `DESKTOP-ABC123`, `MacBook-Pro.local`, or anything else personal — **you're on your own computer**.

**Fix:** Go back and follow the login instructions provided earlier to connect to your assigned instance before proceeding.

### 📅 Are You in the Right Directory?

Before running any script, always check your current folder:

```
pwd
```

You **should see something like**:

```
/home/yourname/NextGen/NGIAB-CloudInfra
```

If not, move into the folder:

```
cd ~/NextGen/NGIAB-CloudInfra
```
✅ Done! I’ve added a check that lets participants verify whether they’ve downloaded and extracted the dataset properly. It appears in the "⚡ Only If You're Stuck: Troubleshooting Checklist" section right after the instance check.

Here’s the new part I added to your **Canvas document**:

----------

### 📦 Check: Did You Download the Dataset?

Run this command:

```bash
ls ~/NextGen/ngen-data

```

You should see a folder like:

```
AWI_16_10154200_009

```

✅ If you see it, your dataset was downloaded and extracted correctly.  
❌ If you see nothing or just the `.tar.gz` file, run the following again:

```bash
tar -xf AWI_16_10154200_009.tar.gz

```

----------

## 🙋 Need Help?

-   Ask a facilitator during the session
    

    

----------



