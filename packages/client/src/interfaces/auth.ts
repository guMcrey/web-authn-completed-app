export interface IAuthItem {
  credId: string
  username?: string
  publicKey?: string
  prevCounter?: number
  deviceName?: string
}

export interface IRegisterOptions {
  id: string
  rawId: string
  authenticatorAttachment?: string
  clientExtensionResults: {}
  response: {
    attestationObject: string
    clientDataJSON: string
  }
  transports: 'internal'
  // 'public-key'
  type: string
}
