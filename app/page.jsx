// import React from 'react'
    // No longer need to import react in Next.js 13

// import Feed from './../components/Feed';
    // traditional import in react

import Feed from '@/components/Feed';
    // importing components in Next.js (@/ => root dir as defined in jsconfig.json)

const Home = () => {
  return (
    <div className="wrapper">
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover & Share
                <br className="max-md:hidden" />
                <span className="orange_gradient text-center">AI-Powered Prompt</span>
            </h1>
            <p className="desc text-center">
                Promptopia is an open-source A1 prompting tool for modern world to discover, create and share creative prompts.
            </p>
            {/* feed */}
            <Feed />
        </section>
    </div>
  )
}

export default Home