# LibraryUI
A Node.JS Server and the Web UI for a Library App.

It is built with a Cloudant NoSQL Database, a Watson Text-To-Speech Service and a Watson Conversation Service, HTML, CSS, Bootstrap and jQuery.

## Deploy to Bluemix

1. Deploy the Java back end to Bluemix [https://github.com/florae123/library-server-java](https://github.com/florae123/library-server-java) and bind it to a Cloudant NoSQL Database.

2. Clone the app to your local environment from your terminal using the following command

    ```
    git clone https://github.com/florae123/Libraryui
    ```

3. Open the file **manifest.yml** and change the host name to something unique. Change the "LIBRARY_URI" to the URL of your java library server and add "/api" at the end.

4. Log in to your Bluemix account using the Cloud Foundry CLI tool.

	```
	cf login
	```

5. Push the app to Bluemix.

	```
	cf push LibraryUI
	```

6. Create a Watson Text-To-Speech Service and connect it to the app LibraryUI.

7. Create a Watson Conversation Service and bind it to the app. Launch, and import a workspace using the file **conversation-workspace.json**.
