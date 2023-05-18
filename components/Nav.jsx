"use client";
  // we must use "use client" directive on component where ue we will use client features like interactions (onClick), react hooks like (useState, useEffect)

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
  // Link from next.js (we'll use Link instead of a, helpful for routing too)
import Image from 'next/image';
  // Image from next.js (next optimize image inserted using Image)

import {signIn, signOut, useSession, getProviders} from "next-auth/react";
  // Auth tools provided by Next.js

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [providers, setProviders] = useState(null);

  const [toogleDropdown, setToogleDropdown] = useState(false);

  /* Run code once (when component get loaded for first time)
  useEffect(()=>{

  }, [])
 */

  useEffect(()=>{
    const setProviders = async() =>{
      const response = await getProviders();
        // getting providers data from next-auth

      setProviders(response);
    }
    setProviders();
      // ???? why ??
  }, [])


  return (
    <nav className="flex-between w-full">
      <Link href="/" className='flex gap-2'>
        <Image 
        src="/assets/images/logo.svg"
        alt='Promptopia logo'
        width={30}
        height={30}
        className='object-contain'
        />
        {/* 
        "/" refers to public dir 
        We must give src, width & height while using Image. Otherwise it will throw an error.
        */}
        <p className="logo_text">Propmtopia</p>
      </Link>

      {/* Desktop navigation */}
      <div className="hidden sm:flex">
        { isLoggedIn? 
        (
          <div className="p-2 flex gap-3 md:gap-5">
            <Link href={`/create-prompt`} className='black_btn'>Create Post</Link>
            <button type="button" onClick={signOut} className='outline_btn'>Sign Out</button>
            <Link href={`/profile`}>
              <Image
              src={`/assets/images/logo.svg`}
              width={40}
              height={40}
              className='rounded-full'
              alt='profile'
              />
            </Link>
          </div>
        )
        :
        (
          <>
            {
            providers
            &&
            Object.values(providers).map((provider)=>{
              <button
                type='button'
                key={provider.name}
                onClick={()=> signIn(provider.id)}
                className='black_btn'
              >
                SIgn In
              </button>
            })

            }
          </>
        )
        }
      </div>

      {/* Mobile Navigation */}
      <div className="flex sm:hidden relative">
        { isLoggedIn? 
        (
          <div className="flex justify-between">
            <Image
              src="/assets/icons/menu.svg"
              width={37}
              height={37}
              className='object-contain'
              alt='menu'
              onClick={()=>{setToogleDropdown((prev) => !prev)}}
              // onClick={()=>{setToogleDropdown(!toogleDropdown)}} not recommended
            />
            
            {
              toogleDropdown &&
              (
                <div className="dropdown flex flex-col">
                  <Link
                  href={`/profile`}
                  className={`dropdown_link`}
                  onClick={()=>setToogleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                  href={`/create-prompt`}
                  className={`dropdown_link`}
                  onClick={()=>setToogleDropdown(false)}
                  >
                   Create Prompt
                  </Link>
                  <button
                  type='button'
                  onClick={()=>{
                    setToogleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                  >
                  Sign Out
                  </button>
                </div>
              )
            }
          </div>
        )
        :
        (
          <>
            {
            providers
            &&
            Object.values(providers).map((provider)=>{
              <button
                type='button'
                key={provider.name}
                onClick={()=> signIn(provider.id)}
                className='black_btn'
              >
                Sign In
              </button>
            })

            }
          </>
        )
        }
      </div>

    </nav>
  )
}

export default Nav