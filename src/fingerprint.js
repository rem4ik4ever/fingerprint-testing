import { ClientJS } from 'clientjs'
import * as FingerprintJS from '@fingerprintjs/fingerprintjs'

export const getClientJSClient = () => {
  return new ClientJS()
}

export const getClientJSFingerprint = () => {
  const client = getClientJSClient();
  const fingerprint = client.getFingerprint()
  return fingerprint;
}

export const getFingerprintJSClient = async () => {
  const client = await FingerprintJS.load()
  const request = await client.get()
  return request;
}

export const getFingerprintJSFingerprint = async () => {
  const request = await getFingerprintJSClient();
  const visitorId = request.visitorId;
  return visitorId
}

export async function main() {
  const clientFg = getClientJSFingerprint()
  const fingerprintFg = await getFingerprintJSFingerprint()
  console.log({
    clientFg,
    fingerprintFg
  })
}
