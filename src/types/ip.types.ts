/**
 * Interface major of IP data.
 */
export interface IPData {
  id: string;
  ip: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  isp: string;
  threatLevel: string;
  createdAt: string;
}

/**
 * Type of keys and values of IP data.
 */
export type IPDataKeys = keyof IPData;
export type IPDataValues = IPData[IPDataKeys];

/*
 * Picks specifics use cases. 
 */
export type IPLocation = Pick<IPData, 'country' | 'city' | 'latitude' | 'longitude'>;
export type IPSecurity = Pick<IPData, 'isp' | 'threatLevel'>;
export type IPIdentity = Pick<IPData, 'ip' | 'id'>;

/**
 * Type for updating IP data, excluding immutable fields.
 */
export type IPDataUpdate = Partial<Omit<IPData, 'id' | 'createdAt'>>;

/**
 * Type for creating new IP data, requiring only the IP address.
 */
export type IPCreatePayload = Pick<IPData, 'ip'>;

/**
 * Interface for filtering IP data queries.
 */
export interface IPFilters extends Partial<Pick<IPData, 'country' | 'city' | 'threatLevel'>> {
  search?: string;
  [keyof: string]: string | undefined;
}

/**
 * Interface for IP form data.
 */
export interface IPFormData {
  ip: string;
}

/** 
 * Interface for IP coordinates.
 */
export interface IPCoordinates {
  lat: number;
  lng: number;
}

/**
 * Type guard to check if data is of type IPData.
 * @param data 
 * @returns 
 */
export const isIPData = (data: unknown): data is IPData => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'ip' in data &&
    'country' in data &&
    'latitude' in data &&
    'longitude' in data
  )
}

/**
 * Converts IPData to IPCoordinates.
 * @param ip 
 * @returns 
 */
export const toCoordinates = (ip: IPData): IPCoordinates => ({
  lat: ip.latitude,
  lng: ip.longitude,
})