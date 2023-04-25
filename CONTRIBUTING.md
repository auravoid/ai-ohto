# Contribution Guidelines

Thank you for considering to contribute to this project.

---

First off, there are some simple rules. The following apply:

-   Do not propose any significant changes without prior testing.
-   Create issues for any major changes and enhancements that you wish to make. Discuss things transparently and get
    feedback.
-   Be respectful when discussing code changes.

Other than the above rules, have at it. Make your code as readible and efficiant as possible. Explain it if it starts to
get complex.

---

You might want to know how to set up an environment to develop.

Basically,

1. Clone the repo locally
2. Install the dependancies
    - `yarn install`
3. Change what's needed in `.env.example` and maybe rename it to `.env`
4. Run the dev command or run directly
    - `yarn run dev`
    - `nodemon -r dotenv/config -r tsconfig-paths/register src/Bot.ts`
5. There you go!
