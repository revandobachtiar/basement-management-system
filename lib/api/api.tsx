
export const API_ENDPOINTS = {
  BASEMENT: {
    GET: "/basement",
    POST: "/basement",
    PUT: (id: string) => `/basement/${id}`,
    DELETE: (id: string) => `/basement/${id}`,
  },

  LINE: {
    GET: "/line",
    POST: "/line",
    PUT: (id: string) => `/line/${id}`,
    DELETE: (id: string) => `/line/${id}`,
  },

  LINE_IN_OUT_BASEMENT: {
    GET: "/line-in-out-basement",
    POST: "/line-in-out-basement",
    GET_BY_ID: (id: string) =>
      `/line-in-out-basement/${id}`,
    PUT: (id: string) =>
      `/line-in-out-basement/${id}`,
    DELETE: (id: string) =>
      `/line-in-out-basement/${id}`,
  },

  // Mock API
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
