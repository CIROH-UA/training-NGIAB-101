---
title: "Calibration"
teaching: 10
exercises: 15
---

:::::::::::::::::::::::::::::::::::::: questions 

- How do I calibrate parameters for a NextGen run?

::::::::::::::::::::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::: objectives

- Create calibration configurations for a NextGen run
- Run the `ngiab-cal` package

::::::::::::::::::::::::::::::::::::::::::::::::

## Parameter Calibration using `ngiab-cal`

`ngiab-cal` is a Python package that creates calibration configurations and copies calibrated parameters to a NextGen model configuration. It works with the NGIAB folder structure to ensure compatibility with the other suite of NGIAB tools.

The modeled time period is split into three periods: warmup, calibration, and validation. After the warmup period, the model parameters are adjusted to match observations in the calibration period, and the validation period is used to test the calibrated parameters.

## Using `ngiab-cal`

To use `ngiab-cal` without installation:
```bash
# Run directly without installation
uvx ngiab-cal --help
```

To install `ngiab-cal` as a package:
```bash
# Or install as a tool
uv tool install ngiab-cal
ngiab-cal --help
```

A configuration file at `calibration/ngen_cal_conf.yaml` controls the calibration process. Users can edit the configuration file to meet their needs and preferences, such as number of iterations, acceptable parameter ranges, and time periods. The layout of the configuration file is as follows:
```
general:
  strategy:
    type: estimation
    algorithm: dds         # Uses Dynamically Dimensioned Search algorithm
  name: calib              # Don't modify this
  log: true               # Enable logging
  workdir: /ngen/ngen/data/calibration  # Don't modify this working directory in the Docker container
  yaml_file: /ngen/ngen/data/calibration/ngen_cal_conf.yaml # Don't modify this either
  iterations: 100         # Number of calibration iterations (customizable with -i flag)
  restart: 0              # Start from beginning (0) or resume from iteration
# Model configurations
CFE:
  - name: b               # CFE parameter name
    min: 2.0              # Minimum allowed value
    max: 15.0             # Maximum allowed value
    init: 4.05            # Initial value
  - name: satpsi
    min: 0.03
    max: 0.955
    init: 0.355
  # Additional parameters...
eval_params:
  objective: kge           # Kling-Gupta Efficiency as objective function
  evaluation_start: "..."  # Start time for calibration period
  evaluation_stop: "..."   # End time for calibration period
  valid_start_time: "..."  # Start time including warmup
  valid_end_time: "..."    # End time of simulation
  # Additional time parameters...
  basinID: 01646500        # USGS gage ID
  site_name: "USGS 01646500: "  # Label for plots
```

Calibrating and saving parameters requires the three following commands, where `/path/to/ngiab/data/folder` is replaced with the appropriate filepath, and `USGS_GAGE_ID` is replaced with an appropriate USGS gage within your study area.

```bash
# Create calibration configuration
ngiab-cal /path/to/ngiab/data/folder -g USGS_GAGE_ID

# Create and run calibration (200 iterations)
ngiab-cal /path/to/ngiab/data/folder -g USGS_GAGE_ID --run -i 200

# Force recreation of calibration configuration
ngiab-cal /path/to/ngiab/data/folder -g USGS_GAGE_ID -f
```

More details about usage of `ngiab-cal` can be found on [its GitHub page](https://github.com/CIROH-UA/ngiab-cal).

## Your Turn

Use the `ngiab-cal` package to calibrate parameters for the input data that you used for your latest run.

Extra Credit: execute a NextGen run again, and compare the performance between calibrated parameters and uncalibrated parameters.

::::::::::::::::::::::::::::::::::::: keypoints 

- The `ngiab-cal` package is used to calibrate parameters for a NextGen model run.
- `ngiab-cal` is a command-line tool controlled via a YAML configuration file that determines parameter ranges, time periods, and evaluation metrics.

::::::::::::::::::::::::::::::::::::::::::::::::

[r-markdown]: https://rmarkdown.rstudio.com/
