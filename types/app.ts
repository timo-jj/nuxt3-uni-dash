export interface University {
  domains: string[]
  country: string
  alpha_two_code: string
  "state-province"?: string | undefined
  web_pages: string[]
  name: string
}

export interface Country {
  name: string
  code: string
}