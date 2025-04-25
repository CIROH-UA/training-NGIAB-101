---
title: "Installation and Setup"
teaching: 10
exercises: 2
---

This episode can be a standalone tutorial for those who want a quick introduction to NGIAB. This tutorial follows the case study from our [CloudInfra repository](https://github.com/CIROH-UA/NGIAB-CloudInfra). Users who wish to learn more about NGIAB can explore our other episodes in this module. 

:::::::::::::::::::::::::::::::::::::: questions 

- How do I install and set up NGIAB?
- What are the prerequisites for running NGIAB?
- How do I verify my installation?

::::::::::::::::::::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::: objectives

- Install and verify Docker
- Set up NGIAB project directories
- Run a sample NGIAB run
::::::::::::::::::::::::::::::::::::::::::::::::

## Introduction

This lesson guides you through installing and setting up NGIAB, a containerized solution designed to simplify running the NextGen modeling framework locally. NGIAB leverages Docker containers to ensure consistent and reproducible runs.

## System Requirements

Before installing NGIAB, ensure you have:

- **Operating System:** Windows (with WSL), macOS, or Linux  
- **Software:** Docker, Git  
- **Recommended Minimum RAM:** 8 GB

::::::::::::::::::::::::::::::::::::: callout

## Connecting to a remote machine through SSH?

To use the Data Visualizer through an Secure Shell (SSH) connection, you will have to set up port forwarding when connecting to the remote machine. Port forwarding will allow you to access a remotely hosted browser session on your local machine. See the instructions under "Using NGIAB through an SSH connection" in the [Advanced Topics episode](/site/docs/advanced-topics.html) in this training module. 

::::::::::::::::::::::::::::::::::::::::::::::::

## Docker Installation

:::::::::::::::: spoiler

### Windows (WSL)
Note: Users who already have Docker installed will still need to install a separate WSL distro and set it as their default, if they have not already.

1. Install Windows Subsystem for Linux (WSL):
   ``` bash
   wsl --install
	```

2.  Install Docker Desktop from [Docker's official website](https://docs.docker.com/desktop/setup/install/windows-install/).
    
3.  Launch Docker Desktop and open WSL terminal as administrator.
    
4.  Verify Docker installation:
    
    ```bash
    docker run hello-world
    
    ```
    This should generate a message that shows that your installation is working.

::::::::::::::::::::::::::::::::::::: caution

### CAUTION: WSL distributions

NGIAB commands cannot be run through the `docker-desktop` distribution. If you installed Docker before WSL, you will likely need to install a new WSL distribution and set it as your default.

For example, Ubuntu can be installed and set as the default distribution with the following commands:
```bash
wsl --install -d Ubuntu
wsl --setdefault Ubuntu

```

:::::::::::::::::::::::::::::::::::::::::::::

::::::::::::::::::::::::

:::::::::::::::: spoiler

### macOS

1.  Install Docker Desktop from [Docker's official Mac installer](https://docs.docker.com/desktop/setup/install/mac-install/).
    
2.  Launch Docker Desktop.
    
3.  Verify Docker installation:
    
    ```bash
    docker run hello-world
    
    ```
    This should generate a message that shows that your installation is working.

::::::::::::::::::::::::

:::::::::::::::: spoiler

### Linux

1.  Install Docker by following the [official Docker guide](https://docs.docker.com/desktop/setup/install/linux/).
    
2.  Start Docker service and verify:
    
    ```bash
    sudo systemctl start docker
    docker run hello-world
    
    ```
    This should generate a message that shows that your installation is working.

::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::: challenge

## Verify Docker

Run the command below:

```bash
docker ps -a

```

Confirm it executes without errors. If errors occur, revisit Docker installation steps.

:::::::::::::::::::::::: solution 

## Troubleshooting 

If `docker ps -a` fails, ensure Docker Desktop is running, or Docker service is active on Linux:

```bash
sudo systemctl start docker

```

:::::::::::::::::::::::::::::::::::
::::::::::::::::::::::::::::::::::::::::::::::::

## NGIAB Setup

These steps will lead you through the process of running NGIAB with a set of pre-configured input data and realization files. A realization file is a scenario using a specific model on a specific region.

### Step 1: Create Project Directory

```bash
mkdir -p NextGen/ngen-data
cd NextGen/ngen-data

```

### Step 2: Download Sample Data

Choose one of the following datasets. File sizes and model configurations are provided so that you can download a dataset suitable for your interests, available disk space, and network speed.

#### Option 1: AWI-009

Models: SLOTH (dummy model), NoahOWP (land surface model), CFE (conceptual rainfall-runoff model, functionally equivalent to NWM)

Compressed file size: 249 MB | Extracted file size: 1.77 GB

```bash
wget https://ciroh-ua-ngen-data.s3.us-east-2.amazonaws.com/AWI-009/AWI_16_10154200_009.tar.gz
tar -xf AWI_16_10154200_009.tar.gz

```

#### Option 2: AWI-007

Models: SLOTH, NoahOWP, CFE

Compressed file size: 1.87 MB | Extracted file size: 5.53 MB

```bash
wget https://ciroh-ua-ngen-data.s3.us-east-2.amazonaws.com/AWI-007/AWI_16_2863657_007.tar.gz
tar -xf AWI_16_2863657_007.tar.gz

```

#### Option 3: AWI-008

Models: SLOTH, LSTM (long short-term memory, recurrent neural network)

Compressed file size: 1.50 MB | Extracted file size: 5.46 MB

```bash
wget https://ciroh-ua-ngen-data.s3.us-east-2.amazonaws.com/AWI-008/AWI_16_2863806_008.tar.gz
tar -xf AWI_16_2863806_008.tar.gz

```

::::::::::::::::::::::::::::::::::::: challenge
## Check: Did You Download the Dataset?
Run this command:
```bash
ls  ~/NextGen/ngen-data
```

:::::::::::::::::::::::: solution 

## Output 

You should see a folder like:
```
AWI_16_10154200_009
```
 If you see it, your dataset was downloaded and extracted correctly.

If you see nothing or just the `.tar.gz` file, run the following again:
```bash
tar  -xf  AWI_16_10154200_009.tar.gz
```
::::::::::::::::::::::::::::::::::::
::::::::::::::::::::::::::::::::::::::::::::::::

### Step 3: Clone and Run NGIAB

```bash
cd ../  # back to NextGen folder
git clone https://github.com/CIROH-UA/NGIAB-CloudInfra.git
cd NGIAB-CloudInfra

```

::::::::::::::::::::::::::::::::::::: caution

### CAUTION: For Windows users: pulling with LFs

Before cloning the repository, please ensure that Git is configured to pull with LF line breaks instead of CRLFs. If CRLFs are used, then the carriage return characters will prevent the shell scripts from running properly.

```bash
git config --global core.autocrlf false
```

:::::::::::::::::::::::::::::::::::::::::::::

## ✅ Ready to Go!

If you've completed the steps above and verified your dataset and working directory, you are ready to run the interactive guide script `guide.sh`. It will prompt you to select input data, processing modes, and will initiate your run.


```bash
./guide.sh
```
This will walk you through the NGIAB setup and launch your first run.

::::::::::::::::::::::::::::::::::::: callout

### `guide.sh` Tips

- A series of prompts will appear that ask you if you want to use the existing Docker image or update to the latest image. Updating to the latest image will take longer, so for the purposes of this tutorial, using the existing Docker image is fine.
- When prompted to run NextGen in serial or parallel mode, either is fine.
- The option to open a Bash shell (interactive shell) will allow you to explore the data directory without quitting NGIAB.
- Redirecting command output to `/dev/null` significantly reduces the amount of output. Either is fine, but if you are curious about what is happening inside the model, we suggest that you do not redirect the output.

::::::::::::::::::::::::::::::::::::::::::::::::

## Troubleshooting

-   Ensure Docker is running before executing `guide.sh`.
    
-   For permission errors on Linux, run Docker commands with `sudo` or add your user to the Docker group:
    

```bash
sudo usermod -aG docker ${USER}
newgrp docker

```
::::::::::::::::::::::::::::::::::::: callout
### Are You in the Right Directory?

Before running any script, always check your current folder:
``` bash
pwd
```
You **should see something like**:
```
/home/yourname/NextGen/NGIAB-CloudInfra
```
If not, move into the folder:
``` bash 
cd ~/NextGen/NGIAB-CloudInfra
```
::::::::::::::::::::::::::::::::::::::::::::::::

>**Tip:** Always execute a quick run with provided sample datasets to verify the successful setup of NGIAB.\

----------

## Additional Resources

Are you interested in customizing your run with your own catchments (watersheds) and run configurations? Do you want to explore more functionalities of NGIAB? Check out the following episodes:

-   [Data Preparation - NGIAB Data Preprocessor](/site/docs/data-preparation.html)
    
-   [Evaluation - NGIAB TEEHR Integration](/site/docs/evaluation.html)
    
-   [Visualization - Data Visualizer](/site/docs/visualization.html)

-   [Advanced Topics](/site/docs/advanced-topics.html)
    
::::::::::::::::::::::::::::::::::::: keypoints 

-   NGIAB simplifies NextGen framework deployment through Docker.  
-   Use `guide.sh` for interactive configuration and run execution.   
-   Always confirm successful setup by executing provided sample runs.

::::::::::::::::::::::::::::::::::::::::::::::::


