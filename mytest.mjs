import { exec } from 'child_process';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

async function getToken() {

  const npmrcFile = fs.readFileSync('.npmrc', 'utf-8');
  console.log(npmrcFile)
  const username = config.userName;
  const token = config.gitToken;
  return { token, username };
}

const repo = 'exampathfinder/epf-preparation';

const setRemotes = async () => {
  try {
    const {token, username} = await getToken();
  
  } catch(err) {

  }
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/forks`, {
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${token}`)}`
      }
    });

    const users = await response.json();
    if (users.message !== "Not Found") {
      users.forEach((user) => {
        const userName = user.full_name.split("/")[0];
        exec(`git remote add ${userName} ${user.ssh_url}`, (error) => {
          if (error) {
            if (error?.message.includes(`remote ${userName} already exists`)) {
              exec(`git remote set-url ${userName} ${user.ssh_url}`);
            }
            else {
              console.log(error);
            }
          }
        });
      });
    }
    else {
      console.log("GitToken is wrong");
    }
  } catch (error) {
    console.log("An error occured while setting Remote", error);
  }
}

setRemotes();
