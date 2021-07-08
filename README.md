# Pixcord

Ever tried sharing an publication from Pixiv to Discord? If you have you might know what I'm talking about and if you haven't allow me to explain.
Sadly when you share a link from Pixiv it either doesn't preview at all or only previews less than half the image, which on the day to day use of Discord can be a bit annoying to both the person sharing and the server users.
That's where **Pixcord** comes in! Pixcord is a Chrome extension (compatible with any other chromium based browser) that allows the user to share the image directly to a Discord channel with just one click!



## Demonstration

[Demo](https://i.imgur.com/FOtlo69.gif)



## How it works

Pixcord works with using Discord webhooks, by uploading the images to a server ( in the example I'm using Imgur) and then creating an embed with those images and sending them throught the webhook it allows us to bypass Pixiv's extremely poor previews.

Currently the main branch is using Cloudinary, however it seems there might be compatibility issues as in some computeres the extension hasn't worked.
There is however a branch with the old imgur method, this come with an issue however, due to the fact that imgur has a rate limit.
If you choose spam the extension, let's say share 15 images almost immediatly after one another, due to Imgur's API rate limit you will be blocked from it for the remainder of the day making it impossible to share the images on Discord.
Currently working on a solution.
