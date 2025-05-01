---
title: "Model Execution"
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

## Model Execution using `guide.sh`

`guide.sh` is used to execute pre-configured NextGen runs in NGIAB. These settings can be configured by users ahead of time using the [Data Preprocess tool](/data-preparation.html). Execute the following commands:

``` bash
cd NextGen
git clone https://github.com/CIROH-UA/NGIAB-CloudInfra.git
cd NGIAB-CloudInfra
./guide.sh
```

`guide.sh` will prompt you to enter input data pathways and allow you to select a computational mode (serial or parallel processing). After the run is complete, `guide.sh` will give you the option to evaluate model predictions and visualize results (discussed in the next two episodes).

## Model Execution using Data Preprocess tool
A secondary method for executing a NextGen run in NGIAB is by using the Data Preprocess tool's CLI. The `-a` argument in the command will automatically run NGIAB after preprocessing selected data. As this module is being updated constantly, check back on its [GitHub page](https://github.com/CIROH-UA/NGIAB_data_preprocess) for the latest updates on its functionality.


## Your Turn

Use `guide.sh` to execute a NextGen run in NGIAB using your preprocessed data.

Extra Credit: Use the Data Preprocess tool to automatically execute a NextGen run in NGIAB.

::::::::::::::::::::::::::::::::::::: keypoints 

- To execute a NextGen run in NGIAB with full functionality, use `guide.sh` in the NGIAB container.
- A NextGen run in NGIAB can also be automatically executed post-preprocessing using the Data Preprocess tool.

::::::::::::::::::::::::::::::::::::::::::::::::

[r-markdown]: https://rmarkdown.rstudio.com/
