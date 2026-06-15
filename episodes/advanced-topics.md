---
title: "Advanced Topics"
teaching: 5
exercises: 60
---

:::::::::::::::::::::::::::::::::::::: questions

- How do I use NGIAB on an high-performance computing (HPC) system?
- How do I use the Data Visualizer through an SSH connection?
- Are there other ways I can run NGIAB?
- How can I contribute to NGIAB?
- How can new models be integrated into NGIAB and NextGen?

::::::::::::::::::::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::: objectives

- Install and use NGIAB on an HPC
- Use port forwarding to view NGIAB results
- Explain the NGIAB community contribution process
- Learn about other ways to run NGIAB
- Describe the general workflow for integrating models into NGIAB

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

This section explains how to run **NextGen In A Box (NGIAB)** using **Singularity** on the **Pantarhei HPC system** at the University of Alabama. To access Pantarhei, please follow the instructions on [CIROH's Hub page](https://hub.ciroh.org/docs/services/on-prem/Pantarhei/access).

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

Other options: AWI-007 or AWI-008 can be used similarly, see the [Installation and Setup episode](./installation.html#step-2-download-sample-data).

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

- When asked **“Do you want to use the same path?”**, type `n`

- Then enter the **full absolute path** to your extracted dataset folder. Example:


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
ssh -L 80:localhost:[local port number] username@remote_host

```

Replace `username@remote_host` with your credentials.

Now, you should be able to run NGIAB as usual through your SSH tunnel, and access Data Visualizer results in your local browser.

::::::::::::::::::::::::

:::::::::::::::: spoiler

## Running NGIAB in JupyterHub

To run NGIAB in a JupyterHub environment, please follow the instructions in our [HydroShare resource](https://www.hydroshare.org/resource/27045581bdea4808a393330f2417379c/).

::::::::::::::::::::::::

:::::::::::::::: spoiler

## Running NGIAB in DatastreamCLI

To run NGIAB through DatastreamCLI, please follow the instructions in our [datastreamCLI GitHub page](https://github.com/CIROH-UA/datastreamcli/tree/main). This page has an example command that can be run locally, and the repository also contains a tutorial guide script at `scripts/datastream_guide`.

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

:::::::::::::::: spoiler

## Model Integration Guidelines

One of the strengths of the NextGen framework is its ability to support community-developed hydrologic models through a modular architecture. NGIAB extends this capability by providing a reproducible environment for integrating, testing, evaluating, and distributing models within the broader NextGen ecosystem.

### Integration Requirements

One of the core requirements for model integration is compatibility with the Basic Model Interface (BMI). All integrated models must expose functionality through BMI so they can communicate with the NextGen framework and participate in standard NextGen workflows.

Before integrating a model into NGIAB, developers should prepare:

- An example input data package.
- Instructions for generating forcings and BMI configuration files.
- Instructions for accessing any source data required for forcings or model attributes.

#### Python Models

Because of potential package dependency conflicts with existing Python models in NGIAB, new Python models should meet the following requirements:

- Compatible with Python 3.11.
- `netcdf==1.6.3` if the model uses the `netcdf` package.
- `pydantic<2` if the model uses `pydantic`.
- `pandas<3` if the model uses `pandas`.
- PyPI distributions should be available for the model and any non-standard dependencies to simplify wheel building and deployment.

#### Non-Python Models

For compiled models written in languages such as C, C++, or Fortran:

- The model should be compilable against `libc 2.34` or lower.
- The model must be compatible with the NextGen build environment and containerized execution workflows.

### Integration into NGIAB

The integration process depends on the type of model being added.

For Python models:

- Add the model package and its dependencies to the NGIAB container environment.
- Configure BMI and realization files so the model can be executed through standard NextGen workflows.

For compiled models:

- Add the model as a component within the NextGen build system.
- Build the model's shared object libraries within the NGIAB container environment.
- Configure BMI and realization files for execution through NextGen.

Regardless of implementation language, models should be configured so that they can be executed through standard NextGen realizations and workflows.

### Integration into Supporting Tools

Model integration often requires updates to supporting NGIAB software:

- The Data Preprocessor may require new realization templates, BMI configuration files, forcing-generation workflows, or additional model-selection options within the CLI.
- Calibration workflows may require parameter definitions and configuration updates.
- Evaluation and visualization tools should be verified to ensure compatibility with new model outputs.

### Best Practices

When integrating a new model, developers should:

- Test the model using a small study area before large-scale execution.
- Verify that forcings and hydrofabric inputs are correctly mapped.
- Compare outputs against benchmark simulations and observations.
- Document assumptions, parameters, and required dependencies.
- Maintain reproducible workflows using version control and configuration files.

Through this process, NGIAB provides a consistent framework for integrating new hydrologic models while maintaining compatibility with existing workflows for preprocessing, execution, calibration, evaluation, and visualization.
::::::::::::::::::::::::

## Your Turn

Based on your own interests and use cases, try out some of these options:

- Install and use NGIAB on your HPC environment
- Use NGIAB through an SSH connection
- Contribute to NGIAB/NextGen!
- Run NGIAB in another way!
- Review the requirements for integrating a new model and identify what information would be needed to add your own model to NGIAB.

::::::::::::::::::::::::::::::::::::: keypoints

- NGIAB supports HPC environments through Singularity, not Docker, but the workflow mirrors the local Docker use.
- Port forwarding is required to use the Data Visualizer through an SSH connection.
- Community contribution guidelines are available in each repository's GitHub page.
- NGIAB can also be run through JupyterHub or DatastreamCLI.
- Model integration in NGIAB requires model configuration, supporting input datasets, and compatibility with the broader NGIAB ecosystem, including preprocessing, calibration, evaluation, and visualization tools.

::::::::::::::::::::::::::::::::::::::::::::::::

[r-markdown]: https://rmarkdown.rstudio.com/
