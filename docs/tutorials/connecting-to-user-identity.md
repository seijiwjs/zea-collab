# Connecting to user Identity

Zea Collab is intended to be used alongside identity management platforms such as Auth0. The Avatar displayed key information from the identity such as the name, initials or avatar picture specified in the users data.

I the simple examples provided, we generate userData for connected users, as we cannot know who is accessing the samples. 

We use an online service to generate avatar images for each random user, however your app should be able to use the actual avatar images available in their user tokens.

```javascript
  const userData = {
    color: Color.random().toHex(),
    family_name: randomUser.name.first,
    given_name: randomUser.name.last,
    id: userId,
    picture: `https://avatars.dicebear.com/api/human/${userId}.svg?mood[]=happy`
  }
```

In your own applications, you can provided the Auth0 user token, or even create a custom userData based on whatever authentication system you might be using. 

Then, the 3d avatars of your users will display useful identifying information to the other users in the session.

