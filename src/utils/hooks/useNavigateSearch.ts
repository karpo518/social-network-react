import { createSearchParams, URLSearchParamsInit, useNavigate } from "react-router-dom";

export const useNavigateSearch = () => {
    const navigate = useNavigate();
    return (pathname: string | undefined, params: URLSearchParamsInit | undefined) =>
      navigate({ pathname, search: `?${createSearchParams(params)}` });
};