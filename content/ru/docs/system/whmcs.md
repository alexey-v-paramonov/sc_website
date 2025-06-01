---
title: "WHMCS integration"
date: 2024-08-23T11:40:53+03:00
weight: 41
summary: "To update your installed Streaming.Ceter radio Platform to the latest version, simply connect to your server via SSH and run the provided update command, which will automatically apply updates and perform system checks, with optional support for custom post-update scripts."
seo_title: "Upgrade Guide for Internet Radio Control Panel | Streaming.Center"
description: "Learn how to safely upgrade your Internet radio control panel to the latest version, with step-by-step instructions and troubleshooting tips."
---

# WHMCS Provisioning Module

WHMCS, which stands for Web Host Manager Complete Solution, is an all-in-one platform designed for web hosting businesses to manage clients, billing, and support. It streamlines various aspects of web hosting operations, from customer sign-ups to server provisioning, all in one place. 


Streaming.Center platform has WHMCS itegration via a special module that you can download and install into your WHMCS instance allowing you to manage your radio account easily.
Out module is Open-Source, you can see the complete source code at [GitHub](https://github.com/alexey-v-paramonov/streamingcenter_whmcs/)

## 🚀 Features

- Automated account provisioning
- Service management (suspend, unsuspend, terminate)
- Configurable module settings
- Integration with WHMCS billing cycles
- Supports latest WHMCS versions

---

## 📦 Requirements

- WHMCS version 8+
- PHP 7+
- Valid Streaming.center license
- Admin credentials for Streaming.Center admin area

## 🔧 Installation

1. **Download** the latest [version of the module](https://github.com/alexey-v-paramonov/streamingcenter_whmcs/archive/refs/heads/main.zip) and unzip the file.

2. Upload the "streamingcenter" folder from the archive into:

   ```
   /modules/servers/
   ```

   on your WHMCS server, so that the final path to the module would be:

   ```
   /modules/servers/streamingcenter
   ```

   and the module files on your sever should be located inside the `/modules/servers/streamingcenter` folder like this:
   ```
   /modules/servers/streamingcenter/hooks.php
   /modules/servers/streamingcenter/logo.png
   /modules/servers/streamingcenter/readme.txt
   /modules/servers/streamingcenter/streamingcenter.php
   ```

   Folder naming and location are **important for the module to work correctly**.
   {{< lightbox "/images/whmcs/whmcs_upload.png" "/images/whmcs/whmcs_upload.png" >}}


3. **Configure** the module in WHMCS Admin:

    Go to **System Settings > Products/Services > Servers**  
    
    Add a new server using the module: "Streaming.Center"

    Enter your Streaming.Center admin credentials (it is available after Streaming.Center installation)
    {{< lightbox "/images/whmcs/add_server_mini.png" "/images/whmcs/add_server.png" >}}

4. **Assign** the module to your WHMCS products.

    Create a new **Product** in WHMCS: 
    go to **System Settings > Products/Services** and click **Create a New Product**.

    You can give your product a name whatever you want, but you have to set "Streaming.Center" as the **Module**
    
    {{< lightbox "/images/whmcs/add_product_mini.png" "/images/whmcs/add_product.png" >}}

    When the package is ready you can configure the settings by navigating to **Module Settings** and choosing a broadcaster template (you need to create it in your Streaming.Center admin area first) or by picking individual account settings by choosing "No Template" in **Radio Account Template**.

    {{< lightbox "/images/whmcs/edit_product_mini.png" "/images/whmcs/edit_product.png" >}}

5. **Creating** a new order.    

    Now you can go to **Orders** and click **Add New Order**
    {{< lightbox "/images/whmcs/add_order_mini.png" "/images/whmcs/add_order.png" >}}

    pick the product that you have created in step **#4** and click **Submit Order**.

    {{< lightbox "/images/whmcs/submit_order.png" "/images/whmcs/submit_order.png" >}}

    Make sure to check **Run Module Create** - it will trigger broadacster account creation in Streaming.Center, pick your broadcaster account **username** and the password. You will not be able to change the username later and it should be unique.

    Click **Accept order**. It will take a few minutes for the broadcaster account to create in Streaming.Center.

5. **Updating** an existing order.    
    When your order is in "Active" state and the broadcaster accoutn is ready and running in Streaming.Center you can change the account options individually. To do that you need to find your order, click on it and then click **Product/Service** link in the "Item" column of the **Order Items** table. Inside the **Products/Services** tab you will find all your broadacster account ptions and functions like account suspension, password change and termination.
    You can also change individual accoutn settign using this form:
    {{< lightbox "/images/whmcs/change_order.png" "/images/whmcs/change_order.png" >}}

If you have any issues installing or using our WHMCS module - please countact our support at info@streaming.center.