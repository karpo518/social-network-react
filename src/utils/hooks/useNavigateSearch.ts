import { useCallback } from 'react';
import { createSearchParams, URLSearchParamsInit, useNavigate } from "react-router-dom";

export const useNavigateSearch = () => {
    const navigate = useNavigate();
    return useCallback((pathname: string | undefined, params: URLSearchParamsInit | undefined) =>
      navigate({ pathname, search: `?${createSearchParams(params)}` }),[navigate])
};