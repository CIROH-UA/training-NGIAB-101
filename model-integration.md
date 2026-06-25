---
title: "Model Integration"
teaching: 10
exercises: 50
---

:::::::::::::::::::::::::::::::::::::: questions

- What makes a model compatible with NGIAB and the NextGen framework?
- How do I integrate my own model into NGIAB?

::::::::::::::::::::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::: objectives

- Describe the requirements for integrating a Python model into NGIAB
- Integrate a BMI-compliant Python model by editing the NGIAB Dockerfile
- Rebuild the NGIAB image and run a test data package with the integrated model

::::::::::::::::::::::::::::::::::::::::::::::::

One of the strengths of the NextGen framework is its ability to support community-developed
hydrologic models through a modular architecture. Every model in NextGen exposes its
functionality through the [Basic Model Interface (BMI)](https://bmi.readthedocs.io/), which
lets models be swapped in and out and communicate with the framework through a standard set
of functions. NGIAB extends this by providing a reproducible, containerized environment in
which to integrate, test, and run those models.

In this hands-on episode, you will integrate a model into NGIAB yourself.

:::::::::::::::: callout
## Acknowledgement

This episode is adapted from the *"Model Integration in NextGen, NGIAB, and NRDS"* workshop
presented at [CIROH DevCon 2026](https://github.com/quinnylee/devcon2026-model-int-workshop).
::::::::::::::::::::::::

## The example model

The workshop team has prepared a dummy Python BMI model (regardless of input, every output
value is `0`) for you to integrate into NGIAB. You will need:

- The model source code, in a [GitHub repository](https://github.com/quinnylee/bmi_dummy)
- The model's published [PyPI distribution](https://pypi.org/project/bmi-dummy/)
- An [input data package](https://ciroh-ua-ngen-data.s3.us-east-2.amazonaws.com/AWI-011/cat-485551_devcon.tar.gz) for testing the model within NGIAB

Before starting, make sure you have cloned the
[NGIAB-CloudInfra](https://github.com/CIROH-UA/NGIAB-CloudInfra) repository and installed your
containerization software of choice (Docker or Podman). See the
[Installation and Setup episode](./installation.html) if you have not done this yet.

:::::::::::::::: callout
## Requirements for integrating a model

**Python models** can introduce dependency conflicts with the models already in NGIAB, so they
must meet the following requirements:

- Compatible with Python 3.11
- `netCDF==1.6.3` if `netCDF` is used
- `pydantic<2` if `pydantic` is used
- `pandas<3` if `pandas` is used
- A PyPI distribution is available for the model and any non-standard dependencies

**Non-Python models** must be compilable against `libc 2.34` or lower.
::::::::::::::::::::::::

## Step 1: Check the model against the requirements

A model's `pyproject.toml` file (available in its GitHub repository) contains the information
needed to verify the requirements above. For the dummy model:

1. `requires-python = ">=3.9"`, so it is compatible with Python 3.11.
2. `netCDF`, `pydantic`, and `pandas` are not listed as dependencies, so there are no known
   dependency conflicts.
3. A PyPI distribution for the model exists (linked above).

## Step 2: Understand the NGIAB Dockerfile

NGIAB is built with the Dockerfile located at `docker/Dockerfile` in the NGIAB-CloudInfra
repository. Dockerfiles describe how to build a Docker image step by step, in **stages** marked
by lines like `FROM rockylinux:9.1 AS base`.

The `final` stage (beginning at `FROM base AS final`) is the only stage accessible once the image
is built. **Your model must be installed in the `final` stage** so it is available at run time.

## Step 3 (optional): Build a baseline image

Building the image once before making changes speeds up later rebuilds and lets you watch how a
Dockerfile builds an image in real time. From the `docker` directory inside `NGIAB-CloudInfra`:

```bash
# Docker
docker build -f Dockerfile -t devcon-workshop .

# Podman
podman build -f Dockerfile -t devcon-workshop .
```

The `-f` flag points to the Dockerfile, `-t` names the image, and `.` is the build context.

## Step 4: Add your model to the Dockerfile

Edit `docker/Dockerfile` and insert the following line in the `final` stage, after the dHBV
install. Save the file when done.

```Dockerfile
RUN uv pip install bmi-dummy
```

A `RUN` command runs the given command while building the image — here, installing the
`bmi-dummy` PyPI package into the image. (`uv pip install` behaves like `pip install`, but faster.)

## Step 5: Rebuild the image

Run the same build command as in Step 3 so the rebuilt image includes your model.

## Step 6: Run NGIAB with the test package

Download and extract the test data package (if you have not already):

```bash
wget https://ciroh-ua-ngen-data.s3.us-east-2.amazonaws.com/AWI-011/cat-485551_devcon.tar.gz
tar -xf cat-485551_devcon.tar.gz
```

Then run NGIAB, replacing `/absolute/path/to/test/package` with the real absolute path to the
extracted `cat-485551_devcon` directory. Follow the interactive prompts once the container starts.

```bash
# Docker
docker run --rm -it -v "/absolute/path/to/test/package:/ngen/ngen/data" devcon-workshop /ngen/ngen/data

# Podman
podman run --rm -it -v "/absolute/path/to/test/package:/ngen/ngen/data" devcon-workshop /ngen/ngen/data
```

Here `--rm` removes the container when it finishes, `-it` opens an interactive terminal, `-v`
mounts your local data package into the container, `devcon-workshop` is the image you built, and
`/ngen/ngen/data` runs the NGIAB guide script.

**If your NGIAB run executes successfully, you have integrated the model!**

::::::::::::::::::::::::::::::::::::: challenge

## For those comfortable with Docker

Without reading the detailed steps above, integrate the dummy model on your own:

1. Confirm the model meets the integration requirements.
2. Make the `bmi-dummy` package accessible in the `final` stage of `docker/Dockerfile`.
3. Rebuild the NGIAB image.
4. Run NGIAB against the test data package.

:::::::::::::::::::::::: solution

You should end up adding `RUN uv pip install bmi-dummy` to the `final` stage of the Dockerfile,
rebuilding the image, and running it with the test package mounted to `/ngen/ngen/data` — exactly
the walkthrough in Steps 1–6 above.

::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::

:::::::::::::::: spoiler
## Troubleshooting

### Running out of memory during builds

Try changing every instance of `-j $(nproc)` to a small number of processes, such as `-j 4` or
`-j 2`.

### Podman NGIAB run randomly crashes

Your Podman virtual machine may default to a smaller size than NGIAB needs. Restart the machine
with more RAM and try again:

```bash
podman machine stop
podman machine init -m 8192 # 8 GiB of RAM
podman machine start
```
::::::::::::::::::::::::

## Your Turn

Think about a model you would like to bring into NGIAB:

- Review the requirements above and identify what information you would need to integrate your own model.
- Browse the example integration pull requests and Science Team request issues in the
  [DevCon 2026 integration tips](https://github.com/quinnylee/devcon2026-model-int-workshop/blob/main/integration-tips.md).
- For NGIAB integration help, open an issue in
  [CIROH-UA/NGIAB-CloudInfra](https://github.com/CIROH-UA/NGIAB-CloudInfra); for NRDS, open one in
  [CIROH-UA/ngen-datastream](https://github.com/CIROH-UA/ngen-datastream).

::::::::::::::::::::::::::::::::::::: keypoints

- Models integrate into NextGen/NGIAB through the Basic Model Interface (BMI), which lets models be swapped in and out of the framework.
- Python models must target Python 3.11, pin `netCDF`/`pydantic`/`pandas` to compatible versions, and ship a PyPI distribution; non-Python models must compile against `libc 2.34` or lower.
- A Python model is integrated by installing it in the `final` stage of the NGIAB Dockerfile, rebuilding the image, and running it against a test data package.

::::::::::::::::::::::::::::::::::::::::::::::::