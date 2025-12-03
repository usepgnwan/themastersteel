type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  status: number;
};

type ApiRequestOptions = {
  body?: object;
  wablast?: boolean;
  mailblast?: boolean;
  type?: 'main';
  token?: string;
  headers?: Record<string, string>;
  throwError?: boolean;
};

export const useApi = () => {
  const { BASE_API_MAIN_URL,  SECRET_API_MAIN_KEY } = useRuntimeConfig();
  const URL_MAP = {
    main: BASE_API_MAIN_URL, 
    undefined: BASE_API_MAIN_URL
  };
  const isFullURL = (path: string): boolean => {
    try {
      new URL(path);
      return true;
    } catch {
      return false;
    }
  };
  const getFullURL = (path: string, type: 'main' | undefined): string => {
    return isFullURL(path) ? path : URL_MAP[type || 'main'] + path;
  };
  const buildHeaders = (opts: ApiRequestOptions): Record<string, string> => {
    const headers: Record<string, string> = {
      ...opts.headers,
      Accept: 'application/json'
    };
    
    if (opts.type === 'main') {
      headers['x-tes-themastersteel'] = SECRET_API_MAIN_KEY;
    } 
    return headers;
  };
  const request = async <T>(path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', options: ApiRequestOptions = {}): Promise<ApiResponse<T>> => {
    const fullURL = getFullURL(path, options.type);
    const headers = buildHeaders(options);
    let payload: BodyInit | undefined;
    if (options.body instanceof FormData) {
      payload = options.body;
    } else if (options.body !== undefined) {
      headers['Content-Type'] = 'application/json';
      payload = JSON.stringify(options.body);
    }
    const hasBody = !['GET', 'HEAD'].includes(method);
    try {
      const response = await fetch(fullURL, {
        method,
        headers,
        ...(hasBody ? { body: payload } : {})
      });
      const text = await response.text();
      let parsed: any = null;
      try {
        parsed = text ? JSON.parse(text) : null;
      } catch (parseErr) {
        return {
          data: text as T,
          error: 'Invalid JSON response',
          status: response.status
        };
      }
      if (!response.ok) {
        const errMessage = parsed?.message || parsed?.error || `HTTP ${response.status}`;
        return {
          data: parsed as T,
          error: errMessage,
          status: response.status
        };
      }
      return {
        data: parsed as T,
        error: null,
        status: response.status
      };
    } catch (err: any) {
      const status = err?.statusCode || 500;
      const message = err?.statusMessage || err?.message || 'Unknown fetch error';
      const raw = err?.data || err?.response || err;
      return {
        data: raw as T,
        error: message,
        status
      };
    }
  };
  const createAPI = <T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH') => {
    return (path: string, options?: ApiRequestOptions) => request<T>(path, method, options);
  };
  return {
    get: createAPI('GET'),
    post: createAPI('POST'),
    put: createAPI('PUT'),
    patch: createAPI('PATCH'),
    del: createAPI('DELETE')
  };
};
