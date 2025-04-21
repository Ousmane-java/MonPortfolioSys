'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { IoClose } from 'react-icons/io5'

interface CVModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  const [isFullScreen, setIsFullScreen] = useState(false)

  const closeAll = () => {
    setIsFullScreen(false)
    onClose()
  }

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

          {/* Étape 1 : Choix consulter / télécharger */}
          {!isFullScreen && (
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
                  Tu veux consulter ou télécharger le CV ?
                </h2>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setIsFullScreen(true)}
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
                </div>
              </div>
            </motion.div>
          )}

          {/* Étape 2 : Affichage plein écran du PDF */}
          {isFullScreen && (
            <motion.div
              className="fixed inset-0 z-50 bg-white dark:bg-zinc-900 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Bouton fermer */}
              <div className="flex justify-end p-4">
                <button
                  onClick={closeAll}
                  className="text-gray-600 dark:text-gray-300 hover:text-red-500 text-2xl"
                >
                  <IoClose />
                </button>
              </div>

              {/* Aperçu PDF */}
              <motion.iframe
                src="/cv/ousmane-drame-cv.pdf"
                className="flex-grow w-full px-4 md:px-16 pb-4"
                title="CV PDF"
                style={{ height: 'calc(100vh - 120px)' }}
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Bouton téléchargement */}
              <div className="p-4 text-center">
                <a
                  href="/cv/ousmane-drame-cv.pdf"
                  download
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded transition"
                >
                  Télécharger le CV
                </a>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  )
}
