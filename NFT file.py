import requests
from web3 import Web3
import json

# Pinata API credentials
API_KEY = "620b2aad1cbc0ae204e6"
API_SECRET = "xxxxxxxxxxxxxxxxxx"
BASE_URL = "https://api.pinata.cloud"

# Web3 setup (Polygon/ETH)
web3 = Web3(Web3.HTTPProvider('https://polygon-rpc.com'))
account = web3.eth.account.privateKeyToAccount("cc37db1fac0a5ebc3d0937006392dbae45ccf3f4a59508ca2323497931fb6174")

def upload_to_pinata(file_path, is_metadata=False):
    url = f"{BASE_URL}/pinning/pinFileToIPFS" if not is_metadata else f"{BASE_URL}/pinning/pinJSONToIPFS"
    headers = {"pinata_api_key": API_KEY, "pinata_secret_api_key": API_SECRET}
    files = {'file': open(file_path, 'rb')} if not is_metadata else {'file': json.dumps(file_path)}
    response = requests.post(url, headers=headers, files=files)
    
    if response.status_code == 200:
        return response.json()['IpfsHash']
    else:
        raise Exception(f"Error uploading to Pinata: {response.text}")

# Example metadata for the tree
tree_metadata = {
    "name": "Tree NFT #1",
    "description": "A unique tree planted to offset carbon emissions.",
    "image": "https://gateway.pinata.cloud/ipfs/{image_hash}",
    "location": {"latitude": 28.704060, "longitude": 77.102493}  # example location
}

# Upload image and metadata
image_hash = upload_to_pinata("path/to/tree_image.jpg")
tree_metadata["image"] = f"https://gateway.pinata.cloud/ipfs/{image_hash}"

metadata_hash = upload_to_pinata(tree_metadata, is_metadata=True)

# Use Web3 to interact with the blockchain (Polygon)
def mint_nft(metadata_hash, user_address):
    contract_address = "your_smart_contract_address"
    contract_abi = json.loads('your_contract_abi')

    contract = web3.eth.contract(address=contract_address, abi=contract_abi)
    transaction = contract.functions.mintNFT(user_address, metadata_hash).buildTransaction({
        'gas': 2000000,
        'gasPrice': web3.toWei('30', 'gwei'),
        'nonce': web3.eth.getTransactionCount(account.address),
    })

    signed_txn = web3.eth.account.signTransaction(transaction, private_key="your_private_key")
    txn_hash = web3.eth.sendRawTransaction(signed_txn.rawTransaction)
    return txn_hash

# Mint NFT to user's wallet
user_wallet_address = "user_wallet_address"
txn_hash = mint_nft(metadata_hash, user_wallet_address)
print(f"NFT Minted! Transaction Hash: {txn_hash}")
