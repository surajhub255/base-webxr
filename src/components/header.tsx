'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import { useAccount, useDisconnect, useConnect } from 'wagmi'
import { BadgeInfo } from 'lucide-react'
import { injected } from 'wagmi/connectors'

const Header = ({
	home,
	onClick,
}: {
	home: boolean
	onClick?: React.ReactEventHandler
}) => {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
	const { isConnected, address } = useAccount()
	const { connect, connectors } = useConnect()
	const { disconnect } = useDisconnect()
	const pathname = usePathname()
	const [name, setName] = useState('')
	const [profileImage, setProfileImage] = useState('')
	const [username, setUserName] = useState('')
	const menuRef = useRef<HTMLDivElement>(null)
	const [isSessionActive, setIsSessionActive] = useState(false)
	const [storedAddress, setStoredAddress] = useState<string | null>(null)

	const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com'

	useEffect(() => {
		// Check for an existing wallet session in localStorage
		const savedAddress = localStorage.getItem('walletAddress')
		setStoredAddress(savedAddress)

		// Silently connect if there's a saved address but the user is not connected
		if (savedAddress && !isConnected) {
			connect({ connector: connectors[0] }) // Assuming InjectedConnector for MetaMask
		}

		// On connection, store wallet address in localStorage
		if (isConnected && !savedAddress) {
			localStorage.setItem('walletAddress', address!)
		}
	}, [isConnected, address, connect, connectors])

	useEffect(() => {
		const getUserData = async () => {
			if (address) {
				try {
					const response = await fetch(
						`${baseUri}/profiles/wallet/${address}`,
						{
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
							},
						}
					)

					if (response.ok) {
						const data = await response.json()
						setProfileImage(data.profile_image)
						setUserName(data.username)
						setName(data.name)
					} else {
						console.log('No user found')
					}
				} catch (error) {
					console.error('Error fetching user data', error)
				}
			}
		}
		getUserData()
	}, [address])

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0)
		}
		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef?.current?.contains(event.target as Node)
			) {
				setIsDropdownOpen(false)
				setIsProfileMenuOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const Notification = () => {
		if (!address) {
			toast.warning(
				'Currently works with Metamask and Coinbase Wallet Extension. We are working on Smart Wallet functionality.',
				{
					containerId: 'containerA',
					position: 'top-left',
				}
			)
		}
	}

	const handleLogout = () => {
		localStorage.removeItem('walletAddress')
		disconnect()
	}

	const getLinkColor = (path: any) => {
		return pathname === path ? '#000' : isScrolled ? 'white' : 'black'
	}

	return (
		<>
			<div
				className={`fixed top-0 w-full py-4 transition-all duration-300 ease-in-out 
					${isScrolled ? 'bg-white' : 'bg-transparent'} 
					${home ? 'bg-gradient-to-r' : 'bg-transparent'} 
				
				z-50`}
				style={
					home
						? {
								backgroundImage:
									'linear-gradient(to right, #FFFFFFBA, #30D8FF, #DF1FDD)',
						  }
						: undefined
				}
			>
				<div className='container mx-auto flex justify-between items-center'>
					<a href='/' className='flex items-center'>
						<img src={'/logo.png'} className='w-32 md:w-48' alt='Logo' />
					</a>
					<div
						className={`items-center space-x-8 text-lg font-bold hidden ${
							!home ? 'hidden' : 'sm:flex'
						}`}
					>
						<Link
							href='https://myriadflow.com'
							style={{ color: getLinkColor('https://myriadflow.com') }}
						>
							Home
						</Link>
						<Link
							href='https://studio.myriadflow.com'
							style={{ color: getLinkColor('https://studio.myriadflow.com') }}
						>
							Studio
						</Link>
						<Link
							href='https://discover.myriadflow.com'
							style={{ color: getLinkColor('https://discover.myriadflow.com') }}
						>
							Discover
						</Link>

						<Link href='/' style={{ color: getLinkColor('/') }}>
							WebXR
						</Link>
					</div>
					<div className='flex gap-4 items-center'>
						<div className='flex items-center space-x-4'>
							{address ? (
								<>
									<div className='relative'>
										<button
											onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
											className='focus:outline-none'
										>
											<img
												src={
													profileImage
														? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${profileImage}`
														: '/profile.png'
												}
												alt='Profile'
												className='w-10 h-10 rounded-full'
											/>
										</button>
										{isProfileMenuOpen && (
											<div className='absolute sm:right-0 mt-2 p-2 sm:p-4 bg-white text-black rounded-lg shadow-lg w-64'>
												<div className='flex items-center mb-4'>
													<img
														src={
															profileImage
																? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${profileImage}`
																: '/profile.png'
														}
														alt='Profile'
														className='w-10 h-10 rounded-full mr-2'
													/>
													<div>
														<span className='block text-sm font-semibold'>
															{name}
														</span>
														<Link
															href={`https://discover.myriadflow.com/${username}`}
															className='text-xs text-gray-500 hover:underline'
														>
															View profile
														</Link>
													</div>
												</div>
												<Link
													href={`https://discover.myriadflow.com/${username}`}
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
												>
													My assets
												</Link>
												<Link
													href={`https://discover.myriadflow.com/${username}`}
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
												>
													On sale
												</Link>
												<Link
													href={`https://discover.myriadflow.com/${username}`}
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
												>
													My brands
												</Link>
												<Link
													href={`https://discover.myriadflow.com/${username}`}
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
												>
													My collections
												</Link>
												<Link
													href={`https://discover.myriadflow.com/${username}`}
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
												>
													Activity
												</Link>
												<Link
													href={`https://discover.myriadflow.com/${username}`}
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
												>
													Rewards
												</Link>
												<Link
													href='https://studio.myriadflow.com'
													target='_blank'
													rel='noopener noreferrer'
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
												>
													Create
												</Link>
												<Link
													href='https://discover.myriadflow.com/profile-setting'
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
												>
													Profile Settings
												</Link>
												<div className='border-t border-gray-200 my-2'></div>
												<button
													onClick={handleLogout}
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full text-left'
												>
													Log out
												</button>
												<div className='mt-2 flex items-center justify-between px-4 py-2 text-xs text-gray-500'>
													<span className='flex-1 truncate'>{address}</span>
													<button
														onClick={() => {
															navigator.clipboard
																.writeText(address)
																.then(() => {
																	alert('Address copied to clipboard!')
																})
																.catch((err) => {
																	console.error('Failed to copy address:', err)
																})
														}}
														className='ml-2 text-blue-500 hover:text-blue-700'
													>
														Copy
													</button>
												</div>
											</div>
										)}
									</div>
								</>
							) : (
								<button onClick={Notification} className='text-xl'>
									<w3m-button />
								</button>
							)}
						</div>
						<button
							className='sm:hidden text-2xl'
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						>
							<img src='/menu.png' alt='Menu' className='w-6 h-6 ml-4' />
						</button>
						<BadgeInfo className='cursor-pointer md:hidden' onClick={onClick} />
					</div>
				</div>
				{isDropdownOpen && (
					<div
						ref={menuRef}
						className='sm:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-40'
					>
						<div className='flex flex-col items-center justify-center h-full bg-white text-black relative'>
							<button
								onClick={() => setIsDropdownOpen(false)}
								className='absolute top-4 right-4 text-xl text-gray-700'
							>
								<img src='/close.png' alt='Close' className='w-12 h-12' />
							</button>
							<Link
								href='https://myriadflow.com'
								style={{ color: getLinkColor('/') }}
								className='block py-2 text-lg'
							>
								Home
							</Link>
							<Link
								href='https://studio.myriadflow.com'
								style={{ color: getLinkColor('https://studio.myriadflow.com') }}
							>
								Studio
							</Link>
							<Link
								href='https://discover.myriadflow.com'
								style={{
									color: getLinkColor('https://discover.myriadflow.com'),
								}}
							>
								Discover
							</Link>

							<Link href='/' style={{ color: getLinkColor('/') }}>
								WebXR
							</Link>
						</div>
					</div>
				)}
			</div>
			<ToastContainer
				className='absolute top-0 right-0'
				containerId='containerA'
			/>
		</>
	)
}

export default Header
