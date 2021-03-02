import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'


export default function themeToggleButton() {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme, setTheme } = useTheme()
    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    if (resolvedTheme === 'dark') {
        return (
            <>
                <button id="themeButton" className="text-white mt-2.5 min-w-min" aria-label='Switch to light theme' onClick={() => setTheme('light')}>
                    <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <title id="switch-to-light-theme-title">Switch to light theme</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </button>
            </>
        )
    }

    else if (resolvedTheme === 'light') {
        return (
            <>
                <button id="themeButton" className="mt-2.5 min-w-min" aria-label='Switch to dark theme' onClick={() => setTheme('dark')}>
                    <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <title id="switch-to-dark-theme-title">Switch to dark theme</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                </button>
            </>
        )
    }

    else {
        return (
            <>
                <div className='w-6 h-6 mt-2.5' />
            </>
        )
    }

};

