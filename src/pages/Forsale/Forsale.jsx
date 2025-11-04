import React from 'react'
import { Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export default function WebsiteForSale() {
  const saleEmail = 'sales@nivalcloud.com' // change to your contact email

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl p-10 text-center border border-gray-100 max-w-lg w-full"
      >
        <h1 className="text-3xl font-bold text-gray-800">This Website is For Sale</h1>
        <p className="mt-4 text-gray-600 text-sm">
          A premium web property available for acquisition. For serious inquiries, please contact us.
        </p>

        <a
          href={`mailto:${saleEmail}`}
          className="mt-8 inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          <Mail size={18} /> Contact Us
        </a>
      </motion.div>
    </div>
  )
}