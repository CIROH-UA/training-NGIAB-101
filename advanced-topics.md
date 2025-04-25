---
title: "Advanced Topics"
teaching: 5
exercises: 60
---

:::::::::::::::::::::::::::::::::::::: questions 

- How can I build NGIAB locally?
- How do I use NGIAB on an high-performance computing (HPC) system?
- How do I use the Data Visualizer through an SSH connection?
- How can I contribute to NGIAB?

::::::::::::::::::::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::: objectives

- Build a development version of NGIAB locally
- Install and use NGIAB on an HPC
- Use port forwarding to view NGIAB results
- Explain the NGIAB community contribution process

::::::::::::::::::::::::::::::::::::::::::::::::

:::::::::::::::: spoiler
## Using NGIAB on High-Performance Computing (HPC) Environments: General Info

The most up-to-date information on installing NGIAB on an HPC can be found on [CIROH'S NGIAB HPC GitHub page](https://github.com/CIROH-UA/NGIAB-HPCInfra). Other than a different installation process and the use of Singularity instead of Docker, the workflow is the same to execute a NextGen run in NGIAB. Tools like the Data Preprocessor, TEEHR, and the Data Visualizer are still available. The NGIAB-HPCInfra contains its own interactive `guide.sh` script, which allows users to specify input data pathways and run configurations (serial or parallel), as well as trigger the execution of TEEHR and the Data Visualizer.

### Singularity

NGIAB uses Singularity as its containerization platform for HPC environments. Singularity enables secure execution of containerized applications on multi-user HPC clusters. Key features of Singularity include:

 - Native HPC integration, which allows the execution of containerized applications within existing batch job schedulers such as SLURM (Simple Linux Utility for Resource Management) workload manager, PBS (Portable Batch System) and LSF (Load Sharing Facility)
 - Enforced security – it runs containers as non-root users, reducing security risks; and 
 - Access to host file systems – it enables users to interact with datasets and computational resources without additional configuration directly. 
::::::::::::::::::::::::

:::::::::::::::: spoiler
## Run NGIAB on Pantarhei HPC (Singularity Version)

This section explains how to run **NextGen In A Box (NGIAB)** using **Singularity** on the **Pantarhei HPC system** at the University of Alabama. To access Pantarhei, please follow the instructions on [CIROH's DocuHub page](https://docs.ciroh.org/docs/services/access/#accessing-on-premises-infrastructure).

---

### 1. Log Into Pantarhei

Open a terminal and connect to the login node:

```bash
ssh <USERNAME>@pantarhei.ua.edu

```

Replace `<USERNAME>` with your actual Pantarhei username.

----------

### 2. Request a Compute Node (Do NOT run on login node)

On the login node, request an interactive session:

```bash
srun --partition=normal --nodes=1 --ntasks=1 --time=02:00:00 --pty bash

```

Use the `normal` partition unless you require more time or special resources.

----------

### 3. Verify that Singularity is available:


```bash
singularity --version

```

----------

### 4. Prepare Project Directory

Create the directory and move into it:

```bash
mkdir -p ~/NextGen/ngen-data
cd ~/NextGen/ngen-data

```

----------

### 5. Download Sample Dataset

Pick one of the sample datasets to download and extract:

###### Option 1: AWI-009 (Provo River, UT)

```bash
wget https://ciroh-ua-ngen-data.s3.us-east-2.amazonaws.com/AWI-009/AWI_16_10154200_009.tar.gz
tar -xf AWI_16_10154200_009.tar.gz

```

Other options: AWI-007 or AWI-008 can be used similarly, see the [Installation and Setup episode](/site/docs/installation.html#step-2-download-sample-data).

----------

### 6. Clone the NGIAB-HPCInfra Repository

```bash
cd ~/NextGen
git clone https://github.com/CIROH-UA/NGIAB-HPCInfra.git
cd NGIAB-HPCInfra

```

> ✅ **Note:** Always run `guide.sh` from inside the `NGIAB-HPCInfra` folder.

----------

### 7. Run `guide.sh`

Make the script executable if needed:

```bash
chmod +x guide.sh

```

Then run it:

```bash
./guide.sh

```

Follow the prompts:

-   When asked **“Do you want to use the same path?”**, type `n`
    
-   Then enter the **full absolute path** to your extracted dataset folder. Example:
    

```bash
/home/<username>/NextGen/ngen-data/AWI_16_10154200_009

```

This folder must contain:

```
forcings/
config/
outputs/

```

The script will:

- Detect system architecture
    
- Pull the correct Singularity image
    
- Mount your dataset
    
- Allow running in:
    
    - Serial mode
        
    - Parallel mode
        
    - Interactive container shell
        

----------

#### Notes

- Do not run the model or load modules on the login node.
    
- All commands should be executed on a **compute node**.
    
- If output files do not appear, double-check the input path and folder structure.
    
- If `outputs/` does not exist, create an empty folder manually before running.
::::::::::::::::::::::::

:::::::::::::::: spoiler
## Using NGIAB through an SSH connection

NGIAB's core functions work through an SSH connection without port forwarding. However, to use the Data Visualizer, you will have to set up port forwarding to view visualization results on your local machine's browser.

To do so, run the following command on your local machine:

```bash
ssh -L 80:localhost:80 username@remote_host

```
Replace `username@remote_host` with your credentials.

Now, you should be able to run NGIAB as usual through your SSH tunnel, and access Data Visualizer results in your local browser.

::::::::::::::::::::::::

:::::::::::::::: spoiler
## Community Contributions to NGIAB/NextGen

The most up-to-date guidelines on community contributions for each repository can be found on its respective GitHub page. 

### General contribution guidance

- You can use the issue tracker on GitHub to suggest feature requests, report bugs, or ask questions.
- You can change the codebase through Git:
  - Create a fork
  - Clone the repository locally
  - Keep the fork and clone up-to-date
  - Create branches when you want to contribute
  - Make changes to the code
  - Commit to your local branch
  - Push commits to your GitHub fork
  - Create a pull request when the changes are ready to be incorporated

::::::::::::::::::::::::

## Your Turn

Based on your own interests and use cases, try out some of these options:

- Build a development version of NGIAB locally
- Install and use NGIAB on your HPC environment
- Use NGIAB through an SSH connection
- Contribute to NGIAB/NextGen!

::::::::::::::::::::::::::::::::::::: keypoints 

- NGIAB can be built locally using Docker, allowing for development without pulling from the remote registry.
- NGIAB supports HPC environments through Singularity, not Docker, but the workflow mirrors the local Docker use.
- Port forwarding is required to use the Data Visualizer through an SSH connection.
- Community contribution guidelines are available in each repository's GitHub page.

::::::::::::::::::::::::::::::::::::::::::::::::

[r-markdown]: https://rmarkdown.rstudio.com/
