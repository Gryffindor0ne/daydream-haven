import { useLocation } from 'react-router-dom';

const useCurrentPathAndId = () => {
    const { pathname } = useLocation();
    const paths = pathname.split('/');
    const currentPath = paths[1];
    const id = paths[2];

    return { currentPath, id };
};

export default useCurrentPathAndId;
