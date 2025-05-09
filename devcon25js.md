---
title: DevCon 2025 Jetstream Instructions
---

# Running NGIAB on Jetstream for DevCon 2025

::::::::::::::::::::::::::::::::::::: callout

Before continuing, you will need the SSH credentials for your instance. These have been emailed to you.

:::::::::::::::::::::::::::::::::::::::::::::

## Setting up an SSH session with SSH tunneling

Input the following command into your Unix terminal or Windows command prompt:
```bash 
ssh  -L [port]:localhost:[port] [username]@[ip.address]
```

The -L flag is used to initiate SSH tunneling, which is necessary to view the NGIAB visualizer.

Your selected port in the above command will differ depending on how you'd prefer to connect to the visualizer.

- [Recommended] To open the visualizer directly in your web browser, use a port such as `80` or `8080`.
    - You may receive a message such as "Could not request local forwarding." If this happens, you will need to select a different port.
- If you would like to open the visualizer via a VNC client, user port `5906`.
    - This approach requires a VNC client to be installed on your computer. [RealVNC](https://www.realvnc.com/en/connect/download/viewer/) and [TigerVNC](https://tigervnc.org/) are common choices.

When logging in for the first time, you may be asked whether you'd like to trust the host. Type 'yes' to do so.

After that, simply type in your password to gain access to your instance's terminal.

## Task 1: Running NGIAB With Prepared Data
1. Run the following command to preprocess data:
```bash 
uvx --from ngiab_data_preprocess cli -i gage-10154200 -sfr --start 2017-09-01 --end 2018-09-01 --source aorc 
```
2. Run the following commands to clone the NGIAB-CloudInfra repo and run guide script: 
```bash
mkdir NGIAB_demo
cd NGIAB_demo
git clone https://github.com/CIROH-UA/NGIAB-CloudInfra.git 
cd NGIAB-CloudInfra 
./guide.sh 
```
3. When prompted, enter the following input data directory path: 
```
/home/exouser/ngiab_preprocess_output/gage-10154200 
```
4. Follow the prompts. Choose between serial or parallel mode. Serial will run NextGen on one process, whereas parallel will run NextGen on multiple processes at once. 
5. When prompted to redirect command output to `/dev/null`, select yes. This keeps your output logs clean.
6. After the run is completed, run the TEEHR evaluation when prompted. Choose Option 1 (use existing Docker image).
7. Open the Tethys visualizer when prompted. Choose Option 1 (use existing Docker image).
    - If you are opening the visualizer in your web browser, open the Tethys server on the same port that you chose to tunnel with.
    - If you are opening the visualizer in a VNC client, open the Tethys server on port `80`.
8. Open the visualizer!
    - If you are opening the visualizer in your web browser, simply enter the link provided by the console output.
    - If you are opening the visualizer in a VNC client, first connect to `localhost:5906`. Then, open the link provided by the console output in the remote desktop's web browser.

# Task 2: Running NGIAB with Your Own Data

1. Use the Data Preprocess tool's graphical user interface (map app) to select your favorite catchments and time period that you would like to perform a NextGen run on.

![Figure 1: Example view from the Data Preprocess tool. The highlighted region (light orange area; downstream-most basin in pink) represents the specific study basin, illustrating the river network (blue lines), sub-basins (orange), and surrounding USGS gaging stations (black dots).](fig/fig1-4.png){alt='A map view displaying the Provo River network and basin boundaries in the area around Woodland, UT. The map includes the stream network shown in blue, basin boundaries in orange shaded regions, the downstream-most basin in a pink shaded reagion, and black dots representing USGS gage locations.'}

```bash
uvx --from ngiab_data_preprocess map_app
```

2. Copy the given command and run it to preprocess data. If you include the `--run` tag, the Data Preprocessor will automatically execute a NextGen run.
3. If you included the `--run` tag, you will need to run the `runTeehr.sh` and `viewOnTethys.sh` scripts separately in order to use TEEHR and the Data Visualizer.
```bash
./runTeehr.sh
./viewOnTethys.sh
```
If you did not include the `--run` tag, you can run `guide.sh` as described in Task 1.
```bash
./guide.sh
```
4. Experiment with different basins or options as much as you'd like!