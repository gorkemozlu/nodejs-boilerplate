#!/bin/bash
git clone https://github.com/gorkemozlu/nodejs-boilerplate.git

sudo apt install nodejs
sudo apt install npm
sudo npm install -g n
sudo n latest
sudo npm install -g npm
hash -d npm
npm install

cat >> /etc/systemd/system/sample-app.service <<EOF
[Unit]
Description=Sample App Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/nodejs-boilerplate
ExecStart=/usr/local/bin/node /root/nodejs-boilerplate/app.js
Restart=on-abort


[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl start sample-app.service