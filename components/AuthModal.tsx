'use client'

import { useEffect } from 'react'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import useAuthModal from '@/hooks/useAuthModal'
import Modal from './Modal'

const AuthModal = () => {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()
  const { session } = useSessionContext()
  const authModal = useAuthModal()

  useEffect(() => {
    if (session) {
      router.refresh()
      authModal.onClose()
    }
  }, [session, router, authModal.onClose])

  const onChange = () => {
    authModal.onClose()
  }

  return (
    <Modal
      title='Welcome Back'
      description='Login to your account'
      isOpen={authModal.isOpen}
      onChange={onChange}
    >
      <Auth
        redirectTo='https://harmoniqa.vercel.app/'
        theme='dark'
        providers={['github']}
        magicLink
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e'
              }
            }
          }
        }}
      />
    </Modal>
  )
}

export default AuthModal
