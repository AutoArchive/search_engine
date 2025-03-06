'use client'

import { useEffect } from 'react'

interface RestrictedContentAlertProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
}

export default function RestrictedContentAlert({
    isOpen,
    onClose,
    onConfirm,
}: RestrictedContentAlertProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (isOpen && e.key === 'Escape') {
                onClose()
            }
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="presentation"
        >
            <button 
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity cursor-default" 
                onClick={onClose}
                aria-label="Close dialog"
            />
            <div
                className="relative mx-4 w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition-all duration-300 ease-in-out dark:bg-gray-800"
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
            >
                <div className="absolute right-4 top-4">
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                        aria-label="关闭"
                    >
                        <span className="sr-only">关闭</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="mt-2">
                    <h3 id="dialog-title" className="mb-4 text-lg font-medium text-gray-900 dark:text-white">限制级内容提醒</h3>
                    <div className="mb-6 text-gray-700 dark:text-gray-300">
                        <p>您即将访问限制级内容。请确认：</p>
                        <ul className="mt-2 list-inside list-disc space-y-2">
                            <li>您已年满 18 周岁</li>
                            <li>您了解即将访问的内容可能包含成人内容</li>
                            <li>访问此内容在您所在的地区是合法的</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                        取消
                    </button>
                    <button
                        onClick={onConfirm}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        确认并继续
                    </button>
                </div>
            </div>
        </div>
    )
} 