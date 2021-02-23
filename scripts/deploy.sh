

mkdir -p ~/.ssh
echo -e "${SSH_KEY}//_/\\n" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

ssh-keyscan -p 44901 -t rsa geonosis.ssh.umbler.com 2>&1 >> ~/.ssh/know_hosts


