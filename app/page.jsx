// import React from 'react'
    // No longer need to import react in Next.js 13

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
        </section>
    </div>
  )
}

export default Home