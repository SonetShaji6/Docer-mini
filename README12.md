# Run the project — troubleshooting for docker-compose on Fedora

Quick try (Docker Compose v2 CLI):
- Use the new CLI (no hyphen):
  - docker compose up --build

If you prefer installing the old docker-compose command or the plugin:
- The package manager error you saw (404) indicates a mirror/repo issue. Try:
  - sudo dnf update
  - sudo dnf install docker-compose-plugin
  - then use: docker compose up --build
- Or install podman/docker alternatives on Fedora:
  - sudo dnf install podman-docker
  - podman can often run: docker compose up --build

Temporary local (no Docker) — run services manually:
- Backend:
  - cd backend
  - npm install
  - npm start
  - (server runs on http://localhost:5000)
- Frontend (dev or static):
  - cd frontend
  - npm install
  - npm start            # dev server (usually http://localhost:3000)
  - OR build & serve static:
    - npm run build
    - npx serve -s build -l 80

Notes:
- The Compose file maps frontend container port 80 -> host 3000; if serving statically with `serve`, you can use the same port mapping locally.
- If you keep seeing repository/mirror errors when installing via dnf, try switching mirrors or follow Docker's official install instructions for Fedora.

Docker Compose warning
- If you see: "the attribute `version` is obsolete, it will be ignored" — remove the top-level `version:` key from docker-compose.yml (already removed in the repo).

Docker daemon / permission denied when connecting to /var/run/docker.sock
- Ensure Docker is running:
  - sudo systemctl start docker
  - sudo systemctl enable docker
- Temporary (quick) workaround:
  - Run the compose command with sudo:
    - sudo docker compose up --build
- Preferred (grant your user access to the socket):
  - sudo usermod -aG docker $USER
  - Then log out and log back in (or run newgrp docker) so the group change takes effect.
- Alternative (Fedora / rootless):
  - Install podman-docker and use podman:
    - sudo dnf install podman-docker
    - docker compose up --build  # will use podman under the hood

Git push error: "src refspec main does not match any"
- Meaning: your local repo has no branch named `main` or there are no commits to push.
- Quick fixes:

  1) If you haven't committed yet (common for new repos):
     - git add .
     - git commit -m "Initial commit"
     - git branch -M main
     - git remote add origin <repo-url>   # only if origin not set
     - git push -u origin main

  2) If your branch is named `master` (rename and push):
     - git branch -M main
     - git push -u origin main

  3) Push current branch to remote `main` without renaming locally:
     - git push -u origin HEAD:main

  4) Debugging commands:
     - git branch --show-current
     - git log --oneline
     - git remote -v
     - git ls-remote --heads origin

Replace <repo-url> with your GitHub remote URL (for example the one printed in the error). After running the appropriate commands, retry: git push -u origin main
