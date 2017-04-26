# REST API - tips
1. Verify the data coming from the other server
    - Create necessary credentials:E.g. the incoming data should have name, age, etc.
    - Verify the route. This is to make sure only urls from a particular server are approved

2. Secure all your routes
    - This is to take care of all sensitive data in your routes
    - Use environment variables as much as you can.[Dotenv](https://www.npmjs.com/package/dotenv) could come in handy

3. You could choose to save the incoming data into your db
    - Use [Mongoose](http://mongoosejs.com/) to create and verify a particular data's schema.
    - Use any other ORM.
    - This highlight is optional.