# YomeFun Finish in June 1st

## Prerequisite

* Install the latest nodejs <a href="https://nodejs.org/en/" target="_blank">Download</a>
* Install the VSCode <a href="https://code.visualstudio.com/" target="_blank">Download</a>
* Install Git from <a href="https://git-scm.com/downloads" target="_blank">Download</a>

## Contributors
        Yijia

## Essential Parts with Git

>### checkout the commands with the <a href="https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html" target="_blank">Basic Command</a>
>#### Never make changes on master branch, it only can be merged with develop branch
>#### When start working on a new feature, follow these commands:
        
        git checkout develop (switch to develop branch)
        git pull (if there is new changes)
        git branch feature-[name]  (create a new branch,[name] means optional parameter)

>#### then start working on the new feature/[name] branch, you can commit and push it to the remote,after finishing it,
you can try to merge to the develop branch by these commands:

        git checkout develop
        git pull
        git merge feature/[name]  (merge the feature/[name] branch to develop)
        git push -u origin develop (push the merged code to develop)
        git push origin --delete feature/[name] (delete the remote one)
        git branch -d feature/[name] (delete the local feature/[name] branch )

>#### When there is a bug you need to fix, create branch named bugfix/[name] base on develop branch 
and follow the same steps like you do on feature


## Start web client app

>#### Open the directory you want to put the code, and open git bash enter below commands:

        git clone https://likeconan428@bitbucket.org/likeconan428/yomefun.git

>#### Then open the code repository each for client and server with VSCode and open the terminal enter below commands:

        npm install
        npm start

>#### Then open your browser and navigate to localhost:3000


## Deploy to ubuntu

### Install Git

        sudo apt install git

### Install Node and npm

        sudo apt-get install python-software-properties
        curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
        sudo apt-get install nodejs

### Install and config Nginx

#### open firewall ufw:

        sudo ufw app list  //check the available applications.
        sudo ufw allow OpenSSH
        sudo ufw enable
        sudo ufw status  // check allowed ufw

#### nginx

        sudo apt-get update
        sudo apt-get install nginx
        sudo nano /etc/nginx/sites-available/default

edit the file like below:

        server {
                client_max_body_size 20M;
                listen 80 default_server;
                listen [::]:80 default_server;

                root /app/upload;

                # Add index.php to the list if you are using PHP
                index index.html index.htm index.nginx-debian.html;

                server_name yomefun.com www.yomefun.com;

                location / {
                        # First attempt to serve request as file, then
                        # as directory, then fall back to displaying a 404.
                        proxy_pass http://localhost:3000;
                        proxy_http_version 1.1;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection 'upgrade';
                        proxy_set_header Host $host;
                        proxy_cache_bypass $http_upgrade;
                }
                
                location ~ \.(png|jpg|jpeg|gif){
                        try_files $uri $uri/ $uri.html =404;
                        access_log off;
                        expires 365d;
                }

               
        }


        server {
                client_max_body_size 20M;
                listen 80;
                listen [::]:80;

                server_name api.yomefun.com;

                location / {
                        proxy_pass http://localhost:9000;
                        proxy_http_version 1.1;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection 'upgrade';
                        proxy_set_header Host $host;
                        proxy_cache_bypass $http_upgrade;
                }

                # Requests for socket.io are passed on to Node on port 9000
                location ~* \.io {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-NginX-Proxy true;

                proxy_pass http://localhost:9000;
                proxy_redirect off;

                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                }


        }

save and restart nginx

        sudo nginx -t
        sudo systemctl restart nginx

#### Install Postgresql

        sudo apt-get update
        sudo apt-get install postgresql postgresql-contrib

switch account

        sudo -i -u postgres
        psql
        \password (reset password)
        \q (exit)
        createdb yomefun_production
        dropdb yomefun_production

