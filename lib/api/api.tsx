const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

export const API_ENDPOINTS = {
  BASEMENT: {
    GET: `${API_BASE_URL}/basement`,
    POST: `${API_BASE_URL}/basement`,
    PUT: (id: string) => `${API_BASE_URL}/basement/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/basement/${id}`,
  },

  LINE: {
    GET: `${API_BASE_URL}/line`,
    POST: `${API_BASE_URL}/line`,
    PUT: (id: string) => `${API_BASE_URL}/line/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/line/${id}`,
  },

  LINE_IN_OUT_BASEMENT: {
    GET: `${API_BASE_URL}/line-in-out-basement`,
    POST: `${API_BASE_URL}/line-in-out-basement`,
    GET_BY_ID: (id: string) =>
    `${API_BASE_URL}/line-in-out-basement/${id}`,
    PUT: (id: string) =>
      `${API_BASE_URL}/line-in-out-basement/${id}`,
    DELETE: (id: string) =>
      `${API_BASE_URL}/line-in-out-basement/${id}`,
  },

  // Belum tersedia pada backend yang dianalisis.
  // Untuk sementara hanya digunakan oleh Mock API.
  CAMERA: {
    GET: "/mock/camera",
    POST: "/mock/camera",
    PUT: (id: string) => `/mock/camera/${id}`,
    DELETE: (id: string) => `/mock/camera/${id}`,
  },

  PARKING_CONTEXT: {
    GET: "/mock/parking-context",
    POST: "/mock/parking-context",
    PUT: (id: string) => `/mock/parking-context/${id}`,
    DELETE: (id: string) => `/mock/parking-context/${id}`,
  },
};