'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  taskTitle: string;
}

export default function ModalForm({ isOpen, onClose, taskTitle }: ModalFormProps) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSend = async () => {
    if (!validateEmail(email)) {
      setError('❌ Email invalide. Veuillez entrer une adresse valide.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          user_email: email,
          task_title: taskTitle,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSent(true);
    } catch (error) {
      setError("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-zinc-900 rounded-2xl p-8 w-full max-w-md shadow-2xl relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-zinc-500 hover:text-zinc-800 dark:hover:text-white text-xl font-bold"
              aria-label="Fermer"
            >
              ×
            </button>

            {!sent ? (
              <>
                <h2 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-white">
                  🔒 Accès à : {taskTitle}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Veuillez entrer votre adresse email pour recevoir le lien sécurisé.
                </p>

                <input
                  type="email"
                  placeholder="ex: recruteur@entreprise.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-300 rounded-md mb-2 focus:outline-none dark:bg-zinc-700 dark:text-white"
                />

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <button
                  onClick={handleSend}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  disabled={loading || !email}
                >
                  {loading ? 'Envoi...' : 'Recevoir le lien'}
                </button>
              </>
            ) : (
              <div className="text-center">
                <p className="text-green-600 dark:text-green-400 font-medium">
                  ✅ Merci ! Le lien a été envoyé à votre adresse.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
