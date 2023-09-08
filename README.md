1. Sign up for Heroku
2. Download and install the Heroku CLI.
3. If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.
4. Open your terminal or command line
5. Clone this repository
6. In your terminal or command line type `cd anticheat-example-server`
7. In your terminal or command line type `heroku create`
8. type `git add . && git commit -am "first commit" && git push heroku master`
9. type `heroku open` to open the app in the browser and copy your url
10. You can use this url in your unity project

MAKE SURE TO UPDATE YOUR TITLEID, PLAYFAB DEVELOPER SECRET KEY AND YOUR FIREBASE SERVICE ACCOUNT JSON

Details on how to generate a service account json file below


Creating a Firebase service account and obtaining the associated JSON key for use with the firebase-admin library involves a series of steps in the Firebase Console. Here's a step-by-step guide to help you achieve this:

Go to the Firebase Console:

Navigate to the Firebase Console and sign in with your Google account.

Select Your Project:

Choose the Firebase project for which you want to create a service account.

Access Project Settings:

In the Firebase Console's left sidebar, click on the gear icon (⚙️) next to "Project Overview" and select "Project settings".

Navigate to the Service Accounts Tab:

In the Project settings page, go to the "Service accounts" tab.

Generate a New Private Key:

Here, you'll see details about your Firebase Admin SDK service account. Click on the "Generate new private key" button at the bottom of the page. This action will prompt you to confirm, and upon confirming, it will download a .json file to your computer.

Store the JSON File Securely:

This file contains sensitive information, including a private key. It's essential to store it securely and avoid committing it to public repositories.
As mentioned in our previous interaction, if deploying to platforms like Heroku, consider using environment variables or config vars to securely store the credentials.
