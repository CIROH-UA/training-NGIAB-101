---
title: "Ways to run NGIAB"
teaching: 5
exercises: 5
---

:::::::::::::::::::::::::::::::::::::: questions

- How do I execute a NextGen run?

::::::::::::::::::::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::: objectives

- Recognize methods to execute NextGen models
- Execute a NextGen run using NGIAB

::::::::::::::::::::::::::::::::::::::::::::::::

## 1. Model Execution using `guide.sh`

`guide.sh` is used to execute pre-configured NextGen runs in NGIAB. These settings can be configured by users ahead of time using the [Data Preprocess tool](./data-preprocessor.html). Execute the following commands:

``` bash
cd NextGen
git clone https://github.com/CIROH-UA/NGIAB-CloudInfra.git
cd NGIAB-CloudInfra
./guide.sh
```

`guide.sh` will prompt you to enter input data pathways and allow you to select a computational mode (serial or parallel processing). After the run is complete, `guide.sh` will give you the option to evaluate model predictions and visualize results (discussed in the next two episodes).

## 2. Model Execution using Data Preprocess tool
A secondary method for executing a NextGen run in NGIAB is by using the Data Preprocess tool's CLI. The `-a` argument in the command will automatically run NGIAB after preprocessing selected data. As this module is being updated constantly, check back on its [GitHub page](https://github.com/CIROH-UA/NGIAB_data_preprocess) for the latest updates on its functionality.

## 3. Model Execution using CIROH-2i2c JupyterHub

Another way to interactively run NextGen is through Jupyter notebooks using the CIROH-2i2c JupyterHub. To get started, log in to the CIROH-2i2c JupyterHub. If you do not yet have access, please refer to the [Infrastructure Access page](https://hub.ciroh.org/docs/services/access) for instructions on requesting an account. Launch a JupyterHub server by selecting your preferred server size (or the default Small option for testing), choosing the **CIROH Community NextGen Hub** image, and clicking **Start**. For additional setup instructions, tutorials, and usage details, see the [CIROH Hub documentation](https://hub.ciroh.org/docs/products/ngiab/distributions/nextgen-2i2c/).hub.ciroh.orgInfrastructure Access | CIROH HubCIROH provides access to public cloud services, HPC, and on-premises infrastructure to support the research projects of CIROH's members and partners.hub.ciroh.orgNextGen on CIROH-2i2c JupyterHub | CIROH HubA dedicated image on CIROH-2i2c JupyterHub for running NextGen In A Box.

## 4. Model Execution using DataStreamCLI

DataStreamCLI provides an alternative command-line workflow for executing NextGen simulations. Unlike the Data Preprocess tool, which generates a complete NGIAB run package before execution, DataStreamCLI automatically generates forcings, realizations, and BMI configuration files as part of the execution workflow and then queues a NextGen simulation. This approach is useful for users who prefer an automated and scriptable workflow for running simulations and managing forcing data. DataStreamCLI can also be used independently of the NGIAB Data Preprocessor while still leveraging hydrofabric subsets and NextGen model configurations. For installation instructions and usage examples, refer to the [DataStreamCLI GitHub Repository](https://github.com/CIROH-UA/datastreamcli).


## Your Turn

Try one of the four methods described in this lesson to execute a NextGen run:

- Use `guide.sh` to execute a run from a preprocessed NGIAB dataset.
- Use the Data Preprocess tool with the `--run` option to automatically prepare and execute a simulation.
- Explore the CIROH-2i2c JupyterHub workflow for cloud-based execution.
- Review the DataStreamCLI workflow and compare it with the Data Preprocess and `guide.sh` approaches.

::::::::::::::::::::::::::::::::::::: keypoints

- NGIAB supports multiple execution workflows, including `guide.sh`, the Data Preprocess tool, CIROH-2i2c JupyterHub, and DataStreamCLI.
- The `guide.sh` workflow provides the most complete NGIAB experience, including optional evaluation and visualization.
- The Data Preprocess tool can automatically prepare and execute a NextGen simulation using a single command.
- CIROH-2i2c JupyterHub provides a cloud-based environment for running NGIAB without local installation.
- DataStreamCLI automates forcing generation, realization creation, BMI configuration, and model execution through a command-line workflow.

::::::::::::::::::::::::::::::::::::::::::::::::

[r-markdown]: https://rmarkdown.rstudio.com/
