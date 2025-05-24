---
title: DevCon 2025 Troubleshooting
---

# NGIAB-CloudInfra – DevCon 2025 Workshop Setup Guide

Welcome to the NGIAB Workshop!  
This guide will help you troubleshoot problems.

----------

## Pre-Setup Requirements

You will be provided with a cloud instance (Jetstream) that already includes all the required tools (Docker and libraries). You will need the login credentials emailed to you before the workshop and a Virtual Network Computing (VNC) client installed.

----------

## Wi-Fi Access

Instructions for connecting to UVM's Guest Wi-Fi are found on the [UVM IT page](https://www.uvm.edu/it/catalog/service/guest-access-guestnet).

----------

## Troubleshooting Checklist

If you didn’t get the expected output, check these:

### Issues with VNC Client or Port Forwarding

If you are having issues with your VNC client, try using a different service, or port forward to your local web browser. Try both [RealVNC](https://www.realvnc.com/en/connect/download/viewer/) and [TigerVNC](https://tigervnc.org/). Try entering `localhost:5906`, and if that doesn't work, enter `5906`. Lastly, try port forwarding. 

If you continue to have problems, make sure that the port you are using in your `ssh` command is not being used on your local machine. You can use the `netstat` command on all platforms to check which ports are being used. 

### No Browser on Web Desktop

If Firefox is not installed on the Jetstream image's web desktop, run this command:

```bash
sudo apt install firefox
```

### Invalid Data Preprocess Command

Make sure that you are copying the command as one line, without any newline characters.

### Are You on the Cloud Instance or Local Machine?

Sometimes people accidentally run commands on their local machine instead of the cloud instance. Here's how to check:

```bash
whoami
```

✅ If you're on the **Jetstream cloud instance**, you’ll see this:

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
/home/exouser/NGIAB_demo/NGIAB-CloudInfra
```

If not, move into the folder:

```bash
cd ~/NGIAB_demo/NGIAB-CloudInfra
```

----------

## Need Help?

-   Ask a facilitator during the session
