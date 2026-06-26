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

:::::::::::::::::::::::::::::::::::::: prereq

## Before you start

Every method below runs NextGen inside Docker, so the host needs:

- **Docker** installed and running
- **Python 3.10+** with [`uv`/`uvx`](https://docs.astral.sh/uv/)
- **At least 50 GB of free disk** (more for large domains) — the hydrofabric is downloaded on the first run (~1.7 GB compressed, much larger once decompressed), in addition to forcings and outputs
- **8+ GB RAM and 4+ CPU cores** recommended

::::::::::::::::::::::::::::::::::::::::::::::::

## Which method should I use?

| If you want to... | Use |
|---|---|
| Run a preprocessed dataset with guided evaluation/visualization | `guide.sh` |
| Prepare and run in a single command | Data Preprocessor (`--run`) |
| Run in the cloud with no local install | CIROH-2i2c JupyterHub |
| Use a scriptable workflow with custom forcing | DataStreamCLI |

## 1. Model Execution using `guide.sh`

`guide.sh` is used to execute pre-configured NextGen runs in NGIAB. These settings can be configured by users ahead of time using the [Data Preprocessor tool](./data-preprocessor.html). Execute the following commands:

``` bash
cd NextGen
git clone https://github.com/CIROH-UA/NGIAB-CloudInfra.git
cd NGIAB-CloudInfra
./guide.sh
```

`guide.sh` will prompt you to enter input data pathways and allow you to select a computational mode (serial or parallel processing). After the run is complete, `guide.sh` will give you the option to evaluate model predictions and visualize results (discussed in the next two episodes).

## 2. Model Execution using Data Preprocessor

A secondary method for executing a NextGen run in NGIAB is by using the Data Preprocessor's CLI. The Data Preprocessor prepares a complete NGIAB run package by subsetting the hydrofabric, generating forcings, and creating realization and BMI configuration files. It can also automatically launch a Docker-based NGIAB run after preprocessing using the `--run` flag. 

```bash
uvx -p 3.10 --from ngiab_data_preprocess cli -i gage-02342500 -sfr --start 2020-01-01 --end 2020-01-07 --source aorc --run
```
In this command, `uvx` runs the Data Preprocessor without installing it as a package. The `-i` argument specifies the location to model, `-sfr` subsets the hydrofabric, generates forcings, and creates realization files, `--source aorc` selects AORC forcing data, and `--run` automatically launches the NGIAB simulation after preprocessing.

As this module is being updated constantly, check back on the [(NGIAB_data_preprocess GitHub Repository)](https://github.com/CIROH-UA/NGIAB_data_preprocess) for the latest updates on its functionality. By default, results are written to `~/ngiab_preprocess_output/<gage-id>/`.

:::::::::::::::::::::::::::::::::::::: callout

## Tip: long-running runs

Preprocessing and the NextGen run can take several minutes (longer for large domains or date ranges). If you are working over SSH or a remote console, start the command inside [`tmux`](https://github.com/tmux/tmux/wiki) (or `screen`) so it keeps running if your connection drops:

```bash
tmux new -s ngiab      # run your command here; detach with Ctrl-b then d
tmux attach -t ngiab   # reattach later
```

::::::::::::::::::::::::::::::::::::::::::::::::

## 3. Model Execution using CIROH-2i2c JupyterHub

Another way to interactively run NextGen is through Jupyter notebooks using the CIROH-2i2c JupyterHub. To get started, log in to the CIROH-2i2c JupyterHub. If you do not yet have access, please refer to the [Infrastructure Access page](https://hub.ciroh.org/docs/services/access) for instructions on requesting an account. Launch a JupyterHub server by selecting your preferred server size (or the default Small option for testing), choosing the **CIROH Community NextGen Hub** image, and clicking **Start**. For additional setup instructions, tutorials, and usage details, see the [CIROH Hub documentation](https://hub.ciroh.org/docs/products/ngiab/distributions/nextgen-2i2c/).

## 4. Model Execution using DataStreamCLI

DataStreamCLI provides an alternative command-line workflow for executing NextGen simulations. In this workflow, users can subset the hydrofabric using the Data Preprocessor and then use that subset hydrofabric as input to DataStreamCLI. DataStreamCLI automatically generates forcings, realizations, and BMI configuration files as part of the execution workflow before launching a NextGen simulation. This approach is useful for users who prefer an automated and scriptable workflow for running simulations and managing forcing data.

```bash
 uvx --from ngiab_data_preprocess cli -i gage-02342500 -s
cd /path/to/datastreamcli
cp ~/ngiab_preprocess_output/gage-02342500/config/gage-02342500_subset.gpkg .
chmod +x ./scripts/datastream
./scripts/datastream -s 202001010100 \
                    -e 202001070000 \
                    -C NWM_RETRO_V3 \
                    -d $(pwd)/data/datastream_test \
                    -g $(pwd)/gage-02342500_subset.gpkg \
                    -R $(pwd)/configs/ngen/realization_sloth_nom_cfe_pet_troute.json \
                    -n 4
```
In this command, `-s` specifies the simulation start time, `-e` specifies the end time, `-C` selects the forcing source, `-d` specifies the output directory, `-g` provides the hydrofabric geopackage, `-R` specifies the realization template, and `-n` sets the number of processes used during execution.

For installation instructions and additional examples, refer to the [DataStreamCLI GitHub Repository](https://github.com/CIROH-UA/datastreamcli).

:::::::::::::::::::::::::::::::::::::: callout

## Troubleshooting

- **`No space left on device`** — the run ran out of disk, often during the hydrofabric download. Use a larger disk (≥ 50 GB), remove any partial download under `~/.ngiab`, and re-run.
- **A long run stopped when the terminal disconnected** — re-run inside `tmux`/`screen` (see the tip above) so it survives dropped connections.

::::::::::::::::::::::::::::::::::::::::::::::::

## Your Turn

Try one of the four methods described in this lesson to execute a NextGen run:

- Use `guide.sh` to execute a run from a preprocessed NGIAB dataset.
- Use the Data Preprocessor tool with the `--run` option to automatically prepare and execute a simulation.
- Explore the CIROH-2i2c JupyterHub workflow for cloud-based execution.
- Review the DataStreamCLI workflow and compare it with the Data Preprocessor and `guide.sh` approaches.

::::::::::::::::::::::::::::::::::::: keypoints

- NGIAB supports multiple execution workflows, including `guide.sh`, the Data Preprocessor tool, CIROH-2i2c JupyterHub, and DataStreamCLI.
- The `guide.sh` workflow provides the most complete NGIAB experience, including optional evaluation and visualization.
- The Data Preprocessor tool can automatically prepare and execute a NextGen simulation using a single command.
- CIROH-2i2c JupyterHub provides a cloud-based environment for running NGIAB without local installation.
- DataStreamCLI automates forcing generation, realization creation, BMI configuration, and model execution through a command-line workflow.

::::::::::::::::::::::::::::::::::::::::::::::::

[r-markdown]: https://rmarkdown.rstudio.com/
