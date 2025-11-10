import dotenv from "dotenv";
import fs from "fs";
import { Octokit } from "octokit";
dotenv.config();

console.clear();

const github_token = process.env.GITHUB_USER_ACTIVITY_CLI_TOKEN;
const github_owner = process.argv[2];
const github_repo = process.argv[3];

if (!github_token) throw new Error("github token is required");
if (!github_owner)
  throw new Error("github owner is required as a second argument");
if (!github_repo)
  throw new Error("github repository is required as a third argument");

if (!fs.existsSync("github_activity.json"))
  fs.writeFileSync("github_activity.json", "[]");

interface GitHubWatchEventItf {
  id: string;
  type: string;
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    action: "started";
  };
  public: boolean;
  created_at: string; // ISO timestamp
}

// npm run start:dev LadybirdBrowser ladybird
const githubCLI = async () => {
  const octokit = new Octokit({
    auth: github_token,
  });

  try {
    const response = await octokit.request(
      `GET /repos/${github_owner}/${github_repo}/events`,
      {
        owner: `${github_owner}`,
        repo: `${github_repo}`,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    // npm run start:dev LadybirdBrowser ladybird WatchEvent
    if (process.argv[4]) {
      const filteredByType = response.data.filter((d: GitHubWatchEventItf) => {
        return d.type !== process.argv[4];
      });
      console.log(filteredByType);
    }

    const responseData = JSON.stringify(response.data, null, 2);

    fs.writeFileSync("github_activity.json", responseData);
    console.log(`Response Status: ${response.status}`);
  } catch (err) {
    console.log(`Failed to retrieve data with error: ${err}`);
  }
};

githubCLI();
