'use client'
import Link from 'next/link'
import { ClaimNftPopUp } from './claim-nft-popup'
import Image from 'next/image'
import { useAccount, useChainId } from 'wagmi'
import { ToastContainer, toast } from 'react-toastify'
// import { useCapabilities, useWriteContracts } from 'wagmi/experimental'
import { useMemo, useState, useEffect } from 'react'
import Moralis from 'moralis'
// import abi from '@/lib/abi'
import { X } from 'lucide-react'

import { ConnectWallet } from './connect-wallet'

export const ClaimNft = ({ onClose, freeNft, brandName, contractAddress }) => {
	const [claimNft, setClaimNft] = useState(false)
	// const [loading, setLoading] = useState(false)
	// const [token, setToken] = useState(0)
	const [sold, setsold] = useState(0)
	const account = useAccount()
	const chainId = useChainId()

	const handleClick = () => {
		console.log('yes')
		onClose(false)
	}

	const fetch = async () => {
		try {
			await Moralis.start({
				apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
			})

			const response = await Moralis.EvmApi.events.getContractEvents({
				chain: chainId,
				order: 'DESC',
				topic:
					'0x328ff68d0e66694e405c9f8fc906a346b345aa1f87ec216eaa82f2c654d0d34a',
				address: contractAddress,
				abi: {
					anonymous: false,
					inputs: [
						{
							indexed: false,
							name: 'currentIndex',
							type: 'uint256',
							internal_type: 'uint256',
						},
						{
							indexed: false,
							name: 'quantity',
							type: 'uint256',
							internal_type: 'uint256',
						},
						{
							indexed: true,
							name: 'creator',
							type: 'address',
							internal_type: 'address',
						},
					],
					name: 'PhygitalAAssetCreated',
					type: 'event',
				},
			})

			// console.log("response", response.raw, response.raw.result[0].data.currentIndex);
			if (response.raw.result[0]) {
				setsold(response.raw.result[0].data.currentIndex)
			}
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		fetch()

		console.log(sold)
	}, [])

	const delegateToken = async () => {
		setLoading(true)

		try {
			console.log('ethers', ethers)

			if (typeof window !== 'undefined' && window.ethereum) {
				const provider = new ethers.providers.Web3Provider(window.ethereum)

				const contract = new ethers.Contract(
					contractAddress,
					abi,
					provider.getSigner()
				)

				const tx = await contract.mint(contractAddress, 1, token, [])

				const result = await tx.wait()

				// console.log("Result:", result);
				setLoading(false)
			}
		} catch (error) {
			console.error('Error handling buy asset:', error)
			setLoading(false) // Set loading state to false in case of error
		}
	}

	const removePrefix = (uri) => {
		return uri?.substring(7, uri.length)
	}

	return (
		<div>
			<ToastContainer />
			{!claimNft ? (
				<div
					style={{
						//   backgroundColor: "#FFFFFFB2",
						display: 'flex',
						overflowY: 'auto',
						overflowX: 'hidden',
						position: 'fixed',
						inset: 0,
						zIndex: 50,
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
						maxHeight: 'fit-content',
					}}
					id='popupmodal'
				>
					<div
						style={{
							position: 'relative',
							padding: '16px',
							width: '100%',
							maxWidth: '50rem',
							maxHeight: '100%',
						}}
					>
						<div
							style={{
								position: 'relative',
								borderRadius: '0.5rem',
								boxShadow: '0 0.25rem 0.75rem rgba(0, 0, 0, 0.25)',
								color: 'black',
								background: 'white',
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'flex-end',
									padding: '16px',
									borderRadius: '20px',
									borderColor: '#4B5563',
								}}
							>
								<X
									color='#000'
									style={{ cursor: 'pointer' }}
									onClick={handleClick}
								/>
							</div>

							<div style={{ padding: '16px', spaceY: '16px' }}>
								<div
									style={{ display: 'flex', justifyContent: 'space-around' }}
								>
									<p
										style={{
											backgroundImage:
												'linear-gradient(90deg, #30D8FF, #5B0292)',
											WebkitBackgroundClip: 'text',
											backgroundClip: 'text',
											color: 'transparent',
											// paddingTop: "60px",
											fontSize: '2.5rem',
											textAlign: 'center',
											fontWeight: 'bold',
										}}
									>
										Congratulations!
									</p>
								</div>

								<div
									style={{ display: 'flex', justifyContent: 'space-around' }}
								>
									<img src='./trophy2.png' />

									<Image
										src={`${'https://nftstorage.link/ipfs'}/${removePrefix(
											freeNft
										)}`}
										alt='Free NFT Image'
										height={80}
										width={150}
										style={{ marginTop: '60px' }}
									/>
									<img src='./trophy1.png' />
								</div>

								<p
									style={{
										fontSize: '1.2rem',
										textAlign: 'center',
										padding: '40px',
									}}
								>
									You are eligible to claim a free NFT fan token to show your
									support to {brandName} and get a chance to earn weekly
									rewards.
								</p>
							</div>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									paddingBottom: '60px',
								}}
							>
								<Link
									href=''
									type='button'
									style={{
										width: '30%',
										marginLeft: 'auto',
										marginRight: 'auto',
										color: 'black',
										focusRing: '4px',
										outline: 'none',
										borderRadius: '30rem',
										fontSize: '1.2rem',
										padding: '5px 0px',
										textAlign: 'center',
										backgroundColor: '#30D8FF',
									}}
									onClick={() => {
										if (!account.address) {
											toast.warning('Connect or Create a wallet')
										} else {
										}
									}}
								>
									Claim Free NFT
								</Link>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									paddingBottom: '1rem',
									marginInline: 'auto',
								}}
							>
								{!account.address && <ConnectWallet />}
							</div>
						</div>
					</div>
				</div>
			) : (
				<ClaimNftPopUp
					onClose={onClose}
					brandName={brandName}
					freeNft={freeNft}
				/>
			)}
		</div>
	)
}
