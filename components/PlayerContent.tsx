'use client'

import { useEffect, useState } from 'react'
import useSound from 'use-sound'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
import { Song } from '@/types'
import usePlayer from '@/hooks/usePlayer'
import MediaItem from './MediaItem'
import LikeButton from './LikeButton'
import Slider from './Slider'

interface PlayerContentProps {
  song: Song
  songUrl: string
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  4
  const player = usePlayer()
  const [volume, setVolume] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)

  const Icon = isPlaying ? BsPauseFill : BsPlayFill
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

  const onPlayNext = () => {
    if (player.ids.length === 0) return

    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const nextSong = player.ids[currentIndex + 1]

    if (!nextSong) return player.setActiveId(player.ids[0])

    player.setActiveId(nextSong)
  }

  const onPlayPrevious = () => {
    if (player.ids.length === 0) return

    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const previousSong = player.ids[currentIndex - 1]

    if (!previousSong) return player.setActiveId(player.ids[player.ids.length - 1])

    player.setActiveId(previousSong)
  }

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false)
      onPlayNext()
    },
    onpause: () => setIsPlaying(false),
    format: ['mp3']
  })

  useEffect(() => {
    sound?.play()

    return () => {
      sound?.unload()
    }
  }, [sound])

  const handlePlay = () => {
    if (!isPlaying) {
      play()
    } else {
      pause()
    }
  }

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1)
    } else {
      setVolume(0)
    }
  }

  return (
    <div className='grid h-full grid-cols-2 md:grid-cols-3'>
      <div className='flex w-full justify-start'>
        <div className='flex items-center gap-x-4'>
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className='col-auto flex w-full items-center justify-end md:hidden'>
        <div
          onClick={handlePlay}
          className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1'
        >
          <Icon size={30} className='text-black' />
        </div>
      </div>

      <div className='hidden h-full w-full max-w-[722px] items-center justify-center gap-x-6 md:flex'>
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className='cursor-pointer text-white'
        />
        <div
          onClick={handlePlay}
          className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1'
        >
          <Icon size={30} className='text-black' />
        </div>
        <AiFillStepForward onClick={onPlayNext} size={30} className='cursor-pointer text-white' />
      </div>

      <div className='hidden w-full justify-end pr-2 md:flex'>
        <div className='flex w-[120px] items-center gap-x-2'>
          <VolumeIcon onClick={toggleMute} size={30} className='cursor-pointer' />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  )
}

export default PlayerContent
