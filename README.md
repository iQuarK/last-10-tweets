# Interview Challenge 1
You have 24 hours from the receipt of this document to:

- Write the code to complete the challenge
- Push it up to a repository in [GitHub][5] or [BitBucket][6]
- Send us the url to the repository.

We expect to clone the repository, examine, and run your working code.


## The Challenge
Create a [NodeJS][0] based [ExpressJS][1] server that responds to the following
request with a responsive page.

- [http://localhost:30000/cnnbrk-tweets][2]

The cnnbrk-tweets page should list the last ten tweets from the [@cnnbrk][7]
twitter handle.  On a small screen (less than 600px wide), it should list all
ten tweets in a single column.  On a larger screen (greater than 600px wide), it
should list all ten tweets divided into two columns.

    small screen      larger screen
    +----------+    +-------+-------+
    |  tweet   |    | tweet | tweet |
    |  tweet   |    | tweet | tweet |
    |  tweet   |    | tweet | tweet |
    |  tweet   |    +-------+-------+
    |  tweet   |
    |  tweet   |
    +----------+


## Assumptions
- [NodeJS][0] and npm are setup and running on the localhost.  Your code does
  not need to account for installing NodeJS on systems that do not have it.
  You however, will need to install it to develop this.

- [NodeJS][0] is at least version 0.8.18 or higher.


## Tips
- Do your best to impress us, your code passing [jslint][3] may help.

- Attention to detail is important.


## Extra Credit
- Make the tweets from twitter that have links in them be clickable on your
  page.

- Modify the routing in ExpressJS to pull the top 10 tweets from any twitter
  handle that is in the url.

- [Client side templates][4] are cool.


## Commands
- First of all get all packages:
`$ npm install`

- To watch while you are developing  (the compiled code goes to the `.tmp` directory):
`$ grunt watch`

- To run all tests:
`$ grunt test`

- To build the project (the result goes to the `dist` directory):
`$ grunt build`


[0]: http://nodejs.org
[1]: http://expressjs.com
[2]: http://localhost:30000/cnnbrk-tweets
[3]: http://jslint.com
[4]: http://linkedin.github.com/dustjs/
[5]: http://github.com
[6]: http://bitbucket.org
[7]: https://twitter.com/cnnbrk
