import { useNavigate } from "react-router-dom";

export const usePageNavigation = () => {
    const navigate = useNavigate();

    const goToPage = (path) => {
        navigate(path);
    };

    const goToPageWithOptions = (path, options) => {
        navigate(path, options);
    };

    return { goToPage, goToPageWithOptions };
};