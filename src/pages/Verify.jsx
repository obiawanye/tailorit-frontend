import { useRef, useState } from 'react'
import { useSignUp } from '@clerk/react'
import { useNavigate } from 'react-router'

function Verify() {
    const { signUp } = useSignUp()
    const navigate = useNavigate()

    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const inputRefs = useRef([])

    const handleChange = (index, value) => {
        const digit = value.replace(/\D/g, '').slice(-1)

        const newOtp = [...otp]
        newOtp[index] = digit
        setOtp(newOtp)

        if (digit && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }

        setError('')
    }

    const handleKeyDown = (index, event) => {
        if (
            event.key === 'Backspace' &&
            !otp[index] &&
            index > 0
        ) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (event) => {
        event.preventDefault()

        const pastedCode = event.clipboardData
            .getData('text')
            .replace(/\D/g, '')
            .slice(0, 6)

        if (!pastedCode) return

        const newOtp = ['', '', '', '', '', '']

        pastedCode.split('').forEach((digit, index) => {
            newOtp[index] = digit
        })

        setOtp(newOtp)

        const nextIndex = Math.min(pastedCode.length, 5)
        inputRefs.current[nextIndex]?.focus()

        setError('')
    }

    const handleVerify = async () => {
        const code = otp.join('')

        if (code.length !== 6) {
            setError('Please enter the 6-digit verification code.')
            return
        }

        setIsLoading(true)
        setError('')

        try {
            const { error } = await signUp.verifications.verifyEmailCode({
                code,
            })

            if (error) {
                setError(error.message)
                return
            }

            if (signUp.status === 'complete') {
                await signUp.finalize()

                navigate('/catalog')
            } else {
                setError(
                    'Verification succeeded, but your account still requires additional information.'
                )
            }
        } catch {
            setError('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white px-4 py-8 sm:px-6 sm:py-12 lg:flex lg:items-center lg:justify-center lg:px-8">

            {/* OTP Card */}
            <div className="w-full max-w-[776px] rounded-[8px] border border-[#D6D6D6] bg-white">

                {/* Header */}
                <div className="p-6 sm:p-8">
                    <h1 className="text-[22px] font-semibold text-[#1A1A1A] sm:text-[24px]">
                        Check Your Email
                    </h1>

                    <p className="mt-2 text-[14px] leading-6 text-[#666666] sm:text-[16px]">
                        To complete your registration, please check your email for the verification code.
                    </p>
                </div>

                {/* OTP Inputs */}
                <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                    <div className="flex w-full gap-2 sm:gap-4">

                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(element) => {
                                    inputRefs.current[index] = element
                                }}
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={1}
                                value={digit}
                                onChange={(event) =>
                                    handleChange(
                                        index,
                                        event.target.value
                                    )
                                }
                                onKeyDown={(event) =>
                                    handleKeyDown(index, event)
                                }
                                onPaste={handlePaste}
                                className="h-12 min-w-0 flex-1 rounded-md border border-gray-300 text-center text-lg outline-none focus:border-[#FF4F05] focus:ring-2 focus:ring-[#FF4F05]/20 sm:h-14"
                            />
                        ))}

                    </div>

                    {/* Error */}
                    {error && (
                        <p className="mt-3 text-sm text-red-500">
                            {error}
                        </p>
                    )}
                </div>

                {/* Verify Button */}
                <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                    <button
                        type="button"
                        onClick={handleVerify}
                        disabled={isLoading}
                        className="w-full rounded-md bg-[#FF4F05] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#e04400] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading ? 'Verifying...' : 'Verify'}
                    </button>
                </div>

                {/* Resend */}
                <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                    <p className="text-center text-[14px] text-[#666666] sm:text-left sm:text-[16px]">
                        Didn't receive the code?{' '}

                        <button
                            type="button"
                            className="ml-1 text-[#FF4F05] hover:underline"
                        >
                            Resend Code
                        </button>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Verify