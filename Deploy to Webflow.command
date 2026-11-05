#!/bin/zsh
# Double-click this file to put the latest version of the page live at /preview.
cd "$(dirname "$0")"
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
echo "Deploying the Virtual Preview page to californiadentalassistant.com/preview..."
echo
echo "Installing any new packages..."
npm install --no-audit --no-fund || echo "(Package install had a problem; continuing with the deploy.)"
echo
npx -y @webflow/webflow-cli@2.15.0 apps deploy -e main --site-id 66ccd1ea2c9c64cd900a5d93 --mount /preview --no-input
status=$?
echo
if [ $status -eq 0 ]; then
  echo "Done. The page is live. You can close this window."
else
  echo "The deploy did not finish (error $status). Send a screenshot of this window to Claude."
fi
