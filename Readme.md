# use Ctrl+Alt+Down or Ctrl+Alt+Up to insert more cursors on consecutive lines. 

.gitkeep =	Force Git to track an otherwise empty directory
.gitignore = Exclude files/folders from Git tracking | use gitignore-generator
.env = Keeping sensitive data secur
."type":"module" =  It tells Node.js to treat .js files as ES modules (ECMAScript Modules) instead of the default CommonJS modules.



## File Structrure ##

-> /src
      
      -  *index.js - DB connection     *app.js - config,cookies,urlencode      *constants.js - DB name , enum
      - *db
      - *models
      - *controllers
      - *middleware
      - *routes
      - *utils
      - *more(depends)




### DataBase Connection ###

     1. Create MongoDB Atlas Account
     Go to mongodb.com/cloud/atlas
     Create free cluster
     
     2. Create DB User
     Go to Database Access
     Add a user with username & password
     
     3. Whitelist IP
     Go to Network Access
     Add your current IP (or use 0.0.0.0/0 for all)
     
     4. Get Connection String
     Go to Connect > Connect Your Application
     Copy Node.js connection string
     
     5. Install Packages
     npm install mongoose dotenv
     
     6. .env File
     Stores sensitive config like your MongoDB URL and port.
     Keeps secrets out of your code.
     MONGODB_URI=your-connection-string
     PORT=5000
     
     7. db/index.js
     Connects your Node.js app to MongoDB Atlas using mongoose.
     Handles connection success or failure.
     await mongoose.connect(process.env.MONGODB_URI);
     
     8. index.js
     Main entry point of the app.
     Loads .env, starts Express server, and connects DB.
     dotenv.config();         // Load environment variables
     connectDB();             // Connect to MongoDB
     app.listen(...);         // Start Express server


### Utils ###

   * asyncHandler = asyncHandler is a higher-order function used in Express.js to handle errors in asynchronous route handlers without using try/catch blocks in every route.

   * ApiError = ApiError is a custom error class that extends the built-in Error class in JavaScript. It is used to send structured and meaningful error responses in Express.js applications.

   * ApiResponse = ApiResponse is a custom class used to send standardized success responses from an API.









### Packages ###

     * nodemon =nodemon is a development tool for Node.js that automatically restarts your server or app when it     detects changes in your source files.
      
     * dotenv = dotenv is a Node.js package that loads environment variables from a .env file into process.env in your app.
      
     * Prettier = Prettier is a code formatter — a tool that automatically formats your code to follow consistent style rules (indentation, quotes, spacing, etc.).
      
     * mongoose=It helps you interact with MongoDB databases using schemas and models instead of writing raw queries.||Connects your app to MongoDB
      
     * express=express is a lightweight web framework for Node.js used to build web servers and RESTful APIs.
 
     * cors=cors allows your backend server to accept requests from a different origin (domain, port, or protocol) — often needed when your frontend and backend are on  different domains.
 
     *  cookie-parser=Parses cookies attached to the client request object (req.cookies) so you can easily access and use them

