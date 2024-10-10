'use client'

import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'
import { Song } from '@/types'
import useAuthModal from '@/hooks/useAuthModal'
import useUploadModal from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser'
import MediaItem from './MediaItem'

interface LibaryProps {
  songs: Song[]
}

const Library: React.FC<LibaryProps> = ({ songs }) => {
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()
  const { user } = useUser()

  const onClick = () => {
    if (!user) {
      return authModal.onOpen()
    }

    // TODO: Check for subscription

    return uploadModal.onOpen()
  }

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between px-5 pt-4'>
        <div className='inline-flex items-center gap-x-2'>
          <TbPlaylist size={26} className='text-neutral-400' />
          <p className='font-medium text-neutral-400'>Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={26}
          className='cursor-pointer text-neutral-400 transition hover:text-white'
        />
      </div>
      <div className='mt-4 flex flex-col gap-y-2 px-3'>
        {songs.map((song) => (
          <MediaItem onClick={() => {}} key={song.id} data={song} />
        ))}
      </div>
    </div>
  )
}

export default Library
