---
title: DevCon 2025 Jetstream Instructions
---

# Running NGIAB on Jetstream 

1. Access the Jetstream images page at: https://jetstream2.exosphere.app/exosphere/projects/e146e8611a874f4f8550a78f 9303ae95/regions/IU/images 
2. Search for “Devcon2025-NGIAB” and select “Create an instance”. 
3. Configure your instance: 
    - Give an instance name. 
    - For instance size, select “m3.large” 
    - Enable web desktop by selecting “Yes”. 
    - Keep all other configurations default. 
    -Select “Create” to finalize. 
4. Once your instance is ready, you will see an instance dashboard. 
5. Click on “Web Shell” under Interactions section. This will open a new terminal window logged into your instance. 
6. Run the following command:
```bash 
uvx --from ngiab_data_preprocess cli -i gage-10154200 -sfr --start 2017-09-01 --end 2018-09-01 --source aorc 
```
7. Clone the NGIAB-CloudInfra repo and run guide script: 
```bash
git clone https://github.com/CIROH-UA/NGIAB-CloudInfra.git cd NGIAB-CloudInfra 
./guide.sh 
```
8. When prompted, enter the following input data directory path: 
```
/home/exouser/ngiab_preprocess_output/gage-10154200 
```
9. Follow the prompts. Choose between serial or parallel mode. After the run is completed, you will be asked whether to run TEEHR evaluation. Finally, you will be prompted to run the visualizer (or you can run visualizer manually using `./viewonTethys`). 
10. Go to instance dashboard and select “Web Desktop” under the Interaction section. Open a browser and go to: http://localhost/apps/ngiab. Enter the login credentials to access NGIAB visualizer. 