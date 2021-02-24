# PS Solution Library - Sharepoint Files

ATENTION!!! Move the "commom" folder outside of the main folder to build the tile!

## Purpose

This tile's purpose is to display a list of files and folders under a given Sharepoint Site URL. Each customer will have its own integration key, which must be entered in the tile configurations for the tile to work,as the authentication with sharepoint will be set on Tray.io. 

Cliking in a file or folder will take you to Sharepoint, to the same File/Folder you clicked.

## Set up

An integration user must be provided by the customer to the Professional Services Team, so the connection with the back-end can authenticate with Sharepoint. This user must have READ ONLY access to the files under the Sharepoint Sites the customer wants to list the files from.

The tile will need 2 configurations parameters to properly work:

  - The Integration Key, which identifies the customer workflow that handles authentication and data exchange between Sharepoint and Jive. this integration key is the Tray Webhook URL unique code (https://webhookurl.trayapp.io) encoded in base 64;
  - The site folder URL, which contains the domain, site and the path to the folder within the URL (e.g. https://aureaonboarding.sharepoint.com/sites/TestingSIte/Shared%20Documents/Forms/AllItems.aspx?viewid=8b85f52c%2Da79f%2D43c0%2Da54b%2Dcc4a5635cd73&id=%2Fsites%2FTestingSIte%2FShared%20Documents%2example, where "aureaonboarding" is the domain, testingSIte is the site and sites/TestingSite/Shared Documents/example is the folder path). Giving the tile only the domain will return the files on the root folder;

Other parameters can also be configured to customize the tile further:

  - Custom Title
  - Display only folders, only files or both
  - Show file extension in file name
  - Enable the Search bar
  - Tile height
  - Filter by file type
  - File type to filter by
  - Color of tile Header
  - Color of Title text
  - Show tile header
  
## Sharepoint Folder Link

To ensure the right Folder Link is being used, when in Sharepoint, return to the main directory of the site, so the page URL will not contain any unnecessary characters. Navigate directly to the folder which you want to display in the tile and copy the URL. This is the Site Folder URL that must be used with the tile.
