
export const API_ENDPOINTS = {
  BASEMENT: {
    GET: "/basement",
    SEARCH: "/basement/search",
    GET_BY_ID: (id: string) => `/basement/${id}`,
    POST: "/basement",
    PUT: (id: string) => `/basement/${id}`,
    DELETE: (id: string) => `/basement/${id}`,
  },

  LINE: {
    GET: "/line",
    SEARCH: "/line/search",
    GET_BY_ID: (id: string) => `/line/${id}`,
    POST: "/line",
    PUT: (id: string) => `/line/${id}`,
    DELETE: (id: string) => `/line/${id}`,
  },

  LINE_IN_OUT_BASEMENT: {
    GET: "/line-in-out-basement",
    GET_BY_ID: (id: string) => `/line-in-out-basement/${id}`,
    GET_BY_LINE_ID: (lineId: string) =>
      `/line-in-out-basement/lineid?lineId=${encodeURIComponent(lineId)}`,
    SEARCH: (id: string) =>
      `/line-in-out-basement/search?id=${encodeURIComponent(id)}`,
    POST: "/line-in-out-basement",
    PUT: (id: string) => `/line-in-out-basement/${id}`,
    DELETE: (id: string) => `/line-in-out-basement/${id}`,
  },

  PARKING_CONTEXT: {
    GET: "/incr-red-line",
    SEARCH: "/incr-red-line/search",
    GET_BY_ID: (id: string) => `/incr-red-line/${id}`,
    POST: "/incr-red-line",
    PUT: (id: string) => `/incr-red-line/${id}`,
    DELETE: (id: string) => `/incr-red-line/${id}`,
  },

  // Mock API
  CAMERA: {
    GET: "/mock/camera",
    POST: "/mock/camera",
    PUT: (id: string) => `/mock/camera/${id}`,
    DELETE: (id: string) => `/mock/camera/${id}`,
  },
};
