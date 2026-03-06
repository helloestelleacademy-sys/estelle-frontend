"use client";

import React from 'react'
import { Calendar, MapPin, ChevronRight, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

type EventProp = {
    id: string,
    title: string,
    img?: string,
    date: string,
    location: string,
    price: string | number,
    isSelected?: boolean,
    onClick?: () => void
}

const EventCard = ({ id, title, date, location, isSelected, onClick }: EventProp) => {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className={`cursor-pointer rounded-[24px] p-6 mb-4 transition-all duration-300 border backdrop-blur-md relative overflow-hidden group ${isSelected
                    ? 'bg-[#7852A9] border-[#7852A9] text-white shadow-2xl shadow-purple-900/20'
                    : 'bg-white/50 border-white text-gray-900 hover:border-[#7852A9]/50 shadow-lg shadow-purple-900/5'
                }`}
        >
            {/* Selection indicator */}
            {isSelected && (
                <motion.div
                    layoutId="selection-glow"
                    className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none"
                />
            )}

            <div className="flex justify-between items-start gap-4 relative z-10">
                <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2">
                        {isSelected ? (
                            <Zap className="w-4 h-4 text-purple-200 fill-purple-200" />
                        ) : (
                            <div className="w-2 h-2 rounded-full bg-[#7852A9]" />
                        )}
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isSelected ? 'text-purple-100' : 'text-[#7852A9]'}`}>
                            {isSelected ? 'Currently Viewing' : 'Masterclass'}
                        </span>
                    </div>

                    <h3 className={`font-black text-xl leading-tight tracking-tight ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                        {title}
                    </h3>

                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                        <div className={`flex items-center gap-1.5 text-xs font-bold ${isSelected ? 'text-purple-100' : 'text-gray-500'}`}>
                            <Calendar className="w-3.5 h-3.5 opacity-70" />
                            <span>{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className={`flex items-center gap-1.5 text-xs font-bold ${isSelected ? 'text-purple-100' : 'text-gray-500'}`}>
                            <MapPin className="w-3.5 h-3.5 opacity-70" />
                            <span className="max-w-[120px] truncate">{location}</span>
                        </div>
                    </div>
                </div>

                <div className={`mt-2 p-2 rounded-full transition-colors ${isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-[#7852A9]/5 text-[#7852A9] group-hover:bg-[#7852A9] group-hover:text-white'
                    }`}>
                    <ChevronRight className="w-4 h-4" />
                </div>
            </div>
        </motion.div>
    )
}

export default EventCard
