import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MagnifyingGlassIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux';
import { selectBasektItems } from '../redux/basketSlice';
import { signIn, signOut, useSession } from 'next-auth/react';

function Header() {
    const {data: session} = useSession()
    const items = useSelector(selectBasektItems)
  return (
    <header className='sticky top-0 z-30 flex w-full items-center justify-between bg-[#e7ecee] p-4'>
        <div className='flex items-center justify-center md:w-1/5'>
        <Link href="/">
            <div className='relative flex items-center justify-center h-10 w-5 cursor-pointer opacity-75 transition hover:opacity-100'>
                <Image alt="logo" src="/images/apple-logo.png"  width={'50'} height={'50'} objectFit='contain'/>
            </div>
        </Link>
        </div>
        <div className='hidden flex-1 items-center justify-center space-x-8 md:flex'>
            <a className='headerLink'>Product</a>
            <a className='headerLink'>Explore</a>
            <a className='headerLink'>Support</a>
            <a className='headerLink'>Business</a>
        </div>
        <div className='flex items-center justify-center gap-x-4 md:w-1/5'>
        <MagnifyingGlassIcon className="h-6 w-6 headerIcon" />
        <Link href="/checkout">
        <div className='relative cursor-pointer'>
            { items.length > 0 && (
            <span className='absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white'>{items.length}</span> 
            )}
            <ShoppingBagIcon className='headerIcon'/>

        </div>
        </Link>
        {session ? (
            // Session image to get image url
            <div onClick={() => signOut()} className='w-[34px] h-[34px] bg-pink-500 rounded-full'></div>
        ): <UserIcon onClick={() => signIn()} className='headerIcon'/>}
        </div>
    </header>
  )
}

export default Header