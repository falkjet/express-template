# express-template

Project template for express projects

# setup

1.  **Download node.js** from [nodejs.org](https://nodejs.org/en/download/)

2.  **Download MongoDB**. You will need both the [database](https://www.mongodb.com/try/download) and [Compass](https://www.mongodb.com/try/download/tools)

3.  **Download the project template**.
    Click on `code` and then download zip or clone [https://github.com/falkjet/express-template](https://github.com/falkjet/express-template) using git.
    After the file is downloaded unzip it and open the directory in a text editor or IDE
4.  **Install dependencies**
    open a terminal (or command prompt on windows) in the project directory run the following command:

    ```
    npm i
    ```

    if you are using vscode you can use the Integrated terminal.

5.  **add a `.env` file**.
    Add a file named `.env` in the project directory and type the following. `<secret>` should be replaced with some random text and not be shared with anyone. `<database-name>` should be set to the name of the database you want to use. when you are just using a local database without authentication this database will be created automatically.

    ```sh
    SECRET=<secret>
    MONGODB_URL=mongodb://localhost/<database-name>
    ```

6.  **run the server**. Open terminal/Command prompt and run the command
    ```sh
    npm run dev
    ```
    in vscode you can also use the `JavaScrip Debug Terminal` for debugging.
