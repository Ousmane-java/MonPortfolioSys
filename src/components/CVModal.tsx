'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { IoClose } from 'react-icons/io5'

interface CVModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  const [mode, setMode] = useState<'menu' | 'pdf' | 'video-fr' | 'video-en'>('menu')

  const closeAll = () => {
    setMode('menu')
    onClose()
  }

  const renderContent = () => {
    switch (mode) {
      case 'pdf':
        return (
          <>
            <div className="flex justify-end p-4">
              <button
                onClick={closeAll}
                className="text-gray-600 dark:text-gray-300 hover:text-red-500 text-2xl"
              >
                <IoClose />
              </button>
            </div>
            <motion.iframe
              src="/cv/ousmane-drame-cv.pdf"
              className="flex-grow w-full px-4 md:px-16 pb-4"
              title="CV PDF"
              style={{ height: 'calc(100vh - 120px)' }}
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
            <div className="p-4 text-center">
              <a
                href="/cv/ousmane-drame-cv.pdf"
                download
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded transition"
              >
                Télécharger le CV
              </a>
            </div>
          </>
        )
      case 'video-fr':
        return renderVideo('/videos/cv-fr.mp4')
      case 'video-en':
        return renderVideo('/videos/cv-en.mp4')
      default:
        return (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <div
              className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-lg w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-red-500 text-2xl"
                onClick={closeAll}
              >
                <IoClose />
              </button>

              <h2 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
                Que souhaitez-vous faire ?
              </h2>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setMode('pdf')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                >
                  Consulter le CV
                </button>

                <a
                  href="/cv/ousmane-drame-cv.pdf"
                  download
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition text-center"
                >
                  Télécharger le CV
                </a>

                <button
                  onClick={() => setMode('video-fr')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
                >
                  🎥 Voir CV Vidéo (Français)
                </button>

                <button
                  onClick={() => setMode('video-en')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
                >
                  🎥 Watch CV Video (English)
                </button>
              </div>
            </div>
          </motion.div>
        )
    }
  }

  const renderVideo = (src: string) => (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col">
      <div className="flex justify-end p-4">
        <button
          onClick={closeAll}
          className="text-white hover:text-red-500 text-2xl"
        >
          <IoClose />
        </button>
      </div>
      <div className="flex-grow flex items-center justify-center p-4">
        <video
          src={src}
          controls
          autoPlay
          className="w-full max-w-4xl rounded-xl shadow-lg"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAll}
          />

          {/* Modal content */}
          {renderContent()}
        </>
      )}
    </AnimatePresence>
  )
}
