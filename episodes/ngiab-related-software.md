---
title: "Related Software"
teaching: 5
exercises: 5
---

:::::::::::::::::::::::::::::::::::::: questions
- What software components are commonly used in a NextGen workflow?
- What role does each tool play in preparing, running, and analyzing NextGen simulations?
::::::::::::::::::::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::: objectives
- Become familiar with the software ecosystem surrounding NextGen.
- Understand the purpose of each tool in the NextGen modeling workflow.
- Identify tools for data preparation, model execution, calibration, evaluation, and visualization.
::::::::::::::::::::::::::::::::::::::::::::::::

## Community Hydrofabric

The Community Hydrofabric provides the geospatial foundation used by NextGen and the NextGen In A Box (NGIAB) ecosystem. Maintained by CIROH, it is a temporary fork of Lynker Spatial's NextGen Hydrofabric v2.2 that includes improvements to support NGIAB workflows and interoperability across related software tools [(CIROH, 2025)](https://github.com/CIROH-UA/community_hf_patcher). The hydrofabric defines watershed connectivity through catchments, flowpaths, nexus points, and associated hydrologic attributes, providing the spatial framework required for NextGen simulations.

Several enhancements have been added to improve compatibility with NGIAB, including corrected gage-to-flowpath mappings, GeoPackage-compliant hydrolocation layers, and database indexing for faster data retrieval. During preprocessing, NGIAB automatically retrieves and subsets the required hydrofabric data for the selected study area, allowing users to work directly with model-ready inputs rather than managing hydrofabric datasets manually.

For additional information about the Community Hydrofabric and its role in NGIAB workflows, see the [Community Hydrofabric](./community-hydrofabric.html). 
<!-- .md needs to be changed to .html for web. -->



## Data Preprocess Tool

The Data Preprocess tool simplifies the preparation of input data for NextGen simulations in NGIAB. Through both a graphical user interface (GUI) and command-line interface (CLI), users can select a catchment, gage, watershed, or geographic location, define a simulation period, and generate a complete run package for NGIAB with minimal manual effort.

The tool automatically subsets the hydrofabric upstream of the selected location, generates catchment-scale meteorological forcings from NWM retrospective or AORC datasets, and creates the configuration files required for NextGen execution. It supports multiple model realizations, and an interactive map interface further streamlines workflow setup by enabling catchment selection and data preparation through a few simple steps.

While the tool significantly reduces the complexity of configuring NextGen simulations, it relies on predefined workflows and default model configurations, which may limit customization and advanced calibration options for some applications [(Cunningham, 2025)](https://github.com/CIROH-UA/NGIAB_data_preprocess).

For additional information about the Data Preprocess Tool and its role in NGIAB workflows, see the [Data Preprocessor](./data-preprocessor.html). 
<!-- .md needs to be changed to .html for web. -->


## NGIAB-Cal

NGIAB-Cal is a calibration utility for NextGen In A Box (NGIAB) workflows that automates the creation of calibration configurations, execution of parameter optimization, and integration of calibrated parameters back into a NextGen model setup. The tool uses observed USGS streamflow data and the Dynamically Dimensioned Search (DDS) algorithm to adjust model parameters and improve simulation performance.

The calibration workflow divides the simulation period into warmup, calibration, and validation phases. After allowing the model to stabilize during the warmup period, parameters are optimized against observations during calibration and subsequently evaluated on an independent validation period. NGIAB-Cal automatically generates the required configuration files, supports Docker-based calibration runs, and updates the model configuration with the optimized parameter values [(Cunningham, 2025)](https://github.com/CIROH-UA/ngiab-cal). 

For additional information about the NGIAB Calibration workflows, see the [Calibration](./calibration.html). 
<!-- .md needs to be changed to .html for web. -->


## TEEHR

**Tools for Exploratory Evaluation in Hydrologic Research (TEEHR)** is the primary model evaluation framework used within NGIAB to assess the performance of NextGen simulations [(CIROH, 2024)](https://github.com/CIROH-UA/ngiab-teehr). It automates the retrieval of observed USGS streamflow data and comparison datasets such as National Water Model (NWM) outputs, enabling systematic evaluation of model predictions against observations.

TEEHR provides tools for data ingestion, analytics, visualization, and performance assessment. It generates hydrographs, computes evaluation metrics such as Kling–Gupta Efficiency (KGE), Nash–Sutcliffe Efficiency (NSE), and Relative Bias (RB), and supports comparative analysis between simulated and observed streamflow. 

Through these capabilities, TEEHR helps researchers quantify model accuracy, identify sources of error, and evaluate the reliability of hydrologic simulations.

For additional information about the TEEHR framework, see the [TEEHR](./teehr.html). 
<!-- .md needs to be changed to .html for web. -->

## Data Visualizer

The Data Visualizer is a web-based application built on the Tethys Platform [(Swain et al., 2015)](https://doi.org/10.1016/j.envsoft.2015.01.014) that enables interactive exploration of NextGen and NGIAB model outputs. It provides geospatial visualization of hydrofabric features, including catchments and nexus points, alongside time-series analysis of streamflow and routing variables. The tool also integrates TEEHR evaluation results, allowing users to examine performance metrics and compare simulated and observed streamflow through interactive plots [(CIROH, 2025)](https://github.com/CIROH-UA/ngiab-client).

The Visualizer can be launched directly from NGIAB workflows through the `ViewOnTethys.sh` script, which automatically manages model outputs and metadata. Support for multiple model runs allows users to organize, compare, and explore simulation results within a single interface. 


In addition, the Visualizer integrates with NextGen DataStream products, enabling the discovery, download, and visualization of forecast and retrospective datasets.

For additional information about the Data Visualizer application, see the [Visualization](./visualization.html). 
<!-- .md needs to be changed to .html for web. -->

::::::::::::::::::::::::::::::::::::: callout

### Terminology
- **Community Hydrofabric** – provides the geospatial framework used by NGIAB.
- **Data Preprocess Tool** – prepares inputs for NextGen runs.
- **NGIAB-Cal** – calibrates model parameters.
- **TEEHR** – evaluates simulation performance.
- **Data Visualizer** – explores and visualizes results.

::::::::::::::::::::::::::::::::::::::::::::::::

## Your Turn

Here are some self-assessment questions for discussion or consideration:

- What role does each tool (Community Hydrofabrics, Data Preprocess, NGIAB-Cal, TEEHR, and Data Visualizer) play in the NextGen modeling workflow?
- Why are catchments, flowpaths, and nexus points important for hydrologic simulations?
- Why is model calibration important, and how does NGIAB-Cal help improve simulation performance?
- How can TEEHR be used to evaluate the accuracy of a NextGen simulation?
- What insights can be gained from visualizing catchments, nexus points, and streamflow time series in the Data Visualizer?
- How do these tools work together to support the preparation, calibration, evaluation, and interpretation of hydrologic model results?


::::::::::::::::::::::::::::::::::::: keypoints

- The Community Hydrofabric provides the watershed connectivity, catchments, flowpaths, and nexus information used throughout NGIAB workflows.
- The Data Preprocess tool simplifies the creation of NextGen run packages by generating hydrofabric subsets, forcings, and model configurations.
- NGIAB-Cal supports parameter calibration by optimizing model parameters against observed streamflow data.
- TEEHR provides automated model evaluation through hydrograph visualization and performance metrics such as KGE, NSE, and Relative Bias.
- The Data Visualizer enables interactive exploration of model outputs, including geospatial views, time series analysis, and TEEHR results.
- Together, these tools support a complete workflow for preparing, calibrating, evaluating, and interpreting NextGen simulations.

::::::::::::::::::::::::::::::::::::::::::::::::

[r-markdown]: https://rmarkdown.rstudio.com/