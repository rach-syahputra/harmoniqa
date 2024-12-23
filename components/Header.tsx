'use client'

import { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { FaUserAlt } from 'react-icons/fa'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import toast from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import Button from './Button'
import Link from 'next/link'

interface HeaderProps {
  children: React.ReactNode
  className?: string
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const authModal = useAuthModal()
  const router = useRouter()

  const supabaseClient = useSupabaseClient()
  const { user } = useUser()

  const pathname = usePathname()

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: 'Home',
        active: pathname !== '/search',
        href: '/'
      },
      {
        icon: BiSearch,
        label: 'Search',
        active: pathname === '/search',
        href: '/search'
      }
    ],
    [pathname]
  )

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut()
    // TODO: Reset any playing songs
    router.refresh()

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Logged out')
    }
  }

  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, className)}>
      <div className='mb-4 flex w-full items-center justify-between'>
        <div className='hidden items-center gap-x-2 md:flex'>
          <button
            onClick={() => router.back()}
            className='flex items-center justify-center rounded-full bg-black transition hover:opacity-75'
          >
            <RxCaretLeft size={35} className='text-white' />
          </button>
          <button
            onClick={() => router.forward()}
            className='flex items-center justify-center rounded-full bg-black transition hover:opacity-75'
          >
            <RxCaretRight size={35} className='text-white' />
          </button>
        </div>
        <div className='flex items-center gap-x-2 md:hidden'>
          {routes.map((route) => (
            <Link
              key={route.label}
              href={route.href}
              className='flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75'
            >
              <route.icon size={20} className='text-black' />
            </Link>
          ))}
        </div>
        <div className='flex items-center justify-between gap-x-4'>
          {user ? (
            <div className='flex items-center gap-x-4'>
              <Button onClick={handleLogout} className='bg-white px-6 py-2'>
                Logout
              </Button>
              <Button onClick={() => router.push('/account')} className='bg-white'>
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className='bg-transparent font-medium text-neutral-300'
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button onClick={authModal.onOpen} className='bg-white px-6 py-2'>
                  Login
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

export default Header
